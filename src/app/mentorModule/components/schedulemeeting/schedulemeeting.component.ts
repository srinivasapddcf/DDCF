import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
 
import { Router } from '@angular/router';
import { McuMappingService } from '../../services/mcu-mapping.service';
import { min } from 'moment';

@Component({
  selector: 'app-schedulemeeting',
  templateUrl: './schedulemeeting.component.html',
  styleUrls: ['./schedulemeeting.component.css']  
})
export class SchedulemeetingComponent implements OnInit { 
  TRAININGID:any;POlist:[];Mentorriclist:[];Techriclist:[]; ricphno:any;mentorphno:any;
  ft=false;st=false;bt=false;trainingdate:any;trainingtime:any;Venu:any;Address:any;technicionphno:any;ssricphno:any;
  trainingAddress:any;bmcuname:any;bmcuphno:any;bmcudesignation:any;bmcuemailid:any;trainingvenu:any;rbkId:any;
  minDate: Date;
  maxDate: Date;rbkList:[];previousedetailslist:[];fcnt:any;
 farmorcount:any;farmorcountvalue:any;
 TotalFarmersCount:any;      TotalMilkPouredFarmersCount :any;     InActiveFarmersCount:any;
  // dtTrigger: Subject<any> = new Subject(); 
  // pendtTrigger: Subject<any> = new Subject(); 
  constructor(private toast: ToasterService, 
    private utils: UtilsService,  
    private session: SessionService, 
   // private OfficeModuleAPI: OfficeserviceService, 
    private OfficeModuleAPI: McuMappingService,
    private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {debugger; //this.setTomorrowAsMinDate();  //this.minDate= this.session.getTodayDate();
    if(this.session.uniqueId !="" && this.session.desigId != ""){
    this.ClearAllControls();
    //this.Traningscheduledetails();
    this.loadRBKList();this.minDate=this.session.getTodayDate();
//this.trainingdate=this.session.getTodayDateString();
} else {
  this.router.navigate(['/shared/UnAuthorized']);
    }
  }

  setTomorrowAsMinDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow;
    this.trainingdate=tomorrow;
      
  }

   
   async onRbkChange(): Promise<void> {
try {
  this.Traningscheduledetails();  
} catch (error) {
  
}
   }

  async Traningscheduledetails(): Promise<void> {
    try { debugger;

      if (this.utils.isEmpty(this.rbkId))
      {
        this.toast.warning('Select Rsk'); return;
      }
 
       

      const req={
        TYPE:"1", 
        MENTOR_MOBILENO:this.rbkId
     };debugger;
     this.spinner.show();   // OFF_TRAINING_SCHDL_DTS
     const res = await this.OfficeModuleAPI.officescheduletestingSelect(req); 
     this.spinner.hide();  
      if (res.success) { 
        this.POlist = res.result; 
        this.TotalFarmersCount   = res.result[0].FARMER_COUNT; 
        this.TotalMilkPouredFarmersCount  = res.result[0].MILKPOURED_COUNT;
        this.InActiveFarmersCount  = res.result[0].INACTIVE_COUNT;



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

  async Previousescheduledetails(): Promise<void> {
    try {  

      if (this.utils.isEmpty(this.rbkId)  && this.utils.isEmpty(this.TRAININGID) )
      {
        this.toast.warning('Select Rsk / Select Training '); this.Mentorriclist =[];
        return;
      }
this.previousedetailslist=[];
      const req={
        TYPE:"8", 
        RIC_MOBILENO:this.rbkId,
        MENTOR_MOBILENO:this.TRAININGID,
        ROLE:this.session.desigId,
     };
     this.spinner.show();
     const res = await this.OfficeModuleAPI.officescheduletestingSelect(req); 
     this.spinner.hide();  
      if (res.success) { 
         this.previousedetailslist = res.result; 
      } else { debugger;
       // this.toast.info(res.message);
      }
      this.spinner.hide();
    }
    catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


  async loadRBKList(): Promise<void> {
    try {
      const req = {
        uniqueId:  this.session.rbkGroupId,
      };
      this.spinner.show();
      const response = await this.OfficeModuleAPI.rbkListByMentorId(req);
      if (response.success) {
        this.ClearAllControls();
        this.rbkList = response.result;        
        this.rbkId=undefined;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  // async TraningscheduleMENTOR_Mobilenodetails()  {
  //   try {   
  //     const req={
  //       TYPE:"2", 
  //       MENTOR_MOBILENO:this.mentorphno,
  //    };
  //    this.spinner.show();
  //    const res = await this.OfficeModuleAPI.officescheduletestingSelect(req); 
     
  //     if (res.success) { 
  //       this.Mentorriclist = res.result; 
  //     } else {
  //       this.toast.info(res.message);
  //     }
  //     this.spinner.hide();
  //   }
  //   catch (error) {
  //     this.spinner.hide();
  //     this.utils.catchResponse(error);
  //   }
  // }

  // async TraningscheduleRic_Mobilenodetails(ID): Promise<void> {
  //   try { 
  //     const req={
  //       TYPE:ID, 
  //       RIC_MOBILENO:this.ricphno,
  //    };
  //    this.spinner.show();
  //    const res = await this.OfficeModuleAPI.officescheduletestingSelect(req); 
      
  //     if (res.success) { 
  //       this.Mentorriclist = res.result; 
  //     } else {
  //       this.toast.info(res.message);
  //     }
  //     this.spinner.hide();
  //   }
  //   catch (error) {
  //     this.spinner.hide();
  //     this.utils.catchResponse(error);
  //   }
  // }

  async TraningscheduleMENTORANDRIC_Mobilenodetails(ID,mentor,ric,typid): Promise<void> {
    try { 
      const req={
        TYPE:ID, 
        RIC_MOBILENO:ric,
        MENTOR_MOBILENO:mentor,
        INSERTEDBY:this.rbkId,
     };
     this.spinner.show();
     this.Mentorriclist =[];
     const res = await this.OfficeModuleAPI.officescheduletestingSelect(req); 
      debugger;
      if (res.success) { 
        if(typid===1)
        {this.Mentorriclist = res.result; if( res.result[0].FMR_CNT!="")this.farmorcountvalue=res.result[0].FMR_CNT ; this.farmorcount="Total Farmers  Count="+res.result[0].FMR_CNT; }
        else if(typid===2)
        {this.Techriclist = res.result; if( res.result[0].FMR_CNT!="") this.farmorcountvalue=res.result[0].FMR_CNT ; this.farmorcount="Total Farmers  Count="+res.result[0].FMR_CNT; }
     this.Previousescheduledetails();
      } else {debugger;
        this.toast.info(res.message);
      }
      this.spinner.hide();
    }
    catch (error) {debugger;
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


  async onScheduleChange(): Promise<void> {
    try {  
        
       if (this.utils.isEmpty(this.TRAININGID))
       {
         this.toast.warning('Select Schedule Testing');
         return;
       }
       else
       {  
        if(this.TRAININGID==="1"){this.ft=true;this.st=false;this.bt =false;}
        else if(this.TRAININGID==="2"){this.ft=false;this.st=true;this.bt =false;this.ricphno=this.ssricphno;}
        else if(this.TRAININGID==="3"){this.ft=false;this.st=false;this.bt =true;}
        else if(this.TRAININGID==="4"){this.ft=false;this.st=false;this.bt =true;}
        else {this.ft=false;this.st=false;this.bt =false;}

      // this.TraningscheduleMENTOR_Mobilenodetails();

         
       }
       

              
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

   ClearAllControls()
  {
    try {
      this.mentorphno='';    this.ricphno='';  this.Mentorriclist=[];  this.rbkList=[];    this.rbkId='';   
      //this.trainingdate=this.session.getTodayDateString();
     this.trainingtime='';this.trainingvenu='';this.trainingAddress='';
     this.technicionphno='';this.ssricphno=''; 
     this.bmcuname='';this.bmcudesignation='';this.bmcuemailid='';this.bmcuphno='';this.fcnt='';
    // this.loadRBKList();
    } catch (error ) {   
      
    } 
  } 

  async btnSubmit(): Promise<void> {
    try {  
if(this.Validate())
{ 
  
      const reqdistrict={

            TYPE:"1",
            ID:this.rbkId,
            TID:this.fcnt,
            TRAININGID:this.TRAININGID,
            MENTOR_MOBILENO:this.mentorphno,
            RIC_MOBILENO:this.ricphno,
            Technician_MOBILENO:this.technicionphno,
            BMC_NAME:this.bmcuname,
            BMCU_MOBILENO:this.bmcuphno,
            BMCU_DESIG:this.bmcudesignation,
            BMCU_EMAILID:this.bmcuemailid,
            TRAINING_DATE:this.trainingdate,
            TRAINING_TIME:this.trainingtime,
            NAMEOF_TRAININGPLACE:this.trainingvenu,
            AADRESS:this.trainingAddress ,
            ROLE:this.session.desigId,
            UNIQUEID:this.session.uniqueId,
            INSERTEDBY:this.session.userName       

      } ;
      this.spinner.show(); 
      const res =  await this.OfficeModuleAPI.officescheduletestingSub(reqdistrict); 
      this.spinner.hide();
      if (res.success) { 
      //  this.toast.success(res.result[0].MSG);
        this.toast.success(res.message);
       // this.Previousescheduledetails();
       

         this. ClearAllControls();
        window.location.reload();
      } else {
        this.toast.warning(res.message);
      }
      this.spinner.hide();

    }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  

  async btnSSFind(): Promise<void> {
    try {  
  
      if (this.utils.isEmpty(this.technicionphno)  && this.utils.isEmpty(this.ssricphno) )
      {
        this.toast.warning('Enter Technicion Mobile No / Ric Mobile No'); this.Techriclist =[];
        return;
      }
      else
      {  
        if(this.technicionphno!="" && this.ssricphno!="")
        this.TraningscheduleMENTORANDRIC_Mobilenodetails(6,this.technicionphno,this.ssricphno,2);
          else if(this.technicionphno!="")
           this.TraningscheduleMENTORANDRIC_Mobilenodetails(5,this.technicionphno,this.ssricphno,2);
          else if(this.ssricphno!="")
          this.TraningscheduleMENTORANDRIC_Mobilenodetails(3,this.technicionphno,this.ssricphno,2);
          else  this.Techriclist =[];
      }


} catch (error) {debugger;
  this.spinner.hide();
  this.utils.catchResponse(error);
}
}


  async btnFind(): Promise<void> {
    try {  
  
      if (this.utils.isEmpty(this.mentorphno)  || this.utils.isEmpty(this.ricphno) )
      {
        this.toast.warning('Enter Mentor Mobile No / Ric Mobile No'); this.Mentorriclist =[];
        return;
      }
      else
      {  
        if(this.mentorphno!="" && this.ricphno!="")
        this.TraningscheduleMENTORANDRIC_Mobilenodetails(4,this.mentorphno,this.ricphno,1);
          else if(this.mentorphno!="")
           this.TraningscheduleMENTORANDRIC_Mobilenodetails(2,this.mentorphno,this.ricphno,1);
          else if(this.ricphno!="")
          this.TraningscheduleMENTORANDRIC_Mobilenodetails(3,this.mentorphno,this.ricphno,1);
          else  this.Mentorriclist =[];
      }


} catch (error) {debugger;
  this.spinner.hide();
   this.utils.catchResponse(error);
}
}


Validate():boolean{
  try {
    if (this.utils.isEmpty(this.rbkId))
    {
      this.toast.warning('Select RSK');
      return;
    }
    if (this.utils.isEmpty(this.TRAININGID))
    {
      this.toast.warning('Select Training Type');
      return;
    } 
    debugger;
    if(this.TRAININGID==="1"){ 
      if (this.utils.isEmpty(this.mentorphno.trim()) &&  this.utils.isEmpty( this.ricphno.trim()) )
{this.toast.warning('Enter Mentor or Ric Mobile No');return;}
      //  if (this.utils.isEmpty(this.mentorphno.trim()))
      //   {
      //     this.toast.warning('Enter Mentor Mobile No');
      //     return;
      //   }
      //   if (this.utils.isEmpty( this.ricphno.trim()))
      //   {
      //     this.toast.warning('Enter RIC Mobile No');
      //     return;
      //   } 

if(this.utils.isEmpty(this.trainingdate.trim())){ this.toast.warning('Select Training  Date');return;   }
if(this.utils.isEmpty(this.trainingtime.trim())){ this.toast.warning('Select Training  Time');return;   }

debugger;
if(parseInt(this.fcnt)>parseInt(this.farmorcountvalue))
{
  this.toast.warning('Total Farmer count='+this.farmorcountvalue  +" Enter below Total Farmer Count ");
          return;
}
if(this.fcnt>30)
{
  this.toast.warning('Enter Farmer count='+this.fcnt  +" Enter below or equal 30 Farmer Count ");
          return;
}
if(this.fcnt<20)
{
  this.toast.warning('Enter Farmer count='+this.fcnt  +" Enter equal and above 20 Farmer Count ");
          return;
}
if(this.utils.isEmpty(this.trainingvenu.trim())){  this.toast.warning('Enter Venue ');          return;}

if(this.utils.isEmpty(this.trainingAddress.trim())){  this.toast.warning('Enter Address ');          return;}




    }
    else if(this.TRAININGID==="2")
    {   
        if (this.utils.isEmpty(this.technicionphno.trim()))
        {
          this.toast.warning('Enter Technician Mobile No');
          return;
        }
        if (this.utils.isEmpty( this.ssricphno.trim()))
        {
          this.toast.warning('Enter RIC Mobile No');
          return;
        }

    }
    else if(this.TRAININGID==="3" || this.TRAININGID==="4" )
    { 

      if (this.utils.isEmpty( this.bmcuname.trim()))
        {
          this.toast.warning('Enter Name');
          return;
        }
        if (this.utils.isEmpty( this.bmcuphno.trim()))
        {
          this.toast.warning('Enter Mobile No');
          return;
        }
        if (this.utils.isEmpty( this.bmcudesignation.trim()))
        {
          this.toast.warning('Enter Designation');
          return;
        }
        if (this.utils.isEmpty( this.bmcuemailid.trim()))
        {
          this.toast.warning('Enter Email ID');
          return;
        }


    }
       
if (this.utils.isEmpty(this.trainingdate))
    {
      this.toast.warning('Select Training Date');
      return;
    }
    if (this.utils.isEmpty(this.trainingtime))
    {
      this.toast.warning('Enter training Time');
      return;
    }
    if (this.utils.isEmpty(this.trainingvenu.trim()))
    {
      this.toast.warning('Enter training Venu');
      return;
    }
    if (this.utils.isEmpty(this.trainingAddress.trim()))
    {
      this.toast.warning('Enter training Address');
      return;
    }

return true;

} catch (error) {
  
}
}




}
