import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DiagnosticoViewService } from 'app/main/apps/diagnostico/diagnostico-view/diagnostico-view.service';

@Component({
  selector: 'app-diagnostico-view',
  templateUrl: './diagnostico-view.component.html',
  styleUrls: ['./diagnostico-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DiagnosticoViewComponent implements OnInit, OnDestroy {
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
   * @param {DiagnosticoViewService} _diagnosticoViewService
   */
  constructor(private router: Router, private _diagnosticoViewService: DiagnosticoViewService) {
    this._unsubscribeAll = new Subject();
    this.lastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    this._diagnosticoViewService.onDiagnosticoViewChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
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
