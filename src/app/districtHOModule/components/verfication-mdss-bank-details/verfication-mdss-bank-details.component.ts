import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DlcoService } from 'src/app/dlcoModule/services/dlco.service';
import { MdssService } from 'src/app/mdssModule/services/mdss.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UserManualsService } from 'src/app/shared/services/user-manuals.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-verfication-mdss-bank-details',
  templateUrl: './verfication-mdss-bank-details.component.html',
  styleUrls: ['./verfication-mdss-bank-details.component.css']
})
export class VerficationMdssBankDetailsComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private promotersAPI: MdssService,
    private utils: UtilsService,
    private logger: LoggerService,
    private session: SessionService,
    private sanitizer: DomSanitizer,
    private dlcoAPI: DlcoService,
    private userManual: UserManualsService
  ) { }

  BankDetailsList=[];
  showvERIFYPopup=false;
  RejectDiv=false;
  Approved=true;

  accountDataView={
    Mdss_name:'',
    NEW_ACC_NAME:'',
    NEW_ACC_NO:'',
    NEW_BANK_NAME:'',
    NEW_BRANCH_NAME:'',
    NEW_IFSC_CODE:'',
    NEW_BANK_PB_IMAGE:'',
    NEW_PAN_NUMBER:'',
    NEW_PAN_IMAGE:'',

    MDAC_ACC_NAME:'',
    OLD_BANK_NAME:'',
    OLD_ACC_NO:'',
    OLD_IFSC_CODE:'',
    OLD_BANK_PB_IMAGE:'',
    OLD_BRANCH_NAME:'',
    OLD_PAN_NUMBER:'',
    OLD_PAN_IMAGE:'',

    Reason:'',
    rbkid:''


   
  }

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ''){
      this.loadBankDetailsList();
         }
         else
         {
           this.router.navigate(['/shared/UnAuthorized']);
         }
  }

  async loadBankDetailsList(): Promise<void> { debugger;
    try {   const req = { type:"13",rbkId:this.session.districtId}; 
          this.spinner.show();                    
           const res = await this.dlcoAPI.eSignDocumentsGet(req);            
              
      this.BankDetailsList = [];
      if (res.success) {
         
        this.spinner.hide();
        this.BankDetailsList = res.result;
         
         
      } else {
        this.spinner.hide();
        this.toast.info(res.message);
      }
    } catch (error) {
      this.spinner.hide();
         this.utils.catchResponse(error);
     
    }
  }

  async Verifybankbtn(obj):Promise<void>
  {
   this.accountDataView.rbkid=obj.RBK_CODE;
    try { 
      this.spinner.show(); 
        const req = { type:"14",rbkId:obj.RBK_CODE};                       
     const res = await this.dlcoAPI.eSignDocumentsGet(req);            
        debugger;
// this.BankDetailsList = [];
if (res.success) {

    this.accountDataView.Mdss_name=res.result[0].MDSS_NAME;
    this.accountDataView.NEW_ACC_NAME=res.result[0].NEW_ACC_NAME;
    this.accountDataView.NEW_ACC_NO=res.result[0].NEW_ACC_NO;
    this.accountDataView.NEW_BANK_NAME=res.result[0].NEW_BANK_NAME;
    this.accountDataView.NEW_BRANCH_NAME=res.result[0].NEW_BRANCH_NAME;
    this.accountDataView.NEW_IFSC_CODE=res.result[0].NEW_IFSC_CODE;
    this.accountDataView.NEW_BANK_PB_IMAGE=res.result[0].NEW_BANK_PB_IMAGE;
    this.accountDataView.NEW_PAN_NUMBER=res.result[0].NEW_PAN_NUMBER;
    this.accountDataView. NEW_PAN_IMAGE=res.result[0]. NEW_PAN_IMAGE;
    //this.accountDataView. NEW_BANK_NAME=res.result[0]. NEW_BANK_NAME;

    this.accountDataView.MDAC_ACC_NAME=res.result[0].MDAC_ACC_NAME;
    this.accountDataView.OLD_BANK_NAME=res.result[0].OLD_BANK_NAME;
    this.accountDataView.OLD_ACC_NO=res.result[0].OLD_ACC_NO;
    this.accountDataView.OLD_IFSC_CODE=res.result[0].OLD_IFSC_CODE;
    this.accountDataView.OLD_BANK_PB_IMAGE=res.result[0].OLD_BANK_PB_IMAGE;
    this.accountDataView.OLD_BRANCH_NAME=res.result[0].OLD_BRANCH_NAME;
    this.accountDataView.OLD_PAN_NUMBER=res.result[0].OLD_PAN_NUMBER;
    this.accountDataView. OLD_PAN_IMAGE=res.result[0]. OLD_PAN_IMAGE;


   this.showvERIFYPopup=true;
  this.spinner.hide();
 // this.BankDetailsList = res.result;
   
   
} else {
  this.spinner.hide();
  this.toast.info(res.message);
}
} catch (error) {
this.spinner.hide();
   this.utils.catchResponse(error);

}

  }

  async onClear(): Promise<void> {
    try {
      
    
    this.showvERIFYPopup = false;
    this.RejectDiv=false;
    this.Approved=true;
     
      
      
    } catch (error) {
      
      this.utils.catchResponse(error);
    }
  }

  async getBaseFile(path): Promise<string> {
    try {
      if (!this.utils.isEmpty(path)) {
        this.spinner.show();
        const response = await this.utils.DMSFileDownload(path);
        this.spinner.hide();
        debugger;
        if (response.success) {
          this.utils.viewImage(response.result);
          //return response.result;
        }
      }
      return '';
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async NewgetBaseFile(path): Promise<string> {
    try {
      if (!this.utils.isEmpty(path)) {
        this.spinner.show();
        const response = await this.utils.MDSSDMSFileDownload(path);
        this.spinner.hide();
        debugger;
        if (response.success) {
          this.utils.viewImage(response.result);
          //return response.result;
        }
      }
      return '';
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


  AddBankold(path){
    debugger;
    this.getBaseFile(path);
      }

      AddBankNew(path){
    debugger;
    this.NewgetBaseFile(path);
  
      }

      Rejectbtn(){
        this.RejectDiv=true;
        this.Approved=false;
      }

      async SubmitRejectbtn():Promise<void>
      {
       

        try{
          if (this.utils.isEmpty(this.accountDataView.Reason)) {
            this.toast.warning('Please Enter Reason Code');
             
          }
          else{

          const req = {
            type:"15",mdssId:"3",bankName:this.accountDataView.Reason,rbkId:this.accountDataView.rbkid,updatedBy:this.session.mobileNumber
         };
          
         const res = await this.dlcoAPI.MDSSBankDetailsVerify(req);
         debugger;
           this.spinner.hide();
           if(res.success)
           {
            this.toast.success("Reject Details Successfully ...!");
            window.location.reload();
            
           }
           else{
            this.toast.warning(res.message);
           }
          }
        }
        catch(error){
          this.spinner.hide();
             this.utils.catchResponse(error);
        }

        
        
      }

      async ApprovedDetails():Promise<void>{
        try {
          $("#Approved").hide();
          this.spinner.show();
          const req = {
            type:"15",mdssId:"2",rbkId:this.accountDataView.rbkid,updatedBy:this.session.mobileNumber
         };
          
         const res = await this.dlcoAPI.MDSSBankDetailsVerify(req);
           this.spinner.hide();
           if(res.success)
           {
            this.toast.success("Accepte Details Successfully ...!");
            window.location.reload();
            
           }
           else{
            $("#Approved").show();
            this.toast.warning(res.message);
           }
        
        }
        catch (error) {
          this.spinner.hide();
             this.utils.catchResponse(error);
         
        }

      }

}
