import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CollectorService } from 'src/app/collectorModule/services/collector.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { McuMappingService } from '../../services/mcu-mapping.service';

@Component({
  selector: 'app-amcu-inspection',
  templateUrl: './amcu-inspection.component.html',
  styleUrls: ['./amcu-inspection.component.css'],
})
export class AmcuInspectionComponent implements OnInit {
  minDate: Date;
  rbkList = [];
  societyList = [];
  farmerList = [];

  inspectionData = {
    districtId: '',
    mandalId: '',
    rbkId: '',
    villageData: '',
    villageId: '',
    societyId: '',
    inspectionDate: '',
    inspectionShift: '',
    typeOfMilk: '',
    farmerData: '',
    farmerId: '',
    farmerName: '',
    amount: '',
    milkInLtrs: '',
    fat: '',
    SNF: '',
    kgFat: '',
    kgSNF: '',
    insertedBy: '',
    source: '',
    inspectionImg: '',
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
  ) {
    this.minDate = this.session.getTodayDate();
  }

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
      this.spinner.show();
      const res = await this.mcuAPI.rbkListByMentorId(req);
      if (res.success) {
        this.rbkList = res.result;
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onRbkChange(): Promise<void> {
    try {
      this.inspectionData.villageId = '';
      this.inspectionData.societyId = '';
      this.societyList = [];
      this.farmerList = [];
      this.inspectionData.farmerId = '';
      this.inspectionData.farmerName = '';
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
      this.inspectionData.societyId = JSON.parse(
        this.inspectionData.villageData
      ).VDCS_CODE;
      this.inspectionData.villageId = JSON.parse(
        this.inspectionData.villageData
      ).VILLAGE_CODE;
      this.farmerList = [];
      this.inspectionData.farmerId = '';
      this.inspectionData.farmerName = '';
      if (this.utils.isEmpty(this.inspectionData.societyId)) {
        return;
      }
      const req = {
        societyId: this.inspectionData.societyId,
      };
      this.spinner.show();
      const res = await this.collectorAPI.farmerListBySocietyId(req);
      if (res.success) {
        this.farmerList = res.result;
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
        this.inspectionData.farmerId = JSON.parse(
          this.inspectionData.farmerData
        ).FARMER_CODE;
        this.inspectionData.farmerName = JSON.parse(
          this.inspectionData.farmerData
        ).FARMER_NAME;

        this.inspectionData.insertedBy = this.session.userName;
        this.inspectionData.districtId = this.session.districtId;
        this.inspectionData.mandalId = this.session.mandalId;
        this.inspectionData.source = 'web';

        this.inspectionData.kgFat = (
          parseFloat(this.inspectionData.milkInLtrs) *
          1.03 *
          parseFloat(this.inspectionData.fat)
        )
          .toFixed(3)
          .toString();

        this.inspectionData.kgSNF = (
          parseFloat(this.inspectionData.fat) *
          1.03 *
          parseFloat(this.inspectionData.SNF)
        )
          .toFixed(3)
          .toString();

        this.spinner.show();
        const res = await this.mcuAPI.amcuInspectionSub(this.inspectionData);
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
    if (this.utils.isEmpty(this.inspectionData.rbkId)) {
      this.toast.warning('Please Select RSK');
      return false;
    }

    if (this.utils.isEmpty(this.inspectionData.villageId)) {
      this.toast.warning('Please Select Society');
      return false;
    }

    if (this.utils.isEmpty(this.inspectionData.farmerData)) {
      this.toast.warning('Please Select Farmer');
      return false;
    }

    if (this.utils.isEmpty(this.inspectionData.inspectionDate)) {
      this.toast.warning('Please Select Inspection Date');
      return false;
    }

    if (this.utils.isEmpty(this.inspectionData.inspectionShift)) {
      this.toast.warning('Please Select Inspection Shift');
      return false;
    }

    if (this.utils.isEmpty(this.inspectionData.typeOfMilk)) {
      this.toast.warning('Please Select Type Of Milk');
      return false;
    }

    if (this.utils.isEmpty(this.inspectionData.amount)) {
      this.toast.warning('Please Enter Amount');
      return false;
    }

    if (!this.utils.isNumber(this.inspectionData.amount)) {
      this.toast.warning('Please Enter Valid Amount');
      return false;
    }

    if (this.utils.isEmpty(this.inspectionData.milkInLtrs)) {
      this.toast.warning('Please Enter Milk In Litres');
      return false;
    }

    if (!this.utils.isNumber(this.inspectionData.milkInLtrs)) {
      this.toast.warning('Please Enter Valid Milk In Litres');
      return false;
    }

    if (this.utils.isEmpty(this.inspectionData.fat)) {
      this.toast.warning('Please Enter FAT');
      return false;
    }

    if (!this.utils.isNumber(this.inspectionData.fat)) {
      this.toast.warning('Please Enter Valid FAT');
      return false;
    }

    if (this.utils.isEmpty(this.inspectionData.SNF)) {
      this.toast.warning('Please Enter SNF');
      return false;
    }

    if (!this.utils.isNumber(this.inspectionData.SNF)) {
      this.toast.warning('Please Enter Valid SNF');
      return false;
    }

    if (this.utils.isEmpty(this.inspectionData.inspectionImg)) {
      this.toast.warning('Please Upload Inspection Photo');
      return false;
    }

    return true;
  }

  onInspectionImageChange(event): void {
    this.utils
      .encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.twoHundredKB
      )
      .then((res: any) => {
        this.inspectionData.inspectionImg = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      })
      .catch((error: any) => {
        this.utils.catchResponse(error);
      });
  }
}
