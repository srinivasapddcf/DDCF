import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { MdssService } from '../../services/mdss.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import * as moment from 'moment';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { promise } from 'protractor';

@Component({
    selector: 'app-new-applicationfrom-eligiblemembers',
    templateUrl: './new-applicationfrom-eligiblemembers.component.html',
    styleUrls: ['./new-applicationfrom-eligiblemembers.component.css']
})
export class NewApplicationfromEligiblemembersComponent implements OnInit {


    bsDatepickerConfig: Partial<BsDatepickerConfig> = this.session.getbsdatepicker();
    promotorDetailsdob: any;
    NomineepromotorDetailsdob: any;
    constructor(
        private spinner: NgxSpinnerService,
        private toast: ToasterService,
        private attendanceAPI: MdssService,
        private utils: UtilsService,
        private logger: LoggerService,
        private session: SessionService,
        private router: Router,
        private promotersAPI: MdssService,

    ) { }

    @ViewChildren(DataTableDirective)
    dtElements!: QueryList<DataTableDirective>;

    dtOptions: DataTables.Settings = this.utils.dataTableOptions();
    dtTrigger1: Subject<any> = new Subject();
    dtTrigger2: Subject<any> = new Subject();

    minDate: Date;
    maxDate: Date;
    rbkList = [];
    photoimagearry: any[] = [];
    submitlist: any[] = [];
    photoimage: any;

    idProofPath: any;
    imagePath: any;
    ShearecountImage: any;
    MemberRelation: any[] = [];
    submittedFarmersList = [];

    showPromotorsPopup = true;
    ngOnInit(): void {
        this.promotorDetailsdob = "";
        this.NomineepromotorDetailsdob = ''
        this.loadRBKList();
        this.MEMBERRELATION();
    }
    eligiblemenbersData = {
        districtId: '',
        mandalId: '',
        rbkId: '',
        meetingId: '',
        insertedBy: '',
        source: '',
        farmerAttendance: [],
        mdssName: ''
    };
    promoterData = {
        farmerId: '',
        promoterName: '',
        fatherOrHusbandName: '',
        aadharNo: '',
        mobileNo: '',
        dob: '',
        caste: '',
        address: '',
        chiefPromoter: '',
        adhockDesignation: '',
        imagePath: '',
        signaturePath: '',
        relation: '',
        dobAvailable: false,
        occupation: '',
        sharesCount: '',
        sharesAmount: 0,
        entryFee: 0,
        sNo: 0,
        idProofPath: '',
        ShearecountImage: '',
        mdsscode: '',
        rbkcode: '',
        uid: '',
        Name: '',
        NomineeDOB: '',
        NomineeRelation: '',
        NomineefatherOrHusbandName: '',
        Nomineeoccupation: '',
        Nomineeaddress: '',
        Gender: '',
        NomineeMemberRelation: '',
        NomineeCommunity: ''



    };
    promotorDetailsReq = {
        districtId: '',
        mandalId: '',
        rbkId: '',
        villageId: '',
        mdssName: '',
        insertedBy: '',
        source: '',
        promotors: [],
    };
    submittedPromotersList = [];
    farmerList = [];
    async loadRBKList(): Promise<void> {
        try {
            const req = {
                route_id: this.session.rbkGroupId,
            };
            this.spinner.show();
            const response = await this.attendanceAPI.ApplicationEligibalRBKs_List(req);

            if (response.success) {
                this.rbkList = response.result;

                // this.mdsscod

            } else {
                this.toast.info(response.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }
    async MEMBERRELATION(): Promise<void> {
        try {
            const req = {

            };
            this.spinner.show();
            const response = await this.attendanceAPI.Member_Relation_List(req);

            if (response.success) {
                this.MemberRelation = response.result;
                //console.log(this.MemberRelation);

                // this.mdsscod

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
            //this.promotorDetailsReq.mdssName = '';
            this.farmerList = [];
            this.clearAddPromotorForm();
            this.submittedPromotersList = [];
            const req = {
                rbk: this.eligiblemenbersData.rbkId,
            };
            this.spinner.show();
            const response = await this.attendanceAPI.EligibalFarmers_List(req);
            debugger;
            this.spinner.hide();
            if (response.success) {
                this.farmerList = response.result;

            }
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < this.rbkList.length; i++) {
                if (this.eligiblemenbersData.rbkId === this.rbkList[i].RBK_ID) {
                    this.eligiblemenbersData.mdssName =
                        this.rbkList[i].RBK_NAME
                    //+ ' MAHILA DAIRY SAHAKARA SANGAM';
                }
            }
            // this.loadFarmersList();

            // this.rerender();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }


    onSharesChange(): void {

        if (this.utils.isEmpty(this.promoterData.sharesCount)) {
            this.toast.warning('Please Enter Shares Count');
            return;
        }
        if (Number(this.promoterData.sharesCount) > 50) {
            this.toast.warning('Please enter share count below and equal to 50');
            this.promoterData.sharesCount = '';
            return;
        }

        // if (Number(this.promoterData.sharesCount) > 10000) {
        //     this.toast.warning('Please enter share count below and equal to 10000');
        //     this.promoterData.sharesCount = '';
        //     return;
        // }

        if (Number(this.promoterData.sharesCount) < 1) {
            this.toast.warning('Minimum share count is 1');
            return;
        }

        const result = Number(this.promoterData.sharesCount) * 10;
        this.promoterData.sharesAmount = result;

        if (Number(this.promoterData.sharesCount) < 50) {
            this.promoterData.entryFee = Number(this.promoterData.sharesCount);
        }

        if (Number(this.promoterData.sharesCount) >= 50) {
            this.promoterData.entryFee = 50;
        }
    }

    // async onPromoterImageChange(event): Promise<void> {
    //     try {


    //         this.promoterData.imagePath = '';
    //         const element = event.currentTarget as HTMLInputElement;
    //         let fileList: FileList | null = element.files;

    //         if (element.files[0].name.split('.').length.toString() !== '2') {
    //             this.toast.warning('Please Upload file name format');

    //             event.target.value = '';
    //             return;
    //         } else {

    //             const res = await this.utils.encodedString(
    //                 event,
    //                 this.utils.fileType.IMAGE,
    //                 this.utils.fileSize.hundredKB
    //             );
    //             if (res) {
    //                 this.promoterData.imagePath = res.split('base64,')[1];

    //                 this.photoimage = res.replace('data:image/jpeg;base64,', '');

    //                 // this.photoimagearry.push({
    //                 //   IMAGE: this.photoimage,
    //                 // });


    //             }
    //         }



    //     } catch (error) {
    //         this.toast.warning('Please Select Photo Image');

    //     }


    //     // this.utils .encodedString(
    //     //     event,
    //     //     this.utils.fileType.IMAGE,
    //     //     this.utils.fileSize.hundredKB
    //     //   )
    //     //   .then((res: any) => {
    //     //     this.promoterData.imagePath = res.replace('data:image/jpeg;base64,', '' );
    //     //   })

    //     // .catch((error: any) => {
    //     //   this.utils.catchResponse(error);
    //     // });
    // }

    onPromoterImageChange(event): void {
        const element = event.currentTarget as HTMLInputElement;
        let fileList: FileList | null = element.files;
        if (fileList.length === 0) {
            this.toast.warning('Please Upload jpg files only');
            event.target.value = '';
            this.imagePath = '';
        }
        else {
            this.utils
                .encodedString(
                    event,
                    this.utils.fileType.IMAGE,
                    this.utils.fileSize.hundredKB
                )
                .then((res: any) => {
                    this.promoterData.imagePath = res.replace(
                        'data:image/jpeg;base64,',
                        ''
                    );

                    //this.idimage = res.replace('data:image/jpeg;base64,', '');

                })
                .catch((error: any) => {
                    this.utils.catchResponse(error);
                });
        }
    }




    clearAddPromotorForm(): void {
        this.promotorDetailsdob = '';
        this.NomineepromotorDetailsdob = ''
        this.promoterData = {
            farmerId: '',
            promoterName: '',
            aadharNo: '',
            mobileNo: '',
            dob: '',
            fatherOrHusbandName: '',
            caste: '',
            address: '',
            chiefPromoter: '',
            adhockDesignation: '',
            imagePath: '',
            signaturePath: '',
            relation: '',
            dobAvailable: false,
            occupation: '',
            sharesCount: '',
            sharesAmount: 0,
            entryFee: 0,
            sNo: 0,
            idProofPath: '',
            ShearecountImage: '',
            mdsscode: '',
            rbkcode: '',
            uid: '',
            Name: '',
            NomineeDOB: '',
            NomineeRelation: '',
            NomineefatherOrHusbandName: '',
            Nomineeoccupation: '',
            Nomineeaddress: '',
            Gender: '',
            NomineeMemberRelation: '',
            NomineeCommunity: ''

        };
        this.ShearecountImage = ''
        this.imagePath = ''
        this.idProofPath = ''


        // this.idimage='';
        // this.photoimage='';
        // if (this.promoterImgUpload) {
        //   if (this.promoterImgUpload.nativeElement) {
        //     if (this.promoterImgUpload.nativeElement.value) {
        //       this.promoterImgUpload.nativeElement.value = '';
        //     }
        //   }
        // }
        // if (this.signatureImgUpload) {
        //   if (this.signatureImgUpload.nativeElement) {
        //     if (this.signatureImgUpload.nativeElement.value) {
        //       this.signatureImgUpload.nativeElement.value = '';
        //     }
        //   }
        // }
        // if (this.idProofImgUpload) {
        //   if (this.idProofImgUpload.nativeElement) {
        //     if (this.idProofImgUpload.nativeElement.value) {
        //       this.idProofImgUpload.nativeElement.value = '';
        //     }
        //   }
        // }
    }

    onSignatureImageChange(event): void {
        this.utils
            .encodedString(
                event,
                this.utils.fileType.IMAGE,
                this.utils.fileSize.hundredKB
            )
            .then((res: any) => {
                this.promoterData.signaturePath = res.replace(
                    'data:image/jpeg;base64,',
                    ''
                );
            })
            .catch((error: any) => {
                this.utils.catchResponse(error);
            });
    }

    //idimage: any;
    onIdProofChange(event): void {
        const element = event.currentTarget as HTMLInputElement;
        let fileList: FileList | null = element.files;
        if (fileList.length === 0) {
            this.toast.warning('Please Upload jpg files only');
            event.target.value = '';
            this.idProofPath = '';
        }
        else {
            this.utils
                .encodedString(
                    event,
                    this.utils.fileType.IMAGE,
                    this.utils.fileSize.hundredKB
                )
                .then((res: any) => {
                    this.promoterData.idProofPath = res.replace(
                        'data:image/jpeg;base64,',
                        ''
                    );

                    //this.idimage = res.replace('data:image/jpeg;base64,', '');

                })
                .catch((error: any) => {
                    this.utils.catchResponse(error);
                });
        }
    }

    onSharesphotoChange(event): void {
        const element = event.currentTarget as HTMLInputElement;
        let fileList: FileList | null = element.files;
        if (fileList.length === 0) {
            this.toast.warning('Please Upload jpg files only');
            event.target.value = '';
            this.ShearecountImage = '';
        }
        else {
            this.utils
                .encodedString(
                    event,
                    this.utils.fileType.IMAGE,
                    this.utils.fileSize.hundredKB
                )
                .then((res: any) => {
                    this.promoterData.ShearecountImage = res.replace(
                        'data:image/jpeg;base64,',
                        ''
                    );

                    //this.idimage = res.replace('data:image/jpeg;base64,', '');

                })
                .catch((error: any) => {
                    this.utils.catchResponse(error);
                });
        }
    }

    async btnAddPromoter(): Promise<void> {
        try {

            if (this.utils.isEmpty(this.eligiblemenbersData.rbkId)) {
                this.toast.warning('Please Select Rsk Name');
                return;
            }
            if (this.utils.isEmpty(this.promoterData.farmerId)) {
                this.toast.warning('Please Select Farmer Name');
                return;
            }



            // if (this.utils.isEmpty(this.promoterData.fatherOrHusbandName)) {
            //   this.toast.warning('Please Enter Father / Husband / Mother Name');
            //   return;
            // }

            // if (this.utils.isEmpty(this.promoterData.farmerId)) {
            //   this.toast.warning('Please Select Farmer');
            //   return;
            // }

            // if (this.utils.isEmpty(this.promoterData.aadharNo)) {
            //   this.toast.warning('Please Select Farmer');
            //   return;
            // }



            // if (this.utils.isEmpty(this.promoterData.mobileNo)) {
            //   this.toast.warning('Please Enter Mobile Number');
            //   return;
            // }
            if (this.utils.isEmpty(this.promotorDetailsdob)) {
                this.toast.warning('Please Select Date Of Birth');
                return;
            }
            if (this.utils.validdate(this.promotorDetailsdob)) {
                this.toast.warning('Eligibility 18 years ONLY');
                this.promotorDetailsdob = '';
                return;
            }

            if (this.utils.isEmpty(this.promoterData.relation)) {
                this.toast.warning('Please Select Relationship');
                return;
            }
            if (this.utils.isEmpty(this.promoterData.fatherOrHusbandName)) {
                this.toast.warning('Please Enter Father/Husband Name');
                return;
            }

            if (this.utils.isEmpty(this.promoterData.address)) {
                this.toast.warning('Please Enter Address');
                return;
            }

            if (this.utils.isEmpty(this.promoterData.caste)) {
                this.toast.warning('Please Select Community');
                return;
            }

            if (this.utils.isEmpty(this.promoterData.occupation)) {
                this.toast.warning('Please Enter Occupation');
                return;
            }

            if (this.utils.isEmpty(this.promoterData.sharesCount)) {
                this.toast.warning('Please Enter Shares Count');
                return;
            }

            if (this.utils.isEmpty(this.promoterData.entryFee)) {
                this.toast.warning('Please Enter Entry Fee');
                return;
            }

            if (this.promoterData.entryFee < 1) {
                this.toast.warning('Entry Fee should be minimun Rs.1/-');
                return;
            }

            if (+this.promoterData.entryFee > 50) {
                this.toast.warning('Entry Fee should be maximun Rs.50/-');
                return;
            }

            if (this.utils.isEmpty(this.imagePath)) {
                this.toast.warning('Please Upload Promoter Photo');
                return;
            }
            if (this.utils.isEmpty(this.idProofPath)) {
                this.toast.warning('Please Upload ID Proof');
                return;
            }
            if (this.utils.isEmpty(this.ShearecountImage)) {
                this.toast.warning('Please Upload Share Count Image');
                return;
            }
            if (this.utils.isEmpty(this.promoterData.NomineeMemberRelation)) {
                this.toast.warning('Please Select Nominee Member Relation');
                return;
            }
            if (this.utils.isEmpty(this.promoterData.Name)) {
                this.toast.warning('Please Enter Name');
                return;
            }
            if (this.utils.isEmpty(this.NomineepromotorDetailsdob)) {
                this.toast.warning('Please Select Nominee Date Of Birth');
                return;
            }
            // if (this.utils.validdate(this.NomineepromotorDetailsdob)) {
            //     this.toast.warning('Eligibility 18 years ONLY');
            //     this.NomineepromotorDetailsdob = '';
            //     return;
            // }
            if (this.utils.isEmpty(this.promoterData.Gender)) {
                this.toast.warning('Please Select  Gender');
                return;
            }
            if (this.utils.isEmpty(this.promoterData.NomineeRelation)) {
                this.toast.warning('Please Select Nominee Realation');
                return;
            }
            if (this.utils.isEmpty(this.promoterData.NomineefatherOrHusbandName)) {
                this.toast.warning('Please Enter Nominee Father/Husband Name');
                return;
            }
            if (this.utils.isEmpty(this.promoterData.NomineeCommunity)) {
                this.toast.warning('Please Select Nominee Community');
                return;
            }
            if (this.utils.isEmpty(this.promoterData.Nomineeoccupation)) {
                this.toast.warning('Please Enter Nominee Occupation');
                return;
            }
            if (this.utils.isEmpty(this.promoterData.Nomineeaddress)) {
                this.toast.warning('Please Enter Nominee Address');
                return;
            }

            let obj = this.farmerList.find(data => data.FARMER_CODE == this.promoterData.farmerId);

            this.promoterData.promoterName = obj.FARMER_NAME;
            this.promoterData.mdsscode = obj.MDSS_CODE;
            this.promoterData.uid = obj.UID_NUM;
            debugger;
            this.promoterData.dob = moment(this.promotorDetailsdob, 'DD-MM-YYYY').format('DD-MM-YYYY');
            this.promoterData.NomineeDOB = moment(this.NomineepromotorDetailsdob, 'DD-MM-YYYY').format('DD-MM-YYYY');
            const addedPromoter: any[] = this.promotorDetailsReq.promotors.filter(
                (obj) => obj.farmerId === this.promoterData.farmerId
            );
            if (addedPromoter.length > 0) {
                this.toast.warning('Selected farmer already added as a promoter');
                return;
            }

            //this.farmerList = this.farmerList.filter((item, index) => item.FARMER_CODE !== this.promoterData.farmerId);

            // if (this.promoterData.farmerId && !this.submittedFarmersList..includes(this.promoterData.farmerId)) {
            //     this.selectedValues.push(this.promoterData.farmerId);
            //   }

            this.submittedFarmersList.push({
                NAME: this.promoterData.promoterName,
                farmer_code: this.promoterData.farmerId,
                relation_name: this.promoterData.fatherOrHusbandName,
                dob: this.promoterData.dob,
                community: this.promoterData.caste,
                address: this.promoterData.address,
                relation: this.promoterData.relation,
                occupation: this.promoterData.occupation,
                shares_count: this.promoterData.sharesCount,
                shares_amount: this.promoterData.sharesAmount,
                entrance_fee: this.promoterData.entryFee,
                photo: this.promoterData.imagePath,
                id_proof: this.promoterData.idProofPath,
                shares_count_image: this.promoterData.ShearecountImage,
                mdss_code: this.promoterData.mdsscode,
                rbk_code: this.eligiblemenbersData.rbkId,
                rbkName: this.eligiblemenbersData.mdssName,
                uid_num: this.promoterData.uid,
                inserted_by: this.session.userName,
                input_01: this.promoterData.mobileNo,
                input_02: this.session.uniqueId,
                MemberRelation: this.promoterData.NomineeMemberRelation,
                NomineeName: this.promoterData.Name,
                Nomineedob: this.promoterData.NomineeDOB,
                NomineeGender: this.promoterData.Gender,
                NomineeRelation: this.promoterData.NomineeRelation,
                NomineeAddress: this.promoterData.Nomineeaddress,
                NomineeFatherHusbandMother: this.promoterData.NomineefatherOrHusbandName,
                NomineeCommunity: this.promoterData.NomineeCommunity,
                NomineeOccupation: this.promoterData.Nomineeoccupation
            });
            console.log(this.submittedFarmersList);
            //this.promotorDetailsReq.promotors.push(this.promoterData);
            this.farmerList = this.promotorDetailsReq.promotors.map((v) => ({
                ...v,
                isAssigned: false,
            }));
            this.eligiblemenbersData.rbkId = ''

            this.clearAddPromotorForm();

            //this.rerender();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    selectedImagePath: any;
    Photoshow(imagePath: any): void {
        debugger;
        this.selectedImagePath = 'data:image/jpeg;base64,' + imagePath;
    }


    // IdPhotoshow(imagePath: any): void {
    //     debugger;
    //     this.selectedImagePath = 'data:image/jpeg;base64,' + imagePath;
    // }

    closePopup(): void {
        this.selectedImagePath = null;
    }

    DeleteApplication(id: number) {

        this.submittedFarmersList = this.submittedFarmersList.filter((v, i) => i !== id);
    }



    async btnSubmit(): Promise<void> {
        try {
            debugger;

            const req = {
                applicantlist: this.submittedFarmersList
            }
            this.spinner.show();
            const response = await this.attendanceAPI.ApplicationfromEligiblemembersadd(req);
            if (response.success) {
                this.submitlist = response.result;
                this.toast.infoNavigate(response.message);
            } else {
                this.toast.info(response.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger1.unsubscribe();
        this.dtTrigger2.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.dtTrigger1.next();
        this.dtTrigger2.next();
    }

    rerender(): void {
        this.dtElements.forEach((dtElement: DataTableDirective) => {
            if (dtElement.dtInstance) {
                dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                    dtInstance.destroy();
                });
            }
        });
        this.dtTrigger1.next();
        this.dtTrigger2.next();
    }

}