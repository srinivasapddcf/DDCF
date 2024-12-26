import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { OfficeserviceService } from 'src/app/office-module/services/officeservice.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-bmcuequipments-details',
  templateUrl: './bmcuequipments-details.component.html',
  styleUrls: ['./bmcuequipments-details.component.css']
})
export class BmcuequipmentsDetailsComponent implements OnInit {
  
  Districtid :any;eqpt:any;SlNo:any;file_path1:any;filepath:any;Serialnumberimage:any;Deviceimage:any;
  Devicemaker:any;Manufacturingdate:any;Capacity:any;Serialnumber:any;Calibrationstatus:any;WayBillUpload:any;INVID:any;
  allotmentAlienationUpload:any;installationstatus:any;WAYBILLPATH:'';
    BMCUID:any;MANDALID:any;sub=false;
    Invoice: any;
    ReceviedStatus:any;
    Districtlist: any[] = [];Bmculist: any[] = [];  equipmentlist: any[] = []; equipmentdetailsGrid : any[] = []; Invoicelist: any[] = []; 
    @ViewChild(DataTableDirective, { static: false })
   dtElement!: DataTableDirective; mandallist: any[] = []; PAYMODEID2=false;
   maxDate: Date;
   dtOptions: DataTables.Settings = this.utils.dataTableOptions();
   dtTrigger: Subject<any> = new Subject();  
  pendtTrigger: Subject<any> = new Subject();
  constructor(private toast: ToasterService,
    private utils: UtilsService,
    private session: SessionService,
    private OfficeModuleAPI: OfficeserviceService,
    private spinner: NgxSpinnerService,
    private router: Router ) { }

  ngOnInit( ): void {
    this.maxDate = this.session.getTodayDate();
    this.Districtdetails();
  //  this.InvoicedetailsLIST();
    this.equipmentdetails();   
     
  }

  async InvoicedetailsLIST(): Promise<void> {
    try {
      this.Invoicelist =[];
        const reqdistrict = {
          TYPE: 7, 
          DISTRICT:this.Districtid
        }
        const res = await this.OfficeModuleAPI.TechnisianDistricts(reqdistrict); 
        if (res.success) {
            this.Invoicelist = res.result; 
            return;

        } else {
            this.toast.info("Invoice Details Not found");//res.message
        }

        
        this.spinner.hide();
    } catch (error) {
        this.spinner.hide();
        this.utils.catchResponse(error);
    }
}

trimInput() {
  this.Devicemaker = this.Devicemaker.trim();
}
  Validation(): boolean {
     
    const condition = false;
    if (this.utils.DataValidationNullorEmptyorUndefined(this.Districtid)) {
        this.toast.warning('Please Select District Name ');
        return false;
    }
    if (this.utils.DataValidationNullorEmptyorUndefined(this.MANDALID)) {
      this.toast.warning('Please Select Mandal Name ');
      return false;
  }
    if (this.utils.DataValidationNullorEmptyorUndefined(this.BMCUID)) {
        this.toast.warning('Please Select BMCU');
        return false;
    }
    if (this.utils.DataValidationNullorEmptyorUndefined(this.INVID)) {
      this.toast.warning('Please Enter Invoice Number');
      return false;
  }
    if (this.utils.DataValidationNullorEmptyorUndefined(this.eqpt)) {
        this.toast.warning('Please Select Equipment');
        return false;
    }
    

    // if (this.utils.DataValidationNullorEmptyorUndefined(this.Devicemaker)) {
    //     this.toast.warning('Please Enter Device Maker');
    //     return false;
    // }
    if (this.utils.DataValidationNullorEmptyorUndefined(this.Manufacturingdate)) {
        this.toast.warning('Please Select Installation  Date');
        return false;
    }
    // if (this.utils.DataValidationNullorEmptyorUndefined(this.Capacity)) {
    //     this.toast.warning('Please Enter Capacity');
    //     return false;
    // }
  
  //   if (this.utils.DataValidationNullorEmptyorUndefined(this.Serialnumber)) {
  //     this.toast.warning('Please Enter Serial Number');
  //     return false;
  // }

  if (this.utils.DataValidationNullorEmptyorUndefined(this.Calibrationstatus)) {
    this.toast.warning('Please Select Calibration Status');
    return false;
}

if (this.utils.DataValidationNullorEmptyorUndefined(this.installationstatus)) {
  this.toast.warning('Please Select Installation Status');
  return false;
}

if (this.utils.DataValidationNullorEmptyorUndefined(this.Deviceimage)) {
  this.toast.warning('Please Upload Device Image');
  return false;
}
// if (this.utils.DataValidationNullorEmptyorUndefined(this.Serialnumberimage)) {
//   this.toast.warning('Please Upload Serial Number  Image');
//   return false;
// } 
    return true;

}
async DataSubmittion(): Promise<void>
{
  try {

    if (this.utils.DataValidationNullorEmptyorUndefined(this.WAYBILLPATH)) {
      this.toast.warning('Please Upload Invoice Document');
      return  ;
    } 

    const reqdistrict = {
      TYPE: 9,  
      DISTRICT:this.Districtid ,
      BMCU :this.BMCUID, 
      INVOICE_NUMBER:this.INVID,
      INPUT01:this.MANDALID,
      DEVICE_IMG:this.WAYBILLPATH,//invoicepdf
    };
    const res = await this.OfficeModuleAPI.TechnisianDistricts(reqdistrict); 
    if (res.success) { 
        this.toast.info("Records Submitted Successfully");  
    this.Clear();

  } else {
      this.toast.info("Unable to Submitt Details, Please try again !!!"); 
  } 
    
  } catch (ex) {
    
  }
}



  async DataSub(): Promise<void> {
    try {
      if (this.Validation()) {

        const reqdistrict = {
          TYPE: 4,  
          DISTRICT:this.Districtid ,
          BMCU :this.BMCUID,
          EQUIPMENT_ID:this.eqpt ,
          INVOICE_NUMBER:this.INVID,
          STATUS:"0",
          INSERTED_BY:this.session.userName,
          UNIQUE_ID:this.session.uniqueId,
          ROLE:this.session.desigId ,
          MANUFACTURE :this.Manufacturingdate,
          DEVICE_MAKER :this.Devicemaker,
          CAPACITY:this.Capacity ,
          SERIAL :this.Serialnumber,
          CALIBRATION :this.Calibrationstatus,
          SERIAL_NUM_IMG :this.Serialnumberimage,
          DEVICE_IMG:this.Deviceimage,
          INPUT04:this.installationstatus,
          INPUT01:this.MANDALID,

        }
        const res = await this.OfficeModuleAPI.TechnisianDistricts(reqdistrict); 
        if (res.success) { 
            this.toast.info("Record Added Successfully"); 
          // window.location.reload();
          this.equipmentdetailsGridList();
           this.Clear();
this.eqpt=undefined;this.installationstatus=undefined;
         

        } else {
            this.toast.info("Unable to add Details, Please try again !!!"); 
        } 
      }      
    } catch (error) {
      
    }
    
      }
Clear()
{
  try {
   // this.INVID='';
    this.Devicemaker='';
    this.Capacity='';
    this.Calibrationstatus='';
    this.Serialnumber='';
    this.Serialnumberimage='';
    this.Deviceimage='';
    this.WayBillUpload='';
    this.allotmentAlienationUpload='';
    // this.Districtlist=this.Districtid;
    // this.Bmculist=this.BMCUID;
    // this.equipmentlist=undefined;
  } catch (ex) {
    
  }
}
      
      async onSerialnumberimageChange(event): Promise<void> {debugger;
        try { this.Serialnumberimage='';
          const element = event.currentTarget as HTMLInputElement;
          let fileList: FileList | null = element.files;
        
        if(element.files[0].name.split('.').length.toString()!=='2')      
        { this.toast.warning('Please Upload image files only');  
      
        event.target.value = '';
      return;
        }else{
      
          const res: any = await this.utils.encodedString(
            event,
            this.utils.fileType.IMAGE,
            this.utils.fileSize.threeMB
          );
          if (!this.utils.isEmpty(res)) { 
             this.allotmentAlienationUpload= res.split('base64,')[1];
             this.Serialnumberimage= this.allotmentAlienationUpload;
              
          }
        }
        } catch (error) { this.toast.warning('Please Select jpeg Image'); 
        }
      } 
  async onInvoiceChange(event): Promise<void> {debugger;
    try { this.Deviceimage='';
      const element = event.currentTarget as HTMLInputElement;
      let fileList: FileList | null = element.files;
    
    if(element.files[0].name.split('.').length.toString()!=='2')      
    { this.toast.warning('Please Upload Image files only');  
  
    event.target.value = '';
  return;
    }else{
  
      const res: any = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.threeMB
      );
      if (!this.utils.isEmpty(res)) { 
         this.WayBillUpload= res.split('base64,')[1];
         this.Deviceimage= this.WayBillUpload;
          
      }
    }
    } catch (error) { this.toast.warning('Please Select jpeg Image'); 
    }
  } 
  async Districtdetails(): Promise<void> {
    try {
      this.Districtlist =[];
        const reqdistrict = {
          TYPE: 1,  
        }
        const res = await this.OfficeModuleAPI.TechnisianDistricts(reqdistrict); 
        if (res.success) {
            this.Districtlist = res.result; 
            return;

        } else {
            this.toast.info("District Details Not found");//res.message
        }

        
        this.spinner.hide();
    } catch (error) {
        this.spinner.hide();
        this.utils.catchResponse(error);
    }
}

//


async mandaldetails(): Promise<void> {
  try {debugger;
    this.mandallist =[];
      const reqdistrict = {
        TYPE: 8,  
        DISTRICT:this.Districtid,
      }
      const res = await this.OfficeModuleAPI.TechnisianDetails_Select(reqdistrict); 
      if (res.success) {
          this.mandallist = res.result; 

        //  this.equipmentdetailsGridList(); 
          
      } else {
          this.toast.info(res.message);
      }
      this.InvoicedetailsLIST();
      this.spinner.hide();
  } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
  }
}

async bmcudetails(): Promise<void> {
  try {debugger;
    this.Bmculist =[];
      const reqdistrict = {
        TYPE: 2,  
        DISTRICT:this.Districtid,
        INPUT03:this.MANDALID
      }
      const res = await this.OfficeModuleAPI.TechnisianDistricts(reqdistrict); 
      if (res.success) {
          this.Bmculist = res.result; 
          return;

      } else {
          this.toast.info(res.message);
      }
      this.spinner.hide();
  } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
  }
}


async equipmentdetails(): Promise<void> {
  try {debugger;
    this.equipmentlist =[];
      const reqdistrict = {
        TYPE: 3, 
        DISTRICT:this.Districtid,
        BMCU:this.BMCUID
      }
      const res = await this.OfficeModuleAPI.TechnisianDistricts(reqdistrict); 
      if (res.success) {
          this.equipmentlist = res.result; 
          return;

      } else {
          this.toast.info(res.message); 
      }
      this.spinner.hide();
  } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
  }
}


async equipmentdetailsGridList(): Promise<void> {
  try {debugger;

    if (this.utils.DataValidationNullorEmptyorUndefined(this.Districtid)) {
      this.toast.warning('Please Select District Name');
      return  ;
  }
  if (this.utils.DataValidationNullorEmptyorUndefined(this.BMCUID)) {
    this.toast.warning('Please Select BMCU');
    return  ;
}

    this.equipmentdetailsGrid =[];


      const reqdistrict = {
        TYPE: 5, 
        DISTRICT:this.Districtid,
        BMCU:this.BMCUID,
        INVOICE_NUMBER:this.INVID
      }
      const res = await this.OfficeModuleAPI.TechnisianDetails_Select(reqdistrict); 
      if (res.success) {
          this.equipmentdetailsGrid = res.result;
          // this.Districtid= res.result[0].DIST_ID;
          // this.MANDALID= res.result[0].MANDAL_ID;
          // this.BMCUID= res.result[0].BMCU_ID;
          // this.INVID= res.result[0].INVOICE_NUMBER;
         // return;
this.sub=true;this.PAYMODEID2=true;
      } else {this.sub=false;this.PAYMODEID2=false;
          this.toast.info(res.message); 
      }
      this.spinner.hide();
  } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
  }
}

async onWayBill(event): Promise<void> {
  try { this.WAYBILLPATH='';
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
  
  if(element.files[0].name.split('.').length.toString()!=='2')      
  { this.toast.warning('Please Upload PDF files only');    
  event.target.value = '';
return;
  }else{

    const res: any = await this.utils.encodedString(
      event,
      this.utils.fileType.PDF,
      this.utils.fileSize.fiveMB
    );
    if (!this.utils.isEmpty(res)) {  
       this.WAYBILLPATH= res.split('base64,')[1];
    }
  }
  } catch (error) { this.toast.warning('Please Select pdf'); 
  }
}

async btnAllPdf(pdf): Promise<void> {
  try { debugger;
    this.spinner.show();
    const res = await this.utils.EQUIPMENT_DETAILSFileDownload(pdf);
    if (res.success) {
       this.utils.viewEQUIPMENTImage(res.result); 
    } else {
      this.toast.info(res.message);
    }
    this.spinner.hide();
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}
}
