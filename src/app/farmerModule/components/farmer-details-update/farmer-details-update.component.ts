import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { timeStamp } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { FarmerService } from '../../services/farmer.service';

@Component({
  selector: 'app-farmer-details-update',
  templateUrl: './farmer-details-update.component.html',
  styleUrls: ['./farmer-details-update.component.css'],
})
export class FarmerDetailsUpdateComponent implements OnInit {
  @ViewChild('passBookImgUpload') passBookImgUpload: ElementRef;

  inputPlaceHolder = 'Please Enter Aadhaar Number';
  bankDetailsPopUp = false;
  bankconfirmationPopUp=false;
  animalsDetailsPopUp = false;
  mobileNumberPopUp = false;
  bankAccLength = '';
  inputRadio = '1';
  personDetails = {
    UID_NUM: '',
    MOBILE_NUMBER: '',
    FARMER_CODE: '',
    FARMER_NAME: '',
    DISTRICT_NAME: '',
    DISTRICT_CODE: '',
    MANDAL_NAME: '',
    MANDAL_CODE: '',
    RBK_NAME: '',
    RBK_CODE: '',
    VILLAGE_NAME: '',
    VILLAGECODE: '',
    PASSBOOK_IMG: null,
    ACCOUNT_NUMBER: '',
    BANK_BRANCH: '',
    BANK_NAME: '',
    BANK_PINCODE: '',
    IFSC_CODE: '',
    MICR_CODE: '',
    MILK_POTENTIAL_BUFFALO: '',
    MILK_POTENTIAL_COW: '',
    NOOFBUFFALOFEMALE: '',
    NOOFBUFFALOMALE: '',
    NOOFWHITECALLTEFEMALE: '',
    NOOFWHITECATTLEMALE: '',
    NO_OF_MILCH_ANIMALS_BUFFALO: '',
    NO_OF_MILCH_ANIMALS_COW: '',
    STATUS: '',
  };
  farmerDetails = {
    updatedBy: '',
    source: '',
    uidNum: '',
    frmNum:'',
    mobileNum: '',
    farmerId: '',
    districtId: '',
    mandalId: '',
    rbkId: '',
    villageId: '',
    passBookImg: '',
    accountNo: '',
    bankName: '',
    branchName: '',
    ifscCode: '',
    micrNo: '',
    bankPinCode: '',
    milkPotentialBuffalo: '',
    milkPotentialCow: '',
    noOfBuffaloFemale: '',
    noOfBuffaloMale: '',
    noOfWhiteCattleFemale: '',
    noOfWhiteCattleMale: '',
    noOfMilchAnimalsBuffalo: '',
    noOfMilchAnimalsCow: '',
  };

  passBookImg = '';

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
    document.getElementById('uidNum').style.display='block';
    document.getElementById('frmNum').style.display='none';

    if(this.session.uniqueId !="" && this.session.desigId != ""){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    this.farmerDetails.updatedBy = this.session.userName;
  }

  onSelectionChange() {
    if (this.inputRadio === '1') {
      document.getElementById('uidNum').style.display='block';
      document.getElementById('frmNum').style.display='none';
      this.inputPlaceHolder = 'Please Enter Farmer Aadhaar Number';
      this.clearInputs();
    } else {
      document.getElementById('uidNum').style.display='none';
      document.getElementById('frmNum').style.display='block';
      this.inputPlaceHolder = 'Please Enter Farmer Code';
      this.clearInputs();
    }
  }

  clearInputs() {
    this.farmerDetails.uidNum = ''; this.farmerDetails.frmNum = '';
    this.personDetails = {
      UID_NUM: '', 
      MOBILE_NUMBER: '',  
      FARMER_CODE: '',
      FARMER_NAME: '',
      DISTRICT_NAME: '',
      DISTRICT_CODE: '',
      MANDAL_NAME: '',
      MANDAL_CODE: '',
      RBK_NAME: '',
      RBK_CODE: '',
      VILLAGE_NAME: '',
      VILLAGECODE: '',
      PASSBOOK_IMG: null,
      ACCOUNT_NUMBER: '',
      BANK_BRANCH: '',
      BANK_NAME: '',
      BANK_PINCODE: '',
      IFSC_CODE: '',
      MICR_CODE: '',
      MILK_POTENTIAL_BUFFALO: '',
      MILK_POTENTIAL_COW: '',
      NOOFBUFFALOFEMALE: '',
      NOOFBUFFALOMALE: '',
      NOOFWHITECALLTEFEMALE: '',
      NOOFWHITECATTLEMALE: '',
      NO_OF_MILCH_ANIMALS_BUFFALO: '',
      NO_OF_MILCH_ANIMALS_COW: '',
      STATUS: '',
    };
  }

  async btnUidDetails(): Promise<void> {
    try {
      this.personDetails = {
        UID_NUM: '',
        MOBILE_NUMBER: '',
        FARMER_CODE: '',
        FARMER_NAME: '',
        DISTRICT_NAME: '',
        DISTRICT_CODE: '',
        MANDAL_NAME: '',
        MANDAL_CODE: '',
        RBK_NAME: '',
        RBK_CODE: '',
        VILLAGE_NAME: '',
        VILLAGECODE: '',
        PASSBOOK_IMG: null,
        ACCOUNT_NUMBER: '',
        BANK_BRANCH: '',
        BANK_NAME: '',
        BANK_PINCODE: '',
        IFSC_CODE: '',
        MICR_CODE: '',
        MILK_POTENTIAL_BUFFALO: '',
        MILK_POTENTIAL_COW: '',
        NOOFBUFFALOFEMALE: '',
        NOOFBUFFALOMALE: '',
        NOOFWHITECALLTEFEMALE: '',
        NOOFWHITECATTLEMALE: '',
        NO_OF_MILCH_ANIMALS_BUFFALO: '',
        NO_OF_MILCH_ANIMALS_COW: '',
        STATUS: '',
      };

      if (this.utils.isEmpty(this.inputRadio)) {
        this.toast.warning('Please Select Aadhaar Number / Farmer Code');
        return;
      }

      if (this.inputRadio === '1') {
        if (this.utils.isEmpty(this.farmerDetails.uidNum)) {
          this.toast.warning('Please Enter Farmer Aadhar Number');
          return;
        }
        if (!this.utils.validateVerhoeff(this.farmerDetails.uidNum)) {
          this.toast.warning('Please Enter Valid Aadhaar Number');
          return;
        }
      }

      if (this.inputRadio === '2') {
        if (this.utils.isEmpty(this.farmerDetails.frmNum)) {
          this.toast.warning('Please Enter Farmer Code');
          return;
        } else this.farmerDetails.uidNum=this.farmerDetails.frmNum;
        if (this.farmerDetails.frmNum.length !== 8) {
          this.toast.warning('Please Enter Valid Farmer Code');
          return;
        }else this.farmerDetails.uidNum=this.farmerDetails.frmNum;
      }

      const req = {
        uidNum: this.farmerDetails.uidNum,
      };
      this.spinner.show();
      const response = await this.farmerAPI.personDetailsByFarmerId(req);
      if (response.success) {
        this.personDetails = response.result[0];
        if (!this.utils.isEmpty(this.personDetails.PASSBOOK_IMG)) {
          this.passBookImg = await this.getBaseFile(
            this.personDetails.PASSBOOK_IMG
          );
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

  btnMobileNoPopUp(): void {
    this.mobileNumberPopUp = true;
    this.farmerDetails.mobileNum = this.personDetails.MOBILE_NUMBER;
  }

  uidNummaskIputData(value) {
     
    if (value.length > 0) {
 
  //   if (this.uidNum.length > value.length) {
  //     this.uidNum = this.uidNum.substring(0, value.length);
  //   } 
  //   else {
  //     this.uidNum += String(value).slice(-1);        
  //     const valueSplit = value.split('');
  //     let maskedValue = '';
  //     valueSplit.forEach((element, index) => {
  //       if (index < 8) {
  //         maskedValue += "X";
  //       } else {
  //         maskedValue += element;
  //       }

  //     });
  //     this.statusuidNum = maskedValue;
  //   }
    if(value.length>=12){
     
      const response = this.utils.validateVerhoeff(value);    //this.uidNum
      if (response == true) {
        this.spinner.hide();
      } else {
        this.farmerDetails.uidNum='';
               alert("Invalid Aadhar Number...!");
        this.spinner.hide();

      }
      return
    }

  }  

  return;
  
}
  async btnMobileNoUpdate(): Promise<void> {
    try {
      if (this.utils.isEmpty(this.farmerDetails.mobileNum)) {
        this.toast.warning('Please Enter Mobile Number');
        return;
      }
      if (!this.utils.mobileNumCheck(this.farmerDetails.mobileNum)) {
        this.toast.warning('Please Enter Valid Mobile Number');
        return;
      }
// if(this.utils.isEmpty(this.farmerDetails.frmNum)){
//   if(this.utils.isEmpty(this.farmerDetails.uidNum)) {}else{}
// }
      const req = {
        uidNum: this.personDetails.UID_NUM,
        farmerId: this.personDetails.FARMER_CODE,
        mobileNum: this.farmerDetails.mobileNum,
        updatedBy: this.farmerDetails.updatedBy,
        source: 'web',
      };
      this.spinner.show();
      const response = await this.farmerAPI.farmerMobileUpdate(req);
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

  btnBankDetailsPopUp(): void {
    this.bankDetailsPopUp = true;
    //.bankconfirmationPopUp = true;
  }
  btnrequest(event):void{

    if(event==='1')
    { 
      // if (this.utils.isEmpty(this.farmerDetails.accountNo)) {
      //   this.toast.warning('Please Enter Bank Account Number');
      //   return;
      // }
      // if (this.utils.isEmpty(this.farmerDetails.ifscCode)) {
      //   this.toast.warning('Please Enter IFSC Code');
      //   return;
      // }
      // if (this.utils.isEmpty(this.farmerDetails.bankName)) {
      //   this.toast.warning('Please Enter Valid IFSC Code');
      //   return;
      // }
      // if (this.utils.isEmpty(this.farmerDetails.branchName)) {
      //   this.toast.warning('Please Enter Valid IFSC Code');
      //   return;
      // }
      // if (this.utils.isEmpty(this.farmerDetails.micrNo)) {
      //   this.toast.warning('Please Enter Valid IFSC Code');
      //   return;
      // }
      if (this.utils.isEmpty(this.farmerDetails.passBookImg)) {
        this.toast.warning('Please Upload Bank PassBook Image');
        return;
      }
      // if (this.utils.isEmpty(this.farmerDetails.bankPinCode)) {
      //   this.toast.warning('Please Enter Pincode');
      //   return;
      // }
      // if (!this.utils.pinCodeCheck(this.farmerDetails.bankPinCode)) {
      //   this.toast.warning('Please Enter Valid PINCODE');
      //   return;
      // }

      const req = {
        uidNum: this.personDetails.UID_NUM,
        farmerId: this.personDetails.FARMER_CODE,
        updatedBy: this.farmerDetails.updatedBy,
        source: 'web',
        districtId: this.personDetails.DISTRICT_CODE,
        mandalId: this.personDetails.MANDAL_CODE,
        rbkId: this.personDetails.RBK_CODE,
        villageId: this.personDetails.VILLAGECODE,
        passBookImg: this.farmerDetails.passBookImg,
        accountNo: this.farmerDetails.accountNo,
        ifscCode: this.farmerDetails.ifscCode,
        bankName: this.farmerDetails.bankName,
        branchName: this.farmerDetails.branchName,
        micrNo: this.farmerDetails.micrNo,
        bankPinCode: this.farmerDetails.bankPinCode,
      };
       this.spinner.show();
      // const response = await this.farmerAPI.farmerBankDetailsUpdate(req);
      // if (response.success) {
      //   alert(response.message);
      //   window.location.reload();
      // } else {
      //   this.spinner.hide();
      //   this.toast.info(response.message);
     // }

      this.toast.success('Request Raised');
      this.bankconfirmationPopUp = false;
      this.bankDetailsPopUp = false;


    }
    else{
      this.bankconfirmationPopUp = false;
    } 
  }
  async btnVerifyIfscCode(): Promise<void> {
    try {
      if (this.utils.isEmpty(this.farmerDetails.accountNo)) {
        this.toast.warning('Please Enter Account No');
        return;
      }

      if (this.utils.isEmpty(this.farmerDetails.ifscCode)) {
        this.toast.warning('Please Enter IFSC CODE');
        return;
      }

      const req = {
        ifscCode: this.farmerDetails.ifscCode,
      };
      this.spinner.show();
      const response = await this.farmerAPI.searchByIFSC(req);
      this.spinner.hide();
      if (response.success) {
        let count = 0;
        for (let i = 0; i < response.result.length; i++) {
          if (
            this.farmerDetails.accountNo.length.toString() ===
            response.result[i].ACCOUNTLENGTH
          ) {
            this.farmerDetails.bankName = response.result[i].BANK;
            this.farmerDetails.branchName = response.result[i].BRANCH;
            this.bankAccLength = response.result[i].ACCOUNTLENGTH;
            this.farmerDetails.micrNo = response.result[i].MICR_CODE;
            count++;
            break;
          }
        }
        if (count < 1) {
          this.toast.info('Invalid bank account number for entered IFSC Code');
        }
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onPassBookImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.farmerDetails.passBookImg = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async btnBankDetailsUpdate(): Promise<void> {
    try {
      this.bankconfirmationPopUp = true;
      

      // if (this.utils.isEmpty(this.farmerDetails.accountNo)) {
      //   this.toast.warning('Please Enter Bank Account Number');
      //   return;
      // }
      // if (this.utils.isEmpty(this.farmerDetails.ifscCode)) {
      //   this.toast.warning('Please Enter IFSC Code');
      //   return;
      // }
      // if (this.utils.isEmpty(this.farmerDetails.bankName)) {
      //   this.toast.warning('Please Enter Valid IFSC Code');
      //   return;
      // }
      // if (this.utils.isEmpty(this.farmerDetails.branchName)) {
      //   this.toast.warning('Please Enter Valid IFSC Code');
      //   return;
      // }
      // if (this.utils.isEmpty(this.farmerDetails.micrNo)) {
      //   this.toast.warning('Please Enter Valid IFSC Code');
      //   return;
      // }
      // if (this.utils.isEmpty(this.farmerDetails.passBookImg)) {
      //   this.toast.warning('Please Upload Bank PassBook Image');
      //   return;
      // }
      // if (this.utils.isEmpty(this.farmerDetails.bankPinCode)) {
      //   this.toast.warning('Please Enter Pincode');
      //   return;
      // }
      // if (!this.utils.pinCodeCheck(this.farmerDetails.bankPinCode)) {
      //   this.toast.warning('Please Enter Valid PINCODE');
      //   return;
      // }

   //     const req = {
      //   uidNum: this.personDetails.UID_NUM,
      //   farmerId: this.personDetails.FARMER_CODE,
      //   updatedBy: this.farmerDetails.updatedBy,
      //   source: 'web',
      //   districtId: this.personDetails.DISTRICT_CODE,
      //   mandalId: this.personDetails.MANDAL_CODE,
      //   rbkId: this.personDetails.RBK_CODE,
      //   villageId: this.personDetails.VILLAGECODE,
      //   passBookImg: this.farmerDetails.passBookImg,
      //   accountNo: this.farmerDetails.accountNo,
      //   ifscCode: this.farmerDetails.ifscCode,
      //   bankName: this.farmerDetails.bankName,
      //   branchName: this.farmerDetails.branchName,
      //   micrNo: this.farmerDetails.micrNo,
      //   bankPinCode: this.farmerDetails.bankPinCode,
     //   };
      // this.spinner.show();
    //   const response = await this.farmerAPI.farmerBankDetailsUpdate(req);
      // if (response.success) {
      //   alert(response.message);
      //   window.location.reload();
      // } else {
      //   this.spinner.hide();
      //   this.toast.info(response.message);
     // }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnBankDetailsUpdate_Passbook(): Promise<void> {
    try {
      if (this.utils.isEmpty(this.farmerDetails.passBookImg)) {
          this.toast.warning('Please Upload Bank PassBook Image');
           return;
         }
      const req = {
        type:7,
        uidNum: this.personDetails.UID_NUM,
        farmerId: this.personDetails.FARMER_CODE,
        updatedBy: this.farmerDetails.updatedBy,
        source: 'web',
        passBookImg: this.farmerDetails.passBookImg,
      };
      this.spinner.show();
      const response = await this.farmerAPI.farmerBankDetailsUpdatePassbook(req);
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

  btnAnimalsPopUp(): void {
    this.animalsDetailsPopUp = true;
    this.farmerDetails.milkPotentialBuffalo =
      this.personDetails.MILK_POTENTIAL_BUFFALO;
    this.farmerDetails.milkPotentialCow = this.personDetails.MILK_POTENTIAL_COW;
    this.farmerDetails.noOfBuffaloFemale = this.personDetails.NOOFBUFFALOFEMALE;
    this.farmerDetails.noOfBuffaloMale = this.personDetails.NOOFBUFFALOMALE;
    this.farmerDetails.noOfWhiteCattleFemale =
      this.personDetails.NOOFWHITECALLTEFEMALE;
    this.farmerDetails.noOfWhiteCattleMale =
      this.personDetails.NOOFWHITECATTLEMALE;
    this.farmerDetails.noOfMilchAnimalsBuffalo =
      this.personDetails.NO_OF_MILCH_ANIMALS_BUFFALO;
    this.farmerDetails.noOfMilchAnimalsCow =
      this.personDetails.NO_OF_MILCH_ANIMALS_COW;
  }

  async btnAnimalsDetailsUpdate(): Promise<void> {
    try {
      if (this.utils.isEmpty(this.farmerDetails.milkPotentialBuffalo)) {
        this.toast.warning('Please Enter Milk Potential Buffalo');
        return;
      }
      if (this.utils.isEmpty(this.farmerDetails.milkPotentialCow)) {
        this.toast.warning('Please Enter Milk Potential Cow');
        return;
      }
      if (this.utils.isEmpty(this.farmerDetails.noOfBuffaloFemale)) {
        this.toast.warning('Please Enter No of Buffalo Female');
        return;
      }
      if (this.utils.isEmpty(this.farmerDetails.noOfBuffaloMale)) {
        this.toast.warning('Please Enter No Of Buffalo Male');
        return;
      }
      if (this.utils.isEmpty(this.farmerDetails.noOfWhiteCattleFemale)) {
        this.toast.warning('Please Enter No of White Cattle Female');
        return;
      }
      if (this.utils.isEmpty(this.farmerDetails.noOfWhiteCattleMale)) {
        this.toast.warning('Please Enter No Of White Cattle Male');
        return;
      }
      if (this.utils.isEmpty(this.farmerDetails.noOfMilchAnimalsBuffalo)) {
        this.toast.warning('Please Enter No Of Milch Animals Buffalo');
        return;
      }
      if (this.utils.isEmpty(this.farmerDetails.noOfMilchAnimalsCow)) {
        this.toast.warning('Please Enter No of Milch Animals Cow');
        return;
      }
      if (
        +this.farmerDetails.noOfMilchAnimalsBuffalo >
        +this.farmerDetails.noOfBuffaloFemale
      ) {
        this.toast.warning(
          'No of Milch Animals Buffalo should be less than or equal to No. of Buffalo Female'
        );
        return;
      }
      if (
        +this.farmerDetails.noOfMilchAnimalsCow >
        +this.farmerDetails.noOfWhiteCattleFemale
      ) {
        this.toast.warning(
          'No of Milch Animals Cow should be less than or equal to No. of White cattle Female'
        );
        return;
      }

      const req = {
        uidNum: this.personDetails.UID_NUM,
        farmerId: this.personDetails.FARMER_CODE,
        updatedBy: this.farmerDetails.updatedBy,
        source: 'web',
        milkPotentialBuffalo: this.farmerDetails.milkPotentialBuffalo,
        milkPotentialCow: this.farmerDetails.milkPotentialCow,
        noOfBuffaloFemale: this.farmerDetails.noOfBuffaloFemale,
        noOfBuffaloMale: this.farmerDetails.noOfBuffaloMale,
        noOfWhiteCattleFemale: this.farmerDetails.noOfWhiteCattleFemale,
        noOfWhiteCattleMale: this.farmerDetails.noOfWhiteCattleMale,
        noOfMilchAnimalsBuffalo: this.farmerDetails.noOfMilchAnimalsBuffalo,
        noOfMilchAnimalsCow: this.farmerDetails.noOfMilchAnimalsCow,
      };
      this.spinner.show();
      const response = await this.farmerAPI.farmerAnimalUpdate(req);
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
