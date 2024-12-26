import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { FarmerService } from '../../services/farmer.service';

@Component({
  selector: 'app-farmer-bank-acc-update',
  templateUrl: './farmer-bank-acc-update.component.html',
  styleUrls: ['./farmer-bank-acc-update.component.css'],
})
export class FarmerBankAccUpdateComponent implements OnInit {
  @Output() onDetailSub = new EventEmitter<string>();
  input: any; 
  @Input() uidNum = '';
  personDetails: any;
  bankAccLength: any;
  farmerName: any;
  farmerCode: any;
  mobileNo: any;
  districtName: any;
  mandalName: any;
  rbkName: any;
  villageName: any;
  panCard: any;
  bankPinCode: any;
  ifscCode: any;
  bankName: any;
  branchName: any;
  micrNo: any;
  insertedBy: any;
  source: any;
  accountNo: any;
  districtId: any;
  mandalId: any;
  rbkId: any;
  villageId: any;
  passBookImg: any;
  bankImage = '';

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private farmerAPI: FarmerService,
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
    this.loadPersonDetails();
  }

  async loadPersonDetails(): Promise<void> {
    try {
      const req = {
        accountNo: this.uidNum,
      };
      this.personDetails = [];
      this.spinner.show();
      const response = await this.farmerAPI.regFarmerDetailsByUid(req);
      if (response.success) {
        this.personDetails = response.result[0];
        if (
          this.personDetails.PASSBOOK_IMG !== null &&
          this.personDetails.PASSBOOK_IMG !== undefined &&
          this.personDetails.PASSBOOK_IMG !== ''
        ) {
          this.loadBankImage(this.personDetails.PASSBOOK_IMG);
        }
        this.farmerName = this.personDetails.FARMER_NAME;
        this.farmerCode = this.personDetails.FARMER_CODE;
        this.mobileNo = this.personDetails.MOBILE_NUMBER;
        this.districtName = this.personDetails.DISTRICT;
        this.mandalName = this.personDetails.MANDAL_NAME;
        this.rbkName = this.personDetails.RBK_NAME;
        this.villageName = this.personDetails.VILLAGE_NAME;
        this.panCard = this.personDetails.PAN_CARD;
        this.bankPinCode = this.personDetails.BANK_PINCODE;
        this.uidNum = this.personDetails.UID_NUM;
        this.bankName = this.personDetails.BANK_NAME;
        this.branchName = this.personDetails.BANK_BRANCH;
        this.accountNo = this.personDetails.ACCOUNT_NUMBER;
        this.ifscCode = this.personDetails.IFSC_CODE;
        this.districtId = this.personDetails.DIST_CODE;
        this.mandalId = this.personDetails.MANDAL_CODE;
        this.rbkId = this.personDetails.RBK_CODE;
        this.villageId = this.personDetails.VILLAGE_CODE;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnVerifyIfscCode(): Promise<void> {
    try {
      
      this.bankName = '';
      this.branchName = '';

      if (
        this.accountNo === '' ||
        this.accountNo === null ||
        this.accountNo === undefined
      ) {
        this.toast.warning('Please Enter Bank Account Number');
        return;
      }
      if (
        this.passBookImg === '' ||
        this.passBookImg === null ||
        this.passBookImg === undefined
      ) {
        this.toast.warning('Please Upload New Bank PassBook Image');
        return;
      }
      if (
        this.bankPinCode === '' ||
        this.bankPinCode === null ||
        this.bankPinCode === undefined
      ) {
        this.toast.warning('Please Enter Pin Code');
        return;
      }
      if (!this.utils.pinCodeCheck(this.bankPinCode)) {
        this.toast.warning('Please Enter Valid PINCODE');
        return;
      }
      if (
        this.ifscCode === '' ||
        this.ifscCode === null ||
        this.ifscCode === undefined
      ) {
        this.toast.warning('Please Enter IFSC CODE');
        return;
      }
      

      const req = {
        ifscCode: this.ifscCode,
      };
      this.spinner.show();
      const response = await this.farmerAPI.searchByIFSC(req);
      if (response.success) {
        let count = 0;
        for(let i=0;i<response.result.length;i++){
          if( this.accountNo.length.toString() === response.result[i].ACCOUNTLENGTH){
            this.bankName = response.result[i].BANK;
            this.branchName = response.result[i].BRANCH;
            this.bankAccLength = response.result[i].ACCOUNTLENGTH;
            this.micrNo = response.result[i].MICR_CODE;
            count++;
            break;
          }
        }
        if(count < 1){
          this.toast.info('Invalid bank account number for entered IFSC Code');
        }
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnBankAccUpdate(): Promise<void> {
    try {
      if (
        this.accountNo === '' ||
        this.accountNo === null ||
        this.accountNo === undefined
      ) {
        this.toast.warning('Please Enter Bank Account Number');
        return;
      }
      if (
        this.passBookImg === '' ||
        this.passBookImg === null ||
        this.passBookImg === undefined
      ) {
        this.toast.warning('Please Upload New Bank PassBook Image');
        return;
      }
      if (
        this.bankPinCode === '' ||
        this.bankPinCode === null ||
        this.bankPinCode === undefined
      ) {
        this.toast.warning('Please Enter Pin Code');
        return;
      }
      if (!this.utils.pinCodeCheck(this.bankPinCode)) {
        this.toast.warning('Please Enter Valid PINCODE');
        return;
      }
      if (
        this.ifscCode === '' ||
        this.ifscCode === null ||
        this.ifscCode === undefined
      ) {
        this.toast.warning('Please Enter IFSC CODE');
        return;
      }
      
      const req = {
        uidNum: this.uidNum,
        ifscCode: this.ifscCode,
        accountNo: this.accountNo,
        bankName: this.bankName,
        branchName: this.branchName,
        micrNo: this.micrNo,
        insertedBy: this.session.userName,
        source: 'web',
        bankPinCode: this.bankPinCode,
        districtId: this.districtId,
        mandalId: this.mandalId,
        rbkId: this.rbkId,
        villageId: this.villageId,
        passBookImg: this.passBookImg,
      };
      this.spinner.show();
      const response = await this.farmerAPI.farmerBankUpdate(req);

      
      if (response.success) {
        alert(response.message);
        this.onDetailSub.emit('');
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onpassbookImgChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.passBookImg = res.replace('data:image/jpeg;base64,', '');
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  btnImage(image): void {
    this.utils.viewImage(image);
    // this.toast.showImage(image);
  }

  async loadBankImage(imagePath: any): Promise<void> {
    try {
      this.spinner.show();
      const response = await this.utils.JPVReportsDMSFileDownload(imagePath); //DMSFileDownload
      if (response.success) {
        this.bankImage = (this.sanitizer.bypassSecurityTrustResourceUrl(
          response.result
        ) as any).changingThisBreaksApplicationSecurity;
      } else {
        this.spinner.hide();
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


  NavigateBack() {
    this.router.navigate(['/farmer/InvalidBankAccountsList'])
}
}
