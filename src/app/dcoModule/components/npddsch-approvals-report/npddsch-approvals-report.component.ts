import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { McuMappingService } from 'src/app/mentorModule/services/mcu-mapping.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-npddsch-approvals-report',
  templateUrl: './npddsch-approvals-report.component.html',
  styleUrls: ['./npddsch-approvals-report.component.css']
})
export class NpddschApprovalsReportComponent implements OnInit {
  TRAININGID:any;SocietyMilkCollectonList=[];POlist=[];
  constructor(private toast: ToasterService,
    private utils: UtilsService,  
    private session: SessionService, 
   // private OfficeModuleAPI: OfficeserviceService, 
    private OfficeModuleAPI: McuMappingService,
    private spinner: NgxSpinnerService, private router: Router) { }
 
  ngOnInit(): void {

    this.Traningscheduledetails();
  }
  async Traningscheduledetails(): Promise<void> { 
    try { debugger;
      const req={
        TYPE:"13", 
        INPUT1: this.session.districtId,
     };
     this.spinner.show();
     const res = await this.OfficeModuleAPI.ScheduleAttendanceSelect(req); 
     this.spinner.hide();  
      if (res.success) { 
        this.POlist = res.result; 
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    }
    catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

async onScheduleChange(): Promise<void> {
  //console.log(this.TRAININGID);
  try {    debugger;
      this.SocietyMilkCollectonList = []
      const req = {
          type: "12",
          INPUT1:this.TRAININGID,  //this.session.districtId   trainingid

      }
      this.spinner.show();
      const res = await this.OfficeModuleAPI.ScheduleAttendanceSelect(req); 
      if (res.success) {
          this.spinner.hide();
          this.SocietyMilkCollectonList = res.result; 
          
      } else {
          this.spinner.hide();
          this.toast.warning(res.message);
      }
      //this.rerender();
  } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
  }
}

async btnSubmit(obj): Promise<void> {
 
   try {
    if (this.utils.isEmpty(obj.TID))
    {
      this.toast.warning('Select Schedule Testing');
      return;
    }
    if (this.utils.isEmpty(this.TRAININGID))
    {
      this.toast.warning('Select Schedule Testing');
      return;
    }

    // if (this.Status===undefined)//    (this.utils.isEmpty(this.Status))
    // {
    //   this.toast.warning('Select Status');
    //   return;
    // }
 
const req={
  TYPE:'11',
  MEETINGID:obj.TID,
  SCHEDULE_TRAINING_TYPE_ID:this.TRAININGID,
 // STATUS:this.Status,
ROLE:this.session.desigId,
UNIQUEID:this.session.uniqueId,
INSERTEDBY:this.session.userName

}; 
this.spinner.show();
const res = await this.OfficeModuleAPI.ScheduleApprvalsSub(req); 
if (res.success) {
    this.spinner.hide();
    this.toast.success(res.message);
  } else {
    this.spinner.hide();
    this.toast.warning(res.message);
}
     
    

} catch (error) {
  this.spinner.hide();
  this.utils.catchResponse(error);
}
}


}
