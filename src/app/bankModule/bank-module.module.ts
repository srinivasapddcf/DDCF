import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankModuleRoutingModule } from './bank-module-routing.module';
import { CommonComponent } from './components/common/common.component';
import { BranchManagerDashboardComponent } from './components/branch-manager-dashboard/branch-manager-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { BankCheyuthaListComponent } from './components/bank-cheyutha-list/bank-cheyutha-list.component';
import { LoanVerificationComponent } from './components/loan-verification/loan-verification.component';
import { GroundingComponent } from './components/grounding/grounding.component';
import { sharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CommonComponent,
    BranchManagerDashboardComponent,
    PersonDetailsComponent,
    BankCheyuthaListComponent,
    LoanVerificationComponent,
    GroundingComponent,
  ],
  imports: [
    CommonModule,
    BankModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    sharedModule
  ],
})
export class BankModuleModule {}
