import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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

@Component({
    selector: 'app-mccinspection-report',
    templateUrl: './mccinspection-report.component.html',
    styleUrls: ['./mccinspection-report.component.css']
})
export class MCCInspectionReportComponent implements OnInit, OnDestroy, AfterViewInit {
    input: any;
    DistrictList: any[] = [];
    districtId: any;
    SelectType: any;
    GridList: any[] = [];
    ExcelData: any[] = [];
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
        private sanitizer: DomSanitizer

    ) {

        route.queryParams.subscribe((params) => (this.input = params['request']));
    }

    ngOnInit(): void {

        debugger
        if (this.session.uniqueId != "" && this.session.desigId != "") {

            this.loadDistricts();
            if (this.input != undefined) {
                const decString = JSON.parse(this.utils.decrypt(this.input));
                this.districtId = decString;
                this.btnFindDetails();
            }







        }
        else {
            this.router.navigate(['/shared/UnAuthorized']);
        }

    }








    async btnFindDetails(): Promise<void> {
        debugger;

        if (
            this.districtId === null ||
            this.districtId === undefined ||
            this.districtId === ''
        ) {
            this.toast.warning('District Is Empty');
            return;
        }

        else {
            try {

                debugger;
                const req = {
                    type: 2,
                    district_code: this.districtId
                };
                this.spinner.show();
                const response = await this.technicianAPI.mccinspectionDetails(req);
                this.spinner.hide();
                if (response.success) {
                    this.GridList = response.result;
                    for (let i = 0; i < this.GridList.length; i++) {
                        let obj = {
                            SL_NO: this.GridList[i].SL_NO,
                            ASSET_TYPE: this.GridList[i].ASSET_TYPE,
                            ASSEST_UNIT_NAME: this.GridList[i].ASSEST_UNIT_NAME,
                            LOCATION: this.GridList[i].LOCATION,
                            ADDRESS: this.GridList[i].ADDRESS,
                            EXTENT_LAND_IN_ACRES: this.GridList[i].EXTENT_LAND_IN_ACRES,
                            SURVEY_NO: this.GridList[i].SURVEY_NO,
                            LATITUDE: this.GridList[i].LAT_LONG,
                            lONGITUDE: this.GridList[i].INSERTED_BY,
                            LAND_DETAILS: this.GridList[i].LAND_DETAILS,
                            LAND_FREE_FROM_ENCUMBARANCE: this.GridList[i].LAND_FREE_FROM_ENCUMBARANCE,
                            PURCHASE_YEAR: this.GridList[i].PURCHASE_YEAR,
                            DOCUMENTTYPE: this.GridList[i].DOCUMENTTYPE,
                            DOCUMENT_NO: this.GridList[i].DOCUMENT_NO,
                            AVAILABLE_ACRS: this.GridList[i].AVAILABLE_ACRS,
                            NOT_AVAILABLE_ACRS: this.GridList[i].NOT_AVAILABLE_ACRS,
                            ENCUMBRANCE_CERTIFICATE: this.GridList[i].ENCUMBRANCE_CERTIFICATE,
                            BOUNDARIES_EAST: this.GridList[i].BOUNDARIES_EAST,
                            BOUNDARIES_WEST: this.GridList[i].BOUNDARIES_WEST,
                            BOUNDARIES_NORTH: this.GridList[i].BOUNDARIES_NORTH,
                            BOUNDARIES_SOUTH: this.GridList[i].BOUNDARIES_SOUTH,
                            OWNERSHIP_DETAILS: this.GridList[i].OWNERSHIP_DETAILS,
                            UND_OPTNL_MGMT_AS_ON_01JUN2014: this.GridList[i].UND_OPTNL_MGMT_AS_ON_01JUN2014,
                            UNDER_POSSESSION: this.GridList[i].UNDER_POSSESSION,
                            BUILDING: this.GridList[i].BUILDING,
                            PLINTH_AREA_OF_BUILDING_SQFT: this.GridList[i].PLINTH_AREA_OF_BUILDING_SQFT,
                            CAPACITY_OF_PLANT: this.GridList[i].CAPACITY_OF_PLANT,
                            NO_OF_MACHINERY: this.GridList[i].NO_OF_MACHINERY,
                            LICENSES: this.GridList[i].LICENSES,
                            PHOTOS_WITH_GEO_TAGGING: this.GridList[i].PHOTOS_WITH_GEO_TAGGING,
                            // PRESENT_CONDITON: this.GridList[i].PRESENT_CONDITON,
                            // REMARKS: this.GridList[i].REMARKS,
                            ASSET_CURRENT_WORKING_STATUS: this.GridList[i].WORKING_STATUS,
                            REMARKS: this.GridList[i].REASON,
                        };
                        this.ExcelData.push(obj);

                    }
                    // console.log(this.GridList);
                } else {
                    this.toast.info(response.message);
                }
                this.rerender()
            } catch (error) {
                this.spinner.hide();
                this.utils.catchResponse(error);
            }
        }
    }

    btnExcel(): void {
        this.utils.JSONToCSVConvertor(
            this.ExcelData,
            'DAIRY ASSETS INSPECTION',
            true
        );
    }

    async loadDistricts(): Promise<void> {
        try {
            debugger;
            const req = {
                TYPE: 1
            };
            this.spinner.show();
            const response = await this.technicianAPI.mccinspectionDetails(req);
            this.spinner.hide();
            if (response.success) {
                this.DistrictList = response.result;
                // const decString = JSON.parse(this.utils.decrypt(this.input));
                // this.districtId = decString;
                //console.log(this.DistrictList);
            } else {
                this.toast.info(response.message);
            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    MCCEditInspection(obj): void {
        debugger;
        const result = this.utils.encrypt(JSON.stringify(obj));
        this.router.navigate(['/districtHOModule/MCCEditInspection'], {
            queryParams: { request: result },
        });
    }

    MCCDetails(obj: any) {
        const result = this.utils.encrypt(JSON.stringify(obj));
        this.router.navigate(['/districtHOModule/MCCDeviceDetails'], {
            queryParams: { request: result },
        });
    }


    async btnPhotoView(photo): Promise<void> {
        try {
            debugger;
            this.spinner.show();
            const response = await this.utils.DMSFileDownload(photo);
            if (response.success) {
                let passbookPhoto = (this.sanitizer.bypassSecurityTrustResourceUrl(
                    response.result
                ) as any).changingThisBreaksApplicationSecurity;
                this.utils.viewImage(passbookPhoto);
                // this.toast.showImage(passbookPhoto);
            }
            else {
                this.toast.info(response.message);
            }

            this.spinner.hide();
        }

        //this.spinner.hide();

        catch (error) {
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
