import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanmoduleRoutingModule } from './loanmodule-routing.module';
 
import { LoanDetailsComponent } from './components/loan-details/loan-details.component';
import { CommonComponent } from './components/common/common.component';


@NgModule({
  declarations: [ LoanDetailsComponent, CommonComponent],
  imports: [
    CommonModule,
    LoanmoduleRoutingModule
  ]
})
export class LoanmoduleModule { }
