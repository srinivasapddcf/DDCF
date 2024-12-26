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
import { FarmerService } from '../../services/farmer.service';

@Component({
  selector: 'app-dead-migration-approvals',
  templateUrl: './dead-migration-approvals.component.html',
  styleUrls: ['./dead-migration-approvals.component.css'],
})
export class DeadMigrationApprovalsComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  dashboardCounts = {
    TOTAL: '0',
    MIGRATED: '0',
    DEAD: '0',
    REJECTED:'0',
    TOTAL_PENDING: '0',
  };

  headingText = '';
  requestType = '';
  farmerCertList = [];
  statusList = [];
  status = '';
  rejectedReason = '';
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private farmerAPI: FarmerService,
    private utils: UtilsService,
    private logger: LoggerService,
    private session: SessionService,
    private masters: MastersService
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

  async loadDashboard(): Promise<void> {
    try {
      const req = {
        uniqueid: this.session.uniqueId,
        role: this.session.desigId,
        districtId: this.session.districtId,
      };
      this.spinner.show();
      const res = await this.farmerAPI.dashboardCounts(req);
      this.spinner.hide();
      if (res.success) {debugger;
        this.dashboardCounts = res.result[0];
      } else {
        this.toast.info(res.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnFarmerDashboardDetails(obj): Promise<void> {
    try {
      this.farmerCertList = [];
      this.requestType = obj;

      if (
        this.requestType === '0' &&
        this.dashboardCounts.TOTAL_PENDING === '0'
      ) {
        return;
      }
      if (this.requestType === '1' && this.dashboardCounts.MIGRATED === '0') {
        return;
      }
      if (this.requestType === '2' && this.dashboardCounts.DEAD === '0') {
        return;
      }
      if (this.requestType === '3' && this.dashboardCounts.TOTAL === '0') {
        return;
      }
      if (this.requestType === '4' && this.dashboardCounts.REJECTED === '0') {
         return;
      }

      this.spinner.show();
      let res: any;
      const req = {
        uniqueid: this.session.uniqueId,
        role: this.session.desigId,
        status: '0',
        districtId: this.session.districtId,
      };
      if (this.requestType === '0') {
        req.status = '2';
        this.headingText = 'PENDING LIST';
        res = await this.farmerAPI.personDetails(req);
      } else if (this.requestType === '1') {
        this.headingText = 'MIGRATED LIST';
        req.status = '4';
        res = await this.farmerAPI.personDetails(req);
      } else if (this.requestType === '2') {
        this.headingText = 'DEAD LIST';
        req.status = '3';
        res = await this.farmerAPI.personDetails(req);
      } else if (this.requestType === '3') {
        this.headingText = 'TOTAL LIST';
        req.status = '1';
        res = await this.farmerAPI.personDetails(req);
      }else if (this.requestType === '4') {
        this.headingText = 'REJECTED LIST';
        req.status = '5';
        res = await this.farmerAPI.personDetails(req);
      }
      this.spinner.hide();

      if (res.success) {
        this.farmerCertList = res.result.map((obj: any) => ({
          ...obj,
          STATUS: '',
          remarks: '',
        }));
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
      if (this.utils.isEmpty(obj.STATUS)) {
        this.toast.warning('Please select Action Taken');
        return;
      }
      if (this.utils.isEmpty(obj.remarks)) {
        this.toast.warning('Please Enter Remarks');
        return;
      }
      const req = {
        status: obj.STATUS,
        updatedBy: this.session.userName,
        txnId: obj.TXN_ID,
        remarks: obj.remarks,
        removeType: obj.REMOVE_TYPE
      };
      this.spinner.show();
      const response =  await this.farmerAPI.deadMigrationUpdate(req);
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
