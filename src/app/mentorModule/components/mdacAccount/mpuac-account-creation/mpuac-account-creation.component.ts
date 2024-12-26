import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { McuMappingService } from '../../../services/mcu-mapping.service';

@Component({
    selector: 'app-mpuac-account-creation',
    templateUrl: './mpuac-account-creation.component.html',
    styleUrls: ['./mpuac-account-creation.component.css'],
})
export class MpuacAccountCreationComponent implements OnInit {
    @ViewChild('bankPassBookUpload') bankPassBookUpload: ElementRef;

    rbkList = [];
    villageList = [];
    promotorDetails = [];
    routeList = [];
    bankAccLength: any;
    validateAccount: any;

    accountData = {
        rbkId: '',
        districtId: '',
        mandalId: '',
        mpussId: '',
        routeId: '',
        villageId: '',
        mentorId: '',
        promoter1Name: '',
        promoter1Aadhar: '',
        promoter1Mobile: '',
        promoter2Name: '',
        promoter2Aadhar: '',
        promoter2Mobile: '',
        bankAccountNo: '',
        ifscCode: '',
        bankName: '',
        branchName: '',
        passBookImg: '',
        insertedBy: '',
        source: '',
        bankAccountName: '',
        pinCode: '',
    };

    @ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;

    dtOptions: DataTables.Settings = this.utils.dataTableOptions();
    dtTrigger: Subject<any> = new Subject();

    constructor(
        private spinner: NgxSpinnerService,
        private toast: ToasterService,
        private mcuAPI: McuMappingService,
        private utils: UtilsService,
        private logger: LoggerService,
        private session: SessionService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        if (this.session.uniqueId != "" && this.session.desigId != "") {

        }
        else {
            this.router.navigate(['/shared/UnAuthorized']);
        }
        this.loadRoutes();
    }

    async loadRoutes(): Promise<void> {
        try {
            const req = {
                districtId: this.session.districtId,
            };
            this.spinner.show();
            const response = await this.mcuAPI.routeList(req);
            if (response.success) {
                this.routeList = response.result;
                this.loadRBKList();
            } else {
                this.toast.info(response.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    onRouteChange(): void {
        this.clearPromoterDetails();
        this.accountData.rbkId = '';
        this.accountData.villageId = '';
    }

    async loadRBKList(): Promise<void> {
        try {
            const req = {
                uniqueId: this.session.rbkGroupId,
            };
            this.spinner.show();
            const response = await this.mcuAPI.rbkListByMentorId(req);
            if (response.success) {
                this.rbkList = response.result;
            } else {
                this.toast.info(response.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async onRbkChange(): Promise<void> {
        try {
            this.clearPromoterDetails();
            this.promotorDetails = [];
            if (this.accountData.rbkId === '') {
                return;
            }

            const req = {
                rbkId: this.accountData.rbkId,
                uniqueId: this.session.rbkGroupId,
            };
            this.spinner.show();
            const response = await this.mcuAPI.promotersByRbkId(req);
            if (response.success) {
                this.promotorDetails = response.result;
            } else {
                this.toast.info(response.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    onPromoter1Change(): void {
        this.accountData.promoter1Name = '';
        this.accountData.promoter1Mobile = '';
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.promotorDetails.length; i++) {
            if (this.promotorDetails[i].AADHAR === this.accountData.promoter1Aadhar) {
                this.accountData.promoter1Name = this.promotorDetails[i].PROMOTERS_NAME;
                this.accountData.promoter1Mobile = this.promotorDetails[i].MOBILE;
            }
        }
    }

    onPromoter2Change(): void {
        this.accountData.promoter2Name = '';
        this.accountData.promoter2Mobile = '';
        if (this.accountData.promoter2Aadhar === this.accountData.promoter1Aadhar) {
            this.accountData.promoter2Aadhar = '';
            this.toast.warning(
                'Promoter 1 and Promoter 2 should not be a same person !!!'
            );
        } else {
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < this.promotorDetails.length; i++) {
                if (
                    this.promotorDetails[i].AADHAR === this.accountData.promoter2Aadhar
                ) {
                    this.accountData.promoter2Name =
                        this.promotorDetails[i].PROMOTERS_NAME;
                    this.accountData.promoter2Mobile = this.promotorDetails[i].MOBILE;
                }
            }
        }
    }

    clearPromoterDetails(): void {
        this.accountData.promoter1Name = '';
        this.accountData.promoter1Aadhar = '';
        this.accountData.promoter1Mobile = '';
        this.accountData.promoter1Mobile = '';
        this.accountData.promoter2Name = '';
        this.accountData.promoter2Aadhar = '';
        this.accountData.promoter2Mobile = '';
        this.accountData.bankAccountNo = '';
        this.accountData.ifscCode = '';
        this.accountData.bankName = '';
        this.accountData.branchName = '';
        this.accountData.passBookImg = '';
        this.bankPassBookUpload.nativeElement.value = '';
    }


    validateBankAccount() {
        debugger;
        const value = this.accountData.bankAccountNo;

        // Check if the input is numeric
        if (!/^\d+$/.test(value)) {
            //this.bankAccountError = 'Bank account number must be numeric.';

            return this.validateAccount = true;
        }

        // Check the length of the bank account number (assuming 10 digits)


        // Check for repeated sequences (e.g., 0000000000, 1111111111)
        if (/^(.)\1+$/.test(value)) {
            // this.bankAccountError = 'Bank account number cannot be a repeated sequence (e.g., 0000000000).';
            return this.validateAccount = true;
        }


        // Clear the error if everything is valid
        //this.bankAccountError = '';
        return this.validateAccount = false;
    }

    async btnVerifyIfscCode(): Promise<void> {
        try {
            debugger;
            if (this.utils.isEmpty(this.accountData.bankAccountNo)) {
                this.toast.warning('Please Enter Bank Account Number');
                return;
            }
            if (this.validateAccount) {
                this.toast.warning('Please Enter Valid Bank Account Number');
                this.accountData.bankAccountNo = "";
                return;
            }
            if (this.utils.isEmpty(this.accountData.ifscCode)) {
                this.toast.warning('Please Enter IFSC Code');
                return;
            }
            const req = {
                ifscCode: this.accountData.ifscCode,
            };
            this.spinner.show();
            const response = await this.mcuAPI.searchByIFSC(req);
            if (response.success) {
                let count = 0;
                for (let i = 0; i < response.result.length; i++) {
                    if (
                        this.accountData.bankAccountNo.length.toString() ===
                        response.result[i].ACCOUNTLENGTH
                    ) {
                        this.accountData.bankName = response.result[i].BANK;
                        this.accountData.branchName = response.result[i].BRANCH;
                        this.bankAccLength = response.result[i].ACCOUNTLENGTH;
                        count++;
                        break;
                    }
                }
                if (count < 1) {
                    this.toast.info('Invalid bank account number for entered IFSC Code');
                }
            } else {
                this.toast.info(response.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async btnSubmit(): Promise<void> {
        try {
            if (this.validate()) {
                this.accountData.districtId = this.session.districtId;
                this.accountData.mandalId = this.session.mandalId;
                this.accountData.mentorId = this.session.rbkGroupId;
                this.accountData.insertedBy = this.session.userName;
                this.accountData.source = 'web';
                this.spinner.show();
                const response = await this.mcuAPI.mpuacAccSub(this.accountData);
                if (response.success) {
                    alert(response.message);
                    window.location.reload();
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

    validate(): boolean {
        debugger;
        if (this.utils.isEmpty(this.accountData.routeId)) {
            this.toast.warning('Please Select Route Id');
            return false;
        }

        if (this.utils.isEmpty(this.accountData.rbkId)) {
            this.toast.warning('Please Select RSK');
            return false;
        }

        if (this.utils.isEmpty(this.accountData.promoter1Aadhar)) {
            this.toast.warning('Please Select Promoters 1 !!!');
            return false;
        }

        if (this.utils.isEmpty(this.accountData.promoter1Name)) {
            this.toast.warning('Promoters 1 Name Not Availble !!!');
            return false;
        }

        if (this.utils.isEmpty(this.accountData.promoter1Mobile)) {
            this.toast.warning('Promoters 1 Mobile Not Availble !!!');
            return false;
        }

        if (this.utils.isEmpty(this.accountData.promoter2Aadhar)) {
            this.toast.warning('Please Select Promoters 2 !!!');
            return false;
        }

        if (this.utils.isEmpty(this.accountData.promoter2Name)) {
            this.toast.warning('Promoters 2 Name Not Availble !!!');
            return false;
        }

        if (this.utils.isEmpty(this.accountData.promoter2Mobile)) {
            this.toast.warning('Promoters 2 Mobile Not Availble !!!');
            return false;
        }

        if (this.accountData.promoter1Aadhar === this.accountData.promoter2Aadhar) {
            this.toast.warning(
                'Promoter 1 and Promoter 2 should not be a same person !!!'
            );
            return;
        }

        if (this.utils.isEmpty(this.accountData.bankAccountNo)) {
            this.toast.warning('Please Enter Bank Account Number');
            return false;
        }
        if (this.validateAccount) {
            this.toast.warning('Please Enter Valid Bank Account Number');
            this.accountData.bankAccountNo = "";
            return;
        }

        if (this.utils.isEmpty(this.accountData.bankName)) {
            this.toast.warning('Bank Name Not Availble !!!');
            return false;
        }

        if (this.utils.isEmpty(this.accountData.branchName)) {
            this.toast.warning('Branch Name Not Availble !!!');
            return false;
        }

        if (this.utils.isEmpty(this.accountData.bankAccountName)) {
            this.toast.warning('Please Enter Bank Account Name');
            return false;
        }

        if (this.utils.isEmpty(this.accountData.pinCode)) {
            this.toast.warning('Please Enter Pincode');
            return false;
        }

        if (!this.utils.pinCodeCheck(this.accountData.pinCode)) {
            this.toast.warning('Please Enter Valid PINCODE');
            return;
        }

        if (this.utils.isEmpty(this.accountData.passBookImg)) {
            this.toast.warning('Please Upload Bank PassBook Front Page Photo ');
            return false;
        }

        if (this.accountData.bankAccountNo.length === this.bankAccLength) {
            this.toast.warning('Bank Account No Is Not Valid');
            return false;
        }

        return true;
    }

    async onBankPassBookChange(event): Promise<void> {
        try {
            const element = event.currentTarget as HTMLInputElement;
            let fileList: FileList | null = element.files;

            if (element.files[0].name.split('.').length.toString() !== '2') {
                this.toast.warning('Please Upload bank jpg files only');

                event.target.value = '';
                return;
            } else {

                const res = await this.utils.encodedString(
                    event,
                    this.utils.fileType.IMAGE,
                    this.utils.fileSize.twoHundredKB
                );
                if (res) {
                    this.accountData.passBookImg = res.replace(
                        'data:image/jpeg;base64,',
                        ''
                    );
                }
            }
        } catch (error) {
            this.utils.catchResponse(error);
        }
    }
}
