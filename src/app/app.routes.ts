import { Routes } from '@angular/router';
import {EnvironmentBarComponent} from "./shared/components/environment-bar/environment-bar.component";
import {HomeComponent} from "./website/home/home.component";
import {ImportExcelComponent} from "./website/import-excel/import-excel.component";
import {TssFormComponent} from "./website/tss-form/tss-form.component";
import {InvoiceTableComponent} from "./website/invoice-table/invoice-table.component";
import {LoginCardComponent} from "./shared/login-card/login-card.component";
import {RedirectComponent} from "./shared/redirect/redirect.component";
import {DashboardComponent} from "./website/dashboard/dashboard.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {WebsiteRoutes} from "./website";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginCardComponent
  },
  {path: 'redirect', component: RedirectComponent},
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./website')
        .then(m => m.WebsiteRoutes)
  },
];
