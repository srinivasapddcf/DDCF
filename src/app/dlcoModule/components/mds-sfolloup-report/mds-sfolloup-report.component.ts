import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { DlcoService } from '../../services/dlco.service';

@Component({
  selector: 'app-mds-sfolloup-report',
  templateUrl: './mds-sfolloup-report.component.html',
  styleUrls: ['./mds-sfolloup-report.component.css']
})
export class MdsSFolloupReportComponent implements OnInit {

  
  DIST='';
  DISTRICT='';
  RBK='';
  STATUS='';
  TYPE='';
  RBKname='';
  DIST_CODE:any;
  RPTSTATUS:any;

  stateLevelDetails = [];
  districtLevelDetails =[];
  EligiblefrmDetails=[];
  excelData = [];
  Districtdiv=true;
  rbkdiv= false;
  eligblefrm=false;
  districtId='';
  districtName='';

  reportTotals1 = {
    S_NO: '-',
    DISTRICT: 'TOTAL',
    NO_NOT_ELIGIBLE_RBKS: 0,
    TOTAL_FARMERS_CNT: 0,
    MILK_POURED_FARMER_CNT : 0,
    ELIGIBLE_FARMER_CNT : 0,
    NOT_ELIGIBLE_FARMER_CNT : 0 
  };

  reportTotals2 = {
    S_NO: '-',
    DISTRICT: 'TOTAL',
    RBK_NAME:'-',
    TOTAL_FARMERS_CNT: 0,
    MILK_POURED_FARMER_CNT : 0,
    ELIGIBLE_FARMER_CNT : 0,
    NOT_ELIGIBLE_FARMER_CNT : 0 
  };

  reportTotals3 = {
    S_NO: '-',
    DISTRICT: 'TOTAL',
    RBK_NAME:'-',
    RIC_MOBILE_NO: '-',
    RIC_NAME:'-',
    SOCIETY_CODE:'-',
    VILLAGE_NAME:'-',
    FARMER_CODE:'-',
    FARMER_NAME:'-',
    MOBILE_NUMBER:'-',
    NO_OF_DAYS_MILK_POURED:0,
    LAST_DATE:'-'
  };

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,    
    private utils: UtilsService,
    private logger: LoggerService,
    private dlcoAPI: DlcoService,
    private session: SessionService,
    
  ) { }

  ngOnInit(): void {
this.districtloadReport();    
  }


  async districtloadReport(): Promise<void> {
    try {
      this.reportTotals1 = {
        S_NO: '-',
        DISTRICT: 'TOTAL',
        NO_NOT_ELIGIBLE_RBKS: 0,
        TOTAL_FARMERS_CNT: 0,
        MILK_POURED_FARMER_CNT : 0,
        ELIGIBLE_FARMER_CNT : 0,
        NOT_ELIGIBLE_FARMER_CNT : 0 
      };
      const req = {
        //ptype:this.TYPE
        TYPE:"5",
      };
      debugger;
       this.spinner.show();
      const res = await this.dlcoAPI.MSSReportGetDetails(req);
      debugger;
      if (res.success) {
        this.excelData = [];
        this.stateLevelDetails = res.result;
        for (let i = 0; i < this.stateLevelDetails.length; i++) {

          this.reportTotals1.NO_NOT_ELIGIBLE_RBKS += parseInt(
            this.stateLevelDetails[i].NO_NOT_ELIGIBLE_RBKS
          );
          this.reportTotals1.TOTAL_FARMERS_CNT += parseFloat(
            this.stateLevelDetails[i].TOTAL_FARMERS_CNT
          );
          this.reportTotals1.MILK_POURED_FARMER_CNT += parseFloat(
            this.stateLevelDetails[i].MILK_POURED_FARMER_CNT
          );
          this.reportTotals1.ELIGIBLE_FARMER_CNT += parseFloat(
            this.stateLevelDetails[i].ELIGIBLE_FARMER_CNT
          );
          this.reportTotals1.NOT_ELIGIBLE_FARMER_CNT += parseFloat(
            this.stateLevelDetails[i].NOT_ELIGIBLE_FARMER_CNT
          );
          
          let singleRow = {
            S_NO: i + 1,
            DISTRICT: this.stateLevelDetails[i].DISTRICT,
            NO_NOT_ELIGIBLE_RSKS: this.stateLevelDetails[i].NO_NOT_ELIGIBLE_RBKS,
            TOTAL_FARMERS_CNT: this.stateLevelDetails[i].TOTAL_FARMERS_CNT,
            MILK_POURED_FARMER_CNT: this.stateLevelDetails[i].MILK_POURED_FARMER_CNT,
            ELIGIBLE_FARMER_CNT: this.stateLevelDetails[i].ELIGIBLE_FARMER_CNT,
            NOT_ELIGIBLE_FARMER_CNT: this.stateLevelDetails[i].NOT_ELIGIBLE_FARMER_CNT,
            
          };

          this.excelData.push(singleRow);
        }
        this.excelData.push(this.reportTotals1);
      } else {
        this.spinner.hide();
        //this.toast.info(res.message);
      }
      this.rerender();
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  
  async rbkloadReport(): Promise<void> {
    try {
      this.reportTotals2 = {
        S_NO: '-',
        DISTRICT: 'TOTAL',
        RBK_NAME:'-',
        TOTAL_FARMERS_CNT: 0,
        MILK_POURED_FARMER_CNT : 0,
        ELIGIBLE_FARMER_CNT : 0,
        NOT_ELIGIBLE_FARMER_CNT : 0 
      };
      const req = {
        TYPE:"6",
        DIST:this.DIST 
      };
      const res = await this.dlcoAPI.MSSReportGetDetails(req);
      if (res.success) {
        this.excelData = [];
        this.Districtdiv=false;
    this.rbkdiv=true;
    this.eligblefrm=false;
        this.districtLevelDetails = res.result;
        for (let i = 0; i < this.districtLevelDetails.length; i++) {

          this.reportTotals2.RBK_NAME += parseInt(
            this.districtLevelDetails[i].RBK_NAME
          );
          this.reportTotals2.TOTAL_FARMERS_CNT += parseFloat(
            this.districtLevelDetails[i].TOTAL_FARMERS_CNT
          );
          this.reportTotals2.MILK_POURED_FARMER_CNT += parseFloat(
            this.districtLevelDetails[i].MILK_POURED_FARMER_CNT
          );
          this.reportTotals2.ELIGIBLE_FARMER_CNT += parseFloat(
            this.districtLevelDetails[i].ELIGIBLE_FARMER_CNT
          );
          this.reportTotals2.NOT_ELIGIBLE_FARMER_CNT += parseFloat(
            this.districtLevelDetails[i].NOT_ELIGIBLE_FARMER_CNT
          );
          
          let singleRow = {
            S_NO: i + 1,
            DISTRICT: this.districtLevelDetails[i].DISTRICT,
            RSK_NAME: this.districtLevelDetails[i].RBK_NAME,
            TOTAL_FARMERS_CNT: this.districtLevelDetails[i].TOTAL_FARMERS_CNT,
            MILK_POURED_FARMER_CNT: this.districtLevelDetails[i].MILK_POURED_FARMER_CNT,
            ELIGIBLE_FARMER_CNT: this.districtLevelDetails[i].ELIGIBLE_FARMER_CNT,
            
          };

          this.excelData.push(singleRow);
        }
        this.excelData.push(this.reportTotals2);
      } else {
        this.toast.info(res.message);
      }
      //this.rerender();
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async detailloadReport(): Promise<void> {
    try {
      this.reportTotals3 = {
        S_NO: '-',
        DISTRICT: 'TOTAL',
        RBK_NAME:'-',
        RIC_MOBILE_NO:'-',
        RIC_NAME:'-',
        SOCIETY_CODE:'-',
        VILLAGE_NAME:'-',
        FARMER_CODE:'-',
        FARMER_NAME:'-',
        MOBILE_NUMBER:'-',
        NO_OF_DAYS_MILK_POURED:0,
        LAST_DATE:'-'
      };
      const req = {
        TYPE:"7",
        RBK:this.RBK,
        STATUS:this.RPTSTATUS,
      };
      const res = await this.dlcoAPI.MSSReportGetDetails(req);
      if (res.success) {
        this.excelData = [];
        this.eligblefrm=true; 
    this.Districtdiv=false;
    this.rbkdiv=false;
        this.EligiblefrmDetails = res.result;
       
        this.excelData=res.result;
      } else {
        this.toast.info(res.message);
      }
      
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  btnExcel(): void {
    this.utils.JSONToCSVConvertor(
      this.excelData,
      'MDSS State Abstarct Report',
      true
    );
  }

  btnrbkExcel(): void {
    this.utils.JSONToCSVConvertor(
      this.excelData,
      'MDSS district Abstarct Report',
      true
    );
  }

  btneligibleExcel(): void {
    this.utils.JSONToCSVConvertor(
      this.excelData,
      'MDSS  Farmers Detail Report',
      true
    );
  }

  btnback():void{
    this.spinner.show();
    this.Districtdiv=true;
    this.rbkdiv=false;                         
        this.spinner.hide();
        
  }

  btnrbkback():void{
    this.spinner.show();
    this.Districtdiv=false;
    
    this.rbkdiv=true;
    this.eligblefrm=false;
    this.spinner.hide();
        
  }
  

  btnDistrictDetails(obj): void {

    this.DIST=obj.DIST_CODE;
     
    this.DISTRICT=obj.DISTRICT;
    this.rbkloadReport();
    
      

  }
  btneligiblefrmDetails(obj): void {

    this.spinner.hide();
    this.DIST=obj.DIST_CODE;
    
    this.RBK=obj.RBK_CODE;
    this.RBKname=obj.RBK_NAME;
    this.RPTSTATUS='2';
   
    this.detailloadReport();
    
    
      

  }
  btnnoteligfrmDetails(obj): void {
     
    this.RPTSTATUS='1';
    this.RBKname=obj.RBK_NAME;
    this.RBK=obj.RBK_CODE;
     
    this.detailloadReport();
    // this.eligblefrm=true;  
    // this.Districtdiv=false;
    // this.rbkdiv=false;     
  }

  ngOnDestroy(): void {
    
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

