import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  finishingDetailsModel,
  finishingSubModel,
} from 'src/app/mentorModule/models/bmcu-building-construction.model';
import { McuMappingService } from 'src/app/mentorModule/services/mcu-mapping.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-finishings',
  templateUrl: './finishings.component.html',
  styleUrls: ['./finishings.component.css'],
})
export class FinishingsComponent implements OnInit {
  @ViewChild('plasteringPhotoUpload') plasteringPhoto: ElementRef;
  @ViewChild('flooringPhotoUpload') flooringPhoto: ElementRef;
  @ViewChild('windowsDoorsVentilatorsorsPhotoUpload')
  windowsDoorsVentilatorsorsPhoto: ElementRef;
  @ViewChild('paintingPhotoUpload') paintingPhoto: ElementRef;
  @ViewChild('logosAndNameBoardPhotoUpload') logosAndNameBoardPhoto: ElementRef;

  rbkList = [];
  villageList = [];
  finishingCheck = {
    plasting: false,
    flooring: false,
    windowsDoors: false,
    painting: false,
    logos: false,
  };
  finishingCheckDetails: finishingDetailsModel;

  finishingInput = {
    plasting: false,
    flooring: false,
    windowsDoors: false,
    painting: false,
    logos: false,
  };

  finishingInputSub: finishingSubModel = {
    districtId: '',
    rbkId: '',
    villageId: '',
    workId: '',
    plastering: '',
    plasteringImage: '',
    flooring: '',
    flooringImage: '',
    windowsDoorsVentilators: '',
    windowsDoorsVentilatorsImage: '',
    painting: '',
    paintingImage: '',
    logosNameboard: '',
    logosNameboardImage: '',
    insertedBy: '',
    updatedBy: '',
    submission: false,
    plasteringImagePathFlag: '',
    flooringImagePathFlag: '',
    windowsDoorsVentilatImagePathFlag: '',
    paintingImagePathFlag: '',
    logosNameboardImagePathFlag: '',
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
      this.clearFinishingDetails();
      this.clearInputs();
      this.finishingInputSub.villageId = '';
      this.villageList = [];
      if (this.utils.isEmpty(this.finishingInputSub.rbkId)) {
        return;
      }
      const req = {
        districtId: this.session.districtId,
        rbkId: this.finishingInputSub.rbkId,
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
      this.clearFinishingDetails();
      this.clearInputs();
      if (this.utils.isEmpty(this.finishingInputSub.villageId)) {
        return;
      }
      const req = {
        villageId: this.finishingInputSub.villageId,
      };

      this.spinner.show();
      const res = await this.mcuAPI.finishingCheck(req);
      this.spinner.hide();
      if (res.success) {
        this.finishingCheckDetails = res.result[0];

        if (this.utils.isEmpty(this.finishingCheckDetails.PLASTERING)) {
          this.finishingInput.plasting = true;
          this.finishingCheck.plasting = false;
        } else {
          this.finishingInput.plasting = false;
          this.finishingCheck.plasting = true;
        }

        if (this.utils.isEmpty(this.finishingCheckDetails.FLOORING)) {
          this.finishingInput.flooring = true;
          this.finishingCheck.flooring = false;
        } else {
          this.finishingInput.flooring = false;
          this.finishingCheck.flooring = true;
        }

        if (
          this.utils.isEmpty(this.finishingCheckDetails.WINDOWS_DOORS_VENTILAT)
        ) {
          this.finishingInput.windowsDoors = true;
          this.finishingCheck.windowsDoors = false;
        } else {
          this.finishingInput.windowsDoors = false;
          this.finishingCheck.windowsDoors = true;
        }
        if (this.utils.isEmpty(this.finishingCheckDetails.PAINTING)) {
          this.finishingInput.painting = true;
          this.finishingCheck.painting = false;
        } else {
          this.finishingInput.painting = false;
          this.finishingCheck.painting = true;
        }
        if (this.utils.isEmpty(this.finishingCheckDetails.LOGOS_NAMEBOARD)) {
          this.finishingInput.logos = true;
          this.finishingCheck.logos = false;
        } else {
          this.finishingInput.logos = false;
          this.finishingCheck.logos = true;
        }
      } else {
        this.finishingInput.plasting = true;
        this.finishingInput.flooring = true;
        this.finishingInput.windowsDoors = true;
        this.finishingInput.painting = true;
        this.finishingInput.logos = true;
        this.finishingCheck.plasting = false;
        this.finishingCheck.flooring = false;
        this.finishingCheck.windowsDoors = false;
        this.finishingCheck.painting = false;
        this.finishingCheck.logos = false;
      }

      if (
        this.finishingInput.plasting ||
        this.finishingInput.flooring ||
        this.finishingInput.windowsDoors ||
        this.finishingInput.painting ||
        this.finishingInput.logos
      ) {
        this.finishingInputSub.submission = true;
      } else {
        this.finishingInputSub.submission = false;
      }

      this.spinner.show();
      const workIdCheckResponse = await this.mcuAPI.bmcuWorkIdCheck(req);
      this.spinner.hide();
      if (workIdCheckResponse.success) {
        this.finishingInputSub.workId = workIdCheckResponse.result[0].WORK_ID;
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  clearFinishingDetails(): void {
    this.finishingCheck = {
      plasting: false,
      flooring: false,
      windowsDoors: false,
      painting: false,
      logos: false,
    };

    this.finishingInput = {
      plasting: false,
      flooring: false,
      windowsDoors: false,
      painting: false,
      logos: false,
    };
  }

  clearInputs(): void {
    this.finishingInputSub = {
      districtId: this.finishingInputSub.districtId,
      rbkId: this.finishingInputSub.rbkId,
      villageId: this.finishingInputSub.villageId,
      workId: '',
      plastering: '',
      plasteringImage: '',
      flooring: '',
      flooringImage: '',
      windowsDoorsVentilators: '',
      windowsDoorsVentilatorsImage: '',
      painting: '',
      paintingImage: '',
      logosNameboard: '',
      logosNameboardImage: '',
      insertedBy: '',
      updatedBy: '',
      submission: false,
      plasteringImagePathFlag: '',
      flooringImagePathFlag: '',
      windowsDoorsVentilatImagePathFlag: '',
      paintingImagePathFlag: '',
      logosNameboardImagePathFlag: '',
      source: ''
    };
  }

  async plasteringChange(): Promise<void> {
    try {
      if (this.finishingInputSub.plastering !== '1') {
        if (this.plasteringPhoto) {
          if (this.plasteringPhoto.nativeElement) {
            this.finishingInputSub.plasteringImage = '';
            this.plasteringPhoto.nativeElement.value = '';
          }
        }
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async flooringChange(): Promise<void> {
    try {
      if (this.finishingInputSub.flooring !== '1') {
        if (this.flooringPhoto) {
          if (this.flooringPhoto.nativeElement) {
            this.finishingInputSub.flooringImage = '';
            this.flooringPhoto.nativeElement.value = '';
          }
        }
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async windowsDoorsVentilatorsChange(): Promise<void> {
    try {
      if (this.finishingInputSub.windowsDoorsVentilators !== '1') {
        if (this.windowsDoorsVentilatorsorsPhoto) {
          if (this.windowsDoorsVentilatorsorsPhoto.nativeElement) {
            this.finishingInputSub.windowsDoorsVentilatorsImage = '';
            this.windowsDoorsVentilatorsorsPhoto.nativeElement.value = '';
          }
        }
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }
  async paintingChange(): Promise<void> {
    try {
      if (this.finishingInputSub.painting !== '1') {
        if (this.paintingPhoto) {
          if (this.paintingPhoto.nativeElement) {
            this.finishingInputSub.paintingImage = '';
            this.paintingPhoto.nativeElement.value = '';
          }
        }
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }
  async logosNameboardChange(): Promise<void> {
    try {
      if (this.finishingInputSub.logosNameboard !== '1') {
        if (this.logosAndNameBoardPhoto) {
          if (this.logosAndNameBoardPhoto.nativeElement) {
            this.finishingInputSub.logosNameboardImage = '';
            this.logosAndNameBoardPhoto.nativeElement.value = '';
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

  async plasteringImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.finishingInputSub.plasteringImage = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async flooringImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.finishingInputSub.flooringImage = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async windowsDoorsVentilatorsImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.finishingInputSub.windowsDoorsVentilatorsImage = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async paintingImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.finishingInputSub.paintingImage = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async logosNameboardImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.finishingInputSub.logosNameboardImage = res.replace(
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
        if (this.finishingCheck.plasting) {
          this.finishingInputSub.plastering = this.finishingCheckDetails.PLASTERING;
          this.finishingInputSub.plasteringImage = this.finishingCheckDetails.PLASTERING_IMG;
          this.finishingInputSub.plasteringImagePathFlag = '1';
        }

        if (this.finishingCheck.flooring) {
          this.finishingInputSub.flooring = this.finishingCheckDetails.FLOORING;
          this.finishingInputSub.flooringImage = this.finishingCheckDetails.FLOORING_IMG;
          this.finishingInputSub.flooringImagePathFlag = '1';
        }

        if (this.finishingCheck.windowsDoors) {
          this.finishingInputSub.windowsDoorsVentilators = this.finishingCheckDetails.WINDOWS_DOORS_VENTILAT;
          this.finishingInputSub.windowsDoorsVentilatorsImage = this.finishingCheckDetails.WINDOWS_DOORS_VENTILAT_IMG;
          this.finishingInputSub.windowsDoorsVentilatImagePathFlag = '1';
        }
        if (this.finishingCheck.painting) {
          this.finishingInputSub.painting = this.finishingCheckDetails.PAINTING;
          this.finishingInputSub.paintingImage = this.finishingCheckDetails.PAINTING_IMG;
          this.finishingInputSub.paintingImagePathFlag = '1';
        }
        if (this.finishingCheck.logos) {
          this.finishingInputSub.logosNameboard = this.finishingCheckDetails.LOGOS_NAMEBOARD;
          this.finishingInputSub.logosNameboardImage = this.finishingCheckDetails.LOGOS_NAMEBOARD_IMG;
          this.finishingInputSub.logosNameboardImagePathFlag = '1';
        }
        this.finishingInputSub.source = 'web';
        this.spinner.show();
        let response: any;
        if (
          this.finishingCheck.plasting ||
          this.finishingCheck.flooring ||
          this.finishingCheck.windowsDoors ||
          this.finishingCheck.painting ||
          this.finishingCheck.logos
        ) {
          this.finishingInputSub.updatedBy = this.session.userName;
          this.finishingInputSub.districtId = this.session.districtId;
          response = await this.mcuAPI.finishingUpdate(this.finishingInputSub);
          console.log(this.finishingInputSub);
        } else {
          this.finishingInputSub.insertedBy = this.session.userName;
          this.finishingInputSub.districtId = this.session.districtId;
          response = await this.mcuAPI.finishingSub(this.finishingInputSub);
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
    if (this.utils.isEmpty(this.finishingInputSub.rbkId)) {
      this.toast.warning('Please Select RSK');
      return false;
    }
    if (this.utils.isEmpty(this.finishingInputSub.villageId)) {
      this.toast.warning('Please Select Village');
      return false;
    }
    if (this.utils.isEmpty(this.finishingInputSub.workId)) {
      this.toast.warning('Please Select WORK ID');
      return false;
    }

    if (this.finishingInput.plasting) {
      if (this.finishingInputSub.plastering === '1') {
        if (this.utils.isEmpty(this.finishingInputSub.plasteringImage)) {
          this.toast.warning('Please Upload Plastering Photo ');
          return false;
        }
      }
    }

    if (this.finishingInput.flooring) {
      if (this.finishingInputSub.flooring === '1') {
        if (this.utils.isEmpty(this.finishingInputSub.flooringImage)) {
          this.toast.warning('Please Upload Flooring Photo ');
          return false;
        }
      }
    }

    if (this.finishingInput.windowsDoors) {
      if (this.finishingInputSub.windowsDoorsVentilators === '1') {
        if (
          this.utils.isEmpty(
            this.finishingInputSub.windowsDoorsVentilatorsImage
          )
        ) {
          this.toast.warning('Please Upload Windows Photo ');
          return false;
        }
      }
    }
    if (this.finishingInput.painting) {
      if (this.finishingInputSub.painting === '1') {
        if (this.utils.isEmpty(this.finishingInputSub.paintingImage)) {
          this.toast.warning('Please Upload Painting Photo ');
          return false;
        }
      }
    }
    if (this.finishingInput.logos) {
      if (this.finishingInputSub.logosNameboard === '1') {
        if (this.utils.isEmpty(this.finishingInputSub.logosNameboardImage)) {
          this.toast.warning('Please Upload Logos Photo ');
          return false;
        }
      }
    }

    let validateCount: number = 0;
    if (this.finishingInput.plasting) {
      if (!this.utils.isEmpty(this.finishingInputSub.plastering)) {
        validateCount++;
      }
    }

    if (this.finishingInput.flooring) {
      if (!this.utils.isEmpty(this.finishingInputSub.flooring)) {
        validateCount++;
      }
    }

    if (this.finishingInput.windowsDoors) {
      if (!this.utils.isEmpty(this.finishingInputSub.windowsDoorsVentilators)) {
        validateCount++;
      }
    }
    if (this.finishingInput.painting) {
      if (!this.utils.isEmpty(this.finishingInputSub.painting)) {
        validateCount++;
      }
    }
    if (this.finishingInput.logos) {
      if (!this.utils.isEmpty(this.finishingInputSub.logosNameboard)) {
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
