import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecAssRoutingModule } from './sec-ass-routing.module';
import { CommonComponent } from './components/common/common.component';
import { FarmerModule } from '../FarmerModule/farmer.module';
import { SecAssRegisterFarmerStatusComponent } from './components/sec-ass-register-farmer-status/sec-ass-register-farmer-status.component';
import { SecAssFarmerRegisterComponent } from './components/sec-ass-farmer-register/sec-ass-farmer-register.component';
import { SocietyWiseInspectionComponent } from './components/society-wise-inspection/society-wise-inspection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { IssueDetailsComponent } from './components/issueTracking/issue-details/issue-details.component';
import { IssueRegisterComponent } from './components/issueTracking/issue-register/issue-register.component';
import { IssuesListComponent } from './components/issueTracking/issues-list/issues-list.component';
import { sharedModule } from '../shared/shared.module';
import { FarmerFeedIndentDetailsComponent } from './components/farmer-feed-indent-details/farmer-feed-indent-details.component';

@NgModule({
  declarations: [
    CommonComponent,
    SecAssFarmerRegisterComponent,
    SecAssRegisterFarmerStatusComponent,
    SocietyWiseInspectionComponent,
    IssueDetailsComponent,
    IssueRegisterComponent,
    IssuesListComponent,
    FarmerFeedIndentDetailsComponent,
  ],
  imports: [
    CommonModule,
    SecAssRoutingModule,
    FarmerModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    sharedModule,
  ],
})
export class SecAssModule {}
