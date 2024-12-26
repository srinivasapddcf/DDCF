import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { TechnicianService } from '../../services/technician.service';

@Component({
  selector: 'app-calibration',
  templateUrl: './calibration.component.html',
  styleUrls: ['./calibration.component.css'],
})
export class CalibrationComponent implements OnInit {
  @ViewChild('desktopImgUpload') desktopImgUpload: ElementRef;
  @ViewChild('cpuImgUpload') cpuImgUpload: ElementRef;
  @ViewChild('mouseImgUpload') mouseImgUpload: ElementRef;
  @ViewChild('keyboardImgUpload') keyboardImgUpload: ElementRef;
  @ViewChild('upsImgUpload') upsImgUpload: ElementRef;
  @ViewChild('electronicWeighImgUpload') electronicWeighImgUpload: ElementRef;
  @ViewChild('ultrasonicMilkAnalyseImgUpload')
  ultrasonicMilkAnalyseImgUpload: ElementRef;
  @ViewChild('ups1KvaImgUpload') ups1KvaImgUpload: ElementRef;
  @ViewChild('batteryImgUpload') batteryImgUpload: ElementRef;
  @ViewChild('remoteDisplUnitImgUpload') remoteDisplUnitImgUpload: ElementRef;
  @ViewChild('matrixPrinterImgUpload') matrixPrinterImgUpload: ElementRef;
  @ViewChild('ultraSonicStirrerImgUpload')
  ultraSonicStirrerImgUpload: ElementRef;
  @ViewChild('donglrOrModemImgUpload') donglrOrModemImgUpload: ElementRef;
  maxDate: Date;
  rbkList = [];
  villageList = [];
  routeList = [];
  bankAccLength: any;

  calibrationDetails = {
    rbkId: '',
    mandalId: '',
    districtId: '',
    villageId: '',
    inspectionDate: '',
    inspectionTime: '',
    isDesktopAvailable: '',
    desktopMaker: '',
    desktopSerialNo: '',
    cpuMaker: '',
    cpuSerialNo: '',
    mouseMaker: '',
    mouseSerialNo: '',
    keyBoardMaker: '',
    keyBoardSerialNo: '',
    upsMaker: '',
    upsSerialNo: '',
    isEleWeightScale: '',
    isUltasonicMilkAnalyser: '',
    isUps1Kva: '',
    isBattery: '',
    isRemoteDispUnit: '',
    is24Pin80ColMatrixPrinter: '',
    matrixPrinterMaker: '',
    matrixPrinterSerialNo: '',
    isUltraSonicStirrer: '',
    ultraSonicStirrerMaker: '',
    ultraSonicStirrerSerialNo: '',
    mentorId: '',
    insertedBy: '',
    DesktopImg: '',
    cpuImg: '',
    mouseImg: '',
    keyBoardImg: '',
    eleWeightScaleImg: '',
    upsImg: '',
    batteryImg: '',
    remoteDisplayImg: '',
    matrixPrinterImg: '',
    ultrasonicStrirrerImg: '',
    cowMilkFat: '',
    cowMilkSnf: '',
    buffaloMilkFat: '',
    buffaloMilkSnf: '',
    internetDevice: '',
    routeId: '',
    ultraSonicMilkAnalyzeImg: '',
    ups1KvaImg: '',
    internetDeviceImg: '',
    internetDevMaker: '',
    internetDevSerialNo: '',
    source: '',
    desktopManufactureDate: '',
    cpuManufactureDate: '',
    mouseManufactureDate: '',
    keyBoardManufactureDate: '',
    upsManufactureDate: '',
    EleWeightManufactureDate: '',
    ups1KvaManufactureDate: '',
    batteryKvaManufactureDate: '',
    remoteDispUnitManufactureDate: '',
    matrixPrinterManufactureDate: '',
    ultraSonicManufactureDate: '',
    internetDevManufactureDate: '',
    ultraSonicMilkAnalyserManufactureDate: '',
    electronicWeightScaleMaker: '',
    electronicWeightScaleSerialNo: '',
    ultraSonicMilkAnalyserMaker: '',
    ultraSonicMilkAnalyserSerialNo: '',
    ups1KVAMaker: '',
    ups1KVASerialNo: '',
    remoteDisplayUnitMaker: '',
    remoteDisplayUnitSerialNo: '',
  };

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();

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

  async loadRoutes(): Promise<void> {
    try {
      const req = {
        districtId: this.session.districtId,
        uniqueId: this.session.uniqueId,
      };
      this.spinner.show();
      const response = await this.technicianAPI.routeListByUniqueId(req);
      if (response.success) {
        this.routeList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onRouteChange(): Promise<void> {
    try {
      this.clearPromoterDetails();
      this.calibrationDetails.villageId = '';
      this.villageList = [];
      const req = {
        districtId: this.session.districtId,
        rbkId: this.calibrationDetails.routeId,
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

  // loadRBKList(): void {
  //   const req = {
  //     uniqueId: this.session.uniqueId,
  //   };
  //   this.spinner.show();
  //   this.technicianAPI
  //     .rbkListByUniqueId(req)
  //     .then((res: any) => {
  //       if (res.success) {
  //         this.rbkList = res.result;
  //       } else {
  //         this.toast.info(res.message);
  //       }
  //       this.spinner.hide();
  //     })
  //     .catch((error: any) => {
  //       this.spinner.hide();
  //       this.utils.catchResponse(error);
  //     });
  // }

  // onRbkChange(): void {
  //   this.clearPromoterDetails();
  //   this.calibrationDetails.villageId = '';
  // }

  clearPromoterDetails(): void {
    this.desktopImgUpload.nativeElement.value = '';
    // this.cpuImgUpload.nativeElement.value = '';
    // this.mouseImgUpload.nativeElement.value = '';
    // this.keyboardImgUpload.nativeElement.value = '';
    // this.upsImgUpload.nativeElement.value = '';
    // this.electronicWeighImgUpload.nativeElement.value = '';
    // this.ultrasonicMilkAnalyseImgUpload.nativeElement.value = '';
    // this.ups1KvaImgUpload.nativeElement.value = '';
    // this.batteryImgUpload.nativeElement.value = '';
    // this.remoteDisplUnitImgUpload.nativeElement.value = '';
    // this.matrixPrinterImgUpload.nativeElement.value = '';
    // this.ultraSonicStirrerImgUpload.nativeElement.value = '';
    // this.donglrOrModemImgUpload.nativeElement.value = '';
    this.calibrationDetails.inspectionDate = '';
    this.calibrationDetails.inspectionTime = '';
    this.calibrationDetails.isDesktopAvailable = '';
    this.calibrationDetails.desktopMaker = '';
    this.calibrationDetails.desktopSerialNo = '';
    this.calibrationDetails.cpuMaker = '';
    this.calibrationDetails.cpuSerialNo = '';
    this.calibrationDetails.mouseMaker = '';
    this.calibrationDetails.mouseSerialNo = '';
    this.calibrationDetails.keyBoardMaker = '';
    this.calibrationDetails.keyBoardSerialNo = '';
    this.calibrationDetails.upsMaker = '';
    this.calibrationDetails.upsSerialNo = '';
    this.calibrationDetails.isEleWeightScale = '';
    this.calibrationDetails.isUltasonicMilkAnalyser = '';
    this.calibrationDetails.isUps1Kva = '';
    this.calibrationDetails.isBattery = '';
    this.calibrationDetails.isRemoteDispUnit = '';
    this.calibrationDetails.is24Pin80ColMatrixPrinter = '';
    this.calibrationDetails.matrixPrinterMaker = '';
    this.calibrationDetails.matrixPrinterSerialNo = '';
    this.calibrationDetails.isUltraSonicStirrer = '';
    this.calibrationDetails.ultraSonicStirrerMaker = '';
    this.calibrationDetails.ultraSonicStirrerSerialNo = '';
    this.calibrationDetails.DesktopImg = '';
    this.calibrationDetails.cpuImg = '';
    this.calibrationDetails.mouseImg = '';
    this.calibrationDetails.keyBoardImg = '';
    this.calibrationDetails.eleWeightScaleImg = '';
    this.calibrationDetails.upsImg = '';
    this.calibrationDetails.batteryImg = '';
    this.calibrationDetails.remoteDisplayImg = '';
    this.calibrationDetails.matrixPrinterImg = '';
    this.calibrationDetails.ultrasonicStrirrerImg = '';
    this.calibrationDetails.cowMilkFat = '';
    this.calibrationDetails.cowMilkSnf = '';
    this.calibrationDetails.buffaloMilkFat = '';
    this.calibrationDetails.buffaloMilkSnf = '';
    this.calibrationDetails.internetDevice = '';
    this.calibrationDetails.ultraSonicMilkAnalyzeImg = '';
    this.calibrationDetails.ups1KvaImg = '';
    this.calibrationDetails.internetDeviceImg = '';
    this.calibrationDetails.internetDevMaker = '';
    this.calibrationDetails.internetDevSerialNo = '';
    this.calibrationDetails.electronicWeightScaleMaker = '';
    this.calibrationDetails.electronicWeightScaleSerialNo = '';
    this.calibrationDetails.ultraSonicMilkAnalyserMaker = '';
    this.calibrationDetails.ultraSonicMilkAnalyserSerialNo = '';
    this.calibrationDetails.ups1KVAMaker = '';
    this.calibrationDetails.ups1KVASerialNo = '';
    this.calibrationDetails.remoteDisplayUnitMaker = '';
    this.calibrationDetails.remoteDisplayUnitSerialNo = '';
  }

  async btnSubmit(): Promise<void> {
    try {
      if (this.validate()) {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.villageList.length; i++) {
          if (
            this.calibrationDetails.villageId === this.villageList[i].VILLAGE_ID
          ) {
            this.calibrationDetails.rbkId = this.villageList[i].RBK_ID;
          }
        }

        this.calibrationDetails.districtId = this.session.districtId;
        this.calibrationDetails.mandalId = this.session.mandalId;
        this.calibrationDetails.mentorId = this.session.uniqueId;
        this.calibrationDetails.insertedBy = this.session.userName;
        this.calibrationDetails.source = 'web';

        this.spinner.show();
        const response = await this.technicianAPI.calibrationSub(
          this.calibrationDetails
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
      this.calibrationDetails.routeId === '' ||
      this.calibrationDetails.routeId === null ||
      this.calibrationDetails.routeId === undefined
    ) {
      this.toast.warning('Please Select Route Id');
      return false;
    }

    // if (
    //   this.calibrationDetails.rbkId === '' ||
    //   this.calibrationDetails.rbkId === null ||
    //   this.calibrationDetails.rbkId === undefined
    // ) {
    //   this.toast.warning('Please Select RBK');
    //   return false;
    // }

    if (
      this.calibrationDetails.villageId === '' ||
      this.calibrationDetails.villageId === null ||
      this.calibrationDetails.villageId === undefined
    ) {
      this.toast.warning('Please Select Village');
      return false;
    }

    if (
      this.calibrationDetails.inspectionDate === '' ||
      this.calibrationDetails.inspectionDate === null ||
      this.calibrationDetails.inspectionDate === undefined
    ) {
      this.toast.warning('Please Select Inspection Date');
      return false;
    }

    if (
      this.calibrationDetails.inspectionTime === '' ||
      this.calibrationDetails.inspectionTime === null ||
      this.calibrationDetails.inspectionTime === undefined
    ) {
      this.toast.warning('Please Select Inspection Time');
      return false;
    }

    if (
      this.calibrationDetails.isDesktopAvailable === '' ||
      this.calibrationDetails.isDesktopAvailable === null ||
      this.calibrationDetails.isDesktopAvailable === undefined
    ) {
      this.toast.warning('Please Select If Desktop Is Available');
      return false;
    }

    if (this.calibrationDetails.isDesktopAvailable === '1') {
      if (
        this.calibrationDetails.desktopMaker === '' ||
        this.calibrationDetails.desktopMaker === null ||
        this.calibrationDetails.desktopMaker === undefined
      ) {
        this.toast.warning('Please Enter Desktop Maker');
        return false;
      }

      if (
        this.calibrationDetails.desktopSerialNo === '' ||
        this.calibrationDetails.desktopSerialNo === null ||
        this.calibrationDetails.desktopSerialNo === undefined
      ) {
        this.toast.warning('Please Enter Desktop Serial No');
        return false;
      }

      if (
        this.calibrationDetails.desktopManufactureDate === '' ||
        this.calibrationDetails.desktopManufactureDate === null ||
        this.calibrationDetails.desktopManufactureDate === undefined
      ) {
        this.toast.warning('Please Select Desktop Manufacture Date');
        return false;
      }

      if (
        this.calibrationDetails.DesktopImg === '' ||
        this.calibrationDetails.DesktopImg === null ||
        this.calibrationDetails.DesktopImg === undefined
      ) {
        this.toast.warning('Please Upload Desktop Image');
        return false;
      }

      if (
        this.calibrationDetails.cpuMaker === '' ||
        this.calibrationDetails.cpuMaker === null ||
        this.calibrationDetails.cpuMaker === undefined
      ) {
        this.toast.warning('Please Enter CPU Maker');
        return false;
      }

      if (
        this.calibrationDetails.cpuSerialNo === '' ||
        this.calibrationDetails.cpuSerialNo === null ||
        this.calibrationDetails.cpuSerialNo === undefined
      ) {
        this.toast.warning('Please Enter CPU Serial No');
        return false;
      }

      if (
        this.calibrationDetails.cpuManufactureDate === '' ||
        this.calibrationDetails.cpuManufactureDate === null ||
        this.calibrationDetails.cpuManufactureDate === undefined
      ) {
        this.toast.warning('Please Enter CPU Manufacture Date');
        return false;
      }

      if (
        this.calibrationDetails.cpuImg === '' ||
        this.calibrationDetails.cpuImg === null ||
        this.calibrationDetails.cpuImg === undefined
      ) {
        this.toast.warning('Please Upload CPU Image');
        return false;
      }

      if (
        this.calibrationDetails.mouseMaker === '' ||
        this.calibrationDetails.mouseMaker === null ||
        this.calibrationDetails.mouseMaker === undefined
      ) {
        this.toast.warning('Please Enter Mouse Maker');
        return false;
      }

      if (
        this.calibrationDetails.mouseSerialNo === '' ||
        this.calibrationDetails.mouseSerialNo === null ||
        this.calibrationDetails.mouseSerialNo === undefined
      ) {
        this.toast.warning('Please Enter Mouse Serial No');
        return false;
      }

      if (
        this.calibrationDetails.mouseManufactureDate === '' ||
        this.calibrationDetails.mouseManufactureDate === null ||
        this.calibrationDetails.mouseManufactureDate === undefined
      ) {
        this.toast.warning('Please Enter Mouse Manufacture Date');
        return false;
      }

      if (
        this.calibrationDetails.mouseImg === '' ||
        this.calibrationDetails.mouseImg === null ||
        this.calibrationDetails.mouseImg === undefined
      ) {
        this.toast.warning('Please Upload Mouse Image');
        return false;
      }

      if (
        this.calibrationDetails.keyBoardMaker === '' ||
        this.calibrationDetails.keyBoardMaker === null ||
        this.calibrationDetails.keyBoardMaker === undefined
      ) {
        this.toast.warning('Please Enter KeyBoard Maker');
        return false;
      }

      if (
        this.calibrationDetails.keyBoardSerialNo === '' ||
        this.calibrationDetails.keyBoardSerialNo === null ||
        this.calibrationDetails.keyBoardSerialNo === undefined
      ) {
        this.toast.warning('Please Enter KeyBoard Serial No');
        return false;
      }

      if (
        this.calibrationDetails.keyBoardManufactureDate === '' ||
        this.calibrationDetails.keyBoardManufactureDate === null ||
        this.calibrationDetails.keyBoardManufactureDate === undefined
      ) {
        this.toast.warning('Please Enter KeyBoard Manufacture Date');
        return false;
      }

      if (
        this.calibrationDetails.keyBoardImg === '' ||
        this.calibrationDetails.keyBoardImg === null ||
        this.calibrationDetails.keyBoardImg === undefined
      ) {
        this.toast.warning('Please Upload KeyBoard Image');
        return false;
      }

      if (
        this.calibrationDetails.upsMaker === '' ||
        this.calibrationDetails.upsMaker === null ||
        this.calibrationDetails.upsMaker === undefined
      ) {
        this.toast.warning('Please Enter UPS Maker');
        return false;
      }

      if (
        this.calibrationDetails.upsSerialNo === '' ||
        this.calibrationDetails.upsSerialNo === null ||
        this.calibrationDetails.upsSerialNo === undefined
      ) {
        this.toast.warning('Please Enter UPS Serial No');
        return false;
      }

      if (
        this.calibrationDetails.upsManufactureDate === '' ||
        this.calibrationDetails.upsManufactureDate === null ||
        this.calibrationDetails.upsManufactureDate === undefined
      ) {
        this.toast.warning('Please Enter UPS Manufacture Date');
        return false;
      }

      if (
        this.calibrationDetails.upsImg === '' ||
        this.calibrationDetails.upsImg === null ||
        this.calibrationDetails.upsImg === undefined
      ) {
        this.toast.warning('Please Upload UPS Image');
        return false;
      }
    }

    if (
      this.calibrationDetails.isEleWeightScale === '' ||
      this.calibrationDetails.isEleWeightScale === null ||
      this.calibrationDetails.isEleWeightScale === undefined
    ) {
      this.toast.warning('Please Select if Electronic Weigh Scale Available');
      return false;
    }

    if (this.calibrationDetails.isEleWeightScale === '1') {
      if (
        this.calibrationDetails.EleWeightManufactureDate === '' ||
        this.calibrationDetails.EleWeightManufactureDate === null ||
        this.calibrationDetails.EleWeightManufactureDate === undefined
      ) {
        this.toast.warning(
          'Please Upload Electronic Weigh Scale Manufacture Date'
        );
        return false;
      }

      if (
        this.calibrationDetails.eleWeightScaleImg === '' ||
        this.calibrationDetails.eleWeightScaleImg === null ||
        this.calibrationDetails.eleWeightScaleImg === undefined
      ) {
        this.toast.warning('Please Upload Electronic Weigh Scale Image');
        return false;
      }

      if (
        this.calibrationDetails.electronicWeightScaleMaker === '' ||
        this.calibrationDetails.electronicWeightScaleMaker === null ||
        this.calibrationDetails.electronicWeightScaleMaker === undefined
      ) {
        this.toast.warning('Please Enter Electronic Weigh Scale Maker');
        return false;
      }

      if (
        this.calibrationDetails.electronicWeightScaleSerialNo === '' ||
        this.calibrationDetails.electronicWeightScaleSerialNo === null ||
        this.calibrationDetails.electronicWeightScaleSerialNo === undefined
      ) {
        this.toast.warning('Please Enter Electronic Weigh Scale SerialNo');
        return false;
      }
    }

    if (
      this.calibrationDetails.isUltasonicMilkAnalyser === '' ||
      this.calibrationDetails.isUltasonicMilkAnalyser === null ||
      this.calibrationDetails.isUltasonicMilkAnalyser === undefined
    ) {
      this.toast.warning('Please Select if UltraSonic Milk Analyser Available');
      return false;
    }

    if (this.calibrationDetails.isUltasonicMilkAnalyser === '1') {
      if (
        this.calibrationDetails.ultraSonicMilkAnalyserManufactureDate === '' ||
        this.calibrationDetails.ultraSonicMilkAnalyserManufactureDate ===
          null ||
        this.calibrationDetails.ultraSonicMilkAnalyserManufactureDate ===
          undefined
      ) {
        this.toast.warning(
          'Please Select UltraSonic Milk Analyser Manufacture Date'
        );
        return false;
      }

      if (
        this.calibrationDetails.ultraSonicMilkAnalyzeImg === '' ||
        this.calibrationDetails.ultraSonicMilkAnalyzeImg === null ||
        this.calibrationDetails.ultraSonicMilkAnalyzeImg === undefined
      ) {
        this.toast.warning('Please Upload UltraSonic Milk Analyser Image');
        return false;
      }

      if (
        this.calibrationDetails.ultraSonicMilkAnalyserMaker === '' ||
        this.calibrationDetails.ultraSonicMilkAnalyserMaker === null ||
        this.calibrationDetails.ultraSonicMilkAnalyserMaker === undefined
      ) {
        this.toast.warning('Please Enter UltraSonic Milk Analyser Maker');
        return false;
      }

      if (
        this.calibrationDetails.ultraSonicMilkAnalyserSerialNo === '' ||
        this.calibrationDetails.ultraSonicMilkAnalyserSerialNo === null ||
        this.calibrationDetails.ultraSonicMilkAnalyserSerialNo === undefined
      ) {
        this.toast.warning('Please Enter UltraSonic Milk Analyser SerialNo');
        return false;
      }
    }

    if (
      this.calibrationDetails.cowMilkFat === '' ||
      this.calibrationDetails.cowMilkFat === null ||
      this.calibrationDetails.cowMilkFat === undefined
    ) {
      this.toast.warning('Please Enter Cow Milk Fat');
      return false;
    }

    if (
      this.calibrationDetails.cowMilkSnf === '' ||
      this.calibrationDetails.cowMilkSnf === null ||
      this.calibrationDetails.cowMilkSnf === undefined
    ) {
      this.toast.warning('Please Enter Cow Milk SNF');
      return false;
    }

    if (
      this.calibrationDetails.buffaloMilkFat === '' ||
      this.calibrationDetails.buffaloMilkFat === null ||
      this.calibrationDetails.buffaloMilkFat === undefined
    ) {
      this.toast.warning('Please Enter Buffalo Milk Fat');
      return false;
    }

    if (
      this.calibrationDetails.buffaloMilkSnf === '' ||
      this.calibrationDetails.buffaloMilkSnf === null ||
      this.calibrationDetails.buffaloMilkSnf === undefined
    ) {
      this.toast.warning('Please Enter Buffalo Milk SNF');
      return false;
    }

    if (
      this.calibrationDetails.isUps1Kva === '' ||
      this.calibrationDetails.isUps1Kva === null ||
      this.calibrationDetails.isUps1Kva === undefined
    ) {
      this.toast.warning('Please Select if UPS 1KVA Available');
      return false;
    }

    if (this.calibrationDetails.isUps1Kva === '1') {
      if (
        this.calibrationDetails.ups1KvaManufactureDate === '' ||
        this.calibrationDetails.ups1KvaManufactureDate === null ||
        this.calibrationDetails.ups1KvaManufactureDate === undefined
      ) {
        this.toast.warning('Please Select if UPS 1KVA Manufacture Date');
        return false;
      }

      if (
        this.calibrationDetails.ups1KVAMaker === '' ||
        this.calibrationDetails.ups1KVAMaker === null ||
        this.calibrationDetails.ups1KVAMaker === undefined
      ) {
        this.toast.warning('Please Enter if UPS 1KVA Maker');
        return false;
      }

      if (
        this.calibrationDetails.ups1KVASerialNo === '' ||
        this.calibrationDetails.ups1KVASerialNo === null ||
        this.calibrationDetails.ups1KVASerialNo === undefined
      ) {
        this.toast.warning('Please Enter UPS 1KVA Serial No');
        return false;
      }

      if (
        this.calibrationDetails.ups1KvaImg === '' ||
        this.calibrationDetails.ups1KvaImg === null ||
        this.calibrationDetails.ups1KvaImg === undefined
      ) {
        this.toast.warning('Please Upload UPS 1KVA Image');
        return false;
      }
    }

    if (
      this.calibrationDetails.isBattery === '' ||
      this.calibrationDetails.isBattery === null ||
      this.calibrationDetails.isBattery === undefined
    ) {
      this.toast.warning('Please Select if Battery Available');
      return false;
    }

    if (this.calibrationDetails.isBattery === '1') {
      if (
        this.calibrationDetails.batteryKvaManufactureDate === '' ||
        this.calibrationDetails.batteryKvaManufactureDate === null ||
        this.calibrationDetails.batteryKvaManufactureDate === undefined
      ) {
        this.toast.warning('Please Select if Battery Manufacture Date');
        return false;
      }
      if (
        this.calibrationDetails.batteryImg === '' ||
        this.calibrationDetails.batteryImg === null ||
        this.calibrationDetails.batteryImg === undefined
      ) {
        this.toast.warning('Please Upload Battery Image');
        return false;
      }
    }

    if (
      this.calibrationDetails.isRemoteDispUnit === '' ||
      this.calibrationDetails.isRemoteDispUnit === null ||
      this.calibrationDetails.isRemoteDispUnit === undefined
    ) {
      this.toast.warning('Please Select if Remote Display Unit Available');
      return false;
    }

    if (this.calibrationDetails.isRemoteDispUnit === '1') {
      if (
        this.calibrationDetails.remoteDispUnitManufactureDate === '' ||
        this.calibrationDetails.remoteDispUnitManufactureDate === null ||
        this.calibrationDetails.remoteDispUnitManufactureDate === undefined
      ) {
        this.toast.warning(
          'Please Select Remote Display Unit Manufacture Date'
        );
        return false;
      }

      if (
        this.calibrationDetails.remoteDisplayUnitMaker === '' ||
        this.calibrationDetails.remoteDisplayUnitMaker === null ||
        this.calibrationDetails.remoteDisplayUnitMaker === undefined
      ) {
        this.toast.warning('Please Enter Remote Display Unit Maker');
        return false;
      }

      if (
        this.calibrationDetails.remoteDisplayUnitSerialNo === '' ||
        this.calibrationDetails.remoteDisplayUnitSerialNo === null ||
        this.calibrationDetails.remoteDisplayUnitSerialNo === undefined
      ) {
        this.toast.warning('Please Select Remote Display Unit Serial No');
        return false;
      }

      if (
        this.calibrationDetails.remoteDisplayImg === '' ||
        this.calibrationDetails.remoteDisplayImg === null ||
        this.calibrationDetails.remoteDisplayImg === undefined
      ) {
        this.toast.warning('Please Upload Remote Display Unit Image');
        return false;
      }
    }

    if (
      this.calibrationDetails.is24Pin80ColMatrixPrinter === '' ||
      this.calibrationDetails.is24Pin80ColMatrixPrinter === null ||
      this.calibrationDetails.is24Pin80ColMatrixPrinter === undefined
    ) {
      this.toast.warning(
        'Please Select if 24 Pin 80 Column Matrix Printer Available'
      );
      return false;
    }

    if (this.calibrationDetails.is24Pin80ColMatrixPrinter === '1') {
      if (
        this.calibrationDetails.matrixPrinterMaker === '' ||
        this.calibrationDetails.matrixPrinterMaker === null ||
        this.calibrationDetails.matrixPrinterMaker === undefined
      ) {
        this.toast.warning('Please Enter Matix Printer Maker');
        return false;
      }

      if (
        this.calibrationDetails.matrixPrinterSerialNo === '' ||
        this.calibrationDetails.matrixPrinterSerialNo === null ||
        this.calibrationDetails.matrixPrinterSerialNo === undefined
      ) {
        this.toast.warning('Please Enter Matrix Printer Serial No');
        return false;
      }

      if (
        this.calibrationDetails.matrixPrinterManufactureDate === '' ||
        this.calibrationDetails.matrixPrinterManufactureDate === null ||
        this.calibrationDetails.matrixPrinterManufactureDate === undefined
      ) {
        this.toast.warning('Please Select Matrix Printer Manufacture Date');
        return false;
      }
      if (
        this.calibrationDetails.matrixPrinterImg === '' ||
        this.calibrationDetails.matrixPrinterImg === null ||
        this.calibrationDetails.matrixPrinterImg === undefined
      ) {
        this.toast.warning(
          'Please Upload 24 Pin 80 Column Matrix Printer Image'
        );
        return false;
      }
    }

    if (
      this.calibrationDetails.isUltraSonicStirrer === '' ||
      this.calibrationDetails.isUltraSonicStirrer === null ||
      this.calibrationDetails.isUltraSonicStirrer === undefined
    ) {
      this.toast.warning('Please Select if UltraSonic Stirrer Available');
      return false;
    }

    if (this.calibrationDetails.isUltraSonicStirrer === '1') {
      if (
        this.calibrationDetails.ultraSonicStirrerMaker === '' ||
        this.calibrationDetails.ultraSonicStirrerMaker === null ||
        this.calibrationDetails.ultraSonicStirrerMaker === undefined
      ) {
        this.toast.warning('Please Enter UltraSonic Stirrer Maker');
        return false;
      }

      if (
        this.calibrationDetails.ultraSonicStirrerSerialNo === '' ||
        this.calibrationDetails.ultraSonicStirrerSerialNo === null ||
        this.calibrationDetails.ultraSonicStirrerSerialNo === undefined
      ) {
        this.toast.warning('Please Enter UltraSonic Stirrer Serial No');
        return false;
      }

      if (
        this.calibrationDetails.ultraSonicManufactureDate === '' ||
        this.calibrationDetails.ultraSonicManufactureDate === null ||
        this.calibrationDetails.ultraSonicManufactureDate === undefined
      ) {
        this.toast.warning(
          'Please Select if UltraSonic Stirrer Manufacture Date'
        );
        return false;
      }

      if (
        this.calibrationDetails.ultrasonicStrirrerImg === '' ||
        this.calibrationDetails.ultrasonicStrirrerImg === null ||
        this.calibrationDetails.ultrasonicStrirrerImg === undefined
      ) {
        this.toast.warning('Please Upload UltraSonic Stirrer Image');
        return false;
      }
    }

    if (
      this.calibrationDetails.internetDevice === '' ||
      this.calibrationDetails.internetDevice === null ||
      this.calibrationDetails.internetDevice === undefined
    ) {
      this.toast.warning(
        'Please Select if Internet Connectivity Device Available'
      );
      return false;
    }

    if (
      this.calibrationDetails.internetDevice === '1' ||
      this.calibrationDetails.internetDevice === '2'
    ) {
      if (
        this.calibrationDetails.internetDevMaker === '' ||
        this.calibrationDetails.internetDevMaker === null ||
        this.calibrationDetails.internetDevMaker === undefined
      ) {
        this.toast.warning('Please Enter Internet Connectivity Device Maker');
        return false;
      }

      if (
        this.calibrationDetails.internetDevSerialNo === '' ||
        this.calibrationDetails.internetDevSerialNo === null ||
        this.calibrationDetails.internetDevSerialNo === undefined
      ) {
        this.toast.warning(
          'Please Enter Internet Connectivity Device Serial No'
        );
        return false;
      }

      if (
        this.calibrationDetails.internetDevManufactureDate === '' ||
        this.calibrationDetails.internetDevManufactureDate === null ||
        this.calibrationDetails.internetDevManufactureDate === undefined
      ) {
        this.toast.warning(
          'Please Enter Internet Connectivity Device Manufacture Date'
        );
        return false;
      }

      if (
        this.calibrationDetails.internetDeviceImg === '' ||
        this.calibrationDetails.internetDeviceImg === null ||
        this.calibrationDetails.internetDeviceImg === undefined
      ) {
        this.toast.warning('Please Upload Internet Connectivity Device Image');
        return false;
      }
    }

    return true;
  }

  async onDesktopImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.calibrationDetails.DesktopImg = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onCPUImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.calibrationDetails.cpuImg = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onMouseImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.calibrationDetails.mouseImg = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onKeyBoardImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.calibrationDetails.keyBoardImg = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onUPSImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.calibrationDetails.upsImg = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onElectronicWeighImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.calibrationDetails.eleWeightScaleImg = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onUltrasonicMilkAnalyseImgChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.calibrationDetails.ultraSonicMilkAnalyzeImg = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onUPS1KVAImgChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.calibrationDetails.ups1KvaImg = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onBatteryImgChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.calibrationDetails.batteryImg = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onRemoteDispUnitImgChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.calibrationDetails.remoteDisplayImg = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onMatrixPrinterImgChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.calibrationDetails.matrixPrinterImg = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onUltrasonicStirrerImgChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.calibrationDetails.ultrasonicStrirrerImg = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async ondonglrOrModemImgChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.calibrationDetails.internetDeviceImg = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }
}
