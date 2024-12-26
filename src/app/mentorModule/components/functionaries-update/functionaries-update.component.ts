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
  selector: 'app-functionaries-update',
  templateUrl: './functionaries-update.component.html',
  styleUrls: ['./functionaries-update.component.css'],
})
export class FunctionariesUpdateComponent implements OnInit {
  rbkList = [];
  villageList = [];
  functionaryDetails = '';
  animalHusbAssitUidNum = '';
  welfareAssistantUidNum = '';
  villageAnimatorUidNum = '';
  digitalAssitUidNum='';

  mcuData = {
    districtId: '',
    mandalId: '',
    rbkId: '',
    villageId: '',
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
    if(this.session.uniqueId !="" && this.session.desigId != ""){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    this.loadRBKList();
  }

  async loadRBKList(): Promise<void> {
    try {
      this.functionaryDetails = '';
      const req = {
        uniqueId: this.session.rbkGroupId,
      };
      this.spinner.show();
      const response = await this.mcuAPI.rbkListByMentorId(req);
      this.spinner.hide();
      if (response.success) {
        this.rbkList = response.result;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onRbkChange(): Promise<void> {
    try {
      this.mcuData.villageId = '';
      this.villageList = [];
      this.functionaryDetails = '';
      if (this.mcuData.rbkId === '') {
        return;
      }
      const req = {
        districtId: this.session.districtId,
        uniqueId: this.session.rbkGroupId,
        rbkId: this.mcuData.rbkId,
      };
      this.spinner.show();
      const response = await this.mcuAPI.villageListByRbkId(req);
      this.spinner.hide();
      if (response.success) {
        this.villageList = response.result;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onVillageChange(): Promise<void> {
    try {
      this.functionaryDetails = '';
      if (this.mcuData.rbkId === '' || this.mcuData.villageId === '') {
        return;
      }
      const req = {
        rbkId: this.mcuData.rbkId,
        villageId: this.mcuData.villageId,
      };
      this.spinner.show();
      const response = await this.mcuAPI.functionariesListByVillageId(req);
      this.spinner.hide();
      if (response.success) {
        this.functionaryDetails = response.result[0];
        this.mcuData.animalHusbAssitName =
          response.result[0].ANIMAL_HUSB_ASSI_NAME;
        // tslint:disable-next-line: max-line-length
        this.mcuData.animalHusbAssitMobileno =
          response.result[0].ANIMAL_HUSB_ASSI_MOBILENO === 'NA'
            ? ''
            : response.result[0].ANIMAL_HUSB_ASSI_MOBILENO;
        // tslint:disable-next-line: max-line-length
        this.mcuData.animalHusbAssitUidNum =
          response.result[0].ANIMAL_HUSB_ASSI_UID_NUM === 'NA'
            ? ''
            : response.result[0].ANIMAL_HUSB_ASSI_UID_NUM;
        this.mcuData.digitalAssitName = response.result[0].DIGITAL_ASSI_NAME;
        // tslint:disable-next-line: max-line-length
        this.mcuData.digitalAssitMobileno =
          response.result[0].DIGITAL_ASSI_MOBILE_NO === 'NA'
            ? ''
            : response.result[0].DIGITAL_ASSI_MOBILE_NO;
        this.mcuData.digitalAssitUidNum =
          response.result[0].DIGITAL_ASSI_UID_NUM === 'NA'
            ? ''
            : response.result[0].DIGITAL_ASSI_UID_NUM;
        this.mcuData.villageAnimatorName =
          response.result[0].VILL_ANIMATOR_NAME_SERPDEPT;
        // tslint:disable-next-line: max-line-length
        this.mcuData.villageAnimatorMobileno =
          response.result[0].VILL_ANIMATOR_MOBILENO === 'NA'
            ? ''
            : response.result[0].VILL_ANIMATOR_MOBILENO;
        // tslint:disable-next-line: max-line-length
        this.mcuData.villageAnimatorUidNum =
          response.result[0].VILL_ANIMATOR_UID_NUM === 'NA'
            ? ''
            : response.result[0].VILL_ANIMATOR_UID_NUM;
        this.mcuData.welfareAssistantName =
          response.result[0].WELLFARE_ASSI_NAME;
        this.mcuData.welfareAssistantMobileno =
          response.result[0].WELLFARE_ASSI_MNO === 'NA'
            ? ''
            : response.result[0].WELLFARE_ASSI_MNO;
        // tslint:disable-next-line: max-line-length
        this.mcuData.welfareAssistantUidNum =
          response.result[0].WELLFARE_ASSI_UID_NUM === 'NA'
            ? ''
            : response.result[0].WELLFARE_ASSI_UID_NUM;
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
        this.mcuData.districtId = this.session.districtId;
        this.mcuData.mandalId = this.session.mandalId;
        this.mcuData.rbkGroupId = this.session.rbkGroupId;
        this.mcuData.source = 'web';
        this.spinner.show();
        const response = await this.mcuAPI.functionaryDetailsUpdate(
          this.mcuData
        );
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
    if (this.utils.isEmpty(this.mcuData.rbkId)) {
      this.toast.warning('Please Select RSK');
      return false;
    }

    if (this.utils.isEmpty(this.mcuData.villageId)) {
      this.toast.warning('Please Select Village');
      return false;
    }

    if (this.utils.isEmpty(this.mcuData.animalHusbAssitName)) {
      this.toast.warning('Please Enter Animal Husbandry Assistant Name');
      return false;
    }

    if (this.utils.isEmpty(this.mcuData.animalHusbAssitMobileno)) {
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

    if (this.utils.isEmpty(this.animalHusbAssitUidNum)) {
      this.toast.warning(
        'Please Enter Animal Husbandry Assistant Aadhar Number'
      );
      return false;
    }
    if (!this.utils.validateVerhoeff(this.animalHusbAssitUidNum)) {
      this.toast.warning('Please Enter Valid Aadhaar Number');
      return;
    }

   

    if (this.utils.isEmpty(this.mcuData.digitalAssitName)) {
      this.toast.warning('Please Enter Digital Assistant Name');
      return false;
    }

    if (this.utils.isEmpty(this.mcuData.digitalAssitMobileno)) {
      this.toast.warning('Please Enter Digital Assistant Mobile Number');
      return false;
    }

    if (!this.utils.mobileNumCheck(this.mcuData.digitalAssitMobileno)) {
      this.toast.warning('Please Enter Valid Digital Assistant Mobile Number');
      return false;
    }

    if (this.utils.isEmpty(this.digitalAssitUidNum)) {
      this.toast.warning('Please Enter Digital Assistant  Aadhar Number');
      return false;
    }
    if (!this.utils.validateVerhoeff(this.digitalAssitUidNum)) {
      this.toast.warning('Please Enter Valid Aadhaar Number');
      return;
    }
    

    if (this.utils.isEmpty(this.mcuData.welfareAssistantName)) {
      this.toast.warning('Please Enter Wellfare Assistant Name');
      return false;
    }

    if (this.utils.isEmpty(this.mcuData.welfareAssistantMobileno)) {
      this.toast.warning('Please Enter Wellfare Assistant Mobile Number');
      return false;
    }

    if (!this.utils.mobileNumCheck(this.mcuData.welfareAssistantMobileno)) {
      this.toast.warning('Please Enter Valid Welfare Assistant Mobile Number');
      return false;
    }
    if (this.utils.isEmpty(this.welfareAssistantUidNum)) {
      this.toast.warning('Please Enter Village Animator Aadhar Number');
      return false;
    }
    if (!this.utils.validateVerhoeff(this.welfareAssistantUidNum)) {
      this.toast.warning('Please Enter Valid Aadhaar Number');
      return;
    }

    

    if (this.utils.isEmpty(this.mcuData.villageAnimatorName)) {
      this.toast.warning('Please Enter Village Animator Name');
      return false;
    }

    if (this.utils.isEmpty(this.mcuData.villageAnimatorMobileno)) {
      this.toast.warning('Please Enter Village Animator Mobile Number');
      return false;
    }

    if (!this.utils.mobileNumCheck(this.mcuData.villageAnimatorMobileno)) {
      this.toast.warning('Please Enter Valid Village Animator Mobile Number');
      return false;
    }

    if (this.utils.isEmpty(this.villageAnimatorUidNum)) {
      this.toast.warning('Please Enter Village Animator Aadhar Number');
      return false;
    }
    if (!this.utils.validateVerhoeff(this.villageAnimatorUidNum)) {
      this.toast.warning('Please Enter Valid Aadhaar Number');
      return;
    }
    
    return true;
  }

  animalHusbmaskIputData(value) {
     
    if (value.length > 0) {
      // if (this.mcuData.animalHusbAssitUidNum.length > value.length) {
      //   this.mcuData.animalHusbAssitUidNum = this.mcuData.animalHusbAssitUidNum.substring(0, value.length);
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
      //   this.animalHusbAssitUidNum = maskedValue;
      // }
      if(value.length>=12){
        this.mcuData.animalHusbAssitUidNum=value;
        const response = this.utils.validateVerhoeff(this.mcuData.animalHusbAssitUidNum);    
        if (response == true) {
          this.spinner.hide();
        } else {
          this.animalHusbAssitUidNum='';
          this.spinner.hide();
          this.toast.warning('Please Enter Valid Aadhaar Number');
          return false; 
        }
        return
      }else {
        // this.animalHusbAssitUidNum='';
        // this.spinner.hide();
        // this.toast.warning('Please Enter Valid Aadhaar Number');
        // return false; 
      }

    } else {
      // this.animalHusbAssitUidNum='';
      // this.spinner.hide();
      // this.toast.warning('Please Enter Valid Aadhaar Number');
      // return false; 
    }

    return;
    
  }

  welfAnimatormaskIputData(value) {
     
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
                
          this.spinner.hide();
          this.toast.warning('Please Enter Valid Aadhaar Number');
        }
        return
      }
    } else { }
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
    } else { }
    return;
    
  }

  digitalmaskIputData(value) {
     
    if (value.length > 0) {
      // if (this.mcuData.digitalAssitUidNum.length > value.length) {
      //   this.mcuData.digitalAssitUidNum = this.mcuData.digitalAssitUidNum.substring(0, value.length);
      // } 
      // else {
      //   this.mcuData.digitalAssitUidNum += String(value).slice(-1);        
      //   const valueSplit = value.split('');
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
      if(value.length>=12){
        this.mcuData.digitalAssitUidNum=value;
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
    } else { }
    return;
    
  }
}
