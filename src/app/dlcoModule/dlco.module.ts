import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DlcoRoutingModule } from './dlco-routing.module';
import { CommonComponent } from './components/common/common.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckListComponent } from './components/check-list/check-list.component';
import { DataTablesModule } from 'angular-datatables';
import { sharedModule } from '../shared/shared.module';
import { ChecklistnewmodelComponent } from './components/checklistnewmodel/checklistnewmodel.component';
import { MdssreportsRegComponent } from './components/mdssreports-reg/mdssreports-reg.component';
import { MdsSFolloupReportComponent } from './components/mds-sfolloup-report/mds-sfolloup-report.component';
import { MDSSResheduleMTSComponent } from './components/mdssreshedule-mts/mdssreshedule-mts.component';


@NgModule({
  declarations: [CommonComponent, CheckListComponent, ChecklistnewmodelComponent, MdssreportsRegComponent, MdsSFolloupReportComponent, MDSSResheduleMTSComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DlcoRoutingModule,
    DataTablesModule,
    sharedModule,
  ]
})
export class DlcoModule { }
