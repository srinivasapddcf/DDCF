import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EMPTY, Subject, empty } from 'rxjs';
import { FarmerService } from 'src/app/FarmerModule/services/farmer.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-issue-entry-details',
  templateUrl: './issue-entry-details.component.html',
  styleUrls: ['./issue-entry-details.component.css']
})
export class IssueEntryDetailsComponent implements OnInit {
  societyName:any;DistrictName:any;MandalName:any;RBKName:any;
  societycode:any;Districtcode:any;Mandalcode:any;RBKcode:any;
  videoFile: File = null;docUpload = '';
  IssuesList:[];
  loginType = {
    mentorLogin: false,
    secLogin: false,
    AssistantSec: false,
    functionaryLogin: false,
  };
  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();
  pendtTrigger: Subject<any> = new Subject();
  @Input() rbkList = [];
  @Input() villageList = [];
  @Input() moduleList = [];
  @ViewChild('issueTrackingImgUpload') issueTrackingImgUpload: ElementRef;
  @ViewChild('videoFile') videoFiles: ElementRef;
  trackingData = {
    issueTitle: '',
    moduleId: '',
    description: '',
    issueImg: '',
    insertedBy: '',
    role: '',
    districtId: '',
    mandalId: '',
    rbkId: '',
    villageId: '',
    issueType: '',
    isFarmerIssue: '',
    farmerId: '',
    docPath: '',
    docTitle: '',
    type:'',
  };
  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private trackingAPI: CommonService,
    private utils: UtilsService,
    private logger: LoggerService,
    private session: SessionService,
    private sanitizer: DomSanitizer,
    private farmerModule: FarmerService
  ) {}

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ''){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    // if (this.session.desigId === '101') {
    //   this.loginType.mentorLogin = true;
    // } else if (this.session.desigId === '901') {
    //   this.loginType.secLogin = true;
    // } else if (this.session.desigId === '902') {
    //   this.loginType.AssistantSec = true;
    // } else if (
    //   this.session.desigId === '501' ||
    //   this.session.desigId === '502' ||
    //   this.session.desigId === '503'
    // ) {
    //   this.loginType.functionaryLogin = true;
    // }
    // if (this.loginType.mentorLogin) {
    //   this.loadRbkList();
    // }
  //   this.IssueDetails();
   this.trackingData.issueType="";
  }

  async loadRbkList(): Promise<void> {
    try {
      const req = {
        uniqueId: this.session.rbkGroupId,
      };
      this.spinner.show();
      const response = await this.farmerModule.rbkListByMentorId(req);
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
      this.trackingData.villageId = '';
      this.trackingData.issueType = '';
      this.trackingData.moduleId = '';
      this.trackingData.issueTitle = '';
      this.trackingData.isFarmerIssue = '';
      this.trackingData.farmerId = '';
      this.trackingData.description = '';
      this.issueTrackingImgUpload.nativeElement.value = '';
      this.villageList = [];
      if (this.trackingData.rbkId === '') {
        return;
      }

      let mentorId = '';
      if (
        this.session.rbkGroupId === '' ||
        this.session.rbkGroupId === undefined ||
        this.session.rbkGroupId === null
      ) {
        mentorId = '1';
      } else {
        mentorId = this.session.rbkGroupId;
      }
      const req = {
        districtId: this.session.districtId,
        rbkId: this.trackingData.rbkId,
        uniqueId: mentorId,
      };
      this.spinner.show();
      const response = await this.farmerModule.villageListByRbkId(req);
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
    this.trackingData.issueType = '';
    this.trackingData.moduleId = '';
    this.trackingData.issueTitle = '';
    this.trackingData.isFarmerIssue = '';
    this.trackingData.farmerId = '';
    this.trackingData.description = '';
    this.issueTrackingImgUpload.nativeElement.value = '';
  }

  onIssueTypeChange(): void {
    if (this.trackingData.issueType === '') {
      return;
    }
    this.trackingData.isFarmerIssue = '';
    this.trackingData.farmerId = '';
    this.trackingData.issueTitle = '';
    this.trackingData.description = '';
    this.issueTrackingImgUpload.nativeElement.value = '';
    this.loadModuleList();
  }

  async loadModuleList(): Promise<void> {
    try {
      const req = {
        issueType: this.trackingData.issueType,
      };
      this.spinner.show();
      const response = await this.trackingAPI.moduleList(req);
      if (response.success) {
        this.moduleList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  onmoduleNameChange(): void {
    this.trackingData.issueTitle = '';
    this.trackingData.isFarmerIssue = '';
    this.trackingData.farmerId = '';
    this.trackingData.description = '';
    this.issueTrackingImgUpload.nativeElement.value = '';
  }

  async btnSubmit(): Promise<void> {
    try { debugger;
      if (this.validate()) {
const req={
  type:'1',
issueId:'0',
issueStatus:'0',
issueType:this.trackingData.issueType,
society_code:this.societycode,
districtId:this.Districtcode,
mandalId:this.Mandalcode,
rbkId:this.RBKcode,
moduleId:this.trackingData.moduleId,
issueTitle:this.trackingData.issueTitle,
description:this.trackingData.description,
issueUrl: this.trackingData.issueImg,
insertedBy:this.session.userName,
role:this.session.desigId,
unique_id:this.session.uniqueId,
input_char1:'',
input_char2:'',
input_num1:'0',
input_num2:'0'
} 
        this.spinner.show();
        
        const response = await this.trackingAPI.IssueTrackingList(req); 
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

  async onVideoChange( files: FileList): Promise<void> {
    try {
        
      var res1=files.item(0).name.split('.')
            if(res1.length===2)
            {
              if(res1[1]==='mp4'||res1[1]==='mov'||res1[1]==='webm'||res1[1]==='avi'||res1[1]==='wmv'    )
              {   
                if(files.item(0).size <= 10485760.0) {
                  this.videoFile = files.item(0);
                }
                else
                {   this.videoFiles.nativeElement.value = ''; 
                  this.toast.warning('Please Upload Video files size below 10mb');  
                  return;
                }
                
                } else
                { this.videoFiles.nativeElement.value = ''; 
                 
                   
                this.toast.warning('Please Upload Video files only');  
                  return;
                }
          }
          else
          {  this.videoFiles.nativeElement.value = ''; 
            this.toast.warning('Please Upload Video files only'); 
            return;
          }
    } catch (error) { this.videoFiles.nativeElement.value = ''; 
    this.toast.warning('Please Upload Video files only'); 
      return;//this.utils.catchResponse(error);
    }
  }
   

  async onIssueTrackingImageChange(event): Promise<void> {
    try {
       
      const element = event.currentTarget as HTMLInputElement;
        let fileList: FileList | null = element.files;
      // if (fileList) {
      //   console.log("FileUpload -> files", fileList);
      // }
      if(element.files[0].name.split('.').length.toString()!=='2')      
      { this.toast.warning('Please Upload image files only');  
    //  c this.trackingData.issueImg ='';this.docUpload='';
    //   doument.getElementById('issueTrackingImgUpload').style.display='';
      event.target.value = '';
    return;
      }else{

      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.trackingData.issueImg = res.replace('data:image/jpeg;base64,', '');
      }
    }
    } catch (error) {
      return;//this.utils.catchResponse(error);
    }
  }

  
  async onIssueTrackingpdfChange(event): Promise<void> {
    try {
       
      const element = event.currentTarget as HTMLInputElement;
        let fileList: FileList | null = element.files;
      // if (fileList) {
      //   console.log("FileUpload -> files", fileList);
      // }
      if(element.files[0].name.split('.').length.toString()!=='2')      
      { this.toast.warning('Please Upload pdf files only');  
    
      event.target.value = '';
    return;
      }else{

      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.PDF,
        this.utils.fileSize.oneMB
      );
      if (res) {
        this.trackingData.issueImg = res.replace('data:application/pdf;base64,', '');
      }
    }
    } catch (error) {
      return;//this.utils.catchResponse(error);
    }
  }
  validate(): boolean {
    if (this.utils.isEmpty(this.RBKcode)) {
      this.toast.warning(' RSK Name Not found ');
      return false;
    }
    if (this.utils.isEmpty(this.societycode)) {
      this.toast.warning('Sciety Name Not found');
      return false;
    }
    if (this.utils.isEmpty(this.Mandalcode)) {
      this.toast.warning('Mandal Name Not found');
      return false;
    }
    if (this.utils.isEmpty(this.Districtcode)) {
      this.toast.warning('District Name Not found');
      return false;
    }
    if (this.trackingData.issueType === '') {
      if (this.utils.isEmpty(this.trackingData.isFarmerIssue)) {
        this.toast.warning('Please Select Issue Type');
        return false;
      }
    }

    if (this.trackingData.moduleId === '') {
       
        this.toast.warning('Please Select Module Name ');
        return false;
      
    }
    if (this.utils.isEmpty(this.trackingData.issueTitle)) {
      this.toast.warning('Please Enter Issue Title');
      return false;
    }

    // if (this.utils.isEmpty(this.trackingData.description)) {
    //   this.toast.warning('Please Enter Description');
    //   return false;
    // }

    // if (this.utils.isEmpty(this.trackingData.issueImg)) {
    //   this.toast.warning('Please Upload Issue Tracking Image');
    //   return false;
    // }

    // if (this.utils.isEmpty(this.trackingData.docTitle)) {
    //   this.toast.warning('Please Enter Document Title');
    //   return false;
    // }

    // if (this.utils.isEmpty(this.trackingData.docPath)) {
    //   this.toast.warning('Please Upload Document');
    //   return false;
    // }

    // if (!this.videoFile) {
    //   this.toast.warning('Please Upload Video');
    //   return false;
    // }

    return true;
  }
 

  async onDocChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.PDF,
        this.utils.fileSize.oneMB
      );
      if (res) {
        const doc = (this.sanitizer.bypassSecurityTrustResourceUrl(res) as any)
          .changingThisBreaksApplicationSecurity;
        this.trackingData.docPath = doc.replace(
          'data:application/pdf;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }


  async btnFindDetails():Promise<void>{
    try {debugger;
      if(this.societycode==undefined) {this.toast.warning("Enter Society Code");return;}
       const req={
        type:'2',
        issueId:this.societycode,
         role:this.session.desigId,
         insertedBy:this.session.userName
       };
       this.trackingData.issueType="";
       this.trackingData.moduleId="";

        this.Districtcode='';this.Mandalcode='';this.RBKcode='';
        this.societyName='';this.DistrictName='';this.MandalName='';this.RBKName='';
        this.spinner.show();
        const response = await this.trackingAPI.IssueTrackingSelect(req);
        if (response.success) {
         this.societyName=response.result[0].SOCIETY_NAME;
         this.DistrictName=response.result[0].DISTRICT_NAME;
         this.MandalName=response.result[0].MANDAL_NAME; 
         this.RBKName=response.result[0].RBK_NAME;
       
 
        // this.societycode=response.result[0].SOCIETY_CODE;
         this.Districtcode=response.result[0].DISTRICT_CODE;
         this.Mandalcode=response.result[0].MANDAL_CODE; 
         this.RBKcode=response.result[0].RBK_CODE;


        } else {

          this.societyName ="";
          this.DistrictName="";
          this.MandalName=""; 
          this.RBKName="";
          this.societycode="";
          this.Districtcode="";
          this.Mandalcode=""; 
          this.RBKcode="";
          this.trackingData.issueType="";
          this.trackingData.moduleId="";


          this.toast.info("No Records found");
        }
        this.spinner.hide();
      
    } catch (error) {
      this.spinner.hide();
      this.toast.info("No Records found" );
    }

  }

  async IssueDetails():Promise<void>{
    try { 
       
       const req={
        type:'4',
       // issueId:this.societycode,
         role:this.session.desigId,
         unique_id:this.session.uniqueId,
         insertedBy:this.session.userName

       }; 
        this.spinner.show();
        const response = await this.trackingAPI.IssueTrackingSelect(req);
        if (response.success) {
          this.IssuesList=response.result; 
        } else {
          this.toast.info(response.message);
        }
        this.spinner.hide();
      
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse("No Records found"+error);
    }

  }

  // async btnPdfView(pdf): Promise<void> {
  //   try {
  //     this.spinner.show();
       
  //       this.utils.viewImageB(pdf);
      
  //     this.spinner.hide();
  //   } catch (error) {
  //     this.spinner.hide();
  //     this.utils.catchResponse(error);
  //   }
  // }

  btnPdfView(image): void {
    if (!this.utils.isEmpty(image)) {
       
      //this.utils.view_trackImage(image);
      //this.utils.viewImage('https://apiapddcf.ap.gov.in//amulBankend\\prod\\images\\issuesTrackingImages\\517\\5128\\10890391\\25025\\2023002303004613169334.jpeg');
      //'https://api.apddcf.ap.gov.in//jpv//prod//images//issuesTrackingImages//517//5128//10890391//25025//2023002303004613169334.jpeg'
      this.utils.viewImage(image);
    } else {
      this.toast.warning('Image is Not Available');
    }
  }


}
