import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DcoService } from 'src/app/dcoModule/service/dco.service';
import { DlcoService } from 'src/app/dlcoModule/services/dlco.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-approved-rbkdetails',
  templateUrl: './approved-rbkdetails.component.html',
  styleUrls: ['./approved-rbkdetails.component.css']
})
export class ApprovedRBKDetailsComponent implements OnInit {

  APPROVED_RBKList=[];
  excelData=[];
  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private utils: UtilsService,
    private dcoAPI: DcoService,
    private dlcoAPI: DlcoService,
    private session: SessionService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.LoadApprovedData();
  }

  async LoadApprovedData(): Promise<void> {
    try {
      const req = { type:"5",rbkId:this.session.uniqueId,status:this.session.districtId }; 
      this.spinner.show();
      // const res = await this.commAPI.CommissionerFinalGet(req); 
       const res = await this.dlcoAPI.eSignDocumentsGet(req); 
       debugger;
       console.log(res);
      this.APPROVED_RBKList = [];  
      if (res.success) { 
        // this.APPROVED_div=true;
        // this.PENDING_divDoc=false;
        // this.APPROVEDdivDoc=true;
        // this.REJECTED_divDoc=false;
        this.APPROVED_RBKList = res.result; 
     
        this.excelData=res.result;
        //document.getElementById('APPROVED1').style.display='block';
      } else {   
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
     //  this.utils.catchResponse(error);
     
    }
  }

  async btnPdfView(pdf): Promise<void> {
    try {
      this.spinner.show();
      const res = await this.utils.CommissionerFileDownload(pdf);
      if (res.success) {
        this.utils.downloadPdf(res.result,pdf);
        
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnPdfesign(pdf): Promise<void> {
    try {
      this.btnDocumentDownloadpdf(this.utils.crystalReportsesignUrl() +pdf);
   
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }

  }

  btnDocumentDownloadpdf(url):  void  {
    debugger;
    if (this.utils.isEmpty(url)) {
      this.toast.warning('Document Not Found !!!');
    } else { 
      window.open(url, '_blank');
    }
  }

  esignrbkcode='';
  esigndistrictcode='';
  esigncrystalfile='';

          async btnPdfGeneratebylaw(pdf):Promise<void>
         {
       try{
        var str = pdf.split(',');
        this.esignrbkcode=str[1];
        this.esigndistrictcode=str[2];
        debugger;
        if(str[0]=="1")
        {
          const req = { type:"555",rbkId:this.esignrbkcode }; 
        this.spinner.show();
  
         
         const res =await this.dlcoAPI.MDssDlcoandDCOandGMRPT(req); 
         debugger;
         if (res.success) { 
          
  this.esigncrystalfile=res.result;
          const request = { type:"6",rbkId:this.esignrbkcode,status:this.session.districtId,applicationPdfForm:this.esigncrystalfile,updatedBy: this.session.uniqueId };
          const respon=await this.dlcoAPI.eSignDocumentsInsert(request);
          debugger;
          if(respon.success){
  
            this.utils.downloadPdfFile(this.esigncrystalfile,this.esignrbkcode);
            this.toast.success('Download Certificate Successfully');
          }
          else{
            this.toast.info(res.message);
           }
  
           
           
        } else {   
          this.toast.info(res.message);
        }
        this.spinner.hide();
  
  
        }
        else{
          this.btnPdf(str[0]);
         // this.btnDocumentDownloadpdf(this.utils.crystalReportsesignUrl() +str[0]);
        }
  
       }catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
  
     }
  }
  
  
  async btnPdfGenerateProcedings(pdf):Promise<void>
  {
  try{
  var str = pdf.split(',');
  this.esignrbkcode=str[1];
  this.esigndistrictcode=str[2];
  if(str[0]=="1")
  {
   const req = { type:"4004",rbkId:this.esignrbkcode }; 
  this.spinner.show();
  const res =await this.dlcoAPI.MDssDlcoandDCOandGMRPT(req); 
  debugger;
  if (res.success) { 
   
  this.esigncrystalfile=res.result;
   const request = { type:"7",rbkId:this.esignrbkcode,status:this.session.districtId,applicationPdfForm:this.esigncrystalfile,updatedBy:this.session.uniqueId };
   debugger
   const respon=await this.dlcoAPI.eSignDocumentsInsert(request); 
   debugger;
   if(respon.success){
  
     this.utils.downloadPdfFile(this.esigncrystalfile,this.esignrbkcode);
     this.toast.success('Download Certificate Successfully');
   }
   else{
    this.toast.info(res.message);
   }
   
  
    
    
  } else {   
   this.toast.info(res.message);
  }
  this.spinner.hide();
  
  
  }
  else{
   this.btnPdf(str[0]);
  // this.btnDocumentDownloadpdf(this.utils.crystalReportsesignUrl() +str[0]);
  }
  
  }catch (error) {
  this.spinner.hide();
  this.utils.catchResponse(error);
  
  }
  }
  
  async btnPdfGenerateadhok(pdf):Promise<void>
  {
  try{
  var str = pdf.split(',');
  this.esignrbkcode=str[1];
  this.esigndistrictcode=str[2];
  if(str[0]=="1")
  {
   const req = { type:"4014",rbkId:this.esignrbkcode }; 
  this.spinner.show();
  const res =await this.dlcoAPI.MDssDlcoandDCOandGMRPT(req); 
   
  if (res.success) { 
   
  this.esigncrystalfile=res.result;
   const request = { type:"8",rbkId:this.esignrbkcode,status:this.session.districtId,applicationPdfForm:this.esigncrystalfile,updatedBy:this.session.uniqueId };
   
   const respon=await this.dlcoAPI.eSignDocumentsInsert(request); 
   
   if(respon.success){
  
     this.utils.downloadPdfFile(this.esigncrystalfile,this.esignrbkcode);
     this.toast.success('Download Certificate Successfully');
   }else{
    this.toast.info(res.message);
   }
  
    
    
  } else {   
   this.toast.info(res.message);
  }
  this.spinner.hide();
  
  
  }
  else{
   this.btnPdf(str[0]);
  // this.btnDocumentDownloadpdf(this.utils.crystalReportsesignUrl() +str[0]);
  }
  
  }catch (error) {
  this.spinner.hide();
  this.utils.catchResponse(error);
  
  }
  }

  async btnPdf(pdf): Promise<void> {
    try {
      this.btnDocumentDownloadpdf(this.utils.mdssUrl() +pdf);
   
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async btnApprovedExcelDownload(): Promise<void> {
    this.utils.JSONToCSVConvertor(
      this.excelData,
      'Approved Rsk Details Report',
      true
    );
  }

}
