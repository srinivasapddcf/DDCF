import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { JcService } from 'src/app/jcModule/services/jc.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-pacs-land-hand-over',
  templateUrl: './pacs-land-hand-over.component.html',
  styleUrls: ['./pacs-land-hand-over.component.css'],
})
export class PacsLandHandOverComponent implements OnInit {
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
    pacsCode: '',
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
    pacsName: '',
    signatureUrl: '',
  };

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private jcAPI: JcService,
    private utils: UtilsService,
    private session: SessionService,
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
    this.LandAllocateData.pacsCode = decString.pacsCode ?? '';

    if (this.LandAllocateData.districtId === '') {
      this.router.navigate(['/jcModule/PacsLandAllocation']);
    } else if (this.LandAllocateData.mandalId === '') {
      this.router.navigate(['/jcModule/PacsLandAllocation']);
    } else if (this.LandAllocateData.rbkId === '') {
      this.router.navigate(['/jcModule/PacsLandAllocation']);
    } else if (this.LandAllocateData.villageId === '') {
      this.router.navigate(['/jcModule/PacsLandAllocation']);
    }

    this.loadPossessionTaken();
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
      const response = await this.jcAPI.pacsPossessionTakenDetails(req);
      this.spinner.hide();
      if (response.success) {
        this.LandAllocateData.landReceivedByName = response.result[0].NAME;
        this.LandAllocateData.landReceivedMobileNo = response.result[0].MOBILE;
        this.LandAllocateData.landReceivedByDesig =
          response.result[0].DESIGNATION;
        this.landPossessionStatement.districtName =
          response.result[0].DISTRICT_NAME;
        this.landPossessionStatement.districtId =
          this.LandAllocateData.districtId;
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
        this.landPossessionStatement.acres =
          response.result[0].AREA.toString().split('.')[0];
        this.landPossessionStatement.cents =
          response.result[0].AREA.toString().split('.')[1] ?? '0';
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
        this.landPossessionStatement.pacsName = response.result[0].PACS_NAME;
        this.landPossessionStatement.signatureUrl =
          response.result[0].SIGNATURE_PATH;
      } else {
        this.toast.info(response.message);
      }
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
      if (this.utils.isEmpty(this.LandAllocateData.handOverByName)) {
        this.toast.warning('Please Enter Possession Handover By Name ');
        return;
      }

      if (this.utils.isEmpty(this.LandAllocateData.handOverByMobileNo)) {
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

      if (this.utils.isEmpty(this.LandAllocateData.handOverByDesig)) {
        this.toast.warning('Please Enter Possession Handover By Designation');
        return;
      }

      this.landPossessionStatement.handedOverByName =
        this.LandAllocateData.handOverByName;
      this.landPossessionStatement.handedOverByDesig =
        this.LandAllocateData.handOverByDesig;
      this.landPossessionStatement.handedOverByMobileNo =
        this.LandAllocateData.handOverByMobileNo;

      this.possessionHandOverPopUp = false;
      this.spinner.show();
      const response = await this.jcAPI.pacsPossessionCertificate(
        this.landPossessionStatement
      );
      this.spinner.hide();
      if (response.success) {
        this.utils.downloadPdfFile(response.result, 'PossessionStatement');
      } else {
        this.toast.info(response.message);
      }
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
        const response = await this.jcAPI.pacsLandHandOverSub(
          this.LandAllocateData
        );
        if (response.success) {
          alert(response.message);
          this.router.navigate(['/jcModule/PacsLandAllocation']);
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
    if (this.utils.isEmpty(this.LandAllocateData.rbkId)) {
      this.toast.warning('Please Select Hand Over RSK');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.handOverDate)) {
      this.toast.warning('Please Select Hand Over Date');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.positionTakenDate)) {
      this.toast.warning('Please Select Possession Taken Date ');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.landReceivedByName)) {
      this.toast.warning('Please Enter Possession Taken By Name');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.landReceivedMobileNo)) {
      this.toast.warning('Please Enter Possession Taken By Mobile Number');
      return false;
    }

    if (
      !this.utils.mobileNumCheck(this.LandAllocateData.landReceivedMobileNo)
    ) {
      this.toast.warning('Please Enter Valid Possession Taken Mobile Number');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.landReceivedByDesig)) {
      this.toast.warning('Please Enter Possession Taken By Designation');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.handOverByName)) {
      this.toast.warning('Please Enter Possession Handover By Name ');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.handOverByMobileNo)) {
      this.toast.warning('Please Enter Possession Handover Mobile Number');
      return false;
    }

    if (!this.utils.mobileNumCheck(this.LandAllocateData.handOverByMobileNo)) {
      this.toast.warning('Please Enter Valid Possession Taken Mobile Number');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.handOverByDesig)) {
      this.toast.warning('Please Enter Possession Handover By Designation');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.positionStatementPdf)) {
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
