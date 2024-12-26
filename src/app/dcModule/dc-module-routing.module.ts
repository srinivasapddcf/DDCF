import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseInvoiceReportComponent } from '../districtHOModule/components/purchase-invoice-report/purchase-invoice-report.component';
import { AuthGuard } from '../guards/auth.guard';
import { CommonComponent } from './components/common/common.component';
import { IssueDetailsComponent } from './components/issue-details/issue-details.component';
import { IssuesDashboardComponent } from './components/issues-dashboard/issues-dashboard.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { MeetingPhotosListComponent } from './components/villageMeeting/meeting-photos-list/meeting-photos-list.component';
import { MeetingPhotosUploadComponent } from './components/villageMeeting/meeting-photos-upload/meeting-photos-upload.component';

const roles = ['203'];
const routes: Routes = [
  {
    path: '',
    component: CommonComponent,
    children: [
      {
        path: '',
        redirectTo: 'IssuesDashboard',
        pathMatch: 'full',
      },
      {
        path: 'PasswordReset',
        component: PasswordResetComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'IssuesDashboard',
        component: IssuesDashboardComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'IssueDetails',
        component: IssueDetailsComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'MeetingPhotosUpload',
        component: MeetingPhotosUploadComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'MeetingPhotosList',
        component: MeetingPhotosListComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DcModuleRoutingModule { }
