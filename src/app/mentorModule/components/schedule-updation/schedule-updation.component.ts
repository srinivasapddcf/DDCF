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
import { DatePickerService } from 'src/app/shared/services/date-picker.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { McuMappingService } from '../../services/mcu-mapping.service';

@Component({
  selector: 'app-schedule-updation',
  templateUrl: './schedule-updation.component.html',
  styleUrls: ['./schedule-updation.component.css'],
})
export class ScheduleUpdationComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();

  minDate: Date;
  maxDate: Date;
  rbkList = [];
  villageList = [];
  meetingList = [];

  scheduleData = {
    districtId: '',
    mandalId: '',
    mentorId: '',
    rbkId: '',
    villageId: '',
    meetingVenue: '',
    meetingVenueAddress: '',
    meetingDate: '',
    meetingTime: '',
    meetingAgenda: '',
    updatedBy: '',
    source: '',
    meetingId: '',
  };
  updatePopUp = false;

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private mcuAPI: McuMappingService,
    private utils: UtilsService,
    private logger: LoggerService,
    private session: SessionService,
    private datePicker: DatePickerService
  ) {
    this.minDate = this.session.getTodayDate();
    this.maxDate = this.session.getMaxScheduleDate();
  }

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
      const response = await this.mcuAPI.rbkListByMentorId(req);
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
    try {
      this.scheduleData.villageId = '';
      this.villageList = [];
      this.meetingList = [];
      if (this.utils.isEmpty(this.scheduleData.rbkId)) {
        return;
      }

      const req = {
        districtId: this.session.districtId,
        rbkId: this.scheduleData.rbkId,
        uniqueId: this.session.rbkGroupId,
      };
      this.spinner.show();
      const response = await this.mcuAPI.villageListByRbkId(req);
      if (response.success) {
        this.villageList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onVillageChange(): Promise<void> {
    try {
      this.meetingList = [];
      if (this.utils.isEmpty(this.scheduleData.rbkId)) {
        return;
      }
      if (this.utils.isEmpty(this.scheduleData.villageId)) {
        return;
      }

      const req = {
        districtId: this.session.districtId,
        rbkId: this.scheduleData.rbkId,
        villageId: this.scheduleData.villageId,
      };
      this.spinner.show();
      const response = await this.mcuAPI.scheduleListByVillageId(req);
      if (response.success) {
        this.meetingList = response.result;
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

  async btnRescheduling(obj): Promise<void> {
    this.scheduleData.meetingId = obj.MEETING_ID;
    this.scheduleData.meetingVenue = obj.MEETING_VENUE;
    this.scheduleData.meetingVenueAddress = obj.MEETING_VENUE_ADDRESS;
    this.scheduleData.meetingDate = obj.MEETING_DATE;
    this.scheduleData.meetingTime = obj.MEETING_TIME;
    this.scheduleData.meetingAgenda = obj.MEETING_AGENDA;
    this.updatePopUp = true;
  }

  async btnScheduleUpdate(): Promise<void> {
    try {
      if (this.validate()) {
        this.scheduleData.districtId = this.session.districtId;
        this.scheduleData.mandalId = this.session.mandalId;
        this.scheduleData.mentorId = this.session.rbkGroupId;
        this.scheduleData.updatedBy = this.session.userName;
        this.scheduleData.source = 'web';
        this.spinner.show();
        const response = await this.mcuAPI.scheduleUpdate(this.scheduleData);
        if (response.success) {
          alert(response.message);
          this.updatePopUp = false;
          window.location.reload();
        } else {
          this.spinner.hide();
          this.toast.info(response.message);
        }
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  validate(): boolean {
    if (this.utils.isEmpty(this.scheduleData.rbkId)) {
      this.toast.warning('Please Select RSK');
      return false;
    }

    if (this.utils.isEmpty(this.scheduleData.villageId)) {
      this.toast.warning('Please Select Village');
      return false;
    }

    if (this.utils.isEmpty(this.scheduleData.meetingVenue)) {
      this.toast.warning('Please Enter Meeting Venue');
      return false;
    }

    if (this.utils.isEmpty(this.scheduleData.meetingVenueAddress)) {
      this.toast.warning('Please Enter Meeting Venue Address');
      return false;
    }

    if (this.utils.isEmpty(this.scheduleData.meetingDate)) {
      this.toast.warning('Please Select Meeting Date');
      return false;
    }

    if (this.utils.isEmpty(this.scheduleData.meetingTime)) {
      this.toast.warning('Please Enter Meeting Time');
      return false;
    }

    if (this.utils.isEmpty(this.scheduleData.meetingAgenda)) {
      this.toast.warning('Please Enter Meeting Agenda');
      return false;
    }

    if (this.utils.isEmpty(this.scheduleData.meetingId)) {
      this.toast.warning('Please Enter Meeting ID');
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
