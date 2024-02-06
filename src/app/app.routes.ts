import { Routes } from '@angular/router';
import {EnvironmentBarComponent} from "./shared/components/environment-bar/environment-bar.component";
import {HomeComponent} from "./website/home/home.component";
import {ImportExcelComponent} from "./website/import-excel/import-excel.component";
import {TssFormComponent} from "./website/tss-form/tss-form.component";

export const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path: 'excel', component: ImportExcelComponent},
  {path:'tss', component: TssFormComponent},
];
