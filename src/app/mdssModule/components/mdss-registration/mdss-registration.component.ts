import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { MdssService } from '../../services/mdss.service';
import * as moment from 'moment';

@Component({
  selector: 'app-mdss-registration',
  templateUrl: './mdss-registration.component.html',
  styleUrls: ['./mdss-registration.component.css'],
})
export class MdssRegistrationComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild('promoterImgUpload') promoterImgUpload: ElementRef;
  @ViewChild('signatureImgUpload') signatureImgUpload: ElementRef;
  @ViewChild('idProofImgUpload') idProofImgUpload: ElementRef;

  bsDatepickerConfig: Partial<BsDatepickerConfig> = this.session.getbsdatepicker();

  dbmaxdate= new Date();
  // dbmindate= new Date(18);

  minDate: Date;
  maxDate: Date;
  
  promotorDetailsdob:any;
  photoimage:'';
  idimage:'';
  rbkList = [];
  farmerList = [];
  promotersTemp = [];
  submittedPromotersList = [];
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
    sharesCount: 0,
    sharesAmount: 0,
    entryFee: 0,
    sNo: 0,
    idProofPath: '',
  };

  showPromotorsPopup = false;

  adHocMemberReq = {
    farmerId: '',
    designation: '',
    isCompleted: false,
  };

  designationList = [
    {
      NAME: 'PRESIDENT',
      isAssigned: false,
    },
    {
      NAME: 'MEMBER-1',
      isAssigned: false,
    },
    {
      NAME: 'MEMBER-2',
      isAssigned: false,
    },
    {
      NAME: 'MEMBER-3',
      isAssigned: false,
    },
    {
      NAME: 'MEMBER-4',
      isAssigned: false,
    },
  ];

  chiefPromoterId = '';
  photo = '';
  siganture = '';
  idProof = '';

  @ViewChildren(DataTableDirective)
  dtElements!: QueryList<DataTableDirective>;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger1: Subject<any> = new Subject();
  dtTrigger2: Subject<any> = new Subject();

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private promotersAPI: MdssService,
    private utils: UtilsService,
    private logger: LoggerService,
    private session: SessionService,
    private sanitizer: DomSanitizer
  ) {
    this.minDate = this.session.getDOBMinDate();
    this.maxDate = this.session.getLegalAgeMaxDate();
  }

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ''){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    this.promotorDetailsReq.districtId = this.session.districtId;
    this.promotorDetailsReq.mandalId = this.session.mandalId;
    this.promotorDetailsReq.insertedBy = this.session.userName;
    this.promotorDetailsReq.source = 'web';
    this.loadRBKList();
   // this.promotorDetailsdob=new Date();
    this.promotorDetailsdob="";
    
  }

  async loadRBKList(): Promise<void> {
    try {
      const req = {
        rbkId: this.session.rbkGroupId,status:'0'
      };
      this.spinner.show();
      const response = await this.promotersAPI.promotersDetailsByRbkId(req);
     // const response = await this.promotersAPI.rbkListByMentorId(req);
      this.spinner.hide();
      if (response.success) {
        this.rbkList = response.result;
        
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  btnImageCancel(): void {
    $("#idProof").val('');
    this.idimage='';
  }

  btnphotoCancel():void{
    $('#imagePath').val('');
    this.photoimage='';
  }

  async onRbkChange(): Promise<void> {
    try {
      this.promotorDetailsReq.mdssName = '';
      this.farmerList = [];
      this.clearAddPromotorForm();
      this.submittedPromotersList = [];
      const req = {
        rbkId: this.promotorDetailsReq.rbkId,
      };
      this.spinner.show();
      const response = await this.promotersAPI.promotersDetailsByRbkId(req);
      this.spinner.hide();
      if (response.success) {
        this.submittedPromotersList = response.result;
       
      }
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.rbkList.length; i++) {
        if (this.promotorDetailsReq.rbkId === this.rbkList[i].RBK_ID) {
          this.promotorDetailsReq.mdssName =
            this.rbkList[i].RBK_NAME + ' MAHILA DAIRY SAHAKARA SANGAM';
        }
      }
      this.loadFarmersList();

      this.rerender();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async getBaseFile(path): Promise<string> {
    try {
      if (!this.utils.isEmpty(path)) {
        this.spinner.show();
        const response = await this.utils.MDSSFileDownload(path);
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

  btnImage(image): void {
    if (!this.utils.isEmpty(image)) {
      this.utils.viewImage(image);
    } else {
      this.toast.warning('Image is Not Available');
    }
  }

  btnshowPromotorsPopup(): void {
    if (this.utils.isEmpty(this.promotorDetailsReq.rbkId)) {
      this.toast.warning('Please Select RSK');
      return;
    }
    if (this.utils.isEmpty(this.promotorDetailsReq.mdssName)) {
      this.toast.warning('Please Enter MDSS Name');
      return;
    }
    this.clearAddPromotorForm();
   
    this.showPromotorsPopup = true;
  }

   mainformerlist=[];
  async loadFarmersList(): Promise<void> {
    try {
      this.farmerList = [];
      this.mainformerlist=[];
      const req = {
        rbkId: this.promotorDetailsReq.rbkId,
        mentorId: this.session.rbkGroupId,
      };
      this.spinner.show();
      const response = await this.promotersAPI.farmerListByRbkId(req);
      this.spinner.hide();
      if (response.success) {
        this.farmerList = response.result;
        this.mainformerlist=response.result;

        
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  onFarmerChange(): void {
    console.log(this.farmerList);
    
    this.promoterData.aadharNo = '';
    this.promoterData.mobileNo = '';

    this.promoterData.dob = '';
    this.promoterData.dobAvailable = false;
    this.promoterData.fatherOrHusbandName = '';
    this.promoterData.caste = '';
    this.promoterData.address = '';
    this.promoterData.chiefPromoter = '';
    this.promoterData.adhockDesignation = '';
    this.promoterData.imagePath = '';
    this.promoterData.signaturePath = '';
    this.promoterData.relation = '';
    this.promoterImgUpload.nativeElement.value = '';
    this.signatureImgUpload.nativeElement.value = '';

    const addedPromoter: any[] = this.promotorDetailsReq.promotors.filter(
      (obj) => obj.farmerId === this.promoterData.farmerId
    );
    //this.farmerList=this.farmerList.filter(obj=>obj.FARMER_CODE!=addedPromoter.length);

    // const addedPromoter: any[] = this.promotorDetailsReq.promotors.filter(
    //   (obj) => obj.farmerId === this.promoterData.farmerId
    // );
    if (addedPromoter.length > 0) {
      this.toast.warning('Selected farmer already added as a promoter');
      this.promoterData.farmerId = '';
      return;
    }
    // if (this.promotorDetailsReq.promotors.length ===11 ) {   //=== 11
    //   alert('11 Farmer Only Added At A Time !!!!');
    //   this.showPromotorsPopup = false;
    //   return;
    // }

    const promoter: any = this.farmerList.filter(
      (obj) => obj.FARMER_CODE === this.promoterData.farmerId
    );
    if (promoter.length > 0) {
      this.promoterData.promoterName = promoter[0].NAME || '';
      this.promoterData.aadharNo = promoter[0].UID_NUM || '';
      this.promoterData.mobileNo = promoter[0].MOBILE_NO || '';

      if (!this.utils.isEmpty(promoter[0].DOB_DT)) {
        this.promoterData.dobAvailable = true;
        this.promoterData.dob = promoter[0].DOB_DT;
      }
    }
  }

  onSharesChange(): void {
    if (this.utils.isEmpty(this.promoterData.sharesCount)) {
      this.toast.warning('Please Enter Shares Count');
      return;
    }

    if (this.promoterData.sharesCount > 2000) {
      this.toast.warning('Please enter share count below and equal to 2000');
      return;
    }

    if (this.promoterData.sharesCount < 1) {
      this.toast.warning('Minimum share count is 1');
      return;
    }

    const result = this.promoterData.sharesCount * 10;
    this.promoterData.sharesAmount = result;

    if (this.promoterData.sharesCount < 50) {
      this.promoterData.entryFee = this.promoterData.sharesCount;
    }

    if (this.promoterData.sharesCount >= 50) {
      this.promoterData.entryFee = 50;
    }
  }

  async btnAddPromoter(): Promise<void> {
    try {

      
      if (this.utils.isEmpty(this.promoterData.promoterName)) {
        this.toast.warning('Please Select Farmer Name');
        return;
      }

      if (this.utils.isEmpty(this.promoterData.farmerId)) {
        this.toast.warning('Please Select Farmer');
        return;
      }

      if (this.utils.isEmpty(this.promoterData.aadharNo)) {
        this.toast.warning('Please Select Farmer');
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

      if (this.utils.isEmpty(this.promoterData.mobileNo)) {
        this.toast.warning('Please Enter Mobile Number');
        return;
      }

      if (this.utils.isEmpty(this.promotorDetailsdob)) {
        this.toast.warning('Please Select Date Of Birth');
        return;
      }
      if (
        this.promotorDetailsdob === '' ||
        this.promotorDetailsdob === null ||
        this.promotorDetailsdob === undefined || this.promotorDetailsdob === 'Invalid date'
      ) {
        this.toast.warning('Please Select Date Of Birth');
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

      if (this.utils.isEmpty(this.promoterData.address)) {
        this.toast.warning('Please Enter Address');
        return;
      }

      if (this.utils.isEmpty(this.promoterData.imagePath)) {
        this.toast.warning('Please Upload Promoter Photo');
        return;
      }

      // if (this.utils.isEmpty(this.promoterData.signaturePath)) {
      //   this.toast.warning('Please Upload Promoter Signature');
      //   return;
      // }

      if (this.utils.isEmpty(this.promoterData.idProofPath)) {
        this.toast.warning('Please Upload ID Proof');
        return;
      }

      // if (this.promotorDetailsReq.promotors.length >=11) { //=== 11
      //   alert('11 Farmers added already added to create MDSS account');
      //   this.showPromotorsPopup = false;
      //   return;
      // }

      // if (this.promotorDetailsReq.promotors.length > 11) {  //>11
      //   this.toast.warning(
      //     'Only 11 farmers should be added to create MDSS account'
      //   );
      //   return;
      // }
      debugger;
      this.promoterData.dob=moment(this.promotorDetailsdob, 'DD-MM-YYYY').format('DD-MM-YYYY');
      const addedPromoter: any[] = this.promotorDetailsReq.promotors.filter(
        (obj) => obj.farmerId === this.promoterData.farmerId
      );
      if (addedPromoter.length > 0) {
        this.toast.warning('Selected farmer already added as a promoter');
        return;
      }
       this.farmerList = this.farmerList.filter((item, index) => item.FARMER_CODE !== this.promoterData.farmerId);
       
      this.promotorDetailsReq.promotors.push(this.promoterData);
      this.promotersTemp = this.promotorDetailsReq.promotors.map((v) => ({
        ...v,
        isAssigned: false,
      }));
      this.clearAddPromotorForm();
      this.rerender();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnRemovePromoter(index): Promise<void> {
    try {
      if (this.promotorDetailsReq.promotors.length > 0) {
              
        this.farmerList.push(this.mainformerlist.filter((item)=>item.FARMER_CODE==this.promotorDetailsReq.promotors[index].farmerId)[0])
               this.promotorDetailsReq.promotors.splice(index, 1);
        this.rerender();
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  onChiefPromoterChange(): void {
    if (this.utils.isEmpty(this.chiefPromoterId)) {
      alert('Please select chief promoter');
      return;
    }
var id='0';
    for (let i = 0; i < this.promotorDetailsReq.promotors.length; i++) {
      if(this.promotorDetailsReq.promotors[i].chiefPromoter === '1'){
        this.toast.warning("chief promoter already assigned"); id='1';
        return;
      }
    }
if(id==='0')
{
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.promotorDetailsReq.promotors.length; i++) {
      if (
        this.chiefPromoterId === this.promotorDetailsReq.promotors[i].farmerId
      ) {
        this.promotorDetailsReq.promotors[i].chiefPromoter = '1';
        this.promotorDetailsReq.promotors[i].sNo = 1;
        this.promotorDetailsReq.promotors[i].adhockDesignation = 'PRESIDENT';
        this.designationList[0].isAssigned = true;
      }
    }

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.promotersTemp.length; i++) {
      if (this.chiefPromoterId === this.promotersTemp[i].farmerId) {
        this.promotersTemp[i].isAssigned = true;
      }
    }
  }
  }

  onAdHocSubmit(): void {

    for (let i = 0; i < this.promotorDetailsReq.promotors.length; i++) {
      if(this.promotorDetailsReq.promotors[i].chiefPromoter === '1'  && this.chiefPromoterId=== this.promotorDetailsReq.promotors[i].chiefPromoterId    ){
        this.toast.warning("chief promoter already assigned");
        return;
      }
    } 

    if (this.utils.isEmpty(this.adHocMemberReq.farmerId)) {
      this.toast.warning('Select Farmer');
      return;
    }
    if (this.utils.isEmpty(this.adHocMemberReq.designation)) {
      this.toast.warning('Select Designation');
      return;
    }

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.designationList.length; i++) {
      if (this.adHocMemberReq.designation === this.designationList[i].NAME) {
        this.designationList[i].isAssigned = true;
      }
    }

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.promotersTemp.length; i++) {
      if (this.adHocMemberReq.farmerId === this.promotersTemp[i].farmerId) {
        this.promotersTemp[i].isAssigned = true;
      }
    }

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.promotorDetailsReq.promotors.length; i++) {
      if (
        this.adHocMemberReq.farmerId ===
        this.promotorDetailsReq.promotors[i].farmerId
      ) {
        this.promotorDetailsReq.promotors[i].adhockDesignation =
          this.adHocMemberReq.designation;

        if (this.adHocMemberReq.designation === 'MEMBER-1') {
          this.promotorDetailsReq.promotors[i].sNo = 2;
        } else if (this.adHocMemberReq.designation === 'MEMBER-2') {
          this.promotorDetailsReq.promotors[i].sNo = 3;
        } else if (this.adHocMemberReq.designation === 'MEMBER-3') {
          this.promotorDetailsReq.promotors[i].sNo = 4;
        } else if (this.adHocMemberReq.designation === 'MEMBER-4') {
          this.promotorDetailsReq.promotors[i].sNo = 5;
        }
      }
    }
    this.adHocMemberReq.designation = '';
    this.adHocMemberReq.farmerId = '';

    let count = 0;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.designationList.length; i++) {
      if (!this.designationList[i].isAssigned) {
        count++;
      }
    }
    if (count > 0) {
      this.adHocMemberReq.isCompleted = true;
    }
  }

  async btnSubmit(): Promise<void> {
    try {
      if (this.utils.isEmpty(this.chiefPromoterId)) {
        alert('Please select chief promoter');
        return;
      }

      let sNoCount = 0;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.promotorDetailsReq.promotors.length; i++) {
        if (this.promotorDetailsReq.promotors[i].sNo !== 0) {
          sNoCount++;
        }
      }

      if (sNoCount < 5) {
        alert('Please add all adhoc committe members');
        return;
      }

      // let sNoCount = 6;
      // // tslint:disable-next-line: prefer-for-of
      // for (let i = 0; i < this.promotorDetailsReq.promotors.length; i++) {
      //   if (this.promotorDetailsReq.promotors[i].sNo === 0) {
      //     this.promotorDetailsReq.promotors[i].chiefPromoter = sNoCount;
      //     sNoCount++;
      //   }
      // }
      debugger;
      this.spinner.show();
      const response = await this.promotersAPI.promotersSub(
        this.promotorDetailsReq
      );
      if (response.success) {
        alert(response.message);
        window.location.reload();
      } else {
        this.spinner.hide();
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  clearAddPromotorForm(): void {
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
      sharesCount: 0,
      sharesAmount: 0,
      entryFee: 0,
      sNo: 0,
      idProofPath: '',
    };
    this.idimage='';
    this.photoimage='';
    if (this.promoterImgUpload) {
      if (this.promoterImgUpload.nativeElement) {
        if (this.promoterImgUpload.nativeElement.value) {
          this.promoterImgUpload.nativeElement.value = '';
        }
      }
    }
    if (this.signatureImgUpload) {
      if (this.signatureImgUpload.nativeElement) {
        if (this.signatureImgUpload.nativeElement.value) {
          this.signatureImgUpload.nativeElement.value = '';
        }
      }
    }
    if (this.idProofImgUpload) {
      if (this.idProofImgUpload.nativeElement) {
        if (this.idProofImgUpload.nativeElement.value) {
          this.idProofImgUpload.nativeElement.value = '';
        }
      }
    }
  }

  async onPromoterImageChange(event):  Promise<void> {
    try{


      this.promoterData.imagePath  ='';
     const element = event.currentTarget as HTMLInputElement;
     let fileList: FileList | null = element.files;
   
   if(element.files[0].name.split('.').length.toString()!=='2')      
   { this.toast.warning('Please Upload file name format');  
 
   event.target.value = '';
 return;
   }else{
 
     const res = await this.utils.encodedString(
       event,
       this.utils.fileType.IMAGE,
       this.utils.fileSize.hundredKB
     );
     if (res) {
      this.promoterData.imagePath  = res.split('base64,')[1]; 

      this.photoimage = res.replace('data:image/jpeg;base64,', '');
      // this.photoimage.push({
      //   IMAGE: photoimage,
      // });

     
     }
   }


    
  } catch (error) {
    this.toast.warning('Please Select Photo Image');
     
  }


    // this.utils .encodedString(
    //     event,
    //     this.utils.fileType.IMAGE,
    //     this.utils.fileSize.hundredKB
    //   )
    //   .then((res: any) => {
    //     this.promoterData.imagePath = res.replace('data:image/jpeg;base64,', '' );
    //   })
     
      // .catch((error: any) => {
      //   this.utils.catchResponse(error);
      // });
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

  onIdProofChange(event): void {
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

        this.idimage = res.replace('data:image/jpeg;base64,', '');

      })
      .catch((error: any) => {
        this.utils.catchResponse(error);
      });
  }

  async btnPhotoView(photo): Promise<void> {
    try {




      const promoterPhoto = (this.sanitizer.bypassSecurityTrustResourceUrl(photo) as any).changingThisBreaksApplicationSecurity;
      this.utils.viewImage(promoterPhoto);



    } catch (error) {
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
