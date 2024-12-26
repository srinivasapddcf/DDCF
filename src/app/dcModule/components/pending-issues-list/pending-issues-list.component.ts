import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { DcModuleService } from '../../services/dc-module.service';

@Component({
  selector: 'app-pending-issues-list',
  templateUrl: './pending-issues-list.component.html',
  styleUrls: ['./pending-issues-list.component.css']
})
export class PendingIssuesListComponent implements OnInit, OnDestroy , AfterViewInit {

  issuesList = [];
  issuesDetails = [];

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private spinner: NgxSpinnerService,
    private session: SessionService,
    private toast: ToasterService,
    private utils: UtilsService,
    private servicesApi: DcModuleService,
    private logger: LoggerService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ""){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    this.loadingIssues();
  }

  async loadingIssues(): Promise<void>{
    try{
      const req = {
        districtId: this.session.districtId
      };
      this.spinner.show();
      const response = await this.servicesApi.issuesListByDistrictId(req);
      if (response.success) {
        this.issuesList = response.result;
        this.rerender();
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  btnGetDetails(obj): void{
    const requestData = {
      issueId: obj
    };

    const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
    this.router.navigate(['/dcModule/ViewPendingIssue'], {
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
