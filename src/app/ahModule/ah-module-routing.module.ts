import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { CheyuthaListComponent } from './components/cheyutha-list/cheyutha-list.component';
import { CommonComponent } from './components/common/common.component';
import { GroundingComponent } from './components/grounding/grounding.component';
import { NatureOfUnitChangeComponent } from './components/nature-of-unit-change/nature-of-unit-change.component';

const roles = ['103'];
const routes: Routes = [
  {
    path: '', component: CommonComponent,
    children: [
        {
            path: '',
            redirectTo: 'CheyuthaList',
            pathMatch: 'full'
        },
        {
            path: 'CheyuthaList',
            component: CheyuthaListComponent,
            canActivate: [AuthGuard],
            data: {
                roles
            }
        },
        {
            path: 'NatureOfUnitChange',
            component: NatureOfUnitChangeComponent,
            canActivate: [AuthGuard],
            data: {
                roles
            }
        },
        {
            path: 'Grounding',
            component: GroundingComponent,
            canActivate: [AuthGuard],
            data: {
                roles
            }
        }
      ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AhModuleRoutingModule { }
