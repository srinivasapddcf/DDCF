import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonComponent } from './components/common/common.component';
import { CheckListComponent } from './components/check-list/check-list.component';
import { ChecklistnewmodelComponent } from './components/checklistnewmodel/checklistnewmodel.component';
import { MdssreportsRegComponent } from './components/mdssreports-reg/mdssreports-reg.component';
import { MdsSFolloupReportComponent } from './components/mds-sfolloup-report/mds-sfolloup-report.component';
import { MDSSResheduleMTSComponent } from './components/mdssreshedule-mts/mdssreshedule-mts.component';

const roles = ['1001'];

const routes: Routes = [
  {
    path: '',
    component: CommonComponent,
    children: [
      {
        path: '',
        redirectTo: 'checklistnewmodel',
        pathMatch: 'full',
      },
      {
        path: 'Checklist',
        component: CheckListComponent,
      },

      {
        path: 'checklistnewmodel',
        component: ChecklistnewmodelComponent,
      },
      {
        path: 'MdssRegReport',
        component: MdssreportsRegComponent,
      },
      {
        path: 'MdssfOlloupret',
        component: MdsSFolloupReportComponent,
      },
      {
        path: 'MdssreshduleStaus',
        component: MDSSResheduleMTSComponent,
      },

      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DlcoRoutingModule { }
