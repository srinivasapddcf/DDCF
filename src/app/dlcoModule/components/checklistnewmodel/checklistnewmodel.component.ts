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
import { DlcoService } from '../../services/dlco.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MdssService } from 'src/app/mdssModule/services/mdss.service';
 
@Component({
  selector: 'app-checklistnewmodel',
  templateUrl: './checklistnewmodel.component.html',
  styleUrls: ['./checklistnewmodel.component.css']
})
export class ChecklistnewmodelComponent implements  OnInit, OnDestroy, AfterViewInit {
  PENDING=false; APPROVED=false; REJECTED=false; ROLLBACK=false; 

  APPROVED_RBKList = [];
  registrationRejectedList = [];

  PENDINGCount:0;
  APPROVEDCount:0;
  ROLLBACKCount:0;

  excelData: any[] = [];

  rbkRejectList=[]; 
  checkRejectList=[];
  checkAPPROVEDList=[];
    dupanswrdcheckList = [];
    reportType = '0';
    checkList = []; 
    rbkList=[];
    rbkapprovedList=[];
    divSbmt: boolean = false;
    penrbkList=[];
    RBKDDSelected = '';
    mdssCode='';
    RBKDDapprovedSelected='';
    RBKDDRejectSelected='';
  answrdcheckList = [];
  
  BANK_PASSBOOK_IMAGE='';
  BANK_REMITTANCE_CERTI_PDF='';
  BYE_LAW_PDF='';
  ECONOMIC_VIABILITY_REP_PDF='';
  FESABILITY_REPORT_PDF ='';
  FORM_A_PDF='';
  MASUDHA_FORM_PDF='';
  MEETING_PROCEDINGS_PDF='';
  REQ_LETTER_ADHOCK_COM_PDF='';
  SWORN_STATEMENT_PDF='';   
  
   CheckText='';   
   esignCheckText='';   
   divSbmt2=false;
   txtremarks1:'';
   tremarks=false;
   eSignbtn=false;
   submitbtn=false;

   esignPopup=false;

  @ViewChildren(DataTableDirective)
  dtElements!: QueryList<DataTableDirective>;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();
  pendtTrigger: Subject<any> = new Subject();
  
  constructor(
     private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private utils: UtilsService,
    private dlcoAPI: DlcoService,
    private session: SessionService,
    private promotersAPI: MdssService,
    private router:Router) { }

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ""){
      
     
      document.getElementById('APPROVED').style.display='none';
      document.getElementById('REJECTED').style.display='none';
      document.getElementById('ROLLBACK').style.display='none';
    this.APPROVED=false;this.REJECTED=false;this.ROLLBACK=false;
    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    } 
     
this.btnDashboardDetails(0);
this.loadingCount();
     
    
  }

  allcontrolscleardata()
  {
    try{
      this.rbkRejectList=[]; 
      this.RBKDDRejectSelected='';
      this.checkRejectList=[];

      this.checkAPPROVEDList=[];
      this.rbkapprovedList=[];
      this.RBKDDSelected = '';
      this.RBKDDapprovedSelected='';

      this.penrbkList=[];
      this.checkList = []; 
      this.rbkList=[];
      this.CheckText='';          
      this.txtremarks1='';

      this.answrdcheckList = [];
      this.dupanswrdcheckList = [];
      this.reportType = '0';
      
      this.mdssCode=''; 

      this.BANK_PASSBOOK_IMAGE='';
      this.BANK_REMITTANCE_CERTI_PDF='';
      this.BYE_LAW_PDF='';
      this.ECONOMIC_VIABILITY_REP_PDF='';
      this.FESABILITY_REPORT_PDF ='';
      this.FORM_A_PDF='';
      this.MASUDHA_FORM_PDF='';
      this.MEETING_PROCEDINGS_PDF='';
      this.REQ_LETTER_ADHOCK_COM_PDF='';
      this.SWORN_STATEMENT_PDF='';         
      
        
     
  } catch (error) { 
    this.utils.catchResponse(error);
  }
  }
  onSelectionChange(x): void {
    const stringToSplit = x;
    const y = stringToSplit.split(',')[0];
    const z = stringToSplit.split(',')[stringToSplit.split(',').length - 1];   
    debugger; 
    if (this.answrdcheckList.length == 0) {this.tremarks=true;
      document.getElementById('divSbmt2').style.display='none';      
      this.dupanswrdcheckList.push({ ans: y, qstn: z });      
    }
    else {  
      document.getElementById('divSbmt2').style.display='block';
       document.getElementById('tremarks').style.display='none';
      for (let i = 0; i < this.answrdcheckList.length; i++) {
        var animal = this.dupanswrdcheckList[i];       
        if (animal.qstn == z) {
          this.dupanswrdcheckList.splice(i, 1);
          this.answrdcheckList.splice(i, 1);
          this.dupanswrdcheckList.push({ ans: y, qstn: z });
          this.answrdcheckList = [...this.dupanswrdcheckList];
          this.bntenablecheck();
          return;
        }
      }
      this.dupanswrdcheckList.push({ ans: y, qstn: z });
       
    }
    this.answrdcheckList = [...this.dupanswrdcheckList];
    this.bntenablecheck();
  }


  bntenablecheck(): void {
    if (this.checkList.length == this.answrdcheckList.length) {
      var k = 1;
      for (let i = 0; i < this.answrdcheckList.length; i++) {
        if (this.answrdcheckList[i]["ans"] == 0) {
          document.getElementById('divSbmt2').style.display='none';   
          document.getElementById('tremarks').style.display='block';
          
          return;
        }
      }
   //   this.divSbmt = true;    //this.divSbmt = true;
   //    this.tremarks=false;
    }
  }
  btnDashboardDetails(id): void {
    
    this.reportType = id;

    if (id === '0') {  
      this.allcontrolscleardata();    
         this.divSbmt=false;
         document.getElementById('APPROVED').style.display='none';
         document.getElementById('REJECTED').style.display='none';
         document.getElementById('ROLLBACK').style.display='none';
         document.getElementById('PENDING').style.display='block';
         document.getElementById('divSbmt2').style.display='none';
         document.getElementById('tremarks').style.display='block'; 

         this.rbkList = [];
          
    } 

   else if (id === '1') {  
      this.allcontrolscleardata();    
         this.divSbmt=false;
         document.getElementById('APPROVED').style.display='none';
         document.getElementById('REJECTED').style.display='none';
         document.getElementById('ROLLBACK').style.display='none';
         document.getElementById('PENDING').style.display='block';
          this.LiveBtnClick(0);
          
    } else if (id === '2') { this.allcontrolscleardata();
      document.getElementById('APPROVED').style.display='block';
      document.getElementById('REJECTED').style.display='none';
      document.getElementById('ROLLBACK').style.display='none';
      document.getElementById('PENDING').style.display='none';
      //this.loadApprovedRbkList();
      this.LoadApprovedData();
      
    }else if (id === '3') {
      this.allcontrolscleardata();
      document.getElementById('APPROVED').style.display='none';
      document.getElementById('REJECTED').style.display='block';
      document.getElementById('ROLLBACK').style.display='none';
      document.getElementById('PENDING').style.display='none';
     // this.loadRejectRbkList();
     this.LoadRejectData();
      
    }else if (id === '4') { 
      document.getElementById('APPROVED').style.display='none';
      document.getElementById('REJECTED').style.display='none';
      document.getElementById('ROLLBACK').style.display='block';
      document.getElementById('PENDING').style.display='none'; 
  } 
  } 
  LiveBtnClick(x){
    
    if(x===0){
      this.loadRbkList();    
    document.getElementById('divSbmt2').style.display='none';
    document.getElementById('tremarks').style.display='block';      
    }
    
  } 
  async loadRbkList(): Promise<void> { 
    try {
      const req = {
        districtId: this.session.districtId,
        divisionId: this.session.divisionId,
      };
      this.rbkList = [];
      this.spinner.show();
      const res = await this.dlcoAPI.rbkListByDivisionId(req);
      this.spinner.hide();
      this.rbkList = [];
      if (res.success) {
        this.rbkList = res.result;

        console.log(this.rbkList);
      } else {
        this.toast.info("Pending RSK’s Not Available ");//res.message
      }
    } catch (error) {
      this.spinner.hide();
      if(error!="")   this.toast.info("Pending RSK’s Not Available ");
      else
      this.utils.catchResponse("Pending RSK’s Not Available ");
    }
  } 
  btnImg(pdf): void {
    if (!this.utils.isEmpty(pdf)) {
       this.utils.view_Image(pdf);
       debugger;
       this.utils.viewImage(pdf);
      this.utils.view_bankImage(pdf);
      this.getBaseFile(pdf);
      
    } else {
      this.toast.warning('Image is Not Available');
    }
  }



  // async getBaseFile(path): Promise<string> {
  //   try {
  //     if (!this.utils.isEmpty(path)) {
  //       this.spinner.show();
  //       const response = await this.utils.MDSSFileDownload(path);
  //       this.spinner.hide();
  //       if (response.success) {
  //         return response.result;
  //       }
  //     }
  //     return '';
  //   } catch (error) {
  //     this.spinner.hide();
  //     this.utils.catchResponse(error);
  //   }
  // }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    this.pendtTrigger.unsubscribe();
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
    this.pendtTrigger.next();
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
    this.pendtTrigger.next();
  }
  async RBKDDChange(): Promise<void> {
    try { this.checkList = [];


      for (let i = 0; i < this.rbkList.length; i++) {
        if (this.RBKDDSelected === this.rbkList[i].RBK_CODE) {
          this.mdssCode = this.rbkList[i].MDSS_CODE;
        }
      }
      if (this.mdssCode) {
        const req = {

        };

        this.spinner.show();
        const res = await this.dlcoAPI.checkListByRbkId(req);
        this.spinner.hide();
        this.checkList = [];
        if (res.success) {
          this.LoadPDFDetails(this.RBKDDSelected);
          this.checkList = res.result;
          this.divSbmt=false;
          this.rerender();
        } else {
          this.toast.info(res.message);
        }
      }
      
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  } 
  dlcopdf:any;
  async LoadPDFDetails(x): Promise<void> {
    try {
        const req = {
          rbkId : x,updatedBy:this.session.uniqueId//this.RBKDDSelected // "11190219" //
        };

       // this.spinner.show();
        const res = await this.dlcoAPI.mdssDocDetailsByRbkId(req);
        debugger;
      //  this.spinner.hide();
        if (res.success) {
if(res.result[0]["ESIGN_PDF"]!=null)
{
  this.dlcopdf=2;
}
else{
  this.dlcopdf=1;
}
          if(res.result[0]["ESIGN_STATUS"]=="0")
          {
this.eSignbtn=true;
this.submitbtn=false;
          }
          if(res.result[0]["ESIGN_STATUS"]=="1")
          {
            this.eSignbtn=false;
            this.submitbtn=true;
          }
          if (
            !this.utils.isEmpty(res.result[0]["FORM_A_PDF"])
          ) {
            this.FORM_A_PDF =res.result[0]["FORM_A_PDF"];// await this.getBaseFile(res.result[0]["FORM_A_PDF"]);
          }

          if (
            !this.utils.isEmpty(res.result[0]["MASUDHA_FORM_PDF"])
          ) {
            this.MASUDHA_FORM_PDF = res.result[0]["MASUDHA_FORM_PDF"];//await this.getBaseFile(res.result[0]["MASUDHA_FORM_PDF"]);
          }
          if (
            !this.utils.isEmpty(res.result[0]["BYE_LAW_PDF"])
          ) {
            this.BYE_LAW_PDF = res.result[0]["BYE_LAW_PDF"];//await this.getBaseFile(res.result[0]["BYE_LAW_PDF"]);
          }
          if (
            !this.utils.isEmpty(res.result[0]["FESABILITY_REPORT_PDF"])
          ) {
            this.FESABILITY_REPORT_PDF = res.result[0]["FESABILITY_REPORT_PDF"];//await this.getBaseFile(res.result[0]["FESABILITY_REPORT_PDF"]);
          }
          
          if (
            !this.utils.isEmpty(res.result[0]["BANK_PASSBOOK_IMAGE"])
          ) {
            this.BANK_PASSBOOK_IMAGE = res.result[0]["BANK_PASSBOOK_IMAGE"];//await this.getBaseFile(res.result[0]["BANK_PASSBOOK_IMAGE"]);
          }
          
          if (
            !this.utils.isEmpty(res.result[0]["BANK_REMITTANCE_CERTI_PDF"])
          ) {
            this.BANK_REMITTANCE_CERTI_PDF = res.result[0]["BANK_REMITTANCE_CERTI_PDF"];//await this.getBaseFile(res.result[0]["BANK_REMITTANCE_CERTI_PDF"]);
          }
          
          if (
            !this.utils.isEmpty(res.result[0]["REQ_LETTER_ADHOCK_COM_PDF"])
          ) {
            this.REQ_LETTER_ADHOCK_COM_PDF =res.result[0]["REQ_LETTER_ADHOCK_COM_PDF"];// await this.getBaseFile(res.result[0]["REQ_LETTER_ADHOCK_COM_PDF"]);
          }
          
          if (
            !this.utils.isEmpty(res.result[0]["MEETING_PROCEDINGS_PDF"])
          ) {
            this.MEETING_PROCEDINGS_PDF = res.result[0]["MEETING_PROCEDINGS_PDF"];//await this.getBaseFile(res.result[0]["MEETING_PROCEDINGS_PDF"]);
          }
          
          if (
            !this.utils.isEmpty(res.result[0]["SWORN_STATEMENT_PDF"])
          ) {
            this.SWORN_STATEMENT_PDF =res.result[0]["SWORN_STATEMENT_PDF"];// await this.getBaseFile(res.result[0]["SWORN_STATEMENT_PDF"]);
          }
          
          if (
            !this.utils.isEmpty(res.result[0]["ECONOMIC_VIABILITY_REP_PDF"])
          ) {
            this.ECONOMIC_VIABILITY_REP_PDF = res.result[0]["ECONOMIC_VIABILITY_REP_PDF"];//await this.getBaseFile(res.result[0]["ECONOMIC_VIABILITY_REP_PDF"]);
          }
         
         console.log(res);
        } else {
          //this.toast.info(res.message);
        }
      
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async getBaseFile(path): Promise<string> {
    try {
      debugger;
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
  async submitClick(): Promise<void> {
    if(!this.CheckText){
      this.toast.warning('Please Select Checkbox');
      return;
    }
     

    try {
      const req = {        
        prbkCode: this.RBKDDSelected,
        pmdssCode :this.mdssCode,
        pdivisionCode :this.session.divisionId,
        pdistCode :this.session.districtId,
        QasAns: this.answrdcheckList,
        pdlcoInsertedBy :this.session.userName
      };

      this.spinner.show();
      const res = await this.dlcoAPI.checkListSub(req);
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
  async loadApprovedRbkList(): Promise<void> {
    try {
      const req = {
        type:6,
        pid:3,
        pdistCode: this.session.districtId,
        pdivisionCode: this.session.divisionId,
      };
      this.rbkapprovedList = [];
      this.spinner.show();
      const res = await this.dlcoAPI.mdsschecklist(req);
      this.spinner.hide();
      this.rbkapprovedList = [];
      if (res.success) {
        this.rbkapprovedList = res.result;

        console.log(this.rbkapprovedList);
      } else {
        this.toast.info("Approved RSK’s Not Available ");
      }
    } catch (error) {
      this.spinner.hide();
      if(error!="")   this.toast.info("Approved RSK’s Not Available ");
      else
      this.utils.catchResponse("Approved RSK’s Not Available ");
    }
  }
  async loadRejectRbkList(): Promise<void> {
    try {
      const req = {
        type:9,
      //  uniqueid:this.session.rbkGroupId,
        pid:this.session.rbkGroupId,//1,
        pdistCode: this.session.districtId,
        pdivisionCode: this.session.divisionId,
      };
      this.rbkRejectList = [];
      this.spinner.show();
      const res = await this.dlcoAPI.mdsschecklist(req);
      this.spinner.hide();
      this.rbkRejectList = [];
      if (res.success) {
        this.rbkRejectList = res.result;

        console.log(this.rbkRejectList);
      } else {
        this.toast.info("Rolled Backed RSK’s Not Available");
      }
    } catch (error) {
      this.spinner.hide();
      //this.utils.catchResponse(error);
      if(error!="")   this.toast.info("Rolled Backed RSK’s Not Available");
      else
      this.utils.catchResponse("Rolled Backed RSK’s Not Available");
    }
  }
  async RBKDDapprovedChange(): Promise<void> {
    try {
      
      const req = {
        type:7,         
        pdistCode:this.session.districtId,
        pdivisionCode: this.session.divisionId,
        prbkcode:this.session.desigId,pid:'',
        // type:7,         
        // pdistCode: this.RBKDDapprovedSelected,//this.session.districtId,
        // pdivisionCode: this.session.divisionId,
        // prbk_code:this.RBKDDapprovedSelected,
      };
      this.checkAPPROVEDList = [];
      this.spinner.show();
      const res = await this.dlcoAPI.mdsschecklist(req);
      this.spinner.hide();
      this.checkAPPROVEDList = [];
      if (res.success) {
        this.checkAPPROVEDList = res.result;

        console.log(this.checkAPPROVEDList);
      } else {
        this.toast.info(res.message);
      }
      
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  } 
  async RBKDDRejectChange(): Promise<void> {
    try {
      
      const req = {
        type:7,         
        pdistCode: this.RBKDDRejectSelected,//this.session.districtId,
        pdivisionCode: this.session.divisionId,
        prbk_code:this.RBKDDRejectSelected,
      };
      this.checkRejectList = [];
      this.spinner.show();
      const res = await this.dlcoAPI.mdsschecklist(req);
      this.spinner.hide();
      this.checkRejectList = [];
      if (res.success) {
        this.checkRejectList = res.result;

        console.log(this.checkRejectList);
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
    // this.utils.viewPDF(url);
     //this.utils.downloadPdfFile(url,url);
      window.open(url, '_blank');
    }
  }
  async btnPdf(pdf): Promise<void> {
    try {
    //   this.btnPdf1(pdf);
       this.btnDocumentDownloadpdf(this.utils.mdssUrl() +pdf); //mdssPDFUrl
   
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }



  async btnPdf1(pdf): Promise<void> {
    try {
       
      //if(id==="0") this.docid= this.mdssDetailsReq.rbkId;
      //if(id==="1") this.docid= this.mdssDetailsReq.rbkRejectId;

      const req = {
        rbkId:"11190229",//this.docid,// this.mdssDetailsReq.rbkId,
      };
      this.spinner.show();
if(pdf==='0'){//FORM_A_PDF  
      const response = await this.promotersAPI.forma(req);
      
      if (response.success) {
        this.utils.viewPDF(response.result);
        const response1 = await this.promotersAPI.formaattendance(req);
        if (response.success) {
          this.utils.viewPDF(response1.result);
        }
        else{this.toast.warning('Form A  Attendance not available.');}
      }
    }
    else if(pdf==='1'){ //MASUDHA_FORM_PDF
  const response = await this.promotersAPI.masudaform(req);   
  if (response.success) {   this.utils.viewPDF(response.result);}else{this.toast.warning('masudaform pdf not available.');}
  } 
  else if(pdf==='2'){ //BYE_LAW_PDF
    const response = await this.promotersAPI.bylaw(req);   
    if (response.success) {   this.utils.viewPDF(response.result);}else{this.toast.warning('bylaw pdf not available.');}
    } 

    else if(pdf==='3'){ //FESABILITY_REPORT_PDF
      const response = await this.promotersAPI.Feasibility(req);   
      if (response.success) {   this.utils.viewPDF(response.result);}else{this.toast.warning('Feasibility pdf not available.');}
      } 
      else if(pdf==='5'){ //BANK_REMITTANCE_CERTI_PDF
        const response = await this.promotersAPI.ConfirmationLetter(req);   
        if (response.success) {   this.utils.viewPDF(response.result);}else{this.toast.warning('  BANK_REMITTANCE_CERTI_PDF  pdf not available.');}
        } 
        else if(pdf==='6'){ //REQ_LETTER_ADHOCK_COM_PDF
          const response = await this.promotersAPI.Proceedings(req);   
          if (response.success) {   this.utils.viewPDF(response.result);}else{this.toast.warning('  REQ_LETTER_ADHOCK_COM_PDF  pdf not available.');}
          } 
          else if(pdf==='7'){ //MEETING_PROCEDINGS_PDF
            const response = await this.promotersAPI.Proceedings(req);   
            if (response.success) {   this.utils.viewPDF(response.result);}else{this.toast.warning('  MEETING_PROCEDINGS_PDF  pdf not available.');}
            }    
//pending

    this.spinner.hide();
  }catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }




  //   btnPdfView(pdf): void {
  //   if (!this.utils.isEmpty(pdf)) {
  //     this.utils.viewPDF(pdf);
  //   } else {
  //     this.toast.warning('PDF is Not Available');
  //   }
  // }


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

  async btnViewFormADoc(): Promise<void> {
    try {
       
      // if(id==="0") this.docid= this.mdssDetailsReq.rbkId;
      // if(id==="1") this.docid= this.mdssDetailsReq.rbkRejectId;

      const req = {
        rbkId:this.RBKDDSelected,//this.docid,// this.mdssDetailsReq.rbkId,
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
  async RejectClick(): Promise<void> {
    if(!this.txtremarks1){
      this.toast.warning('Please enter remarks');
      return;
    }
     

    try {
      const req = {        
        prbkCode: this.RBKDDSelected,
        pmdssCode :this.mdssCode,
        pdivisionCode :this.session.divisionId,
        pdistCode :this.session.districtId,
        QasAns: this.answrdcheckList,
        pdlcoInsertedBy :this.session.userName,
        premarks:this.txtremarks1
      };

      this.spinner.show();
      const res = await this.dlcoAPI.checkListSub(req);
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

  async esignClick():Promise<void>{
    if(!this.CheckText){
      this.toast.warning('Please Select Checkbox');
      return;
    }
    else{
      this.esignPopup=true;
       this.eSignbtn=false; 
    }
    // const req = {        
    //   type: '101',
    //   rbkId :this.RBKDDSelected,
      
    // };
    // this.spinner.show();
    //   const res = await this.dlcoAPI.MDssDlcoandDCOandGMRPT(req);
    //   debugger;
    //   this.spinner.hide();


  }
  rece:string;
  // async rbkesign(rbkcode,path,loginusern,uniqueid,Role,designation): Promise<void> {    
    
        
  //   var objstring=rbkcode+'^'+path+'^'+loginusern+'^'+uniqueid+'^'+Role+'^'+designation+"^1^esignDetalismpfc^"+this.session.districtId+"^"+this.session.mobileNumber+"^DLCOLevelAPPROVAL^https://apddcf.ap.gov.in/jpv/#/dlcoModule/checklistnewmodel^3^"+this.session.uniqueId;
  //        let objencrefe=this.utils.encrypt(objstring);

  //        const req = {
  //         ptype:1,         
  //         ENCRYPT_STRING:objencrefe,
  //         USER_NAME: this.session.userName,
  //         INPUT_01:this.session.uniqueId,
  //         };
           
  //         this.spinner.show();
  //         const res = await this.dlcoAPI.esigninsert(req);
          
  //         debugger;
          
  //         if (res.success) {
             
  //        let objkey=this.utils.encrypt(res.result[0].REF_ID);
  //        this.rece="https://apiapddcf.ap.gov.in/digtalsign/eSign/start.aspx?id="+objkey;
  //  // this.rece="http://localhost:64258/eSign/start.aspx?id="+objkey;
  //  this.esignPopup = false;
  //   window.open(this.rece, '_blank', "width=600,height=600");

  //   this.spinner.hide();
  //         } else {
  //           this.spinner.hide();
  //           this.toast.info(res.message);
  //         }
      
  //       }
  async rbkesign(rbkcode,path,loginusern,uniqueid,Role,designation): Promise<void> {    
    
        
    var objstring=rbkcode+'^'+path+'^'+loginusern+'^'+uniqueid+'^'+Role+'^'+designation+"^1^esignDetalismpfc^"+this.session.districtId+"^"+this.session.mobileNumber+"^DLCOLevelAPPROVAL^https://apddcf.ap.gov.in/jpv/#/dlcoModule/checklistnewmodel^3^"+this.session.uniqueId;
         let objencrefe=this.utils.encrypt(objstring);

         const req = {
          ptype:11,         
          ENCRYPT_STRING:objencrefe,
          USER_NAME: this.session.userName,
          INPUT_01:this.session.uniqueId,
          };
           
          this.spinner.show();
          const res = await this.dlcoAPI.esigninsert(req);
          
          debugger;
          
          if (res.success) {
            let chanel=11;
            let objkey=this.utils.encrypt(res.result[0].REF_ID+"^"+res.result[0].CHANNEL_ID);
        // res.result[0].REF_ID
        

        if(res.result[0].CHANNEL_ID<=5)
        {
          let page ="start"+res.result[0].CHANNEL_ID+".aspx";
          var baseurl="https://apiapddcf.ap.gov.in/digtalsign/eSign/";
         // var baseurl="http://localhost:64258/";
           this.rece=baseurl+page+"?id="+objkey;
           //this.rece="http://localhost:64258/eSign/start.aspx?id="+objkey;
          //this.rece="https://apiapddcf.ap.gov.in/digtalsign/eSign/start.aspx?id="+objkey;
          window.open(this.rece, '_blank', "width=600,height=600");
          this.esignPopup = false;
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
    // window.open(this.rece, '_blank', "width=600,height=600");
    // this.esignPopup = false;
    this.spinner.hide();
          } else {
            this.toast.info("ALL ESIGN CHANNELS ARE BUSY ........ PLEASE TRY AFTER SOME TIME");
          this.esignPopup = true;
          this.spinner.hide();
          }
      
        }

        async onClear(): Promise<void> {
          try {           
          this.esignPopup = false;
            this.eSignbtn=true;         
          } catch (error) {
            
            this.utils.catchResponse(error);
          }
        }

       async clickbtnsub():Promise<void>{
        if(!this.esignCheckText){
          this.toast.warning('Please Select Checkbox');
          return;
        }else{
          
          this.rbkesign(this.RBKDDSelected,101,this.session.userName,this.session.uniqueId,this.session.desigId,this.session.desigName);
  
        }
        

       }




       async LoadApprovedData(): Promise<void> {
        try {
          const req = { type:"5",rbkId:this.session.uniqueId,status:this.session.districtId }; 
          this.spinner.show();
          // const res = await this.commAPI.CommissionerFinalGet(req); 
           const res = await this.dlcoAPI.eSignDocumentsGet(req); 
           debugger;
           console.log(res);
          this.APPROVED_RBKList = [];  
          if (res.success) { 
            // this.APPROVED_div=true;
            // this.PENDING_divDoc=false;
            // this.APPROVEDdivDoc=true;
            // this.REJECTED_divDoc=false;
            this.APPROVED_RBKList = res.result; 
          this.excelData=res.result;
            
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
            this.btnPdf(str[0]);
           // this.btnDocumentDownloadpdf(this.utils.crystalReportsesignUrl() +str[0]);
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
     this.btnPdf(str[0]);
     
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
     this.btnPdf(str[0]);
     
    }
    
    }catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
    
    }
    }
    
    async btnPdfesign(pdf): Promise<void> {
      try {
        this.btnDocumentDownloadpdf(this.utils.crystalReportsesignUrl() +pdf);
     
      } catch (error) {
        this.spinner.hide();
        this.utils.catchResponse(error);
      }
  
    }

    async LoadRejectData(): Promise<void> {
      try {
        this.spinner.show();
        const req = { type:"9",rbkId:this.session.uniqueId,status:this.session.districtId }; 
                    const res = await this.dlcoAPI.eSignDocumentsGet(req); 
        
        this.registrationRejectedList = [];  
        if (res.success) { 
           
          this.registrationRejectedList = res.result; 
        
          this.spinner.hide();
          
        } else {   
          this.toast.info(res.message);
        }
        this.spinner.hide();
      } catch (error) {
        this.spinner.hide();
         this.utils.catchResponse(error);
       
      }
    }


    async loadingCount():Promise<void>{
      try{
        const req={type:32,pid:this.session.uniqueId};
  this.spinner.show();
  const res=await this.dlcoAPI.mdsschecklist(req);
  debugger;
  if (res.success) {
    this.spinner.hide();
  
    this.PENDINGCount=res.result[0].PENDING_RBKS_DLCO;
    this.APPROVEDCount=res.result[0].APPROVED_RBKS_DLCO;
    this.ROLLBACKCount=res.result[0].REJECTED_RBKS_DLCO;
      
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
    async btnApprovedExcelDownload(): Promise<void> {
      this.utils.JSONToCSVConvertor(
        this.excelData,
        'DLCO Approved Details Report',
        true
      );
    }

    
}
