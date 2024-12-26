import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MentorRoutingModule } from './mentor-routing.module';
import { CommonComponent } from './components/common/common.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { McuMappingComponent } from './components/mcu-mapping/mcu-mapping.component';
import { ScheduleCreationComponent } from './components/schedule-creation/schedule-creation.component';
import { MeetingOfMeetingComponent } from './components/meeting-of-meeting/meeting-of-meeting.component';
import { AssistantSecretaryAdditionComponent } from './components/assistant-secretary-addition/assistant-secretary-addition.component';
import { MeetingAttendanceComponent } from './components/meeting-attendance/meeting-attendance.component';
import { AmcuBuildingInspectionComponent } from './components/amcu-building-inspection/amcu-building-inspection.component';
import { FarmerMentorRegisterComponent } from './components/farmer-mentor-register/farmer-mentor-register.component';
import { FarmerModule } from '../FarmerModule/farmer.module';
import { MpuacAccountCreationComponent } from './components/mdacAccount/mpuac-account-creation/mpuac-account-creation.component';
import { SecretaryTrainingComponent } from './components/secretary-training/secretary-training.component';
import { HandOverComponent } from './components/hand-over/hand-over.component';
import { RegFarmerStatusComponent } from './components/reg-farmer-status/reg-farmer-status.component';
import { InvalidBankAccountsListComponent } from './components/invalid-bank-accounts-list/invalid-bank-accounts-list.component';
import { PaymentStatusCheckComponent } from './components/payment-status-check/payment-status-check.component';
import { sharedModule } from '../shared/shared.module';
import { FunctionariesUpdateComponent } from './components/functionaries-update/functionaries-update.component';
import { IssueDetailsComponent } from './components/issueTracking/issue-details/issue-details.component';
import { IssueRegisterComponent } from './components/issueTracking/issue-register/issue-register.component';
import { IssuesListComponent } from './components/issueTracking/issues-list/issues-list.component';
import { FarmerListByVolunteersComponent } from './components/farmerApproval/farmer-list-by-volunteers/farmer-list-by-volunteers.component';
import { FarmerDetailsByUidComponent } from './components/farmerApproval/farmer-details-by-uid/farmer-details-by-uid.component';
import { AmcuInspectionComponent } from './components/amcu-inspection/amcu-inspection.component';
import { EditSecAsssecDetailsComponent } from './components/edit-sec-asssec-details/edit-sec-asssec-details.component';
import { MilkInspectionComponent } from './components/inspection/milk-inspection/milk-inspection.component';
import { PayWiseInspectionComponent } from './components/inspection/pay-wise-inspection/pay-wise-inspection.component';
import { SocietyInspectionComponent } from './components/inspection/society-inspection/society-inspection.component';
import { DeadMigrationApprovalComponent } from './components/dead-migration-approval/dead-migration-approval.component';
import { BmcuInspectionListComponent } from './components/inspection/bmcu-inspection-list/bmcu-inspection-list.component';
import { BmcuInspectionComponent } from './components/inspection/bmcu-inspection/bmcu-inspection.component';
import { MigrationReturnRequestComponent } from './components/migration-return-request/migration-return-request.component';
import { FeasibilityOfLandComponent } from './components/bmcuConstruction/feasibility-of-land/feasibility-of-land.component';
import { RegistrationOfLandComponent } from './components/bmcuConstruction/registration-of-land/registration-of-land.component';
import { OtherFacilitiesComponent } from './components/bmcuConstruction/other-facilities/other-facilities.component';
import { BasementLevelComponent } from './components/bmcuConstruction/basement-level/basement-level.component';
import { SuperStructureComponent } from './components/bmcuConstruction/super-structure/super-structure.component';
import { FinishingsComponent } from './components/bmcuConstruction/finishings/finishings.component';
import { OtherInfrastructureComponent } from './components/bmcuConstruction/other-infrastructure/other-infrastructure.component';

import { FirstPriorityListComponent } from './components/bmcuConstruction/first-priority-list/first-priority-list.component';
import { FarmerSocietyChangeComponent } from './components/farmer-society-change/farmer-society-change.component';
import { SocietyChangeRequestsComponent } from './components/society-change-requests/society-change-requests.component';
import { AddPromotersComponent } from './components/promoters/add-promoters/add-promoters.component';
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
import { NotificationModule } from '../notification/notification.module';
import { PersonaldetailsComponent } from './components/personaldetails/personaldetails.component';
import { PersonDetailsComponent } from '../bankModule/components/person-details/person-details.component';
import { SchedulemeetingComponent } from './components/schedulemeeting/schedulemeeting.component';
import { NpddmeetingattendanceComponent } from './components/npddmeetingattendance/npddmeetingattendance.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    CommonComponent,
    McuMappingComponent,
    ScheduleCreationComponent,
    MeetingOfMeetingComponent,
    AssistantSecretaryAdditionComponent,
    MeetingAttendanceComponent,
    AmcuBuildingInspectionComponent,
    FarmerMentorRegisterComponent,
    MpuacAccountCreationComponent,
    SecretaryTrainingComponent,
    HandOverComponent,
    RegFarmerStatusComponent,
    InvalidBankAccountsListComponent,
    PaymentStatusCheckComponent,
    FunctionariesUpdateComponent,
    IssueDetailsComponent,
    IssueRegisterComponent,
    IssuesListComponent,
    FarmerListByVolunteersComponent,
    FarmerDetailsByUidComponent,
    AmcuInspectionComponent,
    EditSecAsssecDetailsComponent,
    MilkInspectionComponent,
    SocietyInspectionComponent,
    PayWiseInspectionComponent,
    DeadMigrationApprovalComponent,
    BmcuInspectionListComponent,
    BmcuInspectionComponent,
    MigrationReturnRequestComponent,
    FeasibilityOfLandComponent,
    RegistrationOfLandComponent,
    OtherFacilitiesComponent,
    BasementLevelComponent,
    SuperStructureComponent,
    FinishingsComponent,
    OtherInfrastructureComponent,
    FirstPriorityListComponent,
    FarmerSocietyChangeComponent,
    SocietyChangeRequestsComponent,
    AddPromotersComponent,
    EditMdacAccountComponent,
    EditMdacAccountRequestsComponent,
    FarmerDeadUpdationComponent,
    EditPromotersComponent,
    EditPromotersRequestsComponent,
    ScheduleUpdationComponent,
    FeedIndentDashboardComponent,
    MentorFarmerKccUploadComponent,
    MilkPouringCertificateComponent,
    MentorDashboardComponent,
    GswsPersonUpdateComponent,
    MentorFarmerDetailsUpdateComponent,
    DeadMigrationUpdationComponent,
    LoandetailsComponent,
    InvalidbankAcntRequestComponent,
    InvalidbankAcntRequeststatusComponent,
    IssueEntryDetailsComponent,
    MeetingImagesComponent,
    PersonaldetailsComponent,
    SchedulemeetingComponent,
    NpddmeetingattendanceComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MentorRoutingModule,
    FarmerModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    sharedModule,
     NotificationModule
  ],
  exports: [
    MilkInspectionComponent,
    SocietyInspectionComponent,
    PayWiseInspectionComponent,
    GswsPersonUpdateComponent,
    IssueEntryDetailsComponent,
    IssueDetailsComponent,
    
    //PersonaldetailsComponent,
  ],
})
export class MentorModule {}
 