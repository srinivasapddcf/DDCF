import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { MdssService } from '../../services/mdss.service';

@Component({
  selector: 'app-minutes-of-meeting',
  templateUrl: './minutes-of-meeting.component.html',
  styleUrls: ['./minutes-of-meeting.component.css'],
})
export class MinutesOfMeetingComponent implements OnInit {
  @ViewChild('photoUpload') photoUpload: ElementRef;
  @ViewChild('docUpload') docUpload: ElementRef;

  date: any;
  rbkList = [];
  meetingList = [];
  VILLAGE_LIST='';
  meetingData = {
    districtId: '',
    mandalId: '',
    mentorId: '',
    rbkId: '',
    minutesOfMeeting: '',
    insertedBy: '',    
    source: '',
    photos: [],
    docs: [],
    meetingId: '',
    VILLAGE_LIST:'',
  };
  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private momAPI: MdssService,
    private utils: UtilsService,
    private sanitizer: DomSanitizer,
    private logger: LoggerService,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ''){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    this.date = new Date().toISOString().slice(0, 10);
    this.loadRBKList();
  }

  async loadRBKList(): Promise<void> {
    try {
      const req = {
        rbkId: this.session.rbkGroupId,meetingId:'101'
        //uniqueId: this.session.rbkGroupId,
      };
      this.spinner.show();
     // const response = await this.momAPI.rbkListByMentorId(req);
     const response = await this.momAPI.farmerDetailsByMeetingId(req);
      if (response.success) {
        this.rbkList = response.result;
      } else {
        this.toast.info("Minutes of meeting submitted for all rsk's");
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onRbkChange(): Promise<void> {
    try {
      this.meetingList = [];
      this.meetingData.meetingId = '';
      this.meetingData.minutesOfMeeting = '';
      this.VILLAGE_LIST='';
      this.meetingData.photos = [];
     // this.meetingData.docs = [];
      if (this.meetingData.rbkId === '') {
        return;
      }
      const req = {
        rbkId: this.meetingData.rbkId,
      };
      this.spinner.show();
      const response = await this.momAPI.meetingDetailsByRbkId(req);
      if (response.success) {

       // VILLAGE_LIST
        this.meetingList = response.result;
        this.VILLAGE_LIST=this.meetingList[0].VILLAGE_LIST;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  onMeetingChange(): void {
    this.meetingData.minutesOfMeeting = '';
    this.meetingData.photos = [];
   // this.meetingData.docs = [];
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
        const response = await this.momAPI.minutesOfMeetingSub(
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
    if (this.utils.isEmpty(this.meetingData.rbkId)) {
      this.toast.warning('Please Select RSK');
      return false;
    }

    if (this.utils.isEmpty(this.meetingData.meetingId)) {
      this.toast.warning('Please Select Meeting ID');
      return false;
    }
    if (this.utils.isEmpty(this.meetingData.minutesOfMeeting)) {
      this.meetingData.minutesOfMeeting=".";
    }
    // if (this.utils.isEmpty(this.meetingData.minutesOfMeeting)) {
    //   this.toast.warning('Please Enter Minutes Of Meeting');
    //   return false;
    // }

    if (this.meetingData.minutesOfMeeting.length >= 500) {
      this.toast.warning(
        'Minutes Of Meeting Should be less than 500 characters.'
      );
      return false;
    }

    if (this.meetingData.photos.length < 1) {
      this.toast.warning('Please Upload Atleast One Photo');
      return false;
    }

    return true;
  }

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
    
    if(element.files[0].name.split('.').length.toString()!=='2')      
    { this.toast.warning('Please Upload jpg files only');  
  
    event.target.value = '';
  return;
    }else{
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        if (this.meetingData.photos.length < 6) {
          let photo = (
            this.sanitizer.bypassSecurityTrustResourceUrl(res) as any
          ).changingThisBreaksApplicationSecurity;

          photo = photo.replace('data:image/jpeg;base64,', '');
          this.meetingData.photos.push({
            IMAGE: photo,
          });
        } else {
          this.toast.warning('You Can Upload Maximum 6 photos !!!');
        }
        this.photoUpload.nativeElement.value = '';
      }

    }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  // async onDocChange(event): Promise<void> {
  //   try {
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
  //   } catch (error) {
  //     this.utils.catchResponse(error);
  //   }
  // }
}
