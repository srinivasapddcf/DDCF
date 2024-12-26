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
import { McuMappingService } from 'src/app/mentorModule/services/mcu-mapping.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { MastersService } from 'src/app/shared/services/masters.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-mentor-dashboard',
  templateUrl: './mentor-dashboard.component.html',
  styleUrls: ['./mentor-dashboard.component.css'],
})
export class MentorDashboardComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  dashboardCounts = {
    Approve: '0',
    Pending_at_higher_level: '0',
    Reject: '0',
  };

  headingText = '';
  requestType = '';
  farmerCertList = [];
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private farmerAPI: McuMappingService,
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
        uniqueId: this.session.uniqueId,
        levelId: this.session.desigId,
        districtId:this.session.districtId,
        insertedBy: this.session.uniqueId,//this.session.userName,

      };
      this.spinner.show();
      debugger;
      const res = await this.farmerAPI.mentorDashboardCounts(req);
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

  async btnFarmerDashboardDetails(obj): Promise<void> {
    try {
      this.farmerCertList = [];
      this.requestType = obj;

      if (this.requestType === '0' && this.dashboardCounts.Pending_at_higher_level === '0') {
        return;
      }
      if (this.requestType === '1' && this.dashboardCounts.Approve === '0') {
        return;
      }
      if (this.requestType === '2' && this.dashboardCounts.Reject === '0') {
        return;
      }

      this.spinner.show();
      let res: any;
      if (this.requestType === '0') {
        this.headingText = 'PENDING AT HIGHER LEVEL LIST';
        const req = {
          uniqueId: this.session.uniqueId,
          status: '2',
        };
        res = await this.farmerAPI.mentorFarmerCertList(req);
      } else if (this.requestType === '1') {
        this.headingText = 'APPROVED LIST';
        const req = {
          uniqueId: this.session.uniqueId,
          status: '1',
        };
        res = await this.farmerAPI.mentorFarmerCertList(req);
      } else if (this.requestType === '2') {
        this.headingText = 'REJECTED LIST';
        const req = {
          uniqueId: this.session.uniqueId,
          status: '3',
        };
        res = await this.farmerAPI.mentorFarmerCertList(req);
      }
      this.spinner.hide();
debugger;
      if (res.success) {
        this.farmerCertList = res.result;
      } else {
        this.toast.info(res.message);
      }
      this.rerender();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnCertificateDownload(obj): Promise<void> {
    try {
      const req = {
        farmerId: obj.FARMER_CODE,
        insertedBy: this.session.userName,
      };
      const fileName = 'farmerMilkPouringCertificate';
      let basePDF = '';
      this.spinner.show();
      const res = await this.farmerAPI.milkPouringCertificate(req);
      if (res.success) {
        basePDF = res.result;
        this.utils.downloadPdfFile(basePDF, fileName);
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
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
