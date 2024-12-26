import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { MdssService } from '../../services/mdss.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
    selector: 'app-new-minutesof-meeting',
    templateUrl: './new-minutesof-meeting.component.html',
    styleUrls: ['./new-minutesof-meeting.component.css']
})
export class NewMinutesofMeetingComponent implements OnInit {


    @ViewChild('photoUpload') photoUpload: ElementRef;
    @ViewChild('docUpload') docUpload: ElementRef;

    @ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = this.utils.dataTableOptions();
    dtTrigger: Subject<any> = new Subject();
    date: any;
    rbkList = [];
    meetingList = [];
    VILLAGE_LIST = '';
    meetingData = {
        meeting_code: '',
        rbk_code: '',
        path_type: '',
        image_path: '',
        Imagelist: [],
        districtId: '',
        mandalId: '',
        mentorId: '',


        minutesOfMeeting: '',
        insertedBy: '',
        source: '',
        photos: [],
        docs: '',
        meetingId: '',
        VILLAGE_LIST: '',
    };
    constructor(
        private spinner: NgxSpinnerService,
        private toast: ToasterService,
        private router: Router,
        private attendanceAPI: MdssService,
        private utils: UtilsService,
        private sanitizer: DomSanitizer,
        private logger: LoggerService,
        private session: SessionService
    ) { }

    ngOnInit(): void {
        if (this.session.uniqueId != "" && this.session.desigId != '') {

        }
        else {
            this.router.navigate(['/shared/UnAuthorized']);
        }
        this.date = new Date().toISOString().slice(0, 10);
        this.loadRBKList();
    }

    async loadRBKList(): Promise<void> {
        try {
            const req = {
                route_id: this.session.rbkGroupId
                //uniqueId: this.session.rbkGroupId,
            };
            this.spinner.show();

            const response = await this.attendanceAPI.New_Minits_ofmeeting_RbkList(req);

            if (response.success) {
                this.rbkList = response.result;
            } else {
                // this.toast.info("Minutes of meeting submitted for all rbk's");
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async onRbkChange(): Promise<void> {
        try {
            this.meetingList = [];
            this.meetingData.meetingId = '';
            this.meetingData.minutesOfMeeting = '';
            this.VILLAGE_LIST = '';
            this.meetingData.photos = [];
            // this.meetingData.docs = [];
            if (this.meetingData.rbk_code === '') {
                return;
            }
            debugger;
            const req = {
                rbk: this.meetingData.rbk_code,
            };
            this.spinner.show();
            const response = await this.attendanceAPI.New_Minits_of_meeting_MeetingList(req);
            if (response.success) {

                // VILLAGE_LIST
                this.meetingList = response.result;
                this.VILLAGE_LIST = this.meetingList[0].VILLAGE_LIST;
            } else {
                this.toast.info(response.message);
            }
            this.personList = []
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    personList = [];

    Approvelist = [];
    async onMeetingChange(): Promise<void> {
        try {
            this.personList = [];
            if (this.meetingData.rbk_code === '') {
                return;
            }
            if (this.meetingData.meeting_code === '') {
                return;
            }
            const req = {
                rbk: this.meetingData.rbk_code,
                meeting_code: this.meetingData.meeting_code,
            };
            this.spinner.show();
            debugger;
            const response = await this.attendanceAPI.New_Minits_of_meeting_Details_List(req);

            if (response.success) {

                this.personList = response.result;
            } else {
                // this.toast.info(response.message);
            }
            this.ApprovedList();

            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }


    async Approvedclick(obj): Promise<void> {

        const req = {
            type: '1',
            rbk_code: obj.RBK_CODE,
            meeting_code: obj.MEETING_CODE,
            input1: "3",
            input2: obj.FARMER_CODE,


        };
        this.spinner.show();

        const response = await this.attendanceAPI.New_MinutesofMeetingUpdateData(req);

        if (response.success) {
            alert("Details Approved Successfully ...!");
            this.ApprovedList();
            this.spinner.hide();

        } else {
            this.toast.info("Approved Details Failed.");
        }


    }

    async RejectClick(obj): Promise<void> {

        const req = {
            type: '1',
            rbk_code: obj.RBK_CODE,
            meeting_code: obj.MEETING_CODE,
            input1: "4",
            input2: obj.FARMER_CODE,


        };
        this.spinner.show();
        debugger;
        const response = await this.attendanceAPI.New_MinutesofMeetingUpdateData(req);

        if (response.success) {
            alert("Details Rejected  Successfully ...!");
            this.personList = [];
            window.location.reload();
            this.spinner.hide();

        } else {
            this.toast.info("Rejected  Details Failed.");
            this.personList = [];
        }

    }

    async ApprovedList(): Promise<void> {

        try {

            if (this.meetingData.rbk_code === '') {
                return;
            }
            debugger;
            const req = {
                rbk: this.meetingData.rbk_code,
                meeting_code: this.meetingData.meeting_code
            };
            this.spinner.show();
            const response = await this.attendanceAPI.Minits_of_meeting_Approved_List(req);
            if (response.success) {

                this.Approvelist = response.result;
                //this. onMeetingChange();
            } else {
                this.Approvelist = [];
                //this.toast.info(response.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }



    async btnSubmit(): Promise<void> {
        try {
            if (this.validate()) {
                this.meetingData.districtId = this.session.districtId;
                this.meetingData.mandalId = this.session.mandalId;
                this.meetingData.mentorId = this.session.rbkGroupId;
                this.meetingData.insertedBy = this.session.userName;
                this.meetingData.source = 'web';
                // alert('Meeting Minutes Captured Successfully !!!');
                this.spinner.show();
                const response = await this.attendanceAPI.NewMinutesofMeetingInsertData(
                    this.meetingData
                );
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
        if (this.utils.isEmpty(this.meetingData.rbk_code)) {
            this.toast.warning('Please Select RSK');
            return false;
        }

        if (this.utils.isEmpty(this.meetingData.meeting_code)) {
            this.toast.warning('Please Select Meeting ID');
            return false;
        }
        // if (this.utils.isEmpty(this.meetingData.minutesOfMeeting)) {
        //   this.meetingData.minutesOfMeeting=".";
        // }
        if (this.utils.isEmpty(this.meetingData.docs)) {
            this.toast.warning('Please Upload Document');
            return false;
        }

        if (this.meetingData.minutesOfMeeting.length >= 500) {
            this.toast.warning(
                'Minutes Of Meeting Should be less than 500 characters.'
            );
            return false;
        }

        if (this.meetingData.Imagelist.length < 1) {
            this.toast.warning('Please Upload Atleast One Photo');
            return false;
        }

        return true;
    }

    btnImage(image): void {
        debugger;
        this.utils.viewImage(image);
        //this.toast.showImage(image);
    }

    btnImageCancel(index): void {
        this.meetingData.Imagelist.splice(index, 1);
    }

    btnDoc(pdf, index): void {
        this.utils.downloadPdfFile(pdf, 'DOCUMENT-' + index);
    }

    // btnDocCancel(index): void {
    //   this.meetingData.docs.splice(index, 1);
    // }

    async onPhotoChange(event): Promise<void> {
        try {
            const element = event.currentTarget as HTMLInputElement;
            let fileList: FileList | null = element.files;

            if (element.files[0].name.split('.').length.toString() !== '2') {
                this.toast.warning('Please Upload jpg files only');

                event.target.value = '';
                return;
            } else {
                const res = await this.utils.encodedString(
                    event,
                    this.utils.fileType.IMAGE,
                    this.utils.fileSize.hundredKB
                );
                if (res) {
                    if (this.meetingData.photos.length < 6) {
                        let photo = (
                            this.sanitizer.bypassSecurityTrustResourceUrl(res) as any
                        ).changingThisBreaksApplicationSecurity;

                        photo = photo.replace('data:image/jpeg;base64,', '');
                        this.meetingData.Imagelist.push({
                            image_path: photo,
                            rbk_code: this.meetingData.rbk_code,
                            meeting_code: this.meetingData.meeting_code,
                            path_type: this.meetingData.docs,
                            mdss_code: "",
                            input1: this.session.userName,
                            input2: this.session.mobileNumber
                        });
                    } else {
                        this.toast.warning('You Can Upload Maximum 6 photos !!!');
                    }
                    this.photoUpload.nativeElement.value = '';
                }

            }
        } catch (error) {
            this.utils.catchResponse(error);
        }
    }

    async onDocChange(event): Promise<void> {
        debugger;
        try {
            const element = event.currentTarget as HTMLInputElement;
            let fileList: FileList | null = element.files;
            if (fileList.length === 0) {
                this.toast.warning('Please Upload Pdf files only');
                event.target.value = '';
                this.meetingData.docs = '';
            }
            else {
                const res = await this.utils.encodedString(
                    event,
                    this.utils.fileType.PDF,
                    this.utils.fileSize.oneMB
                );
                if (res) {
                    // if (this.meetingData.docs.length + this.meetingData.photos.length < 6) {
                    let doc = (this.sanitizer.bypassSecurityTrustResourceUrl(res) as any)
                        .changingThisBreaksApplicationSecurity;
                    this.meetingData.docs = doc.replace('data:application/pdf;base64,', '');
                    // this.meetingData.docs.push({
                    //   DOC: doc,
                    // });
                    // } else {
                    //     this.toast.warning('You Can Upload Maximum 6 files or photos !!!');
                    // }
                    //this.docUpload.nativeElement.value = '';
                }
            }
        }
        catch (error) {
            this.utils.catchResponse(error);
        }
    }
}