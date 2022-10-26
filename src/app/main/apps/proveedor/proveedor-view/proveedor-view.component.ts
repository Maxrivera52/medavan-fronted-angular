import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ProveedorViewService } from 'app/main/apps/proveedor/proveedor-view/proveedor-view.service';

@Component({
  selector: 'app-proveedor-view',
  templateUrl: './proveedor-view.component.html',
  styleUrls: ['./proveedor-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProveedorViewComponent implements OnInit, OnDestroy {
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
   * @param {ProveedorViewService} _proveedorViewService
   */
  constructor(private router: Router, private _proveedorViewService: ProveedorViewService) {
    this._unsubscribeAll = new Subject();
    this.lastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    this._proveedorViewService.onProveedorViewChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
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
