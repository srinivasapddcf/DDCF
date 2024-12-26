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
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-new-members-download-and-upload-doc',
    templateUrl: './new-members-download-and-upload-doc.component.html',
    styleUrls: ['./new-members-download-and-upload-doc.component.css']
})
export class NewMembersDownloadAndUploadDocComponent implements OnInit {

    rbkList = [];
    villageList = [];
    personList = [];
    meetingsList = [];

    todate = '';
    file: any;

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
        private router: Router,
        private sanitizer: DomSanitizer
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
            debugger;
            const req = {
                route_id: this.session.rbkGroupId,
            };
            debugger;
            this.spinner.show();
            const response = await this.attendanceAPI.Doc_Upload_RbkList(req);
            if (response.success) {
                this.rbkList = response.result;
                console.log(this.rbkList);
                //this.todate = response.result[0].MSG;
            } else {
             //   this.toast.info(response.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async onClick(val: any): Promise<void> {
        debugger
        try {
            if (this.utils.isEmpty(this.file)) {
                this.toast.warning('Please Upload File');
                return;

            }
            else {
                const req = {

                    rbk_code: val.RBK_CODE,
                    meeting_code: val.MEETING_CODE,
                    input1: val.FARMER_CODE,
                    input4: this.file,
                }

                this.spinner.show();
                const response = await this.attendanceAPI.PdfUploadFarmer(req);
                if (response.success) {
                    this.toast.info(response.message);
                    this.onRbkChange();
                    this.spinner.hide();
                } else {
                    this.toast.info(response.message);
                    this.spinner.hide();
                }
            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }

    }

    async DownloadPdf(val: any): Promise<void> {
        debugger;
        try {
            const req = {
                farmer_code: val.FARMER_CODE,
                rbk: this.meetingData.rbkId
            }
            this.spinner.show();
            const res = await this.attendanceAPI.NewMemberAddCrystalReport(req)
            if (res.success) {
                this.spinner.hide();
                this.utils.downloadPdfFile(res.result, "Mahila Dairy Sahakara Sangam Apllication")
            }
            else {
                this.spinner.hide();
                this.toast.info(res.message);
            }

        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async onPositionStatementChange(event): Promise<void> {
        try {
            const res: any = await this.utils.encodedString(
                event,
                this.utils.fileType.PDF,
                this.utils.fileSize.oneMB
            );
            if (!this.utils.isEmpty(res)) {
                this.file = res.replace(
                    'data:application/pdf;base64,',
                    ''
                );
            }
        } catch (error) {
            this.utils.catchResponse(error);
        }
    }

    async onRbkChange(): Promise<void> {
        try {
            debugger;
            this.personList = [];
            if (this.meetingData.rbkId === '') {
                return;
            }
            const req = {
                rbk: this.meetingData.rbkId,
            };
            this.spinner.show();
            const response = await this.attendanceAPI.Doc_Upload_MemberList(req);
            if (response.success) {
                debugger;
                this.personList = response.result;
                console.log(this.personList);

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
