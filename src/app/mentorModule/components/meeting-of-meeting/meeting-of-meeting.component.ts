import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { McuMappingService } from '../../services/mcu-mapping.service';

@Component({
  selector: 'app-meeting-of-meeting',
  templateUrl: './meeting-of-meeting.component.html',
  styleUrls: ['./meeting-of-meeting.component.css'],
})
export class MeetingOfMeetingComponent implements OnInit {
  @ViewChild('photoUpload') photoUpload: ElementRef;
  @ViewChild('docUpload') docUpload: ElementRef;

  date: any;
  rbkList = [];
  villageList = [];
  meetingList = [];

  meetingData = {
    districtId: '',
    mandalId: '',
    mentorId: '',
    rbkId: '',
    villageId: '',
    womenOwnerOfMilchAnimal: '',
    womenOfYSRCheyuta: '',
    minutesOfMeeting: '',
    insertedBy: '',
    source: '',
    photos: [],
    docs: [],
    meetingId: '',
  };
  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private mcuAPI: McuMappingService, 
    private utils: UtilsService,
    private sanitizer: DomSanitizer,
    private logger: LoggerService,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ""){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    this.date = new Date().toISOString().slice(0, 10);
    this.loadRBKList(36);
  }





  async loadRBKList(id): Promise<void> {
    try {
      const req = {
        type:id,
        uniqueId: this.session.rbkGroupId,
      };
      this.spinner.show();
    //  const response = await this.mcuAPI.rbkListByMentorId(req);
    const response = await this.mcuAPI.rbkminutuesofmeeting(req);
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
      this.villageList = [];
      if (this.meetingData.rbkId === '') {
        return;
      }

      const req = {
        type:37,
        districtId: this.session.districtId,
        rbkId: this.meetingData.rbkId,
        uniqueId: this.session.rbkGroupId,
      };
      this.spinner.show();
     // const response = await this.mcuAPI.villageListByRbkId(req);
     const response = await this.mcuAPI.rbkminutuesofmeeting(req);
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

  async onVillageChange(): Promise<void> {
    try {
      this.meetingList = [];
      if (this.meetingData.villageId === '') {
        return;
      }
      const req = {
        type:38,
        rbkId: this.meetingData.rbkId,
        villageId: this.meetingData.villageId,
      };
      this.spinner.show();
     // const response = await this.mcuAPI.meetingIdListByVillageId(req);
     const response = await this.mcuAPI.rbkminutuesofmeeting(req);
      if (response.success) {
        this.meetingList = response.result;
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
        this.meetingData.districtId = this.session.districtId;
        this.meetingData.mandalId = this.session.mandalId;
        this.meetingData.mentorId = this.session.rbkGroupId;
        this.meetingData.insertedBy = this.session.userName;
        this.meetingData.source = 'web';
        // alert('Meeting Minutes Captured Successfully !!!');
        this.spinner.show();
        const response = await this.mcuAPI.minutesOfMeetingSub(
          this.meetingData
        );
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

  validate(): boolean {
    if (
      this.meetingData.rbkId === '' ||
      this.meetingData.rbkId === null ||
      this.meetingData.rbkId === undefined
    ) {
      this.toast.warning('Please Select RSK');
      return false;
    }

    if (
      this.meetingData.villageId === '' ||
      this.meetingData.villageId === null ||
      this.meetingData.villageId === undefined
    ) {
      this.toast.warning('Please Select Village');
      return false;
    }

    if (
      this.meetingData.meetingId === '' ||
      this.meetingData.meetingId === null ||
      this.meetingData.meetingId === undefined
    ) {
      this.toast.warning('Please Select Meeting Venue');
      return false;
    }

    if (
      this.meetingData.womenOwnerOfMilchAnimal === '' ||
      this.meetingData.womenOwnerOfMilchAnimal === null ||
      this.meetingData.womenOwnerOfMilchAnimal === undefined
    ) {
      this.toast.warning(
        'Please Enter No Of Women (Owner Of Milch Animals) Participated'
      );
      return false;
    }

    if (
      this.meetingData.womenOfYSRCheyuta === '' ||
      this.meetingData.womenOfYSRCheyuta === null ||
      this.meetingData.womenOfYSRCheyuta === undefined
    ) {
      this.toast.warning(
        'Please Enter No Of Women (Ysr Cheyutha Beneficiaries) Participated'
      );
      return false;
    }

    if (
      this.meetingData.minutesOfMeeting === '' ||
      this.meetingData.minutesOfMeeting === null ||
      this.meetingData.minutesOfMeeting === undefined
    ) {
      this.toast.warning('Please Enter Minutes Of Meeting');
      return false;
    }

    if (
      this.meetingData.minutesOfMeeting.length >= 1000
    ) {
      this.toast.warning('Minutes Of Meeting Should be less than 1000 characters.');
      return false;
    }

    if (
      this.meetingData.photos.length < 1 &&
      this.meetingData.docs.length < 1
    ) {
      this.toast.warning('Please Upload Atleast One Photo or Document');
      return false;
    }

    return true;
  }

  // btnImage(image): void {
  //   this.utils.viewImage(image);
  //   // this.toast.showImage(image);
  // }

  // btnImageCancel(index): void {
  //   this.meetingData.photos.splice(index, 1);
  // }

  // btnDoc(pdf, index): void {
  //   this.utils.downloadPdfFile(pdf, 'DOCUMENT-' + index);
  // }

  // btnDocCancel(index): void {
  //   this.meetingData.docs.splice(index, 1);
  // }

  // async onPhotoChange(event ): Promise<void> {
  //   try { 
    
  //     const res = await this.utils.encodedString(
  //       event,
  //       this.utils.fileType.IMAGE,
  //       this.utils.fileSize.hundredKB
  //     );
  //     if (res) {
  //       if (this.meetingData.docs.length + this.meetingData.photos.length < 6) {
  //         let photo = (
  //           this.sanitizer.bypassSecurityTrustResourceUrl(res) as any
  //         ).changingThisBreaksApplicationSecurity;

  //         photo = photo.replace('data:image/jpeg;base64,', '');
  //         this.meetingData.photos.push({
  //           IMAGE: photo,
  //         });
  //       } else {
  //         this.toast.warning('You Can Upload Maximum 6 files or photos !!!');
  //       }
  //       this.photoUpload.nativeElement.value = '';
  //     }
  //   } catch (error) {
  //     this.photoUpload.nativeElement.value = '';
  //     this.utils.catchResponse(error);
  //   }


  // //   try {

      
  // //     const element = event.currentTarget as HTMLInputElement;
  // //     let fileList: FileList | null = element.files;
    
  // //   if(element.files[0].name.split('.').length.toString()!=='2')      
  // //   { this.toast.warning('Please Upload  jpg files only');  
  
  // //   event.target.value = '';
  // // return;
  // //   }else{
      
  // //     const res = await this.utils.encodedString(
  // //       event,
  // //       this.utils.fileType.IMAGE,
  // //       this.utils.fileSize.twoHundredKB
  // //     );
  // //     if (res) {
  // //       this.meetingData.photos = res.replace(
  // //         'data:image/jpeg;base64,',
  // //         ''
  // //       );
  // //     }
  // //   }

  // //   } catch (error) {
  // //     this.utils.catchResponse(error);
  // //   }

  // }

  // async onDocChange(event): Promise<void> {
  //   try {

 
  //     const element = event.currentTarget as HTMLInputElement;
  //     let fileList: FileList | null = element.files;
    
  //   if(element.files[0].name.split('.').length.toString()!=='2')      
  //   { this.toast.warning('Please Upload PDF files only');  
  
  //   event.target.value = '';
  // return;
  //   }else{
      
  //     const res = await this.utils.encodedString(
  //       event,
  //       this.utils.fileType.PDF,
  //       this.utils.fileSize.oneMB
  //     );
  //     if (res) {
  //       if (this.meetingData.docs.length + this.meetingData.photos.length < 6) {
  //         let doc = (this.sanitizer.bypassSecurityTrustResourceUrl(res) as any)
  //           .changingThisBreaksApplicationSecurity;

  //         doc = doc.replace('data:application/pdf;base64,', '');
  //         this.meetingData.docs.push({
  //           DOC: doc,
  //         });
  //       } else {
  //         this.toast.warning('You Can Upload Maximum 6 files or photos !!!');
  //       }
  //       this.docUpload.nativeElement.value = '';
  //     }

  //   }
  //   } catch (error) {
  //     this.utils.catchResponse(error);
  //   }
  // }



  btnImage(image): void {
    this.utils.viewImage(image);
    // this.toast.showImage(image);
  }

  btnImageCancel(index): void {
    this.meetingData.photos.splice(index, 1);
  }

  btnDoc(pdf, index): void {
    this.utils.downloadPdfFile(pdf, 'DOCUMENT-' + index);
  }

  btnDocCancel(index): void {
    this.meetingData.docs.splice(index, 1);
  }

  async onPhotoChange(event): Promise<void> {
    try {
      
      const element = event.currentTarget as HTMLInputElement;
      let fileList: FileList | null = element.files; 
    if(element.files[0].name.split('.').length.toString()>'2')      
    { this.toast.warning('Please Upload image files only');     
    event.target.value = '';
  return;  
    }
    if(element.files[0].name.split('.')[1]=="jpeg"  || element.files[0].name.split('.')[1]=="jpg" ){
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        if (this.meetingData.docs.length + this.meetingData.photos.length < 6) {
          let photo = (
            this.sanitizer.bypassSecurityTrustResourceUrl(res) as any
          ).changingThisBreaksApplicationSecurity;

          photo = photo.replace('data:image/jpeg;base64,', '');
          this.meetingData.photos.push({
            IMAGE: photo,
          });
        } else {
          this.toast.warning('You Can Upload Maximum 6 files or photos !!!');
        }
        this.photoUpload.nativeElement.value = '';
      }
    }
    else
    { this.toast.warning('Please Upload image files only');     
    event.target.value = '';
  return;  
    }

    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onDocChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.PDF,
        this.utils.fileSize.oneMB
      );
      if (res) {
        if (this.meetingData.docs.length + this.meetingData.photos.length < 6) {
          let doc = (this.sanitizer.bypassSecurityTrustResourceUrl(res) as any)
            .changingThisBreaksApplicationSecurity;

          doc = doc.replace('data:application/pdf;base64,', '');
          this.meetingData.docs.push({
            DOC: doc,
          });
        } else {
          this.toast.warning('You Can Upload Maximum 6 files or photos !!!');
        }
        this.docUpload.nativeElement.value = '';
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }


}
