import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { JcService } from 'src/app/jcModule/services/jc.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { MastersService } from 'src/app/shared/services/masters.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-bmcu-land-handover-edit',
  templateUrl: './bmcu-land-handover-edit.component.html',
  styleUrls: ['./bmcu-land-handover-edit.component.css'],
})
export class BmcuLandHandoverEditComponent implements OnInit {
  maxDate: Date;
  @ViewChild('docUpload') docUpload: ElementRef;
  rbkList = [];
  routeList = [];
  villageList = [];
  mandalList = [];

  landHandoverData = {
    handOverDate: '',
    positionTakenDate: '',
    handOverByName: '',
    handOverByMobileNo: '',
    handOverByDesig: '',
    positionStatementPdf: '',
    updatedBy: '',
    districtId: '',
    mandalId: '',
    rbkId: '',
    villageId: '',
    insertedBy: '',
    dataRecievedFromAPI: false,
  };

  possessionHandOverPopUp = false;

  landPossessionStatement = {
    districtId: '',
    districtName: '',
    mandalName: '',
    divisionName: '',
    possessionTakenName: '',
    acres: '',
    cents: '',
    villageName: '',
    allottedDate: '',
    northBoundary: '',
    southBoundary: '',
    westBoundary: '',
    eastBoundary: '',
    handedOverByName: '',
    handedOverByDesig: '',
    handedOverByMobileNo: '',
    surveyNo: '',
    takenOverByDesig: '',
    takenOverByMobileNo: '',
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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ""){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    this.maxDate = this.session.getTodayDate();
    this.landHandoverData.districtId = this.session.districtId;
    this.loadMandals();
  }

  async loadMandals(): Promise<void> {
    try {
      this.spinner.show();
      const req = {
        districtId: this.landHandoverData.districtId,
      };
      const res = await this.jcAPI.mandalListByDistId(req);
      if (res.success) {
        this.mandalList = res.result;
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.toast.info(res.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  onMandalChange(): void {
    this.landHandoverData.rbkId = '';
    this.landHandoverData.villageId = '';
    this.rbkList = [];
    this.villageList = [];
    this.clearInputs();
    if (this.landHandoverData.mandalId === '') {
      return;
    }
    this.loadRBKList();
  }

  async loadRBKList(): Promise<void> {
    try {
      this.spinner.show();
      const req = {
        districtId: this.landHandoverData.districtId,
        mandalId: this.landHandoverData.mandalId,
      };
      const res = await this.jcAPI.rbkListByMandalId(req);
      if (res.success) {
        this.rbkList = res.result;
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.toast.info(res.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  onRbkChange(): void {
    this.landHandoverData.villageId = '';
    this.villageList = [];
    this.clearInputs();
    if (this.landHandoverData.rbkId === '') {
      return;
    }
    this.loadVillageList();
  }

  async loadVillageList(): Promise<void> {
    try {
      this.spinner.show();
      const req = {
        districtId: this.landHandoverData.districtId,
        mandalId: this.landHandoverData.mandalId,
        rbkId: this.landHandoverData.rbkId,
      };
      const res = await this.jcAPI.villageListByRbkId(req);
      if (res.success) {
        this.villageList = res.result;
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.toast.info(res.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  onVillageChange(): void {
    if (this.landHandoverData.villageId !== '') {
      this.loadPossessionTaken();
    } else {
      this.clearInputs();
    }
  }

  clearInputs(): void {
    this.landHandoverData = {
      rbkId: this.landHandoverData.rbkId,
      villageId: this.landHandoverData.villageId,
      mandalId: this.landHandoverData.mandalId,
      districtId: this.landHandoverData.districtId,
      handOverDate: '',
      positionTakenDate: '',
      handOverByName: '',
      handOverByMobileNo: '',
      handOverByDesig: '',
      positionStatementPdf: '',
      updatedBy: '',
      insertedBy: '',
      dataRecievedFromAPI: false,
    };
  }

  async loadPossessionTaken(): Promise<void> {
    try {
      this.spinner.show();
      const req = {
        districtId: this.landHandoverData.districtId,
        mandalId: this.landHandoverData.mandalId,
        rbkId: this.landHandoverData.rbkId,
        villageId: this.landHandoverData.villageId,
      };
      const res = await this.jcAPI.landHandOverDetailsById(req);

      if (res.success) {
        this.landHandoverData.dataRecievedFromAPI = true;

        this.landHandoverData.handOverByName =
          res.result[0].LAND_HANDOVER_BY_NAME;
        this.landHandoverData.handOverByMobileNo =
          res.result[0].LAND_HANDOVER_BY_MOB_NO;
        this.landHandoverData.handOverByDesig =
          res.result[0].LAND_HANDOVER_BY_DISIGNATION;
        this.landHandoverData.handOverDate = res.result[0].LAND_HANDOVER_DATE;
        this.landHandoverData.positionTakenDate =
          res.result[0].DATE_OF_THE_TAKEN_POSITION;

        // To Load Land Possession Certificate When Click On Download button
        this.landPossessionStatement.districtName = res.result[0].DISTRICT_NAME;
        this.landPossessionStatement.districtId = res.result[0].DIST_CODE.toString();
        this.landPossessionStatement.divisionName = res.result[0].DIVISION;
        this.landPossessionStatement.mandalName = res.result[0].MANDAL_NAME;
        this.landPossessionStatement.villageName = res.result[0].VILLAGE_NAME;

        this.landPossessionStatement.possessionTakenName =
          res.result[0].LAND_TAKEN_BY_NAME;
        this.landPossessionStatement.takenOverByDesig =
          res.result[0].LAND_TAKEN_BY_DISIGNATION;
        this.landPossessionStatement.takenOverByMobileNo = res.result[0].LAND_TAKEN_BY_MOB_NO.toString();

        this.landPossessionStatement.allottedDate = res.result[0].ALLOTTED_DATE;
        // tslint:disable-next-line: radix
        this.landPossessionStatement.acres = parseInt(
          res.result[0].AREA.toString().split('.')[0]
        ).toString();
        // tslint:disable-next-line: radix
        this.landPossessionStatement.cents = parseInt(
          res.result[0].AREA.toString().split('.')[1]
        ).toString();
        this.landPossessionStatement.surveyNo = res.result[0].SURVEY_NUMBER;
        this.landPossessionStatement.westBoundary = res.result[0].WEST_BOUNDARY;
        this.landPossessionStatement.northBoundary =
          res.result[0].NORTH_BOUNDARY;
        this.landPossessionStatement.southBoundary =
          res.result[0].SOUTH_BOUNDARY;
        this.landPossessionStatement.eastBoundary = res.result[0].EAST_BOUNDARY;

        this.landHandoverData.positionStatementPdf = await this.getBaseFile(
          res.result[0].ATT_POSITION_STATEMENT_PDF
        );
        this.docUpload.nativeElement.value = '';
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async getBaseFile(path): Promise<string> {
    try {
      if (!this.utils.isEmpty(path)) {
        this.spinner.show();
        const res = await this.utils.DMSFileDownload(path);
        this.spinner.hide();
        if (res.success) {
          return res.result;
        }
      }
      return '';
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  btnPossessionHandOverPopUp(): void {
    this.possessionHandOverPopUp = true;
  }

  async btnPDFDownload(): Promise<void> {
    try {
      if (
        this.landHandoverData.handOverByName === '' ||
        this.landHandoverData.handOverByName === null ||
        this.landHandoverData.handOverByName === undefined
      ) {
        this.toast.warning('Please Enter Possession Handover By Name ');
        return;
      }

      if (
        this.landHandoverData.handOverByMobileNo === '' ||
        this.landHandoverData.handOverByMobileNo === null ||
        this.landHandoverData.handOverByMobileNo === undefined
      ) {
        this.toast.warning('Please Enter Possession Handover Mobile Number');
        return;
      }

      if (
        !this.utils.mobileNumCheck(this.landHandoverData.handOverByMobileNo)
      ) {
        this.toast.warning(
          'Please Enter Valid Possession Handover Mobile Number'
        );
        return;
      }

      if (
        this.landHandoverData.handOverByDesig === '' ||
        this.landHandoverData.handOverByDesig === null ||
        this.landHandoverData.handOverByDesig === undefined
      ) {
        this.toast.warning('Please Enter Possession Handover By Designation');
        return;
      }

      this.landPossessionStatement.handedOverByName = this.landHandoverData.handOverByName;
      this.landPossessionStatement.handedOverByDesig = this.landHandoverData.handOverByDesig;
      this.landPossessionStatement.handedOverByMobileNo = this.landHandoverData.handOverByMobileNo;

      this.possessionHandOverPopUp = false;
      this.spinner.show();
      const res = await this.jcAPI.possessionHandOverCertificate(
        this.landPossessionStatement
      );
      if (res.success) {
        this.landHandoverData.positionStatementPdf = res.result;
        this.docUpload.nativeElement.value = '';
        this.utils.downloadPdfFile(res.result, 'PossessionStatement');
      } else {
        this.spinner.hide();
        this.toast.info(res.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  btnViewPDF(pdfFile): void {
    if (!this.utils.isEmpty(pdfFile)) {
      this.utils.viewPDF(pdfFile);
    } else {
      this.toast.warning('PDF is Not Available');
    }
  }

  async btnSubmit(): Promise<void> {
    try {
      if (this.validate()) {
        this.landHandoverData.insertedBy = this.session.userName;
        this.landHandoverData.districtId = this.session.districtId;
        this.landHandoverData.mandalId = this.landHandoverData.mandalId;
        this.landHandoverData.rbkId = this.landHandoverData.rbkId;
        this.landHandoverData.villageId = this.landHandoverData.villageId;
        this.landHandoverData.updatedBy = this.session.userName;

        this.spinner.show();
        const res = await this.jcAPI.landHandOverDetailsUpdate(
          this.landHandoverData
        );
        if (res.success) {
          alert(res.message);
          this.router.navigate(['/jcModule/EditBMCULandHandover']);
        } else {
          this.toast.info(res.message);
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
      this.landHandoverData.rbkId === '' ||
      this.landHandoverData.rbkId === null ||
      this.landHandoverData.rbkId === undefined
    ) {
      this.toast.warning('Please Select Hand Over RSK');
      return false;
    }

    if (
      this.landHandoverData.handOverDate === '' ||
      this.landHandoverData.handOverDate === null ||
      this.landHandoverData.handOverDate === undefined
    ) {
      this.toast.warning('Please Select Hand Over Date');
      return false;
    }

    if (
      this.landHandoverData.positionTakenDate === '' ||
      this.landHandoverData.positionTakenDate === null ||
      this.landHandoverData.positionTakenDate === undefined
    ) {
      this.toast.warning('Please Select Possession Taken Date ');
      return false;
    }

    if (
      this.landHandoverData.handOverByName === '' ||
      this.landHandoverData.handOverByName === null ||
      this.landHandoverData.handOverByName === undefined
    ) {
      this.toast.warning('Please Enter Possession Handover By Name ');
      return false;
    }

    if (
      this.landHandoverData.handOverByMobileNo === '' ||
      this.landHandoverData.handOverByMobileNo === null ||
      this.landHandoverData.handOverByMobileNo === undefined
    ) {
      this.toast.warning('Please Enter Possession Handover Mobile Number');
      return false;
    }

    if (!this.utils.mobileNumCheck(this.landHandoverData.handOverByMobileNo)) {
      this.toast.warning('Please Enter Valid Possession Taken Mobile Number');
      return false;
    }

    if (
      this.landHandoverData.handOverByDesig === '' ||
      this.landHandoverData.handOverByDesig === null ||
      this.landHandoverData.handOverByDesig === undefined
    ) {
      this.toast.warning('Please Enter Possession Handover By Designation');
      return false;
    }

    if (
      this.landHandoverData.positionStatementPdf === '' ||
      this.landHandoverData.positionStatementPdf === null ||
      this.landHandoverData.positionStatementPdf === undefined
    ) {
      this.toast.warning('Attach Copy Of Possession Statement (PDF)');
      return false;
    }

    return true;
  }

  onPositionStatementChange(event): void {
    this.utils
      .encodedString(event, this.utils.fileType.PDF, this.utils.fileSize.oneMB)
      .then((res: any) => {
        this.landHandoverData.positionStatementPdf = res.replace(
          'data:application/pdf;base64,',
          ''
        );
      })
      .catch((error: any) => {
        this.utils.catchResponse(error);
      });
  }
}
