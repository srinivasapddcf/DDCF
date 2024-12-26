import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GmRoutingModule } from './gm-routing.module';
import { CheckListComponent } from './components/check-list/check-list.component';
import { CommonComponent } from './components/common/common.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { sharedModule } from '../shared/shared.module';
import { ChecklistgmnewComponent } from './components/checklistgmnew/checklistgmnew.component';



@NgModule({
  declarations: [CheckListComponent, CommonComponent, ChecklistgmnewComponent],
  imports: [
    CommonModule,
    GmRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    sharedModule,
  ]
})
export class GmModule { }
