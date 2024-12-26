import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner'; 
import { DatePickerService } from 'src/app/shared/services/date-picker.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import Swal from 'sweetalert2';
import { OfficeserviceService } from '../../services/officeservice.service';
 

@Component({
  selector: 'app-podetails',
  templateUrl: './podetails.component.html',
  styleUrls: ['./podetails.component.css']
})
export class PodetailsComponent implements OnInit {
  //[x: string]: any;
  minDate: Date;
  maxDate: Date;

  scheduleData = {
    districtId: '',
    mandalId: '',
    mentorId: '',
    rbkId: '',
    villageId: '',
    meetingVenue: '',
    meetingVenueAddress: '',
    meetingDate: '',
    meetingTime: '',
    meetingAgenda: '',
    insertedBy: '',
    source: '',
  };

  districtListdata=[];
  formdata=[];
  componentListdata=[];

  minMonth: any;
  Month: any;
  Year: any;
  Details_div=true;
  Details_div_back=false;
   RBKDDSelected:any;
    
  
   
//todos:any[]=[];  
  constructor(
    private toast: ToasterService,
    private utils: UtilsService,
    private logger: LoggerService, 
    private session: SessionService, 
    private OfficeModuleAPI: OfficeserviceService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private datePicker: DatePickerService 
     
  ) {
    this.minDate = this.session.getTodayDate();
    this.maxDate = this.session.getMaxScheduleDate();
  }
   selectedLevel
   Totalvalues=0;
   Totals=0;
   Totals1=0;
   DamageStock=0;
   selectedText: any;
   typeofpayname: any;

   PurchaseOrder = {
    Districtid:'',
    DistrictName:'',
  PurchaseOrderDate:'',
  Order:'',
  Units:'',
  TotalRate:'',
        


  };
  
  DistrictList:any[]=[];
  purchargeOrderList:any[]=[];
  RequestStockpointList:any[]=[];
  QuantityList:any[]=[];
  StockCount:any[]=[];
  AddDetailsview=false;
  AddDetailsview_div=false;
  submitbtn=false;
  Addbtnarray=true;
  PurchageorderIns_div=true;
  OrderDetailsview_div=false;


  ngOnInit(): void {
     
     this.DistrictLists(); 
     this.FormLists();
     this.onDISTRICtChange();
  }


  async DistrictLists(): Promise<void> {
    try {     
      const reqdistrict={
        type:"1"
      }  
      const res = await this.OfficeModuleAPI.office_po_select(reqdistrict); 
      if (res.success) { 
        this.districtListdata = res.result; 
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async FormLists(): Promise<void> {
    try {     
      const reqdistrict={
        type:"2"
      }  
      const res = await this.OfficeModuleAPI.office_po_select(reqdistrict); 
      if (res.success) { 
        this.formdata = res.result; 
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  


  async onDISTRICtChange1(): Promise<void> {
  
    try {     

      if (this.utils.isEmpty(this.RBKDDSelected)) {
        this.toast.warning('Please select District');         
        return;
      } 
      const reqdistrict={
        type:"5",
        DISTRICTID:this.RBKDDSelected,

      }  
      const res = await this.OfficeModuleAPI.office_po_select(reqdistrict); 
      if (res.success) { 
        this.componentListdata = res.result; 
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


  



  async onDISTRICtChange(): Promise<void> {
  
    try {     
  
      const reqdistrict={
        type:"5",
         DISTRICTID:this.session.districtId,

      }  
      const res = await this.OfficeModuleAPI.office_po_select(reqdistrict); 
      if (res.success) { 
        this.componentListdata = res.result; 
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }





  orderDetails(){
    this.PurchageorderIns_div=false;
  this.OrderDetailsview_div=true;
  this.Details_div=false;
  this.Details_div_back=true;


  }
  

//   async Purcharfeorder_details():Promise<void>{
//     this.spinner.show();
//     try {
//   const req = {      
//     type:'2'
            
//   }; 
 
//   const res = await this.PaymentAPI.PurchaseOrderInsert(req);
//   this.spinner.hide();
   

//   if (res.success) {
//     this.purchargeOrderList = res.result; 
//   }
//   else{
//     Swal.fire("error","District Details Not Found","error");
//   }
  
// } catch (error) {
//   this.spinner.hide();
//   this.utils.catchResponse(error);
// }


// }
  async StockChange(DistCode):Promise<void>{
    let obj = this.districtListdata.find(data=>data.DIST_CODE==DistCode);
    this.PurchaseOrder.DistrictName=obj.DIST_NAME;
    this.PurchaseOrder.Districtid=obj.DIST_CODE; 
}
 
// AddPacketDetails(){

//   if (this.validate()) {
    
//    // debugger;
//     //alert(this.selectedText);
   
//     var sum=this.Totalvalues;
//     this.Totalvalues = Number(this.PurchaseOrder.Units)*Number(this.PurchaseOrder.TotalRate);
    
//     this.Addbtnarray=true;
//     this.todos.push({  
//       content:this.PurchaseOrder.DistrictName,content1:this.PurchaseOrder.PurchaseOrderDate,content2:this.PurchaseOrder.Order,content3:this.PurchaseOrder.TotalRate,content4:this.PurchaseOrder.Units, content5:this.Totalvalues,content6:this.PurchaseOrder.Districtid,content7:this.session.userName,content8:this.session.mobileNumber
//       // completed:false,  
      
//     });

//   console.log(this.todos);
//   this.PurchaseOrder.Districtid="";
//   this.PurchaseOrder.PurchaseOrderDate="";
//   this.PurchaseOrder.Order="";
//   this.PurchaseOrder.Units="";
//   this.PurchaseOrder.TotalRate="";
  
//   console.log(this.todos);
//   this.AddDetailsview_div=true;
//   this.submitbtn=true;
//  }
// }

// Deletepacket(id:number){

//   this.todos = this.todos.filter((v , i) => i !==id); 
// }

validate(): boolean {
  if (this.utils.isEmpty(this.PurchaseOrder.DistrictName)) {
    this.toast.warning('Please Select District');
    return false;
  }

  if (this.utils.isEmpty(this.PurchaseOrder.PurchaseOrderDate)) {
    this.toast.warning('Please Select Order Date');
    return false;
  }
  if (this.utils.isEmpty(this.PurchaseOrder.Order)) {
    this.toast.warning('Please Enter Order Number');
     
    return false;
  }
  if (this.utils.isEmpty(this.PurchaseOrder.Units)) {
    this.toast.warning('Please Enter Number Of Units');
     
    return false;
  }
  if (this.utils.isEmpty(this.PurchaseOrder.TotalRate)) {
    this.toast.warning('Please Enter Rate Per Unit');
     
    return false;
  }

  return true;
} 

// async btnSubmitDetails():Promise<void>{
 

//     if(this.todos.length>0)
//   {
//   console.log()

//     this.spinner.show();
//     const res = await this.PaymentAPI.PurchaseOrderInsert(this.todos);
//     this.spinner.hide();
//     debugger;

//     if (res.success) {
    
//   this.AddDetailsview=false;
//   this.submitbtn = false;
 
//       Swal.fire("success","Purchage order Data Successfully ....!","success");
//     }
//     else{
//       Swal.fire("info","Purchage order Failed ....!","info");
//     }
//     }
//     window.location.reload(); 
// }
 
orderDetails_back(){
 this.Details_div=true;
  this.Details_div_back=false;
   this.PurchageorderIns_div=true;
  this.OrderDetailsview_div=false;
}
 
}
