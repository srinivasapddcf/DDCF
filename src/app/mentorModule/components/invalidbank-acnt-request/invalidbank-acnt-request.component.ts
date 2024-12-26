
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FarmerService } from 'src/app/FarmerModule/services/farmer.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-invalidbank-acnt-request',
  templateUrl: './invalidbank-acnt-request.component.html',
  styleUrls: ['./invalidbank-acnt-request.component.css']
})
export class InvalidbankAcntRequestComponent implements OnInit {

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


  constructor( private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private farmerAPI: FarmerService,
    private utils: UtilsService,
    private sanitizer: DomSanitizer,
    private logger: LoggerService,
    private session: SessionService) { }

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
        updatedBy:this.session.userName,

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

    btnpendingDetails(){
      try {

        this.router.navigate(['/mentorModule/Invalidbankacntreqraisestatus'], {});   

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

  uidNummaskIputData(value) {
     
    if (value.length > 0) {
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

  async btnReqraisetoHO(): Promise<void> {
    try {
      
      const req1 = {
        type:"4",
        farmerId: this.personDetails.FARMER_CODE,
        uidNum: this.personDetails.UID_NUM,
      }
        this.spinner.show();
       const response1 = await this.farmerAPI.raiseRequestInvalidBankactByFarmerId(req1);
       this.spinner.hide();
       if (response1.success) 
          {
            if (response1.result[0].STATUS>0) {
              this.toast.info("ALREADY REQUEST RAISED AND PENDING IN DISTRICT HO");
            }
     
      else{

      const req = {
        type:"1",
        uidNum: this.personDetails.UID_NUM,
        mobileNum:this.personDetails.MOBILE_NUMBER,
        farmerId: this.personDetails.FARMER_CODE,
        insertedBy: this.session.userName,
        rbkId: this.personDetails.RBK_CODE,
        villageId: this.personDetails.VILLAGECODE,
        accountNo: this.personDetails.ACCOUNT_NUMBER,
        ifscCode: this.personDetails.IFSC_CODE,
        bankName: this.personDetails.BANK_NAME,
        branchName: this.personDetails.BANK_BRANCH,
        micrNo: this.personDetails.MICR_CODE,
        bankPinCode: this.personDetails.BANK_PINCODE,
        Uniqueid:this.session.uniqueId,
      };
      
      const response = await this.farmerAPI.raiseRequestInvalidBankactByFarmerId(req);
      if (response.success) {
        alert(response.message);
        window.location.reload();
      } else {
        this.spinner.hide();
        this.toast.info(response.message);
      }
    }
  }else {
    
    this.toast.info("TRY AGAIN");
  }


    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


}

