import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { DcModuleService } from '../../services/dc-module.service';

@Component({
  selector: 'app-view-pending-issue',
  templateUrl: './view-pending-issue.component.html',
  styleUrls: ['./view-pending-issue.component.css']
})
export class ViewPendingIssueComponent implements OnInit, OnDestroy , AfterViewInit {
  issueDetails = {
    ISSUE_IMG: null,
  };
  input: any;
  issueId: any;
  remarks: any;
  issueImage = '';
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService,
    private session: SessionService,
    private toast: ToasterService,
    private utils: UtilsService,
    private servicesApi: DcModuleService,
    private logger: LoggerService,
    private route: ActivatedRoute,
    private router: Router
  ) {  route.queryParams.subscribe((params) => (this.input = params['request']));}

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ""){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    const decString = JSON.parse(this.utils.decrypt(this.input));
    this.issueId = decString.issueId;
    this.issuesList();
  }

  async issuesList(): Promise<void>{
    try{
      const req = {
        issueId: this.issueId
      };
      this.spinner.show();
      const response = await this.servicesApi.detailsByIssueId(req);
      if (response.success) {
        this.issueDetails = response.result[0];
        if (
          this.issueDetails.ISSUE_IMG !== null &&
          this.issueDetails.ISSUE_IMG !== undefined &&
          this.issueDetails.ISSUE_IMG !== ''
        ) {
          this.loadIssueImage(this.issueDetails.ISSUE_IMG);
        }
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async loadIssueImage(imagePath: any): Promise<void> {
    try {
      this.spinner.show();
      const response = await this.utils.DMSFileDownload(imagePath);
      if (response.success) {
        this.issueImage = (this.sanitizer.bypassSecurityTrustResourceUrl(
          response.result
        ) as any).changingThisBreaksApplicationSecurity;
      } else {
        this.spinner.hide();
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  btnImage(image): void {
  this.utils.viewImage(image);
  }

  btnUpdate(): void {
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
