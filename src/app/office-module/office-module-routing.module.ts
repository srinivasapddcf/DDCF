import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { FarmerModule } from '../FarmerModule/farmer.module';
import { AuthGuard } from '../guards/auth.guard';
import { sharedModule } from '../shared/shared.module';
import { CommonComponent } from './component/common/common.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { PodetailsComponent } from './component/podetails/podetails.component';

 


const routes: Routes = [{
  path: '',
  component: CommonComponent,
  children: [
    {
      path: '',
      redirectTo: 'Homepage',
      pathMatch: 'full',
    },
    {
      path: 'Homepage',
      component: HomepageComponent,
    }, 
     
    {
      path: 'podetails',
      component: PodetailsComponent,
    },

  ],
}];

@NgModule({
  imports: [
    CommonModule,
    FarmerModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    sharedModule,
    //RouterModule.forChild(routes)
   ],    
   
  exports: [RouterModule]
})
export class OfficeModuleRoutingModule { }
