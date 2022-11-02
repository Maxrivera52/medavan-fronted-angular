import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgSelectOption,
  Validators,
} from "@angular/forms";
import { IDocumentTypeResponse } from "@core/models/selects.model";
import { SelectService } from "app/services/select.service";

import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { Observable, Subscription } from "rxjs";
import { IProveedor } from "../../models/proveedor.model";

import { ProveedorListService } from "../proveedor-list.service";
import { IResponseGetList } from "@core/models/response-http.model";
import { IMaterial } from "app/main/apps/material/models/material.model";
import { MaterialListService } from "app/main/apps/material/materials-list/materials-list.service";
@Component({
  selector: "app-new-proveedor-sidebar",
  templateUrl: "./new-proveedor-sidebar.component.html",
})
export class NewProveedorSidebarComponent implements OnInit {
  formProveedor: FormGroup;


  materialSelect$: Observable<IResponseGetList<IMaterial>>;

  documentTypeSelect$: Observable<IResponseGetList<IDocumentTypeResponse>>;

  private _subscription: Subscription;
  private _proveedorForEdit: IProveedor | null;

  get iddocumentTypeControlIsInvalid(): boolean {
    const iddocumentType = this.formProveedor.get("iddocumentType");
    return iddocumentType.touched && iddocumentType.invalid;
  }
  get documentNumberControlIsInvalid(): boolean {
    const documentNumber = this.formProveedor.get("documentNumber");
    return documentNumber.touched && documentNumber.invalid;
  }
  get businessnameControlIsInvalid(): boolean {
    const businessname = this.formProveedor.get("businessname");
    return businessname.touched && businessname.invalid;
  }

  typedocs = [
    { id: 1, name: 'RUC' },
    { id: 2, name: 'DNI' }
  ];

  selectedTypeDoc: any;
  allMaterialListDetail: any = [];
  provMaterialDetailList: any = [];
  provMaterialDetailListNames: any = [];
  materialListTags: any = [];


  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _fb: FormBuilder,
    private _proveedorListService: ProveedorListService,
    private _selectsService: SelectService,
    private _materialListService: MaterialListService,
  ) {
    this.formProveedor = this._fb.group({
      iddocumentType: new FormControl(null, Validators.required),
      documentNumber: new FormControl(null, Validators.required),
      businessname: new FormControl(null, Validators.required),
      phone: new FormControl(),
      email: new FormControl(),
      representativeName: new FormControl(),
      representativePhone: new FormControl(),
      representativeEmail: new FormControl(),
    });

    this.documentTypeSelect$ = new Observable();
    this.materialSelect$ = new Observable();

    this._subscription = new Subscription();
    this._proveedorForEdit = null;
  }

  ngOnInit(): void {
    // call selects
    this.documentTypeSelect$ = this._selectsService.getDocumentTypes();
    this.materialSelect$ = this._materialListService.getMaterials();

    this._proveedorListService.getSupplierMaterialDetail().subscribe(x => {
      console.log(x)
      this.allMaterialListDetail = x

      const subscription =
        this._proveedorListService.proveedorSelected$.subscribe({
          next: (proveedor) => {
            this._proveedorForEdit = proveedor;
            console.log(this._proveedorForEdit)
            console.log(this.allMaterialListDetail)
            console.log(this.provMaterialDetailList)
            console.log(this.materialSelect$)


            if (this._proveedorForEdit) {
              this.formProveedor.patchValue({
                iddocumentType: proveedor.iddocumentType,
                documentNumber: proveedor.documentNumber,
                businessname: proveedor.businessname,
                phone: proveedor.phone,
                email: proveedor.email,
                representativeName: proveedor.representativeName,
                representativePhone: proveedor.representativePhone,
                representativeEmail: proveedor.representativeEmail,
              });

              console.log(this.allMaterialListDetail)
              this.provMaterialDetailList = this.allMaterialListDetail?.data?.filter(x => x.idsupplier == proveedor.idSupplier)
              this.materialSelect$.subscribe(x => {
                this.provMaterialDetailListNames = []
                this.provMaterialDetailList?.forEach(e => {
                  let name = x.data.find(c => c.idMaterial == e.idmaterial)
                  this.provMaterialDetailListNames.push(name)
                });

              })


            }
          },
        });
      this._subscription.add(subscription);
    })

  }
  ngOndestroy(): void {
    this.materialListTags = []
    this.materialSelect$ = null;
    this._subscription.unsubscribe();
    this._proveedorListService.proveedorSelected$.unsubscribe();
    this._proveedorListService.proveedorSelected$.complete();
  }

  toggleSidebar(name): void {
    this.allMaterialListDetail = []
    this.materialListTags = []
    this.provMaterialDetailList = []
    this.provMaterialDetailListNames = []
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    this.formProveedor.reset();
    this._proveedorListService.proveedorSelected$.next(null);
  }

  submit() {
    if (this.formProveedor.invalid) return;

    const {
      iddocumentType,
      documentNumber,
      businessname,
      phone,
      email,
      representativeName,
      representativePhone,
      representativeEmail,
    } = this.formProveedor.value;

    let materiallistob = []


    console.log({
      iddocument_type: iddocumentType,
      document_number: documentNumber,
      businessname: businessname,
      phone: phone,
      email: email,
      representative_name: representativeName,
      representative_phone: representativePhone,
      representative_email: representativeEmail,
    })

    let subscription;

    if (!this._proveedorForEdit) {
      subscription = this._proveedorListService
        .createProveedor({
          iddocument_type: iddocumentType,
          document_number: documentNumber,
          businessname: businessname,
          phone: phone,
          email: email,
          representative_name: representativeName,
          representative_phone: representativePhone,
          representative_email: representativeEmail,
          listMaterials: this.materialListTags
        })
        .subscribe({
          next: (response) => {
            //do something
            //for(let i of this.materialListTags){
            // materiallistob.push({idsupplier:response})
            //}

            console.log(response)
            //return
            //this._proveedorListService.createSupplierMaterialDetail(this.ma)

            this.toggleSidebar("new-proveedor-sidebar");
            this.formProveedor.reset();
            this._proveedorListService.changeList$.next();
          },
          error: () => {
            // do something
          },
        });
    } else {
      let listmaterials = this.materialListTags
      console.warn("---------")
      console.log(listmaterials)
      console.log(this.provMaterialDetailList)
      if (this.materialListTags.length == 0) {
        listmaterials = this.provMaterialDetailList
      }
      console.log(listmaterials)
      subscription = this._proveedorListService
        .updateProveedor({
          id: this._proveedorForEdit.idSupplier,
          iddocument_type: iddocumentType,
          document_number: documentNumber,
          businessname: businessname,
          phone: phone,
          email: email,
          representative_name: representativeName,
          representative_phone: representativePhone,
          representative_email: representativeEmail,
          listMaterials: this.materialListTags
        })
        .subscribe({
          next: (response) => {


            //do something
            this.toggleSidebar("new-proveedor-sidebar");
            this.formProveedor.reset();
            this._proveedorListService.changeList$.next();
          },
          error: () => {
            // do something
          },
        });
    }

    this._subscription.add(subscription);
  }

  changeMaterial($event: any) {
    this.materialListTags = $event
    console.log($event);

    //console.warn(this.materialSelect$)
  }

}
