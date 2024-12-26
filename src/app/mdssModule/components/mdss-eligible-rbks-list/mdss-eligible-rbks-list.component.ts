import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { MdssService } from '../../services/mdss.service';

@Component({
  selector: 'app-mdss-eligible-rbks-list',
  templateUrl: './mdss-eligible-rbks-list.component.html',
  styleUrls: ['./mdss-eligible-rbks-list.component.css']
})
export class MdssEligibleRbksListComponent implements OnInit {

  rbkList = [];
  villageList = [];
  personList = [];
  meetingsList = [];
 
  todate='';
  
  personDetails = {
    FARMER_NAME: '',
    FARMER_CODE: '',
    GENDER: '',
    DOB_DT: '',
    MOBILE_NUMBER: '',
    UID_NUM: '',
    AGE: '',
    STATUS: '',
  };
  meetingData = {
    districtId: '',
    mandalId: '',
    rbkId: '',
    meetingId: '',
    insertedBy: '',
    source: '',
    farmerAttendance: [],
  };
  farmersData = {
    farmerId: '',
    farmerName: '',
    gender: '',
    uidNum: '',
    dob: '',
    mobileNo: '',
  };

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private attendanceAPI: MdssService,
    private utils: UtilsService,
    private logger: LoggerService,
    private session: SessionService,
    private router:Router
  ) {}

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
      const req = {
        route_id: this.session.rbkGroupId,
      };
      debugger;
      this.spinner.show();
      const response = await this.attendanceAPI.EligibalRBKsList(req);
      if (response.success) {
        this.rbkList = response.result;
        this.todate=response.result[0].MSG;
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
      this.personList = [];
      if (this.meetingData.rbkId === '') {
        return;
      }      
      const req = {
        rbk: this.meetingData.rbkId,         
      };
      this.spinner.show();
      const response = await this.attendanceAPI.EligibalRBKs_Details(req);
      if (response.success) {
        debugger;
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

   
  validate(): boolean {
    if (this.utils.isEmpty(this.meetingData.rbkId)) {
      this.toast.warning('Please Select RSK');
      return false;
    }

    if (this.utils.isEmpty(this.meetingData.meetingId)) {
      this.toast.warning('Please Select Meeting Details');
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
      dtInstance.clear().draw(); // Add this  line to clear all rows..
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
}