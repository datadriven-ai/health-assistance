import { Routes } from '@angular/router';
import {EnvironmentBarComponent} from "./shared/components/environment-bar/environment-bar.component";
import {HomeComponent} from "./website/home/home.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
];
