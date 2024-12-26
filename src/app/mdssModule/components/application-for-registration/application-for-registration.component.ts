import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePickerService } from 'src/app/shared/services/date-picker.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UserManualsService } from 'src/app/shared/services/user-manuals.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { MdssService } from '../../services/mdss.service';

@Component({
  selector: 'app-application-for-registration',
  templateUrl: './application-for-registration.component.html',
  styleUrls: ['./application-for-registration.component.css'],
})
export class ApplicationForRegistrationComponent implements OnInit {
  @ViewChild('applicationUpload') applicationUpload: ElementRef;
  rbkList = [];

  noDataMessage = '';
  registrationFormUrl ='';

  registrationData = {
    districtId: '',
    mandalId: '',
    rbkId: '',
    applicationPdfForm: '',
    insertedBy: '',
    source: '',
  };

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private meetingAPI: MdssService,
    private utils: UtilsService,
    private logger: LoggerService,
    private session: SessionService,
    private datePicker: DatePickerService,
    private userManual: UserManualsService
  ) {
    this.registrationFormUrl = this.userManual.registrationForm;
  }

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ''){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    this.loadRBKList();
  }

  async loadRBKList(): Promise<void> {
    try {
      this.noDataMessage = '';
      const req = {
        uniqueId: this.session.rbkGroupId,
      };
      this.spinner.show();
      const response = await this.meetingAPI.rbkListByMentorId(req);
      if (response.success) {
        this.rbkList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onRbkChange(): Promise<void> {
    this.noDataMessage = '';
    this.registrationData.applicationPdfForm = '';
    this.applicationUpload.nativeElement.value = '';
  }

  async btnSubmit(): Promise<void> {
    try {
      if (this.validate()) {
        this.registrationData.districtId = this.session.districtId;
        this.registrationData.mandalId = this.session.mandalId;
        this.registrationData.insertedBy = this.session.userName;
        this.registrationData.source = 'web';
        this.spinner.show();
        const response = await this.meetingAPI.mdssApplicationRegSub(
          this.registrationData
        );
        this.spinner.hide();
        if (response.success) {
          alert(response.message);
          window.location.reload();
        } else {
          // this.toast.info(response.message);
          this.noDataMessage = response.message;
        }
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  validate(): boolean {
    if (this.utils.isEmpty(this.registrationData.rbkId)) {
      this.toast.warning('Please Select RSK');
      return false;
    }

    if (this.utils.isEmpty(this.registrationData.applicationPdfForm)) {
      this.toast.warning('Please Upload Application For Registration Form');
      return false;
    }
    return true;
  }

  async onApplicationFormChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.PDF,
        this.utils.fileSize.oneMB
      );
      if (res) {
        this.registrationData.applicationPdfForm = res.replace(
          'data:application/pdf;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  btnDocumentDownload(url): void {
    if (this.utils.isEmpty(url)) {
      this.toast.warning('Registration Document Not Found !!!');
    } else {
      window.open(url, '_blank');
    }
  }
}
