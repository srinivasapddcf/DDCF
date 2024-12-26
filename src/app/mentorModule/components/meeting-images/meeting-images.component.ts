import { Component, OnInit } from '@angular/core';
import { imagepathModel } from '../../models/bmcu-building-construction.model';
import { LoginService } from 'src/app/login/services/login.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { NgxSpinnerService } from 'ngx-spinner';
 

@Component({
  selector: 'app-meeting-images',
  templateUrl: './meeting-images.component.html',
  styleUrls: ['./meeting-images.component.css']
})
export class MeetingImagesComponent implements OnInit {
  
  imagesList: imagepathModel[] = []; 
  constructor(private landingAPI:LoginService,private spinner: NgxSpinnerService,   private toast: ToasterService,private sanitizer: DomSanitizer, private utils: UtilsService, ) { }

  ngOnInit(): void {
this.LandingImagelistitems();
  } 
  

  async btnsubmit(): Promise<void> {
    try {
       const req={
            TYPE:"5"
       };
      this.imagesList=[];
      const res = await this.landingAPI.LandingImageSub(req);
    if (res.success) {   
      for (let i = 0; i < res.result.length-1; i++) {
        const img=await this.utils.meetinglandingimgFileDownload(res.result[i].IMAGE_PATH);

        this.imagesList.push({
          MEETING_ID:res.result[i].MEETING_ID,
          IMAGE_PATH: res.result[i].IMAGE_PATH,
          STATUS: res.result[i].STATUS,
          LANDIMAGES_TYPE: res.result[i].LANDIMAGES_TYPE, 
          IMAGE: this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' +  img.result) 
        });
      } 
    }
    else{
      this.toast.warning('Today No Meeting Photo Images');
    }
  
    } catch (error) {
      this.toast.warning('Please Select Photo Image');
    }
  }
 

async LandingImagelistitems(): Promise<void> {
    try {
       const req={
            TYPE:"4"
       };
      this.imagesList=[];
      const res = await this.landingAPI.LandingImageSub(req);
    if (res.success) {   
      for (let i = 0; i < res.result.length-1; i++) {
        const img=await this.utils.meetinglandingimgFileDownload(res.result[i].IMAGE_PATH);

        this.imagesList.push({
          MEETING_ID:res.result[i].MEETING_ID,
          IMAGE_PATH: res.result[i].IMAGE_PATH,
          STATUS: res.result[i].STATUS,
          LANDIMAGES_TYPE: res.result[i].LANDIMAGES_TYPE, 
          IMAGE: this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' +  img.result) 
        });
      } 
    }
    else{
      this.toast.warning('Today No Meeting Photo Images');
    }
  
    } catch (error) {
      this.toast.warning('Please Select Photo Image');
    }
  }
 
  
async btnImage(obj): Promise<void> { 
     try {
      if (this.utils.isEmpty(obj.MEETING_ID)) {
        this.toast.warning('Select MEETING_ID');
        return ;
      }

      if (this.utils.isEmpty(obj.IMAGE_PATH)) {
        this.toast.warning('Select IMAGE_PATH');
        return ;
      }

      const req={
        TYPE:"1",
        ID:"0",
        MEETING_ID:obj.MEETING_ID,
        IMAGE_PATH:obj.IMAGE_PATH,
        STATUS:"0",
        LANDIMAGES_TYPE:"1"

   };
  this.imagesList=[];
  this.spinner.show();
  const res = await this.landingAPI.LandingImageSub(req);
  this.spinner.hide();
if (res.success) {   
  this.toast.info(res.message);

}
else{
  this.toast.info("Record Not Inserted");
}
     } catch (error) {
      this.toast.info(error.message);
     }
  }
}
