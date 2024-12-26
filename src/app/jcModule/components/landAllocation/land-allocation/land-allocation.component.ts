import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { MastersService } from 'src/app/shared/services/masters.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { JcService } from '../../../services/jc.service';

@Component({
  selector: 'app-land-allocation',
  templateUrl: './land-allocation.component.html',
  styleUrls: ['./land-allocation.component.css'],
})
export class LandAllocationComponent implements OnInit {
  date: any;
  rbkList = [];
  routeList = [];
  villageList = [];
  mandalList = [];
  TXTCENTS='';
  allotmentAlienationUpload='';
  ALIENATION_PDF_JD_SUB='';
id='0';
divmaintable=false;
divalienationtable=false;
divchkcentstxt=false;
divchkcentsbtn=false;
divchkcents=false;
divdownload=true;
//Alibmcu=true;
  LandAllocateData = {
    rbkId: '',
    villageId: '',
    mandalId: '',
    publicPrivateLand: '',
    surveyNo: '',
    area: '',
    northImg: '',
    westImg: '',
    southImg: '',
    eastImg: '',
    allotmentOrderAPDDCF: '',
    insertedBy: '',
    uniqueId: '',
    source: '',
    allotmentStatus: '',
    districtId: '',
    acres: '',
    cents: '',
    latitude: '',
    longtitude: '',
    northBoundary: '',
    southBoundary: '',
    eastBoundary: '',
    westBoundary: '',
    entireLandImg: '',
    giftAndDeedPhotoUpload: '',
    distFromVillageCenter: '',
  };
  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private jcAPI: JcService,
    private utils: UtilsService,
    private logger: LoggerService,
    private session: SessionService,
    private master: MastersService
  ) {}

  



ngOnInit(): void {

  this.divmaintable=true;
  this.divalienationtable=false; 
   if(this.session.uniqueId !="" && this.session.desigId != ''){}
   else   {      this.router.navigate(['/shared/UnAuthorized']);    }
   this.loadMandals();
 }

 async loadMandals(): Promise<void> {
   try {
     const req = {
       districtId: this.session.districtId,
     };
     this.spinner.show();
     const response = await this.jcAPI.mandalListByDistId(req);
     if (response.success) {
       this.mandalList = response.result;
     } else {
       this.toast.info(response.message);
     }
     this.spinner.hide();
   } catch (error) {
     this.spinner.hide();
     this.utils.catchResponse(error);
   }
 }

 onMandalChange(): void {
   this.LandAllocateData.rbkId = '';
   this.LandAllocateData.villageId = '';
   this.rbkList = [];
   if (this.LandAllocateData.mandalId === '') {
     return;
   }
   this.loadRBKList();
 }

 async loadRBKList(): Promise<void> {
   try {
        const req = {
                    districtId: this.session.districtId,
                    mandalId: this.LandAllocateData.mandalId,
                  };
          this.spinner.show();
          const response = await this.jcAPI.rbkListByMandalId(req);
            if (response.success) {this.rbkList = response.result;} 
            else { this.toast.info(response.message);   }
          this.spinner.hide();
   } catch (error) 
   {
     this.spinner.hide();
     this.utils.catchResponse(error);
   }
 }

 onRbkChange(): void {
   this.LandAllocateData.villageId = '';
   this.villageList = [];
   if (this.LandAllocateData.rbkId === '') {  return; }
   this.loadVillageList();
 }

 async loadVillageList(): Promise<void> {
   try {
     const req = {
         districtId: this.session.districtId,
         mandalId: this.LandAllocateData.mandalId,
         rbkId: this.LandAllocateData.rbkId,
         };
     this.spinner.show();
     const response = await this.jcAPI.villageListByRbkId(req);
     if (response.success) { this.villageList = response.result; } 
     else { this.toast.info(response.message);}
     this.spinner.hide();
   } catch (error) {
     this.spinner.hide();
     this.utils.catchResponse(error);
   }
 }

 async onVillageChange(): Promise<void> 
     {
     try {
         if (this.LandAllocateData.villageId === '') { return;}		  
         const req = {
               districtId: this.session.districtId,
               mandalId: this.LandAllocateData.mandalId,
               rbkId: this.LandAllocateData.rbkId,
               villageId: this.LandAllocateData.villageId,
               };
           this.spinner.show(); //type 2 rbk_land_allotment_ins
         const response = await this.jcAPI.landAllocationStatus(req);
           if (response.success) 
               { 
               alert(response.message);
               const requestData = {
                           districtId: this.session.districtId,
                           mandalId: this.LandAllocateData.mandalId,
                           rbkId: this.LandAllocateData.rbkId,
                           villageId: this.LandAllocateData.villageId,
                         };

               const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
               this.router.navigate(['/jcModule/JdbmculandHandover'], {});
               } 
           else
            {        
             if(response.result.length>0)
                {
                    if(response.result[0].STATUS==='3')
                        {
                          this.toast.info(response.message); 
                          this.divmaintable=false;
                          this.divalienationtable=true;
                          this.divchkcents=true;					  
                          const checkbox = document.getElementById('chkcents',) as HTMLInputElement | null;
                          if (checkbox != null) {checkbox.checked=false;} 
                        }
                        else{ 
                   
                          this.divmaintable=true;
                          this.divalienationtable=false;
                          //this.toast.info(response.message);         
                        }
                }
             else{                   
                 this.divmaintable=true;
                 this.divalienationtable=false;
                 this.toast.info(response.message);         
               }
             }
         
         this.spinner.hide();
       }
     catch (error) {
             this.spinner.hide();
             this.utils.catchResponse(error);
             }
     }

 async ondivchkcentsChange(event): Promise<void> 
 {
   try { 
     const checkbox = document.getElementById('chkcents',) as HTMLInputElement | null;      
     if (checkbox != null)
     {
     if (checkbox.checked) {
       this.divchkcentstxt=true;
       this.divchkcentsbtn=true;
       this.divdownload=false;
     }
     else
     {
       this.divchkcentstxt=false;
     this.divchkcentsbtn=false;
     this.divdownload=true;

     }
     } 
       }
 catch (error) 
 {      
     this.utils.catchResponse(error);
   }
 }
 
 
 async btnCENTSupload(event): Promise<void> 
 {
   try {           
     let area = 0;
      if (this.TXTCENTS.length === 1) { area = parseFloat('.00' + this.TXTCENTS); }
     else if (this.TXTCENTS.length === 2) { area = parseFloat('.' + this.TXTCENTS); }
     else {  area = parseFloat( this.TXTCENTS ); }
 
     if (area < 0.05)
   {
       this.toast.warning('Please Enter Atleast 5 Cents');
       return;
     }
 
     if (area > 1) 
   {
       this.toast.warning('Please Enter Maximum 1 Acre Only !!!');
       return;
     }


     const reqs = {
         type:'7',
         districtId: this.session.districtId,
         mandalId: this.LandAllocateData.mandalId,
         rbkId: this.LandAllocateData.rbkId,
         villageId: this.LandAllocateData.villageId,
         area:area,updatedBy: this.session.userName,
         HANDOVER_NAME_JD_SUB: "",
         HANDOVER_MBL_NO_JD_SUB: "",
         HANDOVER_DESIGNATION:"" 
         };
     this.spinner.show();           
       const responsecents = await this.jcAPI.bmcucentsSub( reqs );
     if (responsecents.success) 
     {
     this.divchkcentstxt=false;
     this.divchkcentsbtn=false;
     this.divchkcents=false;
     this.divdownload=true;
     } 
     else {
     this.toast.info(responsecents.message);
     }
     this.spinner.hide();
   } 
   catch (error) {       
     this.utils.catchResponse(error);
   }
 }


 async onAlienationStatementChange(event): Promise<void> 
 {
   try {
     this.ALIENATION_PDF_JD_SUB = '';
     const element = event.currentTarget as HTMLInputElement;
     let fileList: FileList | null = element.files;
   
   if(element.files[0].name.split('.').length.toString()!=='2')      
   { this.toast.warning('Please Upload PDF file name format');  
 
   event.target.value = '';
 return;
   }else{

     const res: any = await this.utils.encodedString(
       event,
       this.utils.fileType.PDF,
       this.utils.fileSize.oneMB
     );
     if (!this.utils.isEmpty(res)) {
      //  this.ALIENATION_PDF_JD_SUB = res.replace('data:application/pdf;base64,','' );
        this.ALIENATION_PDF_JD_SUB =  res.split('base64,')[1];
     }
   }
   } catch (error) {  this.toast.warning('Please select pdf');
     //this.utils.catchResponse(error);
   }
 }
 
 async btndownload(): Promise<void> {
   try {


     if (
       this.LandAllocateData.mandalId === '' ||
       this.LandAllocateData.mandalId === null ||
       this.LandAllocateData.mandalId === undefined
     ) {
       this.toast.warning('Please Select Mandal');
       return ;
     }
 
     if (
       this.LandAllocateData.rbkId === '' ||
       this.LandAllocateData.rbkId === null ||
       this.LandAllocateData.rbkId === undefined
     ) {
       this.toast.warning('Please Select RSK');
       return ;
     }
 
     if (
       this.LandAllocateData.villageId === '' ||
       this.LandAllocateData.villageId === null ||
       this.LandAllocateData.villageId === undefined
     ) {
       this.toast.warning('Please Select Village');
       return ;
     } 
     if(this.LandAllocateData.mandalId!='' && this.LandAllocateData.rbkId!==''&& this.LandAllocateData.villageId!==''   ){
       const req4 = {
         rpttyeid:'2',
        districtId: this.session.districtId,
        mandalId: this.LandAllocateData.mandalId,
        rbkId: this.LandAllocateData.rbkId,
        villageId: this.LandAllocateData.villageId, 
       HANDOVER_NAME_JD_SUB: "",
       HANDOVER_MBL_NO_JD_SUB: "",
       HANDOVER_DESIGNATION:"" 
       };
       this.spinner.show();       
       
       
         // const response4 = await this.jcAPI. bmcuPossessioncertificate(req4);

         const response4 = await this.jcAPI. bmcualienationUpdatedcertificate(req4);

       if (response4.success) {
         this.utils.downloadPdfFile(response4.result, 'bmcuAlienationcertificate');
       } else {
         this.toast.info(response4.message);
       }
       this.spinner.hide();
     }
    
 } catch (error) {
   this.spinner.hide();
   this.utils.catchResponse(error);
 }
}
 async btnAlloted(): Promise<void> {
   try {
     if (this.validate('1')) {
       this.LandAllocateData.districtId = this.session.districtId;
       this.LandAllocateData.uniqueId = this.session.rbkGroupId;
       this.LandAllocateData.insertedBy = this.session.userName;
       this.LandAllocateData.source = 'web';
       this.LandAllocateData.allotmentStatus = '1'; //1 //2
       this.LandAllocateData.area =
         this.LandAllocateData.acres + '.' + this.LandAllocateData.cents;
       this.spinner.show();
       const response = await this.jcAPI.landAllocateSub(
         this.LandAllocateData
       );
       if (response.success) {
         alert(response.message); 

         const req2 = {
           ProcTYPE:3,
           HANDOVER_NAME_JD_SUB:"NA",
           HANDOVER_MBL_NO_JD_SUB: "0",
           HANDOVER_DESIGNATION:"NA" ,
           AMCU_BMCU_STATUS:2,
           UPDATED_BY: this.session.userName,
           DIST_CODE:this.session.districtId,
           MANDAL_CODE: this.LandAllocateData.mandalId,
           RBK_CODE: this.LandAllocateData.rbkId,
           REVENUE_VILLAGE_CODE: this.LandAllocateData.villageId,   
           insertedBy: this.session.userName,
           updatedBy: this.session.userName
            
         };
         const response1 = await this.jcAPI. amcubmcupdfhandoverSub(
           req2
          );
          if (response1.success) {
         
         const req4 = {
           rpttyeid:'2',
          districtId: this.session.districtId,
          mandalId: this.LandAllocateData.mandalId,
          rbkId: this.LandAllocateData.rbkId,
          villageId: this.LandAllocateData.villageId, 
         HANDOVER_NAME_JD_SUB: "",
         HANDOVER_MBL_NO_JD_SUB: "",
         HANDOVER_DESIGNATION:"" 
         };
         this.spinner.show();           
           const response4 = await this.jcAPI. bmcuPossessioncertificate(
          req4
         );
         if (response4.success) {
           this.utils.downloadPdfFile(response4.result, 'bmcuAlienationcertificate');
         } else {
           this.toast.info(response4.message);
         }

       } else {
         this.toast.info(response1.message);
       }


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

 async btnPending(): Promise<void> {
   try {
     if (this.validate('2')) {
       this.LandAllocateData.districtId = this.session.districtId;
       this.LandAllocateData.uniqueId = this.session.rbkGroupId;
       this.LandAllocateData.insertedBy = this.session.userName;
       this.LandAllocateData.source = 'web';
       this.LandAllocateData.allotmentStatus = '2';

       if (this.LandAllocateData.cents.length === 1) {
         this.LandAllocateData.area =
           this.LandAllocateData.acres + '.0' + this.LandAllocateData.cents;
       } else {
         this.LandAllocateData.area =
           this.LandAllocateData.acres + '.' + this.LandAllocateData.cents;
       }

       // if (parseFloat(this.LandAllocateData.area) < 0.05) {
       //   this.toast.warning('Please Enter Atleast 5 Cents');
       //   return;
       // }

       this.spinner.show();
       const response = await this.jcAPI.landAllocateSub(
         this.LandAllocateData
       );
       if (response.success) {
         alert(response.message);
         window.location.reload();
       } else {

         this.divmaintable=true;
         this.divalienationtable=false;


         this.toast.info(response.message);
       }
       this.spinner.hide();
     }
   } catch (error) {
     this.spinner.hide();
     this.utils.catchResponse(error);
   }
 }

 validate(id): boolean {
   if (
     this.LandAllocateData.mandalId === '' ||
     this.LandAllocateData.mandalId === null ||
     this.LandAllocateData.mandalId === undefined
   ) {
     this.toast.warning('Please Select Mandal');
     return false;
   }

   if (
     this.LandAllocateData.rbkId === '' ||
     this.LandAllocateData.rbkId === null ||
     this.LandAllocateData.rbkId === undefined
   ) {
     this.toast.warning('Please Select RSK');
     return false;
   }

   if (
     this.LandAllocateData.villageId === '' ||
     this.LandAllocateData.villageId === null ||
     this.LandAllocateData.villageId === undefined
   ) {
     this.toast.warning('Please Select Village');
     return false;
   }

   if (
     this.LandAllocateData.publicPrivateLand === '' ||
     this.LandAllocateData.publicPrivateLand === null ||
     this.LandAllocateData.publicPrivateLand === undefined
   ) {
     this.toast.warning('Please Select Public/Private Land');
     return false;
   }
   if (this.LandAllocateData.publicPrivateLand === '0') {
     if (
       this.LandAllocateData.giftAndDeedPhotoUpload === '' ||
       this.LandAllocateData.giftAndDeedPhotoUpload === null ||
       this.LandAllocateData.giftAndDeedPhotoUpload === undefined
     ) {
       this.toast.warning('Please Upload Gift & Deed Document');
       return false;
     }
   }

   if (
     this.LandAllocateData.surveyNo === '' ||
     this.LandAllocateData.surveyNo === null ||
     this.LandAllocateData.surveyNo === undefined
   ) {
     this.toast.warning('Please Enter survey No');
     return false;
   }

   if (
     this.LandAllocateData.acres === '' ||
     this.LandAllocateData.acres === null ||
     this.LandAllocateData.acres === undefined
   ) {
     this.toast.warning('Please Enter Area Acres');
     return false;
   }

   if (
     this.LandAllocateData.cents === '' ||
     this.LandAllocateData.cents === null ||
     this.LandAllocateData.cents === undefined
   ) {
     this.toast.warning('Please Enter Area cents');
     return false;
   }
   let area = 0;

   if (this.LandAllocateData.cents.length === 1) {
     area = parseFloat(
       this.LandAllocateData.acres + '.' + this.LandAllocateData.cents +'0'
     );
   } else {
     area = parseFloat(
       this.LandAllocateData.acres + '.' + this.LandAllocateData.cents
     );
   }

   if (area < 0.05) {
     this.toast.warning('Please Enter Atleast 5 Cents');
     return;
   }

   if (area > 1) {
     this.toast.warning('Please Enter Maximum 1 Acre Only !!!');
     return;
   }

   if (
     this.LandAllocateData.latitude === '' ||
     this.LandAllocateData.latitude === null ||
     this.LandAllocateData.latitude === undefined
   ) {
     this.toast.warning('Please Enter Latitude');
     return false;
   }

   if (
     this.LandAllocateData.longtitude === '' ||
     this.LandAllocateData.longtitude === null ||
     this.LandAllocateData.longtitude === undefined
   ) {
     this.toast.warning('Please Enter Longitude');
     return false;
   }

   if (
     this.LandAllocateData.entireLandImg === '' ||
     this.LandAllocateData.entireLandImg === null ||
     this.LandAllocateData.entireLandImg === undefined
   ) {
     this.toast.warning('Please Upload Image Covering Entire Land');
     return false;
   }

   if (
     this.LandAllocateData.northBoundary === '' ||
     this.LandAllocateData.northBoundary === null ||
     this.LandAllocateData.northBoundary === undefined
   ) {
     this.toast.warning('Please Enter North Boundary');
     return false;
   }

   if (
     this.LandAllocateData.northImg === '' ||
     this.LandAllocateData.northImg === null ||
     this.LandAllocateData.northImg === undefined
   ) {
     this.toast.warning('Please Upload North Boundary Image');
     return false;
   }

   if (
     this.LandAllocateData.southBoundary === '' ||
     this.LandAllocateData.southBoundary === null ||
     this.LandAllocateData.southBoundary === undefined
   ) {
     this.toast.warning('Please Enter South Boundary');
     return false;
   }

   if (
     this.LandAllocateData.southImg === '' ||
     this.LandAllocateData.southImg === null ||
     this.LandAllocateData.southImg === undefined
   ) {
     this.toast.warning('Please Upload South Boundary Image');
     return false;
   }

   if (
     this.LandAllocateData.eastBoundary === '' ||
     this.LandAllocateData.eastBoundary === null ||
     this.LandAllocateData.eastBoundary === undefined
   ) {
     this.toast.warning('Please Enter East Boundary');
     return false;
   }

   if (
     this.LandAllocateData.eastImg === '' ||
     this.LandAllocateData.eastImg === null ||
     this.LandAllocateData.eastImg === undefined
   ) {
     this.toast.warning('Please Upload East Boundary Image');
     return false;
   }

   if (
     this.LandAllocateData.westBoundary === '' ||
     this.LandAllocateData.westBoundary === null ||
     this.LandAllocateData.westBoundary === undefined
   ) {
     this.toast.warning('Please Enter West Boundary');
     return false;
   }

   if (
     this.LandAllocateData.westImg === '' ||
     this.LandAllocateData.westImg === null ||
     this.LandAllocateData.westImg === undefined
   ) {
     this.toast.warning('Please Upload West Boundary Image');
     return false;
   } 
   if (
     this.LandAllocateData.distFromVillageCenter === '' ||
     this.LandAllocateData.distFromVillageCenter === null ||
     this.LandAllocateData.distFromVillageCenter === undefined
   ) {
     this.toast.warning('Please Enter Distance From Village Center');
     return false;
   }

   if (
     this.LandAllocateData.distFromVillageCenter === '' ||
     this.LandAllocateData.distFromVillageCenter === null ||
     this.LandAllocateData.distFromVillageCenter === undefined
   ) {
     this.toast.warning('Please Enter Distance From Village Center');
     return false;
   }

   return true;
 }

 async onNothPhotoChange(event): Promise<void> {
   try {
     this.LandAllocateData.northImg ='';
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
       this.LandAllocateData.northImg = res.split('base64,')[1];

       // this.LandAllocateData.northImg = res.replace('data:image/jpeg;base64,','');
       // this.LandAllocateData.northImg = res.replace(
       //   'data:image/jpg;base64,',
       //   ''
       // );

       
     }
   }
   } catch (error) {
     this.toast.warning('Please Select North Photo Image');
      
   }
 }

 async onSouthPhotoChange(event): Promise<void> {
   try {
     this.LandAllocateData.southImg = '';
     const element = event.currentTarget as HTMLInputElement;
     let fileList: FileList | null = element.files;
   
   if(element.files[0].name.split('.').length.toString()!=='2')      
   { this.toast.warning('Please Upload file name format ');  
 
   event.target.value = '';
 return;
   }else{
 
     const res = await this.utils.encodedString(
       event,
       this.utils.fileType.IMAGE,
       this.utils.fileSize.hundredKB
     );
     if (res) {
       this.LandAllocateData.southImg = res.split('base64,')[1];

       
     }
   }
   } catch (error) { this.toast.warning('Please Select South Photo Image');
      
   }
 }

 async onEastPhotoChange(event): Promise<void> {
   try {
     this.LandAllocateData.eastImg ='';
     const element = event.currentTarget as HTMLInputElement;
     let fileList: FileList | null = element.files;
   
   if(element.files[0].name.split('.').length.toString()!=='2')      
   { this.toast.warning('Please Upload file name format  ');  
 
   event.target.value = '';
 return;
   }else{
 
     const res = await this.utils.encodedString(
       event,
       this.utils.fileType.IMAGE,
       this.utils.fileSize.hundredKB
     );
     if (res) {
       this.LandAllocateData.eastImg = res.split('base64,')[1];
       
     }
   }
   } catch (error) { this.toast.warning('Please Select East Photo Image');
      
   }
 }

 async onWestPhotoChange(event): Promise<void> {
   try {
     this.LandAllocateData.westImg = '';
     const element = event.currentTarget as HTMLInputElement;
     let fileList: FileList | null = element.files;
   
   if(element.files[0].name.split('.').length.toString()!=='2')      
   { this.toast.warning('Please Upload image file name format  ');  
 
   event.target.value = '';
 return;
   }else{
 
     const res = await this.utils.encodedString(
       event,
       this.utils.fileType.IMAGE,
       this.utils.fileSize.hundredKB
     );
     if (res) {
       this.LandAllocateData.westImg = res.split('base64,')[1];
      
     }
   }
   } catch (error) { this.toast.warning('Please Select West Photo Image');
      
   }
 }

 async onAllotmentOrderChange(event): Promise<void> {
   try {
     const res = await this.utils.encodedString(
       event,
       this.utils.fileType.PDF,
       this.utils.fileSize.oneMB
     );
     if (res) {
       this.LandAllocateData.allotmentOrderAPDDCF = res.replace(
         'data:application/pdf;base64,',
         ''
       );
       
     }
   } catch (error) {  this.toast.warning('Please Select  pdf ');
      
   }
 }

 async onGiftAndDeedPhotoChange(event): Promise<void> {
   try {
     this.LandAllocateData.giftAndDeedPhotoUpload = '';
     const res = await this.utils.encodedString(event, this.utils.fileType.PDF,this.utils.fileSize.oneMB  );
     if (res) {
       this.LandAllocateData.giftAndDeedPhotoUpload = res.replace('data:application/pdf;base64,','' );
      // this.LandAllocateData.allotmentOrderAPDDCF = this.LandAllocateData.giftAndDeedPhotoUpload ;
     }
   } catch (error) {
     this.utils.catchResponse(error);
   }
 }

 async onEntireLandPhotoChange(event): Promise<void> {
   try {
     this.LandAllocateData.entireLandImg ='';
     const res = await this.utils.encodedString(
       event,
       this.utils.fileType.IMAGE,
       this.utils.fileSize.hundredKB
     );
     if (res) {

       this.LandAllocateData.entireLandImg = res.split('base64,')[1];
        
     }
   } catch (error) { this.toast.warning('Please Select  Photo Image');
     
   }
 }

 async btnupload(): Promise<void> { 
   try { 

 

 if (
   this.ALIENATION_PDF_JD_SUB === '' ||
   this.ALIENATION_PDF_JD_SUB === null ||
   this.ALIENATION_PDF_JD_SUB === undefined
 ) {
   this.toast.warning('Please Alienation Certificate Upload');
   return ;
 }
 const reqs = {
   type:'8',
  districtId: this.session.districtId,
  mandalId: this.LandAllocateData.mandalId,
  rbkId: this.LandAllocateData.rbkId,
  villageId: this.LandAllocateData.villageId,
  updatedBy: this.session.userName, 
 allotmentOrderAPDDCF:this.ALIENATION_PDF_JD_SUB
 };
 this.spinner.show();           
   const responsecents = await this.jcAPI.bmcucentsSub( reqs );
 if (responsecents.success) {
   this.divchkcentstxt=false;
   this.divchkcentsbtn=false;
   this.divchkcents=false;
   this.divdownload=true;
   this.toast.info(responsecents.message);
   this.router.navigate(['/jcModule/JdbmculandHandover'], { });
 } else {
   this.toast.info(responsecents.message);
 }

this.spinner.hide();

}
 catch (error) {
 this.spinner.hide();
 this.utils.catchResponse(error);
}
}
}
