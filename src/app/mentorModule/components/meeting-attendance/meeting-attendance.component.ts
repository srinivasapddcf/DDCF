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
  selector: 'app-meeting-attendance',
  templateUrl: './meeting-attendance.component.html',
  styleUrls: ['./meeting-attendance.component.css'],
})
export class MeetingAttendanceComponent
  implements OnInit, OnDestroy, AfterViewInit {
  rbkList = [];
  villageList = [];
  personList = [];
  addAttendePopUp = false;
  singleAttenBtn = false;
  personDetails = {
    CITIZEN_NAME: '',
    GENDER: '',
    DOB_DT: '',
    MOBILE_NUMBER: '',
    UID_NUM: '',
    AGE: '',
    ATTENDANCE_STATUS: '',
  };
  meetingData = {
    districtId: '',
    mandalId: '',
    mentorId: '',
    rbkId: '',
    villageId: '',
    name: '',
    gender: '',
    dob: '',
    mobileNumber: '',
    uidNum: '',
    insertedBy: '',
    source: '',
  };

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private mcuAPI: McuMappingService,
    private utils: UtilsService,
    private logger: LoggerService,
    private session: SessionService,
    private router:Router
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
  secretaryuidNummaskIputData(value) {
     
    if (value.length > 0) {
      // if (this.secretaryDetails.uidNum.length > value.length) {
      //   this.secretaryDetails.uidNum = this.secretaryDetails.uidNum.substring(0, value.length);
      // } 
      // else {
      //   this.secretaryDetails.uidNum += String(value).slice(-1);        
      //   const valueSplit = value.split('');
      //   let maskedValue = '';
      //   valueSplit.forEach((element, index) => {
      //     if (index < 8) {
      //       maskedValue += "X";
      //     } else {
      //       maskedValue += element;
      //     }

      //   });
      //   this.suidNum = maskedValue;
      // }
      if(value.length>=12){
        this.meetingData.uidNum=value;
        const response = this.utils.validateVerhoeff(this.meetingData.uidNum);    
        if (response == true) {
          this.spinner.hide();
        } else {
         // this.uidNum='';
          this.toast.warning('Please Enter Valid Aadhaar Number');
          this.spinner.hide();
  
        }
        return
      }

    }   
    return;
    
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
      this.meetingData.villageId = '';
      this.personList = [];
      this.villageList = [];
      if (this.meetingData.rbkId === '') {
        return;
      }

      const req = {
        districtId: this.session.districtId,
        rbkId: this.meetingData.rbkId,
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
      this.personList = [];
      if (this.meetingData.villageId === '') {
        return;
      }
      const req = {
        rbkId: this.meetingData.rbkId,
      };
      this.spinner.show();
      const response = await this.mcuAPI.meetingAttendanceList(req);
      if (response.success) {
        this.personList = response.result;
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

  btnAddAttende(): void {
    if (this.validate()) {
      this.personDetails = {
        CITIZEN_NAME: '',
        GENDER: '',
        DOB_DT: '',
        MOBILE_NUMBER: '',
        UID_NUM: '',
        AGE: '',
        ATTENDANCE_STATUS: '',
      };
      this.meetingData.uidNum = '';
      this.addAttendePopUp = true;
      this.singleAttenBtn = false;
    }
  }

  async btnSearch(): Promise<void> {
    try {
      if (
        this.meetingData.uidNum === '' ||
        this.meetingData.uidNum === null ||
        this.meetingData.uidNum === undefined
      ) {
        this.toast.warning('Please Select Aadhaar Number');
        return;
      }

      if (!this.utils.validateVerhoeff(this.meetingData.uidNum)) {
        this.toast.warning('Please Enter Valid Aadhaar Number');
        return;
      }

      const req = {
        uidNum: this.meetingData.uidNum,
      };
      this.spinner.show();
      const response = await this.mcuAPI.searchByUid(req);
      if (response.success) {
        this.personDetails = response.result[0];
        if (this.personDetails.ATTENDANCE_STATUS === '1') {
          this.personDetails = {
            CITIZEN_NAME: '',
            GENDER: '',
            DOB_DT: '',
            MOBILE_NUMBER: '',
            UID_NUM: '',
            AGE: '',
            ATTENDANCE_STATUS: '',
          };
          this.toast.info(response.message);
        }
        this.singleAttenBtn = true;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  

  btnMarkSingleAttendance(): void {
    let req = {
      CITIZEN_NAME: this.personDetails.CITIZEN_NAME,
      GENDER: this.personDetails.GENDER,
      DOB_DT: this.personDetails.DOB_DT,
      MOBILE_NUMBER: this.personDetails.MOBILE_NUMBER,
      UID_NUM: this.personDetails.UID_NUM,
    };
    this.btnMarkAttendance(req);
  }

  async btnMarkAttendance(obj): Promise<void> {
    try {
      if (this.validate()) {
        this.meetingData.name = obj.CITIZEN_NAME;
        this.meetingData.gender = obj.GENDER;
        this.meetingData.dob = obj.DOB_DT;
        this.meetingData.mobileNumber = obj.MOBILE_NUMBER;
        this.meetingData.uidNum = obj.UID_NUM;
        this.meetingData.districtId = this.session.districtId;
        this.meetingData.mandalId = this.session.mandalId;
        this.meetingData.mentorId = this.session.rbkGroupId;
        this.meetingData.insertedBy = this.session.userName;
        this.meetingData.source = 'web';
        this.spinner.show();
        const response = await this.mcuAPI.meetingAttendanceSub(
          this.meetingData
        );
        if (response.success) {
          alert(response.message);
          this.addAttendePopUp = false;
          this.singleAttenBtn = false;
          this.onVillageChange();
        } else {
          this.toast.info(response.message);
        }
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  validate(): boolean {
    if (
      this.meetingData.rbkId === '' ||
      this.meetingData.rbkId === null ||
      this.meetingData.rbkId === undefined
    ) {
      this.toast.warning('Please Select RSK');
      return false;
    }

    if (
      this.meetingData.villageId === '' ||
      this.meetingData.villageId === null ||
      this.meetingData.villageId === undefined
    ) {
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
