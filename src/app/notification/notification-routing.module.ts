import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CareersComponent } from './components/careers/careers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { FarmerModule } from '../FarmerModule/farmer.module';
import { sharedModule } from '../shared/shared.module';

 

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })


const routes: Routes = [{
  path: 'Notifications',
  component: CareersComponent,
  children: [


{
  path: 'career',
  component: CareersComponent,
},

],
}];

@NgModule({
imports: [
 
FarmerModule,
FormsModule,
ReactiveFormsModule,
DataTablesModule,
sharedModule,
//RouterModule.forChild(routes)
],    

exports: [RouterModule]
})

export class NotificationRoutingModule { }
