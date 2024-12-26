import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { BankService } from '../../services/bank.service';

@Component({
  selector: 'app-branch-manager-dashboard',
  templateUrl: './branch-manager-dashboard.component.html',
  styleUrls: ['./branch-manager-dashboard.component.css']
})
export class BranchManagerDashboardComponent implements OnInit,OnDestroy,AfterViewInit {
  
  dashboardDetails : any;
  personList = [];
  headingText = '';
  reportType = '';
  
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings =  this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();
  
  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private bankAPI: BankService,
    private utils: UtilsService,
    private logger: LoggerService,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ""){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    this.loadDashboard();
  }


  loadDashboard(): void {
    this.dashboardDetails  = [];
    const req = {
      ifscCode: this.session.ifscCode
    };
    this.spinner.show();
    this.bankAPI
      .dashboardCounts(req)
      .then((res: any) => {
        if (res.success) {
          this.dashboardDetails = res.result[0];
        } else {
          this.toast.info(res.message);
        }
        this.spinner.hide();
      })
      .catch((error: any) => {
        this.spinner.hide();
        this.utils.catchResponse(error);
      });
  }

  btnDashboardDetails(id):void {
    this.reportType = id;
    if(id == '1'){
      this.headingText='COMPLETED DETAILS';
      this.completedDashboardList();
    }else if(id == '2'){
      this.headingText='PENDING DETAILS';
      this.pendingDashboardList();
    }
  }

  pendingDashboardList(): void {
    this.personList  = [];
    const req = {
      ifscCode: this.session.ifscCode
    };
    this.spinner.show();
    this.bankAPI
      .pendingDashboardList(req)
      .then((res: any) => {
        if (res.success) {
          this.personList = res.result;
        } else {
          this.toast.info(res.message);
        }
        this.rerender();
        this.spinner.hide();
      })
      .catch((error: any) => {
        this.spinner.hide();
        this.utils.catchResponse(error);
      });
  }

  completedDashboardList(): void {
    this.personList  = [];
    const req = {
      ifscCode: this.session.ifscCode
    };
    this.spinner.show();
    this.bankAPI
      .completedDashboardList(req)
      .then((res: any) => {
        if (res.success) {
          this.personList = res.result;
        } else {
          this.toast.info(res.message);
        }
        this.rerender();
        this.spinner.hide();
      })
      .catch((error: any) => {
        this.spinner.hide();
        this.utils.catchResponse(error);
      });
  }

  btnVerify(obj):void { 
    const requestData = {
    benId: obj.BEN_CODE
  };

  const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
  this.router.navigate(['/bankModule/PersonDetails'], {
    queryParams: { request: encryptedString },
  });
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
