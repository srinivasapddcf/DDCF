import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { JcService } from 'src/app/jcModule/services/jc.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { MastersService } from 'src/app/shared/services/masters.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-bmcu-land-allocation-edit',
  templateUrl: './bmcu-land-allocation-edit.component.html',
  styleUrls: ['./bmcu-land-allocation-edit.component.css'],
})
export class BmcuLandAllocationEditComponent implements OnInit {
  date: any;
  rbkList = [];
  routeList = [];
  villageList = [];
  mandalList = [];
  rbkId = '';
  villageId = '';
  mandalId = '';

  landAllocateList: any;

  LandAllocateData = {
    rbkId: '',
    villageId: '',
    mandalId: '',
    publicPrivateLand: '',
    surveyNo: '',
    area: '',
    northImg: '',
    westImg: '',
    southImg: '',
    eastImg: '',
    allotmentOrderAPDDCF: '',
    updatedBy: '',
    uniqueId: '',
    source: '',
    allotmentStatus: '',
    districtId: '',
    acres: '',
    cents: '',
    latitude: '',
    longtitude: '',
    northBoundary: '',
    southBoundary: '',
    eastBoundary: '',
    westBoundary: '',
    entireLandImg: '',
    giftAndDeedPhotoUpload: '',
    distFromVillageCenter: '',
  };

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private jcAPI: JcService,
    private utils: UtilsService,
    private logger: LoggerService,
    private session: SessionService,
    private master: MastersService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ''){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    this.loadMandals();
  }

  async loadMandals(): Promise<void> {
    try {
      this.spinner.show();
      const req = {
        districtId: this.session.districtId,
      };
      const response = await this.jcAPI.mandalListByDistId(req);
      if (response.success) {
        this.mandalList = response.result;
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  onMandalChange(): void {
    this.rbkId = '';
    this.villageId = '';
    this.rbkList = [];
    if (this.mandalId === '') {
      return;
    }
    this.loadRBKList();
  }

  async loadRBKList(): Promise<void> {
    try {
      this.spinner.show();
      const req = {
        districtId: this.session.districtId,
        mandalId: this.mandalId,
      };
      const response = await this.jcAPI.rbkListByMandalId(req);
      if (response.success) {
        this.rbkList = response.result;
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  onRbkChange(): void {
    this.villageId = '';
    this.villageList = [];
    if (this.rbkId === '') {
      return;
    }
    this.loadVillageList();
  }

  async loadVillageList(): Promise<void> {
    try {
      this.spinner.show();
      const req = {
        districtId: this.session.districtId,
        mandalId: this.mandalId,
        rbkId: this.rbkId,
      };
      const response = await this.jcAPI.villageListByRbkId(req);
      if (response.success) {
        this.villageList = response.result;
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onVillageChange(): Promise<void> {
    try {
      this.landAllocateList = '';
      if (this.villageId === '') {
        return;
      }
      const req = {
        districtId: this.session.districtId,
        mandalId: this.mandalId,
        rbkId: this.rbkId,
        villageId: this.villageId,
      };
      this.spinner.show();
      const response = await this.jcAPI.landAllocationDetails(req);
      if (response.success) {
        this.landAllocateList = response.result[0];
        this.LandAllocateData.publicPrivateLand =
          this.landAllocateList.PUBLIC_PRIVATE_LAND === 1.0 ? '1' : '0';
        this.LandAllocateData.surveyNo = this.landAllocateList.SURVEY_NUMBER;
        this.LandAllocateData.latitude = this.landAllocateList.LATITUDE;
        this.LandAllocateData.longtitude = this.landAllocateList.LONGITUDE;
        this.LandAllocateData.northBoundary = this.landAllocateList.NORTH_BOUNDARY;
        this.LandAllocateData.southBoundary = this.landAllocateList.SOUTH_BOUNDARY;
        this.LandAllocateData.eastBoundary = this.landAllocateList.EAST_BOUNDARY;
        this.LandAllocateData.westBoundary = this.landAllocateList.WEST_BOUNDARY;
        this.LandAllocateData.distFromVillageCenter = this.landAllocateList.DISTANCE_FROM_VILLAGECENTER;
        this.LandAllocateData.acres = this.landAllocateList.AREA.toString().split(
          '.'
        )[0];
        this.LandAllocateData.cents = this.landAllocateList.AREA.toString().split(
          '.'
        )[1];

        this.LandAllocateData.allotmentOrderAPDDCF = await this.getBaseFile(
          this.landAllocateList.ALLOTMENT_ORDER_APDDCF
        );
        this.LandAllocateData.giftAndDeedPhotoUpload = await this.getBaseFile(
          this.landAllocateList.GIFT_AND_DEED
        );

        if (!this.utils.isEmpty(this.landAllocateList.LAND_ENTIRE_IMG)) {
          this.LandAllocateData.entireLandImg = await this.getBaseFile(
            this.landAllocateList.LAND_ENTIRE_IMG
          );
        }
        if (!this.utils.isEmpty(this.landAllocateList.NORTH_IMG)) {
          this.LandAllocateData.northImg = await this.getBaseFile(
            this.landAllocateList.NORTH_IMG
          );
        }
        if (!this.utils.isEmpty(this.landAllocateList.WEST_IMG)) {
          this.LandAllocateData.westImg = await this.getBaseFile(
            this.landAllocateList.WEST_IMG
          );
        }
        if (!this.utils.isEmpty(this.landAllocateList.SOUTH_IMG)) {
          this.LandAllocateData.southImg = await this.getBaseFile(
            this.landAllocateList.SOUTH_IMG
          );
        }
        if (!this.utils.isEmpty(this.landAllocateList.EAST_IMG)) {
          this.LandAllocateData.eastImg = await this.getBaseFile(
            this.landAllocateList.EAST_IMG
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

  btnImage(image): void {
    if (!this.utils.isEmpty(image)) {
      this.utils.viewImage(image);
    } else {
      this.toast.warning('Image is Not Available');
    }
  }

  btnViewPDF(pdfFile): void {
    if (!this.utils.isEmpty(pdfFile)) {
      this.utils.viewPDF(pdfFile);
    } else {
      this.toast.warning('PDF is Not Available');
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

  async btnLandAllotmentSub(allotmentStatus): Promise<void> {
    try {
      if (this.validate()) {
        this.LandAllocateData.districtId = this.session.districtId;
        this.LandAllocateData.mandalId = this.mandalId;
        this.LandAllocateData.rbkId = this.rbkId;
        this.LandAllocateData.villageId = this.villageId;
        this.LandAllocateData.uniqueId = this.session.rbkGroupId;
        this.LandAllocateData.updatedBy = this.session.userName;
        this.LandAllocateData.source = 'web';
        this.LandAllocateData.allotmentStatus = allotmentStatus;
        this.LandAllocateData.area =
          this.LandAllocateData.acres + '.' + this.LandAllocateData.cents;

        this.spinner.show();
        const response = await this.jcAPI.landAllocateUpdate(
          this.LandAllocateData
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
    if (
      this.mandalId === '' ||
      this.mandalId === null ||
      this.mandalId === undefined
    ) {
      this.toast.warning('Please Select Mandal');
      return false;
    }

    if (this.rbkId === '' || this.rbkId === null || this.rbkId === undefined) {
      this.toast.warning('Please Select RSK');
      return false;
    }

    if (
      this.villageId === '' ||
      this.villageId === null ||
      this.villageId === undefined
    ) {
      this.toast.warning('Please Select Village');
      return false;
    }

    if (
      this.LandAllocateData.publicPrivateLand === '' ||
      this.LandAllocateData.publicPrivateLand === null ||
      this.LandAllocateData.publicPrivateLand === undefined
    ) {
      this.toast.warning('Please Select Public/Private Land');
      return false;
    }
    if (this.LandAllocateData.publicPrivateLand === '0') {
      if (
        this.LandAllocateData.giftAndDeedPhotoUpload === '' ||
        this.LandAllocateData.giftAndDeedPhotoUpload === null ||
        this.LandAllocateData.giftAndDeedPhotoUpload === undefined
      ) {
        this.toast.warning('Please Upload Gift & Deed Document');
        return false;
      }
    }

    if (
      this.LandAllocateData.surveyNo === '' ||
      this.LandAllocateData.surveyNo === null ||
      this.LandAllocateData.surveyNo === undefined
    ) {
      this.toast.warning('Please Enter survey No');
      return false;
    }

    if (
      this.LandAllocateData.acres === '' ||
      this.LandAllocateData.acres === null ||
      this.LandAllocateData.acres === undefined
    ) {
      this.toast.warning('Please Enter Area Acres');
      return false;
    }

    if (
      this.LandAllocateData.cents === '' ||
      this.LandAllocateData.cents === null ||
      this.LandAllocateData.cents === undefined
    ) {
      this.toast.warning('Please Enter Area cents');
      return false;
    }
    let area = 0;

    if (this.LandAllocateData.cents.length === 1) {
      area = parseFloat(
        this.LandAllocateData.acres + '.0' + this.LandAllocateData.cents
      );
    } else {
      area = parseFloat(
        this.LandAllocateData.acres + '.' + this.LandAllocateData.cents
      );
    }

    if (area < 0.05) {
      this.toast.warning('Please Enter Atleast 5 Cents');
      return;
    }

    if (area > 1) {
      this.toast.warning('Please Enter Maximum 1 Acre Only !!!');
      return;
    }

    if (
      this.LandAllocateData.latitude === '' ||
      this.LandAllocateData.latitude === null ||
      this.LandAllocateData.latitude === undefined
    ) {
      this.toast.warning('Please Enter Latitude');
      return false;
    }

    if (
      this.LandAllocateData.longtitude === '' ||
      this.LandAllocateData.longtitude === null ||
      this.LandAllocateData.longtitude === undefined
    ) {
      this.toast.warning('Please Enter Longitude');
      return false;
    }

    if (
      this.LandAllocateData.entireLandImg === '' ||
      this.LandAllocateData.entireLandImg === null ||
      this.LandAllocateData.entireLandImg === undefined
    ) {
      this.toast.warning('Please Upload Image Covering Entire Land');
      return false;
    }

    if (
      this.LandAllocateData.northBoundary === '' ||
      this.LandAllocateData.northBoundary === null ||
      this.LandAllocateData.northBoundary === undefined
    ) {
      this.toast.warning('Please Enter North Boundary');
      return false;
    }

    if (
      this.LandAllocateData.northImg === '' ||
      this.LandAllocateData.northImg === null ||
      this.LandAllocateData.northImg === undefined
    ) {
      this.toast.warning('Please Upload North Boundary Image');
      return false;
    }

    if (
      this.LandAllocateData.southBoundary === '' ||
      this.LandAllocateData.southBoundary === null ||
      this.LandAllocateData.southBoundary === undefined
    ) {
      this.toast.warning('Please Enter South Boundary');
      return false;
    }

    if (
      this.LandAllocateData.southImg === '' ||
      this.LandAllocateData.southImg === null ||
      this.LandAllocateData.southImg === undefined
    ) {
      this.toast.warning('Please Upload South Boundary Image');
      return false;
    }

    if (
      this.LandAllocateData.eastBoundary === '' ||
      this.LandAllocateData.eastBoundary === null ||
      this.LandAllocateData.eastBoundary === undefined
    ) {
      this.toast.warning('Please Enter East Boundary');
      return false;
    }

    if (
      this.LandAllocateData.eastImg === '' ||
      this.LandAllocateData.eastImg === null ||
      this.LandAllocateData.eastImg === undefined
    ) {
      this.toast.warning('Please Upload East Boundary Image');
      return false;
    }

    if (
      this.LandAllocateData.westBoundary === '' ||
      this.LandAllocateData.westBoundary === null ||
      this.LandAllocateData.westBoundary === undefined
    ) {
      this.toast.warning('Please Enter West Boundary');
      return false;
    }

    if (
      this.LandAllocateData.westImg === '' ||
      this.LandAllocateData.westImg === null ||
      this.LandAllocateData.westImg === undefined
    ) {
      this.toast.warning('Please Upload West Boundary Image');
      return false;
    }

    if (
      this.LandAllocateData.allotmentOrderAPDDCF === '' ||
      this.LandAllocateData.allotmentOrderAPDDCF === null ||
      this.LandAllocateData.allotmentOrderAPDDCF === undefined
    ) {
      this.toast.warning('Please Upload Allotment Order for APDDCF');
      return false;
    }
    if (
      this.LandAllocateData.distFromVillageCenter === '' ||
      this.LandAllocateData.distFromVillageCenter === null ||
      this.LandAllocateData.distFromVillageCenter === undefined
    ) {
      this.toast.warning('Please Enter Distance From Village Center');
      return false;
    }

    return true;
  }

  async onNorthPhotoChange(event): Promise<void> {
    try {
      const res: any = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (!this.utils.isEmpty(res)) {
        this.LandAllocateData.northImg = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onSouthPhotoChange(event): Promise<void> {
    try {
      const res: any = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (!this.utils.isEmpty(res)) {
        this.LandAllocateData.southImg = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onEastPhotoChange(event): Promise<void> {
    try {
      const res: any = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (!this.utils.isEmpty(res)) {
        this.LandAllocateData.eastImg = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onWestPhotoChange(event): Promise<void> {
    try {
      const res: any = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (!this.utils.isEmpty(res)) {
        this.LandAllocateData.westImg = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onAllotmentOrderChange(event): Promise<void> {
    try {
      const res: any = await this.utils.encodedString(
        event,
        this.utils.fileType.PDF,
        this.utils.fileSize.oneMB
      );
      if (!this.utils.isEmpty(res)) {
        this.LandAllocateData.allotmentOrderAPDDCF = res.replace(
          'data:application/pdf;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onGiftAndDeedPhotoChange(event): Promise<void> {
    try {
      const res: any = await this.utils.encodedString(
        event,
        this.utils.fileType.PDF,
        this.utils.fileSize.oneMB
      );
      if (!this.utils.isEmpty(res)) {
        this.LandAllocateData.giftAndDeedPhotoUpload = res.replace(
          'data:application/pdf;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onEntireLandPhotoChange(event): Promise<void> {
    try {
      const res: any = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (!this.utils.isEmpty(res)) {
        this.LandAllocateData.entireLandImg = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }
}
