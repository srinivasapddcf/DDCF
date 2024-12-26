import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { CalibrationComponent } from './components/calibration/calibration.component';
import { CommonComponent } from './components/common/common.component';
import { EditCalibrationDevicesComponent } from './components/edit-calibration-devices/edit-calibration-devices.component';
import { IssueDetailsComponent } from './components/issue-details/issue-details.component';
import { IssuesDashboardComponent } from './components/issues-dashboard/issues-dashboard.component';
import { BmcuinstallationComponent } from './components/bmcu/bmcuinstallation/bmcuinstallation.component';
import { BmcuequipmentsDetailsComponent } from './components/bmcu/bmcuequipments-details/bmcuequipments-details.component';
import { BmcuEquipmentReportComponent } from './components/bmcu/bmcu-equipment-report/bmcu-equipment-report.component';
import { HomeComponent } from './components/home/home.component';
import { EditBmcusCalibrationComponent } from './components/edit-bmcus-calibration/edit-bmcus-calibration.component';
const roles = ['601'];
const routes: Routes = [{
  path: '',
  component: CommonComponent,
  children: [
    {
      path: '',
      redirectTo: 'Home',
      pathMatch: 'full',
    },

    {
      path: 'Home',
      component: HomeComponent,
       
    },


    {
      path: 'Calibration',
      component: CalibrationComponent,
      canActivate: [AuthGuard],
      data: {
        roles,
      },
    },

    
    {
      path: 'Bmcuinstallation',
      component: BmcuinstallationComponent,
      canActivate: [AuthGuard],
      data: {
        roles,
      },
    },

    {
      path: 'Bmcuequipment',
      component: BmcuequipmentsDetailsComponent, 
    },
    {
      path: 'BmcuequipmentReport',
      component: BmcuEquipmentReportComponent, 
    },
    {
      path: 'IssuesDashboard',
      component: IssuesDashboardComponent,
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
      path: 'EditCalibrationDevices',
      component: EditCalibrationDevicesComponent,
      canActivate: [AuthGuard],
      data: {
        roles,
      },
    },
    {
      path: 'bmcuscalibration',
      component: EditBmcusCalibrationComponent,
      canActivate: [AuthGuard],
      data: {
        roles,
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnicianModuleRoutingModule { }
