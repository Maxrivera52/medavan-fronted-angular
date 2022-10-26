import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { Subscription } from "rxjs";
import { IMaterial } from "../../models/material.model";

import { MaterialListService } from "../materials-list.service";

@Component({
  selector: "app-new-material-sidebar",
  templateUrl: "./new-materials-sidebar.component.html",
})
export class NewMaterialSidebarComponent {
  formMaterial: FormGroup;

  private _subscription: Subscription;
  private _materialForEdit: IMaterial | null;

  get nameControlIsInvalid(): boolean {
    const name = this.formMaterial.get("name");
    return name.touched && name.invalid;
  }

  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _fb: FormBuilder,
    private _materialListService: MaterialListService
  ) {
    this.formMaterial = this._fb.group({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null),
    });

    this._subscription = new Subscription();
    this._materialForEdit = null;
  }

  ngOnInit(): void {
    const subscription = this._materialListService.materialSelected$.subscribe({
      next: (material) => {
        this._materialForEdit = material;

        if (this._materialForEdit) {
          this.formMaterial.patchValue({
            name: material.nameMaterial,
            description: material.description,
          });
        }
      },
    });

    this._subscription.add(subscription);
  }

  ngOndestroy(): void {
    this._subscription.unsubscribe();
    this._materialListService.materialSelected$.unsubscribe();
    this._materialListService.materialSelected$.complete();
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    this.formMaterial.reset();
    this._materialListService.materialSelected$.next(null);
  }

  submit() {
    if (this.formMaterial.invalid) return;

    const { description, name } = this.formMaterial.value;

    let subscription;

    if (!this._materialForEdit) {
      subscription = this._materialListService
        .createMaterial({ description, name_material: name })
        .subscribe({
          next: (response) => {
            //do something
            this.toggleSidebar("new-material-sidebar");
            this.formMaterial.reset();
            this._materialListService.changeList$.next();
          },
          error: () => {
            // do something
          },
        });
    } else {
      subscription = this._materialListService
        .updateMaterial({
          id: this._materialForEdit.idMaterial,
          description,
          name_material: name,
        })
        .subscribe({
          next: (response) => {
            //do something
            this.toggleSidebar("new-material-sidebar");
            this.formMaterial.reset();
            this._materialListService.changeList$.next();
          },
          error: () => {
            // do something
          },
        });
    }

    this._subscription.add(subscription);
  }
}
