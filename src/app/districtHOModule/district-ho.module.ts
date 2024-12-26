import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistrictHORoutingModule } from './district-ho-routing.module';
import { CommonComponent } from './components/common/common.component';
import { SocietyChangeDashboardComponent } from './components/society-change-dashboard/society-change-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { MdacAccountDashboardComponent } from './components/mdacAccount/mdac-account-dashboard/mdac-account-dashboard.component';
import { MdacAccountUpdateComponent } from './components/mdacAccount/mdac-account-update/mdac-account-update.component';
import { EditPromotersComponent } from './components/promoters/edit-promoters/edit-promoters.component';
import { InvalidBankAccountComponent } from './components/invalid-bank-account/invalid-bank-account.component';
import { sharedModule } from '../shared/shared.module';
import { PromotersDashboardComponent } from './components/promoters/promoters-dashboard/promoters-dashboard.component';
import { PromotersUpdateComponent } from './components/promoters/promoters-update/promoters-update.component';
import { FeedIndentDashboardComponent } from './components/feed-indent-dashboard/feed-indent-dashboard.component';
import { FarmerCertificateDashboardComponent } from './components/farmer-certificate-dashboard/farmer-certificate-dashboard.component';
import { VerificationofLandallotmentComponent } from './components/verificationof-landallotment/verificationof-landallotment.component';
import { GswspersonupdateComponent } from './components/gsws/gswspersonupdate/gswspersonupdate.component';
import { MentorModule } from '../mentorModule/mentor.module';
import { VerificationofLandallotmentAMCUComponent } from './components/verificationof-landallotment-amcu/verificationof-landallotment-amcu.component';
import { PaymentdetailssubmitionComponent } from './components/paymentdetailssubmition/paymentdetailssubmition.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { InvalidbankAcntRequeststatusdetailsComponent } from './components/invalidbank-acnt-requeststatusdetails/invalidbank-acnt-requeststatusdetails.component';
import { PurchaseInvoiceReportComponent } from './components/purchase-invoice-report/purchase-invoice-report.component';
import { VerficationMdssBankDetailsComponent } from './components/verfication-mdss-bank-details/verfication-mdss-bank-details.component';
import { ApprovedRBKDetailsComponent } from './components/approved-rbkdetails/approved-rbkdetails.component';
import { IssueHODetailsComponent } from './components/issue-hodetails/issue-hodetails.component';
import { IssueHODashboardComponent } from './components/issue-hodashboard/issue-hodashboard.component';
import { SocietyMilkCollectionStatusUpdatedComponent } from './components/society-milk-collection-status-updated/society-milk-collection-status-updated.component';
import { FarmerBankAllDetailsUpdateComponent } from './components/farmer-bank-all-details-update/farmer-bank-all-details-update.component';
import { CredentialsSmsSendingComponent } from './components/credentials-sms-sending/credentials-sms-sending.component';
import { SocietyChangeDashboardForAllDistrictsComponent } from './components/society-change-dashboard-for-all-districts/society-change-dashboard-for-all-districts.component';
import { SocietyChangeRequestComponent } from './components/society-change-request/society-change-request.component';
import { MCCInspectionReportComponent } from './components/mccinspection-report/mccinspection-report.component';
import { MCCeditInspectionsDetailsComponent } from './components/mccedit-inspections-details/mccedit-inspections-details.component';
import { MCCDeviceDetailsComponent } from './components/mccdevice-details/mccdevice-details.component';
 
@NgModule({
  declarations: [
    CommonComponent,
    SocietyChangeDashboardComponent,
    MdacAccountDashboardComponent,
    MdacAccountUpdateComponent,
    EditPromotersComponent,
    InvalidBankAccountComponent,
    PromotersDashboardComponent,
    PromotersUpdateComponent,
    FeedIndentDashboardComponent,
    FarmerCertificateDashboardComponent,
    VerificationofLandallotmentComponent,
    GswspersonupdateComponent,
    VerificationofLandallotmentAMCUComponent,
    PaymentdetailssubmitionComponent,
    PasswordResetComponent,
   InvalidbankAcntRequeststatusdetailsComponent,
   PurchaseInvoiceReportComponent,
   VerficationMdssBankDetailsComponent,
   ApprovedRBKDetailsComponent,
   IssueHODetailsComponent,
   IssueHODashboardComponent,
   SocietyMilkCollectionStatusUpdatedComponent,
   FarmerBankAllDetailsUpdateComponent,
   CredentialsSmsSendingComponent,
   SocietyChangeDashboardForAllDistrictsComponent,
   SocietyChangeRequestComponent,
   MCCInspectionReportComponent,
   MCCeditInspectionsDetailsComponent,
   MCCDeviceDetailsComponent,
   
  ],
  imports: [
    CommonModule,
    DistrictHORoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    sharedModule,
    MentorModule,
  ],
})
export class DistrictHOModule {}
