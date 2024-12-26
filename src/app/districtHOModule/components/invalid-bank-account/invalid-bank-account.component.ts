import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { DistrictHoService } from '../../services/district-ho.service';

@Component({
  selector: 'app-invalid-bank-account',
  templateUrl: './invalid-bank-account.component.html',
  styleUrls: ['./invalid-bank-account.component.css'],
})
export class InvalidBankAccountComponent implements OnInit {
  uidNum = ''; frmNum=''; id='';
  inputPlaceHolder = 'Please Enter  Aadhaar Number';  //Farmer
  inputPlaceHolderfrmnum='';//Please Enter Farmer Number
  inputRadio = '1';
  personDetails = {
    ACCOUNT_NUMBER: '',
    BANKACCNO_UPD: '',
    BANK_BRANCH: '',
    BANK_NAME: '',
    BANK_PINCODE: '',
    DISTRICT: '',
    DIST_CODE: '',
    FARMER_CODE: '',
    FARMER_NAME: '',
    IFSC_CODE: '',
    MANDAL_CODE: '',
    MANDAL_NAME: '',
    MICR_CODE: '',
    MOBILE_NUMBER: '',
    PAN_CARD: '',
    PASSBOOK_IMG: null,
    RBK_CODE: '',
    RBK_NAME: '',
    UID_NUM: '',
    VILLAGE_CODE: '',
    VILLAGE_NAME: '',
  }; 
  bankImage = '';
  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private invalidBankAccAPI: DistrictHoService,
    private utils: UtilsService,
    private sanitizer: DomSanitizer,
    private logger: LoggerService,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    document.getElementById('uidNum').style.display='block';
    document.getElementById('frmNum').style.display='none';
    if(this.session.uniqueId !="" && this.session.desigId != ""){
  
    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
   
  }

  onSelectionChange(): void {
    if (this.inputRadio === '1') {
     
      this.inputPlaceHolderfrmnum='';
      document.getElementById('uidNum').style.display='block';
      document.getElementById('frmNum').style.display='none';
      this.inputPlaceHolder = 'Please Enter Aadhaar Number';
      this.btnClear();
    } else {
      document.getElementById('uidNum').style.display='none';
      document.getElementById('frmNum').style.display='block';
     // this.inputPlaceHolder = 'Please Enter Farmer Code';
     this.inputPlaceHolder = '';
      this.inputPlaceHolderfrmnum='Please Enter Farmer Code';
      this.btnClear();
    }
  }

  async btnUidDetails(): Promise<void> {
    try {
      this.personDetails = {
        ACCOUNT_NUMBER: '',
        BANKACCNO_UPD: '',
        BANK_BRANCH: '',
        BANK_NAME: '',
        BANK_PINCODE: '',
        DISTRICT: '',
        DIST_CODE: '',
        FARMER_CODE: '',
        FARMER_NAME: '',
        IFSC_CODE: '',
        MANDAL_CODE: '',
        MANDAL_NAME: '',
        MICR_CODE: '',
        MOBILE_NUMBER: '',
        PAN_CARD: '',
        PASSBOOK_IMG: null,
        RBK_CODE: '',
        RBK_NAME: '',
        UID_NUM: '',
        VILLAGE_CODE: '',
        VILLAGE_NAME: '',
      };  this.id='0';

      if (
        this.inputRadio === null ||
        this.inputRadio === undefined ||
        this.inputRadio === ''
      ) {
        this.toast.warning(
          'Please Select Aadhaar Number ' /// Farmer Code / Bank Account No
        );
        return;
      }

      if (this.inputRadio === '1') {
        if (
          this.uidNum === null ||
          this.uidNum === undefined ||
          this.uidNum === ''
        ) {this.id='1';
          this.toast.warning('Please Enter  Aadhar Number');//Farmer
          return;
        }
        if (!this.utils.validateVerhoeff(this.uidNum)) { this.id='1';
          this.toast.warning('Please Enter Valid Aadhaar Number');
          return;
        }
      }
      // else{
      //   {this.id='1';
      //       this.toast.warning('Please select  Aadhar Number');//Farmer
      //       return;
      //     }
      // }

      if (this.inputRadio === '2') {
        if (
          this.frmNum === null ||
          this.frmNum === undefined ||
          this.frmNum === ''
        ) {this.id='1';
          this.toast.warning('Please Enter Farmer Code');
          return;
        }else this.uidNum=this.frmNum;
        if (this.frmNum.length !== 8) {this.id='1';
          this.toast.warning('Please Enter Valid Farmer Code');
          return;
        }else   this.uidNum=this.frmNum;
      }
if(this.id==='0'){
      const req = {
        type:23,
        accountNo: this.uidNum,
      };
      this.spinner.show();
     // const response = await this.invalidBankAccAPI.regFarmerDetailsByUid(req); 
       const response = await this.invalidBankAccAPI.regFarmerDetailsByUidBymentorrequest(req);//regFarmerDetailsByUid
      if (response.success) {
        this.personDetails = response.result[0];
        if(response.result[0].STATUS=="0")
          this.toast.info(response.result[0].MSG);
        // tslint:disable-next-line: max-line-length
        if (
          this.personDetails.PASSBOOK_IMG !== null &&
          this.personDetails.PASSBOOK_IMG !== undefined &&
          this.personDetails.PASSBOOK_IMG !== ''
        ) {
          this.loadBankImage(this.personDetails.PASSBOOK_IMG);
        }
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    }


    

    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
//   async btnUidDetails1(): Promise<void> {
//     try {
//       this.personDetails = {
//         ACCOUNT_NUMBER: '',
//         BANKACCNO_UPD: '',
//         BANK_BRANCH: '',
//         BANK_NAME: '',
//         BANK_PINCODE: '',
//         DISTRICT: '',
//         DIST_CODE: '',
//         FARMER_CODE: '',
//         FARMER_NAME: '',
//         IFSC_CODE: '',
//         MANDAL_CODE: '',
//         MANDAL_NAME: '',
//         MICR_CODE: '',
//         MOBILE_NUMBER: '',
//         PAN_CARD: '',
//         PASSBOOK_IMG: null,
//         RBK_CODE: '',
//         RBK_NAME: '',
//         UID_NUM: '',
//         VILLAGE_CODE: '',
//         VILLAGE_NAME: '',
         
//       };this.uidNum='';this.id='0';
// debugger;
//       if (
//         this.inputRadio === null ||
//         this.inputRadio === undefined ||
//         this.inputRadio === ''
//       ) {
//         this.toast.warning(
//           'Please Select Farmer Code Number'//Aadhaar Number / Farmer Code / Bank Account No'
//         );
//         return;
//       }
//       if (this.inputRadio === '2') {
//       // if (this.inputRadio === '1') {
//       //   if (
//       //     this.uidNum === null ||
//       //     this.uidNum === undefined ||
//       //     this.uidNum === ''
//       //   ) {
//       //     this.toast.warning('Please Enter Farmer Aadhar Number');
//       //     return;
//       //   }
//       //   if (!this.utils.validateVerhoeff(this.uidNum)) {
//       //     this.toast.warning('Please Enter Valid Aadhaar Number');
//       //     return;
//       //   }
//       // }

//       if (this.inputRadio === '2') {
//         if (
//           this.frmNum === null ||
//           this.frmNum === undefined ||
//           this.frmNum === ''
//         ) {  this.id='1';
//           this.toast.warning('Please Enter Farmer Code Number');
//           return;
//         }
//         if (this.frmNum.length !== 8) { this.id='1';
//           this.toast.warning('Please Enter Valid Farmer Code');
//           return;
//         }
//       }
// if(this.id==='0'){
//       const req = {
//         accountNo: this.frmNum,
//       };
//       this.spinner.show();
//       const response = await this.invalidBankAccAPI.regFarmerDetailsByUid(req);
//       if (response.success) {
//         this.personDetails = response.result[0];
//         // tslint:disable-next-line: max-line-length
//         if (
//           this.personDetails.PASSBOOK_IMG !== null &&
//           this.personDetails.PASSBOOK_IMG !== undefined &&
//           this.personDetails.PASSBOOK_IMG !== ''
//         ) {
//           this.loadBankImage(this.personDetails.PASSBOOK_IMG);
//         }
//       } else {
//         this.toast.info(response.message);
//       }
//       this.spinner.hide();
//     }
//   }else {this.toast.warning('Please Select Farmer Code Number');
//   return;}

//     } catch (error) {
//       this.spinner.hide();
//       this.utils.catchResponse(error);
//     }
//   }

  async loadBankImage(imagePath: any): Promise<void> {
    try {
      this.spinner.show();
      const response = await this.utils.JPVReportsDMSFileDownload(imagePath);// DMSFileDownload
      if (response.success) {
        this.bankImage = (
          this.sanitizer.bypassSecurityTrustResourceUrl(response.result) as any
        ).changingThisBreaksApplicationSecurity;
      } else {
        this.spinner.hide();
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  btnImage(image): void {
    this.utils.viewImage(image);
    // this.toast.showImage(image);
  }

  async btnBankAccUpdate(): Promise<void> {
    try {
      if (
        confirm(
          'Are you sure you want to make bank account as invalid for this farmer ?'
        )
      ) {
        const req = {
       //   type:24,//extra added
          uidNum: this.personDetails.UID_NUM,
        };
        this.spinner.show();
         const response = await this.invalidBankAccAPI.invalidBankAccountUpdate(req);

      
        if (response.success) {
          alert(response.message);
          window.location.reload();
        } else {
          this.toast.info(response.message);
        }
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  btnClear(): void {
    this.uidNum = '';
    this.personDetails = {
      ACCOUNT_NUMBER: '',
      BANKACCNO_UPD: '',
      BANK_BRANCH: '',
      BANK_NAME: '',
      BANK_PINCODE: '',
      DISTRICT: '',
      DIST_CODE: '',
      FARMER_CODE: '',
      FARMER_NAME: '',
      IFSC_CODE: '',
      MANDAL_CODE: '',
      MANDAL_NAME: '',
      MICR_CODE: '',
      MOBILE_NUMBER: '',
      PAN_CARD: '',
      PASSBOOK_IMG: null,
      RBK_CODE: '',
      RBK_NAME: '',
      UID_NUM: '',
      VILLAGE_CODE: '',
      VILLAGE_NAME: '',
    };
  }



  btnpendingDetails(){
    try {

      this.router.navigate(['/districtHOModule/invalidbankrequeststatusdetails'], {});   

    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
}
}
