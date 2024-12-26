import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { FarmerService } from '../../services/farmer.service';

@Component({
  selector: 'app-migration-return-request-update',
  templateUrl: './migration-return-request-update.component.html',
  styleUrls: ['./migration-return-request-update.component.css']
})
export class MigrationReturnRequestUpdateComponent implements OnInit, OnDestroy, AfterViewInit {
  personList: any;
  rejectedReason: any;

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();
  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private farmerAPI: FarmerService,
    private utils: UtilsService,
    private sanitizer: DomSanitizer,
    private logger: LoggerService,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ''){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    this.migrationPersonList();
  }

  async migrationPersonList(): Promise<void> {
    try {
      const req = {
        role: this.session.desigId,
        uniqueId: this.session.rbkGroupId
          ? this.session.rbkGroupId
          : this.session.uniqueId,
      };
      this.personList = [];
      this.spinner.show();
      const response = await this.farmerAPI.migrationReturnList(req);
      if (response.success) {
        this.personList = response.result.map((obj)=>({...obj,rejectedReason : ''}));
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

  async btnVerify(obj): Promise<void> {
    try {
      if (this.utils.isEmpty(obj.ACTION_TAKEN) || obj.ACTION_TAKEN === ' ') {
        this.toast.warning('Please Select Action');
        return;
      }
      if (obj.ACTION_TAKEN === '2'){
        if (this.utils.isEmpty(obj.rejectedReason)) {
          this.toast.warning('Please Enter Reason');
          return;
        }
      }
      const req = {
        txnId: obj.TXN_ID,
        uidNum: obj.UID_NUM,
        status: obj.ACTION_TAKEN,
        rejectedReason : obj.rejectedReason
      };
      this.personList = [];
      this.spinner.show();
      const response = await this.farmerAPI.migrationReturnSub(req);
      if (response.success) {
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

