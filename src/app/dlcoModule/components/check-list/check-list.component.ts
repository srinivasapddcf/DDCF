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

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.css']
})
export class CheckListComponent implements OnInit, OnDestroy, AfterViewInit {
  dashboardDetails: any;
  pendingList: any[];
  headingText = '';
  reportType = '';
  divLive1: boolean=true;


  txtremarks1:'';
  tremarks=false;
  rbkList = [];
  checkList = [];
  answrdcheckList = [];
  dupanswrdcheckList = [];
  RBKDDSelected = '';
  districtId: '';
  divisionId: '';
  inputRadio: [];
  divSbmt: boolean = false;
  divSbmt2: boolean = false;
  divLive: boolean = false;
  mdssCode: '';
  

  penrbkList = [];
  pencheckList = [];
  penanswrdcheckList = [];
  pendupanswrdcheckList = [];
  penRBKDDSelected= '';
  pendivSbmt: boolean = false;
  //pendivSbmt2: boolean = false;
  penmdssCode: '';
  CheckText='';
  PenCheckText='';
  checklistpdfUpload='';

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

  @ViewChildren(DataTableDirective)
  dtElements!: QueryList<DataTableDirective>;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();
  pendtTrigger: Subject<any> = new Subject();

  //public service = 'https://ej2services.syncfusion.com/production/web-services/api/pdfviewer';
   // public document = '/assets/pdf/checklist.pdf';

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private utils: UtilsService,
    private dlcoAPI: DlcoService,
    private session: SessionService,
    private router:Router
  ) { }

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ""){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    this.divSbmt = false;
    this.divSbmt2 = false;
    this.loadRbkList();
  }
  
  LiveBtnClick(x):void{
    this.cleardata();
    if(x===0){
      this.loadRbkList();
        this.divLive=true;
    }
    else{
      this.penloadRbkList();
       this.divLive=false;
      
    }
  }

  cleardata():void{
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

    this.checkList = [];
    this.pencheckList = [];
  }

  btnPdf(pdf): void {
    if (!this.utils.isEmpty(pdf)) {
      this.utils.viewPDF(pdf);
    } else {
      this.toast.warning('PDF is Not Available');
    }
  }



  btnpdfdownload(pdf): void {   
    //PENDINGCODE
     if (!this.utils.isEmpty(pdf)) {

    //   const req = {
    //     rbkId : x//this.RBKDDSelected // "11190219" //
    //   };

    //   this.spinner.show();
    //   const res = await this.dlcoAPI.mdssDocDetailsByRbkId(req);
    //   this.spinner.hide();
    //   if (res.success) {
    //     if (
    //       !this.utils.isEmpty(res.result[0]["FORM_A_PDF"])
    //     ) {
    //       this.FORM_A_PDF = await this.getBaseFile(res.result[0]["FORM_A_PDF"]);
    //     }



      this.utils.downloadPdfFile(pdf,'DLCO');
    } else {
      this.toast.warning('PDF is Not Available');
    }
  }


  btnImg(pdf): void {
    if (!this.utils.isEmpty(pdf)) {
      this.utils.viewImage(pdf);
    } else {
      this.toast.warning('Image is Not Available');
    }
  }


  //Pending Start
  async loadRbkList(): Promise<void> {
    try {
      const req = {
        districtId: this.session.districtId,
        divisionId: this.session.divisionId,
      };

      this.spinner.show();
      const res = await this.dlcoAPI.rbkListByDivisionId(req);
      this.spinner.hide();
      this.rbkList = [];
      if (res.success) {
        this.rbkList = res.result;

        console.log(this.rbkList);
      } else {
        this.toast.info(res.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async RBKDDChange(): Promise<void> {
    try {
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

  async LoadPDFDetails(x): Promise<void> {
    try {
        const req = {
          rbkId : x//this.RBKDDSelected // "11190219" //
        };

        this.spinner.show();
        const res = await this.dlcoAPI.mdssDocDetailsByRbkId(req);
        this.spinner.hide();
        if (res.success) {
          if (
            !this.utils.isEmpty(res.result[0]["FORM_A_PDF"])
          ) {
            this.FORM_A_PDF = await this.getBaseFile(res.result[0]["FORM_A_PDF"]);
          }

          if (
            !this.utils.isEmpty(res.result[0]["MASUDHA_FORM_PDF"])
          ) {
            this.MASUDHA_FORM_PDF = await this.getBaseFile(res.result[0]["MASUDHA_FORM_PDF"]);
          }
          if (
            !this.utils.isEmpty(res.result[0]["BYE_LAW_PDF"])
          ) {
            this.BYE_LAW_PDF = await this.getBaseFile(res.result[0]["BYE_LAW_PDF"]);
          }
          if (
            !this.utils.isEmpty(res.result[0]["FESABILITY_REPORT_PDF"])
          ) {
            this.FESABILITY_REPORT_PDF = await this.getBaseFile(res.result[0]["FESABILITY_REPORT_PDF"]);
          }
          
          if (
            !this.utils.isEmpty(res.result[0]["BANK_PASSBOOK_IMAGE"])
          ) {
            this.BANK_PASSBOOK_IMAGE = await this.getBaseFile(res.result[0]["BANK_PASSBOOK_IMAGE"]);
          }
          
          if (
            !this.utils.isEmpty(res.result[0]["BANK_REMITTANCE_CERTI_PDF"])
          ) {
            this.BANK_REMITTANCE_CERTI_PDF = await this.getBaseFile(res.result[0]["BANK_REMITTANCE_CERTI_PDF"]);
          }
          
          if (
            !this.utils.isEmpty(res.result[0]["REQ_LETTER_ADHOCK_COM_PDF"])
          ) {
            this.REQ_LETTER_ADHOCK_COM_PDF = await this.getBaseFile(res.result[0]["REQ_LETTER_ADHOCK_COM_PDF"]);
          }
          
          if (
            !this.utils.isEmpty(res.result[0]["MEETING_PROCEDINGS_PDF"])
          ) {
            this.MEETING_PROCEDINGS_PDF = await this.getBaseFile(res.result[0]["MEETING_PROCEDINGS_PDF"]);
          }
          
          if (
            !this.utils.isEmpty(res.result[0]["SWORN_STATEMENT_PDF"])
          ) {
            this.SWORN_STATEMENT_PDF = await this.getBaseFile(res.result[0]["SWORN_STATEMENT_PDF"]);
          }
          
          if (
            !this.utils.isEmpty(res.result[0]["ECONOMIC_VIABILITY_REP_PDF"])
          ) {
            this.ECONOMIC_VIABILITY_REP_PDF = await this.getBaseFile(res.result[0]["ECONOMIC_VIABILITY_REP_PDF"]);
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

  onSelectionChange(x): void {
    const stringToSplit = x;

    const y = stringToSplit.split(',')[0];
    const z = stringToSplit.split(',')[stringToSplit.split(',').length - 1];

    if (this.answrdcheckList.length == 0) {
      this.dupanswrdcheckList.push({ ans: y, qstn: z });
      
    }
    else {  
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
          this.divSbmt = false;   this.divSbmt2 = false;   this.tremarks=true;
          return;
        }
      }
      this.divSbmt = true;   this.divSbmt2 = true; this.tremarks=false;
    }
  }

  
  async RejectClick(): Promise<void> { 
      if (
        this.txtremarks1 == '' ||
        this.txtremarks1 == null ||
        this.txtremarks1 == undefined
      ) {

      this.toast.warning('Please Enter Remarks');
      return;
    }
    else{
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
    }
  }

  async submitClick(): Promise<void> {
    if(!this.CheckText){
      this.toast.warning('Please Select Checkbox');
      return;
    }
    // if(!this.checklistpdfUpload){
    //   this.toast.warning('Please UpLoad PDF File');
    //   return;
    // }

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
  //Pending End


    //Roll Back Start
    async penloadRbkList(): Promise<void> {
      try {
        const req = {
          districtId: this.session.districtId,
          divisionId: this.session.divisionId,
        };
  
        this.spinner.show();
        const res = await this.dlcoAPI.penrbkListByDivisionId(req);
        this.spinner.hide();
        this.penrbkList = [];
        if (res.success) {
          this.penrbkList = res.result;
           console.log(this.penrbkList);
           
        } else {
          this.toast.info(res.message);
        }
      } catch (error) {
        this.spinner.hide();
        this.utils.catchResponse(error);
      }
    }
  
    async penRBKDDChange(): Promise<void> {
      try {
        for (let i = 0; i < this.penrbkList.length; i++) {
          if (this.penRBKDDSelected === this.penrbkList[i].RBK_CODE) {
            this.penmdssCode = this.penrbkList[i].MDSS_CODE;
          }
        }
        if (this.penmdssCode) {
          const req = {
            prbkCode: this.penRBKDDSelected,
          };
  
          this.spinner.show();
          const res = await this.dlcoAPI.rollcheckListByRbkId(req);
          this.spinner.hide();
          this.pencheckList = [];
          if (res.success) {
            this.pencheckList = res.result;
            this.LoadPDFDetails(this.penRBKDDSelected);
            console.log(this.pencheckList);
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
  
    penonSelectionChange(x): void {
      const stringToSplit = x;
  
      const y = stringToSplit.split(',')[0];
      const z = stringToSplit.split(',')[stringToSplit.split(',').length - 1];
  
      if (this.penanswrdcheckList.length == 0) {
        this.pendupanswrdcheckList.push({ ans: y, qstn: z });
      }
      else {
        
        for (let i = 0; i < this.penanswrdcheckList.length; i++) {
          var animal = this.pendupanswrdcheckList[i];         
          if (animal.qstn == z) {
            this.pendupanswrdcheckList.splice(i, 1);
            this.penanswrdcheckList.splice(i, 1);
            this.pendupanswrdcheckList.push({ ans: y, qstn: z });
            this.penanswrdcheckList = [...this.pendupanswrdcheckList];
            this.penbntenablecheck();
            return;
          }
        }
        this.pendupanswrdcheckList.push({ ans: y, qstn: z });
      }
      this.penanswrdcheckList = [...this.pendupanswrdcheckList];
      this.penbntenablecheck();
    }
  
    penbntenablecheck(): void { 
      if (this.pencheckList.length == this.penanswrdcheckList.length) {
        var k = 1; 
        for (let i = 0; i < this.penanswrdcheckList.length; i++) {
          if (this.penanswrdcheckList[i]["ans"] == '0') {
            this.pendivSbmt = false; this.tremarks=true;
             
            return;
          } else  this.tremarks=false;
          
        }
        this.pendivSbmt = true;this.tremarks=false;
       
         
      }
    }
  
    async pensubmitClick(): Promise<void> {
      if(!this.PenCheckText){
        this.toast.warning('Please Select Checkbox');
        return;
      }
      try {
        const req = {
          
          prbkCode: this.penRBKDDSelected,
          pmdssCode :this.penmdssCode,
          pdivisionCode :this.session.divisionId,
          pdistCode :this.session.districtId,
          QasAns: this.penanswrdcheckList,
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
    //Roll Back End

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



  
  async onCHECKLISTFormChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.PDF,
        this.utils.fileSize.oneMB
      );
      if (res) {
        // this.registrationData.applicationPdfForm = res.replace(
        //   'data:application/pdf;base64,',
        //   ''
        // );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }




  
  btnDashboardDetails(id, count): void {
    if (count !== '0') {
      this.reportType = id;
      if (id === '1') {
        this.divLive1=true;
        this.headingText = 'COMPLETED ';this.pendingList =null;  this.rerender();
        this.loadCompletedList();
      } else if (id === '2') {
        this.divLive1=false;
        this.headingText = 'PENDING ';this.pendingList =null;  this.rerender();
        this.loadPendingList();
      }else if (id === '3') {
        this.headingText = 'REJECTED ';this.pendingList =null;  this.rerender();
        this.loadPendingList();
      }else if (id === '4') {
        this.headingText = 'ROLLBACK ';this.pendingList =null;  this.rerender();
        this.loadPendingList();
    }
  }
    else
    {this.pendingList =null;  this.rerender();}
  }


  
  async loadCompletedList(): Promise<void> {
    try {
      this.pendingList = [];
      const req = {
        uniqueId: this.session.rbkGroupId
        ? this.session.rbkGroupId
        : this.session.uniqueId,
        role: this.session.desigId,
      };
      // this.spinner.show();
      // const result = await this.farmerAPI.vvFarmerCompletedList(req);
      // if (result.success) {
      //   this.pendingList = result.result;
      //   this.rerender();
      // } else {this.pendingList =null;  this.rerender();
      //   this.toast.info(result.message);
      // }
      // this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async loadPendingList(): Promise<void> {
    try {
      this.pendingList = [];
      const req = {
        uniqueId: this.session.rbkGroupId
        ? this.session.rbkGroupId
        : this.session.uniqueId,
        role: this.session.desigId,
      };
      // this.spinner.show();
      // const result = await this.farmerAPI.farmerListByUniqueId(req);
      // if (result.success) {
      //   this.pendingList = result.result;
      //   this.rerender();
      // } else { this.pendingList =null;  this.rerender();
      //   this.toast.info(result.message);
      // }
      // this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }



}
