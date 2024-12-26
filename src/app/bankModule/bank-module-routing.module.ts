import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { BankCheyuthaListComponent } from './components/bank-cheyutha-list/bank-cheyutha-list.component';
import { BranchManagerDashboardComponent } from './components/branch-manager-dashboard/branch-manager-dashboard.component';
import { CommonComponent } from './components/common/common.component';
import { GroundingComponent } from './components/grounding/grounding.component';
import { LoanVerificationComponent } from './components/loan-verification/loan-verification.component';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
const roles = ['401'];
const routes: Routes = [
  {
    path: '', component: CommonComponent,
    children: [
        {
            path: '',
            redirectTo: 'BankCheyuthaList',
            pathMatch: 'full'
        },
        {
            path: 'BranchManagerDashboard',
            component: BranchManagerDashboardComponent,
            canActivate: [AuthGuard],
            data: {
                roles
            }
        },
        {
            path: 'PersonDetails',
            component: PersonDetailsComponent,
            canActivate: [AuthGuard],
            data: {
                roles
            }
        },
        {
          path: 'BankCheyuthaList',
          component: BankCheyuthaListComponent,
          canActivate: [AuthGuard],
          data: {
              roles
          }
      },
      {
        path: 'LoanVerification',
        component: LoanVerificationComponent,
        canActivate: [AuthGuard],
        data: {
            roles
        }
    },
    {
        path: 'Grounding',
        component: GroundingComponent,
        canActivate: [AuthGuard],
        data: {
            roles
        }
    },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankModuleRoutingModule { }
