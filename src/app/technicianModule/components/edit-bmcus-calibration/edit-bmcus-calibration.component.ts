import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { TechnicianService } from '../../services/technician.service';
import { disableDebugTools, DomSanitizer } from '@angular/platform-browser';
import { promise } from 'protractor';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
    selector: 'app-edit-bmcus-calibration',
    templateUrl: './edit-bmcus-calibration.component.html',
    styleUrls: ['./edit-bmcus-calibration.component.css']
})
export class EditBmcusCalibrationComponent implements OnInit {


    maxDate: Date;
    DistrictList = [];
    ShiftedDistrictList = [];
    ShiftedMandalList = [];
    ShiftedBMCUList = [];
    MandalList = [];
    BMCUList = [];
    BMCUTypeList = [];
    rbkList = [];
    villageList = [];
    routeList = [];
    devicesList = [];
    DataList: any[] = [];
    EditDetailsList: any[] = [];
    BMCUReportList: any[] = [];
    RemarksList: any[] = [];

    isTableHS: boolean = false;
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
    RejectedRemarks: any;

    editmanfactureDate: any;
    editdeviceCapacity: any;
    editdeviceMaker: any;
    editdeviceSerialNo: any;
    editdeviceId: any;
    editworkcond: any;
    editdeviceImage = "";
    editdevicename: any;
    edituomId: any;
    editimagepath: any;
    editdeviceavail: any;
    editfileupdforpdf: any;
    olddeviceImage: any;


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
    deviceidlte: any;
    verifiedstatus: any;

    isprecheck: boolean = false;
    shiftedavail: boolean = false;
    issubmit: boolean = false;
    bmcufilehide: boolean = false;
    editdetails: boolean = false;
    showedit: boolean = true;
    RejRemarksHide: boolean = false;

    UOMList = [];
    BMCUDETAILSLIST = [];
    OperatedByList = [];
    clibrationCheck: boolean = false;
    BmcuDetailsHide: boolean = true;

    districtId: any;
    mandalId: any;
    bmculocId: any;
    selectedYear: any;

    BuildingInspectDetails = {
        Buildingtype: '',
        address: '',
        buildingAddress: '',
        buildingName: '',
        buildingStreet: '',
        villageId: '',
        mandalId: '',
        districtId: '',
        BuildingCond: '',
        isSafetyArrangements: '',
        wateravailability: '',
        isElectricityAvailable: '',
        Drainageavail: '',
        buildingImage: '',
        pincode: '',
    };
    operatedyear: any;
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
    };

    // deviceSerialNo:any;
    // deviceMaker:any;
    // deviceCapacity:any;
    // uomId:any;

    datePickerConfig: Partial<BsDatepickerConfig>;

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
        //this.operatedyear = this.session.getCurrentYear();  



        const currentYear = new Date().getFullYear();
        const minYear = 1950;
        this.datePickerConfig = {
            dateInputFormat: 'YYYY',
            containerClass: 'theme-dark-blue',
            selectFromOtherMonth: false,
            minMode: 'year',
            minDate: new Date(minYear, 0, 1), // Sets minimum date to January 1st, 2021
            maxDate: new Date(currentYear, 11, 31) // Sets max date to the last day of the current year
        };

    }

    ngOnInit(): void {
        if (this.session.uniqueId != "" && this.session.desigId != '') {

        }
        else {
            this.router.navigate(['/shared/UnAuthorized']);
        }
        this.loadDistricts();
        //this.loadDevices();
        this.loadUOM();
        this.loadOperatedBy();
        debugger;
        this.shiftedavail = false; debugger;
    }

    async loadDevices(): Promise<void> {
        try {
            this.devicesList = [];
            const req = {
                TYPE: "12",
                DISTRICT: this.calibrationDeviceDetails.districtId,
                INPUT01: this.calibrationDeviceDetails.mandalId,
                INPUT02: this.calibrationDeviceDetails.bmculocId,
            }
            this.spinner.show();
            const response = await this.technicianAPI.TechnisianDetails_Select(req);
            this.spinner.hide();
            if (response.success) {
                this.devicesList = response.result;
            } else {
                // this.toast.info(response.message);
            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async loadUOM(): Promise<void> {
        try {
            const req = {
                TYPE: "13"
            }
            this.spinner.show();
            const response = await this.technicianAPI.TechnisianDetails_Select(req);
            this.spinner.hide();
            if (response.success) {
                this.UOMList = response.result;
            } else {
                this.toast.info(response.message);
            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async loadDistricts(): Promise<void> {
        try {
            debugger;
            const req = {
                TYPE: 14
            };
            this.spinner.show();
            const response = await this.technicianAPI.TechnisianDetails_Select(req);
            this.spinner.hide();
            if (response.success) {
                this.DistrictList = response.result;
            } else {
                this.toast.info(response.message);
            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }
    async loadRemarks(obj): Promise<void> {
        try {
            debugger;
            const req = {
                TYPE: 54,
                BMCU:obj,
            };
            this.spinner.show();
            const response = await this.technicianAPI.TechnisianDetails_Select(req);
            this.spinner.hide();
            if (response.success) {
                this.RemarksList = response.result;
                this.RejectedRemarks = this.RemarksList[0].REMARKS;
               
                if(this.RejectedRemarks == "" || this.RejectedRemarks == null || this.RejectedRemarks == undefined){
                    this.RejRemarksHide = false;
                }
                else{
                    this.RejRemarksHide = true;  
                }

            } else {
               // this.toast.info(response.message);
            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    value: any;
    async onDistrictChange(obj): Promise<void> {
        this.isTableHS = false;
        debugger;
        this.calibrationDeviceDetails.bmcutype = "";
        this.calibrationDeviceDetails.bmculocId = "";
        this.devicesList = [];
        this.BMCUReportList = [];
        this.shiftedavail = false;

        let objvalue = this.DistrictList.find(data => data.NEW_DISTRICT_CODE == obj);
        this.districtname = objvalue.NEW_DISTRICT;

        try {
            const req = {
                TYPE: 15,
                DISTRICT: this.calibrationDeviceDetails.districtId
            };
            this.spinner.show();
            const response = await this.technicianAPI.TechnisianDetails_Select(req);
            if (response.success) {
                this.MandalList = response.result;
            } else {
                this.toast.info(response.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async onMandalChange(obj): Promise<void> {
        this.calibrationDeviceDetails.bmcutype = "";
        this.devicesList = [];
        this.shiftedavail = false;
        this.isTableHS = false;
        this.BMCUReportList = [];
        let objvalue = this.MandalList.find(data => data.MANDAL_CODE == obj);
        this.Mandalname = objvalue.MANDAL_NAME;

        try {
            const req = {
                TYPE: 16,
                DISTRICT: this.calibrationDeviceDetails.districtId,
                INPUT01: this.calibrationDeviceDetails.mandalId
            };
            this.spinner.show();
            const response = await this.technicianAPI.TechnisianDetails_Select(req);
            if (response.success) {
                this.BMCUList = response.result;
            } else {
                this.toast.info(response.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async loadOperatedBy(): Promise<void> {
        try {
            const req = {
                TYPE: 21,
            };
            this.spinner.show();
            const response = await this.technicianAPI.TechnisianDetails_Select(req);
            if (response.success) {
                this.OperatedByList = response.result;
            } else {
                this.toast.info(response.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }



    async onbmculocchange(obj): Promise<void> {
        debugger;


        this.isTableHS=false;

        //this.BMCUReportList=[];
        let objvalue = this.BMCUList.find(data => data.BMCU_CODE == obj);
        this.BmcuLocName = objvalue.BMCU_NAME;
        this.devicesList = [];

        try {
            const req = {
                TYPE: 34,
                DISTRICT: this.calibrationDeviceDetails.districtId,
                INPUT01: this.calibrationDeviceDetails.mandalId,
                INPUT02: this.calibrationDeviceDetails.bmculocId
            };
            this.spinner.show();
            const response = await this.technicianAPI.TechnisianDetails_Select(req);
            if (response.success) {
                this.BMCUTypeList = response.result;
                 this.loadRemarks(obj);
            } else {
                this.toast.info(response.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }


        //this.StatusCheckForcert();
        // this.PDFFinalStatus();
        this.calibrationDeviceDetails.bmcutype = "";
    }

    onbmcutypechange() {
        this.isTableHS = true;
        this.LoadBMCUReport();
        this.loadDevices();
    }



    async onImageChange(event): Promise<void> {
        try {
            debugger;
            const res = await this.utils.encodedString(
                event,
                this.utils.fileType.IMAGE,
                this.utils.fileSize.hundredKB
            );
            if (res) {
                this.deviceImage = res.replace(
                    'data:image/jpeg;base64,',
                    ''
                );
                // console.log(this.calibrationDeviceDetails.deviceImage);
            }
        } catch (error) {
            this.utils.catchResponse(error);
        }
    }
    async editonImageChange(event): Promise<void> {
        try {
            debugger;
            const res = await this.utils.encodedString(
                event,
                this.utils.fileType.IMAGE,
                this.utils.fileSize.hundredKB
            );
            if (res) {
                this.editdeviceImage = res.replace(
                    'data:image/jpeg;base64,',
                    ''
                );
                // console.log(this.calibrationDeviceDetails.deviceImage);
            }
        } catch (error) {
            this.utils.catchResponse(error);
        }
    }

    async btnSubmit(): Promise<void> {
        try {
            debugger;
            if (this.validate()) {

                this.validatePinCode(this.BuildingInspectDetails.pincode);
                this.calibrationDeviceDetails.operatedyear = this.operatedyear.getFullYear();
                const req = {
                    type: 1,
                    districtname: this.calibrationDeviceDetails.districtId,
                    districtId: this.calibrationDeviceDetails.mandalId,
                    mandalname: this.calibrationDeviceDetails.bmculocId,
                    // bmculist:[{}],
                    operatedyear: this.calibrationDeviceDetails.operatedyear,
                    operatedby: this.calibrationDeviceDetails.operatedby,
                    Latitude: this.calibrationDeviceDetails.Latitude,
                    Longitude: this.calibrationDeviceDetails.Longitude,
                    Shifted: this.calibrationDeviceDetails.ifshifted,
                    Shifted_dist: this.ShiftedDistName,
                    Shifted_distcode: this.calibrationDeviceDetails.districtId1,
                    Shifted_mandal: this.ShiftedMandalName,
                    Shifted_mandalcode: this.calibrationDeviceDetails.mandalId1,
                    Shifted_Bmcu: this.ShiftedBMCUName,
                    Shifted_Bmcucode: this.calibrationDeviceDetails.bmculocId1,
                    input_02: this.calibrationDeviceDetails.bmcutype,
                    input_03: this.session.userName,
                    input_04: this.session.uniqueId,
                    input_08: this.session.desigId,

                    input_07: this.BuildingInspectDetails.buildingImage,
                    mandalId: this.BuildingInspectDetails.Buildingtype,
                    bmcuname: this.BuildingInspectDetails.BuildingCond,
                    bmcuId: this.BuildingInspectDetails.isSafetyArrangements,
                    input_01: this.BuildingInspectDetails.wateravailability,
                    bmculist: [{
                        deviceSerialNo: this.BuildingInspectDetails.isElectricityAvailable,
                        deviceMaker: this.BuildingInspectDetails.Drainageavail,
                        deviceCapacity: this.BuildingInspectDetails.address,
                        uomId: this.BuildingInspectDetails.pincode,
                    }]

                }

                this.spinner.show();
                const response = await this.technicianAPI.BMCUDeviceDetailsIns(req);
                if (response.success) {
                    //this.toast.success(response.message);
                    //alert(response.message);
                    this.toast.infoNavigate(response.message);

                    this.distid = response.result[0].BMCU_DISTRICT_CODE;
                    this.mandid = response.result[0].BMCU_MANDAL_CODE;
                    this.bmcusid = response.result[0].BMCU_BMCU_CODE;
                    this.shiftid = response.result[0].SHIFTED;
                    this.submitstatus = response.result[0].STATUS;

                    //this.DeleteDummyItems();
                    //this.bmcufilehide=true;
                    //this.BmcuDetailsHide=false;
                   // window.location.reload();
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

    async DeleteDummyItems(): Promise<void> {
        try {
            debugger;
            const req = {
                type: 3,
                districtname: this.calibrationDeviceDetails.districtId,
                districtId: this.calibrationDeviceDetails.mandalId,
                mandalname: this.calibrationDeviceDetails.bmculocId,
                bmculist: [{}],
            }
            this.spinner.show();
            const response = await this.technicianAPI.BMCUDeviceDetailsIns(req);
            if (response.success) {
                //window.location.reload();
            } else {
                // this.toast.info(response.message);
            }
            this.spinner.hide();

        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    validate(): boolean {

        if (this.utils.isEmpty(this.calibrationDeviceDetails.districtId)) {
            this.toast.warning('Please Select District');
            return false;
        }
        if (this.utils.isEmpty(this.calibrationDeviceDetails.mandalId)) {
            this.toast.warning('Please Select Mandal');
            return false;
        }

        if (this.utils.isEmpty(this.calibrationDeviceDetails.bmculocId)) {
            this.toast.warning('Please Select BMCU Location');
            return false;
        }

        if (this.utils.isEmpty(this.operatedyear)) {
            this.toast.warning('Please Enter Last Operated Year');
            return false;
        }
        if (this.utils.isEmpty(this.calibrationDeviceDetails.operatedby)) {
            this.toast.warning('Please Enter Operated By');
            return false;
        }
        if (this.utils.isEmpty(this.calibrationDeviceDetails.Latitude)) {
            this.toast.warning('Please Enter Latitude');
            return false;
        }
        debugger;
        if (this.calibrationDeviceDetails.Latitude.length != 9) {
            this.toast.warning('Please Enter 6 digits after decimal for Latitude');
            return false;
        }

        if (this.utils.isEmpty(this.calibrationDeviceDetails.Longitude)) {
            this.toast.warning('Please Enter Longitude');
            return false;
        }

        if (this.calibrationDeviceDetails.Longitude.length != 9) {
            this.toast.warning('Please Enter 6 digits after decimal for Longitude');
            return false;
        }
        if (this.utils.isEmpty(this.calibrationDeviceDetails.ifshifted)) {
            this.toast.warning('Please Select If Shifted');
            return false;
        }
        if (this.calibrationDeviceDetails.ifshifted === '1') {

            if (this.utils.isEmpty(this.calibrationDeviceDetails.districtId1)) {
                this.toast.warning('Please Select Shifted District');
                return false;
            }
            if (this.utils.isEmpty(this.calibrationDeviceDetails.mandalId1)) {
                this.toast.warning('Please Select Shifted Mandal');
                return false;
            }
            if (this.utils.isEmpty(this.calibrationDeviceDetails.bmculocId1)) {
                this.toast.warning('Please Select Shifted BMCU Loaction');
                return false;
            }
        }

        if (this.utils.isEmpty(this.BuildingInspectDetails.buildingImage)) {
            this.toast.warning('Upload Building Image');
            return false;
        }
        if (this.utils.isEmpty(this.BuildingInspectDetails.Buildingtype)) {
            this.toast.warning('Select Building Type');
            return false;
        }
        if (this.utils.isEmpty(this.BuildingInspectDetails.BuildingCond)) {
            this.toast.warning('Select Building Condition');
            return false;
        }
        if (this.utils.isEmpty(this.BuildingInspectDetails.isSafetyArrangements)) {
            this.toast.warning('Select Safety Arrangements');
            return false;
        }
        if (this.utils.isEmpty(this.BuildingInspectDetails.wateravailability)) {
            this.toast.warning('Select Water Availability');
            return false;
        }
        if (this.utils.isEmpty(this.BuildingInspectDetails.isElectricityAvailable)) {
            this.toast.warning('Select Availability of Electricity');
            return false;
        }
        if (this.utils.isEmpty(this.BuildingInspectDetails.Drainageavail)) {
            this.toast.warning('Select Drainage Availability');
            return false;
        }

        if (this.utils.isEmpty(this.BuildingInspectDetails.address)) {
            this.toast.warning('Enter Street Name / Land Mark');
            return false;
        }
        if (this.utils.isEmpty(this.BuildingInspectDetails.pincode)) {
            this.toast.warning('Enter Pin code');
            return false;
        }
        return true;
    }


    // getLocation() { 
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(
    //       (position) => {
    //         const latitude = position.coords.latitude;
    //         this.calibrationDeviceDetails.Latitude = (position.coords.latitude);
    //         this.calibrationDeviceDetails.Longitude = position.coords.longitude;
    //         const longitude = position.coords.longitude;
    //         console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    //        console.log(`Latitude:${this.SitePreparation.Latitude}, Longitude: ${this.SitePreparation.Longitude}`);
    //       },
    //       (error) => {
    //         console.error('Error getting location:', error.message);
    //       }
    //     );
    //   } else {
    //     console.error('Geolocation is not supported by this browser.');
    //   }
    // }



    async DetailsAdd(): Promise<void> {

        try {

            if (this.utils.isEmpty(this.calibrationDeviceDetails.districtId)) {
                this.toast.warning('Please Select District');
                return;
            }
            if (this.utils.isEmpty(this.calibrationDeviceDetails.mandalId)) {
                this.toast.warning('Please Select Mandal');
                return;
            }

            if (this.utils.isEmpty(this.calibrationDeviceDetails.bmculocId)) {
                this.toast.warning('Please Select BMCU Location');
                return;
            }

            if (this.deviceId == "" || this.deviceId == null || this.deviceId == undefined) {
                this.toast.warning("please select Equipment");
                return
            }
            if (this.deviceavail == "" || this.deviceavail == null || this.deviceavail == undefined) {
                this.toast.warning("please select Is Equipment Available");
                return
            }
            if (this.deviceavail == 1) {

                if (this.workcond == "" || this.workcond == null || this.workcond == undefined) {
                    this.toast.warning("please select Working Condition");
                    return
                }
                if (this.deviceImage == "" || this.deviceImage == null || this.deviceImage == undefined) {
                    this.toast.warning("please Upload Equipment Image");
                    return
                }
                if (this.manfactureDate == "" || this.manfactureDate == null || this.manfactureDate == undefined) {
                    this.toast.warning("please Upload Installation Year");
                    return
                }
            }


            debugger;
            const req = {
                type: 2,
                districtname: this.districtname,
                districtId: this.calibrationDeviceDetails.districtId,
                mandalname: this.Mandalname,
                mandalId: this.calibrationDeviceDetails.mandalId,
                bmcuname: this.BmcuLocName,
                bmcuId: this.calibrationDeviceDetails.bmculocId,
                bmculist: [{
                    DEVICE_ID: this.deviceId,
                    DEVICE_NAME: this.DeviceText,
                    deviceSerialNo: this.deviceSerialNo,
                    deviceMaker: this.deviceMaker,
                    deviceCapacity: this.deviceCapacity,
                    uomId: this.uomId,
                    workcond: this.workcond,
                    deviceImage: this.deviceImage,
                    manfactureDate: this.manfactureDate,
                }],
                input_01: this.deviceavail,
            }

            // this.DataList.push(req);

            // console.log(this.DataList);


            this.spinner.show();
            const response = await this.technicianAPI.BMCUDeviceDetailsIns(req);
            if (response.success) {
                this.DataList = response.result;

                this.deviceId = "";
                this.DeviceText = undefined;
                this.deviceId = undefined;
                this.deviceSerialNo = "";
                this.deviceMaker = "";
                this.deviceCapacity = "";
                this.deviceImage = "";
                this.imagepath = "";
                this.manfactureDate = "";
                this.workcond = undefined;
                this.deviceavail = undefined;
                this.uomId = undefined;

                this.loadDevices();
                this.LoadBMCUReport();
                this.isprecheck = false;

            } else {
                this.toast.info(response.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }

    }
    async btnViewImage(path): Promise<void> {
        try {
            debugger;

            //this.utils.viewImage(path);

            if (!this.utils.isEmpty(path)) {
                this.spinner.show();
                const res = await this.utils.DMSFileDownload(path);
                this.spinner.hide();
                if (res.success) {
                    var imagepath = res.result;
                    this.utils.viewImage(imagepath);
                } else {
                    this.toast.info(res.message);
                }
            } else {
                this.toast.info('Photo Not Available...');
            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    DeviceText: any;
    UOMtext: any;
    devicechange(obj) {
        debugger;
        let objvalue = this.devicesList.find(data => data.DEVICE_ID == obj);
        this.DeviceText = objvalue.DEVICE_NAME;
    }
    uomchange(obj) {
        debugger;
        let objvalue = this.UOMList.find(data => data.UOM == obj);
        this.UOMtext = objvalue.UOM_NAME;
    }
    deviceAvailchange(obj) {
        debugger;

        if (obj == "2") {

            this.isprecheck = true;
            this.uomId = undefined;

            this.deviceSerialNo = "";
            this.deviceMaker = "";
            this.deviceCapacity = "";
            this.workcond = undefined;
            this.deviceImage = "";
            this.manfactureDate = "";

            // this.uomId = "";
        }
        else {
            this.isprecheck = false;
        }
    }

    async onshiftedchange(): Promise<void> {
        try {
            const req = {
                TYPE: 17,
                //DISTRICT:this.calibrationDeviceDetails.districtId
            };
            this.spinner.show();
            const response = await this.technicianAPI.TechnisianDetails_Select(req);
            if (response.success) {
                this.ShiftedDistrictList = response.result;
            } else {
                this.toast.info(response.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }
    async shiftedDistrictChange(obj): Promise<void> {

        let objvalue = this.ShiftedDistrictList.find(data => data.DIST_CODE == obj);
        this.ShiftedDistName = objvalue.DISTRICT_NAME;

        try {
            const req = {
                TYPE: 18,
                DISTRICT: this.calibrationDeviceDetails.districtId1
            };
            this.spinner.show();
            const response = await this.technicianAPI.TechnisianDetails_Select(req);
            if (response.success) {
                this.ShiftedMandalList = response.result;
            } else {
                this.toast.info(response.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async shiftedMandalChange(obj): Promise<void> {

        let objvalue = this.ShiftedMandalList.find(data => data.MANDAL_CODE == obj);
        this.ShiftedMandalName = objvalue.MANDAL_NAME;

        try {
            const req = {
                TYPE: 19,
                DISTRICT: this.calibrationDeviceDetails.districtId1,
                INPUT01: this.calibrationDeviceDetails.mandalId1
            };
            this.spinner.show();
            const response = await this.technicianAPI.TechnisianDetails_Select(req);
            if (response.success) {
                this.ShiftedBMCUList = response.result;
            } else {
                this.toast.info(response.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }
    async LoadBMCUReport(): Promise<void> {
        try {
            debugger;
            const req = {
                TYPE: 20,
                DISTRICT: this.calibrationDeviceDetails.districtId,
                INPUT01: this.calibrationDeviceDetails.mandalId,
                INPUT02: this.calibrationDeviceDetails.bmculocId,
                // INPUT03:this.deviceId
            };
            this.spinner.show();
            const response = await this.technicianAPI.TechnisianDetails_Select(req);
            if (response.success) {
                this.BMCUReportList = response.result;

                if (this.BMCUReportList.length === 10) {
                    console.log(this.BMCUReportList.length);
                    this.isTableHS = false;
                    this.shiftedavail = true;
                    this.issubmit = true;
                    this.loadDevices();
                    debugger;
                    if (this.BMCUReportList[0].FINAL_PDF_STATUS == "1") {
                        this.showedit = false;
                    } else { this.showedit = true; }

                    if (this.BMCUReportList[0].VERIFICATION_STATUS == "9") {
                        this.showedit = true;
                    }
                    else if (this.BMCUReportList[0].VERIFICATION_STATUS == "1") {
                        this.showedit = false;
                    }
                    else { this.showedit = true; }

                } else {
                    this.isTableHS = true;
                    this.shiftedavail = false; this.issubmit = false;
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

                debugger;
                if (response.result[0].STATUS === "1") {
                    this.BmcuDetailsHide = false;
                    this.bmcufilehide = true;

                    this.distid = response.result[0].BMCU_DISTRICT_CODE;
                    this.mandid = response.result[0].BMCU_MANDAL_CODE;
                    this.bmcusid = response.result[0].BMCU_BMCU_CODE;
                    this.shiftid = response.result[0].SHIFTED;

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
    shiftedBMCUChange(obj) {
        debugger;
        let objvalue = this.ShiftedBMCUList.find(data => data.VILLAGE_NAME == obj);
        this.ShiftedBMCUName = objvalue.VILLAGE_NAME;
    }

    async btnPDF(): Promise<void> {
        debugger;
        try {
            debugger;
            const req = {
                TYPE: "22",
                DISTRICT: this.distid,
                INPUT01: this.mandid,
                INPUT02: this.bmcusid,
                INPUT03: this.shiftid
            };
            debugger;
            const fileName = 'BMCU EQUIPMENT DETAILS';
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

            if (this.fileupdforpdf == "" || this.fileupdforpdf == undefined || this.fileupdforpdf == null) {
                this.toast.info("UPLOAD BMCU EQUIPMENT FILE");
                return;
            }
            const req = {
                type: 5,
                input_05: this.fileupdforpdf,
                districtId: this.distid,
                mandalId: this.mandid,
                bmcuId: this.bmcusid,
                bmculist: [{}]
            }

            this.spinner.show();
            const response = await this.technicianAPI.BMCUDeviceDetailsIns(req);
            if (response.success) {
                alert("Certificate Submitted Successfully");
                this.DeleteDummyItems();
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

    BtnFileUpload() {
        //this.router.navigate(/)
        this.router.navigate(['/districtHOModule/bmcusEquipmentFileUpload'],)

    }

    async onBuildingImageChange(event): Promise<void> {
        try {
            const res = await this.utils.encodedString(
                event,
                this.utils.fileType.IMAGE,
                this.utils.fileSize.hundredKB
            );
            if (res) {
                this.BuildingInspectDetails.buildingImage = res.replace(
                    'data:image/jpeg;base64,',
                    ''
                );
            }
        } catch (error) {
            this.utils.catchResponse(error);
        }
    }


    validatePinCode(pinCode) {
        debugger;
        // Regular expression to match a 6-digit number
        const pinCodePattern = /^[5]\d{5}$/;

        // Test the pinCode against the regular expression
        if (pinCodePattern.test(pinCode)) {
            return true;
        } else {
            this.toast.info("Enter Valid Pin Code");
            return false;
        }
    }

    async btnEdit(obj): Promise<void> {

        this.editdetails = true;
        try {
            debugger;
            const req = {
                TYPE: "38",
                DISTRICT: this.calibrationDeviceDetails.districtId,
                INPUT01: this.calibrationDeviceDetails.mandalId,
                INPUT02: this.calibrationDeviceDetails.bmculocId,
                INPUT03: obj.DEVICE_ID,
            };
            debugger;
            this.spinner.show();
            const res = await this.technicianAPI.TechnisianDetails_Select(req);
            if (res.success) {
                this.EditDetailsList = res.result;

                this.editdeviceId = res.result[0].DEVICE_ID;
                this.editmanfactureDate = res.result[0].PURCHASE_DATE;
                this.editdeviceCapacity = res.result[0].CAPACITY_IN;
                this.editdeviceMaker = res.result[0].MAKER;
                this.editdeviceSerialNo = res.result[0].SERIAL_NUMBER;
                this.editworkcond = res.result[0].WORKING_STATUS;
                this.olddeviceImage = res.result[0].PHOTO_UPD;
                this.editdevicename = res.result[0].DEVICE_NAME;
                this.edituomId = res.result[0].UOM;
                this.editdeviceavail = res.result[0].DEVICE_AVIAL;
                // this.editimagepath =res.result[0].DEVICE_NAME;
                // this.editdeviceavail =res.result[0].DEVICE_NAME;
                // this.editfileupdforpdf =res.result[0].DEVICE_NAME;



            } else {
                this.toast.info(res.message);
            }
            this.spinner.hide();

        }

        catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }

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

                // this.verifiedstatus = response.result[0].VERIFICATION_STATUS;  
                // if(response.result[0].VERIFICATION_STATUS == "9"){

                // }

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

    async btnEqpUpdate(): Promise<void> {

        try {

            // if (this.utils.isEmpty(this.calibrationDeviceDetails.districtId)) {
            //   this.toast.warning('Please Select District');
            //   return ;
            // }
            // if (this.utils.isEmpty(this.calibrationDeviceDetails.mandalId)) {
            //   this.toast.warning('Please Select Mandal');
            //   return ;
            // }

            // if (this.utils.isEmpty(this.calibrationDeviceDetails.bmculocId)) {
            //   this.toast.warning('Please Select BMCU Location');
            //   return ;
            // }

            // if(this.deviceId == "" || this.deviceId == null || this.deviceId == undefined){
            //   this.toast.warning("please select Equipment");
            //   return
            // }
            // if(this.deviceavail == "" || this.deviceavail == null || this.deviceavail == undefined){
            //   this.toast.warning("please select Is Equipment Available");
            //   return
            // }
            // if(this.deviceavail==1)
            // {

            //   if(this.workcond == "" || this.workcond == null || this.workcond == undefined){
            //     this.toast.warning("please select Working Condition");
            //     return
            //   } 
            //   if(this.deviceImage == "" || this.deviceImage == null || this.deviceImage == undefined){
            //     this.toast.warning("please Upload Equipment Image");
            //     return
            //   } 
            //   if(this.manfactureDate == "" || this.manfactureDate == null || this.manfactureDate == undefined){
            //     this.toast.warning("please Upload Installation Year");
            //     return
            //   } 
            // } 

            debugger;
            const req = {
                type: 7,
                districtname: this.districtname,
                districtId: this.calibrationDeviceDetails.districtId,
                mandalname: this.Mandalname,
                mandalId: this.calibrationDeviceDetails.mandalId,
                bmcuname: this.BmcuLocName,
                bmcuId: this.calibrationDeviceDetails.bmculocId,
                DEVICE_ID: this.editdeviceId,
                DEVICE_NAME: this.editdevicename,
                deviceSerialNo: this.editdeviceSerialNo,
                deviceMaker: this.editdeviceMaker,
                deviceCapacity: this.editdeviceCapacity,
                uomId: this.edituomId,
                workcond: this.editworkcond,
                deviceImage: this.olddeviceImage,
                manfactureDate: this.editmanfactureDate,
                input_01: this.editdeviceavail,
                input_08: this.editdeviceImage,
                input_02 :this.session.desigId,
                input_03 :this.session.userName, 
            } 
            // this.DataList.push(req); 
            // console.log(this.DataList);  
            
            this.spinner.show();
            const response = await this.technicianAPI.BMCUDeviceDetailsUpd(req);
            if (response.success) {
                this.DataList = response.result;
                this.toast.info(response.message);
                this.editdetails = false;
                this.LoadBMCUReport();
            } else {
                this.toast.info(response.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }

    }
}







