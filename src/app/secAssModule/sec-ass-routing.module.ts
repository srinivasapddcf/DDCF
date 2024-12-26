import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { CommonComponent } from './components/common/common.component';
import { FarmerFeedIndentDetailsComponent } from './components/farmer-feed-indent-details/farmer-feed-indent-details.component';
import { IssueDetailsComponent } from './components/issueTracking/issue-details/issue-details.component';
import { IssueRegisterComponent } from './components/issueTracking/issue-register/issue-register.component';
import { IssuesListComponent } from './components/issueTracking/issues-list/issues-list.component';
import { SecAssFarmerRegisterComponent } from './components/sec-ass-farmer-register/sec-ass-farmer-register.component';
import { SecAssRegisterFarmerStatusComponent } from './components/sec-ass-register-farmer-status/sec-ass-register-farmer-status.component';
import { SocietyWiseInspectionComponent } from './components/society-wise-inspection/society-wise-inspection.component';

const roles = ['901', '902'];

const routes: Routes = [
  {
    path: '',
    component: CommonComponent,
    children: [
      {
        path: '',
        redirectTo: 'registerFarmerStatus',
        pathMatch: 'full',
      },
      {
        path: 'registerFarmer',
        component: SecAssFarmerRegisterComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'registerFarmerStatus',
        component: SecAssRegisterFarmerStatusComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'SocietyWiseInspection',
        component: SocietyWiseInspectionComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'IssueRegister',
        component: IssueRegisterComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'IssuesList',
        component: IssuesListComponent,
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
        path: 'FarmerFeedIndent',
        component: FarmerFeedIndentDetailsComponent,
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
  exports: [RouterModule],
})
export class SecAssRoutingModule {}
