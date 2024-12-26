import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { CommonComponent } from './components/common/common.component';
import { AmcuMilkInspectionComponent } from './components/inspection/amcu-milk-inspection/amcu-milk-inspection.component';
import { AmcuPayWiseInspectionComponent } from './components/inspection/amcu-pay-wise-inspection/amcu-pay-wise-inspection.component';
import { AmcuSocietyInspectionComponent } from './components/inspection/amcu-society-inspection/amcu-society-inspection.component';

const roles = ['201'];

const routes: Routes = [
  {
    path: '',
    component: CommonComponent,
    children: [
      {
        path: '',
        redirectTo: 'MilkInspection',
        pathMatch: 'full',
      },
      {
        path: 'MilkInspection',
        component: AmcuMilkInspectionComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'PayWiseInspection',
        component: AmcuPayWiseInspectionComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'SocietyInspection',
        component: AmcuSocietyInspectionComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistrictModuleRoutingModule { }
