import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
 
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { DistrictHoService } from '../../services/district-ho.service';

@Component({
  selector: 'app-invalidbank-acnt-requeststatusdetails',
  templateUrl: './invalidbank-acnt-requeststatusdetails.component.html',
  styleUrls: ['./invalidbank-acnt-requeststatusdetails.component.css']
})
export class InvalidbankAcntRequeststatusdetailsComponent implements OnInit {

  StatusDetails=[];

  constructor(private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private invalidBankAccAPI: DistrictHoService,
    private utils: UtilsService,
    private sanitizer: DomSanitizer,
    private logger: LoggerService,
    private session: SessionService) { }

  ngOnInit(): void {

    if(this.session.uniqueId !="" && this.session.desigId != ""){
      this.statusload();
    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }


  }
   
  async statusload(): Promise<void> {
    try { 

        const req = {
          type:24, 
        };
        this.spinner.show(); 
         const response = await this.invalidBankAccAPI.regFarmerDetailsByUidBymentorrequest(req); 
        if (response.success) {
          this.StatusDetails = response.result;
          this.spinner.hide();

       // alert(response.message);
      } else {
        this.spinner.hide();
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  btnpendingDetails(){
    try {

      this.router.navigate(['/districtHOModule/InvalidBankAccount'], {});   

    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
}

}
