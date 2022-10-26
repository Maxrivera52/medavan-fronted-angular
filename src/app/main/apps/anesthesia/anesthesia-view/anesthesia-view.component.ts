import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AnesthesiaViewService } from 'app/main/apps/anesthesia/anesthesia-view/anesthesia-view.service';

@Component({
  selector: 'app-anesthesia-view',
  templateUrl: './anesthesia-view.component.html',
  styleUrls: ['./anesthesia-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AnesthesiaViewComponent implements OnInit, OnDestroy {
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
   * @param {AnesthesiaViewService} _anesthesiaViewService
   */
  constructor(private router: Router, private _anesthesiaViewService: AnesthesiaViewService) {
    this._unsubscribeAll = new Subject();
    this.lastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    this._anesthesiaViewService.onAnesthesiaViewChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
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
