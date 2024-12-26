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
    selector: 'app-new-meating-attandes',
    templateUrl: './new-meating-attandes.component.html',
    styleUrls: ['./new-meating-attandes.component.css']
})
export class NewMeatingAttandesComponent implements OnInit {

    rbkList = [];
    villageList = [];
    personList = [];
    meetingsList = [];
    MeetingStatus = false;
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
    meetingDetails = {
        districtId: '',
        mandalId: '',
        rbkId: '',
        meetingId: '',
        insertedBy: '',
        source: '',
    }
    meetingData = {
        type: '',
        status: '',
        Mdsscode: '',
        pinput1: 0,
        pinput2: '',
        pinput3: '',
        pinput4: '',
        pinput5: '',
        pinput6: '',
        // districtId: '',
        // mandalId: '',
        // rbkId: '',
        // meetingId: '',
        // insertedBy: '',
        // source: '',
        Attendancelist: [],
    };
    farmersData = {
        farmerId: '',
        farmerName: '',
        gender: '',
        uidNum: '',
        dob: '',
        mobileNo: '',
        districtId: '',
        source: 'Web',
        insertedBy: '',
        rbkId: '',
        meetingId: ''

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
        private router: Router
    ) { }

    ngOnInit(): void {
        if (this.session.uniqueId != "" && this.session.desigId != '') {

        }
        else {
            this.router.navigate(['/shared/UnAuthorized']);
        }
        this.loadRBKList();
    }

    async loadRBKList(): Promise<void> {
        try {
            const req = {
                route_id: this.session.rbkGroupId
            };
            debugger;
            this.spinner.show();

            const response = await this.attendanceAPI.Meating_Attadents_RbkList(req);
            if (response.success) {
                this.rbkList = response.result;
            } else {
               // this.toast.info(response.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async onRbkChange(): Promise<void> {
        try {
            debugger;
            this.meetingDetails.meetingId = '';
            this.meetingsList = [];
            this.personList = [];
            if (this.meetingDetails.rbkId === '') {
                return;
            }
            const req = {
                rbk: this.meetingDetails.rbkId,
            };

            this.spinner.show();
            const response = await this.attendanceAPI.Meating_Attadents_MeetingList(req);
            debugger;
            if (response.success) {
                this.meetingsList = response.result;
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

    async onMeetingChange(): Promise<void> {
        try {
            debugger;
            this.personList = [];
            if (this.meetingDetails.rbkId === '') {
                return;
            }
            if (this.meetingDetails.meetingId === '') {
                return;
            }
            const req = {
                rbk: this.meetingDetails.rbkId,
                meeting_code: this.meetingDetails.meetingId,
            };
            this.spinner.show();
            const response = await this.attendanceAPI.Meating_Details_List(req);

            if (response.success) {
                if (response.result[0].B_STATUS == "1") {
                    this.MeetingStatus = false;
                }
                if (response.result[0].B_STATUS == "0") {
                    this.MeetingStatus = true;
                }
                this.meetingData.Mdsscode = response.result[0].MDSS_CODE;
                this.personList = response.result.map((v) => ({
                    ...v,
                    isAttendance: false,
                }));
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

    async btnMarkAttendance(): Promise<void> {
        try {
            debugger;
            if (this.validate()) {
                this.meetingData.Attendancelist = [];
                const attendanceList = this.personList.filter(
                    (obj) => obj.isAttendance === true
                );
                // tslint:disable-next-line: prefer-for-of
                for (let i = 0; i < attendanceList.length; i++) {
                    this.farmersData = {
                        farmerId: '',
                        farmerName: '',
                        gender: '',
                        uidNum: '',
                        dob: '',
                        mobileNo: '',
                        districtId: '',
                        source: 'Web',
                        insertedBy: '',
                        rbkId: '',
                        meetingId: '',
                    };
                    this.farmersData = {
                        farmerId: attendanceList[i].FARMER_CODE,
                        farmerName: attendanceList[i].FARMER_NAME,
                        gender: attendanceList[i].GENDER,
                        uidNum: attendanceList[i].UID_NUM,
                        dob: attendanceList[i].DOB_DT,
                        mobileNo: attendanceList[i].MOBILE_NUMBER,
                        districtId: this.session.districtId,
                        source: 'Web',
                        insertedBy: this.session.userName,
                        rbkId: this.meetingDetails.rbkId,
                        meetingId: this.meetingDetails.meetingId

                    };
                    this.meetingData.Attendancelist.push(this.farmersData);
                }
                console.log(this.meetingData);
                debugger;

                if (attendanceList.length == 0) {

                    this.toast.warning(
                        'Please Select Atleast 1 Farmer to Submit Attendance '
                    );
                    return;
                }

                if (attendanceList.length == 1 || attendanceList.length == 2) {

                    this.toast.warning(
                        'please select atleast  3 farmer to submit attendance No Quorum'
                    );
                    return;
                }

                // if (attendanceList.length >15) {
                //   this.toast.warning('Only 15 farmers can submit attendance at a time');
                //   return;
                // }
                if (attendanceList.length == 1 || attendanceList.length == 2) {
                    this.meetingData.pinput1 = 2;
                }
                else {
                    this.meetingData.pinput1 = 1;
                }

                this.spinner.show();
                const response = await this.attendanceAPI.AttendanceInsertData(
                    this.meetingData
                );
                debugger;
                if (response.success) {

                    alert(response.message);
                    this.onMeetingChange();
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
        if (this.utils.isEmpty(this.meetingDetails.rbkId)) {
            this.toast.warning('Please Select RSK');
            return false;
        }

        if (this.utils.isEmpty(this.meetingDetails.meetingId)) {
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