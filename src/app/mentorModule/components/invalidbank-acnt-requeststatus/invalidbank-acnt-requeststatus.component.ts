import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FarmerService } from 'src/app/FarmerModule/services/farmer.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-invalidbank-acnt-requeststatus',
  templateUrl: './invalidbank-acnt-requeststatus.component.html',
  styleUrls: ['./invalidbank-acnt-requeststatus.component.css']
})
export class InvalidbankAcntRequeststatusComponent implements OnInit {

  StatusDetails=[];

  constructor(private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private farmerAPI: FarmerService,
    private utils: UtilsService,
    private sanitizer: DomSanitizer,
    private logger: LoggerService,
    private session: SessionService) { }

  ngOnInit(): void {
this.statusload();
  }
  FARMER_CODE:any;
  async statusload(): Promise<void> {
    try {

      const req = {
        type:"2",
        Uniqueid:this.session.uniqueId,
        //farmerId: this.FARMER_CODE,
      };     
      const response = await this.farmerAPI.raiseRequestInvalidBankactByFarmerId(req);
      if (response.success) {
        this.StatusDetails=response.result;
        //alert(response.message);
      } else {
        this.spinner.hide();
        this.toast.info("No Records Found");
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


  btnpendingDetails(){
    try {

      this.router.navigate(['/mentorModule/Invalidbankacntreqraise'], {});   

    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
}

}