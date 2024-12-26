import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
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
import { FarmerService } from '../../services/farmer.service';

@Component({
  selector: 'app-farmer-kcc-upload',
  templateUrl: './farmer-kcc-upload.component.html',
  styleUrls: ['./farmer-kcc-upload.component.css'],
})
export class FarmerKccUploadComponent implements OnInit {
  @ViewChild('kisanCardImgUpload') kisanCardImgUpload: ElementRef;

  noDataMessage = '';
  inputPlaceHolder = 'Please Enter Aadhaar Number';
  uidNum = '';frmNum=''
  inputRadio = '1';
  excelData = [];
  personDetails = {
    BRANCH: '',
    BANK_NAME: '',
    BANK_PINCODE: '',
    DISTRICT: '',
    DIST_CODE: '',
    FARMER_CODE: '',
    FARMER_NAME: '',
    IFSC_CODE: '',
    MANDAL_CODE: '',
    MANDAL_NAME: '',
    MOBILE_NUMBER: '',
    RBK_CODE: '',
    RBK_NAME: '',
    UID_NUM: '',
    VILLAGE_CODE: '',
    VILLAGE_NAME: '',
    FARMER_KCC_IMG: null,
    STATUS: '',
  };
  kisanCreditCardImg = '';
  ifscCode = '';
  bankPinCode = '';
  bankDetails = {
    BRANCH: '',
    BANK_NAME: '',
  };

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
    this.uidNum='';
    this.frmNum='';
    document.getElementById('uidNum').style.display='block';
    document.getElementById('frmNum').style.display='none'; 
    if(this.session.uniqueId !="" && this.session.desigId != ""){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
  }

  onSelectionChange() {
    if (this.inputRadio === '1') {
      document.getElementById('uidNum').style.display='block';
      document.getElementById('frmNum').style.display='none'; 
      this.inputPlaceHolder = 'Please Enter Aadhaar Number';
      this.clearInputs();
    } else if (this.inputRadio === '2') {
      document.getElementById('uidNum').style.display='none';
      document.getElementById('frmNum').style.display='block'; 
      this.inputPlaceHolder = 'Please Enter Farmer Code';
      this.clearInputs();
    }
  }

  clearInputs() {
    this.uidNum = '';this.frmNum='';
    this.ifscCode = '';
    this.bankPinCode = '';
    this.personDetails = {
      BRANCH: '',
      BANK_NAME: '',
      BANK_PINCODE: '',
      DISTRICT: '',
      DIST_CODE: '',
      FARMER_CODE: '',
      FARMER_NAME: '',
      IFSC_CODE: '',
      MANDAL_CODE: '',
      MANDAL_NAME: '',
      MOBILE_NUMBER: '',
      RBK_CODE: '',
      RBK_NAME: '',
      UID_NUM: '',
      VILLAGE_CODE: '',
      VILLAGE_NAME: '',
      FARMER_KCC_IMG: null,
      STATUS: '',
    };
    this.bankDetails = {
      BRANCH: '',
      BANK_NAME: '',
    };
    this.noDataMessage = '';
  }

  async btnUidDetails(): Promise<void> {
    try {
      this.noDataMessage = '';
      this.personDetails = {
        BRANCH: '',
        BANK_NAME: '',
        BANK_PINCODE: '',
        DISTRICT: '',
        DIST_CODE: '',
        FARMER_CODE: '',
        FARMER_NAME: '',
        IFSC_CODE: '',
        MANDAL_CODE: '',
        MANDAL_NAME: '',
        MOBILE_NUMBER: '',
        RBK_CODE: '',
        RBK_NAME: '',
        UID_NUM: '',
        VILLAGE_CODE: '',
        VILLAGE_NAME: '',
        FARMER_KCC_IMG: null,
        STATUS: '',
      };
      this.bankDetails = {
        BRANCH: '',
        BANK_NAME: '',
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
          this.toast.warning('Please Enter Farmer Aadhar Number');
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
        }//else this.uidNum=this.frmNum;
      }

      const req = {
        uidNum: this.uidNum,
        uniqueId: this.session.uniqueId,
      };
      this.spinner.show();
      const response = await this.farmerAPI.farmerKCCDetails(req);
      if (response.success) {
        this.personDetails = response.result[0];
        if (this.personDetails.FARMER_KCC_IMG !== 'NA') {
          this.kisanCreditCardImg = await this.getBaseFile(
            this.personDetails.FARMER_KCC_IMG
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

  async btnVerifyIfscCode(): Promise<void> {
    try {
      if (this.utils.isEmpty(this.ifscCode)) {
        this.toast.warning('Please Enter IFSC CODE');
        return;
      }

      const req = {
        ifscCode: this.ifscCode,
      };
      this.spinner.show();
      const response = await this.farmerAPI.searchByIFSC(req);
      this.spinner.hide();
      if (response.success) {
        this.bankDetails.BANK_NAME = response.result[0].BANK;
        this.bankDetails.BRANCH = response.result[0].BRANCH;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onKisanCreditCardImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.kisanCreditCardImg = res.replace('data:image/jpeg;base64,', '');
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async btnSubmit(): Promise<void> {
    try {
      if (this.utils.isEmpty(this.ifscCode)) {
        this.toast.warning('Please Enter IFSC CODE');
        return;
      }
      if (this.utils.isEmpty(this.bankDetails.BANK_NAME)) {
        this.toast.warning('Bank Name is Empty');
        return;
      }
      if (this.utils.isEmpty(this.bankDetails.BRANCH)) {
        this.toast.warning('Branch Name is Empty');
        return;
      }
      if (this.utils.isEmpty(this.bankPinCode)) {
        this.toast.warning('Please Enter Bank Pincode');
        return;
      }
      if (!this.utils.pinCodeCheck(this.bankPinCode)) {
        this.toast.warning('Please Enter Valid PINCODE');
        return;
      }
      if (this.utils.isEmpty(this.kisanCreditCardImg)) {
        this.toast.warning('Please Upload Kisan Credit Card Image');
        return;
      }

      const req = {
        uidNum: this.personDetails.UID_NUM,
        farmerId: this.personDetails.FARMER_CODE,
        kisanCreditCardImg: this.kisanCreditCardImg,
        insertedBy: this.session.userName,
        source: 'web',
        districtId: this.personDetails.DIST_CODE,
        mandalId: this.personDetails.MANDAL_CODE,
        rbkId: this.personDetails.RBK_CODE,
        villageId: this.personDetails.VILLAGE_CODE,
        ifscCode: this.ifscCode,
        bankName: this.bankDetails.BANK_NAME,
        branchName: this.bankDetails.BRANCH,
        bankPinCode: this.bankPinCode,
      };
      this.spinner.show();
      const response = await this.farmerAPI.kisanCreditCardSub(req);
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
}
