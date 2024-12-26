import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  otherInfrastructureDetailsModel,
  otherInfrastructureSubModel,
} from 'src/app/mentorModule/models/bmcu-building-construction.model';
import { McuMappingService } from 'src/app/mentorModule/services/mcu-mapping.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-other-infrastructure',
  templateUrl: './other-infrastructure.component.html',
  styleUrls: ['./other-infrastructure.component.css'],
})
export class OtherInfrastructureComponent implements OnInit {
  @ViewChild('electricalPowerSupplyPhotoUpload')
  electricalPowerSupplyPhoto: ElementRef;
  @ViewChild('earthingPhotoUpload') earthingPhoto: ElementRef;
  @ViewChild('waterBoreWellPhotoUpload') waterBoreWellPhoto: ElementRef;
  @ViewChild('sanitationPhotoUpload') sanitationPhoto: ElementRef;
  @ViewChild('sumpPhotoUpload') sumpPhoto: ElementRef;

  rbkList = [];
  villageList = [];
  otherInfraCheck = {
    electricPowerSupply: false,
    earthing: false,
    waterSupplyBoretap: false,
    sanitation: false,
    sump: false,
  };
  otherInfraCheckDetails: otherInfrastructureDetailsModel;

  otherInfraInput = {
    electricPowerSupply: false,
    earthing: false,
    waterSupplyBoretap: false,
    sanitation: false,
    sump: false,
  };

  otherInfraInputSub: otherInfrastructureSubModel = {
    districtId: '',
    rbkId: '',
    villageId: '',
    workId: '',
    electricPowerSupply: '',
    electricPowerSupplyImage: '',
    earthing: '',
    earthingImage: '',
    waterSupplyBoretap: '',
    waterSupplyBoretapImage: '',
    sanitation: '',
    sanitationImage: '',
    sump: '',
    sumpImage: '',
    insertedBy: '',
    updatedBy: '',
    submission: false,
    elePowerLightFanImagePathFlag: '',
    earthingImagePathFlag: '',
    waterSupplyBoretapImagePathFlag: '',
    sanitationImagePathFlag: '',
    sumpImagePathFlag: '',
    source: ''
  };

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private mcuAPI: McuMappingService,
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
    this.loadRBKList();
  }

  async loadRBKList(): Promise<void> {
    try {
      const req = {
        uniqueId: this.session.rbkGroupId,
      };
      this.rbkList = [];
      this.spinner.show();
      const response = await this.mcuAPI.rbkListByMentorId(req);
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
      this.clearotherInfraDetails();
      this.clearInputs();
      this.otherInfraInputSub.villageId = '';
      this.villageList = [];
      if (this.utils.isEmpty(this.otherInfraInputSub.rbkId)) {
        return;
      }
      const req = {
        districtId: this.session.districtId,
        rbkId: this.otherInfraInputSub.rbkId,
        uniqueId: this.session.rbkGroupId,
      };
      this.villageList = [];
      this.spinner.show();
      const response = await this.mcuAPI.bmcuVillageListByRbkId(req);
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

  async onVillageChange(): Promise<void> {
    try {
      this.clearotherInfraDetails();
      this.clearInputs();
      if (this.utils.isEmpty(this.otherInfraInputSub.villageId)) {
        return;
      }
      const req = {
        villageId: this.otherInfraInputSub.villageId,
      };

      this.spinner.show();
      const res = await this.mcuAPI.otherInfrastructurecheck(req);
      this.spinner.hide();
      if (res.success) {
        this.otherInfraCheckDetails = res.result[0];

        if (
          this.utils.isEmpty(this.otherInfraCheckDetails.ELE_POWER_LIGHT_FAN)
        ) {
          this.otherInfraInput.electricPowerSupply = true;
          this.otherInfraCheck.electricPowerSupply = false;
        } else {
          this.otherInfraInput.electricPowerSupply = false;
          this.otherInfraCheck.electricPowerSupply = true;
        }

        if (this.utils.isEmpty(this.otherInfraCheckDetails.EARTHING)) {
          this.otherInfraInput.earthing = true;
          this.otherInfraCheck.earthing = false;
        } else {
          this.otherInfraInput.earthing = false;
          this.otherInfraCheck.earthing = true;
        }

        if (
          this.utils.isEmpty(this.otherInfraCheckDetails.WATER_SUPPLY_BORETAP)
        ) {
          this.otherInfraInput.waterSupplyBoretap = true;
          this.otherInfraCheck.waterSupplyBoretap = false;
        } else {
          this.otherInfraInput.waterSupplyBoretap = false;
          this.otherInfraCheck.waterSupplyBoretap = true;
        }
        if (this.utils.isEmpty(this.otherInfraCheckDetails.SANITATION)) {
          this.otherInfraInput.sanitation = true;
          this.otherInfraCheck.sanitation = false;
        } else {
          this.otherInfraInput.sanitation = false;
          this.otherInfraCheck.sanitation = true;
        }
        if (this.utils.isEmpty(this.otherInfraCheckDetails.SUMP)) {
          this.otherInfraInput.sump = true;
          this.otherInfraCheck.sump = false;
        } else {
          this.otherInfraInput.sump = false;
          this.otherInfraCheck.sump = true;
        }
      } else {
        this.otherInfraInput.electricPowerSupply = true;
        this.otherInfraInput.earthing = true;
        this.otherInfraInput.waterSupplyBoretap = true;
        this.otherInfraInput.sanitation = true;
        this.otherInfraInput.sump = true;
        this.otherInfraCheck.electricPowerSupply = false;
        this.otherInfraCheck.earthing = false;
        this.otherInfraCheck.waterSupplyBoretap = false;
        this.otherInfraCheck.sanitation = false;
        this.otherInfraCheck.sump = false;
      }

      if (
        this.otherInfraInput.electricPowerSupply ||
        this.otherInfraInput.earthing ||
        this.otherInfraInput.waterSupplyBoretap ||
        this.otherInfraInput.sanitation ||
        this.otherInfraInput.sump
      ) {
        this.otherInfraInputSub.submission = true;
      } else {
        this.otherInfraInputSub.submission = false;
      }

      this.spinner.show();
      const workIdCheckResponse = await this.mcuAPI.bmcuWorkIdCheck(req);
      this.spinner.hide();
      if (workIdCheckResponse.success) {
        this.otherInfraInputSub.workId = workIdCheckResponse.result[0].WORK_ID;
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  clearotherInfraDetails(): void {
    this.otherInfraCheck = {
      electricPowerSupply: false,
      earthing: false,
      waterSupplyBoretap: false,
      sanitation: false,
      sump: false,
    };

    this.otherInfraInput = {
      electricPowerSupply: false,
      earthing: false,
      waterSupplyBoretap: false,
      sanitation: false,
      sump: false,
    };
  }

  clearInputs(): void {
    this.otherInfraInputSub = {
      districtId: this.otherInfraInputSub.districtId,
      rbkId: this.otherInfraInputSub.rbkId,
      villageId: this.otherInfraInputSub.villageId,
      workId: '',
      electricPowerSupply: '',
      electricPowerSupplyImage: '',
      earthing: '',
      earthingImage: '',
      waterSupplyBoretap: '',
      waterSupplyBoretapImage: '',
      sanitation: '',
      sanitationImage: '',
      sump: '',
      sumpImage: '',
      insertedBy: '',
      updatedBy: '',
      submission: false,
      elePowerLightFanImagePathFlag: '',
      earthingImagePathFlag: '',
      waterSupplyBoretapImagePathFlag: '',
      sanitationImagePathFlag: '',
      sumpImagePathFlag: '',
      source: ''
    };
  }

  async electricPowerSupplyChange(): Promise<void> {
    try {
      if (this.otherInfraInputSub.electricPowerSupply !== '1') {
        if (this.electricalPowerSupplyPhoto) {
          if (this.electricalPowerSupplyPhoto.nativeElement) {
            this.otherInfraInputSub.electricPowerSupplyImage = '';
            this.electricalPowerSupplyPhoto.nativeElement.value = '';
          }
        }
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async earthingChange(): Promise<void> {
    try {
      if (this.otherInfraInputSub.earthing !== '1') {
        if (this.earthingPhoto) {
          if (this.earthingPhoto.nativeElement) {
            this.otherInfraInputSub.earthingImage = '';
            this.earthingPhoto.nativeElement.value = '';
          }
        }
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async waterSupplyBorewellChange(): Promise<void> {
    try {
      if (this.otherInfraInputSub.waterSupplyBoretap !== '1') {
        if (this.waterBoreWellPhoto) {
          if (this.waterBoreWellPhoto.nativeElement) {
            this.otherInfraInputSub.waterSupplyBoretapImage = '';
            this.waterBoreWellPhoto.nativeElement.value = '';
          }
        }
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }
  async sanitationChange(): Promise<void> {
    try {
      if (this.otherInfraInputSub.sanitation !== '1') {
        if (this.sanitationPhoto) {
          if (this.sanitationPhoto.nativeElement) {
            this.otherInfraInputSub.sanitationImage = '';
            this.sanitationPhoto.nativeElement.value = '';
          }
        }
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }
  async sumpChange(): Promise<void> {
    try {
      if (this.otherInfraInputSub.sump !== '1') {
        if (this.sumpPhoto) {
          if (this.sumpPhoto.nativeElement) {
            this.otherInfraInputSub.sumpImage = '';
            this.sumpPhoto.nativeElement.value = '';
          }
        }
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async btnViewImage(path): Promise<void> {
    try {
      if (!this.utils.isEmpty(path)) {
        this.spinner.show();
        const res = await this.utils.DMSFileDownload(path);
        this.spinner.hide();
        if (res.success) {
          this.utils.viewImage(res.result);
        } else {
          this.toast.info(res.message);
        }
      } else {
        this.toast.info('Photo Not Available...');
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async electricPowerSupplyImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.otherInfraInputSub.electricPowerSupplyImage = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async earthingImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.otherInfraInputSub.earthingImage = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async waterSupplyImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.otherInfraInputSub.waterSupplyBoretapImage = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async sanitationImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.otherInfraInputSub.sanitationImage = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async sumpImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.otherInfraInputSub.sumpImage = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async btnSubmit(): Promise<void> {
    try {
      if (this.validate()) {
        if (this.otherInfraCheck.electricPowerSupply) {
          this.otherInfraInputSub.electricPowerSupply = this.otherInfraCheckDetails.ELE_POWER_LIGHT_FAN;
          this.otherInfraInputSub.electricPowerSupplyImage = this.otherInfraCheckDetails.ELE_POWER_LIGHT_FAN_IMG;
          this.otherInfraInputSub.elePowerLightFanImagePathFlag = '1';
        }

        if (this.otherInfraCheck.earthing) {
          this.otherInfraInputSub.earthing = this.otherInfraCheckDetails.EARTHING;
          this.otherInfraInputSub.earthingImage = this.otherInfraCheckDetails.EARTHING_IMG;
          this.otherInfraInputSub.earthingImagePathFlag = '1';
        }

        if (this.otherInfraCheck.waterSupplyBoretap) {
          this.otherInfraInputSub.waterSupplyBoretap = this.otherInfraCheckDetails.WATER_SUPPLY_BORETAP;
          this.otherInfraInputSub.waterSupplyBoretapImage = this.otherInfraCheckDetails.WATER_SUPPLY_BORETAP_IMG;
          this.otherInfraInputSub.waterSupplyBoretapImagePathFlag = '1';
        }
        if (this.otherInfraCheck.sanitation) {
          this.otherInfraInputSub.sanitation = this.otherInfraCheckDetails.SANITATION;
          this.otherInfraInputSub.sanitationImage = this.otherInfraCheckDetails.SANITATION_IMG;
          this.otherInfraInputSub.sanitationImagePathFlag = '1';
        }
        if (this.otherInfraCheck.sump) {
          this.otherInfraInputSub.sump = this.otherInfraCheckDetails.SUMP;
          this.otherInfraInputSub.sumpImage = this.otherInfraCheckDetails.SUMP_IMG;
          this.otherInfraInputSub.sumpImagePathFlag = '1';
        }
        this.otherInfraInputSub.source = 'web';
        this.spinner.show();
        let response: any;
        if (
          this.otherInfraCheck.electricPowerSupply ||
          this.otherInfraCheck.earthing ||
          this.otherInfraCheck.waterSupplyBoretap ||
          this.otherInfraCheck.sanitation ||
          this.otherInfraCheck.sump
        ) {
          this.otherInfraInputSub.updatedBy = this.session.userName;
          this.otherInfraInputSub.districtId = this.session.districtId;
          response = await this.mcuAPI.otherInfrastructureUpdate(
            this.otherInfraInputSub
          );
          console.log(this.otherInfraInputSub);
        } else {
          this.otherInfraInputSub.insertedBy = this.session.userName;
          this.otherInfraInputSub.districtId = this.session.districtId;
          response = await this.mcuAPI.otherInfrastructureSub(
            this.otherInfraInputSub
          );
        }

        this.spinner.hide();
        if (response.success) {
          alert(response.message);
          window.location.reload();
        } else {
          this.toast.info(response.message);
        }
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  validate(): boolean {
    if (this.utils.isEmpty(this.otherInfraInputSub.rbkId)) {
      this.toast.warning('Please Select RSK');
      return false;
    }
    if (this.utils.isEmpty(this.otherInfraInputSub.villageId)) {
      this.toast.warning('Please Select Village');
      return false;
    }

    if (this.utils.isEmpty(this.otherInfraInputSub.workId)) {
      this.toast.warning('Please Select WORK ID');
      return false;
    }

    if (this.otherInfraInput.electricPowerSupply) {
      if (this.otherInfraInputSub.electricPowerSupply === '1') {
        if (
          this.utils.isEmpty(this.otherInfraInputSub.electricPowerSupplyImage)
        ) {
          this.toast.warning('Please Upload Electric Power Supply Photo ');
          return false;
        }
      }
    }

    if (this.otherInfraInput.earthing) {
      if (this.otherInfraInputSub.earthing === '1') {
        if (this.utils.isEmpty(this.otherInfraInputSub.earthingImage)) {
          this.toast.warning('Please Upload Earthing Photo ');
          return false;
        }
      }
    }

    if (this.otherInfraInput.waterSupplyBoretap) {
      if (this.otherInfraInputSub.waterSupplyBoretap === '1') {
        if (
          this.utils.isEmpty(this.otherInfraInputSub.waterSupplyBoretapImage)
        ) {
          this.toast.warning('Please Upload Water Supply Photo ');
          return false;
        }
      }
    }
    if (this.otherInfraInput.sanitation) {
      if (this.otherInfraInputSub.sanitation === '1') {
        if (this.utils.isEmpty(this.otherInfraInputSub.sanitationImage)) {
          this.toast.warning('Please Upload Sanitation Photo ');
          return false;
        }
      }
    }
    if (this.otherInfraInput.sump) {
      if (this.otherInfraInputSub.sump === '1') {
        if (this.utils.isEmpty(this.otherInfraInputSub.sumpImage)) {
          this.toast.warning('Please Upload Sump Photo ');
          return false;
        }
      }
    }

    let validateCount: number = 0;
    if (this.otherInfraInput.electricPowerSupply) {
      if (!this.utils.isEmpty(this.otherInfraInputSub.electricPowerSupply)) {
        validateCount++;
      }
    }

    if (this.otherInfraInput.earthing) {
      if (!this.utils.isEmpty(this.otherInfraInputSub.earthing)) {
        validateCount++;
      }
    }

    if (this.otherInfraInput.waterSupplyBoretap) {
      if (!this.utils.isEmpty(this.otherInfraInputSub.waterSupplyBoretap)) {
        validateCount++;
      }
    }
    if (this.otherInfraInput.sanitation) {
      if (!this.utils.isEmpty(this.otherInfraInputSub.sanitation)) {
        validateCount++;
      }
    }
    if (this.otherInfraInput.sump) {
      if (!this.utils.isEmpty(this.otherInfraInputSub.sump)) {
        validateCount++;
      }
    }

    if (validateCount < 1) {
      this.toast.warning('Please select atleast one question !!! ');
      return false;
    }

    return true;
  }
}
