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
  selector: 'app-farmer-dead-updation',
  templateUrl: './farmer-dead-updation.component.html',
  styleUrls: ['./farmer-dead-updation.component.css'],
})
export class FarmerDeadUpdationComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  uidNum: any;
  remarks: any;
  tempId: any;
  familyDetails: any;
  isFamilyDeadFlag = false;

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
  }

  async btnUidDetails(): Promise<void> {
    try {
      if (this.utils.isEmpty(this.uidNum)) {
        this.toast.warning('Please Enter Aadhar Number');
        return;
      }
      if (!this.utils.validateVerhoeff(this.uidNum)) {
        this.toast.warning('Please Enter Valid Aadhaar Number');
        return;
      }
      const req = {
        uidNum: this.uidNum,
      };
      this.spinner.show();
      const response = await this.farmerAPI.familyListByUid(req);
      if (response.success) {
        this.familyDetails = response.result;
        this.tempId = response.result[0].TEMP_ID;

        let deadPeopleCount = 0;
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.familyDetails.length; i++) {
          if (this.familyDetails[i].IS_PERSON_DEAD === '1') {
            deadPeopleCount++;
          }
        }
        if (this.familyDetails.length === deadPeopleCount) {
          this.isFamilyDeadFlag = true;
        }

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

  async btnfarmerDeadUpdate(): Promise<void> {
    try {
      const req = {
        remarks: this.remarks,
        tempId: this.tempId,
        updatedBy: this.session.userName,
      };
      this.spinner.show();
      const response = await this.farmerAPI.familyDeadUpdation(req);
      if (response.success) {
        alert(response.message);
        window.location.reload();
      } else {
        this.toast.info(response.message);
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
      dtInstance.destroy();

      dtInstance.clear();

      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
}
