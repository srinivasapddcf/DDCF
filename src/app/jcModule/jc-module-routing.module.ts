import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AmcuLandAllocationComponent } from './components/landAllocation/amcu-land-allocation/amcu-land-allocation.component';
import { AmcuLandHandoverComponent } from './components/landHandover/amcu-land-handover/amcu-land-handover.component';
import { CommonComponent } from './components/common/common.component';
import { LandAllocationComponent } from './components/landAllocation/land-allocation/land-allocation.component';
import { LandHandOverComponent } from './components/landHandover/land-hand-over/land-hand-over.component';
import { BmcuLandAllocationEditComponent } from './components/landAllocation/bmcu-land-allocation-edit/bmcu-land-allocation-edit.component';
import { BmcuLandHandoverEditComponent } from './components/landHandover/bmcu-land-handover-edit/bmcu-land-handover-edit.component';
import { PacsLandAllocationComponent } from './components/landAllocation/pacs-land-allocation/pacs-land-allocation.component';
import { PacsLandHandOverComponent } from './components/landHandover/pacs-land-hand-over/pacs-land-hand-over.component';
import { JdbmculandHandoverComponent } from './components/jdbmculandHandover/jdamculand-handover/jdbmculand-handover.component';
import { JdbamculandhandoverComponent } from './components/jdbmculandHandover/jdbmculand-handover/jdamculandhandover.component';
 
 
const roles = ['202'];
const routes: Routes = [
  {
    path: '',
    component: CommonComponent,
    children: [
      {
        path: 'LandAllocation',
        component: LandAllocationComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'landHandOver',
        component: LandHandOverComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },

      {
        path: 'JdbmculandHandover',
        component: JdbmculandHandoverComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      
      {
        path: 'JdamculandHandover',
        component: JdbamculandhandoverComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      }, 
      

      {
        path: 'AmcuLandAllocation',
        component: AmcuLandAllocationComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'AmcuLandHandover',
        component: AmcuLandHandoverComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'EditBMCULandAllotment',
        component: BmcuLandAllocationEditComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'EditBMCULandHandover',
        component: BmcuLandHandoverEditComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'PacsLandAllocation',
        component: PacsLandAllocationComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'PacsLandHandOver',
        component: PacsLandHandOverComponent,
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
export class JcModuleRoutingModule {}
