import { Routes } from '@angular/router';
import {RedirectComponent} from "../shared/redirect/redirect.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HomeComponent} from "./home/home.component";
import {ImportExcelComponent} from "./import-excel/import-excel.component";
import {TssFormComponent} from "./tss-form/tss-form.component";
import {InvoiceTableComponent} from "./invoice-table/invoice-table.component";

export const WebsiteRoutes: Routes = [
  {path: '', component: DashboardComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'excel',
        component: ImportExcelComponent,
      },
      {
        path: 'tss',
        component: TssFormComponent,
      },
      {
        path: 'invoice',
        component: InvoiceTableComponent,
      },
    ],},
];
