import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { FarmerService } from '../../../services/farmer.service';

@Component({
  selector: 'app-farmer-feed-indent',
  templateUrl: './farmer-feed-indent.component.html',
  styleUrls: ['./farmer-feed-indent.component.css'],
})
export class FarmerFeedIndentComponent implements OnInit {
  noDataMessage = '';
  inputRadio = '1'; uidNum1=true;frmNum1=false;frmNum=''
  inputPlaceHolder = 'Please Enter Aadhaar Number';
  personDetails = {
    ACCOUNT_NUMBER: '',
    AMOUNT: '',
    BANKACCNO_UPD: '',
    BANK_BRANCH: '',
    BANK_NAME: '',
    BANK_PINCODE: '',
    FARMER_CODE: '',
    FARMER_KISSANCARD: null,
    FARMER_NAME: '',
    IFSC_CODE: '',
    INDENTS_RAISED: '',
    INDENT_STATUS: '',
    INDENT_STATUS_MSG: '',
    MOBILE_NUMBER: '',
    NO_OF_MILCH_ANIMALS: '',
    PASSBOOK_IMG: null,
    REMAINING_AMOUNT: '',
    UID_NUM: '',
    DISTRICT: '',
    DIST_CODE: '',
    MANDAL_CODE: '',
    MANDAL_NAME: '',
    RBK_CODE: '',
    RBK_NAME: '',
    VDCS_CODE: '',
    VILLAGECODE: '',
    VILLAGE_NAME: '',
    NO_OF_INDENTS_CAN_BE_RAISED: '',
    REMAINING_INDENTS: '',
  };
  passBookImg = '';
  kisanCreditCardImg = '';
  role = '';
  uidNum = '';
  indentFeedInKgs = '0';

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
    this.role = this.session.desigId;
  }

  uidNummaskIputData(value) {
     
    if (value.length > 0) {
 
  
    if(value.length>=12){
     
      const response = this.utils.validateVerhoeff(value);    //this.uidNum
      if (response == true) {
        this.spinner.hide();
      } else {
        this.uidNum='';
               alert("Invalid Aadhar Number...!");
        this.spinner.hide();

      }
      return
    }

  }  

  return;
  
}
  onSelectionChange() {
    if (this.inputRadio === '1') { this.uidNum1=true;this.frmNum1=false; this.uidNum='';this.frmNum='';
      this.inputPlaceHolder = 'Please Enter   Aadhaar Number';
     
      this.clearInputs();
    } else if (this.inputRadio === '2') { this.uidNum1=false;this.frmNum1=true; this.uidNum='';this.frmNum='';
      this.inputPlaceHolder = 'Please Enter Farmer Code';
      this.clearInputs();
    } else { this.uidNum1=false;this.frmNum1=true; this.uidNum='';this.frmNum='';
      this.inputPlaceHolder = 'Please Enter Bank Account Number';
      this.clearInputs();
    }
  }

  clearInputs() {
    this.uidNum = '';
    this.indentFeedInKgs = '0';
    this.personDetails = {
      ACCOUNT_NUMBER: '',
      AMOUNT: '',
      BANKACCNO_UPD: '',
      BANK_BRANCH: '',
      BANK_NAME: '',
      BANK_PINCODE: '',
      FARMER_CODE: '',
      FARMER_KISSANCARD: null,
      FARMER_NAME: '',
      IFSC_CODE: '',
      INDENTS_RAISED: '',
      INDENT_STATUS: '',
      INDENT_STATUS_MSG: '',
      MOBILE_NUMBER: '',
      NO_OF_MILCH_ANIMALS: '',
      PASSBOOK_IMG: null,
      REMAINING_AMOUNT: '',
      UID_NUM: '',
      DISTRICT: '',
      DIST_CODE: '',
      MANDAL_CODE: '',
      MANDAL_NAME: '',
      RBK_CODE: '',
      RBK_NAME: '',
      VDCS_CODE: '',
      VILLAGECODE: '',
      VILLAGE_NAME: '',
      NO_OF_INDENTS_CAN_BE_RAISED: '',
      REMAINING_INDENTS: '',
    };
  }

  async btnUidDetails(): Promise<void> {
    try {
      this.noDataMessage = '';
      this.personDetails = {
        ACCOUNT_NUMBER: '',
        AMOUNT: '',
        BANKACCNO_UPD: '',
        BANK_BRANCH: '',
        BANK_NAME: '',
        BANK_PINCODE: '',
        FARMER_CODE: '',
        FARMER_KISSANCARD: null,
        FARMER_NAME: '',
        IFSC_CODE: '',
        INDENTS_RAISED: '',
        INDENT_STATUS: '',
        INDENT_STATUS_MSG: '',
        MOBILE_NUMBER: '',
        NO_OF_MILCH_ANIMALS: '',
        PASSBOOK_IMG: null,
        REMAINING_AMOUNT: '',
        UID_NUM: '',
        DISTRICT: '',
        DIST_CODE: '',
        MANDAL_CODE: '',
        MANDAL_NAME: '',
        RBK_CODE: '',
        RBK_NAME: '',
        VDCS_CODE: '',
        VILLAGECODE: '',
        VILLAGE_NAME: '',
        NO_OF_INDENTS_CAN_BE_RAISED: '',
        REMAINING_INDENTS: '',
      };

      if (
        this.inputRadio === null ||
        this.inputRadio === undefined ||
        this.inputRadio === ''
      ) {
        this.toast.warning(
          'Please Select Aadhaar Number / Farmer Code / Bank Account No'
        );
        return;
      }

      if (this.inputRadio === '1') {
        if (
          this.uidNum === null ||
          this.uidNum === undefined ||
          this.uidNum === ''
        ) {
          this.toast.warning('Please Enter Farmer Aadhaar Number');
          return;
        }
        if (!this.utils.validateVerhoeff(this.uidNum)) {
          this.toast.warning('Please Enter Valid Aadhaar Number');
          return;
        }
      }

      if (this.inputRadio === '2') {
        if (
          this.frmNum === null ||
          this.frmNum === undefined ||
          this.frmNum === ''
        ) {
          this.toast.warning('Please Enter Farmer Code');
          return;
        }else this.uidNum=this.frmNum;
        if (this.frmNum.length !== 8) {
          this.toast.warning('Please Enter Valid Farmer Code');
          return;
        }else this.uidNum=this.frmNum;
      }

      if (this.inputRadio === '3') {
        if (
          this.frmNum === null ||
          this.frmNum === undefined ||
          this.frmNum === ''
        ) {
          this.toast.warning('Please Enter Bank Account Number');
          return;
        } else this.uidNum=this.frmNum;
      }

      const req = {
        uidNum: this.uidNum,
        insertedBy: this.session.userName,
      };
      this.spinner.show();
      const response = await this.farmerAPI.farmerFeedIndentDetails(req);
      if (response.success) {
        this.personDetails = response.result[0];
        // if (!this.utils.isEmpty(this.personDetails.PASSBOOK_IMG)) {
        //   this.passBookImg = await this.getBaseFile(
        //     this.personDetails.PASSBOOK_IMG
        //   );
        // }
        if (this.personDetails.FARMER_KISSANCARD !== 'NA') {
          this.kisanCreditCardImg = await this.getBaseFile(
            this.personDetails.FARMER_KISSANCARD
          );
        }
      } else {
        this.noDataMessage = response.message;
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async getBaseFile(path): Promise<string> {
    try {
      if (!this.utils.isEmpty(path)) {
        this.spinner.show();
        const response = await this.utils.DMSFileDownload(path);
        this.spinner.hide();
        if (response.success) {
          return response.result;
        }
      }
      return '';
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  btnImage(image): void {
    if (!this.utils.isEmpty(image)) {
      this.utils.viewImage(image);
    } else {
      this.toast.warning('Image is Not Available');
    }
  }

  async btnIndentRequest(): Promise<void> {
    try {
      const feedIndent = parseFloat(this.indentFeedInKgs) || 0;
      const suggestedFeed = parseFloat(
        this.personDetails.NO_OF_INDENTS_CAN_BE_RAISED
      );
      const remainingFeed = parseFloat(
        this.personDetails.REMAINING_INDENTS
      );

      if (this.utils.isEmpty(feedIndent) || feedIndent < 0.1) {
        this.toast.warning('Please Enter Indent');
        return;
      }
      if (feedIndent > suggestedFeed) {
        this.toast.warning(
          'Indent Feed Should be Below Suggested Feed'
        );
        return;
      }
      if (feedIndent > remainingFeed) {
        this.toast.warning(
          'Indent Feed Should be Below Remaining Feed'
        );
        return;
      }
      const req = {
        uidNum: this.personDetails.UID_NUM,
        villageId: this.personDetails.VILLAGECODE,
        mobileNum: this.personDetails.MOBILE_NUMBER,
        insertedBy: this.session.userName,
        indentFeedInKgs: this.indentFeedInKgs,
        source: 'web',
      };
      this.spinner.show();
      const response = await this.farmerAPI.feedIndentRequestSub(req);
      if (response.success) {
        alert(response.message);
        window.location.reload();
      } else {
        this.spinner.hide();
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
}
