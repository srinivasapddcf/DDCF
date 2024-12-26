import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

 import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { JobDetailsComponent } from './components/job-details/job-details.component';
//import { MentorModule } from '../mentorModule/mentor.module';
 


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
     LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  //  MentorModule, 
  ]
})
export class loginModule { }
