import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommissionerupdateComponent } from './components/commissionerupdate/commissionerupdate.component';
import { CommonComponent } from './components/common/common.component';
import { RegistrationapprovalsNewComponent } from './components/registrationapprovals-new/registrationapprovals-new.component';
import { RegistrationsApprovalComponent } from './components/registrations-approval/registrations-approval.component';
import {SocietyrequestApprovalComponent} from './components/societyrequest-approval/societyrequest-approval.component';

const roles = ['1001'];
const routes: Routes = [
  {
    path: '',
    component: CommonComponent,
    children: [
      {
        path: '',
        redirectTo: 'RegistrationApprovals',
        pathMatch: 'full',
      },  //'SocietyrequestApproval',
      {
        path: 'SocietyrequestApproval',
        component: SocietyrequestApprovalComponent,
      },

      {
        path: 'comissionerupdate',
        component: CommissionerupdateComponent,
      },
      {
        path: 'RegistrationApprovals',
        component: RegistrationapprovalsNewComponent,
      },

      
      {
        path: 'RegistrationsApproval',
        component: RegistrationsApprovalComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommissionerModuleRoutingModule { }
