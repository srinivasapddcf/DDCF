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
  selector: 'app-bank-cheyutha-list',
  templateUrl: './bank-cheyutha-list.component.html',
  styleUrls: ['./bank-cheyutha-list.component.css']
})
export class BankCheyuthaListComponent implements OnInit, OnDestroy, AfterViewInit {
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
    this.districtName = this.session.districtName;
    this.loadDashboard();
  }

  async loadDashboard(): Promise<void>{
    try{
      this.dashboardDetails = [];
      const req = {
        ifscCode: this.session.ifscCode,
      };
      this.spinner.show();
      const response = await this.bankAPI.bankerDashboard(req);
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
      this.headingText = 'PENDING LOAN VERIFICATION DETAILS';
      this.pendingLaonList();
    } else if (id === '3') {
      this.headingText = 'BANK GROUND PENDING DETAILS';
      this.pendingGroundingList();
    }
  }

  async pendingLaonList(): Promise<void>{
    try{
      this.personList = [];
      const req = {
        ifscCode: this.session.ifscCode,
      };
      this.spinner.show();
      const response = await this.bankAPI.pendingLoanVerifyList(req);
      this.spinner.hide();
      if (response.success) {
        this.personList = response.result;
        this.rerender();
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async pendingGroundingList(): Promise<void>{
    try{
      this.personList = [];
      const req = {
        ifscCode: this.session.ifscCode,
      };
      this.spinner.show();
      const response = await this.bankAPI.pendingBankGroundingList(req);
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

  async completedDashboardList(): Promise<void>{
    try{
      this.personList = [];
      const req = {
        ifscCode: this.session.ifscCode,
      };
      this.spinner.show();
      const response = await this.bankAPI.completedList(req);
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
      this.router.navigate(['/bankModule/LoanVerification'], {
        queryParams: { request: encryptedString },
      });
    } else if (this.reportType === '3') {
      this.router.navigate(['/bankModule/Grounding'], {
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
