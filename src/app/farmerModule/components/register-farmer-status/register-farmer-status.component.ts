import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { Z_BLOCK } from 'zlib';
import { FarmerService } from '../../services/farmer.service';

@Component({
  selector: 'app-register-farmer-status',
  templateUrl: './register-farmer-status.component.html',
  styleUrls: ['./register-farmer-status.component.css'],
})
export class RegisterFarmerStatusComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();

  @ViewChild('passBookImgUpload') passBookImgUpload: ElementRef;
  @ViewChild('kisanCardImgUpload') kisanCardImgUpload: ElementRef;
  @Output() onBankAccUpdate = new EventEmitter<string>();

  monthlypouringReportPopUp = false;
  inputPlaceHolder = 'Please Enter Farmer Aadhaar Number';
  BankPassBookPopUp = false;
  mobileNumberPopUp = false;
  kisanCreditCardPopUp = false;
  uidNum = '';frmNum='';
  inputRadio = '1';
  monthlypouringDetails = [];
  excelData = [];
  personDetails = {
    ACCOUNT_NUMBER: '',
    BANKACCNO_UPD: '',
    BANK_BRANCH: '',
    BANK_NAME: '',
    BANK_PINCODE: '',
    DISTRICT: '',
    DIST_CODE: '',
    FARMER_CODE: '',
    FARMER_NAME: '',
    IFSC_CODE: '',
    MANDAL_CODE: '',
    MANDAL_NAME: '',
    MICR_CODE: '',
    MOBILE_NUMBER: '',
    TOTAL_TIMES_UPDATED: '',
    PAN_CARD: '',
    PASSBOOK_IMG: null,
    NO_OF_MILCH_ANIMALS: '',
    RBK_CODE: '',
    RBK_NAME: '',
    UID_NUM: '',
    VILLAGE_CODE: '',
    VILLAGE_NAME: '',
    FARMER_KISSANCARD: null,
    SOCIETY_CODE: '',
    SOCIETY_NAME: ''
  };
  bankImage = '';
  passBookImg = '';
  kisanCreditCardImg = '';
  reportTotals = {
    S_NO: '-',
    YEAR_VALUE: 'TOTAL',
    MONTH_DISPLAY: '-',
    NO_OF_DAYS_POURED: 0,
    TOTAL_COW_MILK_LTR: 0,
    TOTAL_BUFFALO_MILK_LTR: 0,
    AVG_SNF: '-',
    AVG_FAT: '-',
    TOTAL_AMOUNT: 0,
  };
  role = '';
  mobileNum = '';

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private farmerAPI: FarmerService,
    private utils: UtilsService,
    private sanitizer: DomSanitizer,
    private logger: LoggerService,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    document.getElementById('uidNum').style.display='block';
    document.getElementById('frmNum').style.display='none';
    if(this.session.uniqueId !="" && this.session.desigId != ''){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    if(this.session.uniqueId !="" && this.session.desigId != ""){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    this.role = this.session.desigId;
  }

  onSelectionChange() {
    if (this.inputRadio === '1') {
      this.inputPlaceHolder = 'Please Enter Farmer Aadhaar Number';
      this.clearInputs();
      document.getElementById('uidNum').style.display='block';
      document.getElementById('frmNum').style.display='none';
     
    } else if (this.inputRadio === '2') {
      this.clearInputs();
      document.getElementById('uidNum').style.display='none';
      document.getElementById('frmNum').style.display='block';
      this.inputPlaceHolder = 'Please Enter Farmer Code';
       
    } else {
      this.clearInputs();
      document.getElementById('frmNum').style.display='block';
      document.getElementById('uidNum').style.display='none';
      this.inputPlaceHolder = 'Please Enter Farmer Bank Account Number';
       
    }
  }

  clearInputs() {
    this.uidNum = '';this.frmNum='';
    this.personDetails = {
      ACCOUNT_NUMBER: '',
      BANKACCNO_UPD: '',
      BANK_BRANCH: '',
      BANK_NAME: '',
      BANK_PINCODE: '',
      DISTRICT: '',
      DIST_CODE: '',
      FARMER_CODE: '',
      FARMER_NAME: '',
      IFSC_CODE: '',
      MANDAL_CODE: '',
      MANDAL_NAME: '',
      MICR_CODE: '',
      MOBILE_NUMBER: '',
      TOTAL_TIMES_UPDATED: '',
      PAN_CARD: '',
      PASSBOOK_IMG: null,
      NO_OF_MILCH_ANIMALS: '',
      RBK_CODE: '',
      RBK_NAME: '',
      UID_NUM: '',
      VILLAGE_CODE: '',
      VILLAGE_NAME: '',
      FARMER_KISSANCARD: null,
      SOCIETY_CODE: '',
      SOCIETY_NAME:''
    };
  }

  async btnUidDetails(): Promise<void> {
    try {
      this.personDetails = {
        ACCOUNT_NUMBER: '',
        BANKACCNO_UPD: '',
        BANK_BRANCH: '',
        BANK_NAME: '',
        BANK_PINCODE: '',
        DISTRICT: '',
        DIST_CODE: '',
        FARMER_CODE: '',
        FARMER_NAME: '',
        IFSC_CODE: '',
        MANDAL_CODE: '',
        MANDAL_NAME: '',
        MICR_CODE: '',
        MOBILE_NUMBER: '',
        TOTAL_TIMES_UPDATED: '',
        PAN_CARD: '',
        PASSBOOK_IMG: null,
        NO_OF_MILCH_ANIMALS: '',
        RBK_CODE: '',
        RBK_NAME: '',
        UID_NUM: '',
        VILLAGE_CODE: '',
        VILLAGE_NAME: '',
        FARMER_KISSANCARD: null,
        SOCIETY_CODE: '',
        SOCIETY_NAME: ''
      };

      if (
        this.inputRadio === null ||
        this.inputRadio === undefined ||
        this.inputRadio === ''
      ) {
        this.toast.warning(
          'Please Select Aadhaar Number / Farmer Code / Bank Account No'
        );
        return;
      }

      if (this.inputRadio === '1') {
        if (
          this.uidNum === null ||
          this.uidNum === undefined ||
          this.uidNum === ''
        ) {
          this.toast.warning('Please Enter Farmer Aadhar Number');
          return;
        }
        if (!this.utils.validateVerhoeff(this.uidNum)) {
          this.toast.warning('Please Enter Valid Aadhaar Number');
          return;
        }
      }

      if (this.inputRadio === '2') {
        if (
          this.frmNum === null ||
          this.frmNum === undefined ||
          this.frmNum === ''
        ) {
          this.toast.warning('Please Enter Farmer Code');
          return;
        } else this.uidNum=this.frmNum;
        if (this.frmNum.length !== 8) {
          this.toast.warning('Please Enter Valid Farmer Code');
          return;
        } else this.uidNum=this.frmNum;
      }

      if (this.inputRadio === '3') { 
        if (
          this.frmNum === null ||
          this.frmNum === undefined ||
          this.frmNum === ''
        ) {
          this.toast.warning('Please Enter Bank Account No');
          return;
        }else this.uidNum=this.frmNum;
      }
debugger;
      const req = {
        accountNo: this.uidNum,
      };
      this.spinner.show();
      const response = await this.farmerAPI.regFarmerDetailsByUid(req);
      if (response.success) {
        this.personDetails = response.result[0];

        // if (!this.utils.isEmpty(this.personDetails.PASSBOOK_IMG)) {
        //   this.passBookImg = await this.getBaseFile(
        //     this.personDetails.PASSBOOK_IMG
        //   );
        // }
        if (!this.utils.isEmpty(this.personDetails.PASSBOOK_IMG)) {
          this.passBookImg = await this.getjpvreportsMdacBaseFile(this.personDetails.PASSBOOK_IMG);
        } 
       else if (!this.utils.isEmpty(response.result[0].PASS_BOOK_IMG)) {
          this.personDetails.PASSBOOK_IMG = await this.getjpvreportsMdacBaseFile(response.result[0].PASS_BOOK_IMG);
          this.passBookImg = this.personDetails.PASSBOOK_IMG;
        }


        if (this.personDetails.FARMER_KISSANCARD !== 'NA') {
          this.kisanCreditCardImg = await this.getBaseFile(
            this.personDetails.FARMER_KISSANCARD
          );
        }

        if (this.personDetails.PASSBOOK_IMG === null) {
          this.BankPassBookPopUp = true;
        }
      } else {
        if (this.inputRadio === '1')  this.toast.info("No Details found with this Aadhar Number");
        else if (this.inputRadio === '2') this.toast.info("No Details found with this Farmer Number");
        else if (this.inputRadio === '3') this.toast.info("No Details found with this Bank Number");
        else this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async getjpvreportsMdacBaseFile(path): Promise<string> {
    try {
      if (!this.utils.isEmpty(path)) {
        this.spinner.show();
        const response = await this.utils.JPVReportsDMSFileDownload(path);
        this.spinner.hide();
        if (response.success) {
          return response.result;
        }
      }
      return '';
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async getBaseFile(path): Promise<string> {
    try {
      if (!this.utils.isEmpty(path)) {
        this.spinner.show();
        const response = await this.utils.DMSFileDownload(path);
        this.spinner.hide();
        if (response.success) {
          return response.result;
        }
      }
      return '';
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

  // btnBankAccUpdate(): void{
  //   const encryptedString = this.utils.encrypt(JSON.stringify(this.personDetails));
  //   this.router.navigate(['/farmer/FarmerBankAccountUpdate'], {
  //     queryParams: { request: encryptedString },
  //   });
  // }

  async onPassBookImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.passBookImg = res.replace('data:image/jpeg;base64,', '');
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async btnImageUpdate(): Promise<void> {
    try {
      if (
        this.passBookImg === null ||
        this.passBookImg === undefined ||
        this.passBookImg === ''
      ) {
        this.toast.warning('Please Upload Bank PassBook Image');
        return;
      }

      const req = {
        uidNum: this.personDetails.UID_NUM,
        passBookImg: this.passBookImg,
        insertedBy: this.session.userName,
        districtId: this.personDetails.DIST_CODE,
        mandalId: this.personDetails.MANDAL_CODE,
        rbkId: this.personDetails.RBK_CODE,
        villageId: this.personDetails.VILLAGE_CODE,
      };
      this.spinner.show();
      const response = await this.farmerAPI.farmerBankPassbookUpdate(req);
      if (response.success) {
        alert(response.message);
        window.location.reload();
      } else {
        this.spinner.hide();
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  btnMonthlyPouringDetails(): void {
    this.loadReport();
  }

  async loadReport(): Promise<void> {
    try {
      const req = {
        accountNo: this.uidNum,
      };
      this.spinner.show();
      const res = await this.farmerAPI.milkPouringStatusReport(req);
      this.spinner.hide();
      this.monthlypouringDetails = [];
      if (res.success) {
        this.excelData = [];
        this.monthlypouringDetails = res.result;
        console.log(this.monthlypouringDetails);
        for (let i = 0; i < this.monthlypouringDetails.length; i++) {
          // tslint:disable-next-line: radix
          this.reportTotals.NO_OF_DAYS_POURED += parseInt(
            this.monthlypouringDetails[i].NO_OF_DAYS_POURED
          );
          // tslint:disable-next-line: radix
          this.reportTotals.TOTAL_COW_MILK_LTR += parseFloat(
            this.monthlypouringDetails[i].TOTAL_COW_MILK_LTR
          );
          // tslint:disable-next-line: radix
          this.reportTotals.TOTAL_BUFFALO_MILK_LTR += parseFloat(
            this.monthlypouringDetails[i].TOTAL_BUFFALO_MILK_LTR
          );
          // tslint:disable-next-line: radix
          this.reportTotals.TOTAL_AMOUNT += parseFloat(
            this.monthlypouringDetails[i].TOTAL_AMOUNT
          );
          let singleRow = {
            S_NO: i + 1,
            YEAR_VALUE: this.monthlypouringDetails[i].YEAR_VALUE,
            MONTH_DISPLAY: this.monthlypouringDetails[i].MONTH_DISPLAY,
            NO_OF_DAYS_POURED: this.monthlypouringDetails[i].NO_OF_DAYS_POURED,
            TOTAL_COW_MILK_LTR:
              this.monthlypouringDetails[i].TOTAL_COW_MILK_LTR,
            TOTAL_BUFFALO_MILK_LTR:
              this.monthlypouringDetails[i].TOTAL_BUFFALO_MILK_LTR,
            AVG_SNF: this.monthlypouringDetails[i].AVG_SNF,
            AVG_FAT: this.monthlypouringDetails[i].AVG_FAT,
            TOTAL_AMOUNT: this.monthlypouringDetails[i].TOTAL_AMOUNT,
          };

          this.excelData.push(singleRow);
        }
        this.excelData.push(this.reportTotals);
      } else {
        this.toast.info(res.message);
      }
      this.monthlypouringReportPopUp = true;
      this.rerender();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  btnExcel(): void {
    this.utils.JSONToCSVConvertor(
      this.excelData,
      'Monthly Milk Pouring Report',
      true
    );
  }

  btnEditMobileNo(): void {
    this.mobileNumberPopUp = true;
  }

  async btnMobileNoUpdate(): Promise<void> {
    try {
      if (this.utils.isEmpty(this.mobileNum)) {
        this.toast.warning('Please Enter Mobile Number');
        return;
      }
      if (!this.utils.mobileNumCheck(this.mobileNum)) {
        this.toast.warning('Please Enter Valid Mobile Number');
        return;
      }

      const req = {
        uidNum: this.personDetails.UID_NUM,
        mobileNum: this.mobileNum,
        insertedBy: this.session.userName,
      };
      this.spinner.show();
      const response = await this.farmerAPI.farmerMobileNoUpdate(req);
      if (response.success) {
        alert(response.message);
        window.location.reload();
      } else {
        this.spinner.hide();
        this.toast.info(response.message);
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


  
  uidNummaskIputData(value) {
     
    if (value.length > 0) {
 
  
    if(value.length>=12){
     
      const response = this.utils.validateVerhoeff(value);    //this.uidNum
      if (response == true) {
        this.spinner.hide();
      } else {
        this.uidNum='';
               alert("Invalid Aadhar Number...!");
        this.spinner.hide();

      }
      return
    }

  }  

  return;
  
}
}
