import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { CollectorService } from 'src/app/collectorModule/services/collector.service';
import { McuMappingService } from 'src/app/mentorModule/services/mcu-mapping.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
    selector: 'app-pay-wise-inspection',
    templateUrl: './pay-wise-inspection.component.html',
    styleUrls: ['./pay-wise-inspection.component.css'],
})
export class PayWiseInspectionComponent
    implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('candidateAmountImgUpload') candidateAmountImgUpload: ElementRef;
    @ViewChild('paymentSlipImgUpload') paymentSlipImgUpload: ElementRef;

    rbkList = [];
    societyList = [];
    farmerList = [];
    paymentList = [];

    inspectionData = {
        districtId: '',
        mandalId: '',
        rbkId: '',
        villageData: '',
        villageId: '',
        societyId: '',
        source: '',
        insertedBy: '',
        farmerInspectionList: [],
    };

    farmerInspectionData = {
        farmerData: '',
        farmerId: '',
        farmerName: '',
        paymentCycle: '',
        milkQuantity: '',
        fat: '',
        SNF: '',
        amount: '',
        creditedAmount: '',
        paymentSlipImg: '',
        candidateAmountImg: '',
    };

    showFarmersPopup = false;

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
        private sanitizer: DomSanitizer,
        private collectorAPI: CollectorService,
        private commonAPI: CommonService
    ) { }

    ngOnInit(): void {
        if (this.session.uniqueId != "" && this.session.desigId != "") {

        }
        else {
            this.router.navigate(['/shared/UnAuthorized']);
        }
        this.loadRBKList();
        this.paymentPeriodList();
    }

    async loadRBKList(): Promise<void> {
        try {
            this.rbkList = [];
            const req = {
                uniqueId: this.session.rbkGroupId,
            };
            this.spinner.show();
            const res = await this.mcuAPI.rbkListByMentorId(req);
            if (res.success) {
                this.rbkList = res.result;
            } else {
                this.toast.info(res.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async paymentPeriodList(): Promise<void> {
        try {
            this.paymentList = [];
            const req = {};
            this.spinner.show();
            const res = await this.collectorAPI.paymentCycleList(req);
            if (res.success) {
                this.paymentList = res.result;
            } else {
                this.toast.info(res.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async onRbkChange(): Promise<void> {
        try {
            this.inspectionData.villageId = '';
            this.inspectionData.societyId = '';
            this.societyList = [];
            this.inspectionData.farmerInspectionList = [];

            if (this.utils.isEmpty(this.inspectionData.rbkId)) {
                return;
            }
            const req = {
                districtId: this.session.districtId,
                rbkId: this.inspectionData.rbkId,
                uniqueId: this.session.rbkGroupId,
            };
            this.spinner.show();
            const res = await this.commonAPI.societyListRbkId(req);
            if (res.success) {
                this.societyList = res.result;
            } else {
                this.toast.info(res.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async onSocietyChange(): Promise<void> {
        try {
            this.inspectionData.farmerInspectionList = [];
            if (!this.utils.isEmpty(this.inspectionData.villageData)) {
                this.inspectionData.societyId = JSON.parse(
                    this.inspectionData.villageData
                ).VDCS_CODE;
                this.inspectionData.villageId = JSON.parse(
                    this.inspectionData.villageData
                ).VILLAGE_CODE;
            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async addFarmerPopUp(): Promise<void> {
        try {
            if (this.utils.isEmpty(this.inspectionData.rbkId)) {
                this.toast.warning('Please Select RSK');
                return;
            }
            if (this.utils.isEmpty(this.inspectionData.villageId)) {
                this.toast.warning('Please Select Society');
                return;
            }
            if (this.utils.isEmpty(this.inspectionData.societyId)) {
                this.toast.warning('Please Select Society');
                return;
            }
            this.clearFarmerInput();
            this.farmerList = [];
            const req = {
                societyId: this.inspectionData.societyId,
            };
            this.spinner.show();
            const res = await this.collectorAPI.farmerListBySocietyId(req);
            if (res.success) {
                this.farmerList = res.result;
                this.showFarmersPopup = true;
            } else {
                this.toast.info(res.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    clearFarmerInput(): void {
        this.farmerInspectionData = {
            farmerData: '',
            farmerId: '',
            farmerName: '',
            paymentCycle: '',
            milkQuantity: '',
            fat: '',
            SNF: '',
            amount: '',
            creditedAmount: '',
            paymentSlipImg: '',
            candidateAmountImg: '',
        };
        if (this.candidateAmountImgUpload) {
            this.candidateAmountImgUpload.nativeElement.value = '';
        }
        if (this.paymentSlipImgUpload) {
            this.paymentSlipImgUpload.nativeElement.value = '';
        }
    }

    onFarmerChange(): void {
        const farmerId = JSON.parse(
            this.farmerInspectionData.farmerData
        ).FARMER_CODE;
        const farmerName = JSON.parse(
            this.farmerInspectionData.farmerData
        ).FARMER_NAME;

        this.farmerInspectionData = {
            farmerData: this.farmerInspectionData.farmerData,
            farmerId,
            farmerName,
            paymentCycle: '',
            milkQuantity: '',
            fat: '',
            SNF: '',
            amount: '',
            creditedAmount: '',
            paymentSlipImg: '',
            candidateAmountImg: '',
        };
        if (this.candidateAmountImgUpload) {
            this.candidateAmountImgUpload.nativeElement.value = '';
        }
        if (this.paymentSlipImgUpload) {
            this.paymentSlipImgUpload.nativeElement.value = '';
        }
    }

    async btnAddFarmer(): Promise<void> {
        try {
            if (this.utils.isEmpty(this.farmerInspectionData.farmerData)) {
                this.toast.warning('Please Select Farmer');
                return;
            }
            if (this.utils.isEmpty(this.farmerInspectionData.paymentCycle)) {
                this.toast.warning('Please Select Payment Cycle');
                return;
            }

            if (this.utils.isEmpty(this.farmerInspectionData.milkQuantity)) {
                this.toast.warning('Please Enter Milk In Litres');
                return;
            }

            if (!this.utils.isNumber(this.farmerInspectionData.milkQuantity)) {
                this.toast.warning('Please Enter Valid Milk In Litres');
                return;
            }

            if (this.utils.isEmpty(this.farmerInspectionData.fat)) {
                this.toast.warning('Please Enter FAT');
                return;
            }

            if (!this.utils.isNumber(this.farmerInspectionData.fat)) {
                this.toast.warning('Please Enter Valid FAT');
                return;
            }

            if (this.utils.isEmpty(this.farmerInspectionData.SNF)) {
                this.toast.warning('Please Enter SNF');
                return;
            }

            if (!this.utils.isNumber(this.farmerInspectionData.SNF)) {
                this.toast.warning('Please Enter Valid SNF');
                return;
            }

            if (this.utils.isEmpty(this.farmerInspectionData.amount)) {
                this.toast.warning('Please Enter Amount');
                return;
            }

            if (!this.utils.isNumber(this.farmerInspectionData.amount)) {
                this.toast.warning('Please Enter Valid Amount');
                return;
            }

            if (this.utils.isEmpty(this.farmerInspectionData.creditedAmount)) {
                this.toast.warning('Please Enter Credited Amount');
                return;
            }

            if (!this.utils.isNumber(this.farmerInspectionData.creditedAmount)) {
                this.toast.warning('Please Enter Valid Credited Amount');
                return;
            }

            if (this.utils.isEmpty(this.farmerInspectionData.candidateAmountImg)) {
                this.toast.warning('Please Upload Amount Photo');
                return;
            }
            if (this.utils.isEmpty(this.farmerInspectionData.paymentSlipImg)) {
                this.toast.warning('Please Upload Payment Photo');
                return;
            }
            this.farmerInspectionData.farmerId = JSON.parse(
                this.farmerInspectionData.farmerData
            ).FARMER_CODE;
            this.farmerInspectionData.farmerName = JSON.parse(
                this.farmerInspectionData.farmerData
            ).FARMER_NAME;

            if (this.inspectionData.farmerInspectionList.length > 10) {
                this.toast.warning('10 Farmer Only Added At A Time !!!!');
                return;
            }

            // tslint:disable-next-line: prefer-for-of
            for (
                let i = 0;
                i < this.inspectionData.farmerInspectionList.length;
                i++
            ) {
                if (
                    this.inspectionData.farmerInspectionList[i].farmerId ===
                    this.farmerInspectionData.farmerId
                ) {
                    this.toast.warning('Farmer Already Added !!!!');
                    return;
                }
            }

            this.inspectionData.farmerInspectionList.push(this.farmerInspectionData);
            this.rerender();
            this.clearFarmerInput();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async btnRemoveFarmer(index): Promise<void> {
        try {
            if (this.inspectionData.farmerInspectionList.length > 0) {
                this.inspectionData.farmerInspectionList.splice(index, 1);
            }
        } catch (error) {
            this.utils.catchResponse(error);
        }
    }

    async btnSubmit(): Promise<void> {
        try {
            this.inspectionData.insertedBy = this.session.userName;
            this.inspectionData.districtId = this.session.districtId;
            this.inspectionData.mandalId = this.session.mandalId;
            this.inspectionData.source = 'web';

            console.log('inspectionData', this.inspectionData);

            this.spinner.show();
            const res = await this.collectorAPI.paymentInspectionSub(
                this.inspectionData
            );
            if (res.success) {
                alert(res.message);
                window.location.reload();
            } else {
                this.toast.info(res.message);
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    onCandidateAmountImageChange(event): void {

        const file = event.target.files[0];
        const allowedTypes = ['image/jpeg', 'image/jpg'];

        if (file && allowedTypes.includes(file.type)) {
            this.utils
                .encodedString(
                    event,
                    this.utils.fileType.IMAGE,
                    this.utils.fileSize.twoHundredKB
                )
                .then((res: any) => {
                    this.farmerInspectionData.candidateAmountImg = res.replace(
                        'data:image/jpeg;base64,',
                        ''
                    );
                })
                .catch((error: any) => {
                    this.utils.catchResponse(error);
                });
        } else {
            this.toast.warning('Only JPEG files are allowed');

        }

    }
    onPaymentSlipImageChange(event): void {
        this.utils
            .encodedString(
                event,
                this.utils.fileType.IMAGE,
                this.utils.fileSize.twoHundredKB
            )
            .then((res: any) => {
                this.farmerInspectionData.paymentSlipImg = res.replace(
                    'data:image/jpeg;base64,',
                    ''
                );
            })
            .catch((error: any) => {
                this.utils.catchResponse(error);
            });
    }
    async btnPhotoView(photo): Promise<void> {
        try {
            let devicesPhoto = (
                this.sanitizer.bypassSecurityTrustResourceUrl(photo) as any
            ).changingThisBreaksApplicationSecurity;
            this.utils.viewImage(devicesPhoto);
            // this.toast.showImage(devicesPhoto);
        } catch (error) {
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
