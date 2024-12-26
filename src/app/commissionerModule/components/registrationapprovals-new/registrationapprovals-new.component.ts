import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, QueryList, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { DlcoService } from 'src/app/dlcoModule/services/dlco.service';
import { GmService } from 'src/app/gmModule/serice/gm.service';
import { MdssService } from 'src/app/mdssModule/services/mdss.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ServiceService } from '../../services/service.service';
 

@Component({
  selector: 'app-registrationapprovals-new',
  templateUrl: './registrationapprovals-new.component.html',
  styleUrls: ['./registrationapprovals-new.component.css']
})
export class RegistrationapprovalsNewComponent implements OnInit {
  reportType='';txtremarks1='';
  registrationapprovalsList = [];filesList=[];pdfdata=false;
    PENDING=true;PENDINGDTS=false; 
    rbkid='';DIST_CODE='';MANDAL_CODE='';id='0';idno='0';
    PENDAPROREJCT_ID=0;
    Rbkname='';


    
  @ViewChild(DataTableDirective,{static:false})
  // dtElements!: QueryList<DataTableDirective>;
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
 
  dtTrigger: Subject<any> = new Subject();

  DistrictList=[];
  DivisionList=[];
  DistSelected:any;
  DivSelected:any;
  esignPopup = false;
  esignCheckText='';   

  PENDING_div=false;
  APPROVED_div=false;
  REJECTED_div=false;
  Districtdiv=false;
  APPROVEDdiv=false;

  PENDING_divDoc=false;
  APPROVEDdivDoc=false;
  REJECTED_divDoc=false;

  PENDINGCount_COM:0;
  APPROVEDCount_COM:0;
  ROLLBACKCount_COM:0;
 // pendingrbksdistdiv=false;
  registrationsubmitedList=[];
  APPROVED='';APPROVED1=false;
  tremarks=false;
  registrationRejectedList=[];
  REJECTED='';
  REJECTED1=false;
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
  pBYE_LAW_REGNO_PDF='';
  pBYE_LAW_REGNO_PDF1='';
  BYE_LAW_PDF = '';
  BYE_LAW_PDF1 = '';
  FESABILITY_REPORT_PDF = '';
  FESABILITY_REPORT_PDF1 = '';
  REGISTRATION_CERTIFICATE = '';
  PROCEDDINGS_ORDERS = '';
  PROCEDDINGS_ADHOCK = '';
  BYE_LAW_REGISTARION = '';

  DLCO_CERT = '';
  DLCO_CERT1 = '';
 
  DCO_CERT='';
  DCO_CERT1 ='';
 
  GM_CERT='';
  GM_CERT1='';
  COMM_BYLAW_CERT='';
  COMM_BYLAW_CERT1='';
  COMM_REG_CERT='';
  COMM_REG_CERT1='';
  COMM_PROC_CERT='';
  COMM_PROC_CERT1='';
  COMM_ADHOC_CERT='';
  COMM_ADHOC_CERT1='';

  aresign=false;
  DCOesign=false;
  DlCOesign=false;
  ProceddingsesignEmpty=false;
  ProceddingsesignUpdate=false;
  byeLawesignEmpty=false;
  byeLawesignUpdate=false;
  RegistrationesignEmpty=false;
  RegistrationesignUpdate=false;
  ProceddingEmpty=false;
  ProceddingUpdate=false;

  REGISTRATION_CERTIFICATE1 = '';
  PROCEDDINGS_ORDERS1 = '';
  PROCEDDINGS_ADHOCK1 = '';
  BYE_LAW_REGISTARION1 = '';
  INSERTED_BY = '';
  RBKDISTMANDALCODES = '';
  str = '';
  constructor(private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private utils: UtilsService,
    private session: SessionService,
    private commAPI: ServiceService,
    private promotersAPI: MdssService,
    private GMAPI: GmService,
    private dlcoAPI: DlcoService,
    private router:Router) { }

  ngOnInit(): void {
   
    if(this.session.uniqueId !="" && this.session.desigId != ""){
      this.loadingCount();
    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    } //this.LoadData(); 
        // document.getElementById('PENDINGDTS').style.display='none';
        // document.getElementById('APPROVED').style.display='none';
        // document.getElementById('REJECTED1').style.display='none';
        // document.getElementById('REJECTED').style.display='none';
       // this.loadingCount(); 
        
  }

  async loadingCount():Promise<void>{
    try{
const req={type:32,pid:this.session.uniqueId};
this.spinner.show();
debugger;
const res=await this.GMAPI.mdsschecklist(req);

if (res.success) {
  this.spinner.hide();

  this.PENDINGCount_COM=res.result[0].PENDING_RBKS_COM;
  this.APPROVEDCount_COM=res.result[0].APPROVED_RBKS_COM;
  this.ROLLBACKCount_COM=res.result[0].REJECTED_RBKS_COM;
    
} else {    
  this.toast.info(res.message);
}

    }
    catch (error) {
      this.spinner.hide();
      //  this.utils.catchResponse(error);
    if(error!="")   this.toast.info("No Rsk Found");
    else
    this.utils.catchResponse("No Rsk Found");
   
    }
  
  }
  type='';
  async LoadData(): Promise<void> {
    try {
      const req = { ptype:22, 
        pdist:this.DistSelected,
        
      };      
      this.spinner.show();
      // const res = await this.commAPI.CommissionerFinalGet(req); 
       const res = await this.commAPI.CommissionerFinalGetDetails(req); 
       debugger;
      this.registrationapprovalsList = []; this.pdfdata=false;
        
      if (res.success) { 
        this.PENDING_divDoc=true;
  this.APPROVEDdivDoc=false;
  this.REJECTED_divDoc=false;
        this.registrationapprovalsList = res.result; 
        this.spinner.hide();

      } else {   
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      //  this.utils.catchResponse(error);
    if(error!="")   this.toast.info("No Rsk Found");
    else
    this.utils.catchResponse("No Rsk Found");
    }
  }


  async LoadApprovedData(): Promise<void> {
    try {
      const req = { type:"5",rbkId:this.session.uniqueId,status:this.DistSelected }; 
      this.spinner.show();
      // const res = await this.commAPI.CommissionerFinalGet(req); 
       const res = await this.commAPI.eSignDocumentsGet(req); 
       debugger;
       console.log(res);
      this.registrationsubmitedList = [];  
      if (res.success) { 
        this.APPROVED_div=true;
        this.PENDING_divDoc=false;
        this.APPROVEDdivDoc=true;
        this.REJECTED_divDoc=false;
        this.registrationsubmitedList = res.result; 
      
        
        //document.getElementById('APPROVED1').style.display='block';
      } else {   
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
     //  this.utils.catchResponse(error);
     
    }
  }


  

  async LoadRejectedData(): Promise<void> {
    try {
      const req = { ptype:222, }; 
     
       
       const res = await this.commAPI.CommissionerFinalGetDetails(req); 
       this.registrationRejectedList = [];  
      if (res.success) { 
         
        this.registrationRejectedList = res.result; 
      } else {   
        this.toast.info(res.message);
      }
     
    } catch (error) {
     
     //  this.utils.catchResponse(error);
    if(error!="")   this.toast.info("No Rsk Found");
    else
    this.utils.catchResponse("No Rsk Found");
    }
  }






  btnDashboardDetails(id): void {
    
    this.REJECTED_div =false;

    this.reportType = id;
    if (id === '1') {  this.registrationRejectedList=[]; //this.LoadData(); 
    this.PENDING_div =true;
    this.APPROVED_div =false;
    this.REJECTED_div =false;

    this.PENDING_divDoc=false;
  this.APPROVEDdivDoc=false;
  this.REJECTED_divDoc=false;
    

      // document.getElementById('PENDING').style.display='block';
      // document.getElementById('PENDINGDTS').style.display='none';
      // document.getElementById('APPROVED').style.display='none';
      // document.getElementById('REJECTED1').style.display='none';
      // document.getElementById('REJECTED').style.display='none';

        // document.getElementById('PENDINGDTS').style.display='none';
        // document.getElementById('APPROVED').style.display='none';
        // document.getElementById('REJECTED').style.display='none';

      //  this.pendingrbksdistdiv=true;

      this.DistrictList=[];this.DivisionList=[]; 
      this.DistSelected="0";this.DivSelected="0"; 
      this.PENDAPROREJCT_ID=1;
    
     this.loadDistrictList('99');
    } else if (id === '2') {
      this.PENDING_div =false;
      this.APPROVED_div =true;
      this.REJECTED_div =false;

      this.PENDING_divDoc=false;
  this.APPROVEDdivDoc=false;
  this.REJECTED_divDoc=false;
       
       this.registrationapprovalsList = [];   this.pdfdata=false; this.registrationRejectedList=[];
      // document.getElementById('PENDINGDTS').style.display='none';
      // document.getElementById('PENDING').style.display='none';
      // document.getElementById('APPROVED').style.display='block';
      // document.getElementById('REJECTED').style.display='none';
        this.PENDAPROREJCT_ID=2;
      this.DistrictList=[];this.DivisionList=[]; 
      this.DistSelected="0";this.DivSelected="0";
     // this.LoadApprovedData(); 
     this.loadDistrictList('9999');
      
    }else if (id === '3') {
      this.REJECTED_div =false;
      this.PENDING_div =false;
      this.APPROVED_div =false;
      
      this.PENDING_divDoc=false;
  this.APPROVEDdivDoc=false;
  this.REJECTED_divDoc=true;
      this.LoadRejectData();
       this.registrationapprovalsList = [];this.pdfdata=false; 
     // this.LoadRejectedData(); 
      //  document.getElementById('PENDINGDTS').style.display='none';
      //   document.getElementById('APPROVED').style.display='none';
      //   document.getElementById('PENDING').style.display='none';
      //    document.getElementById('REJECTED').style.display='block';
      //  document.getElementById('REJECTED1').style.display='block'; 
       this.DistrictList=[];this.DivisionList=[]; 
      this.DistSelected="0";this.DivSelected="0";
       this.PENDAPROREJCT_ID=3; 
       // this.loadDistrictList('999');
    }

   
    
  } 


   rbkcode="";
  btnAllPdf(RBKDISTMANDALCODES): void {
   //  document.getElementById('PENDINGDTS').style.visibility = "visible";
    //this.Pdfhide();
    this.tremarks=true;
    var str = RBKDISTMANDALCODES.split(',');
    this.rbkcode=str[0];
    this.rbkid = str[0];
    this.DIST_CODE = str[1];
    this.MANDAL_CODE = str[2];
    var RBK_CODE = this.rbkid;
    this.Rbkname=str[0];
    if (!this.utils.isEmpty(RBK_CODE)) {
      if(this.id='0'){
      this.LoadFiles(RBK_CODE);
      this.LoadFiles(RBK_CODE);}
     // else if(this.id='1')
     //this.ApprovedLoadFiles(RBK_CODE);
     
    } else {
      this.toast.warning('Data Not Available');
    }
  }

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
  async btnPdfView1(pdf): Promise<void> {
    try {
      var p=pdf.split(',')[0];  this.btnPdfView(p);
      var p2=pdf.split(',')[1]; this.btnPdfView(p2);//  +','+obj.pBYE_LAW_REGNO_PDF
      this.spinner.show();
      const res = await this.utils.CommissionerFileDownload(pdf);
      if (res.success) {
        this.utils.viewPDF(res.result); 
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
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

      // this.commRegistrationCertificate(RBK_CODE);
      // this.commPROCEDDINGS_ORDERS(RBK_CODE);
      // this.commPROCEDDINGS_ADHOCK(RBK_CODE);
      // this.commBYE_LAW_REGISTARION(RBK_CODE);

      //LOG
     // this.displayStyle = "block";
    } else {
     // this.displayStyle = "none";
      this.toast.info(res.message);
    }
    this.spinner.hide();
  }
  
  async LoadFiles(RBK_CODE): Promise<void> {
    const req = {
      prbk: RBK_CODE

    };
    //this.spinner.show();
     
       
    document.getElementById('PENDINGDTS').style.display='none';
      const res = await this.commAPI.CommissionerLoadpdfsGet(req);  
      this.pdfdata=true;
      
    if (res.success) {

      if(res.result[0]["COMM_PROC_STATUS"]=="0")
          {
           this.ProceddingsesignEmpty=true;
           this.ProceddingsesignUpdate=false;
           
          }
      if(res.result[0]["COMM_PROC_STATUS"]=="1")
          {
            this.ProceddingsesignEmpty=false;
            this.ProceddingsesignUpdate=true;
          }

          if(res.result[0]["COMM_BYLAW_STATUS"]=="0")
          {
            this.byeLawesignEmpty=true;
           this.byeLawesignUpdate=false;
          
          }
          if(res.result[0]["COMM_BYLAW_STATUS"]=="1")
          {
            this.byeLawesignEmpty=false;
            this.byeLawesignUpdate=true;
          }

          if(res.result[0]["COMM_ADHOC_STATUS"]=="0")
          {
            
            this.ProceddingEmpty=true;
            this.ProceddingUpdate=false;
          }
          if(res.result[0]["COMM_ADHOC_STATUS"]=="1")
          {
            this.ProceddingEmpty=false;
            this.ProceddingUpdate=true;
          }
          if(res.result[0]["COMM_REG_STATUS"]=="0")
          {
            this.RegistrationesignEmpty=true;
            this.RegistrationesignUpdate=false;
          }
          if(res.result[0]["COMM_REG_STATUS"]=="1")
          {
            this.RegistrationesignEmpty=false;
            this.RegistrationesignUpdate=true;
          }
      document.getElementById('PENDINGDTS').style.display='block';
      
      this.filesList = res.result;
      if (!this.utils.isEmpty(res.result[0]["RBK_CODE"])) { this.RBK_CODE = res.result[0]["RBK_CODE"]; }
      if (!this.utils.isEmpty(res.result[0]["MDSS_CODE"])) { this.MDSS_CODE = res.result[0]["MDSS_CODE"]; }
      this.PENDINGDTS=true;

      if (!this.utils.isEmpty(res.result[0]["FORM_A_PDF"])) {
        
        //FORM_A_PDF
        this.FORM_A_PDF = res.result[0]["FORM_A_PDF"];//await this.getBaseFile(res.result[0]["FORM_A_PDF"]);
        this.FORM_A_PDF1 = this.FORM_A_PDF;
        document.getElementById('FORM_A').style.visibility = "visible";
       // this.FORM_A_PDF2=res.result[0]["FORM_A_PDF"]; 
        // this.FORM_A_PDF = 'data:application/pdf;base64 ,' + this.FORM_A_PDF;
        // top.document.getElementById('ifrmFORM_A').setAttribute("src", this.FORM_A_PDF);
      }
      if (!this.utils.isEmpty(res.result[0]["MASUDHA_FORM_PDF"])) {
        
        //MASUDHA_FORM_PDF
        this.MASUDHA_FORM_PDF =res.result[0]["MASUDHA_FORM_PDF"];// await this.getBaseFile(res.result[0]["MASUDHA_FORM_PDF"]);
        this.MASUDHA_FORM_PDF1 = this.MASUDHA_FORM_PDF;
        document.getElementById('MASUDHA').style.visibility = "visible";
      }
      if (!this.utils.isEmpty(res.result[0]["BYE_LAW_PDF"])) { 
        //BYE_LAW_PDF
        this.BYE_LAW_PDF = res.result[0]["BYE_LAW_PDF"];//await this.getBaseFile(res.result[0]["BYE_LAW_PDF"]);
        this.BYE_LAW_PDF1 = this.BYE_LAW_PDF;
        document.getElementById('BYE_LAW').style.visibility = "visible";
      }
      if (!this.utils.isEmpty(res.result[0]["FESABILITY_REPORT_PDF"])) {
        
        //FESABILITY_REPORT_PDF
        this.FESABILITY_REPORT_PDF =res.result[0]["FESABILITY_REPORT_PDF"];// await this.getBaseFile(res.result[0]["FESABILITY_REPORT_PDF"]);
        this.FESABILITY_REPORT_PDF1 = this.FESABILITY_REPORT_PDF;
        document.getElementById('FESABILITY').style.visibility = "visible";
      }
      if (!this.utils.isEmpty(res.result[0]["REQ_LETTER_ADHOCK_COM_PDF"])) {
       
        //REQ_LETTER_ADHOCK_COM_PDF
        this.REQ_LETTER_ADHOCK_COM_PDF =res.result[0]["REQ_LETTER_ADHOCK_COM_PDF"];// await this.getBaseFile(res.result[0]["REQ_LETTER_ADHOCK_COM_PDF"]);
        this.REQ_LETTER_ADHOCK_COM_PDF1 = this.REQ_LETTER_ADHOCK_COM_PDF;
        document.getElementById('ADHOCK').style.visibility = "visible";
      }
      if (!this.utils.isEmpty(res.result[0]["ECONOMIC_VIABILITY_REP_PDF"])) {
        
        //ECONOMIC_VIABILITY_REP_PDF
        this.ECONOMIC_VIABILITY_REP_PDF = res.result[0]["ECONOMIC_VIABILITY_REP_PDF"];//await this.getBaseFile(res.result[0]["ECONOMIC_VIABILITY_REP_PDF"]);
        this.ECONOMIC_VIABILITY_REP_PDF1 = this.ECONOMIC_VIABILITY_REP_PDF;
        document.getElementById('ECONOMIC_VIABILITY').style.visibility = "visible";
      }
      if (!this.utils.isEmpty(res.result[0]["BANK_REMITTANCE_CERTI_PDF"])) {
        
        //BANK_REMITTANCE_CERTI_PDF
        this.BANK_REMITTANCE_CERTI_PDF = res.result[0]["BANK_REMITTANCE_CERTI_PDF"];//await this.getBaseFile(res.result[0]["BANK_REMITTANCE_CERTI_PDF"]);
        this.BANK_REMITTANCE_CERTI_PDF1 = this.BANK_REMITTANCE_CERTI_PDF;
        document.getElementById('BANK_REMITTANCE_CERTI').style.visibility = "visible";
      }
      if (!this.utils.isEmpty(res.result[0]["MEETING_PROCEDINGS_PDF"])) {
       
        //MEETING_PROCEDINGS_PDF
        this.MEETING_PROCEDINGS_PDF =res.result[0]["MEETING_PROCEDINGS_PDF"];// await this.getBaseFile(res.result[0]["MEETING_PROCEDINGS_PDF"]);
        this.MEETING_PROCEDINGS_PDF1 = this.MEETING_PROCEDINGS_PDF;
        document.getElementById('MEETING_PROCEDINGS').style.visibility = "visible";
      }
      if (!this.utils.isEmpty(res.result[0]["SWORN_STATEMENT_PDF"])) {
        
        //document.getElementById('SWORN_STATEMENT').style.backgroundColor="Red";
        //SWORN_STATEMENT_PDF
        this.SWORN_STATEMENT_PDF = res.result[0]["SWORN_STATEMENT_PDF"];//await this.getBaseFile(res.result[0]["SWORN_STATEMENT_PDF"]);
        this.SWORN_STATEMENT_PDF1 = this.SWORN_STATEMENT_PDF;
        document.getElementById('SWORN_STATEMENT').style.visibility = "visible";
      }
      if (!this.utils.isEmpty(res.result[0]["DLCO_CERT"])) {
        
        //document.getElementById('SWORN_STATEMENT').style.backgroundColor="Red";
        //SWORN_STATEMENT_PDF
        this.DLCO_CERT = res.result[0]["DLCO_CERT"];//await this.getBaseFile(res.result[0]["SWORN_STATEMENT_PDF"]);
        this.DLCO_CERT1 = this.DLCO_CERT;
        document.getElementById('DLCO_CERT').style.visibility = "visible";
        //this.DlCOesign=true;
      }
      if (!this.utils.isEmpty(res.result[0]["DCO_CERT"])) {
        
        //document.getElementById('SWORN_STATEMENT').style.backgroundColor="Red";
        //SWORN_STATEMENT_PDF
        this.DCO_CERT = res.result[0]["DCO_CERT"];//await this.getBaseFile(res.result[0]["SWORN_STATEMENT_PDF"]);
        this.DCO_CERT1 = this.DCO_CERT;
        document.getElementById('DCO_CERT').style.visibility = "visible";
        //this.DCOesign=true;
      }
      if (!this.utils.isEmpty(res.result[0]["GM_CERT"])) {
        
        //document.getElementById('SWORN_STATEMENT').style.backgroundColor="Red";
        //SWORN_STATEMENT_PDF
        this.GM_CERT = res.result[0]["GM_CERT"];//await this.getBaseFile(res.result[0]["SWORN_STATEMENT_PDF"]);
        this.GM_CERT1 = this.GM_CERT;
        document.getElementById('GM_CERT').style.visibility = "visible";
       // this.aresign=true;
      }
      if (!this.utils.isEmpty(res.result[0]["COMM_BYLAW_CERT"])) {
        
        this.COMM_BYLAW_CERT = res.result[0]["COMM_BYLAW_CERT"];//await this.getBaseFile(res.result[0]["SWORN_STATEMENT_PDF"]);
        this.COMM_BYLAW_CERT1 = this.COMM_BYLAW_CERT;
        document.getElementById('COMM_BYLAW_CERT').style.visibility = "visible";
       
      }
      if (!this.utils.isEmpty(res.result[0]["COMM_REG_CERT"])) {        
        this.COMM_REG_CERT = res.result[0]["COMM_REG_CERT"];//await this.getBaseFile(res.result[0]["SWORN_STATEMENT_PDF"]);
        this.COMM_REG_CERT1 = this.COMM_REG_CERT;
        document.getElementById('COMM_REG_CERT').style.visibility = "visible";
       
      }
      if (!this.utils.isEmpty(res.result[0]["COMM_ADHOC_CERT"])) {        
        this.COMM_ADHOC_CERT = res.result[0]["COMM_ADHOC_CERT"];//await this.getBaseFile(res.result[0]["SWORN_STATEMENT_PDF"]);
        this.COMM_ADHOC_CERT1 = this.COMM_REG_CERT;
        document.getElementById('COMM_ADHOC_CERT').style.visibility = "visible";
       
      }
      if (!this.utils.isEmpty(res.result[0]["COMM_PROC_CERT"])) {        
        this.COMM_PROC_CERT = res.result[0]["COMM_PROC_CERT"];//await this.getBaseFile(res.result[0]["SWORN_STATEMENT_PDF"]);
        this.COMM_PROC_CERT1 = this.COMM_PROC_CERT;
        document.getElementById('COMM_PROC_CERT').style.visibility = "visible";
       
      }

      this.commRegistrationCertificate(RBK_CODE);
      this.commPROCEDDINGS_ORDERS(RBK_CODE);
      this.commPROCEDDINGS_ADHOCK(RBK_CODE);
      this.commBYE_LAW_REGISTARION(RBK_CODE);

      this.commBYE_LAW_REGNO_PDF(RBK_CODE);

      //LOG
    //  this.displayStyle = "block";
    } else {
    //  this.displayStyle = "none";
      this.toast.info(res.message);
    }
    this.spinner.hide();
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
      }
    } catch (error) {
      document.getElementById('BYE_LAW_REGISTARION').style.visibility = "hidden";
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
  async btnviewPdf(pdf): Promise<void> {
    try {
      this.btnDocumentDownloadpdf(this.utils.mdssUrl() +pdf);
   
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async esignviewPdf(pdf): Promise<void> {
    try {
      debugger;
      if(pdf!="" && pdf!=null)
      {
        this.btnDocumentDownloadpdf(this.utils.crystalReportsesignUrl() +pdf);
      }
      else{
        this.toast.error("Pdf File Is Empty");
      }
      
   
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnViewByLawsDoc(): Promise<void> {
    try { 
      const req = {
        rbkId:this.rbkid, 
      };
      debugger;
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

  async commBYE_LAW_REGNO_PDF(RBK_CODE): Promise<void> {
    try {  
      const req = {
        rbkId: this.RBK_CODE,
        pdistCode :this.RBK_CODE,
      };
      this.spinner.show();
      const response = await this.commAPI.BYELAWREGNO(req);
      this.spinner.hide();
      if (response.success) {
       // document.getElementById('BYE_LAW_REGISTARION').style.visibility = "visible";
        this.pBYE_LAW_REGNO_PDF = response.result;
        this.pBYE_LAW_REGNO_PDF1 = this.pBYE_LAW_REGNO_PDF;
         
      }
      else{
        this.toast.error("BYE_LAW NOT Generated with RegNo")
      }
    } catch (error) {
      document.getElementById('BYE_LAW_REGISTARION').style.visibility = "hidden";
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  btnPdf(pdf,idno): void {
    if (!this.utils.isEmpty(pdf)) {
      if(idno=="1")
              this.btnViewByLawsDoc();
debugger;
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
  btnImg(pdf): void {
    if (!this.utils.isEmpty(pdf)) {
      this.utils.view_Image(pdf);
    } else {
      this.toast.warning('Image is Not Available');
    }
  }
  async Approved() {      

    try {
//this.submitClick();
      const req = {
        PTYPE:"1",
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
        pBYE_LAW_REGNO_PDF: this.pBYE_LAW_REGNO_PDF,        
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
      if(!this.pBYE_LAW_REGNO_PDF){ this.toast.warning('BYE_LAW WITH NEW REG NO NOT AVAILABLE'); return; }
      
      this.spinner.show();
      const res = await this.commAPI.CommissionerpdfSub_NEW(req);
       this.registrationapprovalsList = [];

      if (res.success) {
         this.registrationapprovalsList = res.result;
         this.LoadData();
         document.getElementById('PENDINGDTS').style.visibility = "hidden";
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

    if(!this.txtremarks1){
      this.toast.warning('Please Enter Remarks');
      return;
    }
   
    try {

    //   const req = {    
    //     type:16,         
    //     pdistCode: this.rbkid,
    //     pdivisionCode: this.session.divisionId,
    //     prbkCode:this.rbkid, 
    //   }; 
    //   this.spinner.show(); 
    // const res = await this.GMAPI.mdsschecklist(req) 

      const req = {    
        type:5,         
        pdistCode: this.session.districtId,
        pdivisionCode: this.session.divisionId,
        prbkCode:this.rbkid, 
        premarks:this.txtremarks1,
      }; 
      this.spinner.show();  
    const res = await this.GMAPI.CommissionerRejectDetails(req)
 
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



  
  async loadDistrictList(type:any): Promise<void> {
    try {
      const req = {
        ptype:type,  
      }; 
      this.DivisionList = [];
      this.DistrictList = [];
      this.spinner.show();
debugger;
      const res = await this.GMAPI.districtdivision_list(req);
      
      this.PENDING_div =false;
      this.APPROVED_div =false;
      this.REJECTED_div =false;
         this.spinner.hide();
      this.DistrictList = [];
       
      if (res.success) {
        this.DistrictList = res.result;
        if(type=="99")
        {
          this.PENDING_div =true;
          this.APPROVED_div =false;
          this.REJECTED_div =false;

    //       this.PENDING_divDoc =true;
    // this.APPROVEDdivDoc =false;
    // this.REJECTED_divDoc =false;
        }  
        if(type=="999")
        {
          this.PENDING_div =false;
          this.APPROVED_div =false;
          this.REJECTED_div =true;

      //     this.REJECTED_divDoc =true;
      // this.PENDING_divDoc =false;
      // this.APPROVEDdivDoc =false;

          
        }  
        if(type=="9999")
        {
          this.PENDING_div =false;
          this.APPROVED_div =true;
          this.REJECTED_div =false;
      //     this.APPROVEDdivDoc =true;
      // this.PENDING_divDoc =false;     
      // this.REJECTED_divDoc =false;
        }  
      
      } else {
        this.toast.info(res.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async loadDivisionList(): Promise<void> {
    try {
      const req = {
        ptype:10,  
         pdist:this.DistSelected,

      }; 
     // this.spinner.show();
     const res = await this.GMAPI.districtdivision_list(req);
    //  const res = await this.commAPI.CommissionerfinalGetDetails(req);
     // this.spinner.hide();
      this.DivisionList = [];
      if (res.success) {
        this.DivisionList = res.result  
       // document.getElementById("DivSelected").attributes.item(-1);
      //  console.log(this.DivisionList);
      } else {
        this.toast.info(res.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


  async onAprovedDistChange(): Promise<void> {
    try { 
     this.LoadApprovedData();
      //this.LoadData(); 
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async onPendingDistChange(): Promise<void> {
    try { 
       this.LoadData(); 

    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async onRejectDistChange(): Promise<void> {
    try { 
      this.LoadRejectedData();
      
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onDivChange(): Promise<void>
   {
        try { 
          if(this.PENDAPROREJCT_ID===1 || this.PENDAPROREJCT_ID===0)
              this.LoadData(); 
          if(this.PENDAPROREJCT_ID===2  )
            this.LoadApprovedData(); 
          if(this.PENDAPROREJCT_ID===3  )
            this.LoadRejectedData();  
        } catch (error) {
          this.spinner.hide();
          this.utils.catchResponse(error);
        }
    }

    //esign Details

    esingstring:string;
    esignClick(str,objtype): void {

      debugger;
      console.log(str);
      if(objtype=="1")
      {
        this.esingstring="COMMISSIONERLevelProc";
      }
      if(objtype=="2")
      {
        this.esingstring="COMMISSIONERLevelByLaw";
      }
      if(objtype=="3")
      {
        this.esingstring="COMMISSIONERLevelRegCert";
      }
      if(objtype=="4")
      {
        this.esingstring="COMMISSIONERLevelAdhoc";
      }
      
      this.esignPopup = true;
    }



    async onClear(): Promise<void> {
      try {           
      this.esignPopup = false;
                
      } catch (error) {
        
        this.utils.catchResponse(error);
      }
    }
     title:any;
     typess:any;
   async clickbtnsub():Promise<void>{
    if(!this.esignCheckText){
      this.toast.warning('Please Select Checkbox');
      return;
    }else{

debugger;
console.log(this.rbkcode);
    if(this.esingstring=="COMMISSIONERLevelByLaw"){
 
this.typess="555";


    }
    if(this.esingstring=="COMMISSIONERLevelProc")
    {
      this.typess="4004";
       
    }
    if(this.esingstring=="COMMISSIONERLevelAdhoc")
    {
      this.typess="4014";
     
    }
    if(this.esingstring=="COMMISSIONERLevelRegCert")
    {
      this.typess="707";
      
    }
    
      this.rbkesign(this.rbkcode,this.typess,this.session.userName,this.session.uniqueId,this.session.desigId,this.session.desigName,this.esingstring);

    
  }
   }

   rece:string;
  
   async rbkesign(rbkcode,path,loginusern,uniqueid,Role,designation,title): Promise<void> {    
    
        debugger;
    var objstring=rbkcode+'^'+path+'^'+loginusern+'^'+uniqueid+'^'+Role+'^'+designation+"^1^esignDetalismpfc^"+this.session.districtId+"^"+this.session.mobileNumber+"^"+title+"^https://apddcf.ap.gov.in/jpv/#/dlcoModule/checklistnewmodel^9^"+this.session.uniqueId;
         let objencrefe=this.utils.encrypt(objstring);

         const req = {
          ptype:11,         
          ENCRYPT_STRING:objencrefe,
          USER_NAME: this.session.userName,
          //INPUT_01:this.session.uniqueId,
          };
           
          this.spinner.show();
          const res = await this.dlcoAPI.esigninsert(req);
          
          debugger;
          
          if (res.success) {
            let chanel=1;
         let objkey=this.utils.encrypt(res.result[0].REF_ID+"^"+res.result[0].CHANNEL_ID);
        // res.result[0].REF_ID
        

        if(res.result[0].CHANNEL_ID<=5)
        {
          let page ="start"+res.result[0].CHANNEL_ID+".aspx";
         var baseurl="https://apiapddcf.ap.gov.in/digtalsign/eSign/";
        // var baseurl="http://localhost:64258/eSign/";
           this.rece=baseurl+page+"?id="+objkey;
           //this.rece="http://localhost:64258/eSign/start.aspx?id="+objkey;
          //this.rece="https://apiapddcf.ap.gov.in/digtalsign/eSign/start.aspx?id="+objkey;
          window.open(this.rece, '_blank', "width=600,height=600");
          this.esignPopup = false;
          this.esignCheckText="";
          this.spinner.hide();
          window.location.reload();
        }
        else{
          this.toast.info("ALL ESIGN CHANNELS ARE BUSY ........ PLEASE TRY AFTER SOME TIME");
          this.esignPopup = true;
          this.spinner.hide();
        }
         
   // this.rece="http://localhost:64258/eSign/start.aspx?id="+objkey;
  // 
    
    
          } else {
            this.spinner.hide();
            this.toast.info("ALL ESIGN CHANNELS ARE BUSY ........ PLEASE TRY AFTER SOME TIME");
            this.esignPopup = false;
          }
      
        }




        //table
        ngOnDestroy(): void {
          // Do not forget to unsubscribe the event
          this.dtTrigger.unsubscribe();
        }
      
        ngAfterViewInit(): void {
          this.dtTrigger.next();
        }
      
        rerender(): void {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.clear().draw(); // Add this  line to clear all rows..
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next();
          });
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

       
       const res =await this.commAPI.MDssDlcoandDCOandGMRPT(req); 
       debugger;
       if (res.success) { 
        
this.esigncrystalfile=res.result;
        const request = { type:"6",rbkId:this.esignrbkcode,status:this.DistSelected,applicationPdfForm:this.esigncrystalfile,updatedBy: this.session.uniqueId };
        const respon=await this.commAPI.eSignDocumentsInsert(request);
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
        //this.btnDocumentDownloadpdf(this.utils.crystalReportsesignUrl() +str[0]);
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
const res =await this.commAPI.MDssDlcoandDCOandGMRPT(req); 
debugger;
if (res.success) { 
 
this.esigncrystalfile=res.result;
 const request = { type:"7",rbkId:this.esignrbkcode,status:this.DistSelected,applicationPdfForm:this.esigncrystalfile,updatedBy:this.session.uniqueId };
 debugger
 const respon=await this.commAPI.eSignDocumentsInsert(request);
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
const res =await this.commAPI.MDssDlcoandDCOandGMRPT(req); 
 
if (res.success) { 
 
this.esigncrystalfile=res.result;
 const request = { type:"8",rbkId:this.esignrbkcode,status:this.DistSelected,applicationPdfForm:this.esigncrystalfile,updatedBy:this.session.uniqueId };
 
 const respon=await this.commAPI.eSignDocumentsInsert(request);
 
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
 //this.btnDocumentDownloadpdf(this.utils.crystalReportsesignUrl() +str[0]);
}

}catch (error) {
this.spinner.hide();
this.utils.catchResponse(error);

}
}


async  btnPdfProcdings_adhok(pdf,count):Promise<void>
{
  debugger;
  this.spinner.show();
  const req = { type:"4",rbkId:this.rbkcode }; 
this.spinner.show();
const res =await this.commAPI.Proceedings(req); 
 
if (res.success) { 
 
this.esigncrystalfile=res.result;
this.utils.downloadPdfFile(res.result,this.rbkcode+"Adhok_Certificate");
this.spinner.hide();
} 
else{
  this.spinner.hide();
  this.toast.info(res.message);
}
}
async  btnPdfProcdings(pdf,count):Promise<void>
{
  this.spinner.show();
  const req = { rbkId:this.rbkcode }; 
  debugger;
this.spinner.show();
const res =await this.commAPI.Proceedingsonlycomm(req); 
 
if (res.success) { 
 
this.esigncrystalfile=res.result;
this.utils.downloadPdfFile(res.result,this.rbkcode+"Procdings_Certificate");
this.spinner.hide();
} 
else{
  this.spinner.hide();
  this.toast.info(res.message);
}
}
async  btnPdfRegistration(pdf,count):Promise<void>
{
  this.spinner.show();
  const req = { type:"7",rbkId:this.rbkcode }; 
this.spinner.show();
const res =await this.commAPI.RegCertificate(req); 
 
if (res.success) { 
 
this.esigncrystalfile=res.result;
this.utils.downloadPdfFile(res.result,this.rbkcode+"Reg_Certificate");
this.spinner.hide();
 
} 
else{
  this.spinner.hide();
  this.toast.info(res.message);
}
}


async LoadRejectData(): Promise<void> {
  try {
    const req = { type:"9",rbkId:this.session.uniqueId,status:this.session.districtId }; 
    this.spinner.show();
    debugger;
     const res = await this.commAPI.eSignDocumentsGet(req); 
     debugger;
     console.log(res);
    this.registrationRejectedList = [];  
    if (res.success) { 
      this.APPROVED_div=false;
      this.PENDING_divDoc=false;
      this.APPROVEDdivDoc=false;
      this.REJECTED_divDoc=true;
      this.registrationRejectedList = res.result; 
    
      this.spinner.hide();
      //document.getElementById('APPROVED1').style.display='block';
    } else {   
      this.toast.info(res.message);
    }
    this.spinner.hide();
  } catch (error) {
    this.spinner.hide();
   //  this.utils.catchResponse(error);
   
  }
}


}
