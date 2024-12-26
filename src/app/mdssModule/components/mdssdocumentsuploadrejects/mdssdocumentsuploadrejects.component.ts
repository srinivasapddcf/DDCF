import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DlcoService } from 'src/app/dlcoModule/services/dlco.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UserManualsService } from 'src/app/shared/services/user-manuals.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { MdssService } from '../../services/mdss.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-mdssdocumentsuploadrejects',
  templateUrl: './mdssdocumentsuploadrejects.component.html',
  styleUrls: ['./mdssdocumentsuploadrejects.component.css']
})
export class MdssdocumentsuploadrejectsComponent implements OnInit {
  @ViewChild('bankPassBookUpload') bankPassBookUpload: ElementRef;
  docid='';
  reportType='';
  PENDING='';
  REJECTED='';
  REJECTED_RBKID='';
  rbkRejectList=[];
  APPROVED='';
  rbkapprovedList=[];
  checkAPPROVEDList=[];
  mdssDetailsRejectedLIST=[];
  noDataMessage = '';
  rbkcodes='';
  



  mdssDetailsReq = {
    districtId: '',
    mandalId: '',
    rbkId: '',
    rbkRejectId:'',
    rbkapprovedId:'',
    mdssId: '',
    bankPassBookImage: '',
    accountNo: '',
    ifscCode: '',
    bankName: '',
    branchName: '',
    pinCode: '',
    updatedBy: '',
    micrNo: '',
    bankAccountName: '',
    formAPdf: '',
    swornStatementPdf: '',
    masudhaFormPdf: '',
    meetingProceedingsPdf: '',
    adhocCommitteePdf: '',
    viabilityReportPdf: '',
    bankRemittancePdf: '',
    byeLawsPdf: '',
    feasibilityReportPdf: '',
    pinCodeAvailable: false,
  };

  rbkList = [];
  passBookImg = '';
  mdacPassBookImg = '';
  formAViewPdf = '';
  swornStatementViewPdf = '';
  masudhaFormViewPdf = '';
  meetingProceedingsViewPdf = '';
  adhocCommitteeViewPdf = '';
  viabilityReportViewPdf = '';
  bankRemittanceViewPdf = '';
  byeLawsViewPdf = '';
  feasibilityReportViewPdf = '';
  bankDetails = [];

  submittedMdssDetails = {
    MDSS_NAME: '',
    MDSS_CODE: '',
    BANK_NAME: '',
    BRANCH: '',
    IFSC_CODE: '',
    ACCOUNT_NUMBER: '',
    PINCODE: '',
    BANK_PASSBOOK_IMAGE: '',
    RBK_CODE: '',
    BANK_ACC_NAME: '',
    IS_MDSS_BANK_SUBMITTED: '',
    IS_MDSS_DOC_SUBMITTED: '',
    FORM_A_PDF: '',
    SWORN_STATEMENT_PDF: '',
    MASUDHA_FORM_PDF: '',
    MEETING_PROCEDINGS_PDF: '',
    REQ_LETTER_ADHOCK_COM_PDF: '',
    ECONOMIC_VIABILITY_REP_PDF: '',
    BANK_REMITTANCE_CERTI_PDF: '',
    BYE_LAW_PDF: '',
    FESABILITY_REPORT_PDF: '',
  }; 
  
   
  mdssDocument = '';
  bankAccLength = '';
  bankRemittanceFormUrl = '';

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();
  pendtTrigger: Subject<any> = new Subject();

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private promotersAPI: MdssService,
    private utils: UtilsService,
    private logger: LoggerService,
    private session: SessionService,
    private sanitizer: DomSanitizer,
    private dlcoAPI: DlcoService,
    private userManual: UserManualsService
  ) {
    this.bankRemittanceFormUrl = this.userManual.bankRemittanceForm;
  }

  ngOnInit(): void {   
    
    if(this.session.uniqueId !="" && this.session.desigId != ''){
this.allcontrolscleardata();
    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    this.mdssDetailsReq.districtId = this.session.districtId;
    this.mdssDetailsReq.mandalId = this.session.mandalId;
    this.mdssDetailsReq.updatedBy = this.session.userName;

     

   // this.loadRBKList();
  }


  

  async loadApprovedRbkList(): Promise<void> {
    try {  
       
      const req = {
        type:10,
       
        pdistCode: this.session.districtId,
        pdivisionCode: this.session.divisionId,
        prbkCode:this.session.districtId,
      };
      this.rbkapprovedList = [];
      this.spinner.show();
      const res = await this.promotersAPI.mdsschecklist(req);
      this.spinner.hide();
      this.rbkapprovedList = [];
      if (res.success) {
        this.rbkapprovedList = res.result;

        console.log(this.rbkapprovedList);
      } else {
        this.toast.info(res.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


 

  async loadBankDetails(): Promise<void> {
    try {
      this.noDataMessage = '';
      const req = {
        rbkId: this.mdssDetailsReq.rbkId,
      };
      this.spinner.show();
      const response = await this.promotersAPI.mdacBankDetailsByRbkId(req);
      this.spinner.hide();
      if (response.success) {
        this.mdssDetailsReq.accountNo = response.result[0].BANK_ACCOUNT_NO;
        this.mdssDetailsReq.ifscCode = response.result[0].IFSCCODE;
        this.mdssDetailsReq.bankName = response.result[0].BANK_NAME;
        this.mdssDetailsReq.branchName = response.result[0].BRANCH_NAME;
        this.mdssDetailsReq.pinCode = response.result[0].PINCODE;
        if (!this.utils.isEmpty(response.result[0].PASS_BOOK_IMG)) {
          this.mdssDetailsReq.bankPassBookImage = await this.getMdacBaseFile(
            response.result[0].PASS_BOOK_IMG
          );
          this.mdacPassBookImg = this.mdssDetailsReq.bankPassBookImage;
        }
        if (!this.utils.isEmpty(response.result[0].PINCODE)) {
          this.mdssDetailsReq.pinCodeAvailable = true;
          this.mdssDetailsReq.pinCode = response.result[0].PINCODE;
        }
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async getMdacBaseFile(path): Promise<string> {
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

  async getBaseFile(path): Promise<string> {
    try {
      if (!this.utils.isEmpty(path)) {
        this.spinner.show();
        const response = await this.utils.MDSSFileDownload(path);
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

  btnPdf(pdf): void {
    if (!this.utils.isEmpty(pdf)) {
      this.utils.viewPDF(pdf);
    } else {
      this.toast.warning('PDF is Not Available');
    }
  }

  async btnViewFormADoc(id): Promise<void> {
    try {
       
      if(id==="0") this.docid= this.mdssDetailsReq.rbkId;
     // if(id==="1") this.docid= this.mdssDetailsReq.rbkRejectId;

      const req = {
        rbkId:this.docid,// this.mdssDetailsReq.rbkId,
      };
      this.spinner.show();
      const response = await this.promotersAPI.forma(req);
      this.spinner.hide();
      if (response.success) {
        this.utils.viewPDF(response.result);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnViewByLawsDoc(id): Promise<void> {
    try {
      if(id==="0") this.docid= this.mdssDetailsReq.rbkId;
   //   if(id==="1") this.docid= this.mdssDetailsReq.rbkRejectId;

      const req = {
        rbkId:this.docid,// this.mdssDetailsReq.rbkId,
      };
      this.spinner.show();
      const response = await this.promotersAPI.bylaw(req);
      this.spinner.hide();
      if (response.success) {
        this.utils.viewPDF(response.result);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnViewFeasibility(id): Promise<void> {
    try {
      if(id==="0") this.docid= this.mdssDetailsReq.rbkId;
   //   if(id==="1") this.docid= this.mdssDetailsReq.rbkRejectId;
      const req = {
        rbkId: this.docid,//this.mdssDetailsReq.rbkId,
      };
      this.spinner.show();
      const response = await this.promotersAPI.Feasibility(req);
      this.spinner.hide();
      if (response.success) {
        this.utils.viewPDF(response.result);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnViewMasudhaForm(id): Promise<void> {
    try {
      if(id==="0") this.docid= this.mdssDetailsReq.rbkId; 
    //  if(id==="1") this.docid= this.mdssDetailsReq.rbkRejectId;
      const req = {
        rbkId: this.docid,//this.mdssDetailsReq.rbkId,
      };
      this.spinner.show();
      const response = await this.promotersAPI.masudaform(req);
      this.spinner.hide();
      if (response.success) {
        this.utils.viewPDF(response.result);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  btnDocumentDownload(url): void {
    if (this.utils.isEmpty(url)) {
      this.toast.warning('Document Not Found !!!');
    } else {
      window.open(url, '_blank');
    }
  }

  async btnVerifyIfscCode(): Promise<void> {
    try {
      if (this.utils.isEmpty(this.mdssDetailsReq.rbkId)) {
        this.toast.warning('Please Select RSK');
        return;
      }

      if (this.utils.isEmpty(this.mdssDetailsReq.accountNo)) {
        this.toast.warning('Please enter account no');
        return;
      }

      if (this.utils.isEmpty(this.mdssDetailsReq.ifscCode)) {
        this.toast.warning('Please enter IFSC code');
        return;
      }

      const req = {
        ifscCode: this.mdssDetailsReq.ifscCode,
      };
      this.spinner.show();
      const response = await this.promotersAPI.searchByIFSC(req);
      this.spinner.hide();
      if (response.success) {
        let count = 0;
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < response.result.length; i++) {
          if (
            this.mdssDetailsReq.accountNo.length.toString() ===
            response.result[i].ACCOUNTLENGTH
          ) {
            this.mdssDetailsReq.bankName = response.result[i].BANK;
            this.mdssDetailsReq.branchName = response.result[i].BRANCH;
            this.bankAccLength = response.result[i].ACCOUNTLENGTH;
            this.mdssDetailsReq.micrNo = response.result[i].MICR_CODE;
            count++;
            break;
          }
        }
        if (count < 1) {
          this.toast.info('Invalid bank account number for entered IFSC Code');
        }
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

     

  async btnSUBMITTODLCO(): Promise<void> {
    try {
      if (this.utils.isEmpty(this.mdssDetailsReq.rbkId)) {
        this.toast.warning('Please Select RSK');
        return;
      }
      const req = {
        type:'2',
        rbkId: this.mdssDetailsReq.rbkId,
      };

      this.spinner.show();
      const response = await this.promotersAPI.mdssDocumentsEditandSub(
        req
      );
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

  async btnEDITSubmit(): Promise<void> {
    try {
      if (this.utils.isEmpty(this.mdssDetailsReq.rbkId)) {
        this.toast.warning('Please Select RSK');
        return;
      }
 
const req = {
  type:'1',
  rbkId: this.mdssDetailsReq.rbkId,
};

      this.spinner.show();
      const response = await this.promotersAPI.mdssDocumentsEditandSub(
        req
      );
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
  async btnSubmit(): Promise<void> {
    try {
      if (this.validate()) {
        this.spinner.show();
        const response = await this.promotersAPI.mdssDocumentsSub(
          this.mdssDetailsReq
        );
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
    if (this.utils.isEmpty(this.mdssDetailsReq.rbkId)) {
      this.toast.warning('Please Select RSK');
      return;
    }

    if (this.utils.isEmpty(this.mdssDetailsReq.formAPdf)) {
      this.toast.warning('Please Upload Form-A Signed Copy Pdf ');
      return;
    }

    if (this.utils.isEmpty(this.mdssDetailsReq.swornStatementPdf)) {
      this.toast.warning('Please Upload Sworn Statement Pdf ');
      return;
    }

    if (this.utils.isEmpty(this.mdssDetailsReq.masudhaFormPdf)) {
      this.toast.warning('Please Upload Masudha Form Signed Copy Pdf ');
      return;
    }

    if (this.utils.isEmpty(this.mdssDetailsReq.meetingProceedingsPdf)) {
      this.toast.warning('Please Upload Meetings Proccedings Pdf ');
      return;
    }

    if (this.utils.isEmpty(this.mdssDetailsReq.adhocCommitteePdf)) {
      this.toast.warning(
        'Please Upload Request Letter for Adhoc Committee Pdf '
      );
      return;
    }

    if (this.utils.isEmpty(this.mdssDetailsReq.viabilityReportPdf)) {
      this.toast.warning('Please Upload Economic Viability Report Pdf ');
      return;
    }

    if (this.utils.isEmpty(this.mdssDetailsReq.bankRemittancePdf)) {
      this.toast.warning('Please Upload Bank Remittance Certificate PDF ');
      return;
    }

    if (this.utils.isEmpty(this.mdssDetailsReq.byeLawsPdf)) {
      this.toast.warning('Please Upload Bye Laws PDF ');
      return;
    }

    if (this.utils.isEmpty(this.mdssDetailsReq.feasibilityReportPdf)) {
      this.toast.warning('Please Upload Feasibilty Report PDF ');
      return;
    }

    if (this.utils.isEmpty(this.mdssDetailsReq.accountNo)) {
      this.toast.warning('Please enter bank account no');
      return;
    }

    if (this.utils.isEmpty(this.mdssDetailsReq.ifscCode)) {
      this.toast.warning('Please enter IFSC code');
      return;
    }

    if (this.utils.isEmpty(this.mdssDetailsReq.bankName)) {
      this.toast.warning('Please Enter Valid IFSC CODE');
      return;
    }

    if (this.utils.isEmpty(this.mdssDetailsReq.branchName)) {
      this.toast.warning('Please Enter Valid IFSC CODE');
      return;
    }

    if (this.utils.isEmpty(this.mdssDetailsReq.pinCode)) {
      this.toast.warning('Please Enter Bank PINCODE');
      return;
    }

    if (!this.utils.pinCodeCheck(this.mdssDetailsReq.pinCode)) {
      this.toast.warning('Please Enter Valid PINCODE');
      return false;
    }

    if (this.utils.isEmpty(this.mdssDetailsReq.bankPassBookImage)) {
      this.toast.warning('Please Upload Bank PassBook Front Page Photo ');
      return;
    }

    if (this.utils.isEmpty(this.mdssDetailsReq.bankAccountName)) {
      this.toast.warning('Please Enter Bank Account Name ');
      return;
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
        this.mdssDetailsReq.bankPassBookImage = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onFormASignedCopyChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.PDF,
        this.utils.fileSize.oneMB
      );
      if (res) {
        this.mdssDetailsReq.formAPdf = res.replace(
          'data:application/pdf;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onSwornStatementChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.PDF,
        this.utils.fileSize.oneMB
      );
      if (res) {
        this.mdssDetailsReq.swornStatementPdf = res.replace(
          'data:application/pdf;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onMasudhaFormChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.PDF,
        this.utils.fileSize.oneMB
      );
      if (res) {
        this.mdssDetailsReq.masudhaFormPdf = res.replace(
          'data:application/pdf;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onMeetingProceedingsChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.PDF,
        this.utils.fileSize.oneMB
      );
      if (res) {
        this.mdssDetailsReq.meetingProceedingsPdf = res.replace(
          'data:application/pdf;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onAdhocCommitteeChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.PDF,
        this.utils.fileSize.oneMB
      );
      if (res) {
        this.mdssDetailsReq.adhocCommitteePdf = res.replace(
          'data:application/pdf;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onViabilityReportChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.PDF,
        this.utils.fileSize.oneMB
      );
      if (res) {
        this.mdssDetailsReq.viabilityReportPdf = res.replace(
          'data:application/pdf;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onBankRemittanceChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.PDF,
        this.utils.fileSize.oneMB
      );
      if (res) {
        this.mdssDetailsReq.bankRemittancePdf = res.replace(
          'data:application/pdf;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onByeLawsChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.PDF,
        this.utils.fileSize.oneMB
      );
      if (res) {
        this.mdssDetailsReq.byeLawsPdf = res.replace(
          'data:application/pdf;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onFeasibilityReportChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.PDF,
        this.utils.fileSize.oneMB
      );
      if (res) {
        this.mdssDetailsReq.feasibilityReportPdf = res.replace(
          'data:application/pdf;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }
 

  allcontrolscleardata()
  {
    try{

      this.rbkRejectList=[]; 
      this.rbkList=[];
      this.reportType = '0';
      
          document.getElementById('REJECTED').style.display='none';         
           document.getElementById('PENDING').style.display='block';

          this.noDataMessage = '';
           this.submittedMdssDetails = {
             MDSS_NAME: '',
             MDSS_CODE: '',
             BANK_NAME: '',
             BRANCH: '',
             IFSC_CODE: '',
             ACCOUNT_NUMBER: '',
             PINCODE: '',
             BANK_PASSBOOK_IMAGE: '',
             RBK_CODE: '',
             BANK_ACC_NAME: '',
             IS_MDSS_BANK_SUBMITTED: '',
             IS_MDSS_DOC_SUBMITTED: '',
             FORM_A_PDF: '',
             SWORN_STATEMENT_PDF: '',
             MASUDHA_FORM_PDF: '',
             MEETING_PROCEDINGS_PDF: '',
             REQ_LETTER_ADHOCK_COM_PDF: '',
             ECONOMIC_VIABILITY_REP_PDF: '',
             BANK_REMITTANCE_CERTI_PDF: '',
             BYE_LAW_PDF: '',
             FESABILITY_REPORT_PDF: '',
           }; 
     
  } catch (error) { 
    this.utils.catchResponse(error);
  }
  }
  

  btnDashboardDetails(id): void {
    
    this.reportType = id;
    if (id === '1') {  
        this.allcontrolscleardata();  
          document.getElementById('REJECTED').style.display='none';
          document.getElementById('APPROVED').style.display='none';
           document.getElementById('PENDING').style.display='block';      
      this.loadRBKList();
          
    } 
  //   else if (id === '2') {  //onRbkapprovedChange
  //      this.allcontrolscleardata();
  //       document.getElementById('APPROVED').style.display='block';
  //       document.getElementById('REJECTED').style.display='none';
  //     // document.getElementById('ROLLBACK').style.display='none';
  //        document.getElementById('PENDING').style.display='none';
  //       this.loadApprovedRbkList();
      
  //   }else if (id === '3') {
  //       // this.allcontrolscleardata();
  //       // document.getElementById('REJECTED').style.display='block';  
  //       // document.getElementById('APPROVED').style.display='none';       
  //       // document.getElementById('PENDING').style.display='none'; 

  //      // this.allcontrolscleardata();  
  //       document.getElementById('REJECTED').style.display='none';
  //       document.getElementById('APPROVED').style.display='none';
  //        document.getElementById('PENDING').style.display='block';      
  //       this.loadRejectRbkList();
      
  //   }else if (id === '4') { 
  //     // document.getElementById('APPROVED').style.display='none';
  //     // document.getElementById('REJECTED').style.display='none';
  //     // document.getElementById('ROLLBACK').style.display='block';
  //     // document.getElementById('PENDING').style.display='none'; 
  // } 
  } 

//  Start PENDING

async loadRBKList(): Promise<void> {
  try {
    this.noDataMessage = '';
     
      const req = {        
      pid: this.session.rbkGroupId,
      type:11,       
      pdistCode: this.session.districtId,
      pdivisionCode: this.session.divisionId,
       prbkCode:this.session.districtId,
    };
    this.rbkList =[];
    this.spinner.show(); 
    const response = await this.promotersAPI.mdsschecklist(req);
    this.spinner.hide();
    if (response.success) {
      this.rbkList = response.result;
    } else {
      this.toast.info(response.message);
    }
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}
async onRbkChange(): Promise<void> {
  try {
     
    const req = {
      rbkId:this.rbkcodes,
      //rbkId: this.mdssDetailsReq.rbkId,
    };
    this.spinner.show();
    const response = await this.promotersAPI.mdssDocDetailsByRbkId(req);
    this.spinner.hide();
    if (response.success) {
      this.submittedMdssDetails = response.result[0];
      this.mdssDetailsReq.mdssId = this.submittedMdssDetails.MDSS_CODE;

      if (          !this.utils.isEmpty(this.submittedMdssDetails.BANK_PASSBOOK_IMAGE)        ) 
      {
        this.passBookImg = await this.getBaseFile(this.submittedMdssDetails.BANK_PASSBOOK_IMAGE);
      }

      if (!this.utils.isEmpty(this.submittedMdssDetails.FORM_A_PDF)) 
      {
        this.formAViewPdf = await this.getBaseFile(this.submittedMdssDetails.FORM_A_PDF );
      }

      if (!this.utils.isEmpty(this.submittedMdssDetails.SWORN_STATEMENT_PDF))
       {
        this.swornStatementViewPdf = await this.getBaseFile(this.submittedMdssDetails.SWORN_STATEMENT_PDF  );
      }

      if (!this.utils.isEmpty(this.submittedMdssDetails.MASUDHA_FORM_PDF))
       {
        this.masudhaFormViewPdf = await this.getBaseFile(this.submittedMdssDetails.MASUDHA_FORM_PDF );
      }

      if ( !this.utils.isEmpty(this.submittedMdssDetails.MEETING_PROCEDINGS_PDF)) 
      {
        this.meetingProceedingsViewPdf = await this.getBaseFile( this.submittedMdssDetails.MEETING_PROCEDINGS_PDF);
      }

      if (!this.utils.isEmpty(this.submittedMdssDetails.REQ_LETTER_ADHOCK_COM_PDF )) 
        {
        this.adhocCommitteeViewPdf = await this.getBaseFile(this.submittedMdssDetails.REQ_LETTER_ADHOCK_COM_PDF );
      }

      if (!this.utils.isEmpty( this.submittedMdssDetails.ECONOMIC_VIABILITY_REP_PDF  )  ) 
      {
        this.viabilityReportViewPdf = await this.getBaseFile( this.submittedMdssDetails.ECONOMIC_VIABILITY_REP_PDF );
      }

      if ( !this.utils.isEmpty( this.submittedMdssDetails.BANK_REMITTANCE_CERTI_PDF)) 
      {
        this.bankRemittanceViewPdf = await this.getBaseFile(this.submittedMdssDetails.BANK_REMITTANCE_CERTI_PDF );
      }

      if (!this.utils.isEmpty(this.submittedMdssDetails.BYE_LAW_PDF)) 
      {         
         this.byeLawsViewPdf = await this.getBaseFile(this.submittedMdssDetails.BYE_LAW_PDF );
      }

      if (!this.utils.isEmpty(this.submittedMdssDetails.FESABILITY_REPORT_PDF))
       {
        this.feasibilityReportViewPdf = await this.getBaseFile( this.submittedMdssDetails.FESABILITY_REPORT_PDF );
      }

      if (this.submittedMdssDetails.IS_MDSS_BANK_SUBMITTED === '0')
       {
        this.loadBankDetails();
      }
    } 
    else
     {
      this.noDataMessage = response.message;
     }
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}


// End PENDING


//  Start RollBack


async loadRejectRbkList(): Promise<void> {
  try {
    this.noDataMessage = '';
    
    
      const req = {        
        type:11,       
           pdistCode: this.session.districtId,
       pdivisionCode: this.session.divisionId,
       prbkCode:this.session.districtId,
    };
    this.rbkList =[];
    this.spinner.show(); 
    const response = await this.promotersAPI.mdsschecklist(req);
    this.spinner.hide();
    if (response.success) {
      this.rbkList = response.result;
    } else {
      this.toast.info(response.message);
    }
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}


// async loadRejectRbkList(): Promise<void> {
//   try {  
//     const req = {
//       type:11,       
//       pdistCode: this.session.districtId,
//       pdivisionCode: this.session.divisionId,
//       prbkCode:this.session.districtId,
//     };
//     this.rbkList = [];
//     this.spinner.show();
//     const res = await this.promotersAPI.mdsschecklist(req);
//     this.spinner.hide();
//     this.rbkList = [];
//     if (res.success) {
//       this.rbkList = res.result;

//      // console.log(this.rbkRejectList);
//     } else {
//       this.toast.info(res.message);
//     }
//   } catch (error) {
//     this.spinner.hide();
//     this.utils.catchResponse(error);
//   }
// }
async onRbkRejectChange(): Promise<void> {
  try {
    this.noDataMessage = '';
    this.submittedMdssDetails = {
      MDSS_NAME: '',
      MDSS_CODE: '',
      BANK_NAME: '',
      BRANCH: '',
      IFSC_CODE: '',
      ACCOUNT_NUMBER: '',
      PINCODE: '',
      BANK_PASSBOOK_IMAGE: '',
      RBK_CODE: '',
      BANK_ACC_NAME: '',
      IS_MDSS_BANK_SUBMITTED: '',
      IS_MDSS_DOC_SUBMITTED: '',
      FORM_A_PDF: '',
      SWORN_STATEMENT_PDF: '',
      MASUDHA_FORM_PDF: '',
      MEETING_PROCEDINGS_PDF: '',
      REQ_LETTER_ADHOCK_COM_PDF: '',
      ECONOMIC_VIABILITY_REP_PDF: '',
      BANK_REMITTANCE_CERTI_PDF: '',
      BYE_LAW_PDF: '',
      FESABILITY_REPORT_PDF: '',
    };
    const req = {
      rbkId: this.mdssDetailsReq.rbkRejectId,
    };
    this.spinner.show();
    const response = await this.promotersAPI.mdssDocDetailsByRbkId(req);
    this.spinner.hide();
    if (response.success) {
      this.submittedMdssDetails = response.result[0];
      this.mdssDetailsReq.mdssId = this.submittedMdssDetails.MDSS_CODE;

      if (          !this.utils.isEmpty(this.submittedMdssDetails.BANK_PASSBOOK_IMAGE)        ) 
      {
        this.passBookImg = await this.getBaseFile(this.submittedMdssDetails.BANK_PASSBOOK_IMAGE);
      }

      if (!this.utils.isEmpty(this.submittedMdssDetails.FORM_A_PDF)) 
      {
        this.formAViewPdf = await this.getBaseFile(this.submittedMdssDetails.FORM_A_PDF );
      }

      if (!this.utils.isEmpty(this.submittedMdssDetails.SWORN_STATEMENT_PDF))
       {
        this.swornStatementViewPdf = await this.getBaseFile(this.submittedMdssDetails.SWORN_STATEMENT_PDF  );
      }

      if (!this.utils.isEmpty(this.submittedMdssDetails.MASUDHA_FORM_PDF))
       {
        this.masudhaFormViewPdf = await this.getBaseFile(this.submittedMdssDetails.MASUDHA_FORM_PDF );
      }

      if ( !this.utils.isEmpty(this.submittedMdssDetails.MEETING_PROCEDINGS_PDF)) 
      {
        this.meetingProceedingsViewPdf = await this.getBaseFile( this.submittedMdssDetails.MEETING_PROCEDINGS_PDF);
      }

      if (!this.utils.isEmpty(this.submittedMdssDetails.REQ_LETTER_ADHOCK_COM_PDF )) 
        {
        this.adhocCommitteeViewPdf = await this.getBaseFile(this.submittedMdssDetails.REQ_LETTER_ADHOCK_COM_PDF );
      }

      if (!this.utils.isEmpty( this.submittedMdssDetails.ECONOMIC_VIABILITY_REP_PDF  )  ) 
      {
        this.viabilityReportViewPdf = await this.getBaseFile( this.submittedMdssDetails.ECONOMIC_VIABILITY_REP_PDF );
      }

      if ( !this.utils.isEmpty( this.submittedMdssDetails.BANK_REMITTANCE_CERTI_PDF)) 
      {
        this.bankRemittanceViewPdf = await this.getBaseFile(this.submittedMdssDetails.BANK_REMITTANCE_CERTI_PDF );
      }

      if (!this.utils.isEmpty(this.submittedMdssDetails.BYE_LAW_PDF)) 
      {         
         this.byeLawsViewPdf = await this.getBaseFile(this.submittedMdssDetails.BYE_LAW_PDF );
      }

      if (!this.utils.isEmpty(this.submittedMdssDetails.FESABILITY_REPORT_PDF))
       {
        this.feasibilityReportViewPdf = await this.getBaseFile( this.submittedMdssDetails.FESABILITY_REPORT_PDF );
      }

      if (this.submittedMdssDetails.IS_MDSS_BANK_SUBMITTED === '0')
       {
        this.loadBankDetails();
      }
    } 
    else
     {
      this.noDataMessage = response.message;
     }
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}



// End RollBack


}
