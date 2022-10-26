import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CirugiaViewService } from 'app/main/apps/cirugia/cirugia-view/cirugia-view.service';

@Component({
  selector: 'app-cirugia-view',
  templateUrl: './cirugia-view.component.html',
  styleUrls: ['./cirugia-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CirugiaViewComponent implements OnInit, OnDestroy {
  // public
  public url = this.router.url;
  public lastValue;
  public data;

  // private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {Router} router
   * @param {CirugiaViewService} _cirugiaViewService
   */
  constructor(private router: Router, private _cirugiaViewService: CirugiaViewService) {
    this._unsubscribeAll = new Subject();
    this.lastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    this._cirugiaViewService.onCirugiaViewChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.data = response;
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
