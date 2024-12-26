import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { JcService } from 'src/app/jcModule/services/jc.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UserManualsService } from 'src/app/shared/services/user-manuals.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-pacs-land-allocation',
  templateUrl: './pacs-land-allocation.component.html',
  styleUrls: ['./pacs-land-allocation.component.css'],
})
export class PacsLandAllocationComponent implements OnInit {
  date: any;
  rbkList = [];
  routeList = [];
  villageList = [];
  mandalList = [];

  LandAllocateData = {
    pacsCode: '',
    pacsName: '',
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
    insertedBy: '',
    uniqueId: '',
    source: '',
    allotmentStatus: '',
    districtId: '',
    latitude: '',
    longtitude: '',
    northBoundary: '',
    southBoundary: '',
    eastBoundary: '',
    westBoundary: '',
    entireLandImg: '',
    titleDeedPhotoUpload: '',
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
    private userManual: UserManualsService
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

  async btnPacsAllotment(): Promise<void> {
    try {
      window.open(this.userManual.jcModulePACSAllotment, '_blank');
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async loadMandals(): Promise<void> {
    try {
      const req = {
        districtId: this.session.districtId,
      };
      this.spinner.show();
      const response = await this.jcAPI.pacsMandalListByDistrictId(req);
      if (response.success) {
        this.mandalList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  onMandalChange(): void {
    this.LandAllocateData.rbkId = '';
    this.LandAllocateData.villageId = '';
    this.rbkList = [];
    if (this.LandAllocateData.mandalId === '') {
      return;
    }
    this.loadRBKList();
  }

  async loadRBKList(): Promise<void> {
    try {
      const req = {
        districtId: this.session.districtId,
        mandalId: this.LandAllocateData.mandalId,
      };
      this.spinner.show();
      const response = await this.jcAPI.pacsRbkListByMandalId(req);
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

  onRbkChange(): void {
    this.LandAllocateData.villageId = '';
    this.villageList = [];
    if (this.LandAllocateData.rbkId === '') {
      return;
    }
    this.loadVillageList();
  }

  async loadVillageList(): Promise<void> {
    try {
      const req = {
        districtId: this.session.districtId,
        mandalId: this.LandAllocateData.mandalId,
        rbkId: this.LandAllocateData.rbkId,
      };
      this.spinner.show();
      const response = await this.jcAPI.pacsvillageListByRbkId(req);
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
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.villageList.length; i++) {
        if (
          this.villageList[i].VILLAGE_CODE === this.LandAllocateData.villageId
        ) {
          this.LandAllocateData.pacsCode = this.villageList[i].PACS_CODE;
          this.LandAllocateData.pacsName = this.villageList[i].PACS_NAME;
        }
      }
      if (this.LandAllocateData.villageId === '') {
        return;
      }
      const req = {
        districtId: this.session.districtId,
        mandalId: this.LandAllocateData.mandalId,
        rbkId: this.LandAllocateData.rbkId,
        villageId: this.LandAllocateData.villageId,
      };
      this.spinner.show();
      const response = await this.jcAPI.pacsLandAllocationStatus(req);
      if (response.success) {
        alert(response.message);
        const requestData = {
          districtId: this.session.districtId,
          mandalId: this.LandAllocateData.mandalId,
          rbkId: this.LandAllocateData.rbkId,
          villageId: this.LandAllocateData.villageId,
          pacsCode: this.LandAllocateData.pacsCode,
        };
        const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
        this.router.navigate(['/jcModule/PacsLandHandOver'], {
          queryParams: { request: encryptedString },
        });
      } else {
        if (response.result === '2') {
          this.toast.info(response.message);
        }
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnLandAllotmentSub(allotmentStatus): Promise<void> {
    try {
      if (this.validate()) {
        this.LandAllocateData.districtId = this.session.districtId;
        this.LandAllocateData.uniqueId = this.session.rbkGroupId;
        this.LandAllocateData.insertedBy = this.session.userName;
        this.LandAllocateData.source = 'web';
        this.LandAllocateData.allotmentStatus = allotmentStatus;
        this.spinner.show();
        const response = await this.jcAPI.pacsLandAllotmentSub(
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
    if (this.utils.isEmpty(this.LandAllocateData.mandalId)) {
      this.toast.warning('Please Select Mandal');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.rbkId)) {
      this.toast.warning('Please Select RSK');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.villageId)) {
      this.toast.warning('Please Select Village');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.pacsCode)) {
      this.toast.warning('Please Select PACS');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.publicPrivateLand)) {
      this.toast.warning('Please Select Public/Private Land');
      return false;
    }
    if (this.LandAllocateData.publicPrivateLand === '1') {
      if (this.utils.isEmpty(this.LandAllocateData.titleDeedPhotoUpload)) {
        this.toast.warning('Please Upload Title Deed Document');
        return false;
      }
    }

    if (this.utils.isEmpty(this.LandAllocateData.surveyNo)) {
      this.toast.warning('Please Enter survey No');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.area)) {
      this.toast.warning('Please Enter Area');
      return false;
    }

    const area = +this.LandAllocateData.area;

    if (
      this.LandAllocateData.villageId === '40169' ||
      
      this.LandAllocateData.villageId === '40349' ||
      this.LandAllocateData.villageId === '40392' ||
      this.LandAllocateData.villageId === '40361' ||

      this.LandAllocateData.villageId === '40348' ||
      this.LandAllocateData.villageId === '40177' ||
      this.LandAllocateData.villageId === '40176' ||
      this.LandAllocateData.villageId === '40180' ||
      this.LandAllocateData.villageId === '40174' ||
      this.LandAllocateData.villageId === '40171' ||
      this.LandAllocateData.villageId === '40352' ||
      this.LandAllocateData.villageId === '40175' ||
      this.LandAllocateData.villageId === '41434' ||
      this.LandAllocateData.villageId === '40182' ||
      this.LandAllocateData.villageId === '40360' ||
      this.LandAllocateData.villageId === '40190' ||
      this.LandAllocateData.villageId === '40178' ||
      this.LandAllocateData.villageId === '40173' ||
      this.LandAllocateData.villageId === '40354' ||
      this.LandAllocateData.villageId === '40272' ||
      this.LandAllocateData.villageId === '40271' ||
      this.LandAllocateData.villageId === '41252' ||    

      this.LandAllocateData.villageId === '40258' ||
      this.LandAllocateData.villageId === '40266' ||
      this.LandAllocateData.villageId === '40283' ||
      this.LandAllocateData.villageId === '40229' ||
      this.LandAllocateData.villageId === '40274' ||
      this.LandAllocateData.villageId === '40273' ||
      this.LandAllocateData.villageId === '40243' ||
      this.LandAllocateData.villageId === '40265' ||
      this.LandAllocateData.villageId === '40282'
    ) {
      if (area > 0.25) {
        this.toast.warning('Please Enter Maximum 0.25 Acre !!!');
        return;
      }
    } else {
      if (area < 0.25) {
        this.toast.warning('Please Enter Minimum 0.25 Acre !!!');
        return;
      }
      if (area > 1) {
        this.toast.warning('Please Enter Maximum 1 Acre !!!');
        return;
      }
    }

    if (this.utils.isEmpty(this.LandAllocateData.latitude)) {
      this.toast.warning('Please Enter Latitude');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.longtitude)) {
      this.toast.warning('Please Enter Longitude');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.entireLandImg)) {
      this.toast.warning('Please Upload Image Covering Entire Land');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.northBoundary)) {
      this.toast.warning('Please Enter North Boundary');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.northImg)) {
      this.toast.warning('Please Upload North Boundary Image');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.southBoundary)) {
      this.toast.warning('Please Enter South Boundary');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.southImg)) {
      this.toast.warning('Please Upload South Boundary Image');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.eastBoundary)) {
      this.toast.warning('Please Enter East Boundary');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.eastImg)) {
      this.toast.warning('Please Upload East Boundary Image');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.westBoundary)) {
      this.toast.warning('Please Enter West Boundary');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.westImg)) {
      this.toast.warning('Please Upload West Boundary Image');
      return false;
    }

    if (this.LandAllocateData.publicPrivateLand === '0') {
      if (this.utils.isEmpty(this.LandAllocateData.allotmentOrderAPDDCF)) {
        this.toast.warning('Please Upload Allotment Order for APDDCF');
        return false;
      }
    }
    if (this.utils.isEmpty(this.LandAllocateData.distFromVillageCenter)) {
      this.toast.warning('Please Enter Distance From Village Center');
      return false;
    }
    return true;
  }

  async onNothPhotoChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
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
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
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
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
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
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
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
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.PDF,
        this.utils.fileSize.oneMB
      );
      if (res) {
        this.LandAllocateData.allotmentOrderAPDDCF = res.replace(
          'data:application/pdf;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onTitleDeedPhotoChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.PDF,
        this.utils.fileSize.oneMB
      );
      if (res) {
        this.LandAllocateData.titleDeedPhotoUpload = res.replace(
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
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
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
