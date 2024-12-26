import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { McuMappingService } from '../../services/mcu-mapping.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
 
@Component({
  selector: 'app-npddmeetingattendance',
  templateUrl: './npddmeetingattendance.component.html',
  styleUrls: ['./npddmeetingattendance.component.css']
})
export class NpddmeetingattendanceComponent implements OnInit {
  rbkId:any;TRAININGID:any;TID:any;farmercode:any;txt:any;mentorphno:any;ricphno:any;Mentorriclist =[];Techriclist=[];
  minDate: Date;clickone=false;clicktwo=false;  clickthree=false;subhead=false;farmercount:any;appfarmercount:any;
  maxDate: Date;rbkList:[];POlist:[];schedulelist=[];sessionList:[]; filterlist=[];orglist=[];  secondlist=[]; twolist=[];farmerlist=[];
  FARMER_CODE:Boolean=false;
   
  TotalFarmersCount:any;      TotalMilkPouredFarmersCount :any;     InActiveFarmersCount:any;
  secondlist2 = { 
    FARMER_NAME: '',
    VILLAGE_NAME: '', 
    FARMER_CODE: '',
  }
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();

  tOptions1: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger1: Subject<any> = new Subject();

  constructor(private toast: ToasterService,
    private utils: UtilsService,  
    private session: SessionService, 
   // private OfficeModuleAPI: OfficeserviceService, 
    private OfficeModuleAPI: McuMappingService,
    private spinner: NgxSpinnerService, private router: Router,
     ) { }
 
  ngOnInit(): void { 

    if(this.session.uniqueId !="" && this.session.desigId != ""){
      this.txt="0";this.appfarmercount="0";
      //this.Traningscheduledetails();
      this.loadRBKList();

      this.FARMER_CODE=false;
 
  } else {
    this.router.navigate(['/shared/UnAuthorized']);
      }

  }

   
  async TenderDetailsClick(id): Promise<void> {
    try {
        if (id === '1') {
            this.clickone = true;
            this.clicktwo = false;
            this.clickthree=false;
            this.subhead=true;
            this.farmercount=0;
        }
        else if (id === '2') {
            this.clickone = false;
            this.clicktwo = true;
            this.clickthree=false;
            this.subhead=true;
         this.Attendance();
        }
        else if (id === '3') {
          this.clickone = false;
          this.clicktwo = false;
          this.clickthree=true;
          this.subhead=false;
       this.Attendance();
      }

      }
      catch (error) {
        this.spinner.hide();
        this.utils.catchResponse(error);
      }
    }
    async Attendance( ): Promise<void> {
      this.spinner.show(); debugger;
this.twolist;
      this.spinner.hide();
    }
    
  async btnMarkAttendance(obj): Promise<void> {
    try {  
       debugger;
          this.spinner.show();
         // this.secondlist.push(obj.FARMER_CODE); 
          
///////////////////

           if(this.farmercount>=this.appfarmercount) {debugger; this.toast.warning("Approvals Farmers Count"); this.spinner.hide(); return; }
           else{debugger;
            this.schedulelist =  this.schedulelist.filter(item => item.FARMER_CODE !==obj.FARMER_CODE); 
            this.twolist.push({  FARMER_NAME:obj.FARMER_NAME,  VILLAGE_NAME:obj.VILLAGE_NAME,  FARMER_CODE:obj.FARMER_CODE});
            this.farmerlist.push(obj.FARMER_CODE);
            this.farmercount=this.farmerlist.length;
           }
          
          
        this.spinner.hide();
      
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


  async btnRemoveAttendance(obj): Promise<void> {
    try { 
       
          this.spinner.show();
         // this.secondlist.push(obj.FARMER_CODE); 
          this.twolist =  this.twolist.filter(item => item.FARMER_CODE !==obj.FARMER_CODE); 
           this.schedulelist.push({  FARMER_NAME:obj.FARMER_NAME,  VILLAGE_NAME:obj.VILLAGE_NAME,  FARMER_CODE:obj.FARMER_CODE});
           this.farmercount=this.schedulelist.length;
           
          
        this.spinner.hide();
      
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnFind(): Promise<void> {   
    try {  
  
      if (this.utils.isEmpty(this.mentorphno)  && this.utils.isEmpty(this.ricphno) )
      {
        this.toast.warning('Enter Mentor Mobile No / Ric Mobile No'); this.Mentorriclist =[];
        return;
      }
      else
      {  debugger;
          // if(this.mentorphno!="" && this.ricphno!="")
          // this.TraningscheduleMENTORANDRIC_Mobilenodetails( this.mentorphno,this.ricphno,14);
        //  else
           if(this.mentorphno!="")
          this.TraningscheduleMENTORANDRIC_Mobilenodetails(this.mentorphno,'',14);
          else if(this.ricphno!="")
          this.TraningscheduleMENTORANDRIC_Mobilenodetails('',this.ricphno,14);
           else  this.Mentorriclist =[];
      }


} catch (error) {
  this.spinner.hide();
  this.utils.catchResponse(error);
}
}
async TraningscheduleMENTORANDRIC_Mobilenodetails(mentor,ric,typid): Promise<void> {
  try { 
    const req={
      TYPE:typid, 
      INPUT2:ric,
      INPUT1:mentor,
   };
   this.spinner.show();
   this.Mentorriclist =[];
   const res = await this.OfficeModuleAPI.ScheduleAttendanceSelect(req); 
    debugger;
    if (res.success) { 
     // if(typid===1)
      this.Mentorriclist = res.result; 
      // else if(typid===2)
      // this.Techriclist = res.result; 
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

  async onRbkChange(): Promise<void> {
    try { debugger;
      const req={
        TYPE:"7", 
        ROLE:this.session.desigId,
       // UNIQUEID:this.session.uniqueId,
        INSERTEDBY:this.session.userName,
        RIC_MOBILENO:this.session.districtId,
        MENTOR_MOBILENO:this.rbkId,
     };
     this.spinner.show();
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

  async loadRBKList(): Promise<void> {
    try {debugger;
      

      const req = {
        type:8,//2
          ROLE:this.session.desigId,
           UNIQUEID:this.session.uniqueId,
          DISTRICTID:this.session.districtId,
          //id
        // FROMDATE:this.session.getTodayDateString(),
        // TODATE:this.session.getTodayDateString(),
          FRMDATE:this.session.getTodayDateString(),
          TDATE:this.session.getTodayDateString(),

         
      };


      this.spinner.show();
      const response = await this.OfficeModuleAPI.officeTenderPriceSelect(req);//   rbkListByMentorId
      if (response.success) {
       // this.ClearAllControls();
        this.rbkList = response.result;        
        this.rbkId=undefined;
      } else {  this.rbkList =[];
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async TRAININGList(): Promise<void> {
    try {
      
      this.sessionList =[];
      const req = {
        type:'5',//''
          ROLE:this.session.desigId,
         // UNIQUEID:this.session.uniqueId,
          DISTRICTID:this.session.districtId,
          id: this.rbkId,
          COMPID:this.TRAININGID,
        // FROMDATE:this.session.getTodayDateString(),
        // TODATE:this.session.getTodayDateString(),
          FRMDATE:this.session.getTodayDateString(),
         TDATE:this.session.getTodayDateString(),

         
      };


      this.spinner.show();
      const response = await this.OfficeModuleAPI.officeTenderPriceSelect(req);//   rbkListByMentorId
      if (response.success) {
       // this.ClearAllControls();
        this.sessionList = response.result;        
        this.TID=undefined;
      } else {  this.sessionList =[];
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onReloadChange(): Promise<void> {
    
    if (this.utils.isEmpty(this.txt))    {      this.toast.warning('Enter morethan 0 Farmers');      return;    }

    if(this.txt !=undefined )
    this.filterlist =  this.orglist.filter(item =>  this.orglist.length > 0).slice(0, this.txt)
    this.schedulelist=this.filterlist; 
  }
  
     
  async onScheduleChange(): Promise<void> {
       
   try {
    if (this.utils.isEmpty(this.rbkId))    {      this.toast.warning('Select RSK');      return;    }
    else if (this.utils.isEmpty(this.TRAININGID))    {      this.toast.warning('Select Schedule Testing');      return;    }
    else
    {  debugger;
      this.schedulelist=[];
      const req={
        type:"43", //43  //52
        ID:this.TRAININGID,
        FORMID:this.TID,
        ROLE:this.session.desigId,
        UNIQUEID:this.session.uniqueId,
        DISTRICTID:this.session.districtId,
        POID:this.rbkId
     };
     this.spinner.show();debugger;
     const res = await this.OfficeModuleAPI.office_po_select(req); 
     this.spinner.hide();   this.spinner.hide();
      if (res.success) { 
        debugger;
        this.twolist=[];this.orglist=[];
        this.schedulelist=[];this.secondlist =[];   
        this.farmerlist=[];
      this.orglist=res.result; 
        this.schedulelist = res.result; 
this.appfarmercount=res.result[0].FARMER_COUNT;
this.spinner.hide();
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    }
   } catch (ex) {
    
   }     
      
  }







  
  async btnSubmit(): Promise<void> {
    try {debugger;

      if (this.utils.isEmpty(this.rbkId))    {      this.toast.warning('Select RSK');      return;    }
      else if (this.utils.isEmpty(this.TRAININGID))    {      this.toast.warning('Select Schedule Training');      return;    }
      else if (this.utils.isEmpty(this.TID))    {      this.toast.warning('Select Schedule Meeting');      return;    }
      else
      {  debugger;
        // let  string = this.farmerlist.join(',');
         
        const req={
          TYPE:"1",  ID:"0",
          MEETINGID:this.TID,
          SCHEDULE_TRAINING_TYPE_ID:this.TRAININGID,
          RBKID:this.rbkId,
          INPUT1:this.farmerlist.join(','),
          ROLE:this.session.desigId,
          UNIQUEID:this.session.uniqueId,
          DISTRICTID:this.session.districtId,
          INSERTEDBY:this.session.userName,
          SESSION_ID:"0",
          STATUS:"0", 
       };
      // ScheduleAttendanceSub
  // ScheduleAttendanceSelect

 this.spinner.show();
     const res = await this.OfficeModuleAPI.ScheduleAttendanceSub(req); 
     this.spinner.hide();  
      if (res.success) { 
        this.toast.success(res.message); 
        this.twolist=[];this.orglist=[];
        this.schedulelist=[];this.schedulelist =[];
        this.onScheduleChange();
      }
      else
      {
        this.toast.warning(res.message); 
      }
    }

    } catch (ex) {
      
    }
  }


}
 