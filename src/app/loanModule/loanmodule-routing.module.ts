import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonComponent } from '../mentorModule/components/common/common.component';
//import { AuthGuard } from '../guards/auth.guard';
 
import { LoanDetailsComponent } from './components/loan-details/loan-details.component';
//const roles = ['101'];
const routes: Routes = [

  {
    path: '',
    component: CommonComponent,
    children: [
      {
        path: '',
          redirectTo: 'loan-details',
          //'applicationForRegistration',
        pathMatch: 'full',
      },
      {
        path: 'loan-details',
        component: LoanDetailsComponent,
        // canActivate: [AuthGuardrd],
        // data: {
        //   roles,
        // },
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanmoduleRoutingModule { }
