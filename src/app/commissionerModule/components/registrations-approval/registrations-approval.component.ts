import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ServiceService } from '../../services/service.service';
import { promise } from 'protractor';
import { Router } from '@angular/router';
import { GmService } from 'src/app/gmModule/serice/gm.service';

@Component({
  selector: 'app-registrations-approval',
  templateUrl: './registrations-approval.component.html',
  styleUrls: ['./registrations-approval.component.css']
})
export class RegistrationsApprovalComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren(DataTableDirective)
  dtElements!: QueryList<DataTableDirective>;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
 
  dtTrigger: Subject<any> = new Subject();
  registrationapprovalsList = [];
  registrationapprovalsPDFList=[];
  filesList = [];
  updatedBy = '';
  displayStyle = "none";//FORM_A_PDF2='';
  FORM_A_PDF = '';
  FORM_A_PDF1 = '';
  RBK_CODE = '';
  MDSS_CODE = '';
  SWORN_STATEMENT_PDF = '';
  SWORN_STATEMENT_PDF1 = '';
  MASUDHA_FORM_PDF = '';
  MASUDHA_FORM_PDF1 = '';
  MEETING_PROCEDINGS_PDF = '';
  MEETING_PROCEDINGS_PDF1 = '';
  BANK_REMITTANCE_CERTI_PDF = '';
  BANK_REMITTANCE_CERTI_PDF1 = '';
  ECONOMIC_VIABILITY_REP_PDF = '';
  ECONOMIC_VIABILITY_REP_PDF1 = '';
  REQ_LETTER_ADHOCK_COM_PDF = '';
  REQ_LETTER_ADHOCK_COM_PDF1 = '';
  BYE_LAW_PDF = '';
  BYE_LAW_PDF1 = '';
  FESABILITY_REPORT_PDF = '';
  FESABILITY_REPORT_PDF1 = '';
  REGISTRATION_CERTIFICATE = '';
  PROCEDDINGS_ORDERS = '';
  PROCEDDINGS_ADHOCK = '';
  BYE_LAW_REGISTARION = '';

  REGISTRATION_CERTIFICATE1 = '';
  PROCEDDINGS_ORDERS1 = '';
  PROCEDDINGS_ADHOCK1 = '';
  BYE_LAW_REGISTARION1 = '';
  INSERTED_BY = '';
  RBKDISTMANDALCODES = '';
  str = '';
  rbkid;
  DIST_CODE = '';
  MANDAL_CODE = '';

  pRBK_CODE='';
  districtId='';
  mandalId='';
pMDSS_CODE='';
villageId='';
id='';
btnclapproveds=false;
  requestType = '';
  feedIndentList = [];
  headingText = '';
  constructor(private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private utils: UtilsService,
    private session: SessionService,
    private commAPI: ServiceService,
    private GMAPI: GmService,
    private router:Router) { }

  ngOnInit(): void { this.LoadData();
    if(this.session.uniqueId !="" && this.session.desigId != ""){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    document.getElementById('pdfdata').style.visibility = "hidden";
    this.dtTrigger.next();


  }

  async btnFeedIndentDashboardDetails(obj): Promise<void> {
    try {
      this.feedIndentList = [];
      this.requestType = obj;
      const req = {
        uniqueId: this.session.uniqueId,
      };

      // if (this.requestType === '0' && this.dashboardCounts.PENDING === '0') {
      //   return;
      // }
      // if (this.requestType === '1' && this.dashboardCounts.APPROVED === '0') {
      //   return;
      // }
      // if (this.requestType === '2' && this.dashboardCounts.REJECTED === '0') {
      //   return;
      // }

      this.spinner.show();
      let res: any;
      if (this.requestType === '0') { this.btnclapproveds=true;
        this.headingText = 'PENDING LIST';

        this.LoadData();
      }
      else if (this.requestType === '1') {
        this.headingText = 'APPROVED LIST';
        this.id='1';this.btnclapproveds=false;
        this.APPROVEDList(this.id);
        // this.Pdfhide();
        // document.getElementById('griddata').style.visibility = "hidden";
        // document.getElementById('pdfdata').style.visibility = "hidden";
      }

      this.spinner.hide();
      // if (res.success) {
      //   if (this.requestType !== '0') {
      //     this.feedIndentList = res.result;
      //   } else {
      //     this.feedIndentList = res.result.map((obj: any) => ({
      //       ...obj,
      //       STATUS: '0',
      //     }));
      //   }
      // } else {
      //   this.toast.info(res.message);
      // }
      this.rerender();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async LoadData(): Promise<void> {
    try {
      const req = { };
      this.Pdfhide();     
      this.spinner.show();
      const res = await this.commAPI.CommissionerFinalGet(req);
      this.registrationapprovalsList = [];
      document.getElementById('approvedgriddata').style.visibility = "hidden";
      document.getElementById('griddata').style.visibility = "hidden";
      document.getElementById('pdfdata').style.visibility = "hidden";
      if (res.success) {
        this.btnclapproveds=true;
        this.registrationapprovalsList = res.result;
        document.getElementById('griddata').style.visibility = "visible";
        document.getElementById('pdfdata').style.visibility = "hidden";

        //document.getElementById('approvedgriddata').style.visibility = "hidden"; 
        //  console.log(this.registrationapprovalsList);

        this.rerender();
        this.Pdfhide();
      } else {  this.btnclapproveds=false;
        this.toast.info(res.message);
      }

      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async APPROVEDList(id): Promise<void> {
    try {
      const req = {

      };
      document.getElementById('approvedgriddata').style.visibility = "hidden";
      document.getElementById('griddata').style.visibility = "hidden";
      this.Pdfhide();     
      this.spinner.show();
      const res = await this.commAPI.CommissionerApprovalpdfsGet(req);
      this.registrationapprovalsPDFList = [];
      this.requestType='1';
      this.id='1';
      if (res.success) {
        this.registrationapprovalsPDFList = res.result;
        document.getElementById('approvedgriddata').style.visibility = "visible";
        document.getElementById('griddata').style.visibility = "hidden";
        document.getElementById('pdfdata').style.visibility = "hidden";
  
        //  console.log(this.registrationapprovalsList);    

        this.rerender();
        this.Pdfhide();
      } else {
        this.toast.info(res.message);
      }

      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async Pdfhide(): Promise<void> {
    try {
      // document.getElementById('pdfdata').style.visibility = "visible";
      //document.getElementById('pdfdata').style.visibility = "hidden";
      document.getElementById('FORM_A').style.visibility = "hidden";
      document.getElementById('MASUDHA').style.visibility = "hidden";
      document.getElementById('BYE_LAW').style.visibility = "hidden";
      document.getElementById('FESABILITY').style.visibility = "hidden";
      document.getElementById('ADHOCK').style.visibility = "hidden";
      document.getElementById('ECONOMIC_VIABILITY').style.visibility = "hidden";
      document.getElementById('BANK_REMITTANCE_CERTI').style.visibility = "hidden";
      document.getElementById('MEETING_PROCEDINGS').style.visibility = "hidden";
      document.getElementById('SWORN_STATEMENT').style.visibility = "hidden";
      document.getElementById('REGISTRATION_CERTIFICATE').style.visibility = "hidden";
      document.getElementById('PROCEDDINGS_ORDERS').style.visibility = "hidden";
      document.getElementById('PROCEDDINGS_ADHOCK').style.visibility = "hidden";
      document.getElementById('BYE_LAW_REGISTARION').style.visibility = "hidden";
    }
    catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async SubmitData(): Promise<void> {

  }

  
  async ApprovedLoadFiles(RBK_CODE): Promise<void> {
    const req = {
      prbk: RBK_CODE

    };
    this.spinner.show(); 
      const res = await this.commAPI.CommissionerApprovalpdfsRbkidGet(req);
    if (res.success) {
      this.filesList = res.result;
      if (!this.utils.isEmpty(res.result[0]["RBK_CODE"])) { this.RBK_CODE = res.result[0]["RBK_CODE"]; }
      if (!this.utils.isEmpty(res.result[0]["MDSS_CODE"])) { this.MDSS_CODE = res.result[0]["MDSS_CODE"]; }


      if (!this.utils.isEmpty(res.result[0]["FORM_A_PDF"])) {
        document.getElementById('FORM_A').style.visibility = "visible";
        //FORM_A_PDF
        this.FORM_A_PDF = await this.getBaseFile(res.result[0]["FORM_A_PDF"]);
        this.FORM_A_PDF1 = this.FORM_A_PDF;
        // this.FORM_A_PDF = 'data:application/pdf;base64 ,' + this.FORM_A_PDF;
        // top.document.getElementById('ifrmFORM_A').setAttribute("src", this.FORM_A_PDF);
      }
      if (!this.utils.isEmpty(res.result[0]["MASUDHA_FORM_PDF"])) {
        document.getElementById('MASUDHA').style.visibility = "visible";
        //MASUDHA_FORM_PDF
        this.MASUDHA_FORM_PDF = await this.getBaseFile(res.result[0]["MASUDHA_FORM_PDF"]);
        this.MASUDHA_FORM_PDF1 = this.MASUDHA_FORM_PDF;
      }
      if (!this.utils.isEmpty(res.result[0]["BYE_LAW_PDF"])) {
        document.getElementById('BYE_LAW').style.visibility = "visible";
        //BYE_LAW_PDF
        this.BYE_LAW_PDF = await this.getBaseFile(res.result[0]["BYE_LAW_PDF"]);
        this.BYE_LAW_PDF1 = this.BYE_LAW_PDF;
      }
      if (!this.utils.isEmpty(res.result[0]["FESABILITY_REPORT_PDF"])) {
        document.getElementById('FESABILITY').style.visibility = "visible";
        //FESABILITY_REPORT_PDF
        this.FESABILITY_REPORT_PDF = await this.getBaseFile(res.result[0]["FESABILITY_REPORT_PDF"]);
        this.FESABILITY_REPORT_PDF1 = this.FESABILITY_REPORT_PDF;

      }
      if (!this.utils.isEmpty(res.result[0]["REQ_LETTER_ADHOCK_COM_PDF"])) {
        document.getElementById('ADHOCK').style.visibility = "visible";
        //REQ_LETTER_ADHOCK_COM_PDF
        this.REQ_LETTER_ADHOCK_COM_PDF = await this.getBaseFile(res.result[0]["REQ_LETTER_ADHOCK_COM_PDF"]);
        this.REQ_LETTER_ADHOCK_COM_PDF1 = this.REQ_LETTER_ADHOCK_COM_PDF;
      }
      if (!this.utils.isEmpty(res.result[0]["ECONOMIC_VIABILITY_REP_PDF"])) {
        document.getElementById('ECONOMIC_VIABILITY').style.visibility = "visible";
        //ECONOMIC_VIABILITY_REP_PDF
        this.ECONOMIC_VIABILITY_REP_PDF = await this.getBaseFile(res.result[0]["ECONOMIC_VIABILITY_REP_PDF"]);
        this.ECONOMIC_VIABILITY_REP_PDF1 = this.ECONOMIC_VIABILITY_REP_PDF;
      }
      if (!this.utils.isEmpty(res.result[0]["BANK_REMITTANCE_CERTI_PDF"])) {
        document.getElementById('BANK_REMITTANCE_CERTI').style.visibility = "visible";
        //BANK_REMITTANCE_CERTI_PDF
        this.BANK_REMITTANCE_CERTI_PDF = await this.getBaseFile(res.result[0]["BANK_REMITTANCE_CERTI_PDF"]);
        this.BANK_REMITTANCE_CERTI_PDF1 = this.BANK_REMITTANCE_CERTI_PDF;
      }
      if (!this.utils.isEmpty(res.result[0]["MEETING_PROCEDINGS_PDF"])) {
        document.getElementById('MEETING_PROCEDINGS').style.visibility = "visible";
        //MEETING_PROCEDINGS_PDF
        this.MEETING_PROCEDINGS_PDF = await this.getBaseFile(res.result[0]["MEETING_PROCEDINGS_PDF"]);
        this.MEETING_PROCEDINGS_PDF1 = this.MEETING_PROCEDINGS_PDF;
      }
      if (!this.utils.isEmpty(res.result[0]["SWORN_STATEMENT_PDF"])) {
        document.getElementById('SWORN_STATEMENT').style.visibility = "visible";
        //document.getElementById('SWORN_STATEMENT').style.backgroundColor="Red";
        //SWORN_STATEMENT_PDF
        this.SWORN_STATEMENT_PDF = await this.getBaseFile(res.result[0]["SWORN_STATEMENT_PDF"]);
        this.SWORN_STATEMENT_PDF1 = this.SWORN_STATEMENT_PDF;
      }

      this.commRegistrationCertificate(RBK_CODE);
      this.commPROCEDDINGS_ORDERS(RBK_CODE);
      this.commPROCEDDINGS_ADHOCK(RBK_CODE);
      this.commBYE_LAW_REGISTARION(RBK_CODE);

      //LOG
      this.displayStyle = "block";
    } else {
      this.displayStyle = "none";
      this.toast.info(res.message);
    }
    this.spinner.hide();
  }
  async LoadFiles(RBK_CODE): Promise<void> {
    const req = {
      prbk: RBK_CODE

    };
    this.spinner.show();
      
      const res = await this.commAPI.CommissionerLoadpdfsGet(req);  
      
       
    if (res.success) {


      this.filesList = res.result;
      if (!this.utils.isEmpty(res.result[0]["RBK_CODE"])) { this.RBK_CODE = res.result[0]["RBK_CODE"]; }
      if (!this.utils.isEmpty(res.result[0]["MDSS_CODE"])) { this.MDSS_CODE = res.result[0]["MDSS_CODE"]; }


      if (!this.utils.isEmpty(res.result[0]["FORM_A_PDF"])) {
        document.getElementById('FORM_A').style.visibility = "visible";
        //FORM_A_PDF
        this.FORM_A_PDF = res.result[0]["FORM_A_PDF"];//await this.getBaseFile(res.result[0]["FORM_A_PDF"]);
        this.FORM_A_PDF1 = this.FORM_A_PDF;
       // this.FORM_A_PDF2=res.result[0]["FORM_A_PDF"]; 
        // this.FORM_A_PDF = 'data:application/pdf;base64 ,' + this.FORM_A_PDF;
        // top.document.getElementById('ifrmFORM_A').setAttribute("src", this.FORM_A_PDF);
      }
      if (!this.utils.isEmpty(res.result[0]["MASUDHA_FORM_PDF"])) {
        document.getElementById('MASUDHA').style.visibility = "visible";
        //MASUDHA_FORM_PDF
        this.MASUDHA_FORM_PDF =res.result[0]["MASUDHA_FORM_PDF"];// await this.getBaseFile(res.result[0]["MASUDHA_FORM_PDF"]);
        this.MASUDHA_FORM_PDF1 = this.MASUDHA_FORM_PDF;
      }
      if (!this.utils.isEmpty(res.result[0]["BYE_LAW_PDF"])) {
        document.getElementById('BYE_LAW').style.visibility = "visible";
        //BYE_LAW_PDF
        this.BYE_LAW_PDF = res.result[0]["BYE_LAW_PDF"];//await this.getBaseFile(res.result[0]["BYE_LAW_PDF"]);
        this.BYE_LAW_PDF1 = this.BYE_LAW_PDF;
      }
      if (!this.utils.isEmpty(res.result[0]["FESABILITY_REPORT_PDF"])) {
        document.getElementById('FESABILITY').style.visibility = "visible";
        //FESABILITY_REPORT_PDF
        this.FESABILITY_REPORT_PDF =res.result[0]["FESABILITY_REPORT_PDF"];// await this.getBaseFile(res.result[0]["FESABILITY_REPORT_PDF"]);
        this.FESABILITY_REPORT_PDF1 = this.FESABILITY_REPORT_PDF;

      }
      if (!this.utils.isEmpty(res.result[0]["REQ_LETTER_ADHOCK_COM_PDF"])) {
        document.getElementById('ADHOCK').style.visibility = "visible";
        //REQ_LETTER_ADHOCK_COM_PDF
        this.REQ_LETTER_ADHOCK_COM_PDF =res.result[0]["REQ_LETTER_ADHOCK_COM_PDF"];// await this.getBaseFile(res.result[0]["REQ_LETTER_ADHOCK_COM_PDF"]);
        this.REQ_LETTER_ADHOCK_COM_PDF1 = this.REQ_LETTER_ADHOCK_COM_PDF;
      }
      if (!this.utils.isEmpty(res.result[0]["ECONOMIC_VIABILITY_REP_PDF"])) {
        document.getElementById('ECONOMIC_VIABILITY').style.visibility = "visible";
        //ECONOMIC_VIABILITY_REP_PDF
        this.ECONOMIC_VIABILITY_REP_PDF = res.result[0]["ECONOMIC_VIABILITY_REP_PDF"];//await this.getBaseFile(res.result[0]["ECONOMIC_VIABILITY_REP_PDF"]);
        this.ECONOMIC_VIABILITY_REP_PDF1 = this.ECONOMIC_VIABILITY_REP_PDF;
      }
      if (!this.utils.isEmpty(res.result[0]["BANK_REMITTANCE_CERTI_PDF"])) {
        document.getElementById('BANK_REMITTANCE_CERTI').style.visibility = "visible";
        //BANK_REMITTANCE_CERTI_PDF
        this.BANK_REMITTANCE_CERTI_PDF = res.result[0]["BANK_REMITTANCE_CERTI_PDF"];//await this.getBaseFile(res.result[0]["BANK_REMITTANCE_CERTI_PDF"]);
        this.BANK_REMITTANCE_CERTI_PDF1 = this.BANK_REMITTANCE_CERTI_PDF;
      }
      if (!this.utils.isEmpty(res.result[0]["MEETING_PROCEDINGS_PDF"])) {
        document.getElementById('MEETING_PROCEDINGS').style.visibility = "visible";
        //MEETING_PROCEDINGS_PDF
        this.MEETING_PROCEDINGS_PDF =res.result[0]["MEETING_PROCEDINGS_PDF"];// await this.getBaseFile(res.result[0]["MEETING_PROCEDINGS_PDF"]);
        this.MEETING_PROCEDINGS_PDF1 = this.MEETING_PROCEDINGS_PDF;
      }
      if (!this.utils.isEmpty(res.result[0]["SWORN_STATEMENT_PDF"])) {
        document.getElementById('SWORN_STATEMENT').style.visibility = "visible";
        //document.getElementById('SWORN_STATEMENT').style.backgroundColor="Red";
        //SWORN_STATEMENT_PDF
        this.SWORN_STATEMENT_PDF = res.result[0]["SWORN_STATEMENT_PDF"];//await this.getBaseFile(res.result[0]["SWORN_STATEMENT_PDF"]);
        this.SWORN_STATEMENT_PDF1 = this.SWORN_STATEMENT_PDF;
      }

      this.commRegistrationCertificate(RBK_CODE);
      this.commPROCEDDINGS_ORDERS(RBK_CODE);
      this.commPROCEDDINGS_ADHOCK(RBK_CODE);
      this.commBYE_LAW_REGISTARION(RBK_CODE);

      //LOG
      this.displayStyle = "block";
    } else {
      this.displayStyle = "none";
      this.toast.info(res.message);
    }
    this.spinner.hide();
  }

  btnDocumentDownloadpdf(url):  void  {
    if (this.utils.isEmpty(url)) {
      this.toast.warning('Document Not Found !!!');
    } else { 
      window.open(url, '_blank');
    }
  }
  async btnviewPdf(pdf): Promise<void> {
    try {
      this.btnDocumentDownloadpdf(this.utils.mdssUrl() +pdf);
   
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  btnPdf(pdf): void {
    if (!this.utils.isEmpty(pdf)) {
      this.utils.viewPDF(pdf);
    } else {
      this.toast.warning('PDF is Not Available');
    }
  }

  async getBaseFile(path): Promise<string> {
    try {
      if (!this.utils.isEmpty(path)) {
        const response = await this.utils.MDSSFileDownload(path);
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



  btnAllPdf(RBKDISTMANDALCODES): void {
    document.getElementById('pdfdata').style.visibility = "visible";
    //this.Pdfhide();
    var str = RBKDISTMANDALCODES.split(',');
    this.rbkid = str[0];
    this.DIST_CODE = str[1];
    this.MANDAL_CODE = str[2];
    var RBK_CODE = this.rbkid;
    if (!this.utils.isEmpty(RBK_CODE)) {
      if(this.id='0')
      this.LoadFiles(RBK_CODE);
      else if(this.id='1')
     this.ApprovedLoadFiles(RBK_CODE);
     
    } else {
      this.toast.warning('Data Not Available');
    }
  }
  btnAllapprovedPdf(RBKDISTMANDALCODES): void {
    document.getElementById('pdfdata').style.visibility = "visible";
    //this.Pdfhide();
    var str = RBKDISTMANDALCODES.split(',');
    this.rbkid = str[0];
    this.DIST_CODE = str[1];
    this.MANDAL_CODE = str[2];
    var RBK_CODE = this.rbkid;
    if (!this.utils.isEmpty(RBK_CODE)) {      
     this.ApprovedLoadFiles(RBK_CODE);
     
    } else {
      this.toast.warning('Data Not Available');
    }
  }

  
  async commRegistrationCertificate(RBK_CODE): Promise<void> {
    try {
      const req = {
        rbkId: this.RBK_CODE, 
       // pdistCode :this.RBK_CODE,
        //pdistCode: this.session.districtId,
      };
      this.spinner.show();
      const response = await this.commAPI.RegCertificate(req);//Apcertregonlycomm
      this.spinner.hide();
      if (response.success) {
        document.getElementById('REGISTRATION_CERTIFICATE').style.visibility = "visible";
        this.REGISTRATION_CERTIFICATE = response.result;
        this.REGISTRATION_CERTIFICATE1 = this.REGISTRATION_CERTIFICATE;
          // this.REGISTRATION_CERTIFICATE = 'data:application/pdf;base64 ,' + this.REGISTRATION_CERTIFICATE;
          // top.document.getElementById('ifrmREGISTRATION_CERTIFICATE').setAttribute("src", this.REGISTRATION_CERTIFICATE);
      }
    } catch (error) {
      document.getElementById('REGISTRATION_CERTIFICATE').style.visibility = "hidden";
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async commPROCEDDINGS_ORDERS(RBK_CODE): Promise<void> {
    try {
      const req = {
        rbkId: this.RBK_CODE,
        pdistCode :this.RBK_CODE,
      };
      this.spinner.show();
      const response = await this.commAPI.Proceedingsonlycomm(req);
      this.spinner.hide();
      if (response.success) {
        document.getElementById('PROCEDDINGS_ORDERS').style.visibility = "visible";
        this.PROCEDDINGS_ORDERS = response.result;
        this.PROCEDDINGS_ORDERS1 = this.PROCEDDINGS_ORDERS;
        // this.PROCEDDINGS_ORDERS = 'data:application/pdf;base64 ,' + this.PROCEDDINGS_ORDERS;
        // top.document.getElementById('ifrmPROCEDDINGS_ORDERS').setAttribute("src", this.PROCEDDINGS_ORDERS);

      }
    } catch (error) {
      document.getElementById('PROCEDDINGS_ORDERS').style.visibility = "hidden";
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async commPROCEDDINGS_ADHOCK(RBK_CODE): Promise<void> {
    try {
      const req = {
        rbkId: this.RBK_CODE,
        pdistCode :this.RBK_CODE,
      };
      this.spinner.show();
      const response = await this.commAPI.Proceedings(req);
      this.spinner.hide();
      if (response.success) {
        document.getElementById('PROCEDDINGS_ADHOCK').style.visibility = "visible";
        this.PROCEDDINGS_ADHOCK = response.result;
        this.PROCEDDINGS_ADHOCK1 = this.PROCEDDINGS_ADHOCK;
        // this.PROCEDDINGS_ADHOCK = 'data:application/pdf;base64 ,' + this.PROCEDDINGS_ADHOCK;
        // top.document.getElementById('ifrmPROCEDDINGS_ADHOCK').setAttribute("src", this.PROCEDDINGS_ADHOCK);

      }
    } catch (error) {
      document.getElementById('PROCEDDINGS_ADHOCK').style.visibility = "hidden";
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async commBYE_LAW_REGISTARION(RBK_CODE): Promise<void> {
    try {
      const req = {
        rbkId: this.RBK_CODE,
        pdistCode :this.RBK_CODE,
      };
      this.spinner.show();
      const response = await this.commAPI.Bylawonlycomm(req);
      this.spinner.hide();
      if (response.success) {
        document.getElementById('BYE_LAW_REGISTARION').style.visibility = "visible";
        this.BYE_LAW_REGISTARION = response.result;
        this.BYE_LAW_REGISTARION1 = this.BYE_LAW_REGISTARION;
        // this.BYE_LAW_REGISTARION = 'data:application/pdf;base64 ,' + this.BYE_LAW_REGISTARION;
        // top.document.getElementById('ifrmBYE_LAW_REGISTARION').setAttribute("src", this.BYE_LAW_REGISTARION);

      }
    } catch (error) {
      document.getElementById('BYE_LAW_REGISTARION').style.visibility = "hidden";
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  closePopup() {
    this.displayStyle = "none";
    //document.getElementById('griddata').style.visibility = "visible";
    document.getElementById('pdfdata').style.visibility = "hidden";
    this.Pdfhide();
  }


  async submitClick(): Promise<void> {
    if(!this.rbkid){
      this.toast.warning('Please Select RSK');
      return;
    }
    try {
      const req = {
        
        prbkCode:  this.rbkid,
        pmdssCode :this.MANDAL_CODE,
        pdivisionCode :this.session.divisionId,
        pdistCode :this.session.districtId,
      //  QasAns: this.answrdcheckList,
        pgmUpdatedBy :this.session.userName
      };

      this.spinner.show();
      const res = await this.GMAPI.gmcheckListSub(req);
      this.spinner.hide();
      if (res.success) {
        this.toast.info(res.message);
        window.location.reload();
      } else {
        this.toast.info(res.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


  async Approved() {      

    try {
//this.submitClick();
      const req = {
        pRBK_CODE: this.rbkid,
        districtId: this.DIST_CODE,
        pdistCode :this.rbkid,
        mandalId: this.MANDAL_CODE,
        pMDSS_CODE: this.MDSS_CODE,
        villageId :'',
        pFORM_A_PDF: this.FORM_A_PDF,
        pSWORN_STATEMENT_PDF: this.SWORN_STATEMENT_PDF,
        pMASUDHA_FORM_PDF: this.MASUDHA_FORM_PDF,
        pMEETING_PROCEDINGS_PDF: this.MEETING_PROCEDINGS_PDF,
        pREQ_LETTER_ADHOCK_COM_PDF: this.REQ_LETTER_ADHOCK_COM_PDF,
        pECONOMIC_VIABILITY_REP_PDF: this.ECONOMIC_VIABILITY_REP_PDF,
        pBANK_REMITTANCE_CERTI_PDF: this.BANK_REMITTANCE_CERTI_PDF,
        pBYE_LAW_PDF: this.BYE_LAW_PDF,
        pFESABILITY_REPORT_PDF: this.FESABILITY_REPORT_PDF,
        pREGISTRATION_CERTIFICATE: this.REGISTRATION_CERTIFICATE,
        pPROCEDDINGS_ORDERS: this.PROCEDDINGS_ORDERS,
        pPROCEDDINGS_ADHOCK: this.PROCEDDINGS_ADHOCK,
        pBYE_LAW_REGISTARION: this.BYE_LAW_REGISTARION,
        pINSERTED_BY: this.session.userName
         
      };
      //this.isShow = false;
      if (!this.FORM_A_PDF) { this.toast.warning('FORM_A PDF NOT AVAILABLE'); return; }
      if (!this.SWORN_STATEMENT_PDF) { this.toast.warning('SWORN_STATEMENT PDF NOT AVAILABLE'); return; }
      if (!this.MASUDHA_FORM_PDF) { this.toast.warning('MASUDHA_FORM_PDF NOT AVAILABLE'); return; }
      if (!this.MEETING_PROCEDINGS_PDF) { this.toast.warning('MEETING_PROCEDINGS PDF NOT AVAILABLE'); return; }
      if (!this.REQ_LETTER_ADHOCK_COM_PDF) { this.toast.warning('REQ_LETTER_ADHOCK_COM PDF NOT AVAILABLE'); return; }
      if (!this.ECONOMIC_VIABILITY_REP_PDF) { this.toast.warning('ECONOMIC_VIABILITY_REP PDF NOT AVAILABLE'); return; }
      if (!this.BANK_REMITTANCE_CERTI_PDF) { this.toast.warning('BANK_REMITTANCE_CERTI PDF NOT AVAILABLE'); return; }
      if (!this.BYE_LAW_PDF) { this.toast.warning('BYE_LAW PDF NOT AVAILABLE'); return; }
      if (!this.FESABILITY_REPORT_PDF) { this.toast.warning('FESABILITY_REPORT PDF NOT AVAILABLE'); return; }
      if (!this.REGISTRATION_CERTIFICATE) { this.toast.warning('REGISTRATION_CERTIFICATE PDF NOT AVAILABLE'); return; }
      if (!this.PROCEDDINGS_ORDERS) { this.toast.warning('PROCEDDINGS_ORDERS PDF NOT AVAILABLE'); return; }
      if (!this.PROCEDDINGS_ADHOCK) { this.toast.warning('PROCEDDINGS_ADHOCK PDF NOT AVAILABLE'); return; }
      if (!this.BYE_LAW_REGISTARION) { this.toast.warning('BYE_LAW_REGISTARION PDF NOT AVAILABLE'); return; }

      this.spinner.show();
      const res = await this.commAPI.CommissionerpdfSub(req);
       this.registrationapprovalsList = [];

      if (res.success) {
         this.registrationapprovalsList = res.result;
         this.LoadData();

          console.log(this.registrationapprovalsList);  
        this.rerender();
      } else {
        this.toast.info(res.message);
      }

      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }

  }
 
  
  async RejectPopup() { 
    if(!this.rbkid){
      this.toast.warning('Please Select RSK');
      return;
    }
    try {
      const req = {        
      //   prbkCode:  this.rbkid,
      //   pmdssCode :this.MANDAL_CODE,
      //   pdivisionCode :this.session.divisionId,
      //   pdistCode :this.session.districtId,
      // //  QasAns: this.answrdcheckList,
      //   pgmUpdatedBy :this.session.userName 

        type:16,         
        pdistCode: this.rbkid,
        pdivisionCode: this.session.divisionId,
        prbkCode:this.rbkid,

      };

      this.spinner.show();
     // const res = await this.GMAPI.gmcheckListSub(req);

     const res = await this.GMAPI.mdsschecklist(req) 

      this.spinner.hide();
      if (res.success) {
        this.toast.info(res.message);
        window.location.reload();
      } else {
        this.toast.info(res.message);
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
    this.dtElements.forEach((dtElement: DataTableDirective) => {
      if (dtElement.dtInstance) {
        dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      }
    });
    this.dtTrigger.next();

  }
}
