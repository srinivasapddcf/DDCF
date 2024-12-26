import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectorRoutingModule } from './collector-routing.module';
import { CommonComponent } from './components/common/common.component';
import { RegisterFarmerComponent } from './components/farmer/register-farmer/register-farmer.component';
import { RegisterFarmerStatusComponent } from './components/farmer/register-farmer-status/register-farmer-status.component';
import { MilkInspectionComponent } from './components/inspection/milk-inspection/milk-inspection.component';
import { PayWiseInspectionComponent } from './components/inspection/pay-wise-inspection/pay-wise-inspection.component';
import { SocietyInspectionComponent } from './components/inspection/society-inspection/society-inspection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { sharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CommonComponent,
    RegisterFarmerComponent,
    RegisterFarmerStatusComponent,
    MilkInspectionComponent,
    PayWiseInspectionComponent,
    SocietyInspectionComponent,
  ],
  imports: [
    CommonModule,
    CollectorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    sharedModule,
  ],
})
export class CollectorModule {}
