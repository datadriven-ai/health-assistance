import { NgModule } from '@angular/core';
import {CommonModule, NgFor} from '@angular/common';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
import {MatStepperModule} from "@angular/material/stepper";
import {MatDividerModule} from "@angular/material/divider";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSelectModule} from "@angular/material/select";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTabsModule} from "@angular/material/tabs";
import {MatMenuModule} from "@angular/material/menu";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatExpansionModule, MatExpansionPanelContent} from "@angular/material/expansion";
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import {MatBadgeModule} from "@angular/material/badge";
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';

const COMPONENTS = [
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatDialogModule,
  MatStepperModule,
  MatDividerModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatSelectModule,
  MatToolbarModule,
  MatIconModule,
  MatDialogModule,
  MatSidenavModule,
  MatListModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatProgressBarModule,
  MatRadioModule,
  MatCheckboxModule,
  MatTabsModule,
  MatMenuModule,
  MatAutocompleteModule,
  MatSlideToggleModule,
  MatButtonToggleModule,
  MatExpansionModule,
  MatPaginatorModule,
  MatBadgeModule,
  MatTableModule,
  MatDialogModule,
  MatSelectModule,
  MatFormFieldModule,
  MatDatepickerModule,
  FormsModule,
  MatPaginator,
  ReactiveFormsModule,
  MatCardModule,
  MatExpansionPanelContent,
  NgFor,
  MatSort, MatSortModule,
];

@NgModule({
  imports: [
    ...
      COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ],
  providers: [
  ],
  declarations: [
  ],
})
export class MaterialModule { }
