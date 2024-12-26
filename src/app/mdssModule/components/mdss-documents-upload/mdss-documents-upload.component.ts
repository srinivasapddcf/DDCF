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
  selector: 'app-mdss-documents-upload',
  templateUrl: './mdss-documents-upload.component.html',
  styleUrls: ['./mdss-documents-upload.component.css'],
})
export class MdssDocumentsUploadComponent implements OnInit {
  @ViewChild('bankPassBookUpload') bankPassBookUpload: ElementRef; 
  divreject=false; resultid=0;emptypdf='';
  mdacPassBookImgnew='';
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
  DOCSId='';
  mdssDOCSLIST=[];
  formUpload="";
  mandalLevelDetails=[];
  exceldata=[];

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

     

    //this.loadRBKList();
  }


  

  async loadApprovedRbkList(): Promise<void> {
    try {  
       
      // const req = {
      //   type:10,
      //   uniqueId: this.session.rbkGroupId,
      //    pid:this.session.rbkGroupId,//userName,
      //   pdistCode: this.session.districtId,
      //   pdivisionCode: this.session.divisionId,
      //    prbkCode:this.session.districtId,
      // };
      // this.rbkapprovedList = [];
      // this.exceldata = [];
      // this.spinner.show();
      // const res = await this.promotersAPI.mdsschecklist(req);
      // this.spinner.hide();
      const req = { type:"5",rbkId:this.session.uniqueId,status:this.session.districtId }; 
          this.spinner.show();
          debugger;
          // const res = await this.commAPI.CommissionerFinalGet(req); 
           const res = await this.dlcoAPI.eSignDocumentsGet(req); 
           debugger;
           console.log(res);
      
      this.rbkapprovedList = [];
      if (res.success) {
        this.spinner.hide();
        this.rbkapprovedList = res.result;
this.exceldata=res.result;
       // console.log(this.rbkapprovedList);
      } else {
        this.toast.info(res.message);
      }
    } catch (error) {
      this.spinner.hide();
         this.utils.catchResponse(error);
    // if(error!="")   this.toast.info("No Rbk Found");
    // else
    // this.utils.catchResponse("No Rbk Found");
    }
  }

  async btnPdfViewApeoved(pdf): Promise<void> {
    try {
      this.spinner.show();
      const res = await this.utils.CommissionerFileDownload(pdf);
      if (res.success) {
        this.utils.downloadPdf(res.result,pdf);
       // this.utils.viewPDF(res.result);
        // let signedByPdf = 'data:application/pdf, ' + res.result;
        // window.open(signedByPdf, '_blank');
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
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
      debugger;
      if (response.success) {
        this.mdssDetailsReq.accountNo = response.result[0].BANK_ACCOUNT_NO;
        this.mdssDetailsReq.ifscCode = response.result[0].IFSCCODE;
        this.mdssDetailsReq.bankName = response.result[0].BANK_NAME;
        this.mdssDetailsReq.branchName = response.result[0].BRANCH_NAME;
        this.mdssDetailsReq.pinCode = response.result[0].PINCODE;
        this.mdacPassBookImg="";
        debugger;


if(this.submittedMdssDetails.IS_MDSS_BANK_SUBMITTED === '1')       
           this.passBookImg = await this.getjpvreportsMdacBaseFile(response.result[0].PASS_BOOK_IMG);
       
else{
        if(response.result[0].SOURCE=='web'){
        if (!this.utils.isEmpty(response.result[0].PASS_BOOK_IMG)) {

          this.mdacPassBookImg = await this.getMdacBaseFile(response.result[0].PASS_BOOK_IMG);
          
          this.mdacPassBookImgnew= await this.getjpvreportsMdacBaseFile(response.result[0].PASS_BOOK_IMG);
         // this.mdacPassBookImg = this.mdssDetailsReq.bankPassBookImage;
        }
      }

       else if (!this.utils.isEmpty(response.result[0].PASS_BOOK_IMG)) {

          this.mdacPassBookImg = await this.getjpvreportsMdacBaseFile(response.result[0].PASS_BOOK_IMG);
          this.mdacPassBookImgnew= await this.getMdacBaseFile(response.result[0].PASS_BOOK_IMG);
         // this.mdacPassBookImg = this.mdssDetailsReq.bankPassBookImage;
        }
      }
        
      // else if (!this.utils.isEmpty(this.mdssDetailsReq.bankPassBookImage))
      //   {
      //      this.mdssDetailsReq.bankPassBookImage = await this.getMdacBaseFile(response.result[0].PASS_BOOK_IMG);
      //        if( this.mdssDetailsReq.bankPassBookImage!="")   
      //      this.mdacPassBookImg = this.mdssDetailsReq.bankPassBookImage;
      //   }
        


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
      debugger;
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
      if(id==="1") this.docid= this.mdssDetailsReq.rbkRejectId;

      const req = {
        rbkId:this.docid,// this.mdssDetailsReq.rbkId,
      };
      this.spinner.show();
      const response = await this.promotersAPI.formanew(req);
      debugger;
      this.spinner.hide();
      if (response.success) {

        this.utils.downloadPdf(response.result,this.docid);
          //this.utils.viewPDF(response.result);

       //  this.btnViewAttendanceDoc(req);
        // const response1 = await this.promotersAPI.formaattendance(req);
        // if (response.success) {
        //   this.utils.viewPDF(response1.result);
          }
          else{this.toast.warning('Form A    not available.');}
       
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnViewFormA(id): Promise<void> {
    try {
       
      if(id==="0") this.docid= this.mdssDetailsReq.rbkId;
      if(id==="1") this.docid= this.mdssDetailsReq.rbkRejectId;

      const req = {
        rbkId:this.docid, 
      };
      this.spinner.show();
       const response = await this.promotersAPI.formanew(req);
       this.spinner.hide();
    
      if (response.success) {
          this.utils.viewPDF(response.result); 
          }
          else{this.toast.warning('Form A    not available.');}
       
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  
  async btnViewSWORNSTATEMENTEMPTY(id): Promise<void> {
    try {
       
      if(id==="0") this.docid= this.mdssDetailsReq.rbkId;
      if(id==="1") this.docid= this.mdssDetailsReq.rbkRejectId;

      const req = {
        rbkId:this.docid, 
      };
      this.spinner.show();
       const response = await this.promotersAPI.swornstatementEMPTY(req);
       this.spinner.hide();
    
      if (response.success) {
         
          
         this.utils.downloadPdf(response.result,this.docid);
          }
          else{this.toast.warning('EMPTY SWORN STATEMENT   not available.');}
       
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  
  
  // async btnViewFormASS(id): Promise<void> {
  //   try {
       
  //     if(id==="0") this.docid= this.mdssDetailsReq.rbkId;
  //     if(id==="1") this.docid= this.mdssDetailsReq.rbkRejectId;

  //     const req = {
  //       rbkId:this.docid, 
  //     };
  //     this.spinner.show();
  //      const response = await this.promotersAPI.swornstatement(req);
  //      this.spinner.hide();
    
  //     if (response.success) {
  //         this.utils.viewPDF(response.result); 
  //         }
  //         else{this.toast.warning('PLEASE CLICK  ON SWORN STATEMENT EMPTY VIEW ');}
       
  //   } catch (error) {
  //     this.spinner.hide();
  //     this.utils.catchResponse(error);
  //   }
  // }


  async btnViewFormAfp(id): Promise<void> {
    try {
       
      if(id==="0") this.docid= this.mdssDetailsReq.rbkId;
      if(id==="1") this.docid= this.mdssDetailsReq.rbkRejectId;

      const req = {
        rbkId:this.docid, 
      };
      this.spinner.show();
       const response = await this.promotersAPI.formafirstpage(req);
       this.spinner.hide();
    debugger;
      if (response.success) {
          this.utils.viewPDF(response.result); 
          }
          else{this.toast.warning('Form A First page   not available.');}
       
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  
  async btnViewPROCEEDINGSOFTHEMEETINGDoc(id): Promise<void> {
    try {
       
      if(id==="0") this.docid= this.mdssDetailsReq.rbkId;
      if(id==="1") this.docid= this.mdssDetailsReq.rbkRejectId;

      const req = {
        rbkId:this.docid,// this.mdssDetailsReq.rbkId,
      };
      this.spinner.show();
      const response = await this.promotersAPI.PROCEEDINGSOFTHEMEETING(req);
      this.spinner.hide();
      if (response.success) {
          this.utils.viewPDF(response.result);

       //  this.btnViewAttendanceDoc(req);
        // const response1 = await this.promotersAPI.formaattendance(req);
        // if (response.success) {
        //   this.utils.viewPDF(response1.result);
          }
          else{this.toast.warning('PROCEEDINGS OF THE MEETING    not available.');}
       
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  
  async btnViewEconomicViabilityDoc(id): Promise<void> {
    try {
       
      if(id==="0") this.docid= this.mdssDetailsReq.rbkId;
      if(id==="1") this.docid= this.mdssDetailsReq.rbkRejectId;

      const req = {
        rbkId:this.docid,// this.mdssDetailsReq.rbkId,
      };
      this.spinner.show();
      const response = await this.promotersAPI.EconomicViability(req);
      this.spinner.hide();
      if (response.success) {
          this.utils.viewPDF(response.result);

       //  this.btnViewAttendanceDoc(req);
        // const response1 = await this.promotersAPI.formaattendance(req);
        // if (response.success) {
        //   this.utils.viewPDF(response1.result);
          }
          else{this.toast.warning('Economic Viability    not available.');}
       
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  
  async btnViewAdhocCommitteeDoc(id): Promise<void> {
    try {
       
      if(id==="0") this.docid= this.mdssDetailsReq.rbkId;
      if(id==="1") this.docid= this.mdssDetailsReq.rbkRejectId;

      const req = {
        rbkId:this.docid,// this.mdssDetailsReq.rbkId,
      };
      this.spinner.show();
      const response = await this.promotersAPI.AdhocCommittee(req);
      this.spinner.hide();
      if (response.success) {
          this.utils.viewPDF(response.result);

       //  this.btnViewAttendanceDoc(req);
        // const response1 = await this.promotersAPI.formaattendance(req);
        // if (response.success) {
        //   this.utils.viewPDF(response1.result);
          }
          else{this.toast.warning('Adhoc Committee    not available.');}
       
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


  // async btnViewAttendanceDoc(id): Promise<void> {
  //   try {
       
  //     if(id==="0") this.docid= this.mdssDetailsReq.rbkId;
  //     if(id==="1") this.docid= this.mdssDetailsReq.rbkRejectId;

  //     const req = {
  //       rbkId:this.docid, 
  //     }; 
  //       const response1 = await this.promotersAPI.formaattendance(req);
  //       if (response1.success) {
  //         this.utils.viewPDF(response1.result);
  //       }
  //       else{this.toast.warning(' Attendance not available.');}
    
  //   } catch (error) {
  //     this.spinner.hide();
  //     this.utils.catchResponse(error);
  //   }
  // }



  async btnViewByLawsDoc(id): Promise<void> {
    try {
      if(id==="0") this.docid= this.mdssDetailsReq.rbkId;
      if(id==="1") this.docid= this.mdssDetailsReq.rbkRejectId;

      const req = {
        rbkId:this.docid,// this.mdssDetailsReq.rbkId,
      };
      this.spinner.show();
      const response = await this.promotersAPI.bylaw(req);
      this.spinner.hide();
      if (response.success) {
        this.utils.viewPDF(response.result);
      }else{this.toast.warning(' By Laws not available.');}
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnViewFeasibility(id): Promise<void> {
    try {
      if(id==="0") this.docid= this.mdssDetailsReq.rbkId;
      if(id==="1") this.docid= this.mdssDetailsReq.rbkRejectId;
      const req = {
        rbkId: this.docid,//this.mdssDetailsReq.rbkId,
      };
      this.spinner.show();
      const response = await this.promotersAPI.Feasibility(req);
      this.spinner.hide();
      if (response.success) {
        this.utils.viewPDF(response.result);
      }else{this.toast.warning(' Feasibility not available.');}
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnViewMasudhaForm(id): Promise<void> {
    try {
      if(id==="0") this.docid= this.mdssDetailsReq.rbkId; 
      if(id==="1") this.docid= this.mdssDetailsReq.rbkRejectId;
      const req = {
        rbkId: this.docid,//this.mdssDetailsReq.rbkId,
      };
      this.spinner.show();
      const response = await this.promotersAPI.masudaform(req);
      this.spinner.hide();
      if (response.success) {
        this.utils.viewPDF(response.result);
      }else{this.toast.warning(' Masudha not available.');}
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
       // alert(response.message);
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
       // alert(response.message);
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

if( this.resultid===0){
        const req0 = {
          branchName:this.mdssDetailsReq.branchName, districtId:this.session.districtId,         mdssId:this.mdssDetailsReq.mdssId,          mandalId:this.mdssDetailsReq.mandalId,
          bankPassBookImage:this.mdssDetailsReq.bankPassBookImage,          accountNo:this.mdssDetailsReq.accountNo,
          ifscCode:this.mdssDetailsReq.ifscCode,          bankName:this.mdssDetailsReq.bankName,          bankAccountName:this.mdssDetailsReq.bankAccountName,
          pinCode:this.mdssDetailsReq.pinCode,          updatedBy:this.mdssDetailsReq.updatedBy,
          swornStatementPdf:"0",
          
        };       
        this.spinner.show();
        const response0 = await this.promotersAPI.mdssDocumentsSubonebyone(req0);
        if (response0.success) {
          this.resultid=1;
          this.spinner.hide();
        }else{ this.resultid=0; this.spinner.hide();}
      }
 if( this.resultid===1){
        const req1 = {
          branchName:this.mdssDetailsReq.branchName, districtId:this.session.districtId,   mdssId:this.mdssDetailsReq.mdssId, mandalId:this.mdssDetailsReq.mandalId, bankPassBookImage:this.mdssDetailsReq.bankPassBookImage, accountNo:this.mdssDetailsReq.accountNo,  ifscCode:this.mdssDetailsReq.ifscCode,          bankName:this.mdssDetailsReq.bankName,          bankAccountName:this.mdssDetailsReq.bankAccountName,
          pinCode:this.mdssDetailsReq.pinCode,   updatedBy:this.mdssDetailsReq.updatedBy,
          swornStatementPdf:"1",
          formAPdf:this.mdssDetailsReq.formAPdf, 
        };       
        this.spinner.show();
        const response1 = await this.promotersAPI.mdssDocumentsSubonebyone(req1);
        if (response1.success) {  this.resultid=2;
          this.spinner.hide();
        }else{ this.resultid=0; this.spinner.hide();}
    }
    if( this.resultid===2){
        const req2 = {
          branchName:this.mdssDetailsReq.branchName, districtId:this.session.districtId,   mdssId:this.mdssDetailsReq.mdssId, mandalId:this.mdssDetailsReq.mandalId, bankPassBookImage:this.mdssDetailsReq.bankPassBookImage, accountNo:this.mdssDetailsReq.accountNo,  ifscCode:this.mdssDetailsReq.ifscCode,          bankName:this.mdssDetailsReq.bankName,          bankAccountName:this.mdssDetailsReq.bankAccountName,
          pinCode:this.mdssDetailsReq.pinCode,   updatedBy:this.mdssDetailsReq.updatedBy,
          swornStatementPdf:"2",
          formAPdf:this.mdssDetailsReq.swornStatementPdf, 
        };       
        this.spinner.show();
        const response2 = await this.promotersAPI.mdssDocumentsSubonebyone(req2);
          if (response2.success) {this.resultid=3;
            this.spinner.hide();
          }else{ this.resultid=0; this.spinner.hide();}
        }

      if( this.resultid===3){  
        const req3 = {
          branchName:this.mdssDetailsReq.branchName, districtId:this.session.districtId,   mdssId:this.mdssDetailsReq.mdssId, mandalId:this.mdssDetailsReq.mandalId, bankPassBookImage:this.mdssDetailsReq.bankPassBookImage, accountNo:this.mdssDetailsReq.accountNo,  ifscCode:this.mdssDetailsReq.ifscCode,          bankName:this.mdssDetailsReq.bankName,          bankAccountName:this.mdssDetailsReq.bankAccountName,
          pinCode:this.mdssDetailsReq.pinCode,   updatedBy:this.mdssDetailsReq.updatedBy,
          swornStatementPdf:"3",
          formAPdf:this.mdssDetailsReq.masudhaFormPdf, 
        };       
        this.spinner.show();
        const response3 = await this.promotersAPI.mdssDocumentsSubonebyone(req3);
        if (response3.success) {this.resultid=4;
          this.spinner.hide();
        }else{ this.resultid=0; this.spinner.hide();}
      }
      if( this.resultid===4){  
        const req4 = {
          branchName:this.mdssDetailsReq.branchName, districtId:this.session.districtId,   mdssId:this.mdssDetailsReq.mdssId, mandalId:this.mdssDetailsReq.mandalId, bankPassBookImage:this.mdssDetailsReq.bankPassBookImage, accountNo:this.mdssDetailsReq.accountNo,  ifscCode:this.mdssDetailsReq.ifscCode,          bankName:this.mdssDetailsReq.bankName,          bankAccountName:this.mdssDetailsReq.bankAccountName,
          pinCode:this.mdssDetailsReq.pinCode,   updatedBy:this.mdssDetailsReq.updatedBy,
          swornStatementPdf:"4",
          formAPdf:this.mdssDetailsReq.meetingProceedingsPdf, 
        };       
        this.spinner.show();
        const response4 = await this.promotersAPI.mdssDocumentsSubonebyone(req4);
        if (response4.success) { this.resultid=5;
          this.spinner.hide();
        }else{ this.resultid=0; this.spinner.hide();}
      }
      if( this.resultid===5){  
        const req5 = {
          branchName:this.mdssDetailsReq.branchName, districtId:this.session.districtId,   mdssId:this.mdssDetailsReq.mdssId, mandalId:this.mdssDetailsReq.mandalId, bankPassBookImage:this.mdssDetailsReq.bankPassBookImage, accountNo:this.mdssDetailsReq.accountNo,  ifscCode:this.mdssDetailsReq.ifscCode,          bankName:this.mdssDetailsReq.bankName,          bankAccountName:this.mdssDetailsReq.bankAccountName,
          pinCode:this.mdssDetailsReq.pinCode,   updatedBy:this.mdssDetailsReq.updatedBy,
          swornStatementPdf:"5",
          formAPdf:this.mdssDetailsReq.adhocCommitteePdf, 
        };       
        this.spinner.show();
        const response5 = await this.promotersAPI.mdssDocumentsSubonebyone(req5);
        if (response5.success) { this.resultid=6;
          this.spinner.hide();
        }else{ this.resultid=0; this.spinner.hide();}
      }
      if( this.resultid===6){  
        const req6 = {
          branchName:this.mdssDetailsReq.branchName,  districtId:this.session.districtId,  mdssId:this.mdssDetailsReq.mdssId, mandalId:this.mdssDetailsReq.mandalId, bankPassBookImage:this.mdssDetailsReq.bankPassBookImage, accountNo:this.mdssDetailsReq.accountNo,  ifscCode:this.mdssDetailsReq.ifscCode,          bankName:this.mdssDetailsReq.bankName,          bankAccountName:this.mdssDetailsReq.bankAccountName,
          pinCode:this.mdssDetailsReq.pinCode,   updatedBy:this.mdssDetailsReq.updatedBy,
          swornStatementPdf:"6",
          formAPdf:this.mdssDetailsReq.viabilityReportPdf, 
        };       
        this.spinner.show();
        const response6 = await this.promotersAPI.mdssDocumentsSubonebyone(req6);
        if (response6.success) {this.resultid=7;
          this.spinner.hide();
        }else{ this.resultid=0; this.spinner.hide();}
      }
      if( this.resultid===7){  
        const req7 = {
          branchName:this.mdssDetailsReq.branchName, districtId:this.session.districtId,   mdssId:this.mdssDetailsReq.mdssId, mandalId:this.mdssDetailsReq.mandalId, bankPassBookImage:this.mdssDetailsReq.bankPassBookImage, accountNo:this.mdssDetailsReq.accountNo,  ifscCode:this.mdssDetailsReq.ifscCode,          bankName:this.mdssDetailsReq.bankName,          bankAccountName:this.mdssDetailsReq.bankAccountName,
          pinCode:this.mdssDetailsReq.pinCode,   updatedBy:this.mdssDetailsReq.updatedBy,
          swornStatementPdf:"7",
          formAPdf:this.mdssDetailsReq.bankRemittancePdf, 
        };       
        this.spinner.show();
        const response7 = await this.promotersAPI.mdssDocumentsSubonebyone(req7);
        if (response7.success) {this.resultid=8;
          this.spinner.hide();
        }else{ this.resultid=0; this.spinner.hide();}
      }
      if( this.resultid===8){  
        const req8 = {
          branchName:this.mdssDetailsReq.branchName,districtId:this.session.districtId,    mdssId:this.mdssDetailsReq.mdssId, mandalId:this.mdssDetailsReq.mandalId, bankPassBookImage:this.mdssDetailsReq.bankPassBookImage, accountNo:this.mdssDetailsReq.accountNo,  ifscCode:this.mdssDetailsReq.ifscCode,          bankName:this.mdssDetailsReq.bankName,          bankAccountName:this.mdssDetailsReq.bankAccountName,
          pinCode:this.mdssDetailsReq.pinCode,   updatedBy:this.mdssDetailsReq.updatedBy,
          swornStatementPdf:"8",
          formAPdf:this.mdssDetailsReq.byeLawsPdf, 
        };       
        this.spinner.show();
        const response8 = await this.promotersAPI.mdssDocumentsSubonebyone(req8);
        if (response8.success) {this.resultid=9;
          this.spinner.hide();
        }else{ this.resultid=0; this.spinner.hide();}
      }
      if( this.resultid===9){  
        const req9 = {
          branchName:this.mdssDetailsReq.branchName,districtId:this.session.districtId,    mdssId:this.mdssDetailsReq.mdssId, mandalId:this.mdssDetailsReq.mandalId, bankPassBookImage:this.mdssDetailsReq.bankPassBookImage, accountNo:this.mdssDetailsReq.accountNo,  ifscCode:this.mdssDetailsReq.ifscCode,          bankName:this.mdssDetailsReq.bankName,          bankAccountName:this.mdssDetailsReq.bankAccountName,
          pinCode:this.mdssDetailsReq.pinCode,   updatedBy:this.mdssDetailsReq.updatedBy,
          swornStatementPdf:"9",
          formAPdf:this.mdssDetailsReq.feasibilityReportPdf, 
        };       
        this.spinner.show();
        const response9 = await this.promotersAPI.mdssDocumentsSubonebyone(req9);
        if (response9.success) { this.resultid=10;
          this.spinner.hide();
        }
        else{ this.resultid=0; this.spinner.hide();}
      }

      if(this.resultid===10) { 
        alert("Files submitted successfully "); this.spinner.hide();
        window.location.reload();
      
      
      }
      else{
        const req10 = {
          branchName:this.mdssDetailsReq.branchName,  districtId:this.session.districtId,   mdssId:this.mdssDetailsReq.mdssId, mandalId:this.mdssDetailsReq.mandalId, bankPassBookImage:this.mdssDetailsReq.bankPassBookImage, accountNo:this.mdssDetailsReq.accountNo,  ifscCode:this.mdssDetailsReq.ifscCode,          bankName:this.mdssDetailsReq.bankName,          bankAccountName:this.mdssDetailsReq.bankAccountName,
          pinCode:this.mdssDetailsReq.pinCode,   updatedBy:this.mdssDetailsReq.updatedBy,
          swornStatementPdf:"10",
          formAPdf:this.mdssDetailsReq.feasibilityReportPdf, 
        };       
        this.spinner.show();
        const response10 = await this.promotersAPI.mdssDocumentsSubonebyone(req10);
        if (response10.success) {
          this.spinner.hide();
        }
       alert("Pls try again");
      }
        // const req = {
        //   branchName:this.mdssDetailsReq.branchName,
        //   mdssId:this.mdssDetailsReq.mdssId,
        //   mandalId:this.mdssDetailsReq.mandalId,
        //   bankPassBookImage:this.mdssDetailsReq.bankPassBookImage,
        //   accountNo:this.mdssDetailsReq.accountNo,
        //   ifscCode:this.mdssDetailsReq.ifscCode,
        //   bankName:this.mdssDetailsReq.bankName,
        //   bankAccountName:this.mdssDetailsReq.bankAccountName,
        //   pinCode:this.mdssDetailsReq.pinCode,
        //   updatedBy:this.mdssDetailsReq.updatedBy,
        //   formAPdf:this.mdssDetailsReq.formAPdf,
        //   swornStatementPdf:this.mdssDetailsReq.swornStatementPdf,

        // };

        // const response = await this.promotersAPI.mdssDocumentsSubFirstoff(req);
        // if (response.success) {
        //   this.spinner.hide();
        //   const req1 = {
        //     branchName:this.mdssDetailsReq.branchName,
        //     mdssId:this.mdssDetailsReq.mdssId,
        //     mandalId:this.mdssDetailsReq.mandalId,
        //     bankPassBookImage:this.mdssDetailsReq.bankPassBookImage,
        //     accountNo:this.mdssDetailsReq.accountNo,
        //     ifscCode:this.mdssDetailsReq.ifscCode,
        //     bankName:this.mdssDetailsReq.bankName,
        //     bankAccountName:this.mdssDetailsReq.bankAccountName,
        //     pinCode:this.mdssDetailsReq.pinCode,
        //     updatedBy:this.mdssDetailsReq.updatedBy,
        //     masudhaFormPdf:this.mdssDetailsReq.masudhaFormPdf,
        //     meetingProceedingsPdf:this.mdssDetailsReq.meetingProceedingsPdf,
        //     adhocCommitteePdf:this.mdssDetailsReq.adhocCommitteePdf,
  
        //   };

        //   this.spinner.show();
        //   const response1 = await this.promotersAPI.mdssDocumentsSubSecondoff(req1);
        //   if (response1.success)
        //    {this.spinner.hide();
        //     const req2 = {
        //       branchName:this.mdssDetailsReq.branchName,
        //       mdssId:this.mdssDetailsReq.mdssId,
        //       mandalId:this.mdssDetailsReq.mandalId,
        //       bankPassBookImage:this.mdssDetailsReq.bankPassBookImage,
        //       accountNo:this.mdssDetailsReq.accountNo,
        //       ifscCode:this.mdssDetailsReq.ifscCode,
        //       bankName:this.mdssDetailsReq.bankName,
        //       bankAccountName:this.mdssDetailsReq.bankAccountName,
        //       pinCode:this.mdssDetailsReq.pinCode,
        //       updatedBy:this.mdssDetailsReq.updatedBy,
        //       viabilityReportPdf:this.mdssDetailsReq.viabilityReportPdf,
        //       bankRemittancePdf:this.mdssDetailsReq.bankRemittancePdf,
        //      // byeLawsPdf:this.mdssDetailsReq.byeLawsPdf,
        //       feasibilityReportPdf:this.mdssDetailsReq.feasibilityReportPdf
        //     };

        //     this.spinner.show();
        //         const response2 = await this.promotersAPI.mdssDocumentsSubthirdoff(req2);
        //         if (response2.success) 
        //         { this.spinner.hide();
        //           const req3 = {
        //             branchName:this.mdssDetailsReq.branchName,
        //             mdssId:this.mdssDetailsReq.mdssId,
        //             mandalId:this.mdssDetailsReq.mandalId,
        //             bankPassBookImage:this.mdssDetailsReq.bankPassBookImage,
        //             accountNo:this.mdssDetailsReq.accountNo,
        //             ifscCode:this.mdssDetailsReq.ifscCode,
        //             bankName:this.mdssDetailsReq.bankName,
        //             bankAccountName:this.mdssDetailsReq.bankAccountName,
        //             pinCode:this.mdssDetailsReq.pinCode,
        //             updatedBy:this.mdssDetailsReq.updatedBy,
        //             byeLawsPdf:this.mdssDetailsReq.byeLawsPdf,
        //           };  this.spinner.show();                
        //           const response3 = await this.promotersAPI.mdssDocumentsSubbylaw(req3);
        //           if (response3.success) 
        //           { this.spinner.hide();
        //             alert(response2.message);
        //             window.location.reload();
        //           }
        //           else
        //           { this.spinner.hide();
        //             this.toast.info("Not Upload files pls check it");
        //           }
        //         }
        //         else{ this.spinner.hide();
        //           this.toast.info("Not Upload files pls check it");
        //           }


        //         }
        //         else{ this.spinner.hide();
        //           this.toast.info("Not Upload files pls check it");
        //         }

        //   }
        //   else{ this.spinner.hide();
        //     this.toast.info("Not Upload files pls check it");
        //   }
          
        }
         else {
            this.spinner.hide();
          // this.toast.info(response.message);
        }
       
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  // async btnSubmit(): Promise<void> {
  //   try {
  //     if (this.validate()) {
  //       this.spinner.show();
  //       const response = await this.promotersAPI.mdssDocumentsSub(
  //         this.mdssDetailsReq
  //       );
  //       if (response.success) {
  //         alert(response.message);
  //         window.location.reload();
  //       } else {
  //         this.spinner.hide();
  //         this.toast.info(response.message);
  //       }
  //     }
  //   } catch (error) {
  //     this.spinner.hide();
  //     this.utils.catchResponse(error);
  //   }
  // }

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

    // if (this.utils.isEmpty(this.mdssDetailsReq.bankPassBookImage)) {
    //   this.toast.warning('Please Upload Bank PassBook Front Page Photo ');
    //   return;
    // }

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
      debugger;
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.PDF,
        this.utils.fileSize.fiveMB
      );
      if (res) {
                
        this.mdssDetailsReq.formAPdf = res.replace('data:application/pdf;base64,','');
console.log(this.mdssDetailsReq.formAPdf);


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
        this.utils.fileSize.threeMB
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
        this.utils.fileSize.threeMB
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
      debugger;
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.PDF,
        this.utils.fileSize.threeMB
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
        this.utils.fileSize.threeMB
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
        this.utils.fileSize.threeMB
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
        this.utils.fileSize.threeMB
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
        this.utils.fileSize.threeMB
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
        this.utils.fileSize.threeMB
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
      this.divreject=false;
          document.getElementById('APPROVED').style.display='none'; 
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
  async onRbkapprovedChange(): Promise<void> {
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
        rbkId: this.mdssDetailsReq.rbkId,
      };
      this.spinner.show();
      const response = await this.promotersAPI.mdssDocDetailsByRbkId(req);
      this.spinner.hide();debugger;
      if (response.success) {
        this.submittedMdssDetails = response.result[0];
        this.mdssDetailsReq.mdssId = this.submittedMdssDetails.MDSS_CODE;
debugger;

        if (!this.utils.isEmpty(this.submittedMdssDetails.BANK_PASSBOOK_IMAGE)) 
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

  btnDashboardDetails(id): void {
    
    this.reportType = id;
    if (id === '1') {  
        this.allcontrolscleardata();  this.mdssDetailsRejectedLIST =[];this.rbkList =[];this.divreject=false;
          document.getElementById('REJECTED').style.display='none';
          document.getElementById('APPROVED').style.display='none';
           document.getElementById('PENDING').style.display='block';      
      this.loadRBKList();
      //doc list 
      this.loadDOCSList();
          
    } else if (id === '2') {  //onRbkapprovedChange
       this.allcontrolscleardata();this.mdssDetailsRejectedLIST =[];this.divreject=false;
        document.getElementById('APPROVED').style.display='block';
        document.getElementById('REJECTED').style.display='none';
      // document.getElementById('ROLLBACK').style.display='none';
         document.getElementById('PENDING').style.display='none';
        this.loadApprovedRbkList();this.rbkList =[];
      
    }else if (id === '3') {
        // this.allcontrolscleardata();
        document.getElementById('REJECTED').style.display='block';  
        document.getElementById('APPROVED').style.display='none';       
        document.getElementById('PENDING').style.display='none'; 

         
       // this.allcontrolscleardata();  
        // document.getElementById('REJECTED').style.display='none';
        // document.getElementById('APPROVED').style.display='none';
        //  document.getElementById('PENDING').style.display='block'; 
        this.mdssDetailsRejectedLIST =[]; this.rbkList =[];
        this.divreject=false; 
        this.loadDOCSList();     
         this.loadRejectRbkList();
      
    }else if (id === '4') { 
      // document.getElementById('APPROVED').style.display='none';
      // document.getElementById('REJECTED').style.display='none';
      // document.getElementById('ROLLBACK').style.display='block';
      // document.getElementById('PENDING').style.display='none'; 
  } 
  } 

//  Start PENDING

async loadRBKList(): Promise<void> {
  try {
    this.noDataMessage = '';
    // const req = {        
    //   uniqueId: this.session.rbkGroupId,
    // };
    
      const req = {        
       pid: this.session.rbkGroupId,
      type:13, 
      uniqueId: this.session.rbkGroupId,
      //pid:this.session.userName,      
      pdistCode: this.session.districtId,
      pdivisionCode: this.session.divisionId,
      prbkCode:this.session.districtId,
    };
    this.rbkList =[];
    this.spinner.show();
    //const response = await this.promotersAPI.rbkListByMentorId(req);
    const response = await this.promotersAPI.mdsschecklist(req);
    this.spinner.hide();
    if (response.success) {
      this.rbkList = response.result;
    } else {
      this.toast.info(response.message);
    }
  } catch (error) {
    this.spinner.hide();
   //  this.utils.catchResponse(error);
   if(error!="")   this.toast.info("No Rsk Found");
   else
   this.utils.catchResponse("No Rsk Found");
  }
}
async onRbkChange(): Promise<void> {
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
      rbkId: this.mdssDetailsReq.rbkId,updatedBy:this.session.uniqueId
    };
    this.spinner.show();
    const response = await this.promotersAPI.mdssDocDetailsByRbkId(req);
    this.spinner.hide();
    if (response.success) {
      debugger;
      this.submittedMdssDetails = response.result[0];
      this.mdssDetailsReq.mdssId = this.submittedMdssDetails.MDSS_CODE;
      this.mdssDetailsReq.bankPassBookImage="";
//#region  REMARKS
      // if (          !this.utils.isEmpty(this.submittedMdssDetails.BANK_PASSBOOK_IMAGE)        ) 
      // {
      //   this.passBookImg = await this.getBaseFile(this.submittedMdssDetails.BANK_PASSBOOK_IMAGE);
      // }

      // if (!this.utils.isEmpty(this.submittedMdssDetails.FORM_A_PDF)) 
      // {
      //   this.formAViewPdf = await this.getBaseFile(this.submittedMdssDetails.FORM_A_PDF );
      // }

      // if (!this.utils.isEmpty(this.submittedMdssDetails.SWORN_STATEMENT_PDF))
      //  {
      //   this.swornStatementViewPdf = await this.getBaseFile(this.submittedMdssDetails.SWORN_STATEMENT_PDF  );
      // }

      // if (!this.utils.isEmpty(this.submittedMdssDetails.MASUDHA_FORM_PDF))
      //  {
      //   this.masudhaFormViewPdf = await this.getBaseFile(this.submittedMdssDetails.MASUDHA_FORM_PDF );
      // }

      // if ( !this.utils.isEmpty(this.submittedMdssDetails.MEETING_PROCEDINGS_PDF)) 
      // {
      //   this.meetingProceedingsViewPdf = await this.getBaseFile( this.submittedMdssDetails.MEETING_PROCEDINGS_PDF);
      // }

      // if (!this.utils.isEmpty(this.submittedMdssDetails.REQ_LETTER_ADHOCK_COM_PDF )) 
      //   {
      //   this.adhocCommitteeViewPdf = await this.getBaseFile(this.submittedMdssDetails.REQ_LETTER_ADHOCK_COM_PDF );
      // }

      // if (!this.utils.isEmpty( this.submittedMdssDetails.ECONOMIC_VIABILITY_REP_PDF  )  ) 
      // {
      //   this.viabilityReportViewPdf = await this.getBaseFile( this.submittedMdssDetails.ECONOMIC_VIABILITY_REP_PDF );
      // }

      // if ( !this.utils.isEmpty( this.submittedMdssDetails.BANK_REMITTANCE_CERTI_PDF)) 
      // {
      //   this.bankRemittanceViewPdf = await this.getBaseFile(this.submittedMdssDetails.BANK_REMITTANCE_CERTI_PDF );
      // }

      // if (!this.utils.isEmpty(this.submittedMdssDetails.BYE_LAW_PDF)) 
      // {         
      //    this.byeLawsViewPdf = await this.getBaseFile(this.submittedMdssDetails.BYE_LAW_PDF );
      // }

      // if (!this.utils.isEmpty(this.submittedMdssDetails.FESABILITY_REPORT_PDF))
      //  {
      //   this.feasibilityReportViewPdf = await this.getBaseFile( this.submittedMdssDetails.FESABILITY_REPORT_PDF );
      // }
//#endregion
      if (this.submittedMdssDetails.IS_MDSS_BANK_SUBMITTED === '0' || this.submittedMdssDetails.IS_MDSS_BANK_SUBMITTED === '1')
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
        pid:this.session.rbkGroupId,//this.session.userName,  
        uniqueid:this.session.rbkGroupId,  
           pdistCode: this.session.districtId,
       pdivisionCode: this.session.divisionId,
       prbkCode:this.session.districtId,
    };
    this.mdssDetailsRejectedLIST =[];
    this.spinner.show(); 
    const response = await this.promotersAPI.mdsschecklist(req); 
    this.spinner.hide();
    if (response.success) {
      this.mdssDetailsRejectedLIST = response.result;

    } else {
      this.toast.info(response.message);
    }
  } catch (error) {
    this.spinner.hide();
     this.utils.catchResponse(error);
  //  if(error!="")   this.toast.info("No Rbk Found");
  //  else
  //  this.utils.catchResponse("No Rbk Found");
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

async loadDOCSList(): Promise<void> {
  try {
    
    
    const req = {        
      type:14,       
         pdistCode: this.session.districtId,
     pdivisionCode: this.session.divisionId,
     prbkCode:this.session.districtId,
  };
  this.mdssDOCSLIST =[];
  this.spinner.show(); 
  const response = await this.promotersAPI.mdsschecklist(req); 
  this.spinner.hide();
  if (response.success) {
    this.mdssDOCSLIST = response.result;
  } else {
    this.toast.info(response.message);
  }
  } catch (error) {
    this.spinner.hide();
       this.utils.catchResponse(error);
    // if(error!="")   this.toast.info("Not Found");
    // else
    // this.utils.catchResponse("Not Found");
  }
}


async onRbkRejectChange(): Promise<void> {
  try { 

    if (this.utils.isEmpty(this.mdssDetailsReq.rbkRejectId)) {
      this.divreject=false;
      this.toast.warning('Please Select RSK');
      return;
    }
    this.divreject=true;

this.loadBindpdfList();


 
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}

 
async btnuploaddocSubmit(): Promise<void> {
  try {
    if (this.validateReject()) {

this.emptypdf="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";

      
      const req={
      type:'7',
      rbkId: this.mdssDetailsReq.rbkRejectId,
      pinCode:this.DOCSId,
      formAPdf:this.mdssDetailsReq.formAPdf,


      swornStatementPdf:this.emptypdf,//this.mdssDetailsReq.formAPdf,
      masudhaFormPdf:this.emptypdf,//this.mdssDetailsReq.formAPdf,
      meetingProceedingsPdf:this.emptypdf,//this.mdssDetailsReq.formAPdf,
      adhocCommitteePdf:this.emptypdf,//this.mdssDetailsReq.formAPdf,
      viabilityReportPdf:this.emptypdf,//this.mdssDetailsReq.formAPdf,
      bankRemittancePdf:this.emptypdf,//this.mdssDetailsReq.formAPdf,
      byeLawsPdf:this.emptypdf,//this.mdssDetailsReq.formAPdf,
      feasibilityReportPdf:this.emptypdf,//this.mdssDetailsReq.formAPdf,


      updatedBy:this.session.userName,
      districtId:this.session.districtId,
      mandalId:this.session.mandalId,
      }
      this.spinner.show();
      const response = await this.promotersAPI.mdssDocumentsRejectSub(
        req
      );

      if (response.success) {

         this.loadDOCSList();
         this.formUpload  ="";

        alert(response.message);
        this.onRbkRejectChange();
         //window.location.reload();

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

validateReject(): boolean {
  if (this.utils.isEmpty(this.mdssDetailsReq.rbkRejectId)) {
    this.toast.warning('Please Select RSK');
    return;
  }
  if (this.utils.isEmpty(this.DOCSId)) {
    this.toast.warning('Please Select Document');
    return;
  }

  if (this.utils.isEmpty(this.mdssDetailsReq.formAPdf)) {
    this.toast.warning('Please Select Document');
    return;
  }

  
  return true;
}




async onFormRejectChange(event): Promise<void> {
  try {
    if (this.utils.isEmpty(this.mdssDetailsReq.rbkRejectId)) {
      this.toast.warning('Please Select RSK');
      return;
    }

    if (this.utils.isEmpty(this.DOCSId)) {
      this.toast.warning('Please Select Document');
      return;
    }

    const res = await this.utils.encodedString(
      event,
      this.utils.fileType.PDF,
      this.utils.fileSize.threeMB
    );
    if (res) {
     // if(this.DOCSId==='1001')
      this.mdssDetailsReq.formAPdf = res.replace('data:application/pdf;base64,','');  
      this.mdssDetailsReq.swornStatementPdf =this.mdssDetailsReq.formAPdf;
      this.mdssDetailsReq.masudhaFormPdf =this.mdssDetailsReq.formAPdf;
      this.mdssDetailsReq.meetingProceedingsPdf = this.mdssDetailsReq.formAPdf;
      this.mdssDetailsReq.adhocCommitteePdf = this.mdssDetailsReq.formAPdf;
      this.mdssDetailsReq.viabilityReportPdf = this.mdssDetailsReq.formAPdf;
      this.mdssDetailsReq.bankRemittancePdf =this.mdssDetailsReq.formAPdf;
      this.mdssDetailsReq.byeLawsPdf = this.mdssDetailsReq.formAPdf;
      this.mdssDetailsReq.feasibilityReportPdf =this.mdssDetailsReq.formAPdf;
    //   else if(this.DOCSId==='1002'){
    //   this.mdssDetailsReq.swornStatementPdf = res.replace('data:application/pdf;base64,','');this.mdssDetailsReq.formAPdf = this.mdssDetailsReq.swornStatementPdf
    //    } else if(this.DOCSId==='1003'){
    //   this.mdssDetailsReq.masudhaFormPdf = res.replace('data:application/pdf;base64,','');this.mdssDetailsReq.formAPdf = this.mdssDetailsReq.masudhaFormPdf
    // }  else if(this.DOCSId==='1004'){
    //   this.mdssDetailsReq.meetingProceedingsPdf = res.replace('data:application/pdf;base64,','');this.mdssDetailsReq.formAPdf = this.mdssDetailsReq.meetingProceedingsPdf
    // }  else if(this.DOCSId==='1005'){
    //   this.mdssDetailsReq.adhocCommitteePdf = res.replace('data:application/pdf;base64,','');this.mdssDetailsReq.formAPdf = this.mdssDetailsReq.adhocCommitteePdf
    // }  else if(this.DOCSId==='1006'){
    //   this.mdssDetailsReq.viabilityReportPdf = res.replace('data:application/pdf;base64,','');this.mdssDetailsReq.formAPdf = this.mdssDetailsReq.viabilityReportPdf
    // }  else if(this.DOCSId==='1007'){
    //   this.mdssDetailsReq.bankRemittancePdf = res.replace('data:application/pdf;base64,','');this.mdssDetailsReq.formAPdf = this.mdssDetailsReq.bankRemittancePdf
    // }  else if(this.DOCSId==='1008'){
    //   this.mdssDetailsReq.byeLawsPdf = res.replace('data:application/pdf;base64,','');this.mdssDetailsReq.formAPdf = this.mdssDetailsReq.byeLawsPdf
    // }  else if(this.DOCSId==='1009'){
    //   this.mdssDetailsReq.feasibilityReportPdf = res.replace('data:application/pdf;base64,','');this.mdssDetailsReq.formAPdf = this.mdssDetailsReq.feasibilityReportPdf
    // } 
// formAPdf
// swornStatementPdf
// masudhaFormPdf
// meetingProceedingsPdf
// adhocCommitteePdf
// viabilityReportPdf
// bankRemittancePdf
// byeLawsPdf
// feasibilityReportPdf


    }
  } catch (error) {
    this.utils.catchResponse(error);
  }
}





async btnRejectSUBMITTODLCO(): Promise<void> {
  try {
    if (this.utils.isEmpty(this.mdssDetailsReq.rbkRejectId)) {
      this.toast.warning('Please Select RSK');
      return;
    }
    const req = {
      type:'3',
      rbkId: this.mdssDetailsReq.rbkRejectId,
    };

    this.spinner.show();
    const response = await this.promotersAPI.mdssDocumentsEditandSub(
      req
    );
    if (response.success) {
      alert("Record Submitted to DLCO");
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



async loadBindpdfList(): Promise<void> {
  try {  
     
    if (this.utils.isEmpty(this.mdssDetailsReq.rbkRejectId)) {
      this.toast.warning('Please Select RSK');
      return;
    }

    const req = {
      type:15,
     
      pdistCode: this.mdssDetailsReq.rbkRejectId,
      pdivisionCode: this.session.divisionId,
      prbkCode:this.mdssDetailsReq.rbkRejectId,
    };
    this.mandalLevelDetails = [];
    this.spinner.show();
    const res = await this.promotersAPI.mdsschecklist(req);
    this.spinner.hide();
    this.mandalLevelDetails = [];
    if (res.success) {
      this.mandalLevelDetails = res.result;

      console.log(this.mandalLevelDetails);
    } else {
      this.toast.info(res.message);
    }
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}

  btnDocumentDownloadpdf(url):  void  {
  if (this.utils.isEmpty(url)) {
    this.toast.warning('Document Not Found !!!');
  } else { 
    window.open(url, '_blank');
  }
}



// async btnPdfView(pdf): Promise<void> {
//   try {
//      this.passBookImg = await this.getBaseFile(pdf);
//      this.utils.downloadPdf(this.passBookImg,pdf);
//      //this.utils.viewPDF( this.passBookImg ); 
//   //  this.btnDocumentDownloadpdf(this.utils.mdssUrl() +pdf);
 
//   } catch (error) {
//     this.spinner.hide();
//     this.utils.catchResponse(error);
//   }
// }

// End RollBack


async btnPdfView(pdf): Promise<void> {
  try {
    this.spinner.show();
    const res = await this.utils.CommissionerFileDownload(pdf);
    if (res.success) {
      this.utils.downloadPdf(res.result,pdf);
     // this.utils.viewPDF(res.result);
      // let signedByPdf = 'data:application/pdf, ' + res.result;
      // window.open(signedByPdf, '_blank');
    } else {
      this.toast.info(res.message);
    }
    this.spinner.hide();
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}

btnimgView(): void { 
  this.utils.viewImage(this.mdacPassBookImg);
  // this.toast.showImage(image);
}

 

// async btnViewFormADoc(): Promise<void> {
//   try {
     
//     // if(id==="0") this.docid= this.mdssDetailsReq.rbkId;
//     // if(id==="1") this.docid= this.mdssDetailsReq.rbkRejectId;

//     const req = {
//       rbkId:this.RBKDDSelected,//this.docid,// this.mdssDetailsReq.rbkId,
//     };
//     this.spinner.show();
//     const response = await this.promotersAPI.forma(req);
//     this.spinner.hide();
//     if (response.success) {
//       this.utils.viewPDF(response.result);
//     }
//   } catch (error) {
//     this.spinner.hide();
//     this.utils.catchResponse(error);
//   }
// }

async btnApprovedExcelDownload(): Promise<void> {
  this.utils.JSONToCSVConvertor(
    this.exceldata,
    'Approved Details Report',
    true
  );
}

async btnPdfesign(pdf): Promise<void> {
  try {
    this.btnDocumentDownloadpdf(this.utils.crystalReportsesignUrl() +pdf);
 
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }

}
esignrbkcode='';
esigndistrictcode='';
esigncrystalfile='';
async btnPdfGenerateadhok(pdf):Promise<void>
{
try{
var str = pdf.split(',');
this.esignrbkcode=str[1];
this.esigndistrictcode=str[2];
if(str[0]=="1")
{
 const req = { type:"4014",rbkId:this.esignrbkcode }; 
this.spinner.show();
const res =await this.dlcoAPI.MDssDlcoandDCOandGMRPT(req); 
 
if (res.success) { 
 
this.esigncrystalfile=res.result;
 const request = { type:"8",rbkId:this.esignrbkcode,status:this.session.districtId,applicationPdfForm:this.esigncrystalfile,updatedBy:this.session.uniqueId };
 
 const respon=await this.dlcoAPI.eSignDocumentsInsert(request); 
 
 if(respon.success){

   this.utils.downloadPdfFile(this.esigncrystalfile,this.esignrbkcode);
   this.toast.success('Download Certificate Successfully');
 }else{
  this.toast.info(res.message);
 }

  
  
} else {   
 this.toast.info(res.message);
}
this.spinner.hide();


}
else{
 this.btnPdfView(str[0]);
 
}

}catch (error) {
this.spinner.hide();
this.utils.catchResponse(error);

}
}

async btnPdfGenerateProcedings(pdf):Promise<void>
{
try{
var str = pdf.split(',');
this.esignrbkcode=str[1];
this.esigndistrictcode=str[2];
if(str[0]=="1")
{
 const req = { type:"4004",rbkId:this.esignrbkcode }; 
this.spinner.show();
const res =await this.dlcoAPI.MDssDlcoandDCOandGMRPT(req); 
debugger;
if (res.success) { 
 
this.esigncrystalfile=res.result;
 const request = { type:"7",rbkId:this.esignrbkcode,status:this.session.districtId,applicationPdfForm:this.esigncrystalfile,updatedBy:this.session.uniqueId };
 debugger
 const respon=await this.dlcoAPI.eSignDocumentsInsert(request); 
 debugger;
 if(respon.success){

   this.utils.downloadPdfFile(this.esigncrystalfile,this.esignrbkcode);
   this.toast.success('Download Certificate Successfully');
 }
 else{
  this.toast.info(res.message);
 }
 

  
  
} else {   
 this.toast.info(res.message);
}
this.spinner.hide();


}
else{
 this.btnPdfView(str[0]);
 
}

}catch (error) {
this.spinner.hide();
this.utils.catchResponse(error);

}
}


async btnPdfGeneratebylaw(pdf):Promise<void>
{
try{
var str = pdf.split(',');
this.esignrbkcode=str[1];
this.esigndistrictcode=str[2];
if(str[0]=="1")
{
 const req = { type:"555",rbkId:this.esignrbkcode }; 
this.spinner.show();


const res =await this.dlcoAPI.MDssDlcoandDCOandGMRPT(req); 
debugger;
if (res.success) { 
 
this.esigncrystalfile=res.result;
 const request = { type:"6",rbkId:this.esignrbkcode,status:this.session.districtId,applicationPdfForm:this.esigncrystalfile,updatedBy: this.session.uniqueId };
 const respon=await this.dlcoAPI.eSignDocumentsInsert(request);
 debugger;
 if(respon.success){

   this.utils.downloadPdfFile(this.esigncrystalfile,this.esignrbkcode);
   this.toast.success('Download Certificate Successfully');
 }
 else{
   this.toast.info(res.message);
  }

  
  
} else {   
 this.toast.info(res.message);
}
this.spinner.hide();


}
else{
 this.btnPdfView(str[0]);
// this.btnDocumentDownloadpdf(this.utils.crystalReportsesignUrl() +str[0]);
}

}catch (error) {
this.spinner.hide();
this.utils.catchResponse(error);

}
}


}
