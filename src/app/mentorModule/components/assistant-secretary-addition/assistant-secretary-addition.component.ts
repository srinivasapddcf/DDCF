import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { MastersService } from 'src/app/shared/services/masters.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { McuMappingService } from '../../services/mcu-mapping.service';
import { promise } from 'protractor';

@Component({
  selector: 'app-assistant-secretary-addition',
  templateUrl: './assistant-secretary-addition.component.html',
  styleUrls: ['./assistant-secretary-addition.component.css'],
})
export class AssistantSecretaryAdditionComponent implements OnInit {

  @ViewChild('bankPassBookUpload') bankPassBookUpload: ElementRef;
  // @ViewChild('sscMarksMemoUpload') sscMarksMemoUpload: ElementRef;
  suidNum: any; showAge:any;age:any;
  minDate: Date;
  maxDate: Date;
  rbkList = [];
  villageList = [];
  qualificationList = [];
  maritalStatusList = [];
  secretaryDetails = {
    uidNum : '',
    rbkId: '',
    districtId: '',
    mandalId: '',
    mentorId : '',
    villageId: '',
    designation: '',
    name: '',
    gender: '',
    maritalStatus: '',
    dob : '',
    mobileNumber: '',
    bankAcNo: '',
    bankIFSCCode: '',
    qualification: '',
    passBookImg : '',
    marksMemo : '',
    insertedBy: '',
    source: '',
  };
  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private mcuAPI: McuMappingService,
    private utils: UtilsService,
    private logger: LoggerService,
    private session: SessionService,
    private master: MastersService
  ) {
    this.minDate = this.session.getDOBMinDate();
    this.maxDate = this.session.getDOBMaxDate();
  }

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ""){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    
    this.maritalStatusList = this.master.maritalStatusList;
    this.loadRBKList();
  }

  async loadRBKList(): Promise<void>{
    try{
      const req = {
        uniqueId: this.session.rbkGroupId,
      };
      this.spinner.show();
      const response = await this.mcuAPI.rbkList(req);
      if (response.success) {
        this.rbkList = response.result;
        this.loadQualificationList();
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async loadQualificationList(): Promise<void>{
    try{
      this.spinner.show();
      const response = await this.mcuAPI.qualificationsList();
      if (response.success) {
        this.qualificationList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  onRbkChange(): void {
    if (this.secretaryDetails.rbkId === '') {
      return;
    }
    this.secretaryDetails.designation = '';
  }

  async onDesignationChange(): Promise<void>{
    try{
      this.villageList = [];
      if (this.secretaryDetails.rbkId === '') {
      return;
    }
      if (this.secretaryDetails.designation === '') {
      return;
    }
      const req = {
      districtId: this.secretaryDetails.designation,
      rbkId: this.secretaryDetails.rbkId,
      uniqueId : this.session.rbkGroupId
    };
      this.spinner.show();
      const response = await this.mcuAPI.villageListByRbkDesigId(req);
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


  async btnSubmit(): Promise<void>{
    try{
      if (this.validate()) {
        this.secretaryDetails.mentorId = this.session.rbkGroupId;
        this.secretaryDetails.districtId = this.session.districtId;
        this.secretaryDetails.mandalId = this.session.mandalId;
        this.secretaryDetails.insertedBy = this.session.userName;
        this.secretaryDetails.source = 'web';
        this.spinner.show();
        const response = await this.mcuAPI.secretaryCreationSub(this.secretaryDetails);
        if (response.success) {
          alert(response.message);
          window.location.reload();
        } else {
          this.toast.info(response.message);
        }
        this.spinner.hide();
      }
    }catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  validate(): boolean {
    if (
      this.secretaryDetails.rbkId === '' ||
      this.secretaryDetails.rbkId === null ||
      this.secretaryDetails.rbkId === undefined
    ) {
      this.toast.warning('Please Select RSK');
      return false;
    }

    if (
      this.secretaryDetails.villageId === '' ||
      this.secretaryDetails.villageId === null ||
      this.secretaryDetails.villageId === undefined
    ) {
      this.toast.warning('Please Select Village');
      return false;
    }

    if (
      this.secretaryDetails.designation === '' ||
      this.secretaryDetails.designation === null ||
      this.secretaryDetails.designation === undefined
    ) {
      this.toast.warning('Please Select Designation');
      return false;
    }

    if (
      this.secretaryDetails.name === '' ||
      this.secretaryDetails.name === null ||
      this.secretaryDetails.name === undefined
    ) {
      this.toast.warning('Please Enter Name');
      return false;
    }

    if (
      this.suidNum === '' ||
      this.suidNum === null ||
      this.suidNum === undefined
    ) {
      this.toast.warning('Please Enter Aadhaar Number');
      return false;
    }

   

    if (
      this.secretaryDetails.dob === '' ||
      this.secretaryDetails.dob === null ||
      this.secretaryDetails.dob === undefined
    ) {
      this.toast.warning('Please Select Date Of Birth');
      return false;
    }
     

     if (
      this.secretaryDetails.dob != '' &&
      this.secretaryDetails.dob != null &&
      this.secretaryDetails.dob != undefined
    ) {
          const sel_date = new Date(this.secretaryDetails.dob);
         
          this.showAge = Math.floor(Math.abs(Date.now() - sel_date.getTime()) / (1000 * 3600 * 24) / 365);
          var ageblow=18;
          debugger;
          if(this.showAge < ageblow){
            this.toast.warning('Not Eligible for below 18 Years');
            this.secretaryDetails.dob='';
            this.age=false;
            this.secretaryDetails.dob='';
              return;      
          }
          else{
            this.age=true;
            }
      
        }






    if (
      this.secretaryDetails.maritalStatus === '' ||
      this.secretaryDetails.maritalStatus === null ||
      this.secretaryDetails.maritalStatus === undefined
    ) {
      this.toast.warning('Please Select Marital Status');
      return false;
    }

    if (
      this.secretaryDetails.mobileNumber === '' ||
      this.secretaryDetails.mobileNumber === null ||
      this.secretaryDetails.mobileNumber === undefined
    ) {
      this.toast.warning('Please Enter Mobile Number');
      return false;
    }

    if (!this.utils.mobileNumCheck(this.secretaryDetails.mobileNumber)) {
      this.toast.warning('Please Enter Valid Mobile Number');
      return false;
    }

    if (
      this.secretaryDetails.bankAcNo === '' ||
      this.secretaryDetails.bankAcNo === null ||
      this.secretaryDetails.bankAcNo === undefined
    ) {
      this.toast.warning('Please Enter Bank Account Number');
      return false;
    }

    if (
      this.secretaryDetails.bankIFSCCode === '' ||
      this.secretaryDetails.bankIFSCCode === null ||
      this.secretaryDetails.bankIFSCCode === undefined
    ) {
      this.toast.warning('Please Enter Bank IFSC Code');
      return false;
    }

    if (
      this.secretaryDetails.qualification === '' ||
      this.secretaryDetails.qualification === null ||
      this.secretaryDetails.qualification === undefined
    ) {
      this.toast.warning('Please Select Qualification');
      return false;
    }

    if (
      this.secretaryDetails.passBookImg === '' ||
      this.secretaryDetails.passBookImg === null ||
      this.secretaryDetails.passBookImg === undefined
    ) {
      this.toast.warning('Please Upload Bank PassBook Front Page Photo ');
      return false;
    }
    if (
      this.secretaryDetails.marksMemo === '' ||
      this.secretaryDetails.marksMemo === null ||
      this.secretaryDetails.marksMemo === undefined
    ) {
      this.toast.warning('Please Upload SSC Marks Memo');
      return false;
    }


    return true;
  }

  async onBankPassBookChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.secretaryDetails.passBookImg = res.replace('data:image/jpeg;base64,', '');
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onSSCMarksMemoChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.secretaryDetails.marksMemo = res.replace('data:image/jpeg;base64,', '');
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  secretaryuidNummaskIputData(value) {
     
    if (value.length > 0) {
      // if (this.secretaryDetails.uidNum.length > value.length) {
      //   this.secretaryDetails.uidNum = this.secretaryDetails.uidNum.substring(0, value.length);
      // } 
      // else {
      //   this.secretaryDetails.uidNum += String(value).slice(-1);        
      //   const valueSplit = value.split('');
      //   let maskedValue = '';
      //   valueSplit.forEach((element, index) => {
      //     if (index < 8) {
      //       maskedValue += "X";
      //     } else {
      //       maskedValue += element;
      //     }

      //   });
      //   this.suidNum = maskedValue;
      // }
      if(value.length>=12){
        this.secretaryDetails.uidNum=value;
        const response = this.utils.validateVerhoeff(this.secretaryDetails.uidNum);    
        if (response == true) {
          this.spinner.hide();
        } else {
          this.suidNum='';
          this.toast.warning('Please Enter Valid Aadhaar Number');
          this.spinner.hide();
  
        }
        return
      }

    }   
    return;
    
  }


// async changedate() :Promise<void>
// {
// try { debugger;
//   if(this.secretaryDetails.dob){
//     const sel_date = new Date(this.secretaryDetails.dob);
//    // this.timeDiff = Math.abs(Date.now() - sel_date.getTime());
//     this.showAge = Math.floor(Math.abs(Date.now() - sel_date.getTime()) / (1000 * 3600 * 24) / 365);
//     var ageblow=18;
//     debugger;
//     if(this.showAge < ageblow){
//       this.toast.warning('Not Eligible for below 18 Years');
//       this.secretaryDetails.dob='';
//       this.age=false;
//         return;

//     }
//     else{
//       this.age=true;
//       }

//   }
  
// } catch (error) {
  
// }
// }


}
