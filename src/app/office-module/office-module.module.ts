import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficeModuleRoutingModule } from './office-module-routing.module';
import { CommonComponent } from './component/common/common.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { PodetailsComponent } from './component/podetails/podetails.component';


@NgModule({
  declarations: [CommonComponent, HomepageComponent, PodetailsComponent],
  imports: [
    CommonModule,
    OfficeModuleRoutingModule
  ]
})
export class OfficeModuleModule { }
