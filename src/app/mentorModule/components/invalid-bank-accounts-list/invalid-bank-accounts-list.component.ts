import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { McuMappingService } from '../../services/mcu-mapping.service';

@Component({
  selector: 'app-invalid-bank-accounts-list',
  templateUrl: './invalid-bank-accounts-list.component.html',
  styleUrls: ['./invalid-bank-accounts-list.component.css'],
})
export class InvalidBankAccountsListComponent
  implements OnInit, AfterViewInit, OnDestroy {
  pendingList: any;

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private mentorAPI: McuMappingService,
    private utils: UtilsService,
    private sanitizer: DomSanitizer,
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
    this.loadPendingList();
  }

  async loadPendingList(): Promise<void> {
    try {
      this.pendingList = [];
      const req = {
        mentorId: this.session.rbkGroupId,
      };
      this.spinner.show();debugger;
      const response = await this.mentorAPI.mentorApprovalList(req);
      if (response.success) {
        this.pendingList = response.result;
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

  async btnPhotoView(photo): Promise<void> {
    try { debugger;
      this.spinner.show();



      const response = await this.utils.DMSFileDownload(photo);
      if (response.success) {
        let passbookPhoto = (this.sanitizer.bypassSecurityTrustResourceUrl(
          response.result
        ) as any).changingThisBreaksApplicationSecurity;
        this.utils.viewImage(passbookPhoto); 
        // this.toast.showImage(passbookPhoto);
      } else {
        
        const response1 = await this.utils.JPVReportsDMSFileDownload(photo);
        if (response1.success) {
          let passbookPhoto = (this.sanitizer.bypassSecurityTrustResourceUrl(
            response1.result
          ) as any).changingThisBreaksApplicationSecurity;
          this.utils.viewImage(passbookPhoto); 
          // this.toast.showImage(passbookPhoto);
        } else {  
          this.toast.info(response.message);
        }

       // this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnVerify(obj): Promise<void> {
    try { debugger;
      if (
        obj.ACTION === '' ||
        obj.ACTION === ' ' ||
        obj.ACTION === null ||
        obj.ACTION === undefined
      ) {
        this.toast.warning('Please select Action Taken');
        return;
      }
      const req = {
        uidNum: obj.UID_NUM,
        actionTaken: obj.ACTION,
        
        insertedBy: this.session.userName,
      };
      this.spinner.show();debugger;
      const response = await this.mentorAPI.mentorApprovalUpdation(req);
      if (response.success) {debugger;
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
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
}
