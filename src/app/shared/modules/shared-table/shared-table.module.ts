import { NgModule } from "@angular/core";
import {
  CommonModule,
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  JsonPipe,
  KeyValuePipe,
  LowerCasePipe,
  PercentPipe,
  SlicePipe,
  TitleCasePipe,
  UpperCasePipe,
} from "@angular/common";
import { SharedTableComponent } from "./shared-table.component";

import { PipesModule } from "../../pipes/pipes.module";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule, SortDirection  } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { ObjKeysPipe } from "shared/pipes/obj-keys.pipe";
import { RouterModule } from "@angular/router";
import { SatDatepickerModule, SatNativeDateModule } from "saturn-datepicker";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

export interface Column {
    id: string;
    type?: string;
    visible?: boolean;
    label: string;
    hideOrder: number;
    width?: number;
    canSort?: boolean;
    matchMode?: string;
    format?: string;
    icon?: string;
    sortDefault?: SortDirection;
    filterDefault?: any;
}

@NgModule({
  declarations: [SharedTableComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatTableModule,
    PipesModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule,
    SatDatepickerModule,
    SatNativeDateModule,
    MatDatepickerModule
  ],
  exports: [SharedTableComponent],
  providers: [
    CurrencyPipe,
    DatePipe,
    DecimalPipe,
    JsonPipe,
    ObjKeysPipe,
    KeyValuePipe,
    LowerCasePipe,
    PercentPipe,
    SlicePipe,
    TitleCasePipe,
    UpperCasePipe,
  ],
})
export class SharedTableModule {}
