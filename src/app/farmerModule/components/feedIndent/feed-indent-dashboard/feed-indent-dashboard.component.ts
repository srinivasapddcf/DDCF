import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { FarmerService } from 'src/app/FarmerModule/services/farmer.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { MastersService } from 'src/app/shared/services/masters.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-feed-indent-dashboard',
  templateUrl: './feed-indent-dashboard.component.html',
  styleUrls: ['./feed-indent-dashboard.component.css'],
})
export class FeedIndentDashboardComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  indentMonth = '';
  monthList: any = [];
  minMonth: any;
  maxMonth: any;
  districtName: any;

  dashboardCounts = {
    APPROVED: '0',
    REJECTED: '0',
    PENDING_AT_HIGHER_LEVEL: '0',
  };

  indentInput = {
    month: '',
    year: '',
  };
  monthName = '';

  headingText = '';
  requestType = '';
  actionTakenValue: any;
  feedIndentList = [];
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private indentAPI: FarmerService,
    private utils: UtilsService,
    private logger: LoggerService,
    private session: SessionService,
    private masters: MastersService
  ) {
    this.monthList = this.masters.monthList;
    this.minMonth = this.session.getPreviousMonth();
    this.maxMonth = this.session.getTodayDate();
  }

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ""){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    this.indentMonth = this.session.getCurrentMonth();
    this.loadDashboard();
  }

  // async loadDashboard(): Promise<void> {
  //   this.dashboardCounts = {
  //     APPROVED: '0',
  //     REJECTED: '0',
  //     PENDING_AT_HIGHER_LEVEL: '0',
  //   };
  //   if (this.utils.isEmpty(this.indentMonth)) {
  //     this.toast.warning('Please Select Month');
  //     return;
  //   }

  //   this.indentInput.year = this.indentMonth.split('-')[2];
  //   this.indentInput.month = this.indentMonth.split('-')[1];

  //   if (this.utils.isEmpty(this.indentInput.year)) {
  //     this.toast.warning('Please Select Year');
  //     return;
  //   }
  //   if (this.utils.isEmpty(this.indentInput.month)) {
  //     this.toast.warning('Please Select Month');
  //     return;
  //   }

  //   this.monthName = '';
  //   // tslint:disable-next-line: prefer-for-of
  //   for (let i = 0; i < this.monthList.length; i++) {
  //     if (this.monthList[i].ID === this.indentInput.month) {
  //       this.monthName = this.monthList[i].NAME;
  //     }
  //   }
  //   this.btnGetIndentDetails();
  // }

  async loadDashboard(): Promise<void> {
    try {
      this.dashboardCounts = {
        APPROVED: '0',
        REJECTED: '0',
        PENDING_AT_HIGHER_LEVEL: '0',
      };
      const req = {
        insertedBy: this.session.userName,
      };
      this.spinner.show();
      const res = await this.indentAPI.feedIndentDaDashboard(req);
      this.spinner.hide();
      if (res.success) {
        this.dashboardCounts = res.result[0];
      } else {
        this.toast.info(res.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnFeedIndentDashboardDetails(obj): Promise<void> {
    try {
      this.feedIndentList = [];
      this.requestType = obj;
      const req = {
        insertedBy: this.session.userName,
        status: '0',
      };

      if (this.requestType === '1' && this.dashboardCounts.APPROVED === '0') {
        return;
      }
      if (this.requestType === '2' && this.dashboardCounts.REJECTED === '0') {
        return;
      }
      if (
        this.requestType === '3' &&
        this.dashboardCounts.PENDING_AT_HIGHER_LEVEL === '0'
      ) {
        return;
      }

      this.spinner.show();
      let res: any;
      if (this.requestType === '1') {
        req.status = '1';
        this.headingText = 'APPROVED LIST';
        res = await this.indentAPI.indentDaPersonDetails(req);
      } else if (this.requestType === '2') {
        req.status = '2';
        this.headingText = 'REJECTED LIST';
        res = await this.indentAPI.indentDaPersonDetails(req);
      } else if (this.requestType === '3') {
        req.status = '0';
        this.headingText = 'PENDING AT HIGHER LEVEL LIST';
        res = await this.indentAPI.indentDaPersonDetails(req);
      }
      this.spinner.hide();
      if (res.success) {
        this.feedIndentList = res.result;
      } else {
        this.toast.info(res.message);
      }
      this.rerender();
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
      dtInstance.clear().draw(); // Add this  line to clear all rows..
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
}
