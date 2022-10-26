import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreTranslationService } from '@core/services/translation.service';
import { ConfirmedValidator } from './../confirmed.validator';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { locale as english }    from 'app/main/pages/authentication/auth-reset-password-v1/i18n/en';
import { locale as spanish }    from 'app/main/pages/authentication/auth-reset-password-v1/i18n/es';
import { locale as italian }    from 'app/main/pages/authentication/auth-reset-password-v1/i18n/it';
import { locale as french }     from 'app/main/pages/authentication/auth-reset-password-v1/i18n/fr';
import { locale as german }     from 'app/main/pages/authentication/auth-reset-password-v1/i18n/de';
import { locale as portuguese } from 'app/main/pages/authentication/auth-reset-password-v1/i18n/pt';

import { CoreConfigService } from '@core/services/config.service';

@Component({
  selector: 'app-auth-reset-password-v1',
  templateUrl: './auth-reset-password-v1.component.html',
  styleUrls: ['./auth-reset-password-v1.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthResetPasswordV1Component implements OnInit {
  // Public
  public coreConfig: any;
  public passwordTextType: boolean;
  public confPasswordTextType: boolean;
  public resetPasswordForm: FormGroup;
  public submitted = false;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {FormBuilder} _formBuilder
   */
  constructor(private _coreConfigService: CoreConfigService, private _formBuilder: FormBuilder, private _coreTranslationService: CoreTranslationService) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };

    this._coreTranslationService.translate(english, spanish, italian, french, german, portuguese);
    
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.resetPasswordForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  /**
   * Toggle confirm password
   */
  toggleConfPasswordTextType() {
    this.confPasswordTextType = !this.confPasswordTextType;
  }

  /**
   * On Submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.resetPasswordForm.invalid) {
      return;
    }
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.resetPasswordForm = this._formBuilder.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { 

      validator: ConfirmedValidator('newPassword', 'confirmPassword')

    });

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
