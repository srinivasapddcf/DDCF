import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { TechnicianService } from '../../services/technician.service';

@Component({
    selector: 'app-bmcu-equipment-file-upload',
    templateUrl: './bmcu-equipment-file-upload.component.html',
    styleUrls: ['./bmcu-equipment-file-upload.component.css']
})
export class BmcuEquipmentFileUploadComponent implements OnInit {

    maxDate: Date;
    DistrictList = [];
    ShiftedDistrictList = [];
    ShiftedMandalList = [];
    ShiftedBMCUList = [];
    MandalList = [];
    BMCUList = [];
    rbkList = [];
    villageList = [];
    routeList = [];
    devicesList = [];
    DataList: any[] = [];
    BMCUReportList: any[] = [];

    manfactureDate: any;
    deviceCapacity: any;
    deviceMaker: any;
    deviceSerialNo: any;
    deviceId: any;
    workcond: any;
    deviceImage: any;
    devicename: any;
    uomId: any;
    imagepath: any;
    deviceavail: any;
    fileupdforpdf: any;
    shiftedid: any;
    rejectstatus: any;

    districtname: any;
    Mandalname: any;
    BmcuLocName: any;
    ShiftedDistName: any;
    ShiftedMandalName: any;
    ShiftedBMCUName: any;

    distid: any;
    mandid: any;
    bmcusid: any;
    shiftid: any;
    submitstatus: any;

    isprecheck: boolean = false;
    shiftedavail: boolean = false;
    issubmit: boolean = false;
    bmcufilehide: boolean = false;

    UOMList = [];
    BMCUDETAILSLIST = [];
    OperatedByList = [];
    clibrationCheck: boolean = false;
    BmcuDetailsHide: boolean = true;

    districtId: any;
    mandalId: any;
    bmculocId: any;

    calibrationDeviceDetails = {
        rbkId: '',
        districtId: '',
        mandalId: '',
        bmculocId: '',
        bmcutype: '',
        villageId: '',
        routeId: '',
        deviceId: '',
        deviceMaker: '',
        deviceCapacity: '',
        uomId: '',
        workcond: '',
        manfactureDate: '',
        deviceSerialNo: '',
        deviceImage: '',
        ifshifted: '',
        districtId1: '',
        mandalId1: '',
        bmculocId1: '',
        operatedyear: '',
        operatedby: '',
        Latitude: '',
        Longitude: '',
        remarks: '',
    };

    // deviceSerialNo:any;
    // deviceMaker:any;
    // deviceCapacity:any;
    // uomId:any;


    constructor(
        private spinner: NgxSpinnerService,
        private toast: ToasterService,
        private technicianAPI: TechnicianService,
        private utils: UtilsService,
        private logger: LoggerService,
        private session: SessionService,
        private router: Router,
        private sanitizer: DomSanitizer,
    ) {
        this.maxDate = this.session.getTodayDate();
    }

    ngOnInit(): void {
        if (this.session.uniqueId != "" && this.session.desigId != '') {

        }
        else {
            this.router.navigate(['/shared/UnAuthorized']);
        }

        this.loadDistricts();
    }


    async loadDistricts(): Promise<void> {
        try {
            const req = {
                TYPE: 25,
                INSERTED_BY: this.session.userName,
                ROLE: this.session.desigId,
                INPUT03:this.session.uniqueId,

            };
            this.spinner.show();
            const response = await this.technicianAPI.TechnisianDetails_Select(req);
            this.spinner.hide();
            if (response.success) {
                this.DistrictList = response.result;
            } else {
                this.toast.info("Districts List Not Available !!");
            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    value: any;
    async onDistrictChange(obj): Promise<void> {
        debugger;

        let objvalue = this.DistrictList.find(data => data.BMCU_DISTRICT_CODE == obj);
        this.districtname = objvalue.BMCU_DISTRICT;

        try {
            const req = {
                TYPE: 26,
                DISTRICT: this.calibrationDeviceDetails.districtId,
                INSERTED_BY: this.session.userName,
                ROLE: this.session.desigId,
                INPUT03:this.session.uniqueId
            };
            this.spinner.show();
            const response = await this.technicianAPI.TechnisianDetails_Select(req);
            if (response.success) {
                this.MandalList = response.result;
            } else {
                this.toast.info("Districts List Not Available !!");
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async onMandalChange(obj): Promise<void> {
        debugger;
        this.calibrationDeviceDetails.bmculocId = "";
        let objvalue = this.MandalList.find(data => data.BMCU_MANDAL_CODE == obj);
        this.Mandalname = objvalue.BMCU_MANDAL;

        try {
            const req = {
                TYPE: 27,
                DISTRICT: this.calibrationDeviceDetails.districtId,
                INPUT01: this.calibrationDeviceDetails.mandalId,
                INSERTED_BY: this.session.userName,
                ROLE: this.session.desigId,
                INPUT03:this.session.uniqueId

            };
            this.spinner.show();
            const response = await this.technicianAPI.TechnisianDetails_Select(req);
            if (response.success) {
                this.BMCUList = response.result;

                if (this.BMCUList[0].V_STATUS == "") {
                    this.rejectstatus = "1";
                }
                else if (this.BMCUList[0].V_STATUS == "9") {
                    this.rejectstatus = "2";
                }
                else {
                    this.rejectstatus = "1";
                }


                debugger;
            } else {
                this.toast.info(response.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    onbmculocchange(obj) {
        debugger;
        //this.BMCUReportList=[];
        let objvalue = this.BMCUList.find(data => data.BMCU_BMCU_CODE == obj);
        this.BmcuLocName = objvalue.BMCU_BMCU_NAME;

        this.ShiftedStatus();

        this.StatusCheckForcert();
        this.calibrationDeviceDetails.bmcutype = "";
        this.bmcufilehide = true;


    }


    async ShiftedStatus(): Promise<void> {
        try {
            debugger;
            const req = {
                TYPE: 39,
                DISTRICT: this.calibrationDeviceDetails.districtId,
                INPUT01: this.calibrationDeviceDetails.mandalId,
                INPUT02: this.calibrationDeviceDetails.bmculocId,

            };
            this.spinner.show();
            const response = await this.technicianAPI.TechnisianDetails_Select(req);
            if (response.success) {

                this.shiftedid = response.result[0].SHIFTED;
            } else {
                // this.toast.info(response.message);
            }
            debugger;
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }



    async StatusCheckForcert(): Promise<void> {
        try {
            debugger;
            const req = {
                TYPE: 23,
                DISTRICT: this.calibrationDeviceDetails.districtId,
                INPUT01: this.calibrationDeviceDetails.mandalId,
                INPUT02: this.calibrationDeviceDetails.bmculocId,
                INPUT03: this.session.uniqueId,

            };
            this.spinner.show();
            const response = await this.technicianAPI.TechnisianDetails_Select(req);
            if (response.success) {

                this.DataList = response.result;

                debugger;
                if (response.result[0].STATUS === "1") {
                    this.BmcuDetailsHide = false;
                    this.bmcufilehide = true;

                    this.distid = response.result[0].BMCU_DISTRICT_CODE;
                    this.mandid = response.result[0].BMCU_MANDAL_CODE;
                    this.bmcusid = response.result[0].BMCU_BMCU_CODE;
                    this.shiftid = response.result[0].SHIFTED;

                    // if(this.shiftid == 1 ){
                    //   this.shiftid = "2";
                    // }
                    // else if(this.shiftid == 2){ 
                    //   this.shiftid = "1";
                    // }
                    // else{
                    //   this.shiftid = " ";
                    // }

                    this.PDFFinalStatus();
                }
                else {
                    this.BmcuDetailsHide = true;
                    this.bmcufilehide = false;
                }
            } else {
                // this.toast.info(response.message);
            }
            debugger;
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async PDFFinalStatus(): Promise<void> {
        try {
            debugger;
            const req = {
                TYPE: 24,
                DISTRICT: this.calibrationDeviceDetails.districtId,
                INPUT01: this.calibrationDeviceDetails.mandalId,
                INPUT02: this.calibrationDeviceDetails.bmculocId,
                INPUT03: this.session.uniqueId,
            };
            this.spinner.show();
            const response = await this.technicianAPI.TechnisianDetails_Select(req);
            if (response.success) {

                if (response.result[0].FINAL_PDF_STATUS === "1") {

                    alert("Equipment Details Submitted Successfully !!");
                    this.BmcuDetailsHide = true;
                    this.bmcufilehide = false;
                }
                else {
                    this.BmcuDetailsHide = false;
                    this.bmcufilehide = true;
                }
            } else {
                // this.toast.info(response.message);
            }
            debugger;
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async btnPDF(): Promise<void> {
        debugger;
        try {
            debugger;
            const req = {
                TYPE: "22",
                DISTRICT: this.calibrationDeviceDetails.districtId,
                INPUT01: this.calibrationDeviceDetails.mandalId,
                INPUT02: this.calibrationDeviceDetails.bmculocId,
                INPUT03: this.shiftedid
            };
            debugger;
            const fileName = this.BmcuLocName + ' ' + 'BMCU PHYSICAL VERIFICATION DOC';
            let basePDF = '';
            this.spinner.show();
            const res = await this.technicianAPI.BMCUEquipmentStatusRpt(req);
            if (res.success) {
                basePDF = res.result;
                this.utils.downloadPdfFile(basePDF, fileName);

            } else {
                // this.toast.info(res.message);
                this.toast.info('BMCU EQUIPMENT DETAILS NOT SUBMITTED');
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }


    async onpdffileChange1(event: any): Promise<void> {
        try {
            debugger;
            this.fileupdforpdf = "";
            if (event.target.files.length > 0) {

                if (event.target.files[0].type === 'application/pdf') {
                    const response: any = await this.utils.fileUploadEncodedString(
                        event,
                        this.utils.fileSize.oneMB
                    );
                    if (response) {

                        let file = (
                            this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
                        ).changingThisBreaksApplicationSecurity;
                        file = file.replace('data:application/pdf;base64,', '');
                        debugger;
                        this.fileupdforpdf = file;
                    } else {
                        this.toast.warning('file is Empty !!!, Please try again.');
                        event.target.value = '';
                    }
                }
                else {
                    alert('Accept Only Pdf files Only..');
                    this.fileupdforpdf = "";
                    event.target.value = '';
                }
            } else {
                this.toast.warning('file is Empty !!!, Please try again.');
                event.target.value = '';
            }
        } catch (error) {
            this.utils.catchResponse(error);
        }
    }




    async Certificateupload(): Promise<void> {
        try {
            debugger;

            if (this.calibrationDeviceDetails.remarks == "" || this.calibrationDeviceDetails.remarks == undefined || this.calibrationDeviceDetails.remarks == null) {
                this.toast.info("ENTER REMARKS");
                return;
            }

            if (this.fileupdforpdf == "" || this.fileupdforpdf == undefined || this.fileupdforpdf == null) {
                this.toast.info("UPLOAD BMCU EQUIPMENT FILE");
                return;
            }
            const req = {
                type: 5,
                input_08: this.calibrationDeviceDetails.remarks,
                input_05: this.fileupdforpdf,
                districtId: this.calibrationDeviceDetails.districtId,
                mandalId: this.calibrationDeviceDetails.mandalId,
                bmcuId: this.calibrationDeviceDetails.bmculocId,
                bmculist: [{}],
                input_02: this.session.userName,
                input_03: this.session.desigId,
                districtname: this.rejectstatus

            }

            this.spinner.show();
            const response = await this.technicianAPI.BMCUDeviceDetailsIns(req);
            if (response.success) {
                alert("Certificate Submitted Successfully");
                // this.DeleteDummyItems();               
                // this.bmcufilehide = false;
                // this.BmcuDetailsHide = true;

                window.location.reload();

            } else {
                this.toast.info("Certificate Submitted Failed , Please try Again !!!");
            }
            this.spinner.hide();

        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }



}
