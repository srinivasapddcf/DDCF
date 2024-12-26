import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  feasibilityDetailsModel,
  feasibilitySubModel,
} from 'src/app/mentorModule/models/bmcu-building-construction.model';
import { McuMappingService } from 'src/app/mentorModule/services/mcu-mapping.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-feasibility-of-land',
  templateUrl: './feasibility-of-land.component.html',
  styleUrls: ['./feasibility-of-land.component.css'],
})
export class FeasibilityOfLandComponent implements OnInit {
  @ViewChild('lengthBrethPhotoUpload') lengthBrethPhoto: ElementRef;
  @ViewChild('locationPhotoUpload') locationPhoto: ElementRef;
  @ViewChild('roadConnectivityForVehiclePhotoUpload')
  roadConnectivityForVehiclePhoto: ElementRef;

  rbkList = [];
  villageList = [];
  feasibilityCheck = false;
  feasibilityCheckDetails: feasibilityDetailsModel;

  feasibilityInput = false;
  feasibilityInputSub: feasibilitySubModel = {
    districtId: '',
    rbkId: '',
    villageId: '',
    workId: '',
    lengthBreadthDesign: '',
    lengthBreadthDesignImage: '',
    locationAccessToWomen: '',
    locationAccessToWomenImage: '',
    roadConnectivityForVehicle: '',
    roadConnectivityForVehicleImg: '',
    insertedBy: '',
    updatedBy: '',
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
      this.clearInputs();
      this.feasibilityCheck = false;
      this.feasibilityInput = false;
      this.feasibilityInputSub.villageId = '';
      this.villageList = [];
      if (this.utils.isEmpty(this.feasibilityInputSub.rbkId)) {
        return;
      }
      const req = {
        districtId: this.session.districtId,
        rbkId: this.feasibilityInputSub.rbkId,
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
      this.clearInputs();
      this.feasibilityCheck = false;
      this.feasibilityInput = false;
      if (this.utils.isEmpty(this.feasibilityInputSub.villageId)) {
        return;
      }
      const req = {
        villageId: this.feasibilityInputSub.villageId,
      };

      this.spinner.show();
      const res = await this.mcuAPI.feasibilityOfLandCheck(req);
      this.spinner.hide();
      if (res.success) {
        this.feasibilityCheckDetails = res.result[0];
        this.feasibilityCheck = true;
      } else {
        this.feasibilityInput = true;
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  clearInputs(): void {
    this.feasibilityInputSub = {
      districtId: this.feasibilityInputSub.districtId,
      rbkId: this.feasibilityInputSub.rbkId,
      villageId: this.feasibilityInputSub.villageId,
      workId: '',
      lengthBreadthDesign: '',
      lengthBreadthDesignImage: '',
      locationAccessToWomen: '',
      locationAccessToWomenImage: '',
      roadConnectivityForVehicle: '',
      roadConnectivityForVehicleImg: '',
      insertedBy: '',
      updatedBy: '',
      source: ''
    };
  }

  async lengthBreadthDesignChange(): Promise<void> {
    try {
      if (this.feasibilityInputSub.lengthBreadthDesign !== '1') {
        if (this.lengthBrethPhoto) {
          if (this.lengthBrethPhoto.nativeElement) {
            this.feasibilityInputSub.lengthBreadthDesignImage = '';
            this.lengthBrethPhoto.nativeElement.value = '';
          }
        }
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async locationChange(): Promise<void> {
    try {
      if (this.feasibilityInputSub.locationAccessToWomen !== '1') {
        if (this.locationPhoto) {
          if (this.locationPhoto.nativeElement) {
            this.feasibilityInputSub.locationAccessToWomenImage = '';
            this.locationPhoto.nativeElement.value = '';
          }
        }
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async roadConnectivityForVehicleChange(): Promise<void> {
    try {
      if (this.feasibilityInputSub.roadConnectivityForVehicle !== '1') {
        if (this.roadConnectivityForVehiclePhoto) {
          if (this.roadConnectivityForVehiclePhoto.nativeElement) {
            this.feasibilityInputSub.roadConnectivityForVehicleImg = '';
            this.roadConnectivityForVehiclePhoto.nativeElement.value = '';
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

  async lengthBreadthDesignImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.feasibilityInputSub.lengthBreadthDesignImage = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async locationAccessToWomenImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.feasibilityInputSub.locationAccessToWomenImage = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async roadConnectivityForVehicleImgChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.feasibilityInputSub.roadConnectivityForVehicleImg = res.replace(
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
        this.feasibilityInputSub.insertedBy = this.session.userName;
        this.feasibilityInputSub.districtId = this.session.districtId;
        this.feasibilityInputSub.source = 'web';
        this.spinner.show();
        const response = await this.mcuAPI.feasibilityOfLandSub(
          this.feasibilityInputSub
        );
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
  validate(): boolean {
    if (this.utils.isEmpty(this.feasibilityInputSub.rbkId)) {
      this.toast.warning('Please Select RSK');
      return false;
    }
    if (this.utils.isEmpty(this.feasibilityInputSub.villageId)) {
      this.toast.warning('Please Select Village');
      return false;
    }

    if (this.utils.isEmpty(this.feasibilityInputSub.workId)) {
      this.toast.warning('Please Enter Work ID');
      return false;
    }

    if (!this.utils.isNumber(this.feasibilityInputSub.workId)) {
      this.toast.warning('Please Enter Valid Work ID');
      return;
    }

    if (this.utils.isEmpty(this.feasibilityInputSub.lengthBreadthDesign)) {
      this.toast.warning(
        'Please Select Whether The Length And Breadth Is Of The Design'
      );
      return false;
    }
    if (
      this.utils.isEmpty(
        this.feasibilityInputSub.lengthBreadthDesign === '1' &&
          this.feasibilityInputSub.lengthBreadthDesignImage
      )
    ) {
      this.toast.warning('Please Upload Length And Breadth Photo ');
      return false;
    }
    if (this.utils.isEmpty(this.feasibilityInputSub.locationAccessToWomen)) {
      this.toast.warning(
        'Please Select Location Accessible to The Women Pourers '
      );
      return false;
    }
    if (
      this.utils.isEmpty(
        this.feasibilityInputSub.locationAccessToWomen === '1' &&
          this.feasibilityInputSub.locationAccessToWomenImage
      )
    ) {
      this.toast.warning('Please Upload Location Accessbile Photo ');
      return false;
    }
    if (
      this.utils.isEmpty(this.feasibilityInputSub.roadConnectivityForVehicle)
    ) {
      this.toast.warning('Please Select Road Connectiivity For The Vehicle ');
      return false;
    }
    if (
      this.utils.isEmpty(
        this.feasibilityInputSub.roadConnectivityForVehicle === '1' &&
          this.feasibilityInputSub.roadConnectivityForVehicleImg
      )
    ) {
      this.toast.warning('Please Upload Road Connectivity Photo ');
      return false;
    }
    return true;
  }
}
