import {  AfterViewInit,  Component,  OnDestroy,  OnInit,  QueryList, ViewChild,  ViewChildren,} from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
 
import { DlcoService } from 'src/app/dlcoModule/services/dlco.service';
 
 
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { GmService } from '../../serice/gm.service';

@Component({
  selector: 'app-checklistgmnew',
  templateUrl: './checklistgmnew.component.html',
  styleUrls: ['./checklistgmnew.component.css']
})
export class ChecklistgmnewComponent implements  OnInit, OnDestroy, AfterViewInit  {
  PENDING=false; APPROVED=false; REJECTED=false; ROLLBACK=false; 
  checkAPPROVEDList = [];RBKDDapprovedSelected='';
  reportType='';
  checkREJECTEDList = [];
  registrationRejectedList = [];
  CheckText='';
  mdssCode='';
  dupanswrdcheckList = [];
  rbkREJECTEDList=[];
  RBKDDREJECTEDSelected='';
  RBKDDSelected='';
  rbkList=[];
  excelData: any[] = [];

  APPROVED_RBKList=[];
  
  PENDINGDTS=false;
  eSignbtn=false;
  Submitbtn=false; 

  checkList = []; 
  rbkapprovedList = [];
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
  DLCO_ESIGN_PDF=''; 
  DCO_ESIGN_PDF='';
  PENDINGCount:0;
  APPROVEDCount:0;
  ROLLBACKCount:0;

  DistrictList=[];
  DivisionList=[];
  DistSelected:any;
  DivSelected:any;
  PENDAPROREJCT_ID=0;
  @ViewChildren(DataTableDirective)
  dtElements!: QueryList<DataTableDirective>;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();
  pendtTrigger: Subject<any> = new Subject();

  divSbmt2=false;
   txtremarks1:'';
   tremarks=false;
   esignPopup=false;
   esignCheckText='';
   
    
   ArloginDetails=true;
  constructor( private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private utils: UtilsService,
    private GMAPI: GmService,
    private dlcoAPI: DlcoService,
    private session: SessionService,
    
     
    private router:Router) { }

  ngOnInit(): void {

    if(this.session.userName=="6281985263") 
      { 
this.ArloginDetails=false;
this.LoadApprovedData();
this.APPROVED=true;
      }

    this.loadingCount();
    if(this.session.uniqueId !="" && this.session.desigId != ""){
      document.getElementById('APPROVED').style.display='none';
      document.getElementById('REJECTED').style.display='none';
      document.getElementById('ROLLBACK').style.display='none';
    this.APPROVED=false;this.REJECTED=false;this.ROLLBACK=false;
    document.getElementById('PENDINGDTS').style.display='none';
    //this.loadPENDINGRbkList();
    
   
    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }  

  }
  async loadingCount():Promise<void>{
    try{
      const req={type:32,pid:this.session.uniqueId};
 
this.spinner.show();
const res=await this.GMAPI.mdsschecklist(req);

if (res.success) {
  this.spinner.hide();  
  this.PENDINGCount=res.result[0].PENDING_RBKS_GM;
  this.APPROVEDCount=res.result[0].APPROVED_RBKS_GM;
  this.ROLLBACKCount=res.result[0].REJECTED_RBKS_GM;
    
} else {   document.getElementById('PENDINGDTS').style.display='none';
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
  async loadPENDINGRbkList(): Promise<void> {
    try {
      const req = {
        type:26,//4
        pid:this.session.rbkGroupId,//5,
        uniqueid:this.session.rbkGroupId,
        pdistCode: this.session.districtId,
        pdivisionCode: this.session.divisionId,
        prbkCode:this.session.districtId,
      };

      this.spinner.show();
      const res = await this.GMAPI.mdsschecklist(req);
      this.spinner.hide();
      this.rbkList = [];
      if (res.success) {
        this.rbkList = res.result;
         document.getElementById('PENDINGDTS').style.display='block';
        console.log(this.rbkList);
      } else {   document.getElementById('PENDINGDTS').style.display='none';
        this.toast.info(res.message);
      }
    } catch (error) {
      this.spinner.hide();
      //  this.utils.catchResponse(error);
    if(error!="")   this.toast.info("No Rsk Found");
    else
    this.utils.catchResponse("No Rsk Found");
   
    }
  }
  btnDashboardDetails(id): void {    
    this.reportType = id;
    if (id === '1') 
    { 
         

      this.checkREJECTEDList = [];this.checkList=[]; this.checkAPPROVEDList = [];
      this.DistrictList=[];this.DivisionList=[];this.rbkList=[];
      this.DistSelected="0";this.DivSelected="0";this.RBKDDSelected="0";
this.PENDING=true;
      // document.getElementById('APPROVED').style.display='none';
      // document.getElementById('REJECTED').style.display='none';
      // document.getElementById('ROLLBACK').style.display='none';
      // document.getElementById('PENDING').style.display='block';          
      this.APPROVED=false;this.REJECTED=false;this.ROLLBACK=false;
     // document.getElementById('PENDINGDTS').style.display='none';         

      //this.loadPENDINGRbkList();
      this.PENDAPROREJCT_ID=1;    
      this.loadDistrictList();
      //this.LiveBtnClick(0);

    
          
    } 
    else if (id === '2') {this.checkREJECTEDList = [];this.checkList=[]; this.checkAPPROVEDList = [];
      
      this.DistrictList=[];this.DivisionList=[];this.rbkList=[];this.rbkapprovedList=[];
      this.DistSelected="0";this.DivSelected="0";this.RBKDDSelected="0";
      this.PENDING=false;
this.APPROVED=true;this.REJECTED=false;this.ROLLBACK=false;
this.LoadApprovedData();
      // document.getElementById('APPROVED').style.display='block';
      // document.getElementById('REJECTED').style.display='none';
      // document.getElementById('ROLLBACK').style.display='none';
      // document.getElementById('PENDING').style.display='none';
        //this.loadApprovedRbkList();
        this.PENDAPROREJCT_ID=2;
        this.DistSelected="0";this.DivSelected="0";
       // this.loadDistrictList();
      
    }else if (id === '3') {
      this.checkREJECTEDList = [];this.checkList=[]; this.checkAPPROVEDList = [];

      this.PENDING=false;
      this.APPROVED=false;this.REJECTED=true;this.ROLLBACK=false;
this.LoadRejectData();
      // document.getElementById('APPROVED').style.display='none';
      // document.getElementById('REJECTED').style.display='block';
      // document.getElementById('ROLLBACK').style.display='none';
      // document.getElementById('PENDING').style.display='none';
      this.DistSelected="0";this.DivSelected="0";
      //this.loadREJECTEDRbkList();
      this.PENDAPROREJCT_ID=3;
    
//this.loadDistrictList();
    }else if (id === '4') { 
      // document.getElementById('APPROVED').style.display='none';
      // document.getElementById('REJECTED').style.display='none';
      // document.getElementById('ROLLBACK').style.display='block';
      // document.getElementById('PENDING').style.display='none'; 

      this.PENDING=false;
      this.APPROVED=false;this.REJECTED=false;this.ROLLBACK=true;
  } 
  } 
  
  onSelectionChange(x): void {
    const stringToSplit = x;
    const y = stringToSplit.split(',')[0];
    const z = stringToSplit.split(',')[stringToSplit.split(',').length - 1];    
    if (this.answrdcheckList.length == 0) 
    {this.tremarks=true;
      document.getElementById('divSbmt2').style.display='none';      
      this.dupanswrdcheckList.push({ ans: y, qstn: z });      
    }
    else {  
                document.getElementById('divSbmt2').style.display='block';
                document.getElementById('tremarks').style.display='none';
                for (let i = 0; i < this.answrdcheckList.length; i++) 
                {
                    var animal = this.dupanswrdcheckList[i];       
                      if (animal.qstn == z) 
                      {
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
  btnImg(pdf): void {
    if (!this.utils.isEmpty(pdf)) {
      this.utils.view_Image(pdf);
    } else {
      this.toast.warning('Image is Not Available');
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
  async RBKDDChange(): Promise<void> {
    debugger;
    
       try {
      //  for (let i = 0; i < this.rbkList.length; i++) {
      //    if (this.RBKDDSelected === this.rbkList[i].RBK_CODE) {
      //      this.mdssCode = this.rbkList[i].MDSS_CODE;
      //    }
      //  }
        // if (this.mdssCode) {
        //  const req = {
        //    prbkCode: this.RBKDDSelected
        //  };
 
        //  this.spinner.show();
        //  const res = await this.GMAPI.gmcheckListByRbkId(req);
        //  this.spinner.hide();


      const req = {
        type:19,         
       // pdistCode:this.RBKDDSelected,// this.session.districtId,
        // pdivisionCode:  this.session.divisionId,
         prbk_code: this.RBKDDSelected,
      };

      this.spinner.show();
      const res = await this.dlcoAPI.mdsschecklist(req);
      debugger;
      this.spinner.hide();


         if (res.success) {
           this.checkList = res.result;
 
           this.LoadPDFDetails();
           
           this.rerender();
         } else {
           this.toast.info(res.message);
         }
       //}
 
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
  
  //Submit Data
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


  async RejectClick(): Promise<void> {
    if(!this.txtremarks1){
      this.toast.warning('Please Enter remarks');
      return;
    }
    try {
      const req = {
        
        prbkCode: this.RBKDDSelected,
        pmdssCode :this.mdssCode,
        pdivisionCode :this.session.divisionId,
        pdistCode :this.session.districtId,
        QasAns: this.answrdcheckList,
        pgmUpdatedBy :this.session.userName,
        premarks:this.txtremarks1
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

  async LoadPDFDetails(): Promise<void> {
    try {
        const req = {
          rbkId : this.RBKDDSelected,updatedBy:this.session.uniqueId //"11190219" //this.RBKDDSelected
        };
        document.getElementById('PENDINGDTS').style.display='none';  
        this.spinner.show();
        const res = await this.GMAPI.mdssDocDetailsByRbkId(req);
        this.spinner.hide();
        if (res.success) {
          if(res.result[0]["ESIGN_STATUS"]=="0")
          {
this.eSignbtn=true;
this.Submitbtn=false;
          }
          if(res.result[0]["ESIGN_STATUS"]=="1")
          {
            this.eSignbtn=false;
            this.Submitbtn=true;
          }
          document.getElementById('PENDINGDTS').style.display='block';  
          if (
            !this.utils.isEmpty(res.result[0]["FORM_A_PDF"])
          ) {
            this.FORM_A_PDF = res.result[0]["FORM_A_PDF"];//await this.getBaseFile(res.result[0]["FORM_A_PDF"]);
          }

          if (
            !this.utils.isEmpty(res.result[0]["MASUDHA_FORM_PDF"])
          ) {
            this.MASUDHA_FORM_PDF = res.result[0]["MASUDHA_FORM_PDF"];// await this.getBaseFile(res.result[0]["MASUDHA_FORM_PDF"]);
          }
          if (
            !this.utils.isEmpty(res.result[0]["BYE_LAW_PDF"])
          ) {
            this.BYE_LAW_PDF = res.result[0]["BYE_LAW_PDF"];// await this.getBaseFile(res.result[0]["BYE_LAW_PDF"]);
          }
          if (
            !this.utils.isEmpty(res.result[0]["FESABILITY_REPORT_PDF"])
          ) {
            this.FESABILITY_REPORT_PDF = res.result[0]["FESABILITY_REPORT_PDF"];// await this.getBaseFile(res.result[0]["FESABILITY_REPORT_PDF"]);
          }
          
          if (
            !this.utils.isEmpty(res.result[0]["BANK_PASSBOOK_IMAGE"])
          ) {
            this.BANK_PASSBOOK_IMAGE = res.result[0]["BANK_PASSBOOK_IMAGE"];// await this.getBaseFile(res.result[0]["BANK_PASSBOOK_IMAGE"]);
          }
          
          if (
            !this.utils.isEmpty(res.result[0]["BANK_REMITTANCE_CERTI_PDF"])
          ) {
            this.BANK_REMITTANCE_CERTI_PDF = res.result[0]["BANK_REMITTANCE_CERTI_PDF"];// await this.getBaseFile(res.result[0]["BANK_REMITTANCE_CERTI_PDF"]);
          }
          
          if (
            !this.utils.isEmpty(res.result[0]["REQ_LETTER_ADHOCK_COM_PDF"])
          ) {
            this.REQ_LETTER_ADHOCK_COM_PDF = res.result[0]["REQ_LETTER_ADHOCK_COM_PDF"];// await this.getBaseFile(res.result[0]["REQ_LETTER_ADHOCK_COM_PDF"]);
          }
          
          if (
            !this.utils.isEmpty(res.result[0]["MEETING_PROCEDINGS_PDF"])
          ) {
            this.MEETING_PROCEDINGS_PDF = res.result[0]["MEETING_PROCEDINGS_PDF"];// await this.getBaseFile(res.result[0]["MEETING_PROCEDINGS_PDF"]);
          }
          
          if (
            !this.utils.isEmpty(res.result[0]["SWORN_STATEMENT_PDF"])
          ) {
            this.SWORN_STATEMENT_PDF = res.result[0]["SWORN_STATEMENT_PDF"];// await this.getBaseFile(res.result[0]["SWORN_STATEMENT_PDF"]);
          }
          
          if (
            !this.utils.isEmpty(res.result[0]["ECONOMIC_VIABILITY_REP_PDF"])
          ) {
            this.ECONOMIC_VIABILITY_REP_PDF = res.result[0]["ECONOMIC_VIABILITY_REP_PDF"];// await this.getBaseFile(res.result[0]["ECONOMIC_VIABILITY_REP_PDF"]);
          }
          if (
            !this.utils.isEmpty(res.result[0]["DLCO_ESIGN_PDF"])
          ) {
            this.DLCO_ESIGN_PDF = res.result[0]["DLCO_ESIGN_PDF"];// await this.getBaseFile(res.result[0]["ECONOMIC_VIABILITY_REP_PDF"]);
          }
          if (
            !this.utils.isEmpty(res.result[0]["DCO_ESIGN_PDF"])
          ) {
            this.DCO_ESIGN_PDF = res.result[0]["DCO_ESIGN_PDF"];// await this.getBaseFile(res.result[0]["ECONOMIC_VIABILITY_REP_PDF"]);
          }


          
         
         console.log(res);
        } else {
          this.toast.info(res.message);
        }
      
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async RBKDDapprovedChange(): Promise<void> {
    try {
       

      const req = {
        type:7,         
        pdistCode:this.RBKDDapprovedSelected,// this.session.districtId,
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
        type:27,//6,
        pid:this.session.districtId,//7,
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
        this.toast.info(res.message);
      }
    } catch (error) {
      this.spinner.hide();
      //  this.utils.catchResponse(error);
    if(error!="")   this.toast.info("No Rsk Found");
    else
    this.utils.catchResponse("No Rsk Found");
    }
  }

  btnDocumentDownloadpdf(url):  void  {
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
  async loadREJECTEDRbkList(): Promise<void> {
    try {
      const req = {
        type:28,//9,
        pid:this.session.districtId,//3,
        pdistCode: this.session.districtId,
        pdivisionCode: this.session.divisionId,
        prbkCode:this.session.districtId, 
      };

      this.spinner.show();
      const res = await this.dlcoAPI.mdsschecklist(req);
      this.spinner.hide();
      this.rbkREJECTEDList = [];
      if (res.success) {
        this.rbkREJECTEDList = res.result;

        console.log(this.rbkREJECTEDList);
      } else {
        this.toast.info(res.message);
      }
    } catch (error) {
      this.spinner.hide();
      //  this.utils.catchResponse(error);
    if(error!="")   this.toast.info("No Rsk Found");
    else
    this.utils.catchResponse("No Rsk Found");
    }
  }

  
  async RBKDDREJECTEDChange(): Promise<void> {
    try {
       
      this.checkREJECTEDList = [];
      const req = {
        type:7,         
        pdistCode:this.RBKDDREJECTEDSelected,// this.session.districtId,
        pdivisionCode: this.session.divisionId,
        prbk_code:this.RBKDDREJECTEDSelected,
      };

      this.spinner.show();
      const res = await this.dlcoAPI.mdsschecklist(req);
      this.spinner.hide();
      this.checkREJECTEDList = [];
      if (res.success) {
        this.checkREJECTEDList = res.result;

        console.log(this.checkREJECTEDList);
      } else {
        this.toast.info(res.message);
      }
      
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


  
  async loadDistrictList(): Promise<void> {
    try {
      const req = {
        ptype:100,  
      }; 
      this.DivisionList = [];
      this.DistrictList = [];
      this.spinner.show();
      const res = await this.GMAPI.districtdivision_list(req);
      this.spinner.hide();
      this.DistrictList = [];
      if (res.success) {
        this.DistrictList = res.result;  
       document.getElementById("DistSelected").attributes.item(-1);
        console.log(this.DistrictList);
      } else {
        this.toast.info(res.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async loadRBKList(): Promise<void> {
    try {
      const req = {
        ptype:101, pdist:this.DistSelected,  
      }; 
    
      this.spinner.show();
      const res = await this.GMAPI.districtdivision_list(req);
      this.spinner.hide();
      this.rbkList=[];
      if (res.success) {
        this.rbkList = res.result;  
       document.getElementById("DistSelected").attributes.item(-1);
         
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
       this.spinner.show();
      const res = await this.GMAPI.districtdivision_list(req);
       this.spinner.hide();
      this.DivisionList = [];
      if (res.success) {
        this.DivisionList = res.result 
this.DivSelected="0";
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


  async onDistChange(): Promise<void> {
    try { 
      if(this.DistSelected!="0"){

        this.loadRBKList();
       // this.loadDivisionList(); 

      }else{this.toast.info("Select District items")}
      
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
       
  //    let objstring=rbkcode+'^'+path+'^'+loginusern+'^'+uniqueid+'^'+Role+'^'+designation+"^1^esignDetalismpfc^"+this.session.districtId+"^"+this.session.mobileNumber+"^DCOLevelAPPROVAL^https://apddcf.ap.gov.in/jpv/#/dcoModule/ChecklistDCO^7^"+this.session.uniqueId;
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
    
        
    var objstring=rbkcode+'^'+path+'^'+loginusern+'^'+uniqueid+'^'+Role+'^'+designation+"^1^esignDetalismpfc^"+this.session.districtId+"^"+this.session.mobileNumber+"^GMLevelAPPROVAL^https://apddcf.ap.gov.in/jpv/#/dlcoModule/checklistnewmodel^7^"+this.session.uniqueId;
         let objencrefe=this.utils.encrypt(objstring);

         const req = {
          ptype:11,         
          ENCRYPT_STRING:objencrefe,
          USER_NAME: this.session.userName,
          INPUT_01:this.session.uniqueId,
          };
           
          this.spinner.show();
          const res = await this.dlcoAPI.esigninsert(req);
                    
          if (res.success) {

            
            let chanel=1;
         let objkey=this.utils.encrypt(res.result[0].REF_ID+"^"+res.result[0].CHANNEL_ID);
        // res.result[0].REF_ID
        

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
            
            this.rbkesign(this.RBKDDSelected,103,this.session.userName,this.session.uniqueId,this.session.desigId,this.session.desigName);
          }
          
  
         }

  // async onDivChange(): Promise<void>
  //  {
  //       try { 

  //         if(this.DivSelected!="0"){
  //         if(this.PENDAPROREJCT_ID===1 || this.PENDAPROREJCT_ID===0)
  //             this.loadPENDINGRbkList(); 
  //         else if(this.PENDAPROREJCT_ID===2  )
  //           this.loadApprovedRbkList(); 
  //        else if(this.PENDAPROREJCT_ID===3  )
  //           this.loadREJECTEDRbkList();  
  //         }
  //         else
  //         {
  //           this.toast.info("Select Division");
  //         }
  //       } catch (error) {
  //         this.spinner.hide();
  //         this.utils.catchResponse(error);
  //       }
  //   }


  async LoadApprovedData(): Promise<void> {
    try {
      const req = { type:"5",rbkId:this.session.uniqueId,status:this.DistSelected }; 
      this.spinner.show();
      // const res = await this.commAPI.CommissionerFinalGet(req); 
       const res = await this.GMAPI.eSignDocumentsGet(req); 
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

       
       const res =await this.GMAPI.MDssDlcoandDCOandGMRPT(req); 
       debugger;
       if (res.success) { 
        
this.esigncrystalfile=res.result;
        const request = { type:"6",rbkId:this.esignrbkcode,status:this.session.districtId,applicationPdfForm:this.esigncrystalfile,updatedBy: this.session.uniqueId };
        const respon=await this.GMAPI.eSignDocumentsInsert(request);
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
const res =await this.GMAPI.MDssDlcoandDCOandGMRPT(req); 
debugger;
if (res.success) { 
 
this.esigncrystalfile=res.result;
 const request = { type:"7",rbkId:this.esignrbkcode,status:this.session.districtId,applicationPdfForm:this.esigncrystalfile,updatedBy:this.session.uniqueId };
 debugger
 const respon=await this.GMAPI.eSignDocumentsInsert(request); 
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
const res =await this.GMAPI.MDssDlcoandDCOandGMRPT(req); 
 
if (res.success) { 
 
this.esigncrystalfile=res.result;
 const request = { type:"8",rbkId:this.esignrbkcode,status:this.session.districtId,applicationPdfForm:this.esigncrystalfile,updatedBy:this.session.uniqueId };
 
 const respon=await this.GMAPI.eSignDocumentsInsert(request); 
 
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
    const req = { type:"9",rbkId:this.session.uniqueId,status:this.session.districtId }; 
    this.spinner.show();
    debugger;
     const res = await this.GMAPI.eSignDocumentsGet(req); 
     debugger;
     console.log(res);
    this.registrationRejectedList = [];  
    if (res.success) { 
      this.APPROVED=false;
      this.PENDING=false;
      this.APPROVED=false;
      this.REJECTED=false;
      this.ROLLBACK=true;
      this.registrationRejectedList = res.result; 
    
      this.spinner.hide();
      
    } else {   
      this.toast.info(res.message);
    }
    this.spinner.hide();
  } catch (error) {
    this.spinner.hide();
   //  this.utils.catchResponse(error);
   
  }
}

async btnApprovedExcelDownload(): Promise<void> {
  this.utils.JSONToCSVConvertor(
    this.excelData,
    'GM Approved Details Report',
    true
  );
}

}
