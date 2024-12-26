import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  otherFacilitiesModel,
  otherFacilitiesSubModel,
} from 'src/app/mentorModule/models/bmcu-building-construction.model';
import { McuMappingService } from 'src/app/mentorModule/services/mcu-mapping.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-other-facilities',
  templateUrl: './other-facilities.component.html',
  styleUrls: ['./other-facilities.component.css'],
})
export class OtherFacilitiesComponent implements OnInit {
  @ViewChild('waterBorewellPhotoUpload') waterBorewellPhoto: ElementRef;
  @ViewChild('drainagePhotoUpload') drainagePhoto: ElementRef;
  @ViewChild('sewageConnectivityPhotoUpload')
  sewageConnectivityPhoto: ElementRef;

  rbkList = [];
  villageList = [];
  otherFeacilitiesCheck = false;
  otherFeacilitiesCheckDetails: otherFacilitiesModel;

  otherFeacilitiesInput = false;
  otherFeacilitiesInputSub: otherFacilitiesSubModel = {
    districtId: '',
    rbkId: '',
    villageId: '',
    workId: '',
    availabilityOfWater: '',
    availabilityOfWaterImage: '',
    availabilityOfDrainage: '',
    availabilityOfDrainageImage: '',
    availabilityOfSewageConnect: '',
    availabilityOfSewageConnectImg: '',
    insertedBy: '',
    updatedBy: '',
    source: ''
  };
  otherFacilitiesDetails: any;
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
      this.otherFeacilitiesCheck = false;
      this.otherFeacilitiesInput = false;
      this.otherFeacilitiesInputSub.villageId = '';
      this.villageList = [];
      if (this.utils.isEmpty(this.otherFeacilitiesInputSub.rbkId)) {
        return;
      }
      const req = {
        districtId: this.session.districtId,
        rbkId: this.otherFeacilitiesInputSub.rbkId,
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
      this.otherFeacilitiesCheck = false;
      this.otherFeacilitiesInput = false;
      if (this.utils.isEmpty(this.otherFeacilitiesInputSub.villageId)) {
        return;
      }
      const req = {
        villageId: this.otherFeacilitiesInputSub.villageId,
      };

      this.spinner.show();
      const res = await this.mcuAPI.otherFacilitiesCheck(req);
      this.spinner.hide();
      if (res.success) {
        this.otherFeacilitiesCheckDetails = res.result[0];
        this.otherFeacilitiesCheck = true;
      } else {
        this.otherFeacilitiesInput = true;
      }

      this.spinner.show();
      const workIdCheckResponse = await this.mcuAPI.bmcuWorkIdCheck(req);
      this.spinner.hide();
      if (workIdCheckResponse.success) {
        this.otherFeacilitiesInputSub.workId =
          workIdCheckResponse.result[0].WORK_ID;
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  clearInputs(): void {
    this.otherFeacilitiesInputSub = {
      districtId: this.otherFeacilitiesInputSub.districtId,
      rbkId: this.otherFeacilitiesInputSub.rbkId,
      villageId: this.otherFeacilitiesInputSub.villageId,
      workId: '',
      availabilityOfWater: '',
      availabilityOfWaterImage: '',
      availabilityOfDrainage: '',
      availabilityOfDrainageImage: '',
      availabilityOfSewageConnect: '',
      availabilityOfSewageConnectImg: '',
      insertedBy: '',
      updatedBy: '',
      source: ''
    };
  }
  async availabilityOfWaterChange(): Promise<void> {
    try {
      if (this.otherFeacilitiesInputSub.availabilityOfWater !== '1') {
        if (this.waterBorewellPhoto) {
          if (this.waterBorewellPhoto.nativeElement) {
            this.otherFeacilitiesInputSub.availabilityOfWaterImage = '';
            this.waterBorewellPhoto.nativeElement.value = '';
          }
        }
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async availabilityOfDrainageChange(): Promise<void> {
    try {
      if (this.otherFeacilitiesInputSub.availabilityOfDrainage !== '1') {
        if (this.drainagePhoto) {
          if (this.drainagePhoto.nativeElement) {
            this.otherFeacilitiesInputSub.availabilityOfDrainageImage = '';
            this.drainagePhoto.nativeElement.value = '';
          }
        }
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async availabilityOfSewageConnectChange(): Promise<void> {
    try {
      if (this.otherFeacilitiesInputSub.availabilityOfSewageConnect !== '1') {
        if (this.sewageConnectivityPhoto) {
          if (this.sewageConnectivityPhoto.nativeElement) {
            this.otherFeacilitiesInputSub.availabilityOfSewageConnectImg = '';
            this.sewageConnectivityPhoto.nativeElement.value = '';
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

  async availabilityOfWaterImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.otherFeacilitiesInputSub.availabilityOfWaterImage = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async availabilityOfDrainageImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.otherFeacilitiesInputSub.availabilityOfDrainageImage = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async availabilityOfSewageConnectImgChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.otherFeacilitiesInputSub.availabilityOfSewageConnectImg = res.replace(
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
        this.otherFeacilitiesInputSub.insertedBy = this.session.userName;
        this.otherFeacilitiesInputSub.districtId = this.session.districtId;
        this.otherFeacilitiesInputSub.source = 'web';
        this.spinner.show();
        const response = await this.mcuAPI.otherFacilitiesSub(
          this.otherFeacilitiesInputSub
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
    if (this.utils.isEmpty(this.otherFeacilitiesInputSub.rbkId)) {
      this.toast.warning('Please Select RSK');
      return false;
    }
    if (this.utils.isEmpty(this.otherFeacilitiesInputSub.villageId)) {
      this.toast.warning('Please Select Village');
      return false;
    }
    if (this.utils.isEmpty(this.otherFeacilitiesInputSub.workId)) {
      this.toast.warning('Please Select WORK ID');
      return false;
    }
    if (this.utils.isEmpty(this.otherFeacilitiesInputSub.availabilityOfWater)) {
      this.toast.warning('Please Select Availibility Of The Water-Borewell');
      return false;
    }
    if (
      this.utils.isEmpty(
        this.otherFeacilitiesInputSub.availabilityOfWater === '1' &&
          this.otherFeacilitiesInputSub.availabilityOfWaterImage
      )
    ) {
      this.toast.warning('Please Upload Water-Borewell Photo ');
      return false;
    }
    if (
      this.utils.isEmpty(this.otherFeacilitiesInputSub.availabilityOfDrainage)
    ) {
      this.toast.warning('Please Select Availability Of The Drainage');
      return false;
    }
    if (
      this.utils.isEmpty(
        this.otherFeacilitiesInputSub.availabilityOfDrainage === '1' &&
          this.otherFeacilitiesInputSub.availabilityOfDrainageImage
      )
    ) {
      this.toast.warning('Please Upload Availability Of The Drainage Photo ');
      return false;
    }
    if (
      this.utils.isEmpty(
        this.otherFeacilitiesInputSub.availabilityOfSewageConnect
      )
    ) {
      this.toast.warning(
        'Please Select Availability Of The Sewage Connectivity '
      );
      return false;
    }
    if (
      this.utils.isEmpty(
        this.otherFeacilitiesInputSub.availabilityOfSewageConnect === '1' &&
          this.otherFeacilitiesInputSub.availabilityOfSewageConnectImg
      )
    ) {
      this.toast.warning(
        'Please Upload Availability Of The Sewage Connectivity Photo '
      );
      return false;
    }
    return true;
  }
}
