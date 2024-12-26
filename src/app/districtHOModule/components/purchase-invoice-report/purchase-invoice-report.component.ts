import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { DistrictHoService } from '../../services/district-ho.service';

@Component({
  selector: 'app-purchase-invoice-report',
  templateUrl: './purchase-invoice-report.component.html',
  styleUrls: ['./purchase-invoice-report.component.css']
})
export class PurchaseInvoiceReportComponent implements OnInit {
  

  constructor( private route: ActivatedRoute,
    private utils: UtilsService,
    private districtHOAPI: DistrictHoService,
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private session: SessionService) { }
  PurchaseOrderDetails = {
    Ponumber:'',
    StockentryDocupload:'',
    DistrictName:'',
  PurchaseOrderDate:'',
  Order:'',
  Units:'',
  TotalRate:'',
        


  };
  PoList=[];
  PDetailsList=[];
  AddDetailsview_div=false;
  OrderDetailsview_div=false;

  ngOnInit(): void {
    
 this.PoDetailsList();

  }

  async PoDetailsList(): Promise<void> {
    try {
      this.spinner.show();
      const req={
        type:"4",DISTRICT_ID:this.session.districtId
      }
     
      const res = await this.districtHOAPI.PurchaseDetailsGet(req);
      debugger;
      if (res.success) {
         
        this.PoList = res.result;
       
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async PurchaseDetailsList(Ponumber): Promise<void> {
    try {
      this.spinner.show();
      const req={
        type:"5",DISTRICT_ID:this.session.districtId,PURCHASE_ORDER:Ponumber
      }
     
      const res = await this.districtHOAPI.PurchaseDetailsGet(req);
      debugger;
      if (res.success) {
        this.spinner.hide();
        this.PDetailsList = res.result;
        this.AddDetailsview_div=true;
        
       
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  // btnPdfView(url): void {
  //   if (this.utils.isEmpty(url)) {
  //     this.toast.warning('Document Not Found !!!');
  //   } else {
  //     window.open(url, '_blank');
  //   }
  // }

  async btnSubmitDetails():Promise<void>{
    try{

      if($('#StockentryDoc').val()=="")
      {
        this.toast.warning('Please Select Stock Entry Doc');
        return;
      }
      else{
        this.spinner.show();

 const reqpurchase={
        type:"6",DISTRICT_ID:this.session.districtId, PURCHASE_ORDER:this.PurchaseOrderDetails.Ponumber,INPUT_06:this.PurchaseOrderDetails.StockentryDocupload,INPUT_07:this.session.mobileNumber
      }
  const res = await this.districtHOAPI.PurchaseInvoiceIns(reqpurchase);

  
  

  if (res.success) {
   
    this.spinner.hide();


    this.toast.success("Purchage order Data Successfully ....!");
    window.location.reload();
  }
  else{
    this.toast.info("Purchage order Failed ....!");
  }
      }
    }
    catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }

  }

  // async btnPdfView(path: string): Promise<void> {
  //   try {
  //     const req = {
  //       filePath: path,
  //     };
  //     debugger;
  //     this.spinner.show();
  //     const response = await this.districtHOAPI.fileDownload(req);
  //     this.spinner.hide();
  //     if (response.success) {
  //       this.utils.viewPDF(response.result);
  //     } else {
  //       this.toast.info(response.message);
  //     }
  //   } catch (error) {
  //     this.spinner.hide();
  //     this.utils.catchResponse(error);
  //   }
  // }

  async btnPdfView(pdf): Promise<void> {
    try {
     const url=  this.utils.baseUrl() +pdf;
      window.open(url, '_blank',"width=600,height=600");
   
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }

  }

  // async StockentryDocupload(event: any): Promise<void> {
  //   try {

  //     if(event.target.files[0].type === 'application/pdf')
  //     {

      
  //     if (event.target.files.length > 0) {
  //       const response: any = await this.utils.fileUploadEncodedString(
  //         event,
  //         this.utils.fileSize.oneMB
  //       );
  //       if (response) {
  //         let file = (
  //           this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
  //         ).changingThisBreaksApplicationSecurity;
  //         file = file.replace('data:application/pdf;base64,', '');
  //          = file;
  //         debugger;
  //       } else {
  //         this.toast.warning('file is Empty !!!, Please try again.');
  //         event.target.value = '';
  //       }
  //     } else {
  //       this.toast.warning('file is Empty !!!, Please try again.');
  //       event.target.value = '';
  //     }
  //   }
  //   else{
  //     this.toast.warning('only accept pdf files ..!!, Please try again.');
  //     event.target.value = '';
  //   }
  //   } catch (error) {
  //     this.utils.catchResponse(error);
  //   }
  // }
  

  // async btnPdfView(pdf): Promise<void> {
  //   try {
  //     this.spinner.show();
  //     this.utils.viewPDF(pdf);
  //     // const res = await this.utils.CommissionerFileDownload(pdf);
  //     // if (res.success) {
  //     //   this.utils.viewPDF(res.result);
  //     //   // this.utils.downloadPdf(res.result,pdf);
  //     // //  this.utils.viewPDF(res.result);
  //     // //   let signedByPdf = 'data:application/pdf, ' + res.result;
  //     // //   window.open(signedByPdf, '_blank');
  //     // } else {
  //     //   this.toast.info(res.message);
  //     // }
  //     this.spinner.hide();
  //   } catch (error) {
  //     this.spinner.hide();
  //     this.utils.catchResponse(error);
  //   }
  // }

  async StockChange(Ponumber):Promise<void>{
    this.PurchaseDetailsList(Ponumber);
    // let obj = this.districtListdata.find(data=>data.DIST_CODE==DistCode);
    // this.PurchaseOrder.DistrictName=obj.DIST_NAME;
    // this.PurchaseOrder.Districtid=obj.DIST_CODE;
// alert(obj.DIST_NAME);

//     this.spinner.show();
     


}

async StockentryDocupload(event): Promise<void> {
  try {
   if(event.target.files[0].type === 'application/pdf')
   {
    const res = await this.utils.encodedString(
      event,
      this.utils.fileType.PDF,
      this.utils.fileSize.fiveMB
    );
    if (res) {
              
       this.PurchaseOrderDetails.StockentryDocupload = res.replace('data:application/pdf;base64,','');
 


    }
    else{
      this.PurchaseOrderDetails.StockentryDocupload='';
      this.toast.warning('file is Empty !!!, Please try again.');
        event.target.value = '';
    }
  }
  else{
    this.toast.warning('Accepted Only PDF Files !!!, Please try again.');
        event.target.value = '';
  }
  } catch (error) {
    this.utils.catchResponse(error);
  }
}



}
