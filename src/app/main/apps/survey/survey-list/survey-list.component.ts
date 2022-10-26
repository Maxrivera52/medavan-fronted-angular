import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import * as snippet from 'app/main/components/ratings/ratings.snippetcode';

@Component({
  selector: "app-survey-list",
  templateUrl: "./survey-list.component.html",
  styleUrls: ["./survey-list.component.scss"]
})
export class SurveyListComponent implements OnInit {
  
  // public
  public contentHeader: object;
  // public basicCurrentRate = 8;
  // public sizeSMCurrentRate = 4;
  // public sizeCurrentRate = 4;
  // public sizeLGCurrentRate = 4;
  // public iconsCurrentRate = 8;
  // public ERselected = 0;
  // public ERhovered = 0;
  // public ERreadonly = false;

  public decimalCurrentRateUno = 0.00;
  public decimalCurrentRateDos = 0.00;
  public decimalCurrentRateTres = 0.00;
  public decimalCurrentRateCuatro = 0.00;
  public decimalCurrentRateCinco = 0.00;
  public decimalCurrentRateSeis = 0.00;
  public decimalCurrentRateSiete = 0.00;
  public decimalCurrentRateOcho = 0.00;
  public decimalCurrentRateNueve = 0.00;
  public decimalCurrentRateDiez = 0.00;
  public decimalCurrentRateOnce = 0.00;

  public ctrl = new FormControl(null, Validators.required);

  // snippet code variables
  // public _snippetCodeBasic = snippet.snippetCodeBasic;
  // public _snippetCodeSizes = snippet.snippetCodeSizes;
  // public _snippetCodeIcons = snippet.snippetCodeIcons;
  // public _snippetCodeReadonly = snippet.snippetCodeReadonly;
  // public _snippetCodeIntegration = snippet.snippetCodeIntegration;
  // public _snippetCodeCustomdecimal = snippet.snippetCodeCustomdecimal;

  public selectBasicLoading = false;

  selectExperiencia: number

  Experiencia = [
    { id: "1", name: "Muy Mala" },
    { id: "2", name: "Regular" },
    { id: "3", name: "Buena" },
    { id: "4", name: "Muy Buena" },
    { id: "5", name: "Excelente" },
  ];

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  toggle() {
    if (this.ctrl.disabled) {
      this.ctrl.enable();
    } else {
      this.ctrl.disable();
    }
  }
  constructor() {}

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // content header
    this.contentHeader = {
      headerTitle: 'Ratings',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Components',
            isLink: true,
            link: '/'
          },
          {
            name: 'Ratings',
            isLink: false
          }
        ]
      }
    };
  }
  
}
