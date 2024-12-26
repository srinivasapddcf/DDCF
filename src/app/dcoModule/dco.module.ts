import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DcoRoutingModule } from './dco-routing.module';
import { CheckListComponent } from './components/check-list/check-list.component';
import { CommonComponent } from './components/common/common.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { sharedModule } from '../shared/shared.module';
import { ChecklistdconewComponent } from './components/checklistdconew/checklistdconew.component';
import { NpddScheduleApprovalsComponent } from './components/npdd-schedule-approvals/npdd-schedule-approvals.component';
import { NpddschApprovalsReportComponent } from './components/npddsch-approvals-report/npddsch-approvals-report.component';
import { HomeComponent } from './components/home/home.component';
 

@NgModule({
  declarations: [CheckListComponent, CommonComponent, ChecklistdconewComponent, NpddScheduleApprovalsComponent, NpddschApprovalsReportComponent, HomeComponent],
  imports: [
    CommonModule,
    DcoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    sharedModule,
  ]
})
export class DcoModule { }
