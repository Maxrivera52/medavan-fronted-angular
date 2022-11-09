import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IResponseGetList } from '@core/models/response-http.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { SpecialtyListService } from 'app/main/apps/specialty/specialty-list/specialty-list.service';
import { ISpecialty } from 'app/main/apps/specialty/models/specialty.model';
import { Subject, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ICirugiaDetailSpecialtyPost } from '../../models/cirugia-detail-specialty';
import { CirugiaDetailSpecialtyService } from '../cirugia-detail-specialty.service';

@Component({
  selector: 'app-modal-cirdetspec',
  templateUrl: './modal-cirdetspec.component.html',
  styleUrls: ['./modal-cirdetspec.component.scss']
})
export class ModalCirdetspecComponent implements OnInit {


  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @Input() idcirugia: number;

  closeResult: string;

  // Public
  public sidebarToggleRef = false;
  public rows;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public temp = [];
  public previousRoleFilter = "";
  public previousPlanFilter = "";
  public previousStatusFilter = "";

  private _unsubscribeAll: Subject<any>;

  specialtySelect$: Observable<IResponseGetList<ISpecialty>>;
  selectedSpecialty: any;

  constructor(private modalService: NgbModal,
    private _cirdetespecService: CirugiaDetailSpecialtyService,
    private _specialtyService: SpecialtyListService,
    private cdr: ChangeDetectorRef
    
    ) { 
      this._unsubscribeAll = new Subject();
      this.specialtySelect$ = new Observable();
    }
  ngOnInit() {
    // call selects
    this.specialtySelect$ = this._specialtyService.getSpecialtys();
  }

  ngOnChanges() {
    this.loadTable();
  }

  loadTable() {
    this._cirdetespecService.getCirugiaDetailByIdCirugia(this.idcirugia).subscribe(response=>{
      this.rows = response.data
      this.temp = this.rows
    })
    
  }

  openXl(content) {
    this.loadTable();
    this.modalService.open(content, { size: 'xl' });
  }

  selectDiagnostico(row: any) {
  }

  selectDetailChange(model: any) {
  }

  saveDetail() {
    if(this.selectedSpecialty==undefined){
      Swal.fire('', 'Seleccione una especialidad', 'warning')
      return false
    }
    let obj: ICirugiaDetailSpecialtyPost = { id_cirugia: this.idcirugia, id_specialty: this.selectedSpecialty }
    this._cirdetespecService.create(obj).subscribe(
      (value)=> {
        Swal.fire('Guardado', 'Se añadió con éxito', 'success')
        this.loadTable();
      },(err)=> {
        Swal.fire('Error', 'Ocurrió un error. Comuníquese con el administrador del sistema', 'success')
      })
  }
  deletCirugiaDetail(id:any){
    this._cirdetespecService.deleteCirugiaDetailSpecialty(id).subscribe((value)=>{
      this.loadTable();
    },(err) =>{
      Swal.fire('Error', 'Ocurrió un error. Comuníquese con el administrador del sistema', 'success')
    },()=>{
      this.loadTable();
    })
  }


}
