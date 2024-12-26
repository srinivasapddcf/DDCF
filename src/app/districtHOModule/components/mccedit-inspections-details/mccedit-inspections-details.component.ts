import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { McuMappingService } from 'src/app/mentorModule/services/mcu-mapping.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { TechnicianService } from 'src/app/technicianModule/services/technician.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
    selector: 'app-mccedit-inspections-details',
    templateUrl: './mccedit-inspections-details.component.html',
    styleUrls: ['./mccedit-inspections-details.component.css']
})
export class MCCeditInspectionsDetailsComponent implements OnInit {
    ReasonHide: any;
    input: any;
    asset_Unit_Code: any;
    ListData: any[] = [];
    object: any;
    DistrictCode: any;
    operatedyear: any;
    DropdownList: any[] = [];
    DropdownListGOMS: any[] = [];
    photosGeo: any;

    // isRemarksDisabled: boolean = false;
    booleanObject = {
        SL_NO: false,
        DISTRICT_CODE: false,
        DISTRICT: false,
        ASSET_CODE: false,
        ASSET_TYPE: false,
        LOCATION: false,
        ASSEST_UNIT_NAME: false,
        ADDRESS: false,
        EXTENT_LAND_IN_ACRES: false,
        SURVEY_NO: false,
        LAT_LONG: false,
        LAND_DETAILS: false,
        LAND_FREE_FROM_ENCUMBARANCE: false,
        PURCHASE_YEAR: false,
        DOCUMENTTYPE: false,
        DOCUMENT_NO: false,
        AVAILABLE_ACRS: false,
        NOT_AVAILABLE_ACRS: false,
        ENCUMBRANCE_CERTIFICATE: false,
        BOUNDARIES_EAST: false,
        BOUNDARIES_WEST: false,
        BOUNDARIES_NORTH: false,
        BOUNDARIES_SOUTH: false,
        OWNERSHIP_DETAILS: false,
        UND_OPTNL_MGMT_AS_ON_01JUN2014: false,
        UNDER_POSSESSION: false,
        BUILDING: false,
        PLINTH_AREA_OF_BUILDING_SQFT: false,
        CAPACITY_OF_PLANT: false,
        NO_OF_MACHINERY: false,
        LICENSES: false,
        PHOTOS_WITH_GEO_TAGGING: false,
        PRESENT_CONDITON: false,
        REMARKS: false,
        ASSET_UNIT_CODE: false,
        DEVICE_CODE: false,
        DEVICE_NAME: false,
        UPDATE_STATUS: false,
        INSERTED_BY: false

    };
    datePickerConfig: Partial<BsDatepickerConfig>;

    constructor(
        private spinner: NgxSpinnerService,
        private toast: ToasterService,
        private router: Router,
        private mcuAPI: McuMappingService,
        private utils: UtilsService,
        private logger: LoggerService,
        private session: SessionService,
        private route: ActivatedRoute,
        private technicianAPI: TechnicianService,
        private sanitizer: DomSanitizer

    ) {

        debugger;
        route.queryParams.subscribe((params) => (this.input = params['request']));

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
    DataChange(val: any) {
        if (val == "0" || val === "0") {
            this.ReasonHide = true;
        }
        else {
            this.ReasonHide = false;
        }
    }

    async loadDropdownWKS(): Promise<void> {
        try {
            debugger;
            const req = {
                TYPE: 7,
            };
            this.spinner.show();
            const response = await this.technicianAPI.mccinspectionDetails(req);
            this.spinner.hide();
            if (response.success) {
                this.DropdownList = response.result;
                //console.log(this.DistrictList);
            } else {
                this.toast.info(response.message);
            }

        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async loadDropdownGOMS(): Promise<void> {
        try {
            debugger;
            const req = {
                TYPE: 8,
            };
            this.spinner.show();
            const response = await this.technicianAPI.mccinspectionDetails(req);
            this.spinner.hide();
            if (response.success) {
                this.DropdownListGOMS = response.result;
                // console.log(this.DropdownListGOMS);
            } else {
                this.toast.info(response.message);
            }

        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }
    ngOnInit(): void {
        debugger;
        if (this.session.uniqueId != "" && this.session.desigId != "") {
            this.loadDropdownWKS();
            this.loadDropdownGOMS();
            const decString = JSON.parse(this.utils.decrypt(this.input));
            //console.log(decString);
            this.asset_Unit_Code = decString.ASSET_UNIT_CODE;
            this.DistrictCode = decString.DISTRICT_CODE;
            this.loadData();
        }
        else {
            this.router.navigate(['/shared/UnAuthorized']);
        }
    }

    btnBack() {

        const result = this.utils.encrypt(JSON.stringify(this.DistrictCode));
        this.router.navigate(['/districtHOModule/MCCInspection'], {
            queryParams: { request: result },
        });
        //this.router.navigate(['/districtHOModule/MCCInspection']);
    }

    async getBaseFile(path): Promise<string> {
        try {
            if (!this.utils.isEmpty(path)) {
                this.spinner.show();
                const response = await this.utils.JPVReportsDMSFileDownload(path); //DMSFileDownload
                this.spinner.hide();
                if (response.success) {
                    return response.result;
                }
            }
            return '';
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async loadData(): Promise<void> {
        try {
            debugger;
            const req = {
                TYPE: 3,
                ASSET_UNIT_CODE: this.asset_Unit_Code

            };
            this.spinner.show();
            const response = await this.technicianAPI.mccinspectionDetails(req);
            this.spinner.hide();
            if (response.success) {
                this.object = response.result[0];
                debugger;
                if (!this.utils.isEmpty(this.object.PHOTOS_WITH_GEO_TAGGING)) {
                    this.photosGeo = await this.getBaseFile(
                        this.object.PHOTOS_WITH_GEO_TAGGING
                    );
                }
                //this.isRemarksDisabled = this.object.REMARKS !== null && this.object.REMARKS !== '';
                console.log(this.object);
                this.booleanObject = {
                    SL_NO: this.object.SL_NO !== null && this.object.SL_NO !== '',
                    DISTRICT_CODE: this.object.DISTRICT_CODE !== null && this.object.DISTRICT_CODE !== '',
                    DISTRICT: this.object.DISTRICT !== null && this.object.DISTRICT !== '',
                    ASSET_CODE: this.object.ASSET_CODE !== null && this.object.ASSET_CODE !== '',
                    ASSET_TYPE: this.object.ASSET_TYPE !== null && this.object.ASSET_TYPE !== '',
                    LOCATION: this.object.LOCATION !== null && this.object.LOCATION !== '',
                    ASSEST_UNIT_NAME: this.object.ASEST_UNIT_NAME !== null && this.object.ASEST_UNIT_NAME !== '',
                    ADDRESS: this.object.ADDRESS !== null && this.object.ADDRESS !== '',
                    EXTENT_LAND_IN_ACRES: this.object.EXTENT_LAND_IN_ACRES !== null && this.object.EXTENT_LAND_IN_ACRES !== '',
                    SURVEY_NO: this.object.SURVEY_NO !== null && this.object.SURVEY_NO !== '',
                    LAT_LONG: this.object.LAT_LONG !== null && this.object.LAT_LONG !== '',
                    LAND_DETAILS: this.object.LAND_DETAILS !== null && this.object.LAND_DETAILS !== '',
                    LAND_FREE_FROM_ENCUMBARANCE: this.object.LAND_FREE_FROM_ENCUMBARANCE !== null && this.object.LAND_FREE_FROM_ENCUMBARANCE !== '',
                    PURCHASE_YEAR: this.object.PURCHASE_YEAR !== null && this.object.PURCHASE_YEAR !== '',
                    DOCUMENTTYPE: this.object.DOCUMENTTYPE !== null && this.object.DOCUMENTTYPE !== '',
                    DOCUMENT_NO: this.object.DOCUMENT_NO !== null && this.object.DOCUMENT_NO !== '',
                    AVAILABLE_ACRS: this.object.AVAILABLE_ACRS !== null && this.object.AVAILABLE_ACRS !== '',
                    NOT_AVAILABLE_ACRS: this.object.NOT_AVAILABLE_ACRS !== null && this.object.NOT_AVAILABLE_ACRS !== '',
                    ENCUMBRANCE_CERTIFICATE: this.object.ENCUMBRANCE_CERTIFICATE !== null && this.object.ENCUMBRANCE_CERTIFICATE !== '',
                    BOUNDARIES_EAST: this.object.BOUNDARIES_EAST !== null && this.object.BOUNDARIES_EAST !== '',
                    BOUNDARIES_WEST: this.object.BOUNDARIES_WEST !== null && this.object.BOUNDARIES_WEST !== '',
                    BOUNDARIES_NORTH: this.object.BOUNDARIES_NORTH !== null && this.object.BOUNDARIES_NORTH !== '',
                    BOUNDARIES_SOUTH: this.object.BOUNDARIES_SOUTH !== null && this.object.BOUNDARIES_SOUTH !== '',
                    OWNERSHIP_DETAILS: this.object.OWNERSHIP_DETAILS !== null && this.object.OWNERSHIP_DETAILS !== '',
                    UND_OPTNL_MGMT_AS_ON_01JUN2014: this.object.UND_OPTNL_MGMT_AS_ON_01JUN2014 !== null && this.object.UND_OPTNL_MGMT_AS_ON_01JUN2014 !== '',
                    UNDER_POSSESSION: this.object.UNDER_POSSESSION !== null && this.object.UNDER_POSSESSION !== '',
                    BUILDING: this.object.BUILDING !== null && this.object.BUILDING !== '',
                    PLINTH_AREA_OF_BUILDING_SQFT: this.object.PLINTH_AREA_OF_BUILDING_SQFT !== null && this.object.PLINTH_AREA_OF_BUILDING_SQFT !== '',
                    CAPACITY_OF_PLANT: this.object.CAPACITY_OF_PLANT !== null && this.object.CAPACITY_OF_PLANT !== '',
                    NO_OF_MACHINERY: this.object.NO_OF_MACHINERY !== null && this.object.NO_OF_MACHINERY !== '',
                    LICENSES: this.object.LICENSES !== null && this.object.LICENSES !== '',
                    PHOTOS_WITH_GEO_TAGGING: this.object.PHOTOS_WITH_GEO_TAGGING !== null && this.object.PHOTOS_WITH_GEO_TAGGING !== '',
                    PRESENT_CONDITON: this.object.PRESENT_CONDITON !== null && this.object.PRESENT_CONDITON !== '',
                    REMARKS: this.object.REMARKS !== null && this.object.REMARKS !== '',
                    ASSET_UNIT_CODE: this.object.ASSET_UNIT_CODE !== null && this.object.ASSET_UNIT_CODE !== '',
                    DEVICE_CODE: this.object.DEVICE_CODE !== null && this.object.DEVICE_CODE !== '',
                    DEVICE_NAME: this.object.DEVICE_NAME !== null && this.object.DEVICE_NAME !== '',
                    UPDATE_STATUS: this.object.UPDATE_STATUS !== null && this.object.UPDATE_STATUS !== '',
                    INSERTED_BY: this.object.INSERTED_BY !== null && this.object.INSERTED_BY !== '',

                };

                if (this.object.DEVICE_CODE == "0" || this.object.DEVICE_CODE === "0") {
                    this.ReasonHide = true;
                }
                else {
                    this.ReasonHide = false;
                }

            } else {
                this.toast.info(response.message);
            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }



    async UpdateDeatils(): Promise<void> {
        try {
            debugger;
            if (this.object.DEVICE_CODE === null || this.object.DEVICE_CODE === undefined || this.object.DEVICE_CODE === "") {
                this.toast.warning('Please Select Asset Current Working Status');
                return;
            }
            if (
                this.object.DEVICE_CODE == "0" || this.object.DEVICE_CODE === "0"
            ) {
                if (
                    this.object.DEVICE_NAME == '' ||
                    this.object.DEVICE_NAME == null ||
                    this.object.DEVICE_NAME == undefined
                ) {

                    this.toast.warning('Please Enter Remarks');
                    return;
                }
            }
            if (false) {

            }

            else {
                if (this.operatedyear != null) {
                    this.object.PURCHASE_YEAR = this.operatedyear.getFullYear();
                }
                this.object.type = 5;
                this.object.UPDATED_BY = this.session.userName;
                this.spinner.show();
                const response = await this.technicianAPI.mccinspectionSub(this.object);
                this.spinner.hide();
                if (response.success) {
                    this.toast.infoNavigate("Data Updated Successfully !!");
                } else {
                    this.toast.info("Unable to Updated The Data, Please Try Again !!!");
                }
            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }


    btnImage(image): void {
        debugger;
        if (!this.utils.isEmpty(image)) {
            this.utils.viewImage(image);
        } else {
            this.toast.warning('Image is Not Available');
        }
    }


    async onPhotosImageChange(event): Promise<void> {
        try {
            debugger;
            const file = event.target.files[0];
            const allowedTypes = ['image/jpeg', 'image/jpg'];

            if (file && allowedTypes.includes(file.type)) {
                const res = await this.utils.encodedString(
                    event,
                    this.utils.fileType.IMAGE,
                    this.utils.fileSize.hundredKB
                );
                if (res) {
                    this.object.PHOTOS_WITH_GEO_TAGGING = res.replace(
                        'data:image/jpeg;base64,',
                        ''
                    );
                }
            } else {
                this.toast.warning('Only JPEG files are allowed');
                this.photosGeo = "";
                // Handle invalid file type
            }

        } catch (error) {
            this.utils.catchResponse(error);
        }
    }

    decimalFilter(event: any) {
        const reg = /^-?\d*(\.\d{0,2})?$/;
        let input = event.target.value + String.fromCharCode(event.charCode);

        if (!reg.test(input)) {
            event.preventDefault();
        }
    }

    decimalLatLang(event: any) {
        const reg = /^-?\d*(\.\d{0,6})?$/;
        let input = event.target.value + String.fromCharCode(event.charCode);

        if (!reg.test(input)) {
            event.preventDefault();
        }
    }

    keyPressAlpha(event: any) {
        var inp = String.fromCharCode(event.keyCode);
        if (/[a-zA-Z]/.test(inp)) {
            return true;
        } else {
            event.preventDefault();
            return false;
        }
    }


    keyPressAlphaNumericWithSpecialChar(event: any) {
        const inp = String.fromCharCode(event.keyCode);

        // Allow numbers, alphabets, space, underscore, forward slash (/), period (.), and comma (,)
        if (/[a-zA-Z0-9/.,_ ]/.test(inp)) {
            return true;
        } else {
            event.preventDefault();
            return false;
        }
    }

    keyPressAlphaNumericWithSpecialCharacters(event: any) {

        var inp = String.fromCharCode(event.keyCode);
        // Allow numbers, alpahbets, space, underscore
        if (/[a-zA-Z0-9/_\-,.&# ]/.test(inp)) {
            return true;
        } else {
            event.preventDefault();
            return false;
        }
    }


}
