import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UserManualsService } from 'src/app/shared/services/user-manuals.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { McuMappingService } from '../../services/mcu-mapping.service';

@Component({
  selector: 'app-hand-over',
  templateUrl: './hand-over.component.html',
  styleUrls: ['./hand-over.component.css'],
})
export class HandOverComponent implements OnInit {
  maxDate: Date;
  routeList = [];
  rbkList = [];
  villageList = [];
  handoverDetails = {
    rbkId: '',
    villageId: '',
    technicianId: '',
    isDesktopWorking: '',
    isCPUWorking: '',
    isMouseWorking: '',
    isKeyBoardWorking: '',
    isUPSWorking: '',
    isElectronicScaleWorking: '',
    isMilkAnalyzerWorking: '',
    cowMilkFatSnfIndicator: '',
    buffaloMilkFatSnfIndicator: '',
    isUPS1KvaWorking: '',
    isBatteryInCondition: '',
    isDisplayUnitWorking: '',
    is24Pin80ClPrinterWorking: '',
    isUltraSonicStirrerWorking: '',
    mentorId: '',
    internetDevice: '',
    routeId: '',
    inspectionDate: '',
    inspectionTime: '',
    insertedBy: '',
    source: 'web',
    signedCopyPdf: '',
  };

  handingOverFormUrl = '';

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private mcuAPI: McuMappingService,
    private utils: UtilsService,
    private logger: LoggerService,
    private session: SessionService,
    private userManual: UserManualsService
  ) {
    this.maxDate = this.session.getTodayDate();
    this.handingOverFormUrl = this.userManual.handingOverForm;
  }

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ""){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    this.loadRoutes();
  }

  async loadRoutes(): Promise<void> {
    try {
      const req = {
        districtId: this.session.districtId,
      };
      this.spinner.show();
      const response = await this.mcuAPI.routeList(req);
      if (response.success) {
        this.routeList = response.result;
        this.loadRBKList();
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async loadRBKList(): Promise<void> {
    try {
      const req = {
        uniqueId: this.session.rbkGroupId,
      };
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

  onRouteChange(): void {
    this.clearHandOverDetails();
    this.handoverDetails.rbkId = '';
    this.handoverDetails.villageId = '';
  }

  async onRbkChange(): Promise<void> {
    try {
      this.clearHandOverDetails();
      this.handoverDetails.villageId = '';
      this.villageList = [];
      if (this.handoverDetails.rbkId === '') {
        return;
      }

      let mentorId = '';
      if (
        this.session.rbkGroupId === '' ||
        this.session.rbkGroupId === undefined ||
        this.session.rbkGroupId === null
      ) {
        mentorId = '1';
      } else {
        mentorId = this.session.rbkGroupId;
      }
      const req = {
        districtId: this.session.districtId,
        rbkId: this.handoverDetails.rbkId,
        uniqueId: mentorId,
      };
      this.spinner.show();
      const response = await this.mcuAPI.villageListByRbkId(req);
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

  onVillageChange(): void {
    this.clearHandOverDetails();
  }

  clearHandOverDetails(): void {
    this.handoverDetails.isDesktopWorking = '';
    this.handoverDetails.isCPUWorking = '';
    this.handoverDetails.isMouseWorking = '';
    this.handoverDetails.isKeyBoardWorking = '';
    this.handoverDetails.isUPSWorking = '';
    this.handoverDetails.isElectronicScaleWorking = '';
    this.handoverDetails.isMilkAnalyzerWorking = '';
    this.handoverDetails.cowMilkFatSnfIndicator = '';
    this.handoverDetails.buffaloMilkFatSnfIndicator = '';
    this.handoverDetails.isUPS1KvaWorking = '';
    this.handoverDetails.isBatteryInCondition = '';
    this.handoverDetails.isDisplayUnitWorking = '';
    this.handoverDetails.is24Pin80ClPrinterWorking = '';
    this.handoverDetails.isUltraSonicStirrerWorking = '';
    this.handoverDetails.internetDevice = '';
    this.handoverDetails.inspectionDate = '';
    this.handoverDetails.inspectionTime = '';
  }

  async btnSubmit(): Promise<void> {
    try {
      if (this.validate()) {
        this.handoverDetails.insertedBy = this.session.userName;
        this.handoverDetails.mentorId = this.session.rbkGroupId;
        this.handoverDetails.technicianId = this.session.userName;
        this.spinner.show();
        const response = await this.mcuAPI.HandOverSub(this.handoverDetails);
        if (response.success) {
          alert(response.message);
          window.location.reload();
        } else {
          this.spinner.hide();
          this.toast.info(response.message);
        }
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  validate(): boolean {
    if (
      this.handoverDetails.routeId === '' ||
      this.handoverDetails.routeId === null ||
      this.handoverDetails.routeId === undefined
    ) {
      this.toast.warning('Please Select Route');
      return false;
    }

    if (
      this.handoverDetails.rbkId === '' ||
      this.handoverDetails.rbkId === null ||
      this.handoverDetails.rbkId === undefined
    ) {
      this.toast.warning('Please Select RSK');
      return false;
    }

    if (
      this.handoverDetails.villageId === '' ||
      this.handoverDetails.villageId === null ||
      this.handoverDetails.villageId === undefined
    ) {
      this.toast.warning('Please Select Village');
      return false;
    }

    if (
      this.handoverDetails.inspectionDate === '' ||
      this.handoverDetails.inspectionDate === null ||
      this.handoverDetails.inspectionDate === undefined
    ) {
      this.toast.warning('Please Select Inspection Date');
      return false;
    }

    if (
      this.handoverDetails.inspectionTime === '' ||
      this.handoverDetails.inspectionTime === null ||
      this.handoverDetails.inspectionTime === undefined
    ) {
      this.toast.warning('Please Select Inspection Time');
      return false;
    }

    if (
      this.handoverDetails.isDesktopWorking === '' ||
      this.handoverDetails.isDesktopWorking === null ||
      this.handoverDetails.isDesktopWorking === undefined
    ) {
      this.toast.warning('Please Select Desktop Condition');
      return false;
    }

    if (
      this.handoverDetails.isCPUWorking === '' ||
      this.handoverDetails.isCPUWorking === null ||
      this.handoverDetails.isCPUWorking === undefined
    ) {
      this.toast.warning('Please Select CPU Condition');
      return false;
    }

    if (
      this.handoverDetails.isMouseWorking === '' ||
      this.handoverDetails.isMouseWorking === null ||
      this.handoverDetails.isMouseWorking === undefined
    ) {
      this.toast.warning('Please Select Mouse Condition');
      return false;
    }

    if (
      this.handoverDetails.isKeyBoardWorking === '' ||
      this.handoverDetails.isKeyBoardWorking === null ||
      this.handoverDetails.isKeyBoardWorking === undefined
    ) {
      this.toast.warning('Please Select Keyboard Condition');
      return false;
    }

    if (
      this.handoverDetails.isUPSWorking === '' ||
      this.handoverDetails.isUPSWorking === null ||
      this.handoverDetails.isUPSWorking === undefined
    ) {
      this.toast.warning('Please Select UPS Condition');
      return false;
    }

    if (
      this.handoverDetails.isElectronicScaleWorking === '' ||
      this.handoverDetails.isElectronicScaleWorking === null ||
      this.handoverDetails.isElectronicScaleWorking === undefined
    ) {
      this.toast.warning('Please Select Electronic Scale Condition');
      return false;
    }

    if (
      this.handoverDetails.isMilkAnalyzerWorking === '' ||
      this.handoverDetails.isMilkAnalyzerWorking === null ||
      this.handoverDetails.isMilkAnalyzerWorking === undefined
    ) {
      this.toast.warning('Please Select Milk Analyzer Condition');
      return false;
    }

    if (
      this.handoverDetails.cowMilkFatSnfIndicator === '' ||
      this.handoverDetails.cowMilkFatSnfIndicator === null ||
      this.handoverDetails.cowMilkFatSnfIndicator === undefined
    ) {
      this.toast.warning('Please Select Cow Milk Fat SNF Indicator Condition');
      return false;
    }

    if (
      this.handoverDetails.buffaloMilkFatSnfIndicator === '' ||
      this.handoverDetails.buffaloMilkFatSnfIndicator === null ||
      this.handoverDetails.buffaloMilkFatSnfIndicator === undefined
    ) {
      this.toast.warning(
        'Please Select Buffalo Milk Fat SNF Indicator Condition'
      );
      return false;
    }

    if (
      this.handoverDetails.isUPS1KvaWorking === '' ||
      this.handoverDetails.isUPS1KvaWorking === null ||
      this.handoverDetails.isUPS1KvaWorking === undefined
    ) {
      this.toast.warning('Please Select UPS 1KVA Condition');
      return false;
    }

    if (
      this.handoverDetails.isBatteryInCondition === '' ||
      this.handoverDetails.isBatteryInCondition === null ||
      this.handoverDetails.isBatteryInCondition === undefined
    ) {
      this.toast.warning('Please Select Battery Condition');
      return false;
    }

    if (
      this.handoverDetails.isDisplayUnitWorking === '' ||
      this.handoverDetails.isDisplayUnitWorking === null ||
      this.handoverDetails.isDisplayUnitWorking === undefined
    ) {
      this.toast.warning('Please Select Display Unit Condition');
      return false;
    }

    if (
      this.handoverDetails.is24Pin80ClPrinterWorking === '' ||
      this.handoverDetails.is24Pin80ClPrinterWorking === null ||
      this.handoverDetails.is24Pin80ClPrinterWorking === undefined
    ) {
      this.toast.warning('Please Select 24Pin 80CL Printer Condition');
      return false;
    }

    if (
      this.handoverDetails.isUltraSonicStirrerWorking === '' ||
      this.handoverDetails.isUltraSonicStirrerWorking === null ||
      this.handoverDetails.isUltraSonicStirrerWorking === undefined
    ) {
      this.toast.warning('Please Select Ultra Sonic Stirrer Condition');
      return false;
    }

    if (
      this.handoverDetails.internetDevice === '' ||
      this.handoverDetails.internetDevice === null ||
      this.handoverDetails.internetDevice === undefined
    ) {
      this.toast.warning('Please Select Internet Device Condition');
      return false;
    }

    if (this.utils.isEmpty(this.handoverDetails.signedCopyPdf)) {
      this.toast.warning('Please Upload signed copy pdf');
      return;
    }

    return true;
  }

  async onSignedCopyChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.PDF,
        this.utils.fileSize.oneMB
      );
      if (res) {
        this.handoverDetails.signedCopyPdf = res.replace(
          'data:application/pdf;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  btnDocumentDownload(url): void {
    if (this.utils.isEmpty(url)) {
      this.toast.warning('Handing Over Document Not Found !!!');
    } else {
      window.open(url, '_blank');
    }
  }
}
