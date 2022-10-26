import { CoreMenu } from '@core/types';

//? DOC: http://localhost:7777/demo/vuexy-angular-admin-dashboard-template/documentation/guide/development/navigation-menus.html#interface

export const menu: CoreMenu[] = [

  {
    id: 'apps',
    type: 'section',
    title: 'MENÚ',
    translate: 'MENU.APPS.SECTION',
    icon: 'package',
    children:
    [

      {
        id: 'calendar',
        title: 'Eventos',
        translate: 'MENU.APPS.CALENDAR',
        type: 'item',
        icon: 'calendar',
        url: 'apps/calendar'
      },
      // {
      //   id: 'grilla',
      //   title: 'Grilla',
      //   translate: 'MENU.APPS.GRILLA',
      //   type: 'item',
      //   icon: 'grid',
      //   url: 'apps/parrilla'
      // },
      {
        id: 'doctors',
        title: 'Doctor',
        translate: 'MENU.APPS.DOCTOR',
        type: 'item',
        icon: 'award',
        url: 'apps/doctor/doctor-list'
      },
      {
        id: 'patients',
        title: 'Patient',
        translate: 'MENU.APPS.PATIENT',
        type: 'item',
        icon: 'users',
        url: 'apps/patient/patient-list'
      },
      {
        id: 'survey',
        title: 'Survey',
        translate: 'MENU.APPS.SURVEY',
        type: 'item',
        icon: 'smile',
        url: 'apps/survey/survey-list'
      },
      {
        id: 'settings',
        title: 'Settings',
        translate: 'MENU.APPS.SETTINGS',
        type: 'collapsible',
        icon: 'settings',
        children: [




      {
        id: 'suppliers',
        title: 'Supplier',
        translate: 'MENU.APPS.SUPPLIER',
        type: 'item',
        icon: 'truck',
        url: 'apps/proveedor/proveedor-list'
      },
      {
        id: 'operators',
        title: 'Operator',
        translate: 'MENU.APPS.OPERATOR',
        type: 'item',
        icon: 'headphones',
        url: 'apps/operator/operator-list'
      },
      {
        id: 'specialtys',
        title: 'Specialty',
        translate: 'MENU.APPS.SPECIALTY',
        type: 'item',
        icon: 'book',
        url: 'apps/specialty/specialty-list'
      },
      {
        id: 'origins',
        title: 'Origin',
        translate: 'MENU.APPS.ORIGIN',
        type: 'item',
        icon: 'arrow-up-circle',
        url: 'apps/origin/origin-list'
      },
      {
        id: 'preferences',
        title: 'Origin',
        translate: 'MENU.APPS.PREFERENCES',
        type: 'item',
        icon: 'heart',
        url: 'apps/preference/preference-list'
      },
      {
        id: 'materials',
        title: 'Material',
        translate: 'MENU.APPS.MATERIALS',
        type: 'item',
        icon: 'shopping-bag',
        url: 'apps/material/material-list'
      },
      {
        id: 'Equipos',
        title: 'Equipo',
        translate: 'MENU.APPS.EQUIPO',
        type: 'item',
        icon: 'airplay',
        url: 'apps/equipo/equipo-list'
      },
      {
        id: 'Cirugias',
        title: 'Cirugía',
        translate: 'MENU.APPS.CIRUGIA',
        type: 'item',
        icon: 'activity',
        url: 'apps/cirugia/cirugia-list'
      },
      {
        id: 'Diagnosticos',
        title: 'diagnostico',
        translate: 'MENU.APPS.DIAGNOSTICO',
        type: 'item',
        icon: 'alert-octagon',
        url: 'apps/diagnostico/diagnostico-list'
      },
      {
        id: 'Pagos',
        title: 'pagos',
        translate: 'MENU.APPS.PAYMENT',
        type: 'item',
        icon: 'credit-card',
        url: 'apps/payment/payment-list'
      },
      {
        id: 'Anesthesia',
        title: 'Anestesia',
        translate: 'MENU.APPS.ANESTHESIA',
        type: 'item',
        icon: 'target',
        url: 'apps/anesthesia/anesthesia-list'
      },
      {
        id: 'Tags',
        title: 'Etiquetas',
        translate: 'MENU.APPS.TAG',
        type: 'item',
        icon: 'tag',
        url: 'apps/tag/tag-list'
      },
      {
        id: 'Sede',
        title: 'Sedes',
        translate: 'MENU.APPS.SEDE',
        type: 'item',
        icon: 'home',
        url: 'apps/sede/sede-list'
      },
      {
        id: 'users',
        title: 'User',
        translate: 'MENU.APPS.USER',
        type: 'item',
        icon: 'user',
        url: 'apps/user/user-list'
      },
    ]
  },
    ]
  },
];
