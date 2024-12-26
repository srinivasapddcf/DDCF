import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { TechnicianService } from '../../services/technician.service';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.css'],
})
export class IssueDetailsComponent implements OnInit {
  videoPlayer = {
    popUp: false,
    filePath: '',
  };
  issueDetails: any;
  input: any;
  issueId: any;
  remarks: any;
  issueImage: any;
  documentPdf: any;
  constructor(
    private sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService,
    private session: SessionService,
    private toast: ToasterService,
    private utils: UtilsService,
    private servicesApi: TechnicianService,
    private logger: LoggerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    route.queryParams.subscribe((params) => (this.input = params['request']));
  }

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ''){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    const decString = JSON.parse(this.utils.decrypt(this.input));
    this.issueId = decString.issueId;
    this.loadIssueDetails();
  }
  async loadIssueDetails(): Promise<void> {
    try {
      const req = {
        issueId: this.issueId,
      };
      this.issueDetails = '';
      this.spinner.show();
      const res = await this.servicesApi.detailsByIssueId(req);

      if (res.success) {
        this.issueDetails = res.result[0];
        if (
          this.issueDetails.ISSUE_IMG !== null &&
          this.issueDetails.ISSUE_IMG !== undefined &&
          this.issueDetails.ISSUE_IMG !== ''
        ) {
          this.issueImage = await this.getBaseFile(this.issueDetails.ISSUE_IMG);
        }
        if (this.issueDetails.DOCUMENT_PATH !== 'NA') {
          this.documentPdf = await this.getBaseFile(
            this.issueDetails.DOCUMENT_PATH
          );
        }
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async getBaseFile(path): Promise<string> {
    try {
      if (!this.utils.isEmpty(path)) {
        this.spinner.show();
        const res = await this.utils.DMSFileDownload(path);
        this.spinner.hide();
        if (res.success) {
          return res.result;
        }
      }
      return '';
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  btnImage(image): void {
    this.utils.viewImage(image);
  }

  btnViewPDF(pdfFile): void {
    if (!this.utils.isEmpty(pdfFile)) {
      this.utils.viewPDF(pdfFile);
    } else {
      this.toast.warning('PDF is Not Available');
    }
  }

  btnViewVideo(videoFile): void {
    if (!this.utils.isEmpty(videoFile)) {
      this.videoPlayer.filePath =
        this.utils.baseUrl() + 'api/common/getVideo?request=' + videoFile;
      this.videoPlayer.popUp = true;
    } else {
      this.toast.warning('Video is Not Available');
    }
  }

  async btnUpdateIssueStatus(): Promise<void> {
    try {
      if (
        this.remarks === '' ||
        this.remarks === null ||
        this.remarks === undefined
      ) {
        this.toast.warning('Please Enter Remarks');
        return;
      }

      const req = {
        role: this.session.desigId,
        issueId: this.issueId,
        remarks: this.remarks,
        updatedBy: this.session.userName,
      };
      this.spinner.show();

      let res: any;
      if (this.issueDetails.ISSUE_STATUS === '0') {
        res = await this.servicesApi.closeIssueByIssueId(req);
      } else if (this.issueDetails.ISSUE_STATUS === '1') {
        res = await this.servicesApi.openIssueByIssueId(req);
      } else if (this.issueDetails.ISSUE_STATUS === '2') {
        res = await this.servicesApi.closeIssueByIssueId(req);
      }
      if (res.success) {
        alert(res.message);
        this.router.navigate(['/technician/IssuesDashboard']);
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
}
