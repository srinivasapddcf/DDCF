import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AmcuBuildingInspectionComponent } from './components/amcu-building-inspection/amcu-building-inspection.component';
import { AmcuInspectionComponent } from './components/amcu-inspection/amcu-inspection.component';
import { AssistantSecretaryAdditionComponent } from './components/assistant-secretary-addition/assistant-secretary-addition.component';
import { BasementLevelComponent } from './components/bmcuConstruction/basement-level/basement-level.component';
import { FeasibilityOfLandComponent } from './components/bmcuConstruction/feasibility-of-land/feasibility-of-land.component';
import { FinishingsComponent } from './components/bmcuConstruction/finishings/finishings.component';
import { FirstPriorityListComponent } from './components/bmcuConstruction/first-priority-list/first-priority-list.component';
import { OtherFacilitiesComponent } from './components/bmcuConstruction/other-facilities/other-facilities.component';
import { OtherInfrastructureComponent } from './components/bmcuConstruction/other-infrastructure/other-infrastructure.component';
import { RegistrationOfLandComponent } from './components/bmcuConstruction/registration-of-land/registration-of-land.component';
import { SuperStructureComponent } from './components/bmcuConstruction/super-structure/super-structure.component';
import { CommonComponent } from './components/common/common.component';
import { DeadMigrationApprovalComponent } from './components/dead-migration-approval/dead-migration-approval.component';
import { EditSecAsssecDetailsComponent } from './components/edit-sec-asssec-details/edit-sec-asssec-details.component';
import { FarmerMentorRegisterComponent } from './components/farmer-mentor-register/farmer-mentor-register.component';
import { FarmerSocietyChangeComponent } from './components/farmer-society-change/farmer-society-change.component';
import { FarmerDetailsByUidComponent } from './components/farmerApproval/farmer-details-by-uid/farmer-details-by-uid.component';
import { FarmerListByVolunteersComponent } from './components/farmerApproval/farmer-list-by-volunteers/farmer-list-by-volunteers.component';
import { FunctionariesUpdateComponent } from './components/functionaries-update/functionaries-update.component';
import { HandOverComponent } from './components/hand-over/hand-over.component';
import { BmcuInspectionListComponent } from './components/inspection/bmcu-inspection-list/bmcu-inspection-list.component';
import { BmcuInspectionComponent } from './components/inspection/bmcu-inspection/bmcu-inspection.component';
import { MilkInspectionComponent } from './components/inspection/milk-inspection/milk-inspection.component';
import { PayWiseInspectionComponent } from './components/inspection/pay-wise-inspection/pay-wise-inspection.component';
import { SocietyInspectionComponent } from './components/inspection/society-inspection/society-inspection.component';
import { InvalidBankAccountsListComponent } from './components/invalid-bank-accounts-list/invalid-bank-accounts-list.component';
import { IssueDetailsComponent } from './components/issueTracking/issue-details/issue-details.component';
import { IssueRegisterComponent } from './components/issueTracking/issue-register/issue-register.component';
import { IssuesListComponent } from './components/issueTracking/issues-list/issues-list.component';
import { McuMappingComponent } from './components/mcu-mapping/mcu-mapping.component';
import { MeetingAttendanceComponent } from './components/meeting-attendance/meeting-attendance.component';
import { MeetingOfMeetingComponent } from './components/meeting-of-meeting/meeting-of-meeting.component';
import { MigrationReturnRequestComponent } from './components/migration-return-request/migration-return-request.component';
import { MpuacAccountCreationComponent } from './components/mdacAccount/mpuac-account-creation/mpuac-account-creation.component';
import { PaymentStatusCheckComponent } from './components/payment-status-check/payment-status-check.component';
import { AddPromotersComponent } from './components/promoters/add-promoters/add-promoters.component';
import { RegFarmerStatusComponent } from './components/reg-farmer-status/reg-farmer-status.component';
import { ScheduleCreationComponent } from './components/schedule-creation/schedule-creation.component';
import { SecretaryTrainingComponent } from './components/secretary-training/secretary-training.component';
import { SocietyChangeRequestsComponent } from './components/society-change-requests/society-change-requests.component';
import { EditMdacAccountComponent } from './components/mdacAccount/edit-mdac-account/edit-mdac-account.component';
import { EditMdacAccountRequestsComponent } from './components/mdacAccount/edit-mdac-account-requests/edit-mdac-account-requests.component';
import { FarmerDeadUpdationComponent } from './components/farmer-dead-updation/farmer-dead-updation.component';
import { EditPromotersComponent } from './components/promoters/edit-promoters/edit-promoters.component';
import { EditPromotersRequestsComponent } from './components/promoters/edit-promoters-requests/edit-promoters-requests.component';
import { ScheduleUpdationComponent } from './components/schedule-updation/schedule-updation.component';
import { FeedIndentDashboardComponent } from './components/feed-indent-dashboard/feed-indent-dashboard.component';
import { MentorFarmerKccUploadComponent } from './components/mentor-farmer-kcc-upload/mentor-farmer-kcc-upload.component';
import { MilkPouringCertificateComponent } from './components/farmerMilkPouringCertificate/milk-pouring-certificate/milk-pouring-certificate.component';
import { MentorDashboardComponent } from './components/farmerMilkPouringCertificate/mentor-dashboard/mentor-dashboard.component';
import { GswsPersonUpdateComponent } from './components/gsws-person-update/gsws-person-update.component';
import { MentorFarmerDetailsUpdateComponent } from './components/mentor-farmer-details-update/mentor-farmer-details-update.component';
import { DeadMigrationUpdationComponent } from './components/dead-migration-updation/dead-migration-updation.component';
import { LoandetailsComponent } from './components/loandetails/loandetails.component';
import { InvalidbankAcntRequestComponent } from './components/invalidbank-acnt-request/invalidbank-acnt-request.component';
import { InvalidbankAcntRequeststatusComponent } from './components/invalidbank-acnt-requeststatus/invalidbank-acnt-requeststatus.component';
import { IssueEntryDetailsComponent } from './components/issueTracking/issue-entry-details/issue-entry-details.component';
import { MeetingImagesComponent } from './components/meeting-images/meeting-images.component';
import { CareersComponent } from '../notification/components/careers/careers.component';
//import { PersonDetailsComponent } from '../bankModule/components/person-details/person-details.component';
import { PersonaldetailsComponent } from './components/personaldetails/personaldetails.component';
import { SchedulemeetingComponent } from './components/schedulemeeting/schedulemeeting.component';
import { NpddmeetingattendanceComponent } from './components/npddmeetingattendance/npddmeetingattendance.component';
import { HomeComponent } from './components/home/home.component';
import { NpddschApprovalsReportComponent } from '../dcoModule/components/npddsch-approvals-report/npddsch-approvals-report.component';
import { CredentialsUpdateComponent } from '../shared/components/credentials-update/credentials-update.component';


const roles = ['101'];

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

            {
                path: 'mcuMapping',
                component: McuMappingComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'ScheduleCreation',
                component: ScheduleCreationComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'MeetingOfMeeting',
                component: MeetingOfMeetingComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'MeetingAttendance',
                component: MeetingAttendanceComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'AssistantSecretaryAddition',
                component: AssistantSecretaryAdditionComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'AmcuBuildingInspection',
                component: AmcuBuildingInspectionComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'addPromoters',
                component: AddPromotersComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'registerFarmer',
                component: FarmerMentorRegisterComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'MpuacAccountCreation',
                component: MpuacAccountCreationComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'SecretaryTraining',
                component: SecretaryTrainingComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'handOver',
                component: HandOverComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'registerFarmerStatus',
                component: RegFarmerStatusComponent,
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
                path: 'PaymentStatusCheck',
                component: PaymentStatusCheckComponent,
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
                path: 'functionariesUpdate',
                component: FunctionariesUpdateComponent,
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
                path: 'AmcuInspection',
                component: AmcuInspectionComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'EditSecAsssecDetails',
                component: EditSecAsssecDetailsComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'MilkInspection',
                component: MilkInspectionComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'SocietyInspection',
                component: SocietyInspectionComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'PayWiseInspection',
                component: PayWiseInspectionComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'DeadMigrationDashboard',
                component: DeadMigrationApprovalComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'BmcuInspection',
                component: BmcuInspectionComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'BmcuInspectionList',
                component: BmcuInspectionListComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'MigrationReturnRequest',
                component: MigrationReturnRequestComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'BasementLevel',
                component: BasementLevelComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'FeasibilityOfLand',
                component: FeasibilityOfLandComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'Finishings',
                component: FinishingsComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'OtherFacilities',
                component: OtherFacilitiesComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'OtherInfrastructure',
                component: OtherInfrastructureComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'RegistrationOfLand',
                component: RegistrationOfLandComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'SuperStructure',
                component: SuperStructureComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'FirstPriorityList',
                component: FirstPriorityListComponent,
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
            {
                path: 'EditMdacAccount',
                component: EditMdacAccountComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'EditMdacAccountRequests',
                component: EditMdacAccountRequestsComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'FarmerDeadUpdation',
                component: FarmerDeadUpdationComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'EditPromoters',
                component: EditPromotersComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'EditPromotersRequests',
                component: EditPromotersRequestsComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'ScheduleUpdation',
                component: ScheduleUpdationComponent,
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
                path: 'FarmerKccUpload',
                component: MentorFarmerKccUploadComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'FarmerMilkPouringCertificate',
                component: MilkPouringCertificateComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'gswsPersonUpdate',
                component: GswsPersonUpdateComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'MentorDashboard',
                component: MentorDashboardComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'MentorFarmerDetailsUpdate',
                component: MentorFarmerDetailsUpdateComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'DeadMigrationApproval',
                component: DeadMigrationUpdationComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },

            {
                // path: 'mcuMapping',
                // component: McuMappingComponent,

                path: 'loan-details',
                component: LoandetailsComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'Invalidbankacntreqraisestatus',
                component: InvalidbankAcntRequeststatusComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },

            {
                path: 'IssueEntryDetails',
                component: IssueEntryDetailsComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },

            {
                path: 'meetingimages',
                component: MeetingImagesComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },



            {
                path: 'Invalidbankacntreqraise',
                component: InvalidbankAcntRequestComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },


            // {
            //   path: 'Notifications',
            //   component: CareersComponent,
            //   canActivate: [AuthGuard],
            //   data: {
            //     roles,
            //   },
            // },

            {
                path: 'Notifications',
                component: PersonaldetailsComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'NPDDScheduleApprovalsReprt',
                component: NpddschApprovalsReportComponent,
            },

            {
                path: 'ScheduleCreationNPDD',
                component: SchedulemeetingComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'NPDDAttendance',
                component: NpddmeetingattendanceComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'Resendingoflogincredentials',
                component: CredentialsUpdateComponent,
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
export class MentorRoutingModule { }
