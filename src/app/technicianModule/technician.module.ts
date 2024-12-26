import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechnicianModuleRoutingModule } from './technician-routing.module';
import { CommonComponent } from './components/common/common.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalibrationComponent } from './components/calibration/calibration.component';
import { IssuesDashboardComponent } from './components/issues-dashboard/issues-dashboard.component';
import { IssueDetailsComponent } from './components/issue-details/issue-details.component';
import { DataTablesModule } from 'angular-datatables';
import { sharedModule } from '../shared/shared.module';
import { EditCalibrationDevicesComponent } from './components/edit-calibration-devices/edit-calibration-devices.component';
import { BmcuinstallationComponent } from './components/bmcu/bmcuinstallation/bmcuinstallation.component';
import { BmcuequipmentsDetailsComponent } from './components/bmcu/bmcuequipments-details/bmcuequipments-details.component';
import { BmcuEquipmentReportComponent } from './components/bmcu/bmcu-equipment-report/bmcu-equipment-report.component';
import { HomeComponent } from './components/home/home.component';
import { EditBmcusCalibrationComponent } from './components/edit-bmcus-calibration/edit-bmcus-calibration.component';
import { BmcuBuildingInspectionComponent } from './components/bmcu-building-inspection/bmcu-building-inspection.component';
import { BmcuEquipmentFileUploadComponent } from './components/bmcu-equipment-file-upload/bmcu-equipment-file-upload.component';

@NgModule({
  declarations: [
    CommonComponent,
    CalibrationComponent,
    IssuesDashboardComponent,
    IssueDetailsComponent,
    EditCalibrationDevicesComponent,
    BmcuinstallationComponent,
    BmcuequipmentsDetailsComponent,
    BmcuEquipmentReportComponent,
    HomeComponent,
    EditBmcusCalibrationComponent,
    BmcuBuildingInspectionComponent,
    BmcuEquipmentFileUploadComponent,
  ],
  imports: [
    CommonModule,
    TechnicianModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    sharedModule
  ],
})
export class TechnicianModuleModule {}
