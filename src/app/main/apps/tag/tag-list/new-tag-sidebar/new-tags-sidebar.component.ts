import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { Subscription } from "rxjs";
import { ITag } from "../../models/tag.model";

import { TagListService } from "../tag-list.service";

@Component({
  selector: "app-new-tag-sidebar",
  templateUrl: "./new-tags-sidebar.component.html",
})
export class NewTagSidebarComponent {
  formTag: FormGroup;

  private _subscription: Subscription;
  private _tagForEdit: ITag | null;

  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _fb: FormBuilder,
    private _tagListService: TagListService
  ) {
    this.formTag = this._fb.group({
      name: new FormControl(null),
      color: new FormControl(null),
      visible: new FormControl(null),
    });

    this._subscription = new Subscription();
    this._tagForEdit = null;
  }

  ngOnInit(): void {
    const subscription = this._tagListService.tagSelected$.subscribe({
      next: (tag) => {
        this._tagForEdit = tag;

        if (this._tagForEdit) {
          this.formTag.patchValue({
            name: tag.name,
            color: tag.color,
            visible: tag.visible,
          });
        }
      },
    });

    this._subscription.add(subscription);
  }

  ngOndestroy(): void {
    this._subscription.unsubscribe();
    this._tagListService.tagSelected$.unsubscribe();
    this._tagListService.tagSelected$.complete();
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    this.formTag.reset();
    this._tagListService.tagSelected$.next(null);
  }

  submit() {
    if (this.formTag.invalid) return;

    const { name, color, visible } = this.formTag.value;

    let subscription;

    if (!this._tagForEdit) {
      subscription = this._tagListService
        .createTag({ name, color, visible })
        .subscribe({
          next: (response) => {
            //do something
            this.toggleSidebar("new-tag-sidebar");
            this.formTag.reset();
            this._tagListService.changeList$.next();
          },
          error: () => {
            // do something
          },
        });
    } else {
      subscription = this._tagListService
        .updateTag({
          id: this._tagForEdit.idTag,
          name,
          color,
          visible,
        })
        .subscribe({
          next: (response) => {
            //do something
            this.toggleSidebar("new-tag-sidebar");
            this.formTag.reset();
            this._tagListService.changeList$.next();
          },
          error: () => {
            // do something
          },
        });
    }

    this._subscription.add(subscription);
  }
}
