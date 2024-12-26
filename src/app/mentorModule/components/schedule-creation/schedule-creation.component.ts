import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePickerService } from 'src/app/shared/services/date-picker.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { McuMappingService } from '../../services/mcu-mapping.service';

@Component({
  selector: 'app-schedule-creation',
  templateUrl: './schedule-creation.component.html',
  styleUrls: ['./schedule-creation.component.css'], 
})
export class ScheduleCreationComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  rbkList = [];
  villageList = [];

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
    insertedBy: '',
    source: '',
  };

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
    this.loadRBKList();
  }

  async loadRBKList(): Promise<void> {
    try {
      const req = {
        uniqueId:  this.session.rbkGroupId,
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
      if (this.scheduleData.rbkId === '') {
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

  async btnSubmit(): Promise<void> {
    try {
      console.log(this.scheduleData.meetingDate);

    //  let dateFormat =null;// require('dateformat');
    //  let now = new Date();
//let hrs= dateFormat(now, "HH");
//let mnts= dateFormat(now, "MM");

 



      if (this.validate()) {debugger;
        this.scheduleData.districtId = this.session.districtId;
        this.scheduleData.mandalId = this.session.mandalId;
        this.scheduleData.mentorId = this.session.rbkGroupId;
        this.scheduleData.insertedBy = this.session.userName;
        this.scheduleData.source = 'web';
        this.spinner.show();
        const response = await this.mcuAPI.scheduleCreation(this.scheduleData);
        if (response.success) {
          alert(response.message);
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

    return true;
  }
}
