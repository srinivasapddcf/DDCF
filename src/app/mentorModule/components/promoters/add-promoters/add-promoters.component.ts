import {
    AfterViewInit,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { getDate } from 'ngx-bootstrap/chronos/utils/date-getters';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { McuMappingService } from 'src/app/mentorModule/services/mcu-mapping.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
//  import { moment } from 'ngx-bootstrap/chronos/test/chain';
import * as moment from 'moment';

@Component({
    selector: 'app-add-promoters',
    templateUrl: './add-promoters.component.html',
    styleUrls: ['./add-promoters.component.css'],
})
export class AddPromotersComponent implements OnInit, OnDestroy, AfterViewInit {

    bsDatepickerConfig: Partial<BsDatepickerConfig> = this.session.getbsdatepicker();

    dbmaxdate = new Date();
    //dbmindate=new Date('DD-MM-18');//moment(new Date('DD-MM-18'), 'DD-MM-YYYY').format('DD-MM-YYYY');

    aadharNo: any; fatherSpouseAadhar = '';
    minDate: Date;
    maxDate: Date;
    rbkList = [];
    villageList = [];
    bankAccLength: any;
    qualificationList = [];
    routeList = [];
    rbkId = '';
    promotorDetailsdob: any;
    promotorDetails = {
        rbkId: '',
        districtId: '',
        mentorId: '',
        mandalId: '',
        routeId: '',
        villageId: '',
        promoterName: '',
        dob: '',
        daughterOfOrWifeOf: '',
        fatherOrSpouseName: '',
        aadharNo: '',
        fatherSpouseAadhar: '',
        mobileNo: '',
        fatherSpouseMobileNo: '',
        educationQualification: '',
        bankAccountNo: '',
        ifscCode: '',
        bankName: '',
        branch: '',
        doorNo: '',
        street: '',
        pinCode: '',
        insertedBy: '',
        source: '',
    };
    showPromotorsPopup = false;
    isAadharChecked = false;
    promotorsList = [];

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
    ) {
        this.minDate = this.session.getDOBMinDate();
        this.maxDate = this.session.getDOBMaxDate();
    }

    ngOnInit(): void {

        if (this.session.uniqueId != "" && this.session.desigId != "") {

        }
        else {
            this.router.navigate(['/shared/UnAuthorized']);
        }
        this.promotorDetails.districtId = this.session.districtId;
        this.promotorDetails.mandalId = this.session.mandalId;
        this.promotorDetails.mentorId = this.session.rbkGroupId;
        this.promotorDetails.insertedBy = this.session.userName;
        this.promotorDetails.source = 'web';
        this.loadRoutes();
        this.loadQualificationList();
        this.promotorDetailsdob = "";
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

    async loadRBKList(): Promise<void> {
        try {
            debugger
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
            debugger;
            this.clearAddPromotorForm();
            this.promotorDetails.villageId = '';
            this.villageList = [];
            if (this.promotorDetails.rbkId === '') {
                return;
            }

            const req = {
                districtId: this.session.districtId,
                rbkId: this.promotorDetails.rbkId,
                uniqueId: this.session.rbkGroupId,
            };
            this.spinner.show();
            const response = await this.mcuAPI.villageListByRbkId(req);
            if (response.success) {
                this.villageList = response.result;
            } else {
                this.toast.info(response.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async onCheckPromoters(): Promise<void> {
        try {
            debugger;
            this.promotorsList = [];
            if (this.rbkId === '') {
                return;
            }
            const req = {
                rbkId: this.rbkId,
                mentorId: this.session.rbkGroupId,
            };
            this.spinner.show();
            const response = await this.mcuAPI.promoterListRbkId(req);
            if (response.success) {
                this.promotorsList = response.result;
                this.rerender();
            } else {
                this.toast.info(response.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async loadQualificationList(): Promise<void> {
        try {
            debugger;
            this.spinner.show();
            const response = await this.mcuAPI.promoterQualificationsList();
            if (response.success) {
                this.qualificationList = response.result;
            } else {
                this.toast.info(response.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async btnVerifyIfscCode(): Promise<void> {
        try {
            if (
                this.promotorDetails.bankAccountNo === '' ||
                this.promotorDetails.bankAccountNo === null ||
                this.promotorDetails.bankAccountNo === undefined
            ) {
                this.toast.warning('Please Enter Bank Account No');
                return;
            }
            if (
                this.promotorDetails.ifscCode === '' ||
                this.promotorDetails.ifscCode === null ||
                this.promotorDetails.ifscCode === undefined
            ) {
                this.toast.warning('Please Select IFSC CODE');
                return;
            }
            const req = {
                ifscCode: this.promotorDetails.ifscCode,
            };
            this.spinner.show();
            const response = await this.mcuAPI.searchByIFSC(req);
            if (response.success) {
                let count = 0;
                for (let i = 0; i < response.result.length; i++) {
                    if (
                        this.promotorDetails.bankAccountNo.length.toString() ===
                        response.result[i].ACCOUNTLENGTH
                    ) {
                        this.promotorDetails.bankName = response.result[i].BANK;
                        this.promotorDetails.branch = response.result[i].BRANCH;
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

    btnshowPromotorsPopup(): void {
        this.promotorDetails.villageId = '';
        this.villageList = [];
        this.promotorDetails.rbkId = '';
        this.promotorDetails.routeId = '';
        this.clearAddPromotorForm();
        this.showPromotorsPopup = true;
    }

    async btnVerifyAadhar(): Promise<void> {
        try {
            if (this.utils.isEmpty(this.promotorDetails.aadharNo)) {
                this.toast.warning('Please Enter Aadhar Number');
                return;
            }
            if (!this.utils.validateVerhoeff(this.promotorDetails.aadharNo)) {
                this.toast.warning('Please Enter Valid Aadhaar Number');
                return;
            }

            const req = {
                districtId: this.promotorDetails.districtId,
                mandalId: this.promotorDetails.mandalId,
                routeId: this.promotorDetails.routeId,
                rbkId: this.promotorDetails.rbkId,
                aadharNo: this.promotorDetails.aadharNo,
            };
            this.spinner.show();
            const response = await this.mcuAPI.farmerAadharCheck(req);
            if (response.success) {
                this.isAadharChecked = true;
            } else {
                this.isAadharChecked = false;
                alert(response.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }
    day: any;
    month: any;
    year: any;
    currdate: any;
    setDate: any;
    mydate: any;
    age: any;

    datess: any;
    enterdate: any;
    async btnSubmit(): Promise<void> {
        try {

            debugger;

            this.promotorDetails.dob = moment(this.promotorDetailsdob, 'DD-MM-YYYY').format('DD-MM-YYYY');

            var parts = this.promotorDetails.dob.split("-");
            var dtDOB = moment(new Date(parts[1] + "-" + parts[0] + "-" + parts[2])).format('DD-MM-YYYY');
            this.enterdate = dtDOB.split("-");
            var dtCurrent = new Date();
            var dtCurrents = moment(dtCurrent, 'DD-MM-YYYY').format('DD-MM-YYYY');
            this.datess = dtCurrents.split("-");
            // lblError.html("Eligibility 18 years ONLY.")
            if (this.datess[2] - this.enterdate[2] < 18) {
                this.toast.info("Eligibility 18 years ONLY.");
                this.promotorDetailsdob = '';
                this.promotorDetails.dob = ''
                return;

            }

            if (this.datess[2] - this.enterdate[2] == 18) {

                //CD: 11/06/2018 and DB: 15/07/2000. Will turned 18 on 15/07/2018.
                if (this.datess[0] < this.enterdate[0]) {
                    this.promotorDetailsdob = '';
                    this.promotorDetails.dob = ''
                    this.toast.info("Eligibility 18 years ONLY.");
                    return;
                }
                if (this.datess[0] == this.enterdate[0]) {
                    //CD: 11/06/2018 and DB: 15/06/2000. Will turned 18 on 15/06/2018.
                    if (this.datess[1] < this.enterdate[1]) {
                        this.promotorDetailsdob = '';
                        this.promotorDetails.dob = ''
                        this.toast.info("Eligibility 18 years ONLY.");
                        return;
                    }
                }

            }

            this.promotorDetails.dob = moment(this.promotorDetailsdob, 'DD-MM-YYYY').format('DD-MM-YYYY');


            //   var from = this.promotorDetails.dob.split("-");
            //            this.day = from[0];
            //          this.month = from[1];
            //           this.year = from[2];
            //          this.age = 18;
            //          this.mydate = new Date();
            //         this.mydate.setFullYear(this.year, this.month-1, this.day);


            //   this.currdate = new Date();
            //   //  var setDate = new Date();
            //   debugger;
            //         this.setDate.setFullYear(this.mydate.getFullYear() + this.age, this.month-1, this.day);

            //   //var mage=this.promotorDetailsdob.getFullYear();

            //   if ((this.currdate - this.setDate) > 0){
            //     alert("above 18");
            //     return;
            // }else{
            //   alert("below 18");
            //     return;
            // }



            if (this.validatePromoter()) {
                this.promotorDetails.districtId = this.session.districtId;

                this.spinner.show();
                const response = await this.mcuAPI.promotorSub(this.promotorDetails);
                if (response.success) {
                    alert(response.message);
                    window.location.reload();
                } else {
                    this.spinner.hide();
                    this.toast.info(response.message);
                }
            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    clearAddPromotorForm(): void {
        this.promotorDetails = {
            rbkId: this.promotorDetails.rbkId,
            districtId: this.promotorDetails.districtId,
            mentorId: this.promotorDetails.mentorId,
            mandalId: this.promotorDetails.mandalId,
            routeId: this.promotorDetails.routeId,
            villageId: this.promotorDetails.villageId,
            promoterName: '',
            dob: '',
            daughterOfOrWifeOf: '',
            fatherOrSpouseName: '',
            aadharNo: '',
            fatherSpouseAadhar: '',
            mobileNo: '',
            fatherSpouseMobileNo: '',
            educationQualification: '',
            bankAccountNo: '',
            ifscCode: '',
            bankName: '',
            branch: '',
            doorNo: '',
            street: '',
            pinCode: '',
            insertedBy: this.promotorDetails.insertedBy,
            source: 'web',
        };
    }

    validatePromoter(): boolean {
        if (
            this.promotorDetails.rbkId === '' ||
            this.promotorDetails.rbkId === null ||
            this.promotorDetails.rbkId === undefined
        ) {
            this.toast.warning('Please Select RSK');
            return false;
        }

        if (
            this.promotorDetails.villageId === '' ||
            this.promotorDetails.villageId === null ||
            this.promotorDetails.villageId === undefined
        ) {
            this.toast.warning('Please Select Village');
            return false;
        }

        if (
            this.aadharNo === '' ||
            this.aadharNo === null ||
            this.aadharNo === undefined
        ) {
            this.toast.warning('Please Enter Aadhar No');
            return false;
        }
        if (!this.utils.validateVerhoeff(this.aadharNo)) {
            this.toast.warning('Please Enter Valid Aadhaar Number');
            return;
        }


        if (
            this.promotorDetails.pinCode === '' ||
            this.promotorDetails.pinCode === null ||
            this.promotorDetails.pinCode === undefined
        ) {
            this.toast.warning('Please Enter Pincode');
            return false;
        }

        if (!this.utils.pinCodeCheck(this.promotorDetails.pinCode)) {
            this.toast.warning('Please Enter Valid Pincode');
            return false;
        }

        if (
            this.promotorDetails.promoterName === '' ||
            this.promotorDetails.promoterName === null ||
            this.promotorDetails.promoterName === undefined
        ) {
            this.toast.warning('Please Enter Promoter Name');
            return false;
        }

        if (
            this.promotorDetails.dob === '' ||
            this.promotorDetails.dob === null ||
            this.promotorDetails.dob === undefined || this.promotorDetails.dob === 'Invalid date'
        ) {
            this.toast.warning('Please Select Date Of Birth');
            return false;
        }

        if (
            this.promotorDetails.fatherSpouseAadhar === '' ||
            this.promotorDetails.fatherSpouseAadhar === null ||
            this.promotorDetails.fatherSpouseAadhar === undefined
        ) {
            this.toast.warning('Please Enter Father/Spouse Aadhar');
            return false;
        }

        if (!this.utils.validateVerhoeff(this.promotorDetails.fatherSpouseAadhar)) {
            this.toast.warning('Please Enter Valid Father/Spouse AADHAAR Number');
            return false;
        }

        if (
            this.promotorDetails.mobileNo === '' ||
            this.promotorDetails.mobileNo === null ||
            this.promotorDetails.mobileNo === undefined
        ) {
            this.toast.warning('Please Enter Mobile Number');
            return false;
        }

        if (!this.utils.mobileNumCheck(this.promotorDetails.mobileNo)) {
            this.toast.warning('Please Enter Valid Mobile Number');
            return false;
        }

        if (
            this.promotorDetails.fatherSpouseMobileNo === '' ||
            this.promotorDetails.fatherSpouseMobileNo === null ||
            this.promotorDetails.fatherSpouseMobileNo === undefined
        ) {
            this.toast.warning('Please Enter Father/Spouse Mobile Number');
            return false;
        }

        if (!this.utils.mobileNumCheck(this.promotorDetails.fatherSpouseMobileNo)) {
            this.toast.warning('Please Enter Valid Mobile Number');
            return false;
        }

        if (
            this.promotorDetails.educationQualification === '' ||
            this.promotorDetails.educationQualification === null ||
            this.promotorDetails.educationQualification === undefined
        ) {
            this.toast.warning('Please Enter Education Qualification');
            return false;
        }

        if (
            this.promotorDetails.bankAccountNo === '' ||
            this.promotorDetails.bankAccountNo === null ||
            this.promotorDetails.bankAccountNo === undefined
        ) {
            this.toast.warning('Please Enter Bank Account No');
            return false;
        }

        if (this.promotorDetails.bankAccountNo.length === this.bankAccLength) {
            this.toast.warning('Bank Account No Is Not Valid');
            return false;
        }

        if (
            this.promotorDetails.ifscCode === '' ||
            this.promotorDetails.ifscCode === null ||
            this.promotorDetails.ifscCode === undefined
        ) {
            this.toast.warning('Please Enter Bank IFSC Code');
            return false;
        }

        if (
            this.promotorDetails.bankName === '' ||
            this.promotorDetails.bankName === null ||
            this.promotorDetails.bankName === undefined
        ) {
            this.toast.warning('Please Enter Valid IFSC Code');
            return false;
        }
        if (
            this.promotorDetails.branch === '' ||
            this.promotorDetails.branch === null ||
            this.promotorDetails.branch === undefined
        ) {
            this.toast.warning('Please Enter Valid IFSC Code');
            return false;
        }
        if (
            this.promotorDetails.doorNo === '' ||
            this.promotorDetails.doorNo === null ||
            this.promotorDetails.doorNo === undefined
        ) {
            this.toast.warning('Please Enter Door No');
            return false;
        }
        if (
            this.promotorDetails.street === '' ||
            this.promotorDetails.street === null ||
            this.promotorDetails.street === undefined
        ) {
            this.toast.warning('Please Enter Street Name');
            return false;
        }

        return true;
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
    aadharNomaskIputData(value) {

        if (value.length > 0) {
            // if (this.promotorDetails.aadharNo.length > value.length) {
            //   this.promotorDetails.aadharNo = this.promotorDetails.aadharNo.substring(0, value.length);
            // } 
            // else {
            //   this.promotorDetails.aadharNo += String(value).slice(-1);        
            //   const valueSplit = value.split('');
            //   let maskedValue = '';
            //   valueSplit.forEach((element, index) => {
            //     if (index < 8) {
            //       maskedValue += "X";
            //     } else {
            //       maskedValue += element;
            //     }

            //   });
            //   this.aadharNo = maskedValue;
            // }

            if (value.length >= 12) {
                this.promotorDetails.aadharNo = value;
                const response = this.utils.validateVerhoeff(this.promotorDetails.aadharNo);
                if (response == true) {
                    this.spinner.hide();
                } else {
                    this.aadharNo = ''.trim();
                    alert("Invalid Aadhar Number...!");
                    this.spinner.hide();

                }
                return
            }

        }

        return;

    }
    aadharNomaskIputData1(value) {

        if (value.length > 0) {
            // if (this.promotorDetails.aadharNo.length > value.length) {
            //   this.promotorDetails.aadharNo = this.promotorDetails.aadharNo.substring(0, value.length);
            // } 
            // else {
            //   this.promotorDetails.aadharNo += String(value).slice(-1);        
            //   const valueSplit = value.split('');
            //   let maskedValue = '';
            //   valueSplit.forEach((element, index) => {
            //     if (index < 8) {
            //       maskedValue += "X";
            //     } else {
            //       maskedValue += element;
            //     }

            //   });
            //   this.aadharNo = maskedValue;
            // }

            if (value.length >= 12) {
                this.promotorDetails.fatherSpouseAadhar = value;
                const response = this.utils.validateVerhoeff(this.promotorDetails.fatherSpouseAadhar);
                if (response == true) {
                    this.spinner.hide();
                } else {
                    this.fatherSpouseAadhar = ''.trim();
                    this.promotorDetails.fatherSpouseAadhar = '';
                    //  document.getElementById('fatherSpouseAadhar').style.display='';
                    alert("Invalid Aadhar Number...!");
                    this.spinner.hide();
                }
                return
            }

        }

        return;

    }
}
