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
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { AhService } from '../../services/ah.service';

@Component({
  selector: 'app-cheyutha-list',
  templateUrl: './cheyutha-list.component.html',
  styleUrls: ['./cheyutha-list.component.css'],
})
export class CheyuthaListComponent implements OnInit, OnDestroy, AfterViewInit {
  districtName: any;
  dashboardDetails: any;
  personList = [];
  headingText = '';
  reportType = '';

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private ahAPI: AhService,
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
    this.districtName = this.session.districtName;
    this.loadDashboard();
  }

  async loadDashboard(): Promise<void> {
    try {
      this.dashboardDetails = [];
      this.personList = [];
      const req = {
        districtId: this.session.rbkGroupId,
      };
      this.spinner.show();
      const response = await this.ahAPI.ahDashboard(req);
      if (response.success) {
        this.dashboardDetails = response.result[0];
      } else {
        this.toast.info(response.message);
      }
      this.rerender();
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  btnDashboardDetails(id): void {
    this.reportType = id;
    if (id === '1') {
      this.headingText = 'COMPLETED DETAILS';
      this.completedDashboardList();
    } else if (id === '2') {
      this.headingText = 'CHANGE OF NATURE OF UNIT PENDING DETAILS';
      this.pendingNOUList();
    } else if (id === '3') {
      this.headingText = 'DEPARTMENT GROUND PENDING DETAILS';
      this.pendingGroundingList();
    }
  }

  async pendingNOUList(): Promise<void> {
    try {
      this.personList = [];
      const req = {
        districtId: this.session.rbkGroupId,
      };
      this.spinner.show();
      const response = await this.ahAPI.ahPendingChangeNOUList(req);
      if (response.success) {
        this.personList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.rerender();
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async pendingGroundingList(): Promise<void> {
    try {
      this.personList = [];
      const req = {
        districtId: this.session.rbkGroupId,
      };
      this.spinner.show();
      const response = await this.ahAPI.ahGroundingPendingList(req);
      if (response.success) {
        this.personList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.rerender();
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async completedDashboardList(): Promise<void> {
    try {
      this.personList = [];
      const req = {
        districtId: this.session.rbkGroupId,
      };
      this.spinner.show();
      const response = await this.ahAPI.completedList(req);
      if (response.success) {
        this.personList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.rerender();
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  btnVerify(obj): void {
    const requestData = {
      benId: obj.BEN_CODE,
    };

    const encryptedString = this.utils.encrypt(JSON.stringify(requestData));

    if (this.reportType === '2') {
      this.router.navigate(['/ahModule/NatureOfUnitChange'], {
        queryParams: { request: encryptedString },
      });
    } else if (this.reportType === '3') {
      this.router.navigate(['/ahModule/Grounding'], {
        queryParams: { request: encryptedString },
      });
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
      // Clear the table
      dtInstance.clear();
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
}
