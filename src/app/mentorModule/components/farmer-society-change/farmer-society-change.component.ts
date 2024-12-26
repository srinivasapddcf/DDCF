import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {
    AfterViewInit,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { McuMappingService } from '../../services/mcu-mapping.service';

@Component({
    selector: 'app-farmer-society-change',
    templateUrl: './farmer-society-change.component.html',
    styleUrls: ['./farmer-society-change.component.css'],
})
export class FarmerSocietyChangeComponent
    implements OnInit, OnDestroy, AfterViewInit {
    oldRbkList = [];
    oldVillageList = [];
    newRbkList = [];
    newVillageList = [];
    newDISTRICTList = [];
    newROUNTENOSList = [];
    farmerList = [];
    DistrictCODE: any; ROUNTENOS: any; newRbkId: any; newVillageId1: any;
    showSocietyChangePopup = false;
    farmerSocietyData = {
        oldRbkName: '',
        oldVillageName: '',
        oldRbkId: '',
        oldVillageId: '',
        districtId: '',
        rbkId: '',
        villageId: '',
        farmerName: '',
        farmerCode: '',
        mobileNumber: '',
        uidNum: '',
        actionTaken: '',
        insertedBy: '',
        source: '',

    };

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
        private session: SessionService
    ) { }

    ngOnInit(): void {
        if (this.session.uniqueId != "" && this.session.desigId != "") {

        }
        else {
            this.router.navigate(['/shared/UnAuthorized']);
        }
        this.loadOldRBKList();
    }
    async loadOldRBKList(): Promise<void> {
        try {
            debugger;
            const req = {
                uniqueId: this.session.rbkGroupId,
            };
            this.spinner.show();
            const response = await this.mcuAPI.rbkListByMentorId(req);
            this.spinner.hide();
            if (response.success) {
                this.oldRbkList = response.result;
                // this.newRbkList = response.result;
            } else {
                this.toast.info(response.message);
            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async onOldRbkChange(): Promise<void> {
        try {
            this.farmerSocietyData.oldVillageId = '';
            this.oldVillageList = [];
            if (this.farmerSocietyData.oldRbkId === '') {
                return;
            }
            const req = {
                districtId: this.session.districtId,
                rbkId: this.farmerSocietyData.oldRbkId,
                uniqueId: '1',
            }; debugger;
            this.spinner.show();
            const response = await this.mcuAPI.villageListByRbkId(req);
            this.spinner.hide();
            if (response.success) {
                this.oldVillageList = response.result;
            } else {
                this.toast.info(response.message);
            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async onOldVillageChange(): Promise<void> {
        try {

            this.farmerList = [];
            if (this.farmerSocietyData.oldVillageId === '') {
                return;
            }
            const req = {
                villageId: this.farmerSocietyData.oldVillageId,
            };
            this.spinner.show();
            const response = await this.mcuAPI.farmerList(req);
            this.spinner.hide();
            if (response.success) {
                this.farmerList = response.result;
                this.rerender();
            } else {
                this.toast.info(response.message);
            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async onNewRbkChange(): Promise<void> {
        try {

            this.newVillageList = [];
            if (this.DistrictCODE === '') {
                return;
            }
            if (this.newRbkId === '') {
                return;
            }
            // if (this.newRbkId === '') {
            //   return;
            // }
            debugger;
            const req = {
                type: 35,
                districtId: this.DistrictCODE,
                routeId: this.newRbkId,//newROUNTENOSList[this.ROUNTENOS].ROUNTE_NOS,//this.ROUNTENOS,
                rbkId: this.newRbkId,
                villageId: this.farmerSocietyData.oldVillageId

            };
            this.spinner.show();
            const response = await this.mcuAPI.SocietyChangedropdowns(req);
            this.spinner.hide();
            if (response.success) {
                this.newVillageList = response.result;
                this.newVillageId1 = '';
            } else {
                this.toast.info(response.message);
            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    //District dropdown newly added
    async DISTRICTSBINDING(): Promise<void> {
        try {

            this.newDISTRICTList = [];
            if (this.DistrictCODE === '') {
                return;
            }
            const req = {
                type: 32,

            };
            this.spinner.show();
            const response = await this.mcuAPI.SocietyChangedropdowns(req);
            this.spinner.hide();
            if (response.success) {
                this.DistrictCODE = '';
                this.newDISTRICTList = response.result;
            } else {
                this.toast.info(response.message);
            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async onNewDISTRICTSChange(): Promise<void> {
        try {
            this.ROUNTENOS = '';
            this.newROUNTENOSList = [];
            if (this.DistrictCODE === '') {
                return;
            }
            const req = {
                type: 33,
                districtId: this.DistrictCODE,
            };
            this.spinner.show();
            const response = await this.mcuAPI.SocietyChangedropdowns(req);
            this.spinner.hide();
            if (response.success) {
                this.newROUNTENOSList = response.result;
            } else {
                this.toast.info(response.message);
            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }


    async onNewROUNTENOSChange(): Promise<void> {
        try {
            this.newRbkId = '';
            this.newRbkList = [];


            if (this.DistrictCODE === '') {
                return;
            }
            if (this.ROUNTENOS === '') {
                return;
            } debugger;
            const req = {
                type: 34,
                districtId: this.DistrictCODE,
                routeId: this.ROUNTENOS,//this.newROUNTENOSList[this.ROUNTENOS].ROUNTE_NOS,//this.ROUNTENOS,

            };
            this.spinner.show();
            const response = await this.mcuAPI.SocietyChangedropdowns(req);
            this.spinner.hide();
            if (response.success) {
                this.newRbkList = response.result;
                this.newRbkId = '';
            } else {
                this.toast.info(response.message);
            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }


    btnChangeSociety(obj): void {
        this.farmerSocietyData.farmerName = obj.FARMER_NAME;
        this.farmerSocietyData.farmerCode = obj.FARMER_CODE;
        this.farmerSocietyData.mobileNumber = obj.MOBILE_NUMBER;
        this.farmerSocietyData.uidNum = obj.UID_NUM;
        this.farmerSocietyData.oldRbkName = obj.RBK_NAME;
        this.farmerSocietyData.oldVillageName = obj.VILLAGE_NAME;
        this.farmerSocietyData.rbkId = '';
        this.farmerSocietyData.villageId = '';
        this.showSocietyChangePopup = true;


        this.DISTRICTSBINDING();
        this.ROUNTENOS = "";
        this.newRbkId = "";
        this.newVillageId1 = "";


    }



    async btnSubmit(): Promise<void> {
        try {
            // if (this.utils.isEmpty(this.farmerSocietyData.rbkId)) {
            //   this.toast.warning('Please Select RBK');
            //   return;
            // }
            // if (this.utils.isEmpty(this.farmerSocietyData.villageId)) {
            //   this.toast.warning('Please Select Village');
            //   return;
            // }
            //  alert(this.newRbkId);
            if (this.utils.isEmpty(this.newRbkId)) {
                this.toast.warning('Please Select New RSK');
                return;
            } else this.farmerSocietyData.rbkId = this.newRbkId;
            //   alert(this.newVillageId1);
            //   alert(this.farmerSocietyData.villageId);

            if (this.utils.isEmpty(this.newVillageId1)) {
                this.toast.warning('Please Select New Village');
                return;
            } else this.farmerSocietyData.villageId = this.newVillageId1;

            if (this.utils.isEmpty(this.DistrictCODE)) {
                this.toast.warning('Please Select NEW District');
                return;
            } else this.farmerSocietyData.oldRbkId = this.DistrictCODE;

            if (this.utils.isEmpty(this.ROUNTENOS)) {
                this.toast.warning('Please Select NEW ROUNTE');
                return;
            } else this.farmerSocietyData.oldVillageId = this.ROUNTENOS;//this.newROUNTENOSList[this.ROUNTENOS].ROUNTE_NOS;

            if (this.farmerSocietyData.rbkId === this.farmerSocietyData.oldRbkId) {
                if (
                    this.farmerSocietyData.villageId === this.farmerSocietyData.oldVillageId
                ) {
                    this.toast.warning('Please New Village Should not be same as old Village');
                    return;
                }
            }

            if (!confirm('Are you sure want to change the society ?')) {
                return;
            }

            this.farmerSocietyData.districtId = this.DistrictCODE;//this.session.districtId;
            this.farmerSocietyData.insertedBy = this.session.userName;
            this.farmerSocietyData.actionTaken = '';
            this.farmerSocietyData.source = 'web';
            this.farmerSocietyData.uidNum = '000000000000';

            this.spinner.show();
            const response = await this.mcuAPI.farmerSocietyChangeRequestSub(
                this.farmerSocietyData
            );
            this.spinner.hide();
            if (response.success) {
                alert(response.message);
                window.location.reload();
            } else {
                this.toast.info(response.message);
            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    btnSocietyChangeRequests(): void {

        debugger;
        this.router.navigate(['/districtHOModule/SocietyChangeRequests']);
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
