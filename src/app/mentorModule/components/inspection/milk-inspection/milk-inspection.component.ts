import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { CollectorService } from 'src/app/collectorModule/services/collector.service';
import { McuMappingService } from 'src/app/mentorModule/services/mcu-mapping.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-milk-inspection',
  templateUrl: './milk-inspection.component.html',
  styleUrls: ['./milk-inspection.component.css'],
})
export class MilkInspectionComponent
  implements OnInit, OnDestroy, AfterViewInit {
  rbkList = [];
  societyList = [];
  farmerList = [];
  showFarmersPopup = false;

  inspectionData = {
    districtId: '',
    mandalId: '',
    rbkId: '',
    villageData: '',
    villageId: '',
    societyId: '',
    insertedBy: '',
    source: '',
    milkInspectionList: [],
  };
  milkInspectionData = {
    farmerData: '',
    farmerId: '',
    farmerName: '',
    typeOfMilk: '',
    fat: '',
    SNF: '',
    amount: '',
  };

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();

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
      this.inspectionData.villageData  = '';
      this.societyList = [];
      this.inspectionData.milkInspectionList = [];
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
      this.inspectionData.milkInspectionList = [];
      if (!this.utils.isEmpty(this.inspectionData.villageData)) {
        this.inspectionData.societyId = JSON.parse(
          this.inspectionData.villageData
        ).VDCS_CODE;
        this.inspectionData.villageId = JSON.parse(
          this.inspectionData.villageData
        ).VILLAGE_CODE;
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async addFarmerPopUp(): Promise<void> {
    try {
      if (this.utils.isEmpty(this.inspectionData.rbkId)) {
        this.toast.warning('Please Select RSK');
        return;
      }
      if (this.utils.isEmpty(this.inspectionData.villageId)) {
        this.toast.warning('Please Select Society');
        return;
      }
      if (this.utils.isEmpty(this.inspectionData.societyId)) {
        this.toast.warning('Please Select Society');
        return;
      }
      this.clearFarmerInput();
      this.farmerList = [];
      const req = {
        societyId: this.inspectionData.societyId,
      };
      this.spinner.show();
      const res = await this.collectorAPI.farmerListBySocietyId(req);
      if (res.success) {
        this.farmerList = res.result;
        this.showFarmersPopup = true;
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  clearFarmerInput(): void {
    this.milkInspectionData = {
      farmerData: '',
      farmerId: '',
      farmerName: '',
      typeOfMilk: '',
      fat: '',
      SNF: '',
      amount: '',
    };
  }

  async btnAddFarmer(): Promise<void> {
    try {
      if (this.utils.isEmpty(this.milkInspectionData.farmerData)) {
        this.toast.warning('Please Select Farmer');
        return;
      }

      if (this.utils.isEmpty(this.milkInspectionData.typeOfMilk)) {
        this.toast.warning('Please Enter Type Of Milk');
        return;
      }

      if (this.utils.isEmpty(this.milkInspectionData.fat)) {
        this.toast.warning('Please Enter FAT');
        return;
      }

      if (!this.utils.isNumber(this.milkInspectionData.fat)) {
        this.toast.warning('Please Enter Valid FAT');
        return;
      }

      if (this.utils.isEmpty(this.milkInspectionData.SNF)) {
        this.toast.warning('Please Enter SNF');
        return;
      }

      if (!this.utils.isNumber(this.milkInspectionData.SNF)) {
        this.toast.warning('Please Enter Valid SNF');
        return;
      }

      if (this.utils.isEmpty(this.milkInspectionData.amount)) {
        this.toast.warning('Please Enter Amount');
        return;
      }

      if (!this.utils.isNumber(this.milkInspectionData.amount)) {
        this.toast.warning('Please Enter Valid Amount');
        return;
      }

      this.milkInspectionData.farmerId = JSON.parse(
        this.milkInspectionData.farmerData
      ).FARMER_CODE;
      this.milkInspectionData.farmerName = JSON.parse(
        this.milkInspectionData.farmerData
      ).FARMER_NAME;

      if (this.inspectionData.milkInspectionList.length > 10) {
        this.toast.warning('10 Farmer Only Added At A Time !!!!');
        return;
      }

      for (let i = 0; i < this.inspectionData.milkInspectionList.length; i++) {
        if (
          this.inspectionData.milkInspectionList[i].farmerId ===
          this.milkInspectionData.farmerId
        ) {
          this.toast.warning('Farmer Already Added !!!!');
          return;
        }
      }

      this.inspectionData.milkInspectionList.push(this.milkInspectionData);
      this.rerender();
      this.clearFarmerInput();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnRemoveFarmer(index): Promise<void> {
    try {
      if (this.inspectionData.milkInspectionList.length > 0) {
        this.inspectionData.milkInspectionList.splice(index, 1);
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async btnSubmit(): Promise<void> {
    try {
      this.inspectionData.insertedBy = this.session.userName;
      this.inspectionData.districtId = this.session.districtId;
      this.inspectionData.mandalId = this.session.mandalId;
      this.inspectionData.source = 'web';

      this.spinner.show();
      const res = await this.collectorAPI.milkInspectionSub(this.inspectionData);
      if (res.success) {
        alert(res.message);
        window.location.reload();
      } else {
        this.toast.info(res.message);
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
}
