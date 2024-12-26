import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { TechnicianService } from '../../services/technician.service';

@Component({
  selector: 'app-edit-calibration-devices',
  templateUrl: './edit-calibration-devices.component.html',
  styleUrls: ['./edit-calibration-devices.component.css'],
})
export class EditCalibrationDevicesComponent implements OnInit {
  @ViewChild('deviceImage') deviceImage: ElementRef;
  maxDate: Date;
  rbkList = [];
  villageList = [];
  routeList = [];
  devicesList = [];
  clibrationCheck: boolean = false;
  calibrationDeviceDetails = {
    rbkId: '',
    mandalId: '',
    districtId: '',
    villageId: '',
    routeId: '',
    deviceId: '',
    deviceMaker: '',
    manfactureDate: '',
    deviceSerialNo: '',
    deviceImage: '',
    internetDevice: '',
  };

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private technicianAPI: TechnicianService,
    private utils: UtilsService,
    private logger: LoggerService,
    private session: SessionService,
    private router:Router
  ) {
    this.maxDate = this.session.getTodayDate();
  }

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ''){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    this.loadRoutes();
  }

  async loadDevices(): Promise<void> {
    try {
      this.spinner.show();
      const response = await this.technicianAPI.calibrationDevicesList();
      this.spinner.hide();
      if (response.success) {
        this.devicesList = response.result;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async loadRoutes(): Promise<void> {
    try {
      const req = {
        districtId: this.session.districtId,
        uniqueId: this.session.uniqueId,
      };
      this.spinner.show();
      const response = await this.technicianAPI.routeListByUniqueId(req);
      this.spinner.hide();
      if (response.success) {
        this.routeList = response.result;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onRouteChange(): Promise<void> {
    try {
      this.calibrationDeviceDetails.deviceId = '';
      this.calibrationDeviceDetails.villageId = '';
      this.villageList = [];
      const req = {
        districtId: this.session.districtId,
        rbkId: this.calibrationDeviceDetails.routeId,
        uniqueId: this.session.uniqueId,
      };
      this.spinner.show();
      const response = await this.technicianAPI.villageListByRouteId(req);
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
      this.clibrationCheck = false;
      if (this.utils.isEmpty(this.calibrationDeviceDetails.villageId)) {
        return;
      }
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.villageList.length; i++) {
        if (
          this.calibrationDeviceDetails.villageId ===
          this.villageList[i].VILLAGE_ID
        ) {
          this.calibrationDeviceDetails.rbkId = this.villageList[i].RBK_ID;
        }
      }
      if (this.utils.isEmpty(this.calibrationDeviceDetails.rbkId)) {
        this.toast.warning('RSK is not assinged to the selected village');
        return;
      }
      const req = {
        routeId: this.calibrationDeviceDetails.routeId,
        villageId: this.calibrationDeviceDetails.villageId,
        rbkId: this.calibrationDeviceDetails.rbkId,
      };
      this.spinner.show();
      const response = await this.technicianAPI.calibrationCheck(req);
      if (response.success) {
        this.clibrationCheck = true;
        this.loadDevices();
      } else {
        this.clibrationCheck = false;
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.calibrationDeviceDetails.deviceImage = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async btnUpdate(): Promise<void> {
    try {
      if (this.validate()) {
        this.calibrationDeviceDetails.districtId = this.session.districtId;
        this.calibrationDeviceDetails.mandalId = this.session.mandalId;
        this.spinner.show();
        const response = await this.technicianAPI.calibrationUpdate(
          this.calibrationDeviceDetails
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
    if (this.utils.isEmpty(this.calibrationDeviceDetails.routeId)) {
      this.toast.warning('Please Select Route Id');
      return false;
    }
    if (this.utils.isEmpty(this.calibrationDeviceDetails.rbkId)) {
      this.toast.warning('RSK is not assinged to the selected village');
      return;
    }

    if (this.utils.isEmpty(this.calibrationDeviceDetails.villageId)) {
      this.toast.warning('Please Select Village Id');
      return false;
    }
    if (this.utils.isEmpty(this.calibrationDeviceDetails.deviceId)) {
      this.toast.warning('Please Select Device ');
      return false;
    }
    if (
      this.utils.isEmpty(this.calibrationDeviceDetails.internetDevice) &&
      this.calibrationDeviceDetails.deviceId === '13'
    ) {
      this.toast.warning('Please Select Internet Device');
      return false;
    }
    if (this.calibrationDeviceDetails.deviceId !== '9') {
      if (this.utils.isEmpty(this.calibrationDeviceDetails.deviceMaker)) {
        this.toast.warning('Please Enter Device Maker Name');
        return false;
      }
    }
    if (this.utils.isEmpty(this.calibrationDeviceDetails.manfactureDate)) {
      this.toast.warning('Please Select Manfacturing Date');
      return false;
    }
    if (this.calibrationDeviceDetails.deviceId !== '9') {
      if (this.utils.isEmpty(this.calibrationDeviceDetails.deviceSerialNo)) {
        this.toast.warning('Please Enter Device Serial No');
        return false;
      }
    }
    if (this.utils.isEmpty(this.calibrationDeviceDetails.deviceImage)) {
      this.toast.warning('Please Upload Image');
      return false;
    }

    return true;
  }
}
