import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CollectorService } from 'src/app/collectorModule/services/collector.service';
import { McuMappingService } from 'src/app/mentorModule/services/mcu-mapping.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-society-inspection',
  templateUrl: './society-inspection.component.html',
  styleUrls: ['./society-inspection.component.css'],
})
export class SocietyInspectionComponent implements OnInit {
  mandalList = [];
  rbkList = [];
  societyList = [];
  equipmentList = [];
  reasonsList = [];
  inspectionData = {
    districtId: '',
    mandalId: '',
    rbkId: '',
    villageData: '',
    villageId: '',
    societyId: '',
    equipmentId: '',
    reason: '',
    remarks: '',
    insertedBy: '',
    source: '',
    inspectionImg: '',
    isEquipmentWorking: '',
  };

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private mcuAPI: McuMappingService,
    private utils: UtilsService,
    private logger: LoggerService,
    private session: SessionService,
    private collectorAPI: CollectorService,
    private commonAPI: CommonService
  ) {}

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ""){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    this.loadMandalList();
    this.reasonDataList();
  }

  async loadMandalList(): Promise<void> {
    try {
      const req = {
        districtId: this.session.districtId,
      };
      this.spinner.show();
      const response = await this.commonAPI.mandalListByDistrictId(req);
      this.spinner.hide();
      if (response.success) {
        this.mandalList = response.result;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onMandalChange(): Promise<void> {
    try {
      this.rbkList = [];
      this.societyList = [];
      this.inspectionData.rbkId = '';
      this.inspectionData.villageId = '';
      this.inspectionData.societyId = '';
      this.inspectionData.villageData = '';

      this.equipmentList =  [];
      this.inspectionData.equipmentId = '';
      this.inspectionData.isEquipmentWorking = '';

      if (this.utils.isEmpty(this.inspectionData.mandalId)) {
        return;
      }
      const req = {
        districtId: this.session.districtId,
        mandalId: this.inspectionData.mandalId,
      };
      this.spinner.show();
      const response = await this.commonAPI.rbkListByMandalId(req);
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
      this.inspectionData.villageId = '';
      this.inspectionData.societyId = '';
      this.inspectionData.villageData = '';
      this.societyList = [];

      this.equipmentList =  [];
      this.inspectionData.equipmentId = '';
      this.inspectionData.isEquipmentWorking = '';

      if (this.utils.isEmpty(this.inspectionData.rbkId)) {
        return;
      }
      const req = {
        districtId: this.session.districtId,
        rbkId: this.inspectionData.rbkId,
        uniqueId: this.session.rbkGroupId,
      };
      this.spinner.show();
      const res = await this.commonAPI.societyListRbkId(req);
      if (res.success) {
        this.societyList = res.result;
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onSocietyChange(): Promise<void> {
    try {
      this.equipmentList =  [];
      this.inspectionData.equipmentId = '';
      this.inspectionData.isEquipmentWorking = '';
      this.inspectionData.reason = '';

      this.inspectionData.societyId = JSON.parse(
        this.inspectionData.villageData
      ).VDCS_CODE;
      this.inspectionData.villageId = JSON.parse(
        this.inspectionData.villageData
      ).VILLAGE_CODE;

      if (this.utils.isEmpty(this.inspectionData.societyId)) {
        return;
      }
      const req = {
        societyId: this.inspectionData.societyId,
      };
      this.spinner.show();
      const res = await this.collectorAPI.equipmentList(req);
      if (res.success) {
        this.equipmentList = res.result;
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async reasonDataList(): Promise<void> {
    try {
      const req = {};
      this.spinner.show();
      const res = await this.collectorAPI.reasonList(req);
      if (res.success) {
        this.reasonsList = res.result;
      } else {
        this.toast.info(res.message);
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
        this.inspectionData.insertedBy = this.session.userName;
        this.inspectionData.districtId = this.session.districtId;
        this.inspectionData.source = 'web';
        this.spinner.show();
        const res = await this.collectorAPI.societyInspectionSub(
          this.inspectionData
        );
        if (res.success) {
          alert(res.message);
          window.location.reload();
        } else {
          this.toast.info(res.message);
          this.spinner.hide();
        }
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  validate(): boolean {

    if (this.utils.isEmpty(this.inspectionData.mandalId)) {
      this.toast.warning('Please Select Mandal');
      return false;
    }

    if (this.utils.isEmpty(this.inspectionData.rbkId)) {
      this.toast.warning('Please Select RSK');
      return false;
    }

    if (this.utils.isEmpty(this.inspectionData.villageId)) {
      this.toast.warning('Please Select Society');
      return false;
    }
    if (this.utils.isEmpty(this.inspectionData.equipmentId)) {
      this.toast.warning('Please Select Equipment');
      return false;
    }
    if (this.utils.isEmpty(this.inspectionData.isEquipmentWorking)) {
      this.toast.warning('Please Select Equipment Working Or Not');
      return false;
    }
    if (this.inspectionData.isEquipmentWorking === '0') {
      if (this.utils.isEmpty(this.inspectionData.reason)) {
        this.toast.warning('Please Select Reason');
        return false;
      }
    }
    if (
      this.inspectionData.isEquipmentWorking === '0' &&
      this.inspectionData.reason === '0'
    ) {
      if (this.utils.isEmpty(this.inspectionData.remarks)) {
        this.toast.warning('Please Enter Remarks');
        return false;
      }
    }
    if (this.utils.isEmpty(this.inspectionData.inspectionImg)) {
      this.toast.warning('Please Select Image');
      return false;
    }
    return true;
  }

  async onInspectionImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.twoHundredKB
      );
      if (res) {
        this.inspectionData.inspectionImg = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }
}
