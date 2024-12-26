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
import { LoggerService } from 'src/app/shared/services/logger.service';
import { MastersService } from 'src/app/shared/services/masters.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { DistrictHoService } from '../../services/district-ho.service';

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
  excelData = [];

  dashboardCounts = {
    APPROVED: '0',
    PENDING: '0',
    REJECTED: '0',
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
    private indentAPI: DistrictHoService,
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

  async loadDashboard(): Promise<void> {
    try {
      this.dashboardCounts = {
        APPROVED: '0',
        PENDING: '0',
        REJECTED: '0',
      };
      const req = {
        uniqueId: this.session.uniqueId,
      };
      this.spinner.show();
      const res = await this.indentAPI.feedIndentHODashboard(req);
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
        insertedBy: this.session.uniqueId,
        status: '0',
      };

      if (this.requestType === '0' && this.dashboardCounts.PENDING === '0') {
        this.feedIndentList =[];
        return;
      }
      if (this.requestType === '1' && this.dashboardCounts.APPROVED === '0') {
        this.feedIndentList =[];
        return;
      }
      if (this.requestType === '2' && this.dashboardCounts.REJECTED === '0') {
        this.feedIndentList =[];
        return;
      }

      this.spinner.show();
      let res: any;
      if (this.requestType === '0') {
        req.status = '3';
        this.headingText = 'PENDING LIST';
        res = await this.indentAPI.feedIndentHOPersonList(req);
      } else if (this.requestType === '1') {
        req.status = '1';
        this.headingText = 'APPROVED LIST';
        res = await this.indentAPI.feedIndentHOPersonList(req);
      } else if (this.requestType === '2') {
        req.status = '2';
        this.headingText = 'REJECTED LIST';
        res = await this.indentAPI.feedIndentHOPersonList(req);
      }
      this.spinner.hide();
      this.feedIndentList =[];
      if (res.success) {
        this.excelData = [];
        this.excelData=res.result;
        if (this.requestType !== '0') {
          this.feedIndentList = res.result;
        } else {
          this.feedIndentList = res.result.map((obj: any) => ({
            ...obj,
            STATUS: '0',
            remarks: '',
          }));
        }
      } else {
        this.toast.info(res.message);
      }
      this.rerender();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnVerify(obj): Promise<void> {
    try {
      if (obj.STATUS === '0') {
        this.toast.warning('Please select Action Taken');
        return;
      }
      if (this.utils.isEmpty(obj.remarks)) {
        this.toast.warning('Please Enter Remarks');
        return;
      }
      const req = {
        status: obj.STATUS,
        remarks: obj.remarks,
        hoUpdatedBy: this.session.userName,
        uidNum: obj.UNIQUE_ID,
      };
      this.spinner.show();
      const response = await this.indentAPI.feedIndentHOUpdation(req);
      if (response.success) {
        alert(response.message);
        window.location.reload();
      } else {
        this.spinner.hide();
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  btnExcel(): void {
    this.utils.JSONToCSVConvertor(
      this.excelData,
      'Farmer Feed Indent Approved Data',
      true
    );
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
