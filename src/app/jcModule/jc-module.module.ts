import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JcModuleRoutingModule } from './jc-module-routing.module';
import { CommonComponent } from './components/common/common.component';
import { LandAllocationComponent } from './components/landAllocation/land-allocation/land-allocation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { LandHandOverComponent } from './components/landHandover/land-hand-over/land-hand-over.component';
import { AmcuLandAllocationComponent } from './components/landAllocation/amcu-land-allocation/amcu-land-allocation.component';
import { AmcuLandHandoverComponent } from './components/landHandover/amcu-land-handover/amcu-land-handover.component';
import { BmcuLandAllocationEditComponent } from './components/landAllocation/bmcu-land-allocation-edit/bmcu-land-allocation-edit.component';
import { BmcuLandHandoverEditComponent } from './components/landHandover/bmcu-land-handover-edit/bmcu-land-handover-edit.component';
import { sharedModule } from '../shared/shared.module';
import { PacsLandAllocationComponent } from './components/landAllocation/pacs-land-allocation/pacs-land-allocation.component';
import { PacsLandHandOverComponent } from './components/landHandover/pacs-land-hand-over/pacs-land-hand-over.component';

import { JdbmculandHandoverComponent } from './components/jdbmculandHandover/jdamculand-handover/jdbmculand-handover.component';
import { JdbamculandhandoverComponent } from './components/jdbmculandHandover/jdbmculand-handover/jdamculandhandover.component';
 

@NgModule({
  declarations: [
    CommonComponent,
    LandAllocationComponent,
    LandHandOverComponent,
    AmcuLandAllocationComponent,
    AmcuLandHandoverComponent,
    BmcuLandAllocationEditComponent,
    BmcuLandHandoverEditComponent,
    PacsLandAllocationComponent,
    PacsLandHandOverComponent,
     
    JdbmculandHandoverComponent,
     
    JdbamculandhandoverComponent,
     
    
  ],
  imports: [
    CommonModule,
    JcModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    sharedModule,
  ],
})
export class JcModuleModule {}
