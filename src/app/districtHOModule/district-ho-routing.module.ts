import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { ApprovedRBKDetailsComponent } from './components/approved-rbkdetails/approved-rbkdetails.component';
import { CommonComponent } from './components/common/common.component';
import { FarmerCertificateDashboardComponent } from './components/farmer-certificate-dashboard/farmer-certificate-dashboard.component';
import { FeedIndentDashboardComponent } from './components/feed-indent-dashboard/feed-indent-dashboard.component';
import { GswspersonupdateComponent } from './components/gsws/gswspersonupdate/gswspersonupdate.component';
import { InvalidBankAccountComponent } from './components/invalid-bank-account/invalid-bank-account.component';
import { InvalidbankAcntRequeststatusdetailsComponent } from './components/invalidbank-acnt-requeststatusdetails/invalidbank-acnt-requeststatusdetails.component';
import { MdacAccountDashboardComponent } from './components/mdacAccount/mdac-account-dashboard/mdac-account-dashboard.component';
import { MdacAccountUpdateComponent } from './components/mdacAccount/mdac-account-update/mdac-account-update.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { PaymentdetailssubmitionComponent } from './components/paymentdetailssubmition/paymentdetailssubmition.component';
import { EditPromotersComponent } from './components/promoters/edit-promoters/edit-promoters.component';
import { PromotersDashboardComponent } from './components/promoters/promoters-dashboard/promoters-dashboard.component';
import { PromotersUpdateComponent } from './components/promoters/promoters-update/promoters-update.component';
import { PurchaseInvoiceReportComponent } from './components/purchase-invoice-report/purchase-invoice-report.component';
import { SocietyChangeDashboardComponent } from './components/society-change-dashboard/society-change-dashboard.component';
import { VerficationMdssBankDetailsComponent } from './components/verfication-mdss-bank-details/verfication-mdss-bank-details.component';
import { VerificationofLandallotmentAMCUComponent } from './components/verificationof-landallotment-amcu/verificationof-landallotment-amcu.component';
import { VerificationofLandallotmentComponent } from './components/verificationof-landallotment/verificationof-landallotment.component';
// import { IssuesListComponent } from '../mentorModule/components/issueTracking/issues-list/issues-list.component';
// import { IssueDetailsComponent } from '../mentorModule/components/issueTracking/issue-details/issue-details.component';
import { IssueHODetailsComponent } from './components/issue-hodetails/issue-hodetails.component';
import { IssueHODashboardComponent } from './components/issue-hodashboard/issue-hodashboard.component';
import { SocietyMilkCollectionStatusUpdatedComponent } from './components/society-milk-collection-status-updated/society-milk-collection-status-updated.component';
import { FarmerBankAllDetailsUpdateComponent } from './components/farmer-bank-all-details-update/farmer-bank-all-details-update.component';
import { CredentialsUpdateComponent } from '../shared/components/credentials-update/credentials-update.component';
import { CredentialsSmsSendingComponent } from './components/credentials-sms-sending/credentials-sms-sending.component';
import { SocietyChangeDashboardForAllDistrictsComponent } from './components/society-change-dashboard-for-all-districts/society-change-dashboard-for-all-districts.component';
import { HomeComponent } from '../mentorModule/components/home/home.component';
import { FarmerSocietyChangeComponent } from '../mentorModule/components/farmer-society-change/farmer-society-change.component';
import { EditBmcusCalibrationComponent } from '../technicianModule/components/edit-bmcus-calibration/edit-bmcus-calibration.component';
import { BmcuBuildingInspectionComponent } from '../technicianModule/components/bmcu-building-inspection/bmcu-building-inspection.component';
import { BmcuEquipmentFileUploadComponent } from '../technicianModule/components/bmcu-equipment-file-upload/bmcu-equipment-file-upload.component';
import { AssistantSecretaryAdditionComponent } from '../mentorModule/components/assistant-secretary-addition/assistant-secretary-addition.component';
import { EditSecAsssecDetailsComponent } from '../mentorModule/components/edit-sec-asssec-details/edit-sec-asssec-details.component';
import { MilkPouringCertificateComponent } from '../mentorModule/components/farmerMilkPouringCertificate/milk-pouring-certificate/milk-pouring-certificate.component';
import { GswsPersonUpdateComponent } from '../mentorModule/components/gsws-person-update/gsws-person-update.component';
import { EditMdacAccountRequestsComponent } from '../mentorModule/components/mdacAccount/edit-mdac-account-requests/edit-mdac-account-requests.component';
import { EditMdacAccountComponent } from '../mentorModule/components/mdacAccount/edit-mdac-account/edit-mdac-account.component';
import { MpuacAccountCreationComponent } from '../mentorModule/components/mdacAccount/mpuac-account-creation/mpuac-account-creation.component';
import { AddPromotersComponent } from '../mentorModule/components/promoters/add-promoters/add-promoters.component';
import { EditPromotersRequestsComponent } from '../mentorModule/components/promoters/edit-promoters-requests/edit-promoters-requests.component';
import { RegFarmerStatusComponent } from '../mentorModule/components/reg-farmer-status/reg-farmer-status.component';
import { SocietyChangeRequestComponent } from './components/society-change-request/society-change-request.component';
import { MCCInspectionReportComponent } from './components/mccinspection-report/mccinspection-report.component';
import { MCCeditInspectionsDetailsComponent } from './components/mccedit-inspections-details/mccedit-inspections-details.component';
import { MCCDeviceDetailsComponent } from './components/mccdevice-details/mccdevice-details.component';

const roles = ['204', '207'];
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

            // {
            //   path: '',
            //   redirectTo: 'SocietyChangeDashboard',
            //   pathMatch: 'full',
            // },
            {
                path: 'SocietyChangeDashboard',
                component: SocietyChangeDashboardComponent,
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
                path: 'MdacAccountDashboard',
                component: MdacAccountDashboardComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },

            {
                path: 'SocietyChangeRequests',
                component: SocietyChangeRequestComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },


            {
                path: 'gswspersondetailsupdate',
                component: GswspersonupdateComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },

            {
                path: 'invalidbankrequeststatusdetails',
                component: InvalidbankAcntRequeststatusdetailsComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },

            {
                path: 'MdacAccountUpdate',
                component: MdacAccountUpdateComponent,
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
                path: 'VerificationofLandallotmentBMCU',
                component: VerificationofLandallotmentComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'VerificationofLandallotmentAMCU',
                component: VerificationofLandallotmentAMCUComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },

            {
                path: 'InvalidBankAccount',
                component: InvalidBankAccountComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'PromotersDashboard',
                component: PromotersDashboardComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'PromotersUpdate',
                component: PromotersUpdateComponent,
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
                path: 'FarmerCertificateDashboard',
                component: FarmerCertificateDashboardComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },


            {
                path: 'UPLOADPAYMENTDETAILS',
                component: PaymentdetailssubmitionComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'PasswordReset',
                component: PasswordResetComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'InvoiceReport',
                component: PurchaseInvoiceReportComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },



            {
                path: 'Bankdetailsallupdate',
                component: FarmerBankAllDetailsUpdateComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },


            {
                path: 'VerifyBankDetails',
                component: VerficationMdssBankDetailsComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },


            {
                path: 'issuehodetails',
                component: IssueHODetailsComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'IssueDashboard',
                component: IssueHODashboardComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },

            {
                path: 'SocietyMilkCollectionStatusUpated',
                component: SocietyMilkCollectionStatusUpdatedComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },

            {
                path: 'MDSSRBKDetails',
                component: ApprovedRBKDetailsComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },


            {
                path: 'Resendingoflogincredentials',
                component: CredentialsSmsSendingComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'SocietyChangeDashboardForAllDistricts',
                component: SocietyChangeDashboardForAllDistrictsComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },

            {
                path: 'Resendingoflogincredentials_old',
                component: CredentialsUpdateComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'bmcusEquipmentStatus',
                component: EditBmcusCalibrationComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'bmcusEquipmentFileUpload',
                component: BmcuEquipmentFileUploadComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },
            {
                path: 'bmcusbuildinginspection',
                component: BmcuBuildingInspectionComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },


            //latest added from mentor to dc login
            // --------------------------------------------------

            {
                path: 'addPromoters',
                component: AddPromotersComponent,
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
                path: 'AssistantSecretaryAddition',
                component: AssistantSecretaryAdditionComponent,
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
                path: 'EditSecAsssecDetails',
                component: EditSecAsssecDetailsComponent,
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
                path: 'MCCInspection',
                component: MCCInspectionReportComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },

            {
                path: 'MCCDeviceDetails',
                component: MCCDeviceDetailsComponent,
                canActivate: [AuthGuard],
                data: {
                    roles,
                },
            },

            {
                path: 'MCCEditInspection',
                component: MCCeditInspectionsDetailsComponent,
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
export class DistrictHORoutingModule { }
