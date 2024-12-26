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
import { promise } from 'selenium-webdriver';
import { DcModuleService } from 'src/app/dcModule/services/dc-module.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-meeting-photos-list',
  templateUrl: './meeting-photos-list.component.html',
  styleUrls: ['./meeting-photos-list.component.css'],
})
export class MeetingPhotosListComponent
  implements OnInit, OnDestroy, AfterViewInit {
  photosList = [];

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private dcAPI: DcModuleService,
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
    this.loadPhotosList();
  }

  async loadPhotosList(): Promise<void> {
    try {
      const req = {
        districtId: this.session.districtId,
      };
      this.spinner.show();
      const response = await this.dcAPI.villagemeetingPhotosList(req);
      this.spinner.hide();
      if (response.success) {
        this.photosList = response.result;
        this.rerender();
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnViewPhoto(photo): Promise<void> {
    try {
      this.spinner.show();
      const response = await this.utils.DMSFileDownload(photo);
      this.spinner.hide();
      if (response.success) {
        await this.utils.viewImage(response.result);
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnDeletePhoto(id): Promise<void> {
    try {
      if (!confirm('Are you sure want to delete Photo ?')) {
        return;
      }
      const req = {
        districtId: this.session.districtId,
        uniqueId: id,
      };
      this.spinner.show();
      const response = await this.dcAPI.deleteMeetingPhotoById(req);
      this.spinner.hide();
      if (response.success) {
        alert(response.message);
        window.location.reload();
      } else {
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
