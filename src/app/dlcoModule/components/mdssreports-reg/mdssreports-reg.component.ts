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
  selector: 'app-mdssreports-reg',
  templateUrl: './mdssreports-reg.component.html',
  styleUrls: ['./mdssreports-reg.component.css']
})
export class MdssreportsRegComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private utils: UtilsService,
    private logger: LoggerService,
    private dlcoAPI: DlcoService,
    private session: SessionService,
  
    private router: Router) { }

    YearDetailsdata=[];
    MonthList=[];
    toyeardetails=[];
    tomonthdetails=[];
    milktypedetails=[];

    MdssRegGetData=[];
    MdssRegGetDataSeocnd=[];
    MdssRegGetDatarbk=[];
    Districtdiv=true;
    Rootdiv=false;
    Rbkdiv=false;
    Detailsdiv=false;
    distrctname='';
    distrctcode='';
    rootname='';
    rootcode='';
   
    
    MdssRegTotal={
      S_NO: '-',
      DISTRICT:'Total', 
                            
      NO_OF_ROUTES :0,
      ELIGIBLE_RBKS :0,
      SCHEDULED_RBKS :0,
      MEETING_RBKS :0,        
      DOC_UPLOADED_RBKS :0,
      SUBMITTED_RBKS :0,
      REJECTED_RBKS :0,
      PENDING_RBKS_DLCO :0,          
      PENDING_RBKS_DCO :0,
      PENDING_RBKS_GM :0,
      PENDING_RBKS_COMM :0,
      REGISTERED_RBKS :0
    };
    MdssRegTotalsecond={
      S_NO: '-',
      DISTRICT:'Total', 
                            
      NO_OF_ROUTES :0,
      ELIGIBLE_RBKS :0,
      SCHEDULED_RBKS :0,
      MEETING_RBKS :0,        
      DOC_UPLOADED_RBKS :0,
      SUBMITTED_RBKS :0,
      REJECTED_RBKS :0,
      PENDING_RBKS_DLCO :0,          
      PENDING_RBKS_DCO :0,
      PENDING_RBKS_GM :0,
      PENDING_RBKS_COMM :0,
      REGISTERED_RBKS :0
    };
    MdssRegTotalthree={
      S_NO: '-',
      DISTRICT:'Total', 
                            
      NO_OF_ROUTES :0,
      ELIGIBLE_RBKS :0,
      SCHEDULED_RBKS :0,
      MEETING_RBKS :0,        
      DOC_UPLOADED_RBKS :0,
      SUBMITTED_RBKS :0,
      REJECTED_RBKS :0,
      PENDING_RBKS_DLCO :0,          
      PENDING_RBKS_DCO :0,
      PENDING_RBKS_GM :0,
      PENDING_RBKS_COMM :0,
      REGISTERED_RBKS :0
    };
    excelDataDetails = [];
    socexcelDataDetails = [];
    rbkexcelDataDetails = [];

    @ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;
  
    dtOptions: DataTables.Settings = this.utils.dataTableOptions();
    dtTrigger: Subject<any> = new Subject();

  MilksecnarioCls={
    fromyearId:'',
    fromMonths:'',
    ToyearId:'',
    ToMonths:'',
    DistrictId:'',
    Dairynames:'',
    Milktype:'',
    FarmerLaks:'',
    Milk_LLPD:'',
    Price_Fat:'',
    Additional_Benfts:'',
   Baseprice:'',

  }

  ngOnInit(): void {
    this.onmilkTypeChange();

  }


  async onmilkTypeChange():Promise<void>{
    this.spinner.show();
    this.MdssRegTotal={
      S_NO: '-',
      DISTRICT:'Total',                             
      NO_OF_ROUTES :0,
      ELIGIBLE_RBKS :0,
      SCHEDULED_RBKS :0,
      MEETING_RBKS :0,        
      DOC_UPLOADED_RBKS :0,
      SUBMITTED_RBKS :0,
      REJECTED_RBKS :0,
      PENDING_RBKS_DLCO :0,          
      PENDING_RBKS_DCO :0,
      PENDING_RBKS_GM :0,
      PENDING_RBKS_COMM :0,
      REGISTERED_RBKS :0
    };
    
      
      const req = { TYPE:"1"  };
     debugger;
    const res = await this.dlcoAPI.MSSReportGetDetails(req);
    debugger;
      if (res.success) {
       
        this.excelDataDetails = [];
        this.MdssRegGetData=res.result;
        this.Rootdiv=false;
        this.Districtdiv=true;
        this.rerender(); 
        this.spinner.hide();
        for (let i = 0; i < this.MdssRegGetData.length; i++) {
          // tslint:disable-next-line: radix
          this.MdssRegTotal.NO_OF_ROUTES += parseInt(
            this.MdssRegGetData[i].NO_OF_ROUTES
          );
          // tslint:disable-next-line: radix
          this.MdssRegTotal.ELIGIBLE_RBKS += parseFloat(
            this.MdssRegGetData[i].ELIGIBLE_RBKS
          );
          // tslint:disable-next-line: radix
          this.MdssRegTotal.SCHEDULED_RBKS += parseFloat(
            this.MdssRegGetData[i].SCHEDULED_RBKS
          );
          // tslint:disable-next-line: radix
          this.MdssRegTotal.MEETING_RBKS += parseFloat(
            this.MdssRegGetData[i].MEETING_RBKS
          );
          // tslint:disable-next-line: radix
          this.MdssRegTotal.DOC_UPLOADED_RBKS += parseFloat(
            this.MdssRegGetData[i].DOC_UPLOADED_RBKS
          );
          // tslint:disable-next-line: radix
          this.MdssRegTotal.SUBMITTED_RBKS += parseInt(
            this.MdssRegGetData[i].SUBMITTED_RBKS
          );
          // tslint:disable-next-line: radix
          this.MdssRegTotal.REJECTED_RBKS += parseInt(
            this.MdssRegGetData[i].REJECTED_RBKS
          );
          // tslint:disable-next-line: radix
          this.MdssRegTotal.PENDING_RBKS_DLCO += parseFloat(
            this.MdssRegGetData[i].PENDING_RBKS_DLCO
          );
          // tslint:disable-next-line: radix
          this.MdssRegTotal.PENDING_RBKS_DCO += parseFloat(
            this.MdssRegGetData[i].PENDING_RBKS_DCO
          );
          // tslint:disable-next-line: radix
          this.MdssRegTotal.PENDING_RBKS_GM += parseInt(
            this.MdssRegGetData[i].PENDING_RBKS_GM
          );
          // tslint:disable-next-line: radix
          this.MdssRegTotal.PENDING_RBKS_COMM += parseInt(
            this.MdssRegGetData[i].PENDING_RBKS_COMM
          );
          // tslint:disable-next-line: radix
          this.MdssRegTotal.REGISTERED_RBKS += parseInt(
            this.MdssRegGetData[i].REGISTERED_RBKS
          );
          let singleRow = {
            S_NO: i + 1,
            DISTRICT:this.MdssRegGetData[i].DISTRICT,
            UNION_FAR_CNT: this.MdssRegGetData[i].NO_OF_ROUTES,
            UNION_MILK_QTY: this.MdssRegGetData[i].ELIGIBLE_RBKS,
            UNION_BENFIT_AMOUNT: this.MdssRegGetData[i].SCHEDULED_RBKS,
            UNION_CRNT_AMT: this.MdssRegGetData[i].MEETING_RBKS,
            PVT_FAR_CNT: this.MdssRegGetData[i].DOC_UPLOADED_RBKS,
            PVT_MILK_QTY: this.MdssRegGetData[i].SUBMITTED_RBKS,
            PVT_BENFIT_AMOUNT: this.MdssRegGetData[i].REJECTED_RBKS,
            PVT_CRNT_AMT: this.MdssRegGetData[i].PENDING_RBKS_DLCO,
            FAR_CNT: this.MdssRegGetData[i].PENDING_RBKS_DCO,
            MILK_QTY: this.MdssRegGetData[i].PENDING_RBKS_GM,
            BENFIT_AMOUNT: this.MdssRegGetData[i].PENDING_RBKS_COMM,
            CRNT_AMT: this.MdssRegGetData[i].REGISTERED_RBKS,
            
          };

           this.excelDataDetails.push(singleRow);
          
        }
       
      
        this.excelDataDetails.push(this.MdssRegTotal);
         
      } else {
        this.toast.info(res.message);
        this.spinner.hide();
      }
      this.spinner.hide();
        

    }


    async SecondonmilkTypeChange():Promise<void>{
      this.spinner.show();
      this.MdssRegTotalsecond={
        S_NO: '-',
        DISTRICT:'Total',                             
        NO_OF_ROUTES :0,
        ELIGIBLE_RBKS :0,
        SCHEDULED_RBKS :0,
        MEETING_RBKS :0,        
        DOC_UPLOADED_RBKS :0,
        SUBMITTED_RBKS :0,
        REJECTED_RBKS :0,
        PENDING_RBKS_DLCO :0,          
        PENDING_RBKS_DCO :0,
        PENDING_RBKS_GM :0,
        PENDING_RBKS_COMM :0,
        REGISTERED_RBKS :0
      };
      
        
        const req = { TYPE:"2",DIST:this.distrctcode  };
       debugger;
      const res = await this.dlcoAPI.MSSReportGetDetails(req);
      debugger;
        if (res.success) {
          this.spinner.hide();
          this.excelDataDetails = [];
          this.MdssRegGetDataSeocnd=res.result;
          this.Rootdiv=true;
          this.Districtdiv=false;
          this.Rootdiv=true;
          this.rerender(); 
          
          for (let i = 0; i < this.MdssRegGetDataSeocnd.length; i++) {
            // tslint:disable-next-line: radix
            this.MdssRegTotalsecond.NO_OF_ROUTES += parseInt(
              this.MdssRegGetDataSeocnd[i].NO_OF_ROUTES
            );
            // tslint:disable-next-line: radix
            this.MdssRegTotalsecond.ELIGIBLE_RBKS += parseFloat(
              this.MdssRegGetDataSeocnd[i].ELIGIBLE_RBKS
            );
            // tslint:disable-next-line: radix
            this.MdssRegTotalsecond.SCHEDULED_RBKS += parseFloat(
              this.MdssRegGetDataSeocnd[i].SCHEDULED_RBKS
            );
            // tslint:disable-next-line: radix
            this.MdssRegTotalsecond.MEETING_RBKS += parseFloat(
              this.MdssRegGetDataSeocnd[i].MEETING_RBKS
            );
            // tslint:disable-next-line: radix
            this.MdssRegTotalsecond.DOC_UPLOADED_RBKS += parseFloat(
              this.MdssRegGetDataSeocnd[i].DOC_UPLOADED_RBKS
            );
            // tslint:disable-next-line: radix
            this.MdssRegTotalsecond.SUBMITTED_RBKS += parseInt(
              this.MdssRegGetDataSeocnd[i].SUBMITTED_RBKS
            );
            // tslint:disable-next-line: radix
            this.MdssRegTotalsecond.REJECTED_RBKS += parseInt(
              this.MdssRegGetDataSeocnd[i].REJECTED_RBKS
            );
            // tslint:disable-next-line: radix
            this.MdssRegTotalsecond.PENDING_RBKS_DLCO += parseFloat(
              this.MdssRegGetDataSeocnd[i].PENDING_RBKS_DLCO
            );
            // tslint:disable-next-line: radix
            this.MdssRegTotalsecond.PENDING_RBKS_DCO += parseFloat(
              this.MdssRegGetDataSeocnd[i].PENDING_RBKS_DCO
            );
            // tslint:disable-next-line: radix
            this.MdssRegTotalsecond.PENDING_RBKS_GM += parseInt(
              this.MdssRegGetDataSeocnd[i].PENDING_RBKS_GM
            );
            // tslint:disable-next-line: radix
            this.MdssRegTotalsecond.PENDING_RBKS_COMM += parseInt(
              this.MdssRegGetDataSeocnd[i].PENDING_RBKS_COMM
            );
            // tslint:disable-next-line: radix
            this.MdssRegTotalsecond.REGISTERED_RBKS += parseInt(
              this.MdssRegGetDataSeocnd[i].REGISTERED_RBKS
            );
            let singleRow = {
              S_NO: i + 1,
              DISTRICT:this.MdssRegGetDataSeocnd[i].DISTRICT,
              UNION_FAR_CNT: this.MdssRegGetDataSeocnd[i].NO_OF_ROUTES,
              UNION_MILK_QTY: this.MdssRegGetDataSeocnd[i].ELIGIBLE_RBKS,
              UNION_BENFIT_AMOUNT: this.MdssRegGetDataSeocnd[i].SCHEDULED_RBKS,
              UNION_CRNT_AMT: this.MdssRegGetDataSeocnd[i].MEETING_RBKS,
              PVT_FAR_CNT: this.MdssRegGetDataSeocnd[i].DOC_UPLOADED_RBKS,
              PVT_MILK_QTY: this.MdssRegGetDataSeocnd[i].SUBMITTED_RBKS,
              PVT_BENFIT_AMOUNT: this.MdssRegGetDataSeocnd[i].REJECTED_RBKS,
              PVT_CRNT_AMT: this.MdssRegGetDataSeocnd[i].PENDING_RBKS_DLCO,
              FAR_CNT: this.MdssRegGetDataSeocnd[i].PENDING_RBKS_DCO,
              MILK_QTY: this.MdssRegGetDataSeocnd[i].PENDING_RBKS_GM,
              BENFIT_AMOUNT: this.MdssRegGetDataSeocnd[i].PENDING_RBKS_COMM,
              CRNT_AMT: this.MdssRegGetDataSeocnd[i].REGISTERED_RBKS,
              
            };
  
             this.excelDataDetails.push(singleRow);
            
          }
         
        
          this.excelDataDetails.push(this.MdssRegTotalsecond);
           
        } else {
          this.toast.info(res.message);
          this.spinner.hide();
        }
        this.spinner.hide();
          
  
      }

      async sessionthreeTypeChange():Promise<void>{
        this.spinner.show();
         
        
          
          const req = { TYPE:"3",DIST:this.distrctcode,ROUTE:this.rootcode  };
         debugger;
        const res = await this.dlcoAPI.MSSReportGetDetails(req);
        debugger;
          if (res.success) {
            this.spinner.hide();
            this.excelDataDetails = [];
            this.MdssRegGetDatarbk=res.result;
            this.Rootdiv=false;
            this.Districtdiv=false;
            this.Rbkdiv=true;
            this.rbkexcelDataDetails=res.result;
            this.rerender(); 
            
           
             
          } else {
            this.toast.info(res.message);
            this.spinner.hide();
          }
          this.spinner.hide();
            
    
        }
  

    btnExcel(): void {
      this.utils.JSONToCSVConvertor(
        this.excelDataDetails,
        'MDSS State Report',
        true
      );
    }
    btnExcelsecond(): void {
      this.utils.JSONToCSVConvertor(
        this.socexcelDataDetails,
        'MDSS State secondlevel Report',
        true
      );
    }
    btnExcelrbk():void{
      this.utils.JSONToCSVConvertor(
        this.excelDataDetails,
        'MDSS State Report',
        true
      );
    }
    async btnExcelallmdssdet():Promise<void>{
 
      const req = { TYPE:"4" };       
        const res = await this.dlcoAPI.MSSReportGetDetails(req);
      this.utils.JSONToCSVConvertor(
        res.result,
         'MDSS Detail exceldata Report',
        true
      );
    }

    clickDistrictDetails(obj): void {

      this.distrctname=obj.DISTRICT;
      this.distrctcode=obj.DIST_CODE;
      
      this.SecondonmilkTypeChange();
       
        
  
    }
    clickrouteDetails(obj):void{
      this.rootcode=obj.ROUTE_NO;
      this.rootname=obj.ROUTE_NO;
this.sessionthreeTypeChange();
    }


    btnback():void{
      this.spinner.show();
      this.Rootdiv=false; 
      this.Districtdiv=true;
                             
          this.spinner.hide();
          
    }

    btnbacksoc():void{
      this.spinner.show();
      this.Districtdiv=false;
      this.Rootdiv=true;
      this.Rbkdiv=false;
      this.spinner.hide();
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
