import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcModuleRoutingModule } from './dc-module-routing.module';
import { CommonComponent } from './components/common/common.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { IssuesDashboardComponent } from './components/issues-dashboard/issues-dashboard.component';
import { IssueDetailsComponent } from './components/issue-details/issue-details.component';
import { MeetingPhotosUploadComponent } from './components/villageMeeting/meeting-photos-upload/meeting-photos-upload.component';
import { MeetingPhotosListComponent } from './components/villageMeeting/meeting-photos-list/meeting-photos-list.component';
import { sharedModule } from '../shared/shared.module';
import { ExcelDetailsInsertComponent } from './components/excel-details-insert/excel-details-insert.component';

@NgModule({
  declarations: [
    CommonComponent,
    PasswordResetComponent,
    IssuesDashboardComponent,
    IssueDetailsComponent,
    MeetingPhotosUploadComponent,
    MeetingPhotosListComponent,
    ExcelDetailsInsertComponent,
  ],
  imports: [
    CommonModule,
    DcModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    sharedModule,
  ],
})
export class DcModuleModule {}
