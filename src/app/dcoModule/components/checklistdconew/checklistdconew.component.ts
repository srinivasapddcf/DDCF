import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { DcoService } from '../../service/dco.service';
 
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DlcoService } from 'src/app/dlcoModule/services/dlco.service';
import { timeStamp } from 'console';
 
@Component({
  selector: 'app-checklistdconew',
  templateUrl: './checklistdconew.component.html',
  styleUrls: ['./checklistdconew.component.css']
})
export class ChecklistdconewComponent implements  OnInit, OnDestroy, AfterViewInit {
  PENDING=false; APPROVED=false; REJECTED=false;// ROLLBACK=false; 
  divSbmt: boolean = false;
  reportType='';CheckText='';  rbkrejectList=[];RBKDDrejectSelected='';
  mdssCode='';checkrejectList=[];
  RBKDDSelected='';
  checkAPPROVEDList = [];
  rbkList=[];checkList = []; 
  rbkapprovedList = [];
  answrdcheckList = [];
  APPROVED_RBKList = [];
  excelData:any[]=[];

  PENDINGCount:0;
  APPROVEDCount:0;
  ROLLBACKCount:0;

  BANK_PASSBOOK_IMAGE='';
  BANK_REMITTANCE_CERTI_PDF='';
  BYE_LAW_PDF='';
  ECONOMIC_VIABILITY_REP_PDF='';

  DLCO_ESIGN_PDF='';
  esignCheckText='';

  FESABILITY_REPORT_PDF ='';
  FORM_A_PDF='';
  MASUDHA_FORM_PDF='';
  MEETING_PROCEDINGS_PDF='';
  REQ_LETTER_ADHOCK_COM_PDF='';
  SWORN_STATEMENT_PDF='';  
  RBKDDapprovedSelected='';
  dupanswrdcheckList = [];
  registrationRejectedList = [];
   divSbmt2=false;
   txtremarks1:'';
   tremarks=false;
   PENDINGDTS=false;
   esignPopup=false;

   eSignbtn=false;
   submitbtn=false;

  @ViewChildren(DataTableDirective)
  dtElements!: QueryList<DataTableDirective>;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();
  pendtTrigger: Subject<any> = new Subject();

  constructor( private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private utils: UtilsService,
    private dcoAPI: DcoService,
    private dlcoAPI: DlcoService,
    private session: SessionService,
    private router:Router) { }

  ngOnInit(): void { 
    this.allcontrolscleardata();
    this.loadingCount();
      document.getElementById('PENDINGDTS').style.display='none';
    if(this.session.uniqueId !="" && this.session.desigId != ""){
      this.checkList=[];
      document.getElementById('APPROVED').style.display='none';
      document.getElementById('REJECTED').style.display='none';
    //  document.getElementById('ROLLBACK').style.display='none';
    this.APPROVED=false;this.REJECTED=false;//this.ROLLBACK=false;
    document.getElementById('divSbmt2').style.display='none';
    document.getElementById('tremarks').style.display='none';  
    

     this.loadRbkList();
    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }  
  }
    
  onSelectionChange(x): void {
    const stringToSplit = x;
    const y = stringToSplit.split(',')[0];
    const z = stringToSplit.split(',')[stringToSplit.split(',').length - 1];    
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

  allcontrolscleardata()
  {
    try{
      this.rbkrejectList=[]; 
      this.RBKDDrejectSelected='';
      this.checkrejectList=[];

      this.checkAPPROVEDList=[];
      this.rbkapprovedList=[];
      this.RBKDDSelected = '';
      this.RBKDDapprovedSelected='';

      this.rbkList=[];
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
      this.DLCO_ESIGN_PDF='';       
      
        
     
  } catch (error) { 
    this.utils.catchResponse(error);
  }
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
  async loadRbkList(): Promise<void> {
    try {
      const req = {
        type:23,//4
        pid:this.session.rbkGroupId,//3,
        pdistCode: this.session.districtId,
        pdivisionCode: this.session.divisionId,
        prbkCode:this.session.districtId,
      };

      this.spinner.show();
      const res = await this.dcoAPI.mdsschecklist(req);
      this.spinner.hide();
      this.rbkList = [];
      if (res.success) {
        this.rbkList = res.result;
         document.getElementById('PENDINGDTS').style.display='block';
        console.log(this.rbkList);
      } else {   document.getElementById('PENDINGDTS').style.display='none';
        this.toast.info("Pending RSK’s Not Available");
      }
    } catch (error) {
      this.spinner.hide();
     // this.utils.catchResponse(error);
     if(error!="")   this.toast.info("Pending RSK’s Not Available ");
     else
     this.utils.catchResponse("Pending RSK’s Not Available ");
    }
  }
  LiveBtnClick(x){
    
    if(x===0){
        this.loadRbkList();    
    document.getElementById('divSbmt2').style.display='none';
    document.getElementById('tremarks').style.display='block';      
    }
    
  }
  btnDashboardDetails(id): void {
    
    this.reportType = id;
    if (id === '1') { 
      this.allcontrolscleardata();
     // this.loadApprovedRbkList();  
        // this.divSbmt=false;
         document.getElementById('APPROVED').style.display='none';
         document.getElementById('REJECTED').style.display='none';
       //  document.getElementById('ROLLBACK').style.display='none';
         document.getElementById('PENDING').style.display='block';
          this.LiveBtnClick(0);
          
    } else if (id === '2') {this.allcontrolscleardata();
      document.getElementById('APPROVED').style.display='block';
      document.getElementById('REJECTED').style.display='none';
     // document.getElementById('ROLLBACK').style.display='none';
      document.getElementById('PENDING').style.display='none';
     // this.loadApprovedRbkList();
      this.LoadApprovedData();
      
    }else if (id === '3') {
      this.allcontrolscleardata();
      document.getElementById('APPROVED').style.display='none';
      document.getElementById('REJECTED').style.display='block';
     // document.getElementById('ROLLBACK').style.display='none';
      document.getElementById('PENDING').style.display='none';
      
     // this.loadrejectRbkList();
      this.LoadRejectData();
    }else if (id === '4') { 
      document.getElementById('APPROVED').style.display='none';
      document.getElementById('REJECTED').style.display='none';
    //  document.getElementById('ROLLBACK').style.display='block';
      document.getElementById('PENDING').style.display='none'; 
  } 
  } 

  async RBKDDChange(): Promise<void> {
   // this.cleardata();
    try {
      for (let i = 0; i < this.rbkList.length; i++) {
        if (this.RBKDDSelected === this.rbkList[i].RBK_CODE) {
          this.mdssCode = this.rbkList[i].MDSS_CODE;
        }
      }


      if (this.mdssCode) {
        // const req = {
        //   prbkCode: this.RBKDDSelected
        // };

        // this.spinner.show();
        // const res = await this.dcoAPI.dcocheckListByRbkId(req);
        // this.spinner.hide();
        






          const req = {
            type:17,         
            pdistCode: this.RBKDDSelected,//session.districtId,
            pdivisionCode: this.session.divisionId,
            prbk_code:this.RBKDDSelected,
          };
    
          this.spinner.show();
          const res = await this.dlcoAPI.mdsschecklist(req);
          if (res.success) {




          this.checkList = res.result;

          this.LoadPDFDetails();
          console.log(this.checkList);
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

  btnImg(pdf): void {
    if (!this.utils.isEmpty(pdf)) {
     //  this.utils.view_Image(pdf);
       this.utils.view_bankImage(pdf);
    } else {
      this.toast.warning('Image is Not Available');
    }
  }
  async LoadPDFDetails(): Promise<void> {
    try {
        const req = {
          rbkId : this.RBKDDSelected,updatedBy:this.session.uniqueId
        };

        this.spinner.show();
        const res = await this.dcoAPI.mdssDocDetailsByRbkId(req);
        debugger;
        this.spinner.hide();
        if (res.success) {
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
            this.FORM_A_PDF = res.result[0]["FORM_A_PDF"];//await this.getBaseFile(res.result[0]["FORM_A_PDF"]);
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
          if (
            !this.utils.isEmpty(res.result[0]["DLCO_ESIGN_PDF"])
          ) {
            this.DLCO_ESIGN_PDF = res.result[0]["DLCO_ESIGN_PDF"];//await this.getBaseFile(res.result[0]["ECONOMIC_VIABILITY_REP_PDF"]);
          }


          
         
         console.log(res);
        }
         else {
         // this.toast.info(res.message);
        }
      
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
//Submit Data
async submitClick(): Promise<void> {
  if(!this.CheckText){
    this.toast.warning('Please Select Checkbox');
    return;
  }
  try {
    const req = {

      prbkCode: this.RBKDDSelected,
      pmdssCode: this.mdssCode,
      pdivisionCode: this.session.divisionId,
      pdistCode: this.session.districtId,
      QasAns: this.answrdcheckList,
      pdcoUpdatedBy: this.session.userName
    };

    this.spinner.show();
    const res = await this.dcoAPI.dcocheckListSub(req);
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


async RejectClick(): Promise<void> {
  if(!this.txtremarks1){
    this.toast.warning('Please Enter remarks');
    return;
  }
  try {
    const req = {

      prbkCode: this.RBKDDSelected,
      pmdssCode: this.mdssCode,
      pdivisionCode: this.session.divisionId,
      pdistCode: this.session.districtId,
      QasAns: this.answrdcheckList,
      pdcoUpdatedBy: this.session.userName,
      premarks:this.txtremarks1
    };

    this.spinner.show();
    const res = await this.dcoAPI.dcocheckListSub(req);
    debugger;
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
  async RBKDDapprovedChange(): Promise<void> {
    try {
       

      const req = {
        type:7,         
        pdistCode: this.RBKDDapprovedSelected,//session.districtId,
        pdivisionCode: this.session.divisionId,
        prbk_code:this.RBKDDapprovedSelected,
      };

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

   
  async loadApprovedRbkList(): Promise<void> {
    try {
      const req = {
        type: 24,
        pid: this.session.districtId,//5,
        pdistCode: this.session.districtId,
        pdivisionCode: this.session.divisionId,
        prbkCode:this.session.districtId,
      };

      this.spinner.show();
      const res = await this.dlcoAPI.mdsschecklist(req);
      this.spinner.hide();
      this.rbkapprovedList = [];
      if (res.success) {
        this.rbkapprovedList = res.result;

        console.log(this.rbkapprovedList);
      } else {
        this.toast.info("Approved RSK’s Not Available");
      }
    } catch (error) {
      this.spinner.hide();
     // this.utils.catchResponse(error);
     if(error!="")   this.toast.info("Approved RSK’s Not Available");
     else
     this.utils.catchResponse("Approved RSK’s Not Available");
    }
  }

  btnDocumentDownloadpdf(url):  void  {
    debugger;
    if (this.utils.isEmpty(url)) {
      this.toast.warning('Document Not Found !!!');
    } else { 
      window.open(url, '_blank');
    }
  }
  async btnPdf(pdf): Promise<void> {
    try {
      this.btnDocumentDownloadpdf(this.utils.mdssUrl() +pdf);
   
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async loadrejectRbkList(): Promise<void> {
    try {
      const req = {
        type:25,//9,
        //  uniqueid:this.session.rbkGroupId, 
        pid:this.session.rbkGroupId, //4,
        pdistCode: this.session.districtId,
        pdivisionCode: this.session.divisionId,
        prbkCode:this.session.districtId,
      };

      this.spinner.show();
      const res = await this.dlcoAPI.mdsschecklist(req);
      this.spinner.hide();
      this.rbkrejectList = [];
      if (res.success) {
        this.rbkrejectList = res.result;

        console.log(this.rbkrejectList);
      } else {
        this.toast.info("Rolled Backed RSK’s Not Available");
      }
    } catch (error) {
      this.spinner.hide();
    //  this.utils.catchResponse(error);
    if(error!="")   this.toast.info("Rolled Backed RSK’s Not Available");
    else
    this.utils.catchResponse("Rolled Backed RSK’s Not Available");
    }
  }

  async RBKDDrejectChange(): Promise<void> {
    try {
       

      const req = {
        type:7,         
        pdistCode: this.RBKDDrejectSelected,//session.districtId,
        pdivisionCode: this.session.divisionId,
        prbk_code:this.RBKDDrejectSelected,
      };

      this.spinner.show();
      const res = await this.dlcoAPI.mdsschecklist(req);
      this.spinner.hide();
      this.checkrejectList = [];
      if (res.success) {
        this.checkrejectList = res.result;

        console.log(this.checkrejectList);
      } else {
        this.toast.info(res.message);
      }
      
    } catch (error) {
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

    async esignClick():Promise<void>{
      if(!this.CheckText){
        this.toast.warning('Please Select Checkbox');
        return;
      }
      else{
        this.esignPopup = true;
      }
      
  
    }
    rece:string;
    // rbkesign(rbkcode,path,loginusern,uniqueid,Role,designation): void {    
         
    //    let objstring=rbkcode+'^'+path+'^'+loginusern+'^'+uniqueid+'^'+Role+'^'+designation+"^1^esignDetalismpfc^"+this.session.districtId+"^"+this.session.mobileNumber+"^DCOLevelAPPROVAL^https://apddcf.ap.gov.in/jpv/#/dcoModule/ChecklistDCO^5^"+this.session.uniqueId;
    //        let objenc=this.utils.encrypt(objstring);
    //    debugger;
    //       console.log(objenc);
      
    //       this.rece="https://apiapddcf.ap.gov.in/jpvRptReports/eSign/start.aspx?id="+objenc;
    //      // this.rece="http://localhost:64258/eSign/start.aspx?id="+objenc;
          
    //      window.open(this.rece, '_blank', "width=600,height=600");
    //      // window.open();
    //       window.location.reload();
    //       }

    async rbkesign(rbkcode,path,loginusern,uniqueid,Role,designation): Promise<void> {    
    
        
      var objstring=rbkcode+'^'+path+'^'+loginusern+'^'+uniqueid+'^'+Role+'^'+designation+"^1^esignDetalismpfc^"+this.session.districtId+"^"+this.session.mobileNumber+"^DCOLevelAPPROVAL^https://apddcf.ap.gov.in/jpv/#/dlcoModule/checklistnewmodel^5^"+this.session.uniqueId;
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
          // let objkey=this.utils.encrypt(res.result[0].REF_ID+"^"+chanel);
          // res.result[0].REF_ID
          
          let objkey=this.utils.encrypt(res.result[0].REF_ID+"^"+res.result[0].CHANNEL_ID);
          if(res.result[0].CHANNEL_ID<=5)
        {
          let page ="start"+res.result[0].CHANNEL_ID+".aspx";
         var baseurl="https://apiapddcf.ap.gov.in/digtalsign/eSign/";
        //  var baseurl="http://localhost:64258/eSign/";
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
      // this.spinner.hide();
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
              
              this.rbkesign(this.RBKDDSelected,102,this.session.userName,this.session.uniqueId,this.session.desigId,this.session.desigName);
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
              debugger;
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
        // this.btnDocumentDownloadpdf(this.utils.crystalReportsesignUrl() +str[0]);
        }
        
        }catch (error) {
        this.spinner.hide();
        this.utils.catchResponse(error);
        
        }
        }
        // btnPdfView(pdf): void {
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
        


        async LoadRejectData(): Promise<void> {
          try {
            this.spinner.show();
            const req = { type:"9",rbkId:this.session.uniqueId,status:this.session.districtId }; 
                        const res = await this.dcoAPI.eSignDocumentsGet(req); 
            
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
      
        this.PENDINGCount=res.result[0].PENDING_RBKS_DCO;
        this.APPROVEDCount=res.result[0].APPROVED_RBKS_DCO;
        this.ROLLBACKCount=res.result[0].REJECTED_RBKS_DCO;
          
      } else {     this.spinner.hide();
        this.toast.info(res.message);
      }
      
          }
          catch (error) {
            this.spinner.hide();
            //  this.utils.catchResponse(error);
          if(error!="")   this.toast.info("No Rsk Found");
          else {
          this.utils.catchResponse("No Rsk Found"); this.spinner.hide();}
         
          }
        
        }

        async btnApprovedExcelDownload(): Promise<void> {
          this.utils.JSONToCSVConvertor(
            this.excelData,
            'DCO Approved Details Report',
            true
          );
        }
}
