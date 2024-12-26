import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Console } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
import { promise } from 'protractor';
import { DlcoService } from 'src/app/dlcoModule/services/dlco.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UserManualsService } from 'src/app/shared/services/user-manuals.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { MdssService } from '../../services/mdss.service';

@Component({
  selector: 'app-update-bank-acount-details',
  templateUrl: './update-bank-acount-details.component.html',
  styleUrls: ['./update-bank-acount-details.component.css']
})
export class UpdateBankAcountDetailsComponent implements OnInit {

  constructor( private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private promotersAPI: MdssService,
    private utils: UtilsService,
    private logger: LoggerService,
    private session: SessionService,
    private sanitizer: DomSanitizer,
    private dlcoAPI: DlcoService,
    private userManual: UserManualsService) { }
    rbkList=[];
    secretaryList=[];
    DetailsList=[];
    BankDetailsList=[];
    DetailstableDiv=false;
    Ifsccodediv=false;
    showeditPopup_edit=false;
    accountname=false;
    AStSecdiv=false;
    accountData={
      rbkId:'',
      Ifsccode:'',
      bankname:'',
      branchname:'',
      acountNo:'',
      acountname:'',
      passbook_img:'',
      acountHoldername:'',
      acountpancardimage:'',
      acountpannumber:'',
      ASSientSecno:'',
      ASSientSecName:'',
      Remarks:'',
    }

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ''){
       this.loadRbkList();
          }
          else
          {
            this.router.navigate(['/shared/UnAuthorized']);
          }

  }

  async loadRbkList(): Promise<void> {
    try {
      const req = { type:"10",rbkId:this.session.mobileNumber }; 
          this.spinner.show();                    
           const res = await this.dlcoAPI.eSignDocumentsGet(req);      
     this.rbkList = [];
      if (res.success) {
        this.spinner.hide();
        this.rbkList = res.result;
        this.showeditPopup_edit=false;
 this.AStSecdiv=false;
       
      } else {
        this.spinner.hide();
        this.toast.info(res.message);
      }
    } catch (error) {
      this.spinner.hide();
         this.utils.catchResponse(error);
     
    }
  }

  async loadAstsecList(): Promise<void> {
    try {
      this.spinner.show();
      const req = { type:"77",rbkId:this.accountData.rbkId }; 
          this.spinner.show();                    
           const res = await this.dlcoAPI.eSignDocumentsGet(req);      
     this.secretaryList = [];
      if (res.success) {
        this.spinner.hide();
        this.secretaryList = res.result;
        this.AStSecdiv=true;
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.toast.info(res.message);
      }
    } catch (error) {
      this.spinner.hide();
         this.utils.catchResponse(error);
     
    }
  }

async onRbkChange(): Promise<void>
{
  if(this.accountData.rbkId!="")
  {
    this.loadRoteList();
   
    this.showeditPopup_edit=false;
    this.accountData.bankname='';
    this.accountData.branchname='';
  }else{
    this.toast.warning('Please Select RSK');
  }
  
}

async onASSecChange(secid):Promise<void>
{
  let obj = this.secretaryList.find(data=>data.UID_NUM==secid);
  this.accountData.ASSientSecName=obj.NAME;


}

  async loadRoteList(): Promise<void> {
    try {   const req = { type:"11",rbkId:this.accountData.rbkId}; 
          this.spinner.show();                    
           const res = await this.dlcoAPI.eSignDocumentsGet(req);            
                 
      this.DetailsList = [];
      if (res.success) {
        debugger;
        if(res.result[0].STATUS_CODE =="0" || res.result[0].STATUS_CODE =="1" || res.result[0].STATUS_CODE =="2" || res.result[0].STATUS_CODE =="3")
        {
          this.DetailstableDiv=true;
          this.spinner.hide();
          this.DetailsList = res.result;
          this.AStSecdiv=false;
        }
        if(res.result[0].STATUS_CODE =="4")
        {
          this.AStSecdiv=false;
          this.DetailstableDiv=false;
          this.toast.info("Secretary Details Not Submitted for this RSK, Please submit details");
          this.spinner.hide();
         // window.location.reload();
        }
        if(res.result[0].STATUS_CODE =="5")
        {
          this.DetailstableDiv=false;
          this.AStSecdiv=true;
          this.loadAstsecList();
          
          this.spinner.hide();
          
          // this.toast.info("Secretary Details Not Submitted for this RBK, Please submit details");
          // this.spinner.hide();
         // window.location.reload();

        }
        
         
      } else {
        this.spinner.hide();
        this.toast.info(res.message);
      }
    } catch (error) {
      this.spinner.hide();
         this.utils.catchResponse(error);
     
    }
  }

  async Updatebankbtn(obj):Promise<void>{

    this.accountData.Ifsccode=obj.IFSC_CODE;
    this.accountData.acountHoldername=obj.MDSS_NAME;
    this.showeditPopup_edit=true;
    this.accountname=false;
    

  }

 async Ifsccode_Details():Promise<void>
 {
  try
   {  
    const req = { type:"12",insertedBy:this.accountData.Ifsccode}; 
    //const req = { type:"14",rbkId:this.accountData.rbkId};//rbkId:this.session.districtId}; 
       this.spinner.show();                    
        const res = await this.dlcoAPI.eSignDocumentsGet(req);            
             
   this.BankDetailsList = [];
   if (res.success) {
     this.BankDetailsList = res.result;
     this.accountData.bankname=res.result[0].BANK_NAME;
     this.accountData.branchname=res.result[0].BRANCH_NAME;
     this.accountname=true;
     this.DetailstableDiv=true;
     $("#ifsccode").attr("disabled","disabled");
     this.spinner.hide();
    
      
   } else {
     this.spinner.hide();
     this.toast.info(res.message);
   }
 } catch (error) {
   this.spinner.hide();
      this.utils.catchResponse(error);
  
 }

 }




   btnimageclick(path){
    debugger;
   var pathdetails= path.split("\\");
   //var pathdetails= path.split("\");
   if(pathdetails[2] =="MDSSBankPassBookImage")
   {
    this.NewgetBaseFile(path);
   }
   else{
    this.getBaseFile(path);
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


  async onKeypressEvent(Ifsccode):Promise<void>{
  
    // if(Ifsccode)
    // {
    // }

    try {   const req = { type:"12",applicationPdfForm:"SBIN0002940"}; 
          this.spinner.show();                    
           const res = await this.dlcoAPI.eSignDocumentsGet(req);            
                 debugger
      this.BankDetailsList = [];
      if (res.success) {
        this.DetailstableDiv=true;
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

  async onClear(): Promise<void> {
    try {
      
    
    this.showeditPopup_edit = false;
     
      
      
    } catch (error) {
      
      this.utils.catchResponse(error);
    }
  }

  async AddBank_Details(): Promise<void>{

   

    try {
    if (this.validate()) {

      if(this.accountData.acountpannumber>="10")
      {
        const response = this.utils.panCardNoCheck(this.accountData.acountpannumber);
        debugger;
        if (response == true) {
               this.spinner.hide();
               this.spinner.show();
               const req = {
                type:"14",
                bankName:this.accountData.bankname,branchName:this.accountData.branchname,
                ifscCode:this.accountData.Ifsccode,bankPassBookImage:this.accountData.passbook_img,
                formAPdf:this.accountData.acountNo,bankAccountName:this.accountData.acountHoldername,
                updatedBy:this.session.mobileNumber,rbkId:this.accountData.rbkId,
                masudhaFormPdf:this.accountData.acountpannumber,
                meetingProceedingsPdf:this.accountData.acountpancardimage,
             
             };
             debugger;
             console.log(req);
             
             const res = await this.dlcoAPI.MDSSBankDetailsU(req);
               this.spinner.hide();
               if(res.success)
               {
                this.toast.success(res.message);
                window.location.reload();
                
               }
               else{
                this.toast.warning(res.message);
               }
               
             } 
             else {
              this.accountData.acountpannumber="";
              //  this.aadharNo=''.trim();
              this.toast.warning("Invalid PAN CARD Number...!");
               this.spinner.hide();
               
       
             }
             //return false;
  
      }


     


  }
} catch (error) {
  this.spinner.hide();
  this.utils.catchResponse(error);
}


  }

  async UpdateAst_Details():Promise<void>
  {
    try {
      if (this.AstDetailsvalidate()) {
  
        this.spinner.show();
       const req = {
        type:"16",
        bankName:this.accountData.ASSientSecName,branchName:this.accountData.Remarks,
        rbkId:this.accountData.rbkId,ifscCode:this.accountData.ASSientSecno,updatedBy:this.session.mobileNumber,        
     
     };    
     debugger;
     const res = await this.dlcoAPI.MDSSBankDetailsVerify(req);
       this.spinner.hide();
       if(res.success)
       {
        this.toast.success(res.message);
        window.location.reload();
        
       }
       else{
        this.toast.warning(res.message);
       }
  
  
    }
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
  }

  validate(): boolean {
     
    if (this.utils.isEmpty(this.accountData.Ifsccode)) {
      this.toast.warning('Please Enter IFSC Code');
      return false;
    }
    if (this.utils.isEmpty(this.accountData.bankname)) {
      this.toast.warning('Please Click on Verify Button');
      return false;
    }
    if (this.utils.isEmpty(this.accountData.branchname)) {
      this.toast.warning('Please Enter Branch Name');
      return false;
    }
    debugger;
    if (this.utils.isEmpty(this.accountData.acountNo)) {
      this.toast.warning('Please Enter Account Number');
      return false;
    }
    if(this.accountData.acountNo=="0" || this.accountData.acountNo=="00" || this.accountData.acountNo=="000" || this.accountData.acountNo=="0000" || this.accountData.acountNo=="00000" || this.accountData.acountNo=="000000" || this.accountData.acountNo=="0000000" || this.accountData.acountNo=="00000000" || this.accountData.acountNo=="000000000" || this.accountData.acountNo=="0000000000" || this.accountData.acountNo=="00000000000" || this.accountData.acountNo=="000000000000" || this.accountData.acountNo=="0000000000000" || this.accountData.acountNo=="00000000000000" || this.accountData.acountNo=="000000000000000" || this.accountData.acountNo=="000000000000000" || this.accountData.acountNo=="0000000000000000" || this.accountData.acountNo=="00000000000000000" || this.accountData.acountNo=="000000000000000000" || this.accountData.acountNo=="0000000000000000000" || this.accountData.acountNo=="00000000000000000000")
    {
      this.toast.warning('Please Enter Valid Acount Number');
      this.accountData.acountNo="";
      return false;
    }
    if (this.utils.isEmpty(this.accountData.acountHoldername)) {
      this.toast.warning('Please Enter Acount Holder Name');
      return false;
    }
    
    if (this.utils.isEmpty(this.accountData.passbook_img)) {
      this.toast.warning('Please Select Pass Book Image');
      return false;
    }
    if (this.utils.isEmpty(this.accountData.acountpancardimage)) {
      this.toast.warning('Please Select PAN Card Image');
      return false;
    }     
    if (this.utils.isEmpty(this.accountData.acountpannumber)) {
      this.toast.warning('Please Enter PAN Card Number');
      return false;
    }
    if(this.accountData.acountpannumber=="0")
    {
      this.toast.warning('Please Enter PAN Card Number');
      return false;
    }
    
    
    if(this.accountData.acountpannumber>="10")
    {
      const response = this.utils.panCardNoCheck(this.accountData.acountpannumber);
      debugger;
      if (response == true) {
             this.spinner.hide();
             return true;
           } 
           else {
            this.accountData.acountpannumber="";
            //  this.aadharNo=''.trim();
            this.toast.warning("Invalid PAN CARD Number...!");
             this.spinner.hide();
             return false;
     
           }
           //return false;

    }
    
    if(this.accountData.acountpannumber=="0" || this.accountData.acountpannumber=="00" || this.accountData.acountpannumber=="000" || this.accountData.acountpannumber=="0000" || this.accountData.acountpannumber=="00000" || this.accountData.acountpannumber=="000000" || this.accountData.acountpannumber=="0000000" || this.accountData.acountpannumber=="00000000" || this.accountData.acountpannumber=="0000000000")
    {
      this.toast.warning('Please Enter PAN Card Number');
      return false;
    }
    
    
    return true;
  }


  // async onKeypressEvents(invoiceqty):Promise<void>{
  
  //   if(invoiceqty>="10")
  //   {
  //     const response = this.utils.panCardNoCheck(this.accountData.acountpannumber);
  //     debugger;
  //     if (response == true) {
  //            this.spinner.hide();
             
  //          } 
  //          else {
  //           this.accountData.acountpannumber="";
  //           //  this.aadharNo=''.trim();
  //           this.toast.warning("Invalid PAN CARD Number...!");
  //            this.spinner.hide();
           
     
  //          }
           

  //   }
  //   // else{
  //   //   this.toast.warning("Enter valid PAN CARD Number...!");
  //   // }
    
    
  
  // }

  AstDetailsvalidate(): boolean {
     
    if (this.utils.isEmpty(this.accountData.rbkId)) {
      this.toast.warning('Please Select RSK');
      return false;
    }
    if (this.utils.isEmpty(this.accountData.ASSientSecno)) {
      this.toast.warning('Please Select Assistant Secretary Name');
      return false;
    }
    if (this.utils.isEmpty(this.accountData.Remarks)) {
      this.toast.warning('Please Enter Remarks');
      return false;
    }
    
    
    
    
    
    return true;
  }

 


  async BankPassbookPhotoChange(event: any): Promise<void> {
    try {
      if (event.target.files.length > 0) {
        if (event.target.files[0].type === 'image/jpeg') {
       
          
        const response: any = await this.utils.fileUploadEncodedString(
          event,
          this.utils.fileSize.hundredKB
        );
        if (response) {
          let file = (
            this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
          ).changingThisBreaksApplicationSecurity;
          file = file.replace('data:image/jpeg;base64,', '');
          this.accountData.passbook_img = file;

        } else {
      
          event.target.value = '';
        }
      }
      else{
        alert('Accept Only Jpg files Only..');
        event.target.value = '';
      }
      } else {
        //this.ngxToaster.warning('file is Empty !!!, Please try again.');
        event.target.value = '';
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async PANCARDPhotoChange(event: any): Promise<void> {
    try {
      if (event.target.files.length > 0) {
        if (event.target.files[0].type === 'image/jpeg') {
       
        const response: any = await this.utils.fileUploadEncodedString(
          event,
          this.utils.fileSize.hundredKB
        );
        if (response) {
          let file = (
            this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
          ).changingThisBreaksApplicationSecurity;
          file = file.replace('data:image/jpeg;base64,', '');
          this.accountData.acountpancardimage = file;

        } else {
      
          event.target.value = '';
        }
      }
      else{
        alert('Accept Only Jpg files Only..');
        event.target.value = '';
      }
      } else {
        //this.ngxToaster.warning('file is Empty !!!, Please try again.');
        event.target.value = '';
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  
}
