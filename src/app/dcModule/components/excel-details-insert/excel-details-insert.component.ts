import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import * as XLSX from 'xlsx';

import { delay } from 'rxjs/operators';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { DcModuleService } from '../../services/dc-module.service';
 
@Component({
  selector: 'app-excel-details-insert',
  templateUrl: './excel-details-insert.component.html',
  styleUrls: ['./excel-details-insert.component.css']
})
export class ExcelDetailsInsertComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private utils: UtilsService,
    private logger: LoggerService,
    private payment:DcModuleService,
  
    private session: SessionService,
         private router: Router) { }

  excelData=[];
  excelDataSample_handling=[];
  districtListdata=[];
  PaymentDetailsdata=[];
  CycleList=[];
  MonthList=[];
  YearList=[];
  RefNumberList=[];

  FramerTablediv=false;
  Fromadntodiv=false;
  E_Details_Save=false;
  Cyclediv=false;
  Sample_milkTablediv=false;
  Handling_ChargersTablediv=false;
  Paymentfilediv=false;
  Handlingfilediv=false;
  Monthlediv=false;

  PaymentDetails={
    yearId:'',
    Months:'',
    
    Dairynames:'',
    Milktype:'',
    FarmerLaks:'',
    Milk_LLPD:'',
    Price_Fat:'',
    Additional_Benfts:'',

    Excelfile:'',
    Paymnet_Type:'',
    FormData:'',
    ToDate:'',
    DistrictId:'',
    CycleCode:'',
    exceltype:'',
    Paymnet_Type_M:''

  }
  ExcelSample_handling={
    DISTRICT:'',
    RBK_NAME:'',
    AMCU_CODE:'',
    AMCU_NAME:'',
    PROCUREMENT:'',
    HANDLING_CHARGES_AMOUNT_RECEIVABLE:'',
    SAMPLE_MILK_QTY:'',
    SAMPLE_MILK_AMOUNT:'',
    TOTAL_AMOUNT_RECEIVABLE:'',
    Internet_charges:'',
    Software_charges:'',
    Other_Material_Deduction:'',
    TDS_Deduction:'',
    Loss_due_to_quality_variation:'',
    TS_Recovery:'',
    Total_Deductions:'',
    AMOUNT_credited_TO_THE_MDAC:'',
    AMOUNT_PAYMENT_DATE:''
    }
  ExcelDataDetails={
    Next_Working_Day_Date:'',
    CRN_No:'',
  	Batch_No:'',	
    Corporate_Product:'',	
    Payment_Method:'',	
    Debit_Ac_No:'',
    Corporate_Account_Description:'',	
    Beneficiary_Name:'',	
    Beneficiary_Ac_no:'',	
    Amount_Payable:'',	
    IFSC_Code_MICR_Code_IIN:'',	
    UTR_RBI_Reference_No_Core_Ref_No:'',	
    Transaction_Status:'',
    Funding_Date:'',	
    Paid_Date:'',	
    Activation_Date:'',    
    RefNumberId:'',
     Society_Code:'', 
    Farmer_Code:'',    

  }

  ngOnInit(): void {
    this.PaymentDetails.FormData = this.session.getTodayDateString();
    this.PaymentDetails.ToDate = this.session.getTodayDateString();
    this.loadDistrictList();
    this.loadCycleList();
    this.loadRefnumberList();
    this.loadYearList();
    this.loadMonthList();
  }


  

  onChangePaymnetType(){
    if(this.PaymentDetails.Paymnet_Type=="2")
    {
this.Fromadntodiv=true;
this.Cyclediv=false;
this.Monthlediv=false;
    }
    else{
      this.Fromadntodiv=false;
      this.Cyclediv=true;
      this.Monthlediv=false;
    }
  }

  onChangehandlingType(){
    if(this.PaymentDetails.Paymnet_Type=="20")
    {
this.Fromadntodiv=true;
this.Monthlediv=false;
 
      this.Cyclediv=false;
    }
    else{
      this.Fromadntodiv=false;
      this.Monthlediv=true;
      this.Fromadntodiv=false;
      this.Cyclediv=false;
    }
  }

  async loadDistrictList(): Promise<void> {
    try {
      this.spinner.show();
      const reqdistrict={
        type:"8"
      }
      //const res = await this.districtlistapi.districtList();
      const res = await this.payment.PaymnetDetailsGet(reqdistrict);
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
 

  async loadCycleList(): Promise<void> {
    try {
      this.spinner.show();
      const reqdistrict={
        type:"1"
      }
      //const res = await this.districtlistapi.districtList();
      const res = await this.payment.PaymnetDetailsGet(reqdistrict);
      if (res.success) {
         
        this.CycleList = res.result;
       
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async loadYearList(): Promise<void> {
    try {
      this.spinner.show();
      const reqdistrict={
        type:"102"
      }
      //const res = await this.districtlistapi.districtList();
      const res = await this.payment.PaymnetDetailsGet(reqdistrict);
      if (res.success) {
         
        this.YearList = res.result;
       
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async loadMonthList(): Promise<void> {
    try {
      this.spinner.show();
      const reqdistrict={
        type:"101"
      }
      //const res = await this.districtlistapi.districtList();
      const res = await this.payment.PaymnetDetailsGet(reqdistrict);
      if (res.success) {
         
        this.MonthList = res.result;
       
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async loadRefnumberList(): Promise<void> {
    try {
      this.spinner.show();
      const reqdistrict={
        type:"2"
      }
      const res = await this.payment.PaymnetDetailsGet(reqdistrict);
      if (res.success) {
         
        this.RefNumberList = res.result;
        this.ExcelDataDetails.RefNumberId=this.RefNumberList[0]["REF_ID"];
        debugger;
       
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  fileupload(ev) {
    this.spinner.show();
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    debugger;
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        if(this.PaymentDetails.exceltype=="1"){
          this.excelData = XLSX.utils.sheet_to_json(sheet);
          this.spinner.hide();
        }
        if(this.PaymentDetails.exceltype=="2"){
          this.excelDataSample_handling = XLSX.utils.sheet_to_json(sheet);
          this.spinner.hide();
        }
         
       
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
      console.log(this.PaymentDetailsdata);
      
     // document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
     // this.setDownload(dataString);
    }
    reader.readAsBinaryString(file);
  }
  onbtnExcelData(){
  //  this.excelData.forEach(element => {
    this.spinner.show();
    if (this.utils.isEmpty(this.PaymentDetails.Excelfile)) {
      this.toast.warning('Please Upload Excel File');
       
    }else{
      if(this.PaymentDetails.exceltype=="1")
    {
this.FramerTablediv=true;
this.Sample_milkTablediv=false;
this.Handling_ChargersTablediv=false;
this.spinner.hide();
 
    }
    else if(this.PaymentDetails.exceltype=="2"){
      this.FramerTablediv=false;
this.Sample_milkTablediv=true;
this.Handling_ChargersTablediv=false;
this.spinner.hide();
    }
    else if(this.PaymentDetails.exceltype=="3"){
      this.FramerTablediv=false;
      this.Sample_milkTablediv=false;
      this.Handling_ChargersTablediv=true;
      this.spinner.hide();
    
    }
    else{
      this.FramerTablediv=true;
 
    }

      
    }
    
      
    
  //  });
  }

 randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  async onbtnSaveData(): Promise<void> {

    if(this.PaymentDetails.exceltype=="1"){
   

    for (let i = 0; i < this.excelData.length; i++) {

      this.ExcelDataDetails.Corporate_Product= this.excelData[i]["Corporate_Product"];
      this.ExcelDataDetails.Next_Working_Day_Date= this.excelData[i]["Next_Working_Day_Date"];
      this.ExcelDataDetails.CRN_No= this.excelData[i]["CRN_No"];
      this.ExcelDataDetails.Batch_No= this.excelData[i]["Batch_No"];
      this.ExcelDataDetails.Payment_Method= this.excelData[i]["Payment_Method"];
      this.ExcelDataDetails.Beneficiary_Name= this.excelData[i]["Beneficiary_Name"];
      this.ExcelDataDetails.Beneficiary_Ac_no= this.excelData[i]["Beneficiary_Ac_no"];
      this.ExcelDataDetails.Amount_Payable= this.excelData[i]["Amount_Payable"];
      this.ExcelDataDetails.UTR_RBI_Reference_No_Core_Ref_No= this.excelData[i]["UTR_RBI_Reference_No_Core_Ref_No"];
      this.ExcelDataDetails.IFSC_Code_MICR_Code_IIN= this.excelData[i]["IFSC_Code_MICR_Code_IIN"];
      this.ExcelDataDetails.UTR_RBI_Reference_No_Core_Ref_No= this.excelData[i]["UTR_RBI_Reference_No_Core_Ref_No"];
      this.ExcelDataDetails.Transaction_Status= this.excelData[i]["Transaction_Status"];
      this.ExcelDataDetails.Funding_Date= this.excelData[i]["Funding_Date"];
      this.ExcelDataDetails.Paid_Date= this.excelData[i]["Paid_Date"];
      this.ExcelDataDetails.Activation_Date= this.excelData[i]["Activation_Date"];
      this.ExcelDataDetails.Society_Code= this.excelData[i]["Society_Code"];
      this.ExcelDataDetails.Farmer_Code= this.excelData[i]["Farmer_Code"];

      this.PaymentInsert();
      // const reqdistrict={
      //   type:"5", Corporate_Product:this.ExcelDataDetails.Corporate_Product,
      //         Society_Code:this.ExcelDataDetails.Society_Code,  
      //   Farmer_Code:this.ExcelDataDetails.Farmer_Code,
      //            Next_WorkingDay_Date:this.ExcelDataDetails.Next_Working_Day_Date,  
      //   CRN_No:this.ExcelDataDetails.CRN_No,  
      //   Batch_No:this.ExcelDataDetails.Batch_No,  
      //   Payment_Method:this.ExcelDataDetails.Payment_Method,  
      //   Debit_Ac_No:this.ExcelDataDetails.Debit_Ac_No, 
      //   Corporate_Account_Description:this.ExcelDataDetails.Corporate_Account_Description,  
      //   Beneficiary_Name:this.ExcelDataDetails.Beneficiary_Name,  
      //   Beneficiary_Ac_no:this.ExcelDataDetails.Beneficiary_Ac_no,  
      //   REF_NO:this.ExcelDataDetails.RefNumberId,  
      //   Amount_Payable:this.ExcelDataDetails.Amount_Payable,  
      //   IFSC_Code_MICR_Code_IIN:this.ExcelDataDetails.IFSC_Code_MICR_Code_IIN,  
      //   UTR_RBI_Ref_No_Core_Ref_No:this.ExcelDataDetails.UTR_RBI_Reference_No_Core_Ref_No,  
      //   Transaction_Status:this.ExcelDataDetails.Transaction_Status, 
      //   Funding_Date:this.ExcelDataDetails.Funding_Date,  
      //   Paid_Date:this.ExcelDataDetails.Paid_Date,  
      //   Activation_Date:this.ExcelDataDetails.Activation_Date,  
      //   INSERTED_ON:'',   
      //  INSERTED_BY:this.session.userName,  
      //   INPUT_01:'',  
      //  INPUT_02:'',  
      //  INPUT_03:'',  
      //  INPUT_04:'',  
      //  INPUT_05:''  
      // }
      
      // this.spinner.show();
      //       const res = await this.payment.MilkPaymnetDetailsInsert(reqdistrict);
      // if (res.success) {

      //   // if(this.excelData.length==)
         
      //   this.RefNumberList = res.result;
        
       
      // } else { 
      //   this.spinner.hide();
      //   this.toast.info(res.message);
      // }
      this.spinner.hide();
       console.log(this.excelData[i]);
     }
     debugger;
     const reqdistrict={
      type:"3",REF_NO:this.ExcelDataDetails.RefNumberId,
    }
    
    const res = await this.payment.PaymnetDetailsGet(reqdistrict);
    
    if (res.success) {
       console.log(res.result[0]["RECORD_COUNT"]);
       debugger
      if(this.excelData.length ==res.result[0]["RECORD_COUNT"])
      {
          this.E_Details_Save=true;

      }
      else{
        this.E_Details_Save=false;
        const reqdistrict={
          type:"4",REF_NO:this.ExcelDataDetails.RefNumberId,
        }

        const res = await this.payment.PaymnetDetailsGet(reqdistrict);
        if (res.success) {
          this.FramerTablediv=false;
          this.PaymentDetails.Excelfile='';
          this.toast.info('Excel Details Not Upload Properly  "Re-Upload Exceal Details"');

        }
        else{
         // this.toast.info('Excel Details Not Upload Properly  "Re-Upload Exceal Details"');
        }

      }
      
     
    } else {
      this.toast.info(res.message);
    }
    this.spinner.hide();
  }
  if(this.PaymentDetails.exceltype=="2"){
    
    try{
      debugger;
      

         for (let i = 0; i < this.excelDataSample_handling.length; i++) {
       
      
      
      this.ExcelSample_handling.DISTRICT=this.excelDataSample_handling[i]["DISTRICT"];
      this.ExcelSample_handling.RBK_NAME=this.excelDataSample_handling[i]["RBK_NAME"];
      this.ExcelSample_handling.AMCU_CODE=this.excelDataSample_handling[i]["AMCU_CODE"];
      this.ExcelSample_handling.AMCU_NAME=this.excelDataSample_handling[i]["AMCU_NAME"];
      this.ExcelSample_handling.PROCUREMENT=this.excelDataSample_handling[i]["PROCUREMENT"];
      this.ExcelSample_handling.HANDLING_CHARGES_AMOUNT_RECEIVABLE=this.excelDataSample_handling[i]["HANDLING_CHARGES_AMOUNT_RECEIVABLE"];
      this.ExcelSample_handling.SAMPLE_MILK_QTY=this.excelDataSample_handling[i]["SAMPLE_MILK_QTY"];
      this.ExcelSample_handling.SAMPLE_MILK_AMOUNT=this.excelDataSample_handling[i]["SAMPLE_MILK_AMOUNT"];
      this.ExcelSample_handling.TOTAL_AMOUNT_RECEIVABLE=this.excelDataSample_handling[i]["TOTAL_AMOUNT_RECEIVABLE"];
      this.ExcelSample_handling.Internet_charges=this.excelDataSample_handling[i]["INTERNET_CHARGES"];
      this.ExcelSample_handling.Software_charges=this.excelDataSample_handling[i]["SOFTWARE_CHARGES"];
      this.ExcelSample_handling.Other_Material_Deduction=this.excelDataSample_handling[i]["OTHER_MATERIAL_DEDUCTION"];
      this.ExcelSample_handling.TDS_Deduction=this.excelDataSample_handling[i]["TDS_DEDUCTION"];
      this.ExcelSample_handling.Loss_due_to_quality_variation=this.excelDataSample_handling[i]["LOSS_DUE_TO_QUALITY_VARIATION"];
      this.ExcelSample_handling.TS_Recovery=this.excelDataSample_handling[i]["TS_RECOVERY"];
      this.ExcelSample_handling.Total_Deductions=this.excelDataSample_handling[i]["TOTAL_DEDUCTIONS"];
      this.ExcelSample_handling.AMOUNT_credited_TO_THE_MDAC=this.excelDataSample_handling[i]["AMOUNT_CREDITED_TO_THE_MDAC"];
      this.ExcelSample_handling.AMOUNT_PAYMENT_DATE=this.excelDataSample_handling[i]["AMOUNT_PAYMENT_DATE"];

    // this.HandlingCharges();
    delay(this.randomInteger(800, 15000));
     
      const reqdistrict={
        type:"105", Corporate_Product:this.ExcelSample_handling.DISTRICT,
              Society_Code:this.ExcelSample_handling.RBK_NAME,  
        Farmer_Code:this.ExcelSample_handling.AMCU_CODE,
                 Next_WorkingDay_Date:this.ExcelSample_handling.AMCU_NAME,  
        CRN_No:this.ExcelSample_handling.PROCUREMENT,  
        Batch_No:this.ExcelSample_handling.HANDLING_CHARGES_AMOUNT_RECEIVABLE,  
        Payment_Method:this.ExcelSample_handling.SAMPLE_MILK_QTY,  
        Debit_Ac_No:this.ExcelSample_handling.SAMPLE_MILK_AMOUNT, 
        Corporate_Account_Description:this.ExcelSample_handling.TOTAL_AMOUNT_RECEIVABLE,  
        Beneficiary_Name:this.ExcelSample_handling.Internet_charges,  
        Beneficiary_Ac_no:this.ExcelSample_handling.Software_charges,  
        REF_NO:this.ExcelDataDetails.RefNumberId,       
        Amount_Payable:this.ExcelSample_handling.TDS_Deduction,  
        IFSC_Code_MICR_Code_IIN:this.ExcelSample_handling.Loss_due_to_quality_variation,  
        UTR_RBI_Ref_No_Core_Ref_No:this.ExcelSample_handling.TS_Recovery,  
        Transaction_Status:this.ExcelSample_handling.Total_Deductions, 
        Funding_Date:this.ExcelSample_handling.AMOUNT_credited_TO_THE_MDAC,  
        Paid_Date:this.ExcelSample_handling.AMOUNT_PAYMENT_DATE,  
        Activation_Date:this.ExcelSample_handling.Other_Material_Deduction,   
        INSERTED_ON:'',   
       INSERTED_BY:this.session.userName,  
        INPUT_01:'',  
       INPUT_02:'',  
       INPUT_03:'',  
       INPUT_04:'',  
       INPUT_05:''  
      }
 
      this.spinner.show();
      delay(this.randomInteger(800, 150000));
            const res = await this.payment.MilkPaymnetDetailsInsert(reqdistrict);
            delay(this.randomInteger(800, 150000));
      if (res.success) {
        delay(this.randomInteger(800, 15000));
        // if(this.excelData.length==)
         
        this.RefNumberList = res.result;
        this.spinner.hide();
        
       
      } else { 
        this.spinner.hide();
        this.toast.info(res.message);
       
       
        
      }
     
       
      this.spinner.hide();
       console.log(this.excelDataSample_handling[i]);
       
       delay(this.randomInteger(50, 15000));
        
     }
     debugger;
     this.CountCheck();



    
  }
  catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
    window.location.reload();
  }
}

  

    
  }
//Handling Chanrges Insert Data
  async HandlingCharges():Promise<void>{
    const reqdistrict={
      type:"105", Corporate_Product:this.ExcelSample_handling.DISTRICT,
            Society_Code:this.ExcelSample_handling.RBK_NAME,  
      Farmer_Code:this.ExcelSample_handling.AMCU_CODE,
               Next_WorkingDay_Date:this.ExcelSample_handling.AMCU_NAME,  
      CRN_No:this.ExcelSample_handling.PROCUREMENT,  
      Batch_No:this.ExcelSample_handling.HANDLING_CHARGES_AMOUNT_RECEIVABLE,  
      Payment_Method:this.ExcelSample_handling.SAMPLE_MILK_QTY,  
      Debit_Ac_No:this.ExcelSample_handling.SAMPLE_MILK_AMOUNT, 
      Corporate_Account_Description:this.ExcelSample_handling.TOTAL_AMOUNT_RECEIVABLE,  
      Beneficiary_Name:this.ExcelSample_handling.Internet_charges,  
      Beneficiary_Ac_no:this.ExcelSample_handling.Software_charges,  
      REF_NO:this.ExcelDataDetails.RefNumberId,       
      Amount_Payable:this.ExcelSample_handling.TDS_Deduction,  
      IFSC_Code_MICR_Code_IIN:this.ExcelSample_handling.Loss_due_to_quality_variation,  
      UTR_RBI_Ref_No_Core_Ref_No:this.ExcelSample_handling.TS_Recovery,  
      Transaction_Status:this.ExcelSample_handling.Total_Deductions, 
      Funding_Date:this.ExcelSample_handling.AMOUNT_credited_TO_THE_MDAC,  
      Paid_Date:this.ExcelSample_handling.AMOUNT_PAYMENT_DATE,  
      Activation_Date:this.ExcelSample_handling.Other_Material_Deduction,   
      INSERTED_ON:'',   
     INSERTED_BY:this.session.userName,  
      INPUT_01:'',  
     INPUT_02:'',  
     INPUT_03:'',  
     INPUT_04:'',  
     INPUT_05:''  
    }

    this.spinner.show();
          const res = await this.payment.MilkPaymnetDetailsInsert(reqdistrict);
    if (res.success) {

      // if(this.excelData.length==)
       
      this.RefNumberList = res.result;
      this.spinner.hide();
      
     
    } else { 
      this.spinner.hide();
      this.toast.info(res.message);
    }
    this.spinner.hide();
    
  }
//Payment Details Insert
  async PaymentInsert():Promise<void>{

    
    const reqdistrict={
      type:"5", Corporate_Product:this.ExcelDataDetails.Corporate_Product,
            Society_Code:this.ExcelDataDetails.Society_Code,  
      Farmer_Code:this.ExcelDataDetails.Farmer_Code,
               Next_WorkingDay_Date:this.ExcelDataDetails.Next_Working_Day_Date,  
      CRN_No:this.ExcelDataDetails.CRN_No,  
      Batch_No:this.ExcelDataDetails.Batch_No,  
      Payment_Method:this.ExcelDataDetails.Payment_Method,  
      Debit_Ac_No:this.ExcelDataDetails.Debit_Ac_No, 
      Corporate_Account_Description:this.ExcelDataDetails.Corporate_Account_Description,  
      Beneficiary_Name:this.ExcelDataDetails.Beneficiary_Name,  
      Beneficiary_Ac_no:this.ExcelDataDetails.Beneficiary_Ac_no,  
      REF_NO:this.ExcelDataDetails.RefNumberId,  
      Amount_Payable:this.ExcelDataDetails.Amount_Payable,  
      IFSC_Code_MICR_Code_IIN:this.ExcelDataDetails.IFSC_Code_MICR_Code_IIN,  
      UTR_RBI_Ref_No_Core_Ref_No:this.ExcelDataDetails.UTR_RBI_Reference_No_Core_Ref_No,  
      Transaction_Status:this.ExcelDataDetails.Transaction_Status, 
      Funding_Date:this.ExcelDataDetails.Funding_Date,  
      Paid_Date:this.ExcelDataDetails.Paid_Date,  
      Activation_Date:this.ExcelDataDetails.Activation_Date,  
      INSERTED_ON:'',   
     INSERTED_BY:this.session.userName,  
      INPUT_01:'',  
     INPUT_02:'',  
     INPUT_03:'',  
     INPUT_04:'',  
     INPUT_05:''  
    }
    
    this.spinner.show();
          const res = await this.payment.MilkPaymnetDetailsInsert(reqdistrict);
    if (res.success) {

      // if(this.excelData.length==)
       
      this.RefNumberList = res.result;
      
     
    } else { 
      this.spinner.hide();
      this.toast.info(res.message);
    }
    this.spinner.hide();
    
  }
//Excel Count Check in Handling Charges
  async CountCheck():Promise<void>{
    const reqdistrict={
      type:"103",REF_NO:this.ExcelDataDetails.RefNumberId,
    }
    
    const res = await this.payment.PaymnetDetailsGet(reqdistrict);
    
    if (res.success) {
       console.log(res.result[0]["RECORD_COUNT"]);
       debugger
      if(this.excelDataSample_handling.length ==res.result[0]["RECORD_COUNT"])
      {
          this.E_Details_Save=true;

      }
      else{
        this.E_Details_Save=false;
        this.RemoveExlData();
        

      }
      
     
    } else {
      this.toast.info(res.message);
    }
    this.spinner.hide();
  }
  //Excel Remove in Handling Charges
  async RemoveExlData():Promise<void>{
    const req={
      type:"104",REF_NO:this.ExcelDataDetails.RefNumberId,
    }

    const res = await this.payment.PaymnetDetailsGet(req);
    if (res.success) {
      this.FramerTablediv=false;
      this.PaymentDetails.Excelfile='';
      this.toast.info('Excel Details Not Upload Properly  "Re-Upload Exceal Details"');

    }
    else{
     // this.toast.info('Excel Details Not Upload Properly  "Re-Upload Exceal Details"');
    }
  }

   async btnAddDetails():Promise<void>  {

    if(this.PaymentDetails.exceltype=="1")
    {
      if (this.utils.isEmpty(this.PaymentDetails.DistrictId)) {
        this.toast.warning('Please select District');
        return;
      }
      if (this.PaymentDetails.Paymnet_Type=="1") {

        if (this.utils.isEmpty(this.PaymentDetails.CycleCode)) {
          this.toast.warning('Please Select Cycle');
          return;
        }
        

      }
      if(this.PaymentDetails.Paymnet_Type=="2"){

        if (this.utils.isEmpty(this.PaymentDetails.FormData)) {
          this.toast.warning('Please Select From Date');
          return;
        }
        if (this.utils.isEmpty(this.PaymentDetails.ToDate)) {
          this.toast.warning('Please Select To Date');
          return;
        }
      }
      else{

    
    

    try {
      this.spinner.show();
      const reqdistrict={
        type:"7",INPUT_01:this.PaymentDetails.DistrictId,INPUT_02:this.PaymentDetails.CycleCode,
        Payment_Method:this.PaymentDetails.Paymnet_Type,INPUT_03:this.PaymentDetails.FormData,
        INPUT_04:this.PaymentDetails.ToDate,REF_NO:this.ExcelDataDetails.RefNumberId,
        INSERTED_BY:this.session.userName,
      }
      const res = await this.payment.PaymnetDetailsGet(reqdistrict);
      if (res.success) {
         
        
        this.toast.success("Excel Details Add Successfully...!");
         
       
      } else {
        this.toast.info("Excel Details Not Added Please Check...!");
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  }
  if(this.PaymentDetails.exceltype=="2")
    {
       
      try {

        if (this.PaymentDetails.exceltype=="2") {

        if (this.utils.isEmpty(this.PaymentDetails.Excelfile)) {
          this.toast.warning('Please Select Excel File Type');
          return;
        }
        if (this.utils.isEmpty(this.PaymentDetails.DistrictId)) {
          this.toast.warning('Please Select District');
          return;
        }
        if (this.PaymentDetails.Paymnet_Type_M=="10") {

          if (this.utils.isEmpty(this.PaymentDetails.yearId)) {
            this.toast.warning('Please Select Year');
            return;
          }
          if (this.utils.isEmpty(this.PaymentDetails.Months)) {
            this.toast.warning('Please Select Month');
            return;
          }

        }
        if(this.PaymentDetails.Paymnet_Type_M=="20"){

          if (this.utils.isEmpty(this.PaymentDetails.FormData)) {
            this.toast.warning('Please Select From Date ');
            return;
          }
          if (this.utils.isEmpty(this.PaymentDetails.ToDate)) {
            this.toast.warning('Please Select To Date');
            return;
          }
        }
        else{
          this.spinner.show();
          debugger;
          const reqdistrict={
            type:"107",INPUT_01:this.PaymentDetails.DistrictId,INPUT_02:this.PaymentDetails.yearId,
            Payment_Method:this.PaymentDetails.Paymnet_Type_M,INPUT_03:this.PaymentDetails.FormData,
            INPUT_04:this.PaymentDetails.ToDate,REF_NO:this.ExcelDataDetails.RefNumberId,
            INSERTED_BY:this.session.userName,INPUT_05:this.PaymentDetails.Months
          }
          const res = await this.payment.PaymnetDetailsGet(reqdistrict);
          if (res.success) {
             
            
            this.toast.success("Excel Details Add Successfully...!");
            window.location.reload();
           
          } else {
            this.toast.info("Excel Details Not Added Please Check...!");
          }
          this.spinner.hide();
        } 
        }

          
           
        }
        catch (error) {
          this.spinner.hide();
          this.utils.catchResponse(error);
        }
      }
     

    
  
     
       
 }
  //API's

  onChangeexcelType(){
    if(this.PaymentDetails.exceltype=="1")
    {

this.Paymentfilediv=true;
this.Handlingfilediv=false;

    }
    else{
      this.Paymentfilediv=false;
      this.Handlingfilediv=true;
    }
    

  }

  

   

}
