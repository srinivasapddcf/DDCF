import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AhModuleRoutingModule } from './ah-module-routing.module';
import { CommonComponent } from './components/common/common.component';
import { NatureOfUnitChangeComponent } from './components/nature-of-unit-change/nature-of-unit-change.component';
import { GroundingComponent } from './components/grounding/grounding.component';
import { CheyuthaListComponent } from './components/cheyutha-list/cheyutha-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { sharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CommonComponent,
    NatureOfUnitChangeComponent,
    GroundingComponent,
    CheyuthaListComponent
  ],
  imports: [
    CommonModule,
    AhModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    sharedModule
  ]
})
export class AhModuleModule { }
