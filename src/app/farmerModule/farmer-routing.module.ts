import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { CommonComponent } from './components/common/common.component';
import { DeadMigrationApprovalsComponent } from './components/dead-migration-approvals/dead-migration-approvals.component';
import { DeadMigrationDashboardComponent } from './components/deadMigrationApproval/dead-migration-dashboard/dead-migration-dashboard.component';
import { FarmerBankAccountUpdateComponent } from './components/farmer-bank-account-update/farmer-bank-account-update.component';
import { FarmerDetailsUpdateComponent } from './components/farmer-details-update/farmer-details-update.component';
import { FarmerFeedIndentComponent } from './components/feedIndent/farmer-feed-indent/farmer-feed-indent.component';
import { FarmerKccUploadComponent } from './components/farmer-kcc-upload/farmer-kcc-upload.component';
import { FarmerRegisterComponent } from './components/farmer-register/farmer-register.component';
import { FarmerDetailsByUidComponent } from './components/farmerApproval/farmer-details-by-uid/farmer-details-by-uid.component';
import { FarmerListByVolunteersComponent } from './components/farmerApproval/farmer-list-by-volunteers/farmer-list-by-volunteers.component';
import { InvalidBankAccountsListComponent } from './components/invalid-bank-accounts-list/invalid-bank-accounts-list.component';
import { IssueDetailsComponent } from './components/issueTracking/issue-details/issue-details.component';
import { IssueRegisterComponent } from './components/issueTracking/issue-register/issue-register.component';
import { IssuesListComponent } from './components/issueTracking/issues-list/issues-list.component';
import { MigrationReturnRequestUpdateComponent } from './components/migration-return-request-update/migration-return-request-update.component';
import { RegisterFarmerStatusComponent } from './components/register-farmer-status/register-farmer-status.component';
import { SsoComponent } from './components/sso/sso.component';
import { FeedIndentDashboardComponent } from './components/feedIndent/feed-indent-dashboard/feed-indent-dashboard.component';
import { GswsPersonUpdateDetailsComponent } from './components/gsws-person-update-details/gsws-person-update-details.component';
import { FarmerSocietyChangeComponent } from './components/farmer-society-change/farmer-society-change.component';
import { SocietyChangeRequestsComponent } from './components/society-change-requests/society-change-requests.component';
import { HomeComponent } from './components/home/home.component';
const roles = ['501', '502', '503', '504'];
const routes: Routes = [
    {
        path: '',
        component: CommonComponent,
        children: [

            {
                path: '',
                redirectTo: 'Home',  //ScheduleCreation
                pathMatch: 'full',
            },
            {
                path: 'Home',
                component: HomeComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            //   {
            //     path: '',
            //     redirectTo: 'registerFarmerStatus',//registerFarmer',
            //     pathMatch: 'full',
            //   },
            {
                path: 'registerFarmer',
                component: FarmerRegisterComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'registerFarmerStatus',
                component: RegisterFarmerStatusComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'InvalidBankAccountsList',
                component: InvalidBankAccountsListComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'FarmerBankAccountUpdate',
                component: FarmerBankAccountUpdateComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'FarmerListByVolunteers',
                component: FarmerListByVolunteersComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'FarmerDetailsByUid',
                component: FarmerDetailsByUidComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'DeadMigrationDashboard',
                component: DeadMigrationDashboardComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'MigrationReturnRequest',
                component: MigrationReturnRequestUpdateComponent,
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
                component: FarmerFeedIndentComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'FarmerKccUpload',
                component: FarmerKccUploadComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'FarmerDetailsUpdate',
                component: FarmerDetailsUpdateComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'DeadMigrationApproval',
                component: DeadMigrationApprovalsComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'FeedIndentDashboard',
                component: FeedIndentDashboardComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'gswsPersonUpdateDetails',
                component: GswsPersonUpdateDetailsComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'FarmerSocietyChange',
                component: FarmerSocietyChangeComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'SocietyChangeRequests',
                component: SocietyChangeRequestsComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },

        ],
    },
    {
        path: 'sso',
        component: SsoComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FarmerRoutingModule { }
