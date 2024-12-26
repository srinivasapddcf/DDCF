import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { MastersService } from 'src/app/shared/services/masters.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { McuMappingService } from '../../services/mcu-mapping.service';

@Component({
  selector: 'app-edit-sec-asssec-details',
  templateUrl: './edit-sec-asssec-details.component.html',
  styleUrls: ['./edit-sec-asssec-details.component.css'],
})
export class EditSecAsssecDetailsComponent implements OnInit {
  @ViewChild('bankPassBookUpload') bankPassBookUpload: ElementRef;
  @ViewChild('sscMarksMemoUpload') sscMarksMemoUpload: ElementRef;
  minDate: Date;
  maxDate: Date;
  rbkList = [];
  villageList = [];
  qualificationList = [];
  maritalStatusList = [];
  secList: any;
  secretaryDetails = {
    uidNum: '',
    rbkId: '',
    districtId: '',
    mandalId: '',
    mentorId: '',
    villageId: '',
    designation: '',
    name: '',
    gender: '',
    maritalStatus: '',
    dob: '',
    mobileNumber: '',
    bankAcNo: '',
    bankIFSCCode: '',
    qualification: '',
    passBookImg: '',
    marksMemo: '',
    insertedBy: '',
    source: '',
    updatedBy: '',
  };
  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private mcuAPI: McuMappingService,
    private utils: UtilsService,
    private logger: LoggerService,
    private session: SessionService,
    private master: MastersService
  ) {
    this.minDate = this.session.getDOBMinDate();
    this.maxDate = this.session.getDOBMaxDate();
  }

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ""){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    this.maritalStatusList = this.master.maritalStatusList;
    this.loadRBKList();
  }

  async loadRBKList(): Promise<void> {
    try {
      this.spinner.show();
      const req = {
        uniqueId: this.session.rbkGroupId,
      };
      const res = await this.mcuAPI.rbkList(req);
      if (res.success) {
        this.rbkList = res.result;
        this.spinner.hide();
        this.loadQualificationList();
      } else {
        this.spinner.hide();
        this.toast.info(res.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async loadQualificationList(): Promise<void> {
    try {
      this.spinner.show();
      const res = await this.mcuAPI.qualificationsList();
      if (res.success) {
        this.qualificationList = res.result;
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
    if (this.secretaryDetails.rbkId === '') {
      return;
    }
    this.secretaryDetails.designation = '';
  }

  onDesignationChange(): void {
    this.villageList = [];
    if (this.secretaryDetails.rbkId === '') {
      return;
    }
    if (this.secretaryDetails.designation === '') {
      return;
    }
    this.loadVillageList();
  }

  async loadVillageList(): Promise<void> {
    try {
      this.spinner.show();
      const req = {
        districtId: this.secretaryDetails.designation,
        rbkId: this.secretaryDetails.rbkId,
        uniqueId: this.session.rbkGroupId,
      };
      const res = await this.mcuAPI.villageListByRbkDesigId(req);
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

  async onVillageChange(): Promise<void> {
    try {
      this.secList = '';
      this.spinner.show();
      const req = {
        rbkId: this.secretaryDetails.rbkId,
        villageId: this.secretaryDetails.villageId,
        designation: this.secretaryDetails.designation,
      };
      const res = await this.mcuAPI.secretaryCreationDetailsById(req);
      if (res.success) {
        this.secList = res.result[0];
        this.secretaryDetails.name = this.secList.NAME;
        this.secretaryDetails.uidNum = this.secList.UID_NUM;
        this.secretaryDetails.maritalStatus = this.secList.MARITAL_STATUS;
        this.secretaryDetails.mobileNumber = this.secList.MOBILE_NO;
        this.secretaryDetails.bankAcNo = this.secList.BANK_AC_NO;
        this.secretaryDetails.bankIFSCCode = this.secList.IFSC_CODE;
        this.secretaryDetails.qualification = this.secList.QUALIFICATION;
        this.secretaryDetails.passBookImg = await this.getBaseFile(
          this.secList.PASS_BOOK_IMG
        );
        this.secretaryDetails.marksMemo = await this.getBaseFile(
          this.secList.MARKS_MEMO10TH_IMG
        );
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
  btnImage(image): void {
    if (!this.utils.isEmpty(image)) {
      this.utils.viewImage(image);
    } else {
      this.toast.warning('Image is Not Available');
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

  async btnSubmit(): Promise<void> {
    try {
      if (this.validate()) {
        this.secretaryDetails.mentorId = this.session.rbkGroupId;
        this.secretaryDetails.districtId = this.session.districtId;
        this.secretaryDetails.mandalId = this.session.mandalId;
        this.secretaryDetails.updatedBy = this.session.userName;
        this.secretaryDetails.source = 'web';
        this.spinner.show();
        const response = await this.mcuAPI.secretaryCreationUpdate(
          this.secretaryDetails
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
      this.secretaryDetails.rbkId === '' ||
      this.secretaryDetails.rbkId === null ||
      this.secretaryDetails.rbkId === undefined
    ) {
      this.toast.warning('Please Select RSK');
      return false;
    }

    if (
      this.secretaryDetails.villageId === '' ||
      this.secretaryDetails.villageId === null ||
      this.secretaryDetails.villageId === undefined
    ) {
      this.toast.warning('Please Select Village');
      return false;
    }

    if (
      this.secretaryDetails.designation === '' ||
      this.secretaryDetails.designation === null ||
      this.secretaryDetails.designation === undefined
    ) {
      this.toast.warning('Please Select Designation');
      return false;
    }

    if (
      this.secretaryDetails.name === '' ||
      this.secretaryDetails.name === null ||
      this.secretaryDetails.name === undefined
    ) {
      this.toast.warning('Please Enter Name');
      return false;
    }

    if (
      this.secretaryDetails.uidNum === '' ||
      this.secretaryDetails.uidNum === null ||
      this.secretaryDetails.uidNum === undefined
    ) {
      this.toast.warning('Please Enter Aadhaar Number');
      return false;
    }

    if (!this.utils.validateVerhoeff(this.secretaryDetails.uidNum)) {
      this.toast.warning('Please Enter Valid Aadhaar Number');
      return false;
    }

    if (
      this.secretaryDetails.dob === '' ||
      this.secretaryDetails.dob === null ||
      this.secretaryDetails.dob === undefined
    ) {
      this.toast.warning('Please Select Date Of Birth');
      return false;
    }

    if (
      this.secretaryDetails.maritalStatus === '' ||
      this.secretaryDetails.maritalStatus === null ||
      this.secretaryDetails.maritalStatus === undefined
    ) {
      this.toast.warning('Please Select Marital Status');
      return false;
    }

    if (
      this.secretaryDetails.mobileNumber === '' ||
      this.secretaryDetails.mobileNumber === null ||
      this.secretaryDetails.mobileNumber === undefined
    ) {
      this.toast.warning('Please Enter Mobile Number');
      return false;
    }

    if (!this.utils.mobileNumCheck(this.secretaryDetails.mobileNumber)) {
      this.toast.warning('Please Enter Valid Mobile Number');
      return false;
    }

    if (
      this.secretaryDetails.bankAcNo === '' ||
      this.secretaryDetails.bankAcNo === null ||
      this.secretaryDetails.bankAcNo === undefined
    ) {
      this.toast.warning('Please Enter Bank Account Number');
      return false;
    }

    if (
      this.secretaryDetails.bankIFSCCode === '' ||
      this.secretaryDetails.bankIFSCCode === null ||
      this.secretaryDetails.bankIFSCCode === undefined
    ) {
      this.toast.warning('Please Enter Bank IFSC Code');
      return false;
    }

    if (
      this.secretaryDetails.qualification === '' ||
      this.secretaryDetails.qualification === null ||
      this.secretaryDetails.qualification === undefined
    ) {
      this.toast.warning('Please Select Qualification');
      return false;
    }

    if (
      this.secretaryDetails.passBookImg === '' ||
      this.secretaryDetails.passBookImg === null ||
      this.secretaryDetails.passBookImg === undefined
    ) {
      this.toast.warning('Please Upload Bank PassBook Front Page Photo ');
      return false;
    }
    if (
      this.secretaryDetails.marksMemo === '' ||
      this.secretaryDetails.marksMemo === null ||
      this.secretaryDetails.marksMemo === undefined
    ) {
      this.toast.warning('Please Upload SSC Marks Memo');
      return false;
    }

    return true;
  }

  async onBankPassBookChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.twoHundredKB
      );
      if (res) {
        this.secretaryDetails.passBookImg = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onSSCMarksMemoChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.twoHundredKB
      );
      if (res) {
        this.secretaryDetails.marksMemo = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }
}
