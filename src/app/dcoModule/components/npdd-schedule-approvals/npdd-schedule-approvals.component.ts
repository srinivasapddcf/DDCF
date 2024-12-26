import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { McuMappingService } from 'src/app/mentorModule/services/mcu-mapping.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-npdd-schedule-approvals',
  templateUrl: './npdd-schedule-approvals.component.html',
  styleUrls: ['./npdd-schedule-approvals.component.css']
})
export class NpddScheduleApprovalsComponent implements OnInit {
  TRAININGID:any;POlist=[];
  SocietyMilkCollectonList=[];   rbklist  =[]; rbkID:any;
  excelData=[];
  Status:any;
  constructor(private toast: ToasterService, 
    private utils: UtilsService,  
    private session: SessionService,  
   // private OfficeModuleAPI: OfficeserviceService, 
    private OfficeModuleAPI: McuMappingService,
    private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void { 
    
    if(this.session.uniqueId !="" && this.session.desigId != ''){ 
      this.Traningscheduledetails();this.rbkdetails();
    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
  }


  
  async rbkdetails(): Promise<void> { 
    try { debugger;
      const req={
        TYPE:"18", 
        INPUT1: this.session.districtId,
     };
     this.spinner.show(); this.rbklist =[];
     const res = await this.OfficeModuleAPI.ScheduleAttendanceSelect(req); 
     this.spinner.hide();  
      if (res.success) { 
        this.rbklist = res.result;
    this.rbkID=undefined ;
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




  async  Traningscheduledetails(): Promise<void> { 
    try { debugger;
      const req={
        TYPE:"6", 
        INPUT1: this.session.districtId,
        INPUT2: this.rbkID,
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
   try {
    this.SocietyMilkCollectonList =[];
   } catch (ex) {
    
   }
   
 
  }
async btnFind(): Promise<void> {

  //console.log(this.TRAININGID);
  try {    debugger;

    if (this.utils.isEmpty(this.rbkID))
    {
      this.toast.warning('Select RSK');
      return;
    }
    if (this.utils.isEmpty(this.TRAININGID))
    {
      this.toast.warning('Select Schedule Training');
      return;
    }

      this.SocietyMilkCollectonList = []
      const req = {
          type: "7",
          INPUT1:this.TRAININGID,  //this.session.districtId   trainingid
          INPUT2:this.rbkID,

      }
      this.spinner.show();
      const res = await this.OfficeModuleAPI.ScheduleAttendanceSelect(req); 
      if (res.success) {
          this.spinner.hide();
          this.SocietyMilkCollectonList = res.result; 
          this.excelData = this.SocietyMilkCollectonList; 
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
 debugger;
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

    if (obj.Status===undefined)//    (this.utils.isEmpty(this.Status))
    {
      this.toast.warning('Select Status');
      return;
    }
 
const req={
  TYPE:'11',
  MEETINGID:obj.TID,
  SCHEDULE_TRAINING_TYPE_ID:this.TRAININGID,
  STATUS:obj.Status,
ROLE:this.session.desigId,
UNIQUEID:this.session.uniqueId,
INSERTEDBY:this.session.userName

}; 
this.spinner.show();
const res = await this.OfficeModuleAPI.ScheduleApprvalsSub(req); 
if (res.success) {
    this.spinner.hide();
    this.toast.success(res.message);
    this.Traningscheduledetails();
    this.SocietyMilkCollectonList = []
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