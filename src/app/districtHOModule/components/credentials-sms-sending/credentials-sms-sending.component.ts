import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { McuMappingService } from 'src/app/mentorModule/services/mcu-mapping.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-credentials-sms-sending',
  templateUrl: './credentials-sms-sending.component.html',
  styleUrls: ['./credentials-sms-sending.component.css']
})
export class CredentialsSmsSendingComponent implements OnInit {

  replacestr: any;
  TYPELIST: any[] = [];
  DESIGNATIONLIST: any[] = [];
  ROUTELIST: any[] = [];
  PHASELIST: any[] = [];
  LOGINDETAILSLIST: any[] = [];
  LOGINDETAILSLIST1: any[] = [];
  LOGINDETAILSLIST2: any[] = [];
  SMSSENDMAINLIST: any[] = [];
  SUBMITLIST: any[] = [];
  tablehide = false; 
  element:any

  designvalue:any;

  SMSSENDLIST =
    {
      LOGIN_TYPE: "",
      LOGIN_PURPOSE: "",
      USER_NAME: "",
      PASSWORD: "",
      URL: "",
      MOBILE_NUMBER: "",
      TYPE_CODE: "",
      DIST_CODE: "",
      MANDAL_CODE: "",
      RBK_CODE: "",
      ROUTE_NO: "",
      DESIGNATION: "",
      DESIG_ID: "",
      UPDATED_BY: "",
      NUM: "",
      VAR: "",
      VAR1: "",
      NUM1: "",
      VAR2: "",
    };
  typeid: any;
  userId: any;
  Designation: any;
  Routeid: any;
  phaseid: any;
  designname: any;
  designid: any;
  selectedItemId: any; 
  strcompid: any
  mobilenumber: any


  checkboxes: any[] = []; // Assuming your checkboxes data is stored here
  allChecked: boolean = false;



  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private session: SessionService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private smsapi: McuMappingService,
    private toast: ToasterService,
    private utils: UtilsService
  ) { }

  ngOnInit(): void {
    if (this.session.uniqueId != "" && this.session.desigId != "") {

    }
    else {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    this.loadtypelist();
  }

  async loadtypelist(): Promise<void> {
    try {

      this.TYPELIST = [];
      const req = {
        TYPE: "1",
      }
      debugger;
      this.spinner.show();
      const response = await this.smsapi.SmsSendingCredGet(req);
      this.spinner.hide();
      if (response.success) {
        this.TYPELIST = response.result;
      }
      else {
        this.toast.info(response.message)
      }

    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async ontypechange(): Promise<void> {
    try {

      this.LOGINDETAILSLIST = [];
      this.LOGINDETAILSLIST1  = [];
      this.LOGINDETAILSLIST2  = []; 
      this.SUBMITLIST  = []; 
      this.tablehide = false;
      
      const req = {
        TYPE: "2",
        TYPE_CODE: this.typeid,        
      }
      debugger;
      this.spinner.show();
      const response = await this.smsapi.SmsSendingDetailsGet(req);
      this.spinner.hide();
      if (response.success) {
        this.DESIGNATIONLIST = response.result;   
      }
      else {
        //  this.toast.info(response.message)
      }

    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async onDesignchange(): Promise<void> {

    this.LOGINDETAILSLIST = [];
    this.LOGINDETAILSLIST1  = [];
    this.LOGINDETAILSLIST2  = [];
    this.SUBMITLIST  = [];
    this.tablehide = false;

    const selectedItem = this.DESIGNATIONLIST.find(DESIGNATIONLIST => DESIGNATIONLIST.DESIG_ID === this.Designation);

    this.designname = selectedItem.DESIGNATION;
    try {
      this.ROUTELIST = [];
      const req = {
        TYPE: "3",
        TYPE_CODE: this.typeid,
        DIST_CODE: this.session.districtId,
        NUM1 :this.Designation
        
      }
      debugger;
      this.spinner.show();
      const response = await this.smsapi.SmsSendingCredGet(req);
      this.spinner.hide();
      if (response.success) {
        this.ROUTELIST = response.result;
        this.Routeid = undefined;
        this.phaseid = undefined; 
      }
      else {
        //  this.toast.info(response.message)
      }
      //  let obj=document.getElementById('Designation');
      // this.designname=obj[this.Designation].innerHtml;  


    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async onRoutechange(): Promise<void> {
    try {

      this.LOGINDETAILSLIST = [];
      this.LOGINDETAILSLIST1  = [];
      this.LOGINDETAILSLIST2  = [];
      this.SUBMITLIST  = [];
      this.tablehide = false;

      this.PHASELIST = [];
      const req = {
        TYPE: "4",
        TYPE_CODE: this.typeid,
        DIST_CODE: this.session.districtId,
        ROUTE_NO: this.Routeid
      }
      debugger;
      this.spinner.show();
      const response = await this.smsapi.SmsSendingDetailsGet(req);
      this.spinner.hide();
      if (response.success) {
        this.PHASELIST = response.result;
        this.phaseid = undefined;
      }
      else {
        //  this.toast.info(response.message)
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }



  async btnFind(): Promise<void> {
    try {

      if (this.typeid == null || this.typeid == undefined || this.typeid == "") {
        this.toast.info("please select User Type"); return;
      }

      if (this.typeid == "1") {
        if (this.userId == null || this.userId == undefined || this.userId == "") {
          this.toast.info("please Enter User Id"); return;
        }
      }
      else if (this.typeid == "2") {
        if (this.Designation == null || this.Designation == undefined || this.Designation == "") {
          this.toast.info("please select Designation"); return;
        }
        if (this.Routeid == null || this.Routeid == undefined || this.Routeid == "") {
          this.toast.info("please select Route"); return;
        }
        if (this.phaseid == null || this.phaseid == undefined || this.phaseid == "") {
          this.toast.info("please select Phase"); return;
        }
      }
      else { this.toast.info("please Select User type"); return; }

      this.LOGINDETAILSLIST = [];


      if(this.Designation == "1010")
           this.designvalue="101";   
      else   this.designvalue=this.Designation;
        
        
     
      const req = {
        TYPE: "5",
        TYPE_CODE: this.typeid,
        DIST_CODE: this.session.districtId,
        ROUTE_NO: this.Routeid,
        PHASE_CODE: this.phaseid, 
        DESIG_ID: this.designvalue,
        DESIGNATION: this.designname ,
        USER_NAME: this.userId,
        VAR1: this.session.userName,
        NUM: this.session.uniqueId,
        NUM1: this.session.desigId,
      }
      debugger;
      this.spinner.show();
      const response = await this.smsapi.SmsSendingCredGet(req);
      this.spinner.hide();
      if (response.success) {


        if (this.Designation === '101' || this.designvalue ==="101") {
          this.LOGINDETAILSLIST = response.result;
          this.LOGINDETAILSLIST = this.LOGINDETAILSLIST.filter(obj => obj.MOBILE_NUMBER && obj.MOBILE_NUMBER.length === 10);
          this.LOGINDETAILSLIST1 = [];
          this.LOGINDETAILSLIST2 = [];
          this.rerender();

         
        }
        else if (this.Designation === '105' || this.Designation === '106') {
          this.LOGINDETAILSLIST1 = response.result;
          this.LOGINDETAILSLIST1 = this.LOGINDETAILSLIST1.filter(obj => obj.MOBILE_NUMBER && obj.MOBILE_NUMBER.length === 10);
          this.LOGINDETAILSLIST = [];
          this.LOGINDETAILSLIST2 = [];
          this.rerender();
 
        }
        else {
          this.LOGINDETAILSLIST2 = response.result;
          this.LOGINDETAILSLIST2 = this.LOGINDETAILSLIST2.filter(obj => obj.MOBILE_NUMBER && obj.MOBILE_NUMBER.length === 10);
          this.LOGINDETAILSLIST = [];
          this.LOGINDETAILSLIST1 = [];
          this.rerender();
 
        }
      }
      else {
        this.toast.info(response.message);
        this.LOGINDETAILSLIST2 = [];
        this.LOGINDETAILSLIST = [];
        this.LOGINDETAILSLIST1 = [];

      }
      // this.rerender();  
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }



  onSelectionChange(event: any, obj: any): void {
    debugger;


    
    try { 

      if (event.target.checked) {
        var element = <HTMLInputElement>document.getElementById("checkbox_" + obj.MOBILE_NUMBER);
        if (element.checked === true) {
          this.strcompid = this.strcompid + ',' + obj.MOBILE_NUMBER;

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
            DESIG_ID:obj.DESID, //this.Designation,
            UPDATED_BY: this.session.userName,
            VAR: "",
            VAR1: "",
            NUM1: this.session.desigId,
            VAR2: obj.PASSWORD
          };

          

          // Push the new SMSSENDLIST object to SMSSENDMAINLIST
          this.SMSSENDMAINLIST.push(Object.assign({}, this.SMSSENDLIST)); 
        }
        else {
        }
      }
      else {
        // If the checkbox is unchecked, remove data from the list
        const index = this.SMSSENDMAINLIST.findIndex(item => item.MOBILE_NUMBER === obj.MOBILE_NUMBER);
        if (index !== -1) {
          this.SMSSENDMAINLIST.splice(index, 1);
        }
      } 

    } catch (error) {

    }
    this.strcompid = this.strcompid.replace('undefined,', '');
  }

  async BTNSUBMIT(): Promise<void> {
    try {

      if(this.SMSSENDMAINLIST.length> 0){ 
      debugger;  
      const req = {
        SMSDETAILS: this.SMSSENDMAINLIST
      }
      debugger;
      this.spinner.show();
      const response = await this.smsapi.SmsSendingDetailsInsert(req);
      this.spinner.hide();
      if (response.success) {
        this.SUBMITLIST = response.result;
         this.SMSSENDMAINLIST=[]; 
        this.toast.success("SMS sent Successfully !!!");  
        this.tablehide = true;
        //window.location.reload(); 
        
        this.btnFind();
      }
      else {
        //  this.toast.info(response.message)
        this.toast.info("Failed to Send SMS Please try Again !!!");
      }
    }
    else{
      this.toast.warning("Please Select User to send the SMS !!!");
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
