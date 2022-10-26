import { Component, OnInit } from '@angular/core';
import { CoreConfigService } from '@core/services/config.service';
import { CoreTranslationService } from '@core/services/translation.service';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { locale as english }    from 'app/main/pages/miscellaneous/coming-soon/i18n/en';
import { locale as spanish }    from 'app/main/pages/miscellaneous/coming-soon/i18n/es';
import { locale as italian }    from 'app/main/pages/miscellaneous/coming-soon/i18n/it';
import { locale as french }     from 'app/main/pages/miscellaneous/coming-soon/i18n/fr';
import { locale as german }     from 'app/main/pages/miscellaneous/coming-soon/i18n/de';
import { locale as portuguese } from 'app/main/pages/miscellaneous/coming-soon/i18n/pt';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss']
})
export class ComingSoonComponent implements OnInit {
  public coreConfig: any;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(private _coreConfigService: CoreConfigService, private _coreTranslationService: CoreTranslationService) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };

    this._coreTranslationService.translate(english, spanish, italian, french, german, portuguese);
    
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
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
