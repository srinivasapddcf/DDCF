import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistrictModuleRoutingModule } from './district-module-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { sharedModule } from '../shared/shared.module';
import { MentorModule } from '../mentorModule/mentor.module';
import { CommonComponent } from './components/common/common.component';
import { AmcuMilkInspectionComponent } from './components/inspection/amcu-milk-inspection/amcu-milk-inspection.component';
import { AmcuPayWiseInspectionComponent } from './components/inspection/amcu-pay-wise-inspection/amcu-pay-wise-inspection.component';
import { AmcuSocietyInspectionComponent } from './components/inspection/amcu-society-inspection/amcu-society-inspection.component';


@NgModule({
  declarations: [
    CommonComponent,
    AmcuMilkInspectionComponent,
    AmcuPayWiseInspectionComponent,
    AmcuSocietyInspectionComponent,
  ],
  imports: [
    CommonModule,
    DistrictModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    sharedModule,
    MentorModule
  ]
})
export class DistrictModuleModule { }
