import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { DataTableDirective } from "angular-datatables";
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from "rxjs";
import { LoggerService } from "src/app/shared/services/logger.service";
import { SessionService } from "src/app/shared/services/session.service";
import { ToasterService } from "src/app/shared/services/toaster.service";
import { UtilsService } from "src/app/shared/services/utils.service";
import { DistrictHoService } from "../../services/district-ho.service";

@Component({
    selector: 'app-society-milk-collection-status-updated',
    templateUrl: './society-milk-collection-status-updated.component.html',
    styleUrls: ['./society-milk-collection-status-updated.component.css']
})
export class SocietyMilkCollectionStatusUpdatedComponent implements OnInit, OnDestroy, AfterViewInit {
    SocietyMilkCollectonList: any[] = [];
    SocietyHistoryList: any[] = [];
    excelData: any[] = [];
    showaprovedPopup: boolean = false;
    showPOPup: boolean = false;
    @ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = this.utils.dataTableOptions();
    dtTrigger: Subject<any> = new Subject();
    constructor(
        private spinner: NgxSpinnerService,
        private toast: ToasterService,
        private router: Router,
        private districtHOAPI: DistrictHoService,
        private utils: UtilsService,
        private logger: LoggerService,
        private session: SessionService,
    ) { }
    ngOnInit(): void {
        if (this.session.uniqueId != "" && this.session.desigId != "") {
            this.LoadData();
        }
        else {
            this.router.navigate(['/shared/UnAuthorized']);
        }
    }
    async LoadData(): Promise<void> {
        try {
            this.SocietyMilkCollectonList = []
            const obj = {
                type: "1",
                dist_code: this.session.districtId
            }
            this.spinner.show();
            const res = await this.districtHOAPI.SocietyMikCollectionGet(obj);
            if (res.success) {
                this.spinner.hide();
                this.SocietyMilkCollectonList = res.result;
                for (let i = 0; i < this.SocietyMilkCollectonList.length; i++) {
                    let singleRow = {
                        S_No: i + 1,
                        District_Code: this.SocietyMilkCollectonList[i].DISTRICT_CODE,
                        District_Name: this.SocietyMilkCollectonList[i].DISTRICT_NAME,
                        Mandal_Code: this.SocietyMilkCollectonList[i].MANDAL_CODE,
                        Mandal_Name: this.SocietyMilkCollectonList[i].MANDAL_NAME,
                        Route_Number: this.SocietyMilkCollectonList[i].ROUTE_NO,
                        RBK_Name: this.SocietyMilkCollectonList[i].RBK_NAME,
                        Society_Name: this.SocietyMilkCollectonList[i].SOCIETY_NAME,
                        Secretary_Assistant_Secretary_Name: this.SocietyMilkCollectonList[i].EMP_NAME,
                        Mobile_Number: this.SocietyMilkCollectonList[i].MOBILE_NO,
                        Last_Milk_Poured_Date: this.SocietyMilkCollectonList[i].MILK_POUR_LAST_DATE,
                        Status: this.SocietyMilkCollectonList[i].STATUS_MSG,
                        Updated_Date: this.SocietyMilkCollectonList[i].UPDATED_DATE,
                        Updated_Remarks: this.SocietyMilkCollectonList[i].UPDATION_REMARKS,
                        Total_Registered_Farmers: this.SocietyMilkCollectonList[i].REG_FARMERS_COUNT,
                        Today_Milk_Pouring_Status: this.SocietyMilkCollectonList[i].TODAY_MILK_POURING_STATUS,
                        Milk_Pouring_Start_Date: this.SocietyMilkCollectonList[i].POURING_START_DATE,
                        Today_Milk_Pouring_Farmers: this.SocietyMilkCollectonList[i].TODAY_FARMER_COUNT,
                        Today_Milk_Quantity: this.SocietyMilkCollectonList[i].TODAY_MILK_QTY,
                        Milk_Poured_Farmers_Till_Now: this.SocietyMilkCollectonList[i].TOTAL_FARMER_COUNT,
                        Total_Milk_Amount_Till_Now: this.SocietyMilkCollectonList[i].TOTAL_MILK_QTY,
                        No_of_Days_Milk_Poured_in_Last_3_Days: this.SocietyMilkCollectonList[i].LAST_3_DAYS_COUNT,
                        No_of_Days_Milk_Poured_in_Current_Week: this.SocietyMilkCollectonList[i].CURRENT_WEEK_COUNT,
                        No_of_Days_Milk_Poured_in_Current_Month: this.SocietyMilkCollectonList[i].CURRENT_MONTH_COUNT,
                        No_of_Days_Milk_Poured_in_Previous_Month: this.SocietyMilkCollectonList[i].PREVIOUS_MONTH_COUNT,
                        No_of_Days_Milk_Poured_in_Last_60_Days: this.SocietyMilkCollectonList[i].LAST_60_COUNT
                    }
                    this.excelData.push(singleRow);
                }
            } else {
                this.spinner.hide();
                this.toast.warning(res.message);
            }
            this.rerender();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }
    async btnActiveStatus(ob: any, val: any): Promise<void> {
        try {
            debugger;
            if (ob.Remarks === null ||
                ob.Remarks === undefined ||
                ob.Remarks === '') {
                this.toast.warning("Please Enter Remarks");
                return;
            }
            if (confirm('are you sure want to Update?')) {
                const obj = {
                    type: "3",
                    society_code: ob.SOCIETY_CODE,
                    status_code: val,
                    remarks: ob.Remarks,
                    updated_by: this.session.userName
                }
                this.spinner.show();
                const res = await this.districtHOAPI.SocietyMikCollectionUpdate(obj);
                if (res.success) {
                    this.spinner.hide();
                    this.toast.info(res.message);
                    window.location.reload();
                }
                else {
                    this.spinner.hide();
                    this.toast.warning(res.message);
                }
            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }
    async btnGetData(obj: any): Promise<void> {
        try {
            debugger;
            this.SocietyHistoryList = [];
            const req = {
                type: "2",
                society_code: obj.SOCIETY_CODE
            }
            this.spinner.show();
            const res = await this.districtHOAPI.SocietyMikCollectionGet(req);
            if (res.success) {
                this.spinner.hide();
                this.SocietyHistoryList = res.result;
                this.showaprovedPopup = true;
            } else {
                this.spinner.hide();
                this.toast.warning(res.message);
            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }
    btnExcel(): void {
        this.utils.JSONToCSVConvertor(
            this.excelData,
            'Society_milk_pouring_status_upadtion_exel_file',
            true
        );
    }
    onClear() {
        this.showaprovedPopup = false;;
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
            dtInstance.clear();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next();
        });
    }
}
