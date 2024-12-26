import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
 
 
//import { JobDetailsComponent } from './components/job-details/job-details.component';

 

const routes: Routes = [
  {
    path: '', component: LoginComponent,
    // children: [
    //   {
    //     path: '',
    //     redirectTo: 'Login',
    //     pathMatch: 'full',
    //   },

    //   {
    //     path: 'Login',
    //     component: LoginComponent,
         
        
    //   },
    //   // {
    //   //   path: 'JobDetails',
    //   //   component: JobDetailsComponent,
        
        
    //   // },

    // ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
