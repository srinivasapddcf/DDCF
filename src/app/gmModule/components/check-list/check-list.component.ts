import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { GmService } from '../../serice/gm.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DlcoService } from 'src/app/dlcoModule/services/dlco.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.css']
})
export class CheckListComponent implements OnInit , OnDestroy, AfterViewInit {
  tremarks=true;
  txtremarks='';
  rbkList = [];
  checkList = [];
  answrdcheckList = [];
  dupanswrdcheckList = [];
  RBKDDSelected= '';
  districtId: '';
  divisionId: '';
  inputRadio: [];
  divSbmt: boolean = false;
  mdssCode: '';

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
  
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();

  constructor(    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private utils: UtilsService,
    private gmAPI: GmService,
    private dlcoAPI: DlcoService,
    private session: SessionService,
    private router:Router) { }

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ''){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    this.divSbmt = false;
    this.loadRbkList();
  }

  btnPdf(pdf): void {
    if (!this.utils.isEmpty(pdf)) {
      this.utils.viewPDF(pdf);
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
  
 
  async RejectClick(): Promise<void> {
    if (
      this.txtremarks == '' ||
      this.txtremarks == null ||
      this.txtremarks == undefined
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

      // this.spinner.show();
      // const res = await this.dlcoAPI.checkListSub(req);
      // this.spinner.hide();
      // if (res.success) {
      //   this.toast.info(res.message);
      //   window.location.reload();
      // } else {
      //   this.toast.info(res.message);
      // }
    }
  }
  //Loading RBK DD
  async loadRbkList(): Promise<void> {
    try {
      const req = {
        districtId: this.session.districtId,
        divisionId: this.session.divisionId,
      };

      this.spinner.show();
      const res = await this.gmAPI.gmrbkListByDivisionId(req);
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
  }

  //Change RBK DD
  async RBKDDChange(): Promise<void> {
this.cleardata();
    try {
      for (let i = 0; i < this.rbkList.length; i++) {
        if (this.RBKDDSelected === this.rbkList[i].RBK_CODE) {
          this.mdssCode = this.rbkList[i].MDSS_CODE;
        }
      }
      if (this.mdssCode) {
        const req = {
          prbkCode: this.RBKDDSelected
        };

        this.spinner.show();
        const res = await this.gmAPI.gmcheckListByRbkId(req);
        this.spinner.hide();
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

  async LoadPDFDetails(): Promise<void> {
    try {
        const req = {
          rbkId : this.RBKDDSelected //"11190219" //this.RBKDDSelected
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
          this.toast.info(res.message);
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
      this.tremarks=true;
    }
    else { this.tremarks=false;
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
      this.divSbmt = true;
    }else{
    this.divSbmt = false;
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
        pmdssCode :this.mdssCode,
        pdivisionCode :this.session.divisionId,
        pdistCode :this.session.districtId,
        QasAns: this.answrdcheckList,
        pgmUpdatedBy :this.session.userName
      };

      this.spinner.show();
      const res = await this.gmAPI.gmcheckListSub(req);
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
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

}
