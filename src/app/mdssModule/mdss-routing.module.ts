import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { ApplicationForRegistrationComponent } from './components/application-for-registration/application-for-registration.component';
import { ApplicationRegistrationStatusComponent } from './components/application-registration-status/application-registration-status.component';
import { CommonComponent } from './components/common/common.component';
import { MdssDocumentsUploadComponent } from './components/mdss-documents-upload/mdss-documents-upload.component';
import { MdssRegistrationComponent } from './components/mdss-registration/mdss-registration.component';
import { MdssRegistrationsDocumentsComponent } from './components/mdss-registrations-documents/mdss-registrations-documents.component';
import { MdssdocumentsuploadrejectsComponent } from './components/mdssdocumentsuploadrejects/mdssdocumentsuploadrejects.component';
import { MeetingAttendanceComponent } from './components/meeting-attendance/meeting-attendance.component';
import { MeetingScheduleCreationComponent } from './components/meeting-schedule-creation/meeting-schedule-creation.component';
import { MinutesOfMeetingComponent } from './components/minutes-of-meeting/minutes-of-meeting.component';
import { PromoterslistComponent } from './components/promoterslist/promoterslist.component';
import { RejectedrbklistComponent } from './components/rejectedrbklist/rejectedrbklist.component';
import { UpdateBankAcountDetailsComponent } from './components/update-bank-acount-details/update-bank-acount-details.component';
import { MdssEligibleRbksListComponent } from './components/mdss-eligible-rbks-list/mdss-eligible-rbks-list.component';
import { NewApplicationfromEligiblemembersComponent } from './components/new-applicationfrom-eligiblemembers/new-applicationfrom-eligiblemembers.component';
import { MemberSheduleCreationComponent } from './components/member-shedule-creation/member-shedule-creation.component';
import { NewMeatingAttandesComponent } from './components/new-meating-attandes/new-meating-attandes.component';
import { NewMinutesofMeetingComponent } from './components/new-minutesof-meeting/new-minutesof-meeting.component';
import { NewMembersDownloadAndUploadDocComponent } from './components/new-members-download-and-upload-doc/new-members-download-and-upload-doc.component';

const roles = ['101'];
const routes: Routes = [
  {
    path: '',
    component: CommonComponent,
    children: [
      {
        path: '',
          redirectTo: 'meetingScheduleCreation',
          //'applicationForRegistration',
        pathMatch: 'full',
      },
      {
        path: 'applicationForRegistration',
        component: ApplicationForRegistrationComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'meetingScheduleCreation',
        component: MeetingScheduleCreationComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },

      

      {
        path: 'rejectedrbklist',
        component: RejectedrbklistComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },

      {
        path: 'ELIGIBLELIST', 
        component: PromoterslistComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },

      {
        path: 'meetingAttendance',
        component: MeetingAttendanceComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'minutesOfMeeting',
        component: MinutesOfMeetingComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'mdssRegistration',
        component: MdssRegistrationComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'mdssDocumentsUpload',
        component: MdssDocumentsUploadComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'applicationsStatus',
        component: ApplicationRegistrationStatusComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },

      {
        path: 'Mdssdocumentsuploadrejects',
        component: MdssdocumentsuploadrejectsComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },


      {
        path: 'mdssRegistrationsDocuments',
        component: MdssRegistrationsDocumentsComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'EditBankDetailsmdss',
        component: UpdateBankAcountDetailsComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },

      {
        path: 'EligibalRbkslist',
        component: MdssEligibleRbksListComponent,
        canActivate: [AuthGuard],
        data: {
            roles,
        },
       },

       {
        path: 'Applicationfromeligible',
        component: NewApplicationfromEligiblemembersComponent,
        canActivate: [AuthGuard],
        data: {
            roles,
        },
       },

       {
        path: 'memberScheduleCreation',
        component: MemberSheduleCreationComponent,
        canActivate: [AuthGuard],
        data: {
            roles,
        },
      },

      {
        path: 'AddNewMeetingAttds',
        component: NewMeatingAttandesComponent,
        canActivate: [AuthGuard],
        data: {
            roles,
        },
      },

      {
        path: 'MeetingofMeetingNew',
        component: NewMinutesofMeetingComponent,
        canActivate: [AuthGuard],
        data: {
            roles,
        },
    },

    {
      path: 'NewMembersDownloadandUploadDoc',
      component: NewMembersDownloadAndUploadDocComponent,
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
export class MdssRoutingModule {}
