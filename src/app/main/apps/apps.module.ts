import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { FullCalendarModule } from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';

// routing
const routes: Routes = [
  {
    path: "email",
    loadChildren: () =>
      import("./email/email.module").then((m) => m.EmailModule),
  },
  {
    path: "chat",
    loadChildren: () => import("./chat/chat.module").then((m) => m.ChatModule),
  },
  {
    path: "todo",
    loadChildren: () => import("./todo/todo.module").then((m) => m.TodoModule),
  },
  {
    path: "calendar",
    loadChildren: () =>
      import("./calendar/calendar.module").then((m) => m.CalendarModule),
  },
  {
    path: "survey",
    loadChildren: () =>
      import("./survey/survey.module").then((m) => m.SurveyModule),
  },
  {
    path: "invoice",
    loadChildren: () =>
      import("./invoice/invoice.module").then((m) => m.InvoiceModule),
  },
  {
    path: "e-commerce",
    loadChildren: () =>
      import("./ecommerce/ecommerce.module").then((m) => m.EcommerceModule),
  },
  {
    path: "user",
    loadChildren: () => import("./user/user.module").then((m) => m.UserModule),
  },
  {
    path: "doctor",
    loadChildren: () =>
      import("./doctor/doctor.module").then((m) => m.DoctorModule),
  },
  {
    path: "patient",
    loadChildren: () =>
      import("./patient/patient.module").then((m) => m.PatientModule),
  },
  {
    path: "proveedor",
    loadChildren: () =>
      import("./proveedor/proveedor.module").then((m) => m.ProveedorModule),
  },
  {
    path: "specialty",
    loadChildren: () =>
    import("./specialty/specialty.module").then((m) => m.SpecialtyModule),
  },
  {
    path: "origin",
    loadChildren: () =>
    import("./origin/origin.module").then((m) => m.OriginModule),
  },
  {
    path: "preference",
    loadChildren: () =>
    import("./preference/preference.module").then((m) => m.PreferenceModule),
  },
  {
    path: "material",
    loadChildren: () =>
    import("./material/materials.module").then((m) => m.MaterialModule),
  },
  {
    path: "operator",
    loadChildren: () =>
      import("./operator/operator.module").then((m) => m.OperatorModule),
  },
  {
    path: 'equipo',
    loadChildren: () => 
      import('./equipo/equipo.module').then((m) => m.EquipoModule),
  },
  {
    path: 'cirugia',
    loadChildren: () => import('./cirugia/cirugia.module').then((m) => m.CirugiaModule)
  },
  {
    path: 'diagnostico',
    loadChildren: () => import('./diagnostico/diagnostico.module').then((m) => m.DiagnosticoModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then((m) => m.PaymentModule)
  },
  {
    path: 'anesthesia',
    loadChildren: () => import('./anesthesia/anesthesia.module').then((m) => m.AnesthesiaModule)
  },
  {
    path: 'tag',
    loadChildren: () => import('./tag/tag.module').then((m) => m.TagModule)
  },
  {
    path: 'sede',
    loadChildren: () => import('./sede/sede.module').then((m) => m.SedeModule)
  }
];

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
  resourceTimeGridPlugin
]);

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AppsModule {}
