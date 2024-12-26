import { SelectorListContext } from '@angular/compiler';
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
  selector: 'app-amcu-land-allocation',
  templateUrl: './amcu-land-allocation.component.html',
  styleUrls: ['./amcu-land-allocation.component.css'],
})
export class AmcuLandAllocationComponent implements OnInit {
  date: any;
  rbkList = [];
  routeList = [];
  villageList = [];
  mandalList = [];
  milkPouringVillageList = [];
  divalienationtable=false;
  divmaintable=true;
  divchkcents=false;
  divdownload=false;
  divchkcentstxt=false;
  divchkcentsbtn=false;
  divchkEditcents=false;
  TXTCENTS='';type="";
  allotmentAlienationUpload='';
  amcu_al_path='';
  milkPouringVillageId='';
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
    revVillageId: '',
    milkPouringVillageId:'',
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
    if(this.session.uniqueId !="" && this.session.desigId != ''){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    this.loadMandals();
  }

  async loadMandals(): Promise<void> {
    try {
      const req = {
        districtId: this.session.districtId,
      };
      this.spinner.show();
      const response = await this.jcAPI.amcuMandalListByDistrictId(req);
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
      const response = await this.jcAPI.amcuRbkListByMandalId(req);
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

  onRbkChange(): void {
    this.LandAllocateData.villageId = '';
    this.villageList = [];
    if (this.LandAllocateData.rbkId === '') {
      return;
    }
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
      const response = await this.jcAPI.amcuVillageListByRbkId(req);
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

  onVillageChange(): void {
    this.LandAllocateData.revVillageId = '';
    this.milkPouringVillageList = [];
    if (this.LandAllocateData.villageId === '') {
      return;
    }
    this.loadMilkPouringVillageList();
  }

  async loadMilkPouringVillageList(): Promise<void> {
    try {
      const req = {
        districtId: this.session.districtId,
        mandalId: this.LandAllocateData.mandalId,
        rbkId: this.LandAllocateData.rbkId,
        villageId: this.LandAllocateData.villageId,
      };
      this.spinner.show();
      const response = await this.jcAPI.amcuMilkPouringVillagesList(req);
      if (response.success) {
        this.milkPouringVillageList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onMilkPouringVillageChange(): Promise<void> {
    try {
      if (this.LandAllocateData.revVillageId === '') {
        return;
      }
      const req = {
        type:"1",
        districtId: this.session.districtId,
        mandalId: this.LandAllocateData.mandalId,
        rbkId: this.LandAllocateData.rbkId,
        villageId: this.LandAllocateData.revVillageId,
        revVillageId: this.LandAllocateData.villageId,
       // area:"0",
      //  updatedBy:this.session.userName,
        // "districtId":"517",
        // "rbkId":"10890744",
        // "mandalId":"5116",
        // "villageId":"20055",
        // "revVillageId":"590876"

      };


      this.spinner.show();
      const response = await this.jcAPI.amcuLandAllotment_select(req);
      if (response.success) {

         if(response.result[0].STATUS==='1'){ this.toast.warning('AMCU Land Allotment completed Proceed to Handover'); 
        this.router.navigate(['/jcModule/JdamculandHandover'], {});  }
        else if(response.result[0].STATUS==='3'){  this.toast.warning('Upload AMCU Alienation Certificate');
        this.divmaintable=false;
        this.divalienationtable=true;
        this.divchkEditcents=true;
        this.divchkcents=true;
        this.divdownload=true;
          }
          else
          {
            this.divmaintable=true;
              this.divalienationtable=false;

          }
        }
        else
        alert(response.message);

      this.spinner.hide();
 
      } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
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
          rpttyeid:'4',
         districtId: this.session.districtId,
         mandalId: this.LandAllocateData.mandalId,
         rbkId: this.LandAllocateData.rbkId,
         villageId: this.LandAllocateData.revVillageId, 
         milkPouringVillageId:this.LandAllocateData.villageId,
        };
        this.spinner.show();           
        //  const response4 = await this.jcAPI. amcuBMCUPossessioncertificate(req4);
           const response4 = await this.jcAPI. amcualienationUpdatedcertificate(req4);
        if (response4.success) {
          this.utils.downloadPdfFile(response4.result, 'AmcuAlienationcertificate');
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

async btnCENTSupload(event): Promise<void> {
  try {
         
    let area = 0;
    area = parseFloat('0.'+this.TXTCENTS);
    // if (this.TXTCENTS.length === 1) {
    //   area = parseFloat('.00' + this.TXTCENTS);
    // }
    // else if (this.TXTCENTS.length === 2) {

    //   area = parseFloat('.' + this.TXTCENTS);
    // }
    //  else {
    //   area = parseFloat( this.TXTCENTS );
    // }

    if (area < 0.035) {
      this.toast.warning('Please Enter Atleast 035(3.5)) Cents');
      return;
    }

    if (area > 0.999) {
      this.toast.warning('Please Enter Maximum 1 Acre Only !!!');
      return;
    }


    const reqs = {
      type:"2",
      districtId: this.session.districtId,
      mandalId: this.LandAllocateData.mandalId,
      rbkId: this.LandAllocateData.rbkId,
      villageId: this.LandAllocateData.revVillageId,
      revVillageId: this.LandAllocateData.villageId,
     area:area,insertedBy: this.session.userName,
     
    };
    this.spinner.show();           
      const responsecents = await this.jcAPI.amcuLandAllotment_select( reqs );
    if (responsecents.success) { this.toast.info("Cents Updated.");
      this.divchkcentstxt=false;
      this.divchkcentsbtn=false;
      this.TXTCENTS='';
      const checkbox = document.getElementById('chkcents',) as HTMLInputElement | null;
      checkbox.checked=false;
      this.divdownload=true;

      this.divchkEditcents=true;
        this.divchkcents=true;

    } else {
      this.toast.info(responsecents.message);
    }
    this.spinner.hide();
  }




        catch (error) {
     
    this.utils.catchResponse(error);
  }
}

async btnupload(): Promise<void> { 
  try { 



if (
  this.amcu_al_path === '' ||
  this.amcu_al_path === null ||
  this.amcu_al_path === undefined
) {
  this.toast.warning('Please Alienation Certificate Upload');
  return ;
}
// const reqs = {
//   type:'4',
//  districtId: this.session.districtId,
//  mandalId: this.LandAllocateData.mandalId,
//  rbkId: this.LandAllocateData.rbkId,
//  revvillageId: this.LandAllocateData.villageId,
//  villageId: this.LandAllocateData.revVillageId,
//  updatedBy: this.session.userName, 
//  amcu_al_path:this.amcu_al_path
// };
// this.spinner.show();           
//   const responsecents = await this.jcAPI.amcuLandAllotment_select( reqs );
  const reqs = {
  type:'4',
  districtId: this.session.districtId,
  mandalId: this.LandAllocateData.mandalId,
  rbkId: this.LandAllocateData.rbkId,
  revvillageId: this.LandAllocateData.villageId,
  villageId: this.LandAllocateData.revVillageId,
  
  amcu_pc_path:this.amcu_al_path,
  amcu_rev_rec_path:'NA',
  insertedBy: this.session.userName,
};

      
      this.spinner.show(); 
      const responsecents = await this.jcAPI.amcuLandAllotment_Sub( reqs );
 

if (responsecents.success) {
  this.divchkcentstxt=false;
  this.divchkcentsbtn=false;
  this.divchkcents=false;
  this.divdownload=true;
  this.toast.info(responsecents.message);
  this.router.navigate(['/jcModule/JdamculandHandover'], { });
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


async onAlienationStatementChange(event): Promise<void> {
  try { this.amcu_al_path='';
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
  
  if(element.files[0].name.split('.').length.toString()!=='2')      
  { this.toast.warning('Please Upload PDF files only');  

  event.target.value = '';
return;
  }else{

    const res: any = await this.utils.encodedString(
      event,
      this.utils.fileType.PDF,
      this.utils.fileSize.oneMB
    );
    if (!this.utils.isEmpty(res)) {
      // this.amcu_al_path = res.replace('data:application/pdf;base64,','' );
       this.amcu_al_path= res.split('base64,')[1];
    }
  }
  } catch (error) { this.toast.warning('Please Select pdf');
    //this.utils.catchResponse(error);
  }
}

  async btnLandAllotmentSub(allotmentStatus): Promise<void> {
    try {
      if (this.validate()) { 
        this.LandAllocateData.milkPouringVillageId=this.LandAllocateData.revVillageId;
        this.LandAllocateData.rbkId=this.LandAllocateData.rbkId;
        this.LandAllocateData.districtId = this.session.districtId;
        this.LandAllocateData.uniqueId = this.session.rbkGroupId;
        this.LandAllocateData.insertedBy = this.session.userName;
        this.LandAllocateData.source = 'web';
        this.LandAllocateData.allotmentStatus = allotmentStatus;
        this.LandAllocateData.area =
          this.LandAllocateData.acres + '.' + this.LandAllocateData.cents;
        this.spinner.show();
        const response = await this.jcAPI.amcuLandAllotmentSub(
          this.LandAllocateData
        );
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
    if (this.utils.isEmpty(this.LandAllocateData.mandalId)) {
      this.toast.warning('Please Select Mandal');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.rbkId)) {
      this.toast.warning('Please Select RSK');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.villageId)) {
      this.toast.warning('Please Select Village');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.revVillageId)) {
      this.toast.warning('Please Select Milk Pouring Village');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.publicPrivateLand)) {
      this.toast.warning('Please Select Public/Private Land');
      return false;
    }
    if (this.LandAllocateData.publicPrivateLand === '0') {
      if (this.utils.isEmpty(this.LandAllocateData.giftAndDeedPhotoUpload)) {
        this.toast.warning('Please Upload Gift & Deed Document');
        return false;
      }
    }

    if (this.utils.isEmpty(this.LandAllocateData.surveyNo)) {
      this.toast.warning('Please Enter survey No');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.acres)) {
      this.toast.warning('Please Enter Area Acres');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.cents)) {
      this.toast.warning('Please Enter Area cents');
      return false;
    }

    const centsLength = this.LandAllocateData.cents.split('.')[0].length;
    // if (centsLength > 2 || centsLength < 1) {
    //   this.toast.warning('Please Enter Valid Area cents');
    //   return false;
    // }

   
    let area = 0;
    area = parseFloat(this.LandAllocateData.acres +  this.LandAllocateData.cents  );

    if (centsLength === 1) {
      area = parseFloat(
        this.LandAllocateData.acres + '.0' + this.LandAllocateData.cents.replace('.', '')
      );
    } else {
      area = parseFloat(
        this.LandAllocateData.acres + '.' + this.LandAllocateData.cents.replace('.', '')
      );
    }
    


    if (area < 0.035) {
      this.toast.warning('Please Enter Atleast 3.5 Cents');
      return;
    }

    if (area > 0.999) {
      this.toast.warning('Please Enter Maximum 1 Acre Only !!!');
      return;
    }

    if (this.utils.isEmpty(this.LandAllocateData.latitude)) {
      this.toast.warning('Please Enter Latitude');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.longtitude)) {
      this.toast.warning('Please Enter Longitude');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.entireLandImg)) {
      this.toast.warning('Please Upload Image Covering Entire Land');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.northBoundary)) {
      this.toast.warning('Please Enter North Boundary');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.northImg)) {
      this.toast.warning('Please Upload North Boundary Image');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.southBoundary)) {
      this.toast.warning('Please Enter South Boundary');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.southImg)) {
      this.toast.warning('Please Upload South Boundary Image');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.eastBoundary)) {
      this.toast.warning('Please Enter East Boundary');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.eastImg)) {
      this.toast.warning('Please Upload East Boundary Image');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.westBoundary)) {
      this.toast.warning('Please Enter West Boundary');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.westImg)) {
      this.toast.warning('Please Upload West Boundary Image');
      return false;
    }

    // if (this.utils.isEmpty(this.LandAllocateData.allotmentOrderAPDDCF)) {
    //   this.toast.warning('Please Upload Allotment Order for APDDCF');
    //   return false;
    // }

    if (this.utils.isEmpty(this.LandAllocateData.distFromVillageCenter)) {
      this.toast.warning('Please Enter Distance From Village Center');
      return false;
    }

    return true;
  }

  async ondivchkcentsChange(event): Promise<void> {
    try {
       


      const checkbox = document.getElementById('chkcents',) as HTMLInputElement | null;
      
      if (checkbox != null) {
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

 
        } catch (error) {
       
      this.utils.catchResponse(error);
    }
  }
  async onNothPhotoChange(event): Promise<void> {
    try { this.LandAllocateData.northImg ='';
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
       // this.LandAllocateData.northImg = res.replace( 'data:image/jpeg;base64,',   ''     );

        this.LandAllocateData.northImg = res.split('base64,')[1];
      }
    } catch (error) {
      this.toast.warning('Please Select North Photo Image');
    //  this.utils.catchResponse(error);
    }
  }

  async onSouthPhotoChange(event): Promise<void> {
    try { this.LandAllocateData.southImg = '';
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
       // this.LandAllocateData.southImg = res.replace( 'data:image/jpeg;base64,', ''  );
       this.LandAllocateData.southImg = res.split('base64,')[1];
      }
    } catch (error) {   this.toast.warning('Please Select South Photo Image');
      //this.utils.catchResponse(error);
    }
  }

  async onEastPhotoChange(event): Promise<void> {
    try {  this.LandAllocateData.eastImg ='';
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
       // this.LandAllocateData.eastImg = res.replace( 'data:image/jpeg;base64,', '' );
       this.LandAllocateData.eastImg = res.split('base64,')[1];
      }
    } catch (error) { this.toast.warning('Please Select East Photo Image');
     // this.utils.catchResponse(error);
    }
  }

  async onWestPhotoChange(event): Promise<void> {
    try { this.LandAllocateData.westImg ='';
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
       // this.LandAllocateData.westImg = res.replace( 'data:image/jpeg;base64,',  ''   );
       this.LandAllocateData.westImg = res.split('base64,')[1];
      }
    } catch (error) {  this.toast.warning('Please Select West Photo Image');
      //this.utils.catchResponse(error);
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
    } catch (error) { this.toast.warning('Please Select pdf');
      //this.utils.catchResponse(error);
    }
  }

  async onGiftAndDeedPhotoChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.PDF,
        this.utils.fileSize.oneMB
      );
      if (res) {
        this.LandAllocateData.giftAndDeedPhotoUpload = res.replace(
          'data:application/pdf;base64,',
          ''
        );
      }
    } catch (error) { this.toast.warning('Please Select pdf');
    //  this.utils.catchResponse(error);
    }
  }

  async onEntireLandPhotoChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.LandAllocateData.entireLandImg = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) { this.toast.warning('Please Select pdf');
     // this.utils.catchResponse(error);
    }
  }
}
