import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommissionerModuleRoutingModule } from './commissioner-module-routing.module';
import { CommonComponent } from './components/common/common.component';
import{SocietyrequestApprovalComponent} from './components/societyrequest-approval/societyrequest-approval.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables'; 
import { sharedModule } from '../shared/shared.module';
import { RegistrationsApprovalComponent } from './components/registrations-approval/registrations-approval.component';
import { RegistrationapprovalsNewComponent } from './components/registrationapprovals-new/registrationapprovals-new.component';
import { CommissionerupdateComponent } from './components/commissionerupdate/commissionerupdate.component';
 
 

@NgModule({
  declarations: [CommonComponent,SocietyrequestApprovalComponent, RegistrationsApprovalComponent, RegistrationapprovalsNewComponent, CommissionerupdateComponent ],
  imports: [
    CommonModule,
    CommissionerModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    sharedModule
  ]



  

})
export class CommissionerModuleModule { }
