import { Component, OnInit, ViewChild } from '@angular/core'; 
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { McuMappingService } from 'src/app/mentorModule/services/mcu-mapping.service';
import { ToasterService } from '../../services/toaster.service';
import { UtilsService } from '../../services/utils.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-credentials-update',
  templateUrl: './credentials-update.component.html',
  styleUrls: ['./credentials-update.component.css']
})
export class CredentialsUpdateComponent implements OnInit {

  replacestr:any;
  TYPELIST:any[]=[];
  DESIGNATIONLIST:any[]=[];
  ROUTELIST:any[]=[];
  PHASELIST:any[]=[];
  LOGINDETAILSLIST:any[]=[];
  LOGINDETAILSLIST1:any[]=[];
  LOGINDETAILSLIST2:any[]=[];
  SMSSENDMAINLIST:any[]=[];
  SUBMITLIST:any[]=[];
  tablehide=false;

  routename=false;
  mandalname=false;
  RBKname=false;


  SMSSENDLIST=
   { 
    LOGIN_TYPE:"",
    LOGIN_PURPOSE:"",
    USER_NAME:"",
    PASSWORD:"",
    URL:"",
    MOBILE_NUMBER:"",    
    TYPE_CODE:"",
    DIST_CODE:"",
    MANDAL_CODE:"",
    RBK_CODE:"",
    ROUTE_NO:"",
    DESIGNATION:"",    
    DESIG_ID:"",
    UPDATED_BY:"",   
    NUM:"",
    VAR:"",
    VAR1:"",
    NUM1:"",
    VAR2:"",
  };
  typeid:any;
  userId:any;
  Designation:any;
  Routeid:any;
  phaseid:any;
  designname:any;
  designid:any;
  selectedItemId:any; 
  mentor=false;
  mtr1=false;
  vadawea=false;
  mpdo=false;
  rbkcolumn=false;
  mandalcolumn=false;
  routecolumn=false; 
  strcompid:any
  mobilenumber:any



  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();
  
  constructor(
    private session:SessionService,
    private router: Router,
    private spinner:NgxSpinnerService,
    private smsapi:McuMappingService,
    private toast:ToasterService,
    private utils:UtilsService
  ) { }

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ""){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    this.loadtypelist();    
  }

  async loadtypelist():Promise<void>{
   try {

    this.TYPELIST=[];
    const req={
      TYPE:"1",
    } 
    debugger;
    this.spinner.show();
    const response = await this.smsapi.SmsSendingCredGet(req);
    this.spinner.hide();
    if(response.success){
      this.TYPELIST=response.result;
    }
    else{
        this.toast.info(response.message)
     } 
       
   } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
   }
  }
  async ontypechange():Promise<void>{
   try {

    this.DESIGNATIONLIST=[];
    const req={
      TYPE:"2",
      TYPE_CODE:this.typeid,
    } 
    debugger;
    this.spinner.show();
    const response = await this.smsapi.SmsSendingDetailsGet(req);
    this.spinner.hide(); 
    if(response.success){
      this.DESIGNATIONLIST=response.result; 

    //  const idToNameMap = this.DESIGNATIONLIST.reduce((acc, response.result) => {
    //     acc[item.id] = item.name;
    //     return acc;
    //   }, {});
    }
    else{
      //  this.toast.info(response.message)
     }   
    
   } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
   }
  }
  async onDesignchange():Promise<void>{  
    
    const selectedItem = this.DESIGNATIONLIST.find(DESIGNATIONLIST => DESIGNATIONLIST.DESIG_ID === this.Designation);
    
    this.designname=selectedItem.DESIGNATION;
   try {  
    this.ROUTELIST=[];
    const req={
      TYPE:"3",
      TYPE_CODE:this.typeid,
      DIST_CODE:this.session.districtId,
    } 
    debugger;
    this.spinner.show();
    const response = await this.smsapi.SmsSendingCredGet(req);
    this.spinner.hide();
    if(response.success){
      this.ROUTELIST=response.result;
      this.Routeid=undefined;
      this.phaseid=undefined;
    }
    else{
      //  this.toast.info(response.message)
     }   
    //  let obj=document.getElementById('Designation');
    // this.designname=obj[this.Designation].innerHtml;  

    
   } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
   }
  }
  async onRoutechange():Promise<void>{
   try {

    this.PHASELIST=[];
    const req={
      TYPE:"4",
      TYPE_CODE:this.typeid,
      DIST_CODE:this.session.districtId,
      ROUTE_NO:this.Routeid
    } 
    debugger;
    this.spinner.show();
    const response = await this.smsapi.SmsSendingDetailsGet(req);
    this.spinner.hide();
    if(response.success){
      this.PHASELIST=response.result;
      this.phaseid=undefined;
    }
    else{
      //  this.toast.info(response.message)
     }   
   } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
   }
  }



  async btnFind():Promise<void>{
    try {

      if(this.typeid == null || this.typeid == undefined || this.typeid == "" ){
        this.toast.info("please select User Type"); return;
      }

      if(this.typeid=="1")
        { 
          if(this.userId == null || this.userId == undefined || this.userId == "" ){
            this.toast.info("please Enter User Id"); return;
          } 
        }
      else if(this.typeid=="2"){
            if(this.Designation == null || this.Designation == undefined || this.Designation == "" ){
              this.toast.info("please select Designation");return;
            }
            if(this.Routeid == null || this.Routeid == undefined || this.Routeid == "" ){
              this.toast.info("please select Route");return;
            }
            if(this.phaseid == null || this.phaseid == undefined || this.phaseid == "" ){
              this.toast.info("please select Phase");return;
            } 
          }
          else
         { this.toast.info("please Select User type"); return;}

     this.LOGINDETAILSLIST=[];
     const req={
      TYPE:"5",
      TYPE_CODE:this.typeid,
      DIST_CODE:this.session.districtId,
      ROUTE_NO:this.Routeid,
      PHASE_CODE:this.phaseid,
      DESIG_ID:this.Designation,
      DESIGNATION:this.designname,  
      USER_NAME :this.userId,
      VAR1:this.session.userName,
      NUM:this.session.uniqueId,
      NUM1:this.session.desigId, 
    }
     debugger;
     this.spinner.show(); 
     const response = await this.smsapi.SmsSendingCredGet(req);
     this.spinner.hide();
     if(response.success){

     
      if(this.Designation ==='101')  {    
        this.LOGINDETAILSLIST=response.result; 
        this.LOGINDETAILSLIST1=[];
        this.LOGINDETAILSLIST2=[];
        this.rerender(); 

      //  this. routename=true;
      //  this.mandalname=false;
      //  this.RBKname=false; 
      } 
      else if(this.Designation ==='105' ||this.Designation ==='106'  )   {   
        this.LOGINDETAILSLIST1=response.result; 
        this.LOGINDETAILSLIST=[];
        this.LOGINDETAILSLIST2=[];
        this.rerender(); 

        // this. routename=false;
        // this.mandalname=true;
        // this.RBKname=false;
      }
      else  {   
        this.LOGINDETAILSLIST2=response.result; 
        this.LOGINDETAILSLIST=[];
        this.LOGINDETAILSLIST1=[]; 
        this.rerender(); 

        // this. routename=false;
        // this.mandalname=true;
        // this.RBKname=true;
      }  
      } 
     else{
       // this.toast.info(response.message)
      } 
      // this.rerender(); 
    
      
    } catch (error) {
     this.spinner.hide();
     this.utils.catchResponse(error);
    }
   } 


   
onSelectionChange(event: any, obj: any): void { debugger;

  try {   
    if (event.target.checked)  {   
    var element = <HTMLInputElement> document.getElementById("checkbox_"+obj.MOBILE_NUMBER);
    if(element.checked ===true)
      {
        this.strcompid= this.strcompid+','+obj.MOBILE_NUMBER ;  

       this.SMSSENDLIST = {
        LOGIN_TYPE: obj.LOGIN_TYPE,
        LOGIN_PURPOSE: obj.LOGIN_PURPOSE,
        USER_NAME: obj.USER_NAME,
        PASSWORD: obj.PASSWORD,
        URL: obj.URL,
        MOBILE_NUMBER: obj.MOBILE_NUMBER,
        NUM: "0",
        TYPE_CODE: this.typeid,
        DIST_CODE: obj.DISTRICT_CODE,
        MANDAL_CODE: obj.MANDAL_CODE,
        RBK_CODE: obj.RBK_CODE,
        ROUTE_NO: obj.ROUTE_NO,
        DESIGNATION: obj.DESIGNATION,
        DESIG_ID: this.Designation,
        UPDATED_BY: this.session.userName,
        VAR: "",
        VAR1: "",
        NUM1: this.session.desigId,
        VAR2: obj.PASSWORD
    };

    // Push the new SMSSENDLIST object to SMSSENDMAINLIST
    this.SMSSENDMAINLIST.push(Object.assign({},this.SMSSENDLIST)); 
      }       
      else{     
      } 
    }
      else{ 
          // If the checkbox is unchecked, remove data from the list
        const index = this.SMSSENDMAINLIST.findIndex(item => item.MOBILE_NUMBER === obj.MOBILE_NUMBER);
        if (index !== -1) {
          this.SMSSENDMAINLIST.splice(index, 1);
        }

      }

     // this.SMSSENDMAINLIST.push(this.SMSSENDLIST);

  } catch (error) {
    
  }   
  this.strcompid= this.strcompid.replace('undefined,',''); 
  }  

// onSelectionChange1(event: any, obj1: any): void { debugger;

//   try {   
//     if (event.target.checked)  {   
//     var element = <HTMLInputElement> document.getElementById("checkbox_"+obj1.MOBILE_NUMBER);
//     if(element.checked ===true)
//       {
//         this.strcompid= this.strcompid+','+obj1.MOBILE_NUMBER ;  

//        this.SMSSENDLIST = {
//         LOGIN_TYPE: obj1.LOGIN_TYPE,
//         LOGIN_PURPOSE: obj1.LOGIN_PURPOSE,
//         USER_NAME: obj1.USER_NAME,
//         PASSWORD: obj1.PASSWORD,
//         URL: obj1.URL,
//         MOBILE_NUMBER: obj1.MOBILE_NUMBER,
//         NUM: "0",
//         TYPE_CODE: this.typeid,
//         DIST_CODE: obj1.DISTRICT_CODE,
//         MANDAL_CODE: obj1.MANDAL_CODE,
//         RBK_CODE: obj1.RBK_CODE,
//         ROUTE_NO: obj1.ROUTE_NO,
//         DESIGNATION: obj1.DESIGNATION,
//         DESIG_ID: this.Designation,
//         UPDATED_BY: this.session.userName,
//         VAR: "",
//         VAR1: "",
//         NUM1: this.session.desigId,
//         VAR2: obj1.PASSWORD
//     };

//     // Push the new SMSSENDLIST object to SMSSENDMAINLIST
//     this.SMSSENDMAINLIST.push(Object.assign({},this.SMSSENDLIST)); 
//       }       
//       else{     
//       } 
//     }
//       else{ 
//           // If the checkbox is unchecked, remove data from the list
//         const index = this.SMSSENDMAINLIST.findIndex(item => item.MOBILE_NUMBER === obj1.MOBILE_NUMBER);
//         if (index !== -1) {
//           this.SMSSENDMAINLIST.splice(index, 1);
//         }

//       }

//      // this.SMSSENDMAINLIST.push(this.SMSSENDLIST);

//   } catch (error) {
    
//   }   
//   this.strcompid= this.strcompid.replace('undefined,',''); 
//   }  


// onSelectionChange2(event: any, obj2: any): void { debugger;

//   try {   
//     if (event.target.checked)  {   
//     var element = <HTMLInputElement> document.getElementById("checkbox_"+obj2.MOBILE_NUMBER);
//     if(element.checked ===true)
//       {
//         this.strcompid= this.strcompid+','+obj2.MOBILE_NUMBER ;  

//        this.SMSSENDLIST = {
//         LOGIN_TYPE: obj2.LOGIN_TYPE,
//         LOGIN_PURPOSE: obj2.LOGIN_PURPOSE,
//         USER_NAME: obj2.USER_NAME,
//         PASSWORD: obj2.PASSWORD,
//         URL: obj2.URL,
//         MOBILE_NUMBER: obj2.MOBILE_NUMBER,
//         NUM: "0",
//         TYPE_CODE: this.typeid,
//         DIST_CODE: obj2.DISTRICT_CODE,
//         MANDAL_CODE: obj2.MANDAL_CODE,
//         RBK_CODE: obj2.RBK_CODE,
//         ROUTE_NO: obj2.ROUTE_NO,
//         DESIGNATION: obj2.DESIGNATION,
//         DESIG_ID: this.Designation,
//         UPDATED_BY: this.session.userName,
//         VAR: "",
//         VAR1: "",
//         NUM1: this.session.desigId,
//         VAR2: obj2.PASSWORD
//     };

//     // Push the new SMSSENDLIST object to SMSSENDMAINLIST
//     this.SMSSENDMAINLIST.push(Object.assign({},this.SMSSENDLIST)); 
//       }       
//       else{     
//       } 
//     }
//       else{ 
//           // If the checkbox is unchecked, remove data from the list
//         const index = this.SMSSENDMAINLIST.findIndex(item => item.MOBILE_NUMBER === obj2.MOBILE_NUMBER);
//         if (index !== -1) {
//           this.SMSSENDMAINLIST.splice(index, 1);
//         }

//       }

//      // this.SMSSENDMAINLIST.push(this.SMSSENDLIST);

//   } catch (error) {
    
//   }   
//   this.strcompid= this.strcompid.replace('undefined,',''); 
//   }  





   async BTNSUBMIT():Promise<void>{
    try {     debugger;
      
   const req={ 
    SMSDETAILS : this.SMSSENDMAINLIST
   }
   debugger;
this.spinner.show();
   const response = await this.smsapi.SmsSendingDetailsInsert(req);
      this.spinner.hide();
   if(response.success){
     this.SUBMITLIST=response.result;  

    this. tablehide = true;
     this.toast.success(response.message);
     //window.location.reload(); 


   }
   else{
      //  this.toast.info(response.message)
      this.toast.info("please select record to insert the data !!!")
    }   
  } catch (error) {
   this.spinner.hide();
   this.utils.catchResponse(error);
  } 
}


   ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

selectAll() {
  for (const obj of this.LOGINDETAILSLIST) { 
    obj.isChecked = true;  
  }
}
deselectAll() {
  for (const obj of this.LOGINDETAILSLIST) { 
    obj.isChecked = false;
  }
}

isSelectAllDisabled(): boolean {
  return this.LOGINDETAILSLIST.every(obj => obj.isChecked) ||  this.LOGINDETAILSLIST1.every(obj => obj.isChecked)   ||  this.LOGINDETAILSLIST2.every(obj => obj.isChecked) ; 
      //    this.stateLevelDetails.every(obj => !obj.isChecked);
}
isnotSelectAllDisabled(): boolean {
  return this.LOGINDETAILSLIST.every(obj => !obj.isChecked) ||  this.LOGINDETAILSLIST1.every(obj => !obj.isChecked) || this.LOGINDETAILSLIST2.every(obj => !obj.isChecked);
      //    this.stateLevelDetails.every(obj => obj.isChecked);
}



   //   this.SMSSENDLIST.LOGIN_TYPE = obj.LOGIN_TYPE;
      //   this.SMSSENDLIST.LOGIN_PURPOSE = obj.LOGIN_PURPOSE;
      //   this.SMSSENDLIST.USER_NAME = obj.USER_NAME;
      //   this.SMSSENDLIST.PASSWORD = obj.PASSWORD;
      //   this.SMSSENDLIST.URL = obj.URL;
      //   this.SMSSENDLIST.MOBILE_NUMBER=obj.MOBILE_NUMBER;
      //   this.SMSSENDLIST.NUM="0";          
      //  this.SMSSENDLIST.TYPE_CODE=this.typeid,
      //  this.SMSSENDLIST.DIST_CODE=obj.DISTRICT_CODE,
      //  this.SMSSENDLIST.MANDAL_CODE=obj.MANDAL_CODE,
      //  this.SMSSENDLIST.RBK_CODE=obj.RBK_CODE,
      //  this.SMSSENDLIST.ROUTE_NO=obj.ROUTE_NO,
      //  this.SMSSENDLIST.DESIGNATION=obj.DESIGNATION,    
      //  this.SMSSENDLIST.DESIG_ID=this.Designation,
      //  this.SMSSENDLIST.UPDATED_BY=this.session.userName,        
      //  this.SMSSENDLIST.VAR="",
      //  this.SMSSENDLIST.VAR1="",
      //  this.SMSSENDLIST.NUM1=this.session.desigId,
      //  this.SMSSENDLIST.VAR2=obj.PASSWORD       
  

}
