import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { MastersService } from 'src/app/shared/services/masters.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { McuMappingService } from '../../services/mcu-mapping.service';

@Component({
  selector: 'app-mcu-mapping',
  templateUrl: './mcu-mapping.component.html',
  styleUrls: ['./mcu-mapping.component.css'],
})
export class McuMappingComponent implements OnInit {
  date: any;
  rbkList = [];
  routeList = [];
  villageList = [];
  villageClassificationList = [];
  networkList = [];

  routeList_Rbkid = [];

  maskNumber: any = '';
  aadharNumber: any = '';
  animalHusbAssitUidNum: any = '';
  digitalAssitUidNum:any='';
  welfareAssistantUidNum:any='';
  villageAnimatorUidNum:any='';

  mcuData = {
    rbkId: '',
    routeId: '',
    villageId: '',
    villageClassification: '',
    routePosition: '',
    dailyMilkProductionCapacity: '',
    animalHusbAssitMobileno: '',
    animalHusbAssitName: '',
    animalHusbAssitUidNum: '',
    digitalAssitMobileno: '',
    digitalAssitName: '',
    digitalAssitUidNum: '',
    villageAnimatorMobileno: '',
    villageAnimatorName: '',
    villageAnimatorUidNum: '',
    welfareAssistantName: '',
    welfareAssistantMobileno: '',
    welfareAssistantUidNum: '',
    networkWithMaxCoverage: '',
    districtId: '',
    mandalId: '',
    insertedBy: '',
    rbkGroupId: '',
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
  ) {}

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId === '101'){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }

    this.date = new Date().toISOString().slice(0, 10);

    this.villageClassificationList = this.master.villageClassificationList;
    this.networkList = this.master.networkList;
    this.loadRoutes();
  }

  async Route_Load(): Promise<void> {
    try {
      const req = {
        //rbkId: this.session.districtId,uniqueId:
        rbkId:this.mcuData.rbkId,uniqueId:this.session.rbkGroupId
      };
      this.spinner.show();
      const response = await this.mcuAPI.routedetailsBymentorIDrbkID(req);
      if (response.success) {
        this.routeList_Rbkid = response.result;
        // this.loadRBKList();
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async loadRoutes(): Promise<void> {
    try {
      const req = {
        districtId: this.session.districtId,
      };
      this.spinner.show();
      const response = await this.mcuAPI.routeList(req);
      if (response.success) {
        this.routeList = response.result;
        this.loadRBKList();
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async loadRBKList(): Promise<void> {
    try {
      this.mcuData.animalHusbAssitName = '';
      this.mcuData.animalHusbAssitMobileno = '';
      this.mcuData.animalHusbAssitUidNum = '';
      this.mcuData.digitalAssitName = '';
      this.mcuData.digitalAssitMobileno = '';
      this.mcuData.digitalAssitUidNum = '';
      this.mcuData.welfareAssistantName = '';
      this.mcuData.welfareAssistantMobileno = '';
      this.mcuData.welfareAssistantUidNum = '';

      const req = {
        uniqueId: this.session.rbkGroupId,
      };
      this.spinner.show();
      const response = await this.mcuAPI.rbkList(req);
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

  async onRouteChange(): Promise<void> {
    try {
      this.mcuData.villageId = '';
      this.villageList = [];
      if (this.mcuData.routeId === '') {
        return;
      }
      const req = {
        // districtId: this.session.districtId,
        // routeId: this.mcuData.routeId,
        // uniqueId: this.session.rbkGroupId,
        rbkId:this.mcuData.rbkId,uniqueId:this.session.rbkGroupId
      };
      debugger;
      this.spinner.show();
      const response = await this.mcuAPI.villageListByRbkId(req);
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

  async onRbkChange(): Promise<void> {

    try {
      this.mcuData.animalHusbAssitName = '';
      this.mcuData.animalHusbAssitMobileno = '';
      this.mcuData.animalHusbAssitUidNum = '';
      this.mcuData.digitalAssitName = '';
      this.mcuData.digitalAssitMobileno = '';
      this.mcuData.digitalAssitUidNum = '';
      this.mcuData.welfareAssistantName = '';
      this.mcuData.welfareAssistantMobileno = '';
      this.mcuData.welfareAssistantUidNum = '';
this.Route_Load();
      if (this.mcuData.rbkId === '') {
        return;
      }

      const req = {
        districtId: this.session.districtId,
        uniqueId: this.session.rbkGroupId,
        rbkId: this.mcuData.rbkId,
      };
      this.spinner.show();
      const response = await this.mcuAPI.functionariesListByRbk(req);
      if (response.success) {
        this.mcuData.animalHusbAssitName = response.result[0].VF_EMP_NAME;
        this.mcuData.animalHusbAssitMobileno = response.result[0].VF_MOBILENO;
        this.mcuData.animalHusbAssitUidNum =
          response.result[0].ANIMAL_HUSB_ASSI_UID_NUM;
        this.mcuData.digitalAssitName = response.result[0].DIGITAL_ASSIST_NAME;
        this.mcuData.digitalAssitMobileno =
          response.result[0].DIGITAL_ASSIST_MOBILE;
        this.mcuData.digitalAssitUidNum =
          response.result[0].DIGITAL_ASSI_UID_NUM;
        this.mcuData.welfareAssistantName =
          response.result[0].WELLFARE_EMP_NAME;
        this.mcuData.welfareAssistantMobileno =
          response.result[0].WELLFARE_MOBILENO;
        this.mcuData.welfareAssistantUidNum =
          response.result[0].WELLFARE_ASSI_UID_NUM;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnSubmit(): Promise<void> {
    try {
      if (this.validate()) {
        this.mcuData.districtId = this.session.districtId;
        this.mcuData.mandalId = this.session.mandalId;
        this.mcuData.rbkGroupId = this.session.rbkGroupId;
        this.mcuData.insertedBy = this.session.userName;
        this.mcuData.source = 'web';
        this.spinner.show();
        const response = await this.mcuAPI.milkCenterUpdate(this.mcuData);
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
      this.mcuData.rbkId === '' ||
      this.mcuData.rbkId === null ||
      this.mcuData.rbkId === undefined
    ) {
      this.toast.warning('Please Select RSK');
      return false;
    }

    if (
      this.mcuData.routeId === '' ||
      this.mcuData.routeId === null ||
      this.mcuData.routeId === undefined
    ) {
      this.toast.warning('Please Select ROUTE');
      return false;
    }

    if (
      this.mcuData.villageId === '' ||
      this.mcuData.villageId === null ||
      this.mcuData.villageId === undefined
    ) {
      this.toast.warning('Please Select Village');
      return false;
    }

    if (
      this.mcuData.villageClassification === '' ||
      this.mcuData.villageClassification === null ||
      this.mcuData.villageClassification === undefined
    ) {
      this.toast.warning('Please Select Village Classification');
      return false;
    }

    if (
      this.mcuData.routePosition === '' ||
      this.mcuData.routePosition === null ||
      this.mcuData.routePosition === undefined
    ) {
      this.toast.warning('Please Enter Village Position In Route');
      return false;
    }

    if (
      this.mcuData.dailyMilkProductionCapacity === '' ||
      this.mcuData.dailyMilkProductionCapacity === null ||
      this.mcuData.dailyMilkProductionCapacity === undefined
    ) {
      this.toast.warning('Please Enter Daily Milk Production Capacity');
      return false;
    }

    if (
      this.mcuData.animalHusbAssitName === '' ||
      this.mcuData.animalHusbAssitName === null ||
      this.mcuData.animalHusbAssitName === undefined
    ) {
      this.toast.warning('Please Enter Animal HusbanDry Assistant Name');
      return false;
    }

    if (
      this.mcuData.animalHusbAssitMobileno === '' ||
      this.mcuData.animalHusbAssitMobileno === null ||
      this.mcuData.animalHusbAssitMobileno === undefined
    ) {
      this.toast.warning(
        'Please Enter Animal Husbandry Assistant Mobile Number'
      );
      return false;
    }

    if (!this.utils.mobileNumCheck(this.mcuData.animalHusbAssitMobileno)) {
      this.toast.warning(
        'Please Enter Valid Animal Husbandry Assistant Mobile Number'
      );
      return false;
    }
    if (
      this.animalHusbAssitUidNum === '' ||
      this.animalHusbAssitUidNum === null ||
      this.animalHusbAssitUidNum === undefined
    ) {
      this.toast.warning(
        'Please Enter Animal Husbandry Assistant Aadhar Number'
      );
      return false;
    }

    if (!this.utils.validateVerhoeff(this.animalHusbAssitUidNum)) {
      this.toast.warning(
        'Please Enter Valid Animal Husbandry Assistant Aadhaar Number'
      );
      return false;
    }

    if (
      this.mcuData.digitalAssitName === '' ||
      this.mcuData.digitalAssitName === null ||
      this.mcuData.digitalAssitName === undefined
    ) {
      this.toast.warning('Please Enter Digital Assistant Name');
      return false;
    }

    if (
      this.mcuData.digitalAssitMobileno === '' ||
      this.mcuData.digitalAssitMobileno === null ||
      this.mcuData.digitalAssitMobileno === undefined
    ) {
      this.toast.warning('Please Enter Digital Assistant Mobile Number');
      return false;
    }

    if (!this.utils.mobileNumCheck(this.mcuData.digitalAssitMobileno)) {
      this.toast.warning('Please Enter Valid Digital Assistant Mobile Number');
      return false;
    }
    if (
      this.digitalAssitUidNum === '' ||
      this.digitalAssitUidNum === null ||
      this.digitalAssitUidNum === undefined
    ) {
      this.toast.warning('Please Enter Digital Assistant  Aadhar Number');
      return false;
    }

    if (!this.utils.validateVerhoeff(this.digitalAssitUidNum)) {
      this.toast.warning('Please Enter Valid Digital Assistant Aadhaar Number');
      return false;
    }

    if (
      this.mcuData.welfareAssistantName === '' ||
      this.mcuData.welfareAssistantName === null ||
      this.mcuData.welfareAssistantName === undefined
    ) {
      this.toast.warning('Please Enter Wellfare Assistant Name');
      return false;
    }

    if (
      this.mcuData.welfareAssistantMobileno === '' ||
      this.mcuData.welfareAssistantMobileno === null ||
      this.mcuData.welfareAssistantMobileno === undefined
    ) {
      this.toast.warning('Please Enter Wellfare Assistant Mobile Number');
      return false;
    }

    if (!this.utils.mobileNumCheck(this.mcuData.welfareAssistantMobileno)) {
      this.toast.warning('Please Enter Valid Wellfare Assistant Mobile Number');
      return false;
    }

    if (
      this.welfareAssistantUidNum === '' ||
      this.welfareAssistantUidNum === null ||
      this.welfareAssistantUidNum === undefined
    ) {
      this.toast.warning('Please Enter Wellfare Assistant Aadhar Number');
      return false;
    }

    if (!this.utils.validateVerhoeff(this.welfareAssistantUidNum)) {
      this.toast.warning(
        'Please Enter Valid  Wellfare Assistan Aadhaar Number'
      );
      return false;
    }

    if (
      this.mcuData.villageAnimatorName === '' ||
      this.mcuData.villageAnimatorName === null ||
      this.mcuData.villageAnimatorName === undefined
    ) {
      this.toast.warning('Please Enter Village Animator Name');
      return false;
    }

    if (
      this.mcuData.villageAnimatorMobileno === '' ||
      this.mcuData.villageAnimatorMobileno === null ||
      this.mcuData.villageAnimatorMobileno === undefined
    ) {
      this.toast.warning('Please Enter Village Animator Mobile Number');
      return false;
    }

    if (!this.utils.mobileNumCheck(this.mcuData.villageAnimatorMobileno)) {
      this.toast.warning('Please Enter Valid Village Animator Mobile Number');
      return false;
    }

    if (
      this.villageAnimatorUidNum === '' ||
      this.villageAnimatorUidNum === null ||
      this.villageAnimatorUidNum === undefined
    ) {
      this.toast.warning('Please Enter Village Animator Aadhar Number');
      return false;
    }

    // if (!this.utils.validateVerhoeff(this.villageAnimatorUidNum)) {
    //   this.toast.warning('Please Enter Valid Village Animator Aadhaar Number');
    //   return false;
    // }

    if (
      this.mcuData.networkWithMaxCoverage === '' ||
      this.mcuData.networkWithMaxCoverage === null ||
      this.mcuData.networkWithMaxCoverage === undefined
    ) {
      this.toast.warning('Please Select Network With Maximum Coverage');
      return false;
    }

    return true;
  }

  //aadhar 
  husbandrymaskIputData(value) {
     
    if (value.length > 0) {
      // if (this.mcuData.animalHusbAssitUidNum.length > value.length) {

      //   this.mcuData.animalHusbAssitUidNum = this.mcuData.animalHusbAssitUidNum.substring(0, value.length);
      // } 
      // else {
      //   this.mcuData.animalHusbAssitUidNum += String(value).slice(-1);
      //   const valueSplit = value.split('');
      //   let maskedValue = '';
      //   valueSplit.forEach((element, index) => {
      //     if (index < 8) {
      //       maskedValue += "X";
      //     } else {
      //       maskedValue += element;
      //     }

      //   });
      //   this.animalHusbAssitUidNum = maskedValue;
      // }
      if(value.length>12){
        this.mcuData.animalHusbAssitUidNum=value;
        //this.aadharNumber = this.aadharNumber.substring(0, value.length);
        const response = this.utils.validateVerhoeff(this.mcuData.animalHusbAssitUidNum);
               if (response == true) {
          this.spinner.hide();
        } else {
          this.animalHusbAssitUidNum='';
         // this.mcuData.animalHusbAssitUidNum = '';
         this.toast.warning('Please Enter Valid Aadhaar Number');
          this.spinner.hide();
  
        }
        return
      }

    } else {
      
    }

    return;
    
  }

  assistantmaskIputData(value1) {
     
    if (value1.length > 0) {
      // if (this.mcuData.digitalAssitUidNum.length > value1.length) {
      //   this.mcuData.digitalAssitUidNum = this.mcuData.digitalAssitUidNum.substring(0, value1.length);
      // } 
      // else {
      //   this.mcuData.digitalAssitUidNum += String(value1).slice(-1);        
      //   const valueSplit = value1.split('');
      //   let maskedValue = '';
      //   valueSplit.forEach((element, index) => {
      //     if (index < 8) {
      //       maskedValue += "X";
      //     } else {
      //       maskedValue += element;
      //     }

      //   });
      //   this.digitalAssitUidNum = maskedValue;
      // }
      if(value1.length>=12){
        this.mcuData.digitalAssitUidNum=value1;
        const response = this.utils.validateVerhoeff(this.mcuData.digitalAssitUidNum);    
        if (response == true) {
          this.spinner.hide();
        } else {
          this.digitalAssitUidNum='';
          this.toast.warning('Please Enter Valid Aadhaar Number');
          this.spinner.hide();
  
        }
        return
      }

    } else {
      
    }

    return;
    
  }

  welfaremaskIputData(value) {
     
    if (value.length > 0) {
      // if (this.mcuData.welfareAssistantUidNum.length > value.length) {
      //   this.mcuData.welfareAssistantUidNum = this.mcuData.welfareAssistantUidNum.substring(0, value.length);
      // } 
      // else {
      //   this.mcuData.welfareAssistantUidNum += String(value).slice(-1);        
      //   const valueSplit = value.split('');
      //   let maskedValue = '';
      //   valueSplit.forEach((element, index) => {
      //     if (index < 8) {
      //       maskedValue += "X";
      //     } else {
      //       maskedValue += element;
      //     }

      //   });
      //   this.welfareAssistantUidNum = maskedValue;
      // }
      if(value.length>=12){
        this.mcuData.welfareAssistantUidNum=value;
        const response = this.utils.validateVerhoeff(this.mcuData.welfareAssistantUidNum);    
        if (response == true) {
          this.spinner.hide();
        } else {
          this.welfareAssistantUidNum='';
          this.toast.warning('Please Enter Valid Aadhaar Number');
          this.spinner.hide();
  
        }
        return
      }

    } else {
      
    }

    return;
    
  }

  villageAnimatormaskIputData(value) {
     
    if (value.length > 0) {
      // if (this.mcuData.villageAnimatorUidNum.length > value.length) {
      //   this.mcuData.villageAnimatorUidNum = this.mcuData.villageAnimatorUidNum.substring(0, value.length);
      // } 
      // else {
      //   this.mcuData.villageAnimatorUidNum += String(value).slice(-1);        
      //   const valueSplit = value.split('');
      //   let maskedValue = '';
      //   valueSplit.forEach((element, index) => {
      //     if (index < 8) {
      //       maskedValue += "X";
      //     } else {
      //       maskedValue += element;
      //     }

      //   });
      //   this.villageAnimatorUidNum = maskedValue;
      // }
      if(value.length>=12){
        this.mcuData.villageAnimatorUidNum=value;
        const response = this.utils.validateVerhoeff(this.mcuData.villageAnimatorUidNum);    
        if (response == true) {
          this.spinner.hide();
        } else {
          this.villageAnimatorUidNum='';
          this.toast.warning('Please Enter Valid Aadhaar Number');
          this.spinner.hide();
  
        }
        return
      }

    } else {
      
    }

    return;
    
  }

}
