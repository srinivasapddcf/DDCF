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
import { MCCInspectionReportComponent } from '../mccinspection-report/mccinspection-report.component';

@Component({
    selector: 'app-mccdevice-details',
    templateUrl: './mccdevice-details.component.html',
    styleUrls: ['./mccdevice-details.component.css']
})
export class MCCDeviceDetailsComponent implements OnInit {

    @ViewChild(MCCInspectionReportComponent)
    private mccCalibration: MCCInspectionReportComponent
    // DeviceName: any;
    // PurchaseDate: any;
    // LastOpDate: any;
    // Reason:any;
    // DeviceCWS:any;
    ReasonHide: boolean = false;
    input: any;
    maxDate: any;
    minDate: any;
    asset_Unit_Code: any;
    DistrictCode: any;
    GridList: any[] = [];
    DropdownList: any[] = [];
    DatesValidStatus: any;
    object = {
        DeviceName: "",
        PurchaseDate: "",
        LastOpDate: "",
        Reason: "",
        DeviceCWS: ""


    }

    @ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;

    dtOptions: DataTables.Settings = this.utils.dataTableOptions();
    dtTrigger: Subject<any> = new Subject();

    constructor(
        private spinner: NgxSpinnerService,
        private toast: ToasterService,
        private router: Router,
        private mcuAPI: McuMappingService,
        private utils: UtilsService,
        private logger: LoggerService,
        private session: SessionService,
        private technicianAPI: TechnicianService,
        private route: ActivatedRoute,
    ) {
        this.minDate = this.session.getDOBMinDate();
        this.maxDate = this.session.getDOBMaxDate();
        route.queryParams.subscribe((params) => (this.input = params['request']));
    }

    ngOnInit(): void {

        if (this.session.uniqueId != "" && this.session.desigId != "") {
            this.loadDropdown();
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
        debugger;
        const result = this.utils.encrypt(JSON.stringify(this.DistrictCode));
        this.router.navigate(['/districtHOModule/MCCInspection'], {
            queryParams: { request: result },
        });

        //this.router.navigate(['/districtHOModule/MCCInspection']);

    }

    DataChange() {
        if (this.object.DeviceCWS == "0" || this.object.DeviceCWS === "0") {
            this.ReasonHide = true;
        }
        else {
            this.ReasonHide = false;
        }
    }

    async SubmitDeatils(): Promise<void> {
        debugger;
        if (
            this.object.DeviceName == '' ||
            this.object.DeviceName == null ||
            this.object.DeviceName == undefined
        ) {

            this.toast.warning('Please Enter Machinery Name');
            return;
        }

        if (
            this.object.PurchaseDate == '' ||
            this.object.PurchaseDate == null ||
            this.object.PurchaseDate == undefined
        ) {

            this.toast.warning('Please Select Purchase Date');
            return;
        }
        if (
            this.object.LastOpDate == '' ||
            this.object.LastOpDate == null ||
            this.object.LastOpDate == undefined
        ) {

            this.toast.warning('Please Select Last Operation Date');
            return;
        }
        if (this.object.PurchaseDate && this.object.LastOpDate) {

            const purchaseParts = this.object.PurchaseDate.split('-');
            const lastOpParts = this.object.LastOpDate.split('-');

            const purchase = new Date(`${purchaseParts[2]}-${purchaseParts[1]}-${purchaseParts[0]}`);
            const lastOp = new Date(`${lastOpParts[2]}-${lastOpParts[1]}-${lastOpParts[0]}`);

            this.DatesValidStatus = lastOp >= purchase;

        }
        if (this.DatesValidStatus == false || this.DatesValidStatus === false) {

            this.toast.warning('Please Select Last Operation Date is on or after Purchase Date');
            return;
        }
        if (
            this.object.DeviceCWS == '' ||
            this.object.DeviceCWS == null ||
            this.object.DeviceCWS == undefined
        ) {

            this.toast.warning('Please Select Machinery Current Working Status');
            return;
        }
        if (
            this.object.DeviceCWS == "0" || this.object.DeviceCWS === "0"
        ) {
            if (
                this.object.Reason == '' ||
                this.object.Reason == null ||
                this.object.Reason == undefined
            ) {

                this.toast.warning('Please Enter Reason');
                return;
            }
        }
        if (false) {

        }

        else {



            try {
                debugger;
                const obj = {
                    type: "4",
                    DEVICE_NAME: this.object.DeviceName,
                    PURCHASE_DATE: this.object.PurchaseDate,
                    LAST_OPERATION_DATE: this.object.LastOpDate,
                    INSERTED_BY: this.session.desigName,
                    ASSET_UNIT_CODE: this.asset_Unit_Code,
                    DISTRICT_CODE: this.DistrictCode,
                    REMARKS: this.object.Reason,
                    ASSET_CODE: this.object.DeviceCWS
                }
                this.spinner.show();
                const response = await this.technicianAPI.mccinspectionSub(obj);
                this.spinner.hide();
                if (response.success) {
                    this.object = {
                        DeviceName: "",
                        PurchaseDate: "",
                        LastOpDate: "",
                        Reason: "",
                        DeviceCWS: ""

                    }
                    this.loadData();
                    this.toast.info(response.message);

                } else {
                    this.object = {
                        DeviceName: "",
                        PurchaseDate: "",
                        LastOpDate: "",
                        Reason: "",
                        DeviceCWS: ""
                    }
                    this.toast.info(response.message);
                }
            } catch (error) {
                this.spinner.hide();
                this.utils.catchResponse(error);
            }

        }

    }

    onDeviceNameChange() {
        // Remove whitespace from beginning and end, or handle as desired
        this.object.DeviceName = this.object.DeviceName.trim();

        // Optionally, check if only whitespace was entered
        if (this.object.DeviceName.length === 0) {
            // Handle invalid whitespace-only input here
            // alert('Whitespace is not allowed. Please enter a valid name.');
            // this.object.DeviceName = ''; // Reset field
        }
    }
    async loadDropdown(): Promise<void> {
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
            // this.rerender();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }


    async loadData(): Promise<void> {
        try {
            debugger;
            const req = {
                TYPE: 6,
                ASSET_UNIT_CODE: this.asset_Unit_Code
            };
            this.spinner.show();
            const response = await this.technicianAPI.mccinspectionDetails(req);
            this.spinner.hide();
            if (response.success) {
                this.GridList = response.result;
                //console.log(this.GridList);
            } else {
                //this.toast.info(response.message);
            }
            this.rerender();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
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
