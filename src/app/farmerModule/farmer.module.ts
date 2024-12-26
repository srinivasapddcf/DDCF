import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmerRoutingModule } from './farmer-routing.module';
import { CommonComponent } from './components/common/common.component';
import { FarmerRegisterComponent } from './components/farmer-register/farmer-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { SsoComponent } from './components/sso/sso.component';
import { RegisterFarmerStatusComponent } from './components/register-farmer-status/register-farmer-status.component';
import { FarmerBankAccountUpdateComponent } from './components/farmer-bank-account-update/farmer-bank-account-update.component';
import { FarmerBankAccUpdateComponent } from './components/farmer-bank-acc-update/farmer-bank-acc-update.component';
import { InvalidBankAccountsListComponent } from './components/invalid-bank-accounts-list/invalid-bank-accounts-list.component';
import { FarmerDetailsByUidComponent } from './components/farmerApproval/farmer-details-by-uid/farmer-details-by-uid.component';
import { FarmerListByVolunteersComponent } from './components/farmerApproval/farmer-list-by-volunteers/farmer-list-by-volunteers.component';
import { sharedModule } from '../shared/shared.module';
import { DeadMigrationDashboardComponent } from './components/deadMigrationApproval/dead-migration-dashboard/dead-migration-dashboard.component';
import { MigrationReturnRequestUpdateComponent } from './components/migration-return-request-update/migration-return-request-update.component';
import { IssueRegisterComponent } from './components/issueTracking/issue-register/issue-register.component';
import { IssuesListComponent } from './components/issueTracking/issues-list/issues-list.component';
import { IssueDetailsComponent } from './components/issueTracking/issue-details/issue-details.component';
import { FarmerFeedIndentComponent } from './components/feedIndent/farmer-feed-indent/farmer-feed-indent.component';
import { FarmerKccUploadComponent } from './components/farmer-kcc-upload/farmer-kcc-upload.component';
import { FarmerDetailsUpdateComponent } from './components/farmer-details-update/farmer-details-update.component';
import { DeadMigrationApprovalsComponent } from './components/dead-migration-approvals/dead-migration-approvals.component';
import { FeedIndentDashboardComponent } from './components/feedIndent/feed-indent-dashboard/feed-indent-dashboard.component';
import { GswsPersonUpdateDetailsComponent } from './components/gsws-person-update-details/gsws-person-update-details.component';
import { FarmerSocietyChangeComponent } from './components/farmer-society-change/farmer-society-change.component';
import { SocietyChangeRequestsComponent } from './components/society-change-requests/society-change-requests.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    CommonComponent,
    FarmerRegisterComponent,
    SsoComponent,
    RegisterFarmerStatusComponent,
    FarmerBankAccountUpdateComponent,
    FarmerBankAccUpdateComponent,
    InvalidBankAccountsListComponent,
    FarmerDetailsByUidComponent,
    FarmerListByVolunteersComponent,
    DeadMigrationDashboardComponent,
    MigrationReturnRequestUpdateComponent,
    IssueRegisterComponent,
    IssuesListComponent,
    IssueDetailsComponent,
    FarmerFeedIndentComponent,
    FarmerKccUploadComponent,
    FarmerDetailsUpdateComponent,
    DeadMigrationApprovalsComponent,
    FeedIndentDashboardComponent,
    GswsPersonUpdateDetailsComponent,
    FarmerSocietyChangeComponent,
    SocietyChangeRequestsComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    FarmerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    sharedModule,
  ],
  exports: [
    CommonComponent,
    FarmerRegisterComponent,
    RegisterFarmerStatusComponent,
    FarmerBankAccountUpdateComponent,
    DeadMigrationDashboardComponent,
    MigrationReturnRequestUpdateComponent,
    FarmerFeedIndentComponent,
    FarmerKccUploadComponent,
    FarmerDetailsUpdateComponent,
    DeadMigrationApprovalsComponent,
  ],
})
export class FarmerModule {}
