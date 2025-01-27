import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { McuMappingService } from 'src/app/mentorModule/services/mcu-mapping.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
    selector: 'app-society-change-request',
    templateUrl: './society-change-request.component.html',
    styleUrls: ['./society-change-request.component.css']
})
export class SocietyChangeRequestComponent implements OnInit, OnDestroy, AfterViewInit {
    societyChangeRequestsList = [];

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

        this.loadSocietyChangeRequestsList();
    }
    async loadSocietyChangeRequestsList(): Promise<void> {
        try {
            const req = {
                uniqueId: this.session.rbkGroupId,
            }; debugger;
            this.spinner.show();
            const response = await this.mcuAPI.mentorFarmerRequestsList(req);
            this.spinner.hide();
            if (response.success) {
                this.societyChangeRequestsList = response.result;
                this.rerender();
            } else {
                // this.toast.info(response.message);
            }
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

    btnBack() {
        this.router.navigate(['/districtHOModule/FarmerSocietyChange']);
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