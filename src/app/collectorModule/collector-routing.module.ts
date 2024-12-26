import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { CommonComponent } from './components/common/common.component';
import { RegisterFarmerStatusComponent } from './components/farmer/register-farmer-status/register-farmer-status.component';
import { RegisterFarmerComponent } from './components/farmer/register-farmer/register-farmer.component';
import { MilkInspectionComponent } from './components/inspection/milk-inspection/milk-inspection.component';
import { PayWiseInspectionComponent } from './components/inspection/pay-wise-inspection/pay-wise-inspection.component';
import { SocietyInspectionComponent } from './components/inspection/society-inspection/society-inspection.component';

const roles = ['206'];

const routes: Routes = [
  {
    path: '',
    component: CommonComponent,
    children: [
      {
        path: '',
        redirectTo: 'registerFarmerStatus',
        pathMatch: 'full',
      },
      {
        path: 'registerFarmer',
        component: RegisterFarmerComponent,
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
        path: 'milkInspection',
        component: MilkInspectionComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'payWiseInspection',
        component: PayWiseInspectionComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'societyInspection',
        component: SocietyInspectionComponent,
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
export class CollectorRoutingModule {}
