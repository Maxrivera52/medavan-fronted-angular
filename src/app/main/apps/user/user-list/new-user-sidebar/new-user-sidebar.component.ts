import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { Subscription } from "rxjs";
import { IUser } from "../../models/user.model";

import { UserListService } from "../user-list.service";

@Component({
  selector: "app-new-user-sidebar",
  templateUrl: "./new-user-sidebar.component.html",
})
export class NewUserSidebarComponent implements OnInit {
  formUser: FormGroup;

  private _subscription: Subscription;
  private _userForEdit: IUser | null;

  get emailControlIsInvalid(): boolean {
    const email = this.formUser.get("email");
    return email.touched && email.invalid;
  }

  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _fb: FormBuilder,
    private _userListService: UserListService
  ) {
    this.formUser = this._fb.group({
      email: new FormControl(null, Validators.required),
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      avatar: new FormControl(null),
      idrol: new FormControl(null),
    });

    this._subscription = new Subscription();
    this._userForEdit = null;
  }

  public roles = [
    {label: 'Administrador', value: 1},
    {label: 'Gestor de sede', value: 2},
    {label: 'Programaciones', value: 3},
    {label: 'Sala de operaciones', value: 4}
  ];

  selectedRol: any;

  ngOnInit(): void {
    const subscription = this._userListService.userSelected$.subscribe({
      next: (user) => {
        this._userForEdit = user;

        if (this._userForEdit) {
          this.formUser.patchValue({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
            idrol: user.idrol,
          });
        }
      },
    });

    this._subscription.add(subscription);
  }

  ngOndestroy(): void {
    this._subscription.unsubscribe();
    this._userListService.userSelected$.unsubscribe();
    this._userListService.userSelected$.complete();
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    this.formUser.reset();
    this._userListService.userSelected$.next(null);
  }

  submit() {
    if (this.formUser.invalid) return;

    const { 
      email, 
      firstName, 
      lastName, 
      avatar, 
      idrol 
    } = this.formUser.value;

    let subscription;

    if (!this._userForEdit) {
      subscription = this._userListService
        .createUser({
          email,
          first_name: firstName,
          last_name: lastName,
          avatar,
          idrol,
        })
        .subscribe({
          next: (response) => {
            //do something
            this.toggleSidebar("new-user-sidebar");
            this.formUser.reset();
            this._userListService.changeList$.next();
          },
          error: () => {
            // do something
          },
        });
    } else {
      subscription = this._userListService
        .updateUser({
          id: this._userForEdit.id,
          email,
          first_name: firstName,
          last_name: lastName,
          avatar,
          idrol
        })
        .subscribe({
          next: (response) => {
            //do something
            this.toggleSidebar("new-user-sidebar");
            this.formUser.reset();
            this._userListService.changeList$.next();
          },
          error: () => {
            // do something
          },
        });
    }

    this._subscription.add(subscription);
  }
}