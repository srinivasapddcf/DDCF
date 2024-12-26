import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { MastersService } from 'src/app/shared/services/masters.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { JcService } from '../../../services/jc.service';

@Component({
  selector: 'app-land-hand-over',
  templateUrl: './land-hand-over.component.html',
  styleUrls: ['./land-hand-over.component.css'],
})
export class LandHandOverComponent implements OnInit {
  maxDate: Date;
  input = '';
  date: any;
  possessionHandOverPopUp = false;

  LandAllocateData = {
    rbkId: '',
    villageId: '',
    mandalId: '',
    districtId: '',
    handOverDate: '',
    positionTakenDate: '',
    landReceivedByName: '',
    landReceivedMobileNo: '',
    landReceivedByDesig: '',
    handOverByName: '',
    handOverByMobileNo: '',
    handOverByDesig: '',
    positionTakenImage: '',
    positionStatementPdf: '',
    signedByPerson: '',
    signedByPersonPdf: '',
    insertedBy: '',
    source: '',
  };

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
  ) {
    this.maxDate = this.session.getTodayDate();
    route.queryParams.subscribe((params) => (this.input = params['request']));
  }

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ""){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    const decString = JSON.parse(this.utils.decrypt(this.input));
    this.LandAllocateData.districtId = decString.districtId ?? '';
    this.LandAllocateData.mandalId = decString.mandalId ?? '';
    this.LandAllocateData.rbkId = decString.rbkId ?? '';
    this.LandAllocateData.villageId = decString.villageId ?? '';

    if (this.LandAllocateData.districtId === '') {
      this.router.navigate(['/jcModule/LandAllocation']);
    } else if (this.LandAllocateData.mandalId === '') {
      this.router.navigate(['/jcModule/LandAllocation']);
    } else if (this.LandAllocateData.rbkId === '') {
      this.router.navigate(['/jcModule/LandAllocation']);
    } else if (this.LandAllocateData.villageId === '') {
      this.router.navigate(['/jcModule/LandAllocation']);
    }

    this.loadPossessionTaken();

    // this.loadRBKList();
  }

  async loadPossessionTaken(): Promise<void> {
    try {
      const req = {
        districtId: this.LandAllocateData.districtId,
        mandalId: this.LandAllocateData.mandalId,
        rbkId: this.LandAllocateData.rbkId,
        villageId: this.LandAllocateData.villageId,
      };
      this.spinner.show();
      const response = await this.jcAPI.possessionTakenDetails(req);
      if (response.success) {
        this.LandAllocateData.landReceivedByName = response.result[0].NAME;
        this.LandAllocateData.landReceivedMobileNo = response.result[0].MOBILE;
        this.LandAllocateData.landReceivedByDesig =
          response.result[0].DESIGNATION;
        this.landPossessionStatement.districtName =
          response.result[0].DISTRICT_NAME;
        this.landPossessionStatement.districtId = this.LandAllocateData.districtId;
        this.landPossessionStatement.divisionName = response.result[0].DIVISION;
        this.landPossessionStatement.mandalName =
          response.result[0].MANDAL_NAME;
        this.landPossessionStatement.villageName =
          response.result[0].VILLAGE_NAME;
        this.landPossessionStatement.possessionTakenName =
          response.result[0].NAME;
        this.landPossessionStatement.takenOverByDesig =
          response.result[0].DESIGNATION;
        this.landPossessionStatement.takenOverByMobileNo =
          response.result[0].MOBILE;

        this.landPossessionStatement.allottedDate =
          response.result[0].ALLOTTED_DATE;
        this.landPossessionStatement.acres = response.result[0].AREA.toString().split(
          '.'
        )[0];
        this.landPossessionStatement.cents = response.result[0].AREA.toString().split(
          '.'
        )[1];
        this.landPossessionStatement.surveyNo =
          response.result[0].SURVEY_NUMBER;
        this.landPossessionStatement.westBoundary =
          response.result[0].WEST_BOUNDARY;
        this.landPossessionStatement.northBoundary =
          response.result[0].NORTH_BOUNDARY;
        this.landPossessionStatement.southBoundary =
          response.result[0].SOUTH_BOUNDARY;
        this.landPossessionStatement.eastBoundary =
          response.result[0].EAST_BOUNDARY;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  btnPossessionHandOverPopUp(): void {
    this.LandAllocateData.handOverByName = '';
    this.LandAllocateData.handOverByMobileNo = '';
    this.LandAllocateData.handOverByDesig = '';
    this.possessionHandOverPopUp = true;
  }

  async btnPDFDownload(): Promise<void> {
    try {
      if (
        this.LandAllocateData.handOverByName === '' ||
        this.LandAllocateData.handOverByName === null ||
        this.LandAllocateData.handOverByName === undefined
      ) {
        this.toast.warning('Please Enter Possession Handover By Name ');
        return;
      }

      if (
        this.LandAllocateData.handOverByMobileNo === '' ||
        this.LandAllocateData.handOverByMobileNo === null ||
        this.LandAllocateData.handOverByMobileNo === undefined
      ) {
        this.toast.warning('Please Enter Possession Handover Mobile Number');
        return;
      }

      if (
        !this.utils.mobileNumCheck(this.LandAllocateData.handOverByMobileNo)
      ) {
        this.toast.warning(
          'Please Enter Valid Possession Handover Mobile Number'
        );
        return;
      }

      if (
        this.LandAllocateData.handOverByDesig === '' ||
        this.LandAllocateData.handOverByDesig === null ||
        this.LandAllocateData.handOverByDesig === undefined
      ) {
        this.toast.warning('Please Enter Possession Handover By Designation');
        return;
      }

      this.landPossessionStatement.handedOverByName = this.LandAllocateData.handOverByName;
      this.landPossessionStatement.handedOverByDesig = this.LandAllocateData.handOverByDesig;
      this.landPossessionStatement.handedOverByMobileNo = this.LandAllocateData.handOverByMobileNo;

      this.possessionHandOverPopUp = false;
      this.spinner.show();
      const response = await this.jcAPI.possessionHandOverCertificate(
        this.landPossessionStatement
      );
      if (response.success) {
        this.utils.downloadPdfFile(response.result, 'PossessionStatement');
      } else {
        this.toast.info(response.message);
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
        this.LandAllocateData.insertedBy = this.session.userName;
        this.LandAllocateData.source = 'web';
        this.spinner.show();
        const response = await this.jcAPI.landHandOverSub(
          this.LandAllocateData
        );
        if (response.success) {
          alert(response.message);
          this.router.navigate(['/jcModule/LandAllocation']);
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
      this.LandAllocateData.rbkId === '' ||
      this.LandAllocateData.rbkId === null ||
      this.LandAllocateData.rbkId === undefined
    ) {
      this.toast.warning('Please Select Hand Over RSK');
      return false;
    }

    if (
      this.LandAllocateData.handOverDate === '' ||
      this.LandAllocateData.handOverDate === null ||
      this.LandAllocateData.handOverDate === undefined
    ) {
      this.toast.warning('Please Select Hand Over Date');
      return false;
    }

    if (
      this.LandAllocateData.positionTakenDate === '' ||
      this.LandAllocateData.positionTakenDate === null ||
      this.LandAllocateData.positionTakenDate === undefined
    ) {
      this.toast.warning('Please Select Possession Taken Date ');
      return false;
    }

    if (
      this.LandAllocateData.landReceivedByName === '' ||
      this.LandAllocateData.landReceivedByName === null ||
      this.LandAllocateData.landReceivedByName === undefined
    ) {
      this.toast.warning('Please Enter Possession Taken By Name');
      return false;
    }

    if (
      this.LandAllocateData.landReceivedMobileNo === '' ||
      this.LandAllocateData.landReceivedMobileNo === null ||
      this.LandAllocateData.landReceivedMobileNo === undefined
    ) {
      this.toast.warning('Please Enter Possession Taken By Mobile Number');
      return false;
    }

    if (
      !this.utils.mobileNumCheck(this.LandAllocateData.landReceivedMobileNo)
    ) {
      this.toast.warning('Please Enter Valid Possession Taken Mobile Number');
      return false;
    }

    if (
      this.LandAllocateData.landReceivedByDesig === '' ||
      this.LandAllocateData.landReceivedByDesig === null ||
      this.LandAllocateData.landReceivedByDesig === undefined
    ) {
      this.toast.warning('Please Enter Possession Taken By Designation');
      return false;
    }

    if (
      this.LandAllocateData.handOverByName === '' ||
      this.LandAllocateData.handOverByName === null ||
      this.LandAllocateData.handOverByName === undefined
    ) {
      this.toast.warning('Please Enter Possession Handover By Name ');
      return false;
    }

    if (
      this.LandAllocateData.handOverByMobileNo === '' ||
      this.LandAllocateData.handOverByMobileNo === null ||
      this.LandAllocateData.handOverByMobileNo === undefined
    ) {
      this.toast.warning('Please Enter Possession Handover Mobile Number');
      return false;
    }

    if (!this.utils.mobileNumCheck(this.LandAllocateData.handOverByMobileNo)) {
      this.toast.warning('Please Enter Valid Possession Taken Mobile Number');
      return false;
    }

    if (
      this.LandAllocateData.handOverByDesig === '' ||
      this.LandAllocateData.handOverByDesig === null ||
      this.LandAllocateData.handOverByDesig === undefined
    ) {
      this.toast.warning('Please Enter Possession Handover By Designation');
      return false;
    }

    if (
      this.LandAllocateData.positionStatementPdf === '' ||
      this.LandAllocateData.positionStatementPdf === null ||
      this.LandAllocateData.positionStatementPdf === undefined
    ) {
      this.toast.warning('Attach Copy Of Possession Statement (PDF)');
      return false;
    }

    return true;
  }

  async onPositionTakenChange(event): Promise<void> {
    try {
      const res: any = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (!this.utils.isEmpty(res)) {
        this.LandAllocateData.positionTakenImage = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onPositionStatementChange(event): Promise<void> {
    try {
      const res: any = await this.utils.encodedString(
        event,
        this.utils.fileType.PDF,
        this.utils.fileSize.oneMB
      );
      if (!this.utils.isEmpty(res)) {
        this.LandAllocateData.positionStatementPdf = res.replace(
          'data:application/pdf;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }
}
