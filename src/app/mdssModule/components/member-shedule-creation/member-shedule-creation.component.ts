import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePickerService } from 'src/app/shared/services/date-picker.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { MdssService } from '../../services/mdss.service';

@Component({
    selector: 'app-member-shedule-creation',
    templateUrl: './member-shedule-creation.component.html',
    styleUrls: ['./member-shedule-creation.component.css']
})
export class MemberSheduleCreationComponent implements OnInit {

    minDate: Date;
    maxDate: Date;
    rbkList = [];
    Meetinglist: any[] = [];
    meetingagendaidv = false;

    scheduleData = {
        districtId: '',
        mandalId: '',
        rbkId: '',
        meetingVenue: '',
        meetingVenueAddress: '',
        meetingDate: '',
        meetingTime: '',
        meetingAgenda: '',
        insertedBy: '',
        source: '',
        MeetingAgendaother: '',
        type: '',
        mentorId: ''
    };

    constructor(
        private spinner: NgxSpinnerService,
        private toast: ToasterService,
        private router: Router,
        private meetingAPI: MdssService,
        private utils: UtilsService,
        private logger: LoggerService,
        private session: SessionService,
        private datePicker: DatePickerService
    ) {
        this.minDate = this.session.getTodayDate();
        this.maxDate = this.session.getMaxScheduleDate();
    }

    ngOnInit(): void {
        //this.mdssauthenticationByUniqID();
        if (this.session.uniqueId != "" && this.session.desigId != '') {

        }
        else {
            this.router.navigate(['/shared/UnAuthorized']);
        }
        meetingAgenda: "Registration of MDSS";
        this.loadRBKList();
        this.loadmeetingAgenda();
    }

    // async mdssauthenticationByUniqID(): Promise<void> {
    //     try {

    //         const req = {
    //             ptype: 1,
    //             punique_id: this.session.uniqueId,
    //             pid: 0,

    //         };

    //         const response = await this.meetingAPI.mdssAuthenticationByUniqueId(req);
    //         if (response.success) {
    //             if (response.result[0].STATUS === "1") {
    //                 // this.router.navigate(['/mentorModule/ScheduleCreation']);

    //             } else { this.router.navigate(['/shared/UnAuthorized']) };



    //         } else {
    //             // this.toast.info(response.message);
    //         }
    //         //this.spinner.hide();
    //     } catch (error) {
    //         //  this.spinner.hide();
    //         //  this.utils.catchResponse(error);
    //     }
    // }

    async loadRBKList(): Promise<void> {
        try {
            debugger;
            meetingAgenda: "Registration of MDSS";
            const req = {
                route_id: this.session.uniqueId,
            };
            debugger;
            this.spinner.show();
            const response = await this.meetingAPI.NotSheduleCreated_RbkList(req);
            debugger;
            if (response.success) {
                this.rbkList = response.result;
                // console.log(this.rbkList);
                // if(response.result[0].STATUS=='0'){
                //   this.toast.info(response.message);
                // }
                // if(response.result[0].STATUS=='1'){
                //   this.rbkList = response.result;
                // }

            } else {
               // this.toast.info(response.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async loadmeetingAgenda(): Promise<void> {
        try {
            // meetingAgenda:"Registration of MDSS";
            const req = {

                source: '2'
            };
            debugger;
            this.spinner.show();
            // const response = await this.meetingAPI.regSubmittedRbkList(req);
            const response = await this.meetingAPI.meetingDetailsByRbkId(req);
            debugger;
            if (response.success) {
                this.Meetinglist = response.result;
                // if(response.result[0].STATUS=='0'){
                //   this.toast.info(response.message);
                // }
                // if(response.result[0].STATUS=='1'){
                //   this.rbkList = response.result;
                // }

            } else {
                this.toast.info(response.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    // async onRbkChange(): Promise<void> {
    //     // this.scheduleData.meetingVenue = '';
    //     // this.scheduleData.meetingVenueAddress = '';
    //     // this.scheduleData.meetingDate = '';
    //     // this.scheduleData.meetingTime = '';
    //     // this.scheduleData.meetingAgenda = 'Registration of MDSS';
    // }
    async onmeetingChange(): Promise<void> {
        if (this.scheduleData.meetingAgenda == '1') {
            //this.scheduleData.meetingAgenda = 'Registration of MDSS';
            this.meetingagendaidv = false;
        }
        else {
            this.meetingagendaidv = true;
            //this.scheduleData.meetingAgenda = this.scheduleData.MeetingAgendaother;
        }

        // this.scheduleData.meetingAgenda = 'Registration of MDSS';
    }

    async btnSubmit(): Promise<void> {
        try {
            if (this.validate()) {
                debugger;
                let obj = this.rbkList.find(data => data.RBK_CODE == this.scheduleData.rbkId);
                this.scheduleData.mentorId = obj.MDSS_CODE
                // this.scheduleData.mandalId = this.session.mandalId;
                this.scheduleData.insertedBy = this.session.userName;
                this.scheduleData.source = 'web';
                this.scheduleData.type = '1';
                this.scheduleData.rbkId = this.scheduleData.rbkId;
                // this.scheduleData.rbkId=
                // const obj={
                //     type: "1",
                //     rbkId: this.scheduleData.rbkId ,
                //     meetingVenue: this.scheduleData.meetingVenue ,
                //     meetingVenueAddress: this.scheduleData.meetingVenueAddress,
                //     meetingDate: this.scheduleData.meetingDate,
                //     meetingTime: this.scheduleData.meetingTime,
                //     meetingAgenda: this.scheduleData.MeetingAgendaother,
                //     source: "web",
                //     mentorId: "789456",

                // }
                this.spinner.show();
                const response = await this.meetingAPI.SheduleCreationIns(
                    this.scheduleData
                );
                this.spinner.hide();
                if (response.success) {
                    alert(response.message);
                    window.location.reload();
                } else {
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
            this.toast.warning('Please Select Meeting Time');
            return false;
        }

        if (this.utils.isEmpty(this.scheduleData.MeetingAgendaother)) {
            this.toast.warning('Please Enter Meeting Agenda');
            return false;
        }

        return true;
    }
}