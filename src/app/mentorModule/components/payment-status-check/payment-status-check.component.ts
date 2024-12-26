import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { McuMappingService } from '../../services/mcu-mapping.service';

@Component({
  selector: 'app-payment-status-check',
  templateUrl: './payment-status-check.component.html',
  styleUrls: ['./payment-status-check.component.css'],
})
export class PaymentStatusCheckComponent
  implements OnInit, OnDestroy, AfterViewInit {
  uidNum = '';
  statusuidNum = '';
  personDetails: any;

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private mcuAPI: McuMappingService,
    private utils: UtilsService,
    private sanitizer: DomSanitizer,
    private logger: LoggerService,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ""){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
  }

  async btnPaymentDetails(): Promise<void> {
    try {
      this.personDetails = '';
      // if (
      //   this.uidNum === null ||
      //   this.uidNum === undefined ||
      //   this.uidNum === ''
      // ) {
      //   this.toast.warning('Please Enter Aadhaar Number');
      //   return;
      // }


      if (
        this.statusuidNum === null ||
        this.statusuidNum === undefined ||
        this.statusuidNum === ''
      ) {
        this.toast.warning('Please Enter Aadhaar Number');
        return;
      }

      if (!this.utils.validateVerhoeff(this.statusuidNum)) {
        this.toast.warning('Please Enter Valid Aadhaar Number');
        return;
      }

      const req = {
        uidNum: this.statusuidNum,
      };  
      this.spinner.show();
      const response = await this.mcuAPI.paymentStatusCheck(req);
      if (response.success) {
        this.personDetails = response.result;
        this.rerender();
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  uidmaskIputData(value) {
     
    if (value.length > 0) {
      // if (this.uidNum.length > value.length) {
      //   this.uidNum = this.uidNum.substring(0, value.length);
      // } 
      // else {
      //   this.uidNum += String(value).slice(-1);        
      //   const valueSplit = value.split('');
      //   let maskedValue = '';
      //   valueSplit.forEach((element, index) => {
      //     if (index < 8) {
      //       maskedValue += "X";
      //     } else {
      //       maskedValue += element;
      //     }

      //   });
      //   this.statusuidNum = maskedValue;
      // }
      if(value.length>=12){
        this.statusuidNum=value;
        const response = this.utils.validateVerhoeff(value);    
        if (response == true) {
          this.spinner.hide();
        } else {
          this.statusuidNum='';
                 alert("Invalid Aadhar Number...!");
          this.spinner.hide();
  
        }
        return
      }

    }  

    return;
    
  }
}
