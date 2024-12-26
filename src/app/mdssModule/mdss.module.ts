import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdssRoutingModule } from './mdss-routing.module';
import { MeetingAttendanceComponent } from './components/meeting-attendance/meeting-attendance.component';
import { MeetingScheduleCreationComponent } from './components/meeting-schedule-creation/meeting-schedule-creation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { sharedModule } from '../shared/shared.module';
import { CommonComponent } from './components/common/common.component';
import { MinutesOfMeetingComponent } from './components/minutes-of-meeting/minutes-of-meeting.component';
import { MdssRegistrationComponent } from './components/mdss-registration/mdss-registration.component';
import { MdssDocumentsUploadComponent } from './components/mdss-documents-upload/mdss-documents-upload.component';
import { ApplicationForRegistrationComponent } from './components/application-for-registration/application-for-registration.component';
import { ApplicationRegistrationStatusComponent } from './components/application-registration-status/application-registration-status.component';
import { MdssRegistrationsDocumentsComponent } from './components/mdss-registrations-documents/mdss-registrations-documents.component';
import { PromoterslistComponent } from './components/promoterslist/promoterslist.component';
import { RejectedrbklistComponent } from './components/rejectedrbklist/rejectedrbklist.component';
import { MdssdocumentsuploadrejectsComponent } from './components/mdssdocumentsuploadrejects/mdssdocumentsuploadrejects.component';
import { UpdateBankAcountDetailsComponent } from './components/update-bank-acount-details/update-bank-acount-details.component';
import { MdssEligibleRbksListComponent } from './components/mdss-eligible-rbks-list/mdss-eligible-rbks-list.component';
import { NewApplicationfromEligiblemembersComponent } from './components/new-applicationfrom-eligiblemembers/new-applicationfrom-eligiblemembers.component';
import { MemberSheduleCreationComponent } from './components/member-shedule-creation/member-shedule-creation.component';
import { NewMeatingAttandesComponent } from './components/new-meating-attandes/new-meating-attandes.component';
import { NewMinutesofMeetingComponent } from './components/new-minutesof-meeting/new-minutesof-meeting.component';
import { NewMembersDownloadAndUploadDocComponent } from './components/new-members-download-and-upload-doc/new-members-download-and-upload-doc.component';

@NgModule({
  declarations: [
    MeetingAttendanceComponent,
    MeetingScheduleCreationComponent,
    CommonComponent,
    MinutesOfMeetingComponent,
    MdssRegistrationComponent,
    MdssDocumentsUploadComponent,
    ApplicationForRegistrationComponent,
    ApplicationRegistrationStatusComponent,
    MdssRegistrationsDocumentsComponent,
    PromoterslistComponent,
    RejectedrbklistComponent,
    MdssdocumentsuploadrejectsComponent,
    UpdateBankAcountDetailsComponent,
    MdssEligibleRbksListComponent,
    NewApplicationfromEligiblemembersComponent,
    MemberSheduleCreationComponent,
    NewMeatingAttandesComponent,
    NewMinutesofMeetingComponent,
    NewMembersDownloadAndUploadDocComponent,
  ],
  imports: [
    CommonModule,
    MdssRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    sharedModule,
  ],
})
export class MdssModule {}
