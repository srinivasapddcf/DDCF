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
import { McuMappingService } from 'src/app/mentorModule/services/mcu-mapping.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-first-priority-list',
  templateUrl: './first-priority-list.component.html',
  styleUrls: ['./first-priority-list.component.css'],
})
export class FirstPriorityListComponent
  implements OnInit, AfterViewInit, OnDestroy {
  priorityList = [];

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private mentorAPI: McuMappingService,
    private utils: UtilsService,
    private toast: ToasterService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ""){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    
    this.loadPriorityList();
  }

  async loadPriorityList(): Promise<void> {
    try {
      this.priorityList = [];
      this.spinner.show();
      const req = {
        districtId: this.session.districtId,
      };
      const response = await this.mentorAPI.firstPriorityList(req);
      this.spinner.hide();
      if (response.success) {
        this.priorityList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.rerender();
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
