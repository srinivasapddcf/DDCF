import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { FarmerService } from '../../services/farmer.service';

@Component({
  selector: 'app-farmer-register',
  templateUrl: './farmer-register.component.html',
  styleUrls: ['./farmer-register.component.css'],
})
export class FarmerRegisterComponent implements OnInit {
  @ViewChild('bankPassBookUpload') bankPassBookUpload: ElementRef;
  rbkList = [];
  villageList = [];
  uidNum:any='';

  farmerDetails: any;
  bankAccLength = '';
  personDetails = {
    districtId: '',
    mandalId: '',
    uidNum: '',
    rbkId: '',
    villageId: '',
    citizenName: '',
    mobileNum: '',
    ifscCode: '',
    bankName: '',
    branchName: '',
    accountNo: '',
    micrNo: '',
    panNo: '',
    bankPinCode: '',
    passBookImg: '',
    insertedBy: '',
    source: 'web',
  };

  serviceChecker = {
    citizenName: '2',
    mobileNum: '2',
    ifscCode: '2',
    accountNo: '2',
    panNo: '2',
    bankPinCode: '2',
  };

  cheyuthaDetails = false;

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private farmerAPI: FarmerService,
    private utils: UtilsService,
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
    if (
      sessionStorage.getItem('rbkId') !== '' &&
      sessionStorage.getItem('rbkId') &&
      sessionStorage.getItem('rbkId') !== undefined
    ) {
      this.rbkList = [
        {
          RBK_ID: sessionStorage.getItem('rbkId'),
          RBK_NAME: sessionStorage.getItem('rbkName'),
        },
      ];
    } else {
      this.loadRBKList();
    }
  }

  async loadRBKList(): Promise<void> {
    try {
      const req = {
        uniqueId: this.session.rbkGroupId,
      };
      this.rbkList = [];
      this.spinner.show();
      const response = await this.farmerAPI.rbkListByMentorId(req);
      if (response.success) {
        this.rbkList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onRbkChange(): Promise<void> {
    try {
      this.personDetails.villageId = '';
      this.villageList = [];
      if (this.personDetails.rbkId == '') {
        return;
      }

      let mentorId = '';
      if (
        this.session.rbkGroupId === '' ||
        this.session.rbkGroupId === undefined ||
        this.session.rbkGroupId === null
      ) {
        mentorId = '1';
      } else {
        mentorId = this.session.uniqueId;
      }
      const req = {
        districtId: this.session.districtId,
        rbkId: this.personDetails.rbkId,
        uniqueId: mentorId,
      };
      this.villageList = [];
      this.spinner.show();
      const response = await this.farmerAPI.villageListByRbkId(req);
      if (response.success) {
        this.villageList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnSearchByUid(): Promise<void> {
    try {
      this.farmerDetails = [];
      this.clearFields();

      if (
        this.personDetails.rbkId == '' ||
        this.personDetails.rbkId == null ||
        this.personDetails.rbkId == undefined
      ) {
        this.toast.warning('Please Select RSK');
        return;
      }

      if (
        this.personDetails.villageId == '' ||
        this.personDetails.villageId == null ||
        this.personDetails.villageId == undefined
      ) {
        this.toast.warning('Please Select Village');
        return;
      }

      if (
        this.personDetails.uidNum == '' ||
        this.personDetails.uidNum == null ||
        this.personDetails.uidNum == undefined
      ) {
        this.toast.warning('Please Enter Aadhaar Number');
        return;
      }
      if(this.personDetails.uidNum.length<12){
        this.toast.warning('Please Enter Valid Aadhaar Number');
        return;
      }
      if (!this.utils.validateVerhoeff(this.personDetails.uidNum)) {
        this.toast.warning('Please Enter Valid Aadhaar Number');
        return;
      } else this.uidNum=this.personDetails.uidNum;

      this.cheyuthaDetails = false;
      const req = {
        uidNum: this.personDetails.uidNum,
      };
      this.spinner.show();
      const response = await this.farmerAPI.farmerDetailsByUid(req);
      this.spinner.hide();
      if (response.success) {
        this.farmerDetails = response.result;
        if (
          this.farmerDetails[0].ACCOUNT_NUMBER !== null &&
          this.farmerDetails[0].ACCOUNT_NUMBER !== ''
        ) {
          // this.serviceChecker.accountNo = '1';
          this.personDetails.accountNo = this.farmerDetails[0].ACCOUNT_NUMBER;
        }
        if (
          this.farmerDetails[0].MOBILE_NUMBER !== null &&
          this.farmerDetails[0].MOBILE_NUMBER !== ''
        ) {
          this.serviceChecker.mobileNum = '1';
          this.personDetails.mobileNum = this.farmerDetails[0].MOBILE_NUMBER;
        }
        if (
          this.farmerDetails[0].CITIZEN_NAME !== null &&
          this.farmerDetails[0].CITIZEN_NAME !== ''
        ) {
          this.serviceChecker.citizenName = '1';
          this.personDetails.citizenName = this.farmerDetails[0].CITIZEN_NAME;
        }
        if (
          this.farmerDetails[0].IFSC_CODE !== null &&
          this.farmerDetails[0].IFSC_CODE !== ''
        ) {
          this.serviceChecker.ifscCode = '1';
          this.personDetails.ifscCode = this.farmerDetails[0].IFSC_CODE;
          this.btnVerifyIfscCode();
        }
        if (
          this.farmerDetails[0].IS_CHEYUTHA_BEN === '1'
        ) {
          this.cheyuthaDetails = true;
        }
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  clearFields(): void {
    this.personDetails = {
      uidNum: this.personDetails.uidNum,
      districtId: this.session.districtId,
      mandalId: this.session.mandalId,
      rbkId: this.personDetails.rbkId,
      villageId: this.personDetails.villageId,
      citizenName: '',
      mobileNum: '',
      ifscCode: '',
      bankName: '',
      branchName: '',
      accountNo: '',
      micrNo: '',
      panNo: '',
      bankPinCode: '',
      passBookImg: '',
      insertedBy: '',
      source: 'web',
    };

    this.bankPassBookUpload.nativeElement.value = '';
this.uidNum;
    this.serviceChecker = {
      citizenName: '2',
      mobileNum: '2',
      ifscCode: '2',
      accountNo: '2',
      panNo: '2',
      bankPinCode: '2',
    };
  }

  async btnVerifyIfscCode(): Promise<void> {
    try {
      if (
        this.personDetails.rbkId == '' ||
        this.personDetails.rbkId == null ||
        this.personDetails.rbkId == undefined
      ) {
        this.toast.warning('Please Select RSK');
        return;
      }

      if (
        this.personDetails.villageId == '' ||
        this.personDetails.villageId == null ||
        this.personDetails.villageId == undefined
      ) {
        this.toast.warning('Please Select Village');
        return;
      }

      if (
        this.uidNum == '' ||
        this.uidNum == null ||
        this.uidNum == undefined
      ) {
        this.toast.warning('Please Enter Aadhaar Number');
        return;
      }

      if (!this.utils.validateVerhoeff(this.uidNum)) {
        this.toast.warning('Please Enter Valid Aadhaar Number');
        return;
      }

      if (
        this.personDetails.citizenName === '' ||
        this.personDetails.citizenName === null ||
        this.personDetails.citizenName === undefined
      ) {
        this.toast.warning('Please Enter Citizen Name');
        return;
      }

      if (
        this.personDetails.mobileNum === '' ||
        this.personDetails.mobileNum === null ||
        this.personDetails.mobileNum === undefined
      ) {
        this.toast.warning('Please Enter Mobile Number');
        return;
      }

      if (!this.utils.mobileNumCheck(this.personDetails.mobileNum)) {
        this.toast.warning('Please Enter Valid Mobile Number');
        return;
      }

      if (
        this.personDetails.accountNo === '' ||
        this.personDetails.accountNo === null ||
        this.personDetails.accountNo === undefined
      ) {
        this.toast.warning('Please Enter Bank Account Number');
        return;
      }

      if (
        this.personDetails.ifscCode === '' ||
        this.personDetails.ifscCode === null ||
        this.personDetails.ifscCode === undefined
      ) {
        this.toast.warning('Please Select IFSC CODE');
        return;
      }

      const req = {
        ifscCode: this.personDetails.ifscCode,
      };
      this.spinner.show();
      const response = await this.farmerAPI.searchByIFSC(req);
      this.spinner.hide();
      if (response.success) {
        let count = 0;
        for (let i = 0; i < response.result.length; i++) {
          if (
            this.personDetails.accountNo.length.toString() ===
            response.result[i].ACCOUNTLENGTH
          ) {
            this.personDetails.bankName = response.result[i].BANK;
            this.personDetails.branchName = response.result[i].BRANCH;
            this.bankAccLength = response.result[i].ACCOUNTLENGTH;
            this.personDetails.micrNo = response.result[i].MICR_CODE;
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

  async btnSubmit(): Promise<void> {
    try {
      if (this.validate()) {
        this.personDetails.districtId = this.session.districtId;
        this.personDetails.mandalId = this.session.mandalId;
        this.personDetails.insertedBy = this.session.userName;
        this.personDetails.source = 'web';
        this.spinner.show();
        const response = await this.farmerAPI.farmerSub(this.personDetails);
        if (response.success) {
          alert(response.message);
          window.location.reload();
        } else {
          this.spinner.hide();
          this.toast.info(response.message);
        }
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  validate(): boolean {
    if (
      this.personDetails.rbkId == '' ||
      this.personDetails.rbkId == null ||
      this.personDetails.rbkId == undefined
    ) {
      this.toast.warning('Please Select RSK');
      return false;
    }

    if (
      this.personDetails.villageId == '' ||
      this.personDetails.villageId == null ||
      this.personDetails.villageId == undefined
    ) {
      this.toast.warning('Please Select Village');
      return false;
    }

    if (
      this.uidNum == '' ||
      this.uidNum == null ||
      this.uidNum == undefined
    ) {
      this.toast.warning('Please Enter Aadhaar Number');
      return false;
    }

    
    if (
      this.personDetails.citizenName === '' ||
      this.personDetails.citizenName === null ||
      this.personDetails.citizenName === undefined
    ) {
      this.toast.warning('Please Enter Citizen Name');
      return false;
    }

    if (
      this.personDetails.mobileNum === '' ||
      this.personDetails.mobileNum === null ||
      this.personDetails.mobileNum === undefined
    ) {
      this.toast.warning('Please Enter Mobile Number');
      return false;
    }

    if (!this.utils.mobileNumCheck(this.personDetails.mobileNum)) {
      this.toast.warning('Please Enter Valid Mobile Number');
      return false;
    }

    if (
      this.personDetails.accountNo === '' ||
      this.personDetails.accountNo === null ||
      this.personDetails.accountNo === undefined
    ) {
      this.toast.warning('Please Enter Bank Account Number');
      return false;
    }

    if (
      this.personDetails.ifscCode === '' ||
      this.personDetails.ifscCode === null ||
      this.personDetails.ifscCode === undefined
    ) {
      this.toast.warning('Please Select IFSC CODE');
      return false;
    }

    if (
      this.personDetails.bankName === '' ||
      this.personDetails.bankName === null ||
      this.personDetails.bankName === undefined
    ) {
      this.toast.warning('Please Enter Valid IFSC CODE');
      return false;
    }

    if (
      this.personDetails.branchName === '' ||
      this.personDetails.branchName === null ||
      this.personDetails.branchName === undefined
    ) {
      this.toast.warning('Please Enter Valid IFSC CODE');
      return false;
    }

    if (
      this.personDetails.micrNo === '' ||
      this.personDetails.micrNo === null ||
      this.personDetails.micrNo === undefined
    ) {
      this.toast.warning('Please Enter Valid IFSC CODE');
      return false;
    }

    if (
      this.personDetails.panNo !== '' &&
      this.personDetails.panNo !== null &&
      this.personDetails.panNo !== undefined
    ) {
      if (!this.utils.panCardNoCheck(this.personDetails.panNo)) {
        this.toast.warning('Please Enter Valid PANCARD Number');
        return false;
      }
    }

    if (
      this.personDetails.bankPinCode === '' ||
      this.personDetails.bankPinCode === null ||
      this.personDetails.bankPinCode === undefined
    ) {
      this.toast.warning('Please Enter Bank Account PINCODE');
      return false;
    }
    if (!this.utils.pinCodeCheck(this.personDetails.bankPinCode)) {
      this.toast.warning('Please Enter Valid PINCODE');
      return false;
    }

    if (
      this.personDetails.passBookImg === '' ||
      this.personDetails.passBookImg === null ||
      this.personDetails.passBookImg === undefined
    ) {
      this.toast.warning('Please Upload Bank PassBook Front Page Photo ');
      return false;
    }

    return true;
  }

  async onBankPassBookChange(event): Promise<void> {
    try {

      
      const element = event.currentTarget as HTMLInputElement;
      let fileList: FileList | null = element.files;
    // if (fileList) {
    //   console.log("FileUpload -> files", fileList);
    // }
    if(element.files[0].name.split('.').length.toString()!=='2')      
    { this.toast.warning('Please Upload bank jpg files only');  
  
    event.target.value = '';
  return;
    }else{
      
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.twoHundredKB
      );
      if (res) {
        this.personDetails.passBookImg = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    }

    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  personDetailsmaskIputData(value) {
     
    if (value.length > 0) {
      // if (this.personDetails.uidNum.length > value.length) {
      //   this.personDetails.uidNum = this.personDetails.uidNum.substring(0, value.length);
      // } 
      // else {
      //   this.personDetails.uidNum += String(value).slice(-1);        
      //   const valueSplit = value.split('');
      //   let maskedValue = '';
      //   valueSplit.forEach((element, index) => {
      //     if (index < 8) {
      //       maskedValue += "X";
      //     } else {
      //       maskedValue += element;
      //     }

      //   });
      //   this.uidNum = maskedValue;
      // }
      this.personDetails.uidNum=value;
      if(value.length>=12){
       // this.personDetails.uidNum=value;
        const response = this.utils.validateVerhoeff( this.personDetails.uidNum);    
        if (response == true) {
          this.spinner.hide();
        } else {
          this.uidNum='';
          this.toast.warning('Please Enter Valid Aadhaar Number');
          this.spinner.hide();  
        }
        return
      } 

    }  

    return;
    
  }
}
