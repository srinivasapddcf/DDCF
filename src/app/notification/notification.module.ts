import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { CareersComponent } from './components/careers/careers.component';


@NgModule({
  declarations: [CareersComponent],
  imports: [
    CommonModule,
    NotificationRoutingModule
  ],
  exports:[CareersComponent]
})
export class NotificationModule { 


}
