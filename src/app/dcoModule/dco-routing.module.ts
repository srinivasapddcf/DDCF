import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseInvoiceReportComponent } from '../districtHOModule/components/purchase-invoice-report/purchase-invoice-report.component';
import { AuthGuard } from '../guards/auth.guard';
import { CheckListComponent } from './components/check-list/check-list.component';
import { ChecklistdconewComponent } from './components/checklistdconew/checklistdconew.component';
import { CommonComponent } from './components/common/common.component';
import { NpddScheduleApprovalsComponent } from './components/npdd-schedule-approvals/npdd-schedule-approvals.component';
import { NpddschApprovalsReportComponent } from './components/npddsch-approvals-report/npddsch-approvals-report.component';
import { HomeComponent } from './components/home/home.component';
 
const roles = ['1002'];

const routes: Routes = [
  {
    path: '',
    component: CommonComponent,
    children: [
      {
        path: '',
        redirectTo: 'Home', //ChecklistDCO
      },
      
      {
        path: 'Home',
        component: HomeComponent,
      },
      // {
      //   path: '',
      //   redirectTo: 'Checklist',
      //   pathMatch: 'full',
      // },
      {
        path: 'Checklist',
        component: CheckListComponent,
        canActivate: [AuthGuard],
        data: { 
          roles,
        },
      },
      {
        path: 'ChecklistDCO',
        component: ChecklistdconewComponent,
      },

      

      {
        path: 'NPDDScheduleApprovals',
        component: NpddScheduleApprovalsComponent,
      },
      {
        path: 'NPDDScheduleApprovalsReprt',
        component: NpddschApprovalsReportComponent,
      },

      {
        path: 'InvoiceReport',
        component:PurchaseInvoiceReportComponent,
        canActivate: [AuthGuard],
        data: { 
          roles,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DcoRoutingModule { }
