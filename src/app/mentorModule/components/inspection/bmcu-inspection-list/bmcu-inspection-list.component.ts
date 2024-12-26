import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { McuMappingService } from 'src/app/mentorModule/services/mcu-mapping.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-bmcu-inspection-list',
  templateUrl: './bmcu-inspection-list.component.html',
  styleUrls: ['./bmcu-inspection-list.component.css']
})
export class BmcuInspectionListComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();

  rbkList = [];
  villageList = [];
  inspectionList = [];
  rbkId = '';
  villageId = '';

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private mcuAPI: McuMappingService,
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
    this.loadRBKList();
  }
  async loadRBKList(): Promise<void> {
    try {
      const req = {
        uniqueId: this.session.rbkGroupId,
      };
      this.spinner.show();
      const res = await this.mcuAPI.rbkListByMentorId(req);
      this.spinner.hide();
      if (res.success) {
        this.rbkList = res.result;
      } else {
        this.toast.info(res.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onRbkChange(): Promise<void> {
    try {
      this.villageId = '';
      this.villageList = [];
      this.inspectionList = [];
      if (this.utils.isEmpty(this.rbkId)) {
        return;
      }
      const req = {
        rbkId: this.rbkId,
      };
      this.spinner.show();
      const res = await this.mcuAPI.bmcuVillageListByRbkId(req);
      this.spinner.hide();
      if (res.success) {
        this.villageList = res.result;
      } else {
        this.toast.info(res.message);
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

  async btnSubmit(): Promise<void> {
    try {
      const req = {
        rbkId: this.rbkId,
        villageId: this.villageId
      };
      this.spinner.show();
      const res = await this.mcuAPI.inspectionDetailsList(req);
      this.spinner.hide();
      if (res.success) {
        this.inspectionList = res.result;
        this.rerender();
      } else {
        this.toast.info(res.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  validate(): boolean {
    if (this.utils.isEmpty(this.rbkId)) {
      this.toast.warning('Please Select RSK');
      return false;
    }

    if (this.utils.isEmpty(this.villageId)) {
      this.toast.warning('Please Select Village');
      return false;
    }
    return true;
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
