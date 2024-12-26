import { Component, OnInit,  ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { MastersService } from 'src/app/shared/services/masters.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { McuMappingService } from '../../services/mcu-mapping.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-loandetails',
  templateUrl: './loandetails.component.html',
  styleUrls: ['./loandetails.component.css']
})
export class LoandetailsComponent implements OnInit {
    farmerId = '';
    FARMER_CODE='';
    ifscCode='';
   ExistingLoans=false;
    NewLoans=false;
     feeds=true;
    ExistingLoansreports=false;
    purposeloan=true;
    purposeloantxt=false;
    ExistingLoansreportsList=[];
    bankList = [];
    // countList= {
    //   EXISTING_LOAN_COUNT: '0',
    //   NEW_LOAN_COUNT: '0',

    // ];
  bankData={
    TYPE_OF_LOAN:'',
    INSTITUTION_ID:'',
    INSTITUTION_NAME:'',
    TYPE_OF_LOAN_ID:'',
    TYPE_OF_INSTITUTION:'',
    PURPOSE_OF_LOAN_NO:'',
    PURPOSE_OF_LOAN:'',
    PURPOSE_OF_LOAN_TYPES_NO:'',
    PURPOSE_OF_LOAN_TYPESothers:'',
    LOANAPDATE:'',
    LOAN_SANCTIONED_DATE:'',
    ACCOUNT_NO: '',
    IFSC_CODE: '',
    BANK_NAME: '',
    AMOUNT_OF_LOAN_SANCTIONED:'',
    BRANCH_NAME:'',
    IS_FILING_OF_APPLICATION:'',
    GIVEN_CONSENT:'',
    passBookImg: '',
    insertedBy: '',
    source: '',
    bankAccountName: '',
    pinCode: '',
    LoanAmount:'',
    InstalmentAmount:'',
    noofInstalment:'',
    paidInstalments:'',
    pendingInstalments:'',
    EXISTING_LOAN_COUNT:'',
    NEW_LOAN_COUNT:'',
    FARMERCODE:'',
    FARMER_NAME:'',
    IS_FARMER_IS_MILK_POURER:'',
  };
  bankAccLength: any;
  // accountData = {
  //   LOAN_SANCTIONED_DATE:'',
  //   LOANAPPDATE:'',
  //   ACCOUNT_NO: '',
  //   IFSC_CODE: '',
  //   BANK_NAME: '',
  //   BRANCH_NAME: '',
  //   passBookImg: '',
  //   insertedBy: '',
  //   source: '',
  //   bankAccountName: '',
  //   pinCode: '',
  //   LoanAmount:'',
  //   InstalmentAmount:'',
  //   noofInstalment:'',
  //   paidInstalments:'',
  //   pendingInstalments:'',
  //   PURPOSE_OF_LOAN_TYPESothers:'', 
  // };
  BANKList=[];
    LOANList=[];
    rbkList = [];
    PURPOSEList=[];
    FEEDList=[];
    scheduleData = {
      districtId: '',
      mandalId: '',
      mentorId: '',
     // rbkId: '',
      villageId: '',
      meetingVenue: '',
      meetingVenueAddress: '',
      meetingDate: '',
      meetingTime: '',
      meetingAgenda: '',
      insertedBy: '',
      source: '',
      INSTITUTION_ID:'',
      TYPE_OF_LOAN_ID:'',
    };
  // districtName: any;
   
    requestType = '';
    headingText='';
    societyChangeList = [];
  dashboardCounts = {
    EXISTING_LOAN_COUNT: '0',
    NEW_LOAN_COUNT: '0',
    //REJECTED_FARMERS: '0',
  }

  // @ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;
  //   dtOptions: DataTables.Settings = {};
     dtTrigger: Subject<any> = new Subject();

  constructor( 
    private mcuAPI: McuMappingService,
    private spinner: NgxSpinnerService,
    private utils: UtilsService,
    private toast: ToasterService,
    private session: SessionService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ""){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
   // this.CLEAR();
    this.NewLoans=false;
    this.ExistingLoans=false;
  }

  CLEAR(): void 
  {
    try
    {
   this.bankData.TYPE_OF_LOAN='';
   this.bankData.INSTITUTION_ID='';
   this.bankData.INSTITUTION_NAME='';
   this.bankData.TYPE_OF_LOAN_ID='';
   this.bankData.TYPE_OF_INSTITUTION='';
   this.bankData.PURPOSE_OF_LOAN_NO='';
   this.bankData.PURPOSE_OF_LOAN_TYPES_NO='';
   this.bankData.PURPOSE_OF_LOAN_TYPESothers='';
   this.bankData.LOANAPDATE='';
   this.bankData.LOAN_SANCTIONED_DATE='';
   this.bankData.ACCOUNT_NO='';
   this.bankData.IFSC_CODE='';
   this.bankData.BANK_NAME='';
   this.bankData.BRANCH_NAME='';
   this.bankData.  passBookImg='';
    this.bankData. insertedBy='';
    this.bankData. source='';
    this.bankData. bankAccountName='';
    this.bankData. pinCode='';
    this.bankData. LoanAmount='';
    this.bankData. InstalmentAmount='';
    this.bankData. noofInstalment='';
    this.bankData. paidInstalments='';
    this.bankData.pendingInstalments='';
    }
    catch(error)
    {

    }

  }
  
  async LoancountList(): Promise<void> {
    try {
     // this.countList = [];
      const req = {
        FARMER_CODE: this.farmerId,
      };
      this.spinner.show();
      const response = await this.mcuAPI.loanscountByFarmercode(req);
      if (response.success) {
        this.dashboardCounts = response.result;
       this.dashboardCounts.EXISTING_LOAN_COUNT= response.result[0]["EXISTING_LOAN_COUNT"];
       this.dashboardCounts.NEW_LOAN_COUNT= response.result[0]["NEW_LOAN_COUNT"];
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }



  async loadFeedList(): Promise<void> {
    try {
      this.FEEDList = [];
      const req = {
        PURPOSE_OF_LOAN_TYPES:this.bankData.PURPOSE_OF_LOAN_NO
      };
      this.spinner.show();
      const response = await this.mcuAPI.animalfeedtypes(req);
      if (response.success) {
        this.FEEDList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async loadBANKList(): Promise<void> {
    try {
      this.BANKList = [];
      const req = {
       // uniqueId: this.session.rbkGroupId,
      };
      this.spinner.show();
      const response = await this.mcuAPI.typesofBanks(req);
      if (response.success) {
        this.BANKList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async loadpurposeList(): Promise<void> {
    try {
      this.PURPOSEList = [];
      const req = {
        //uniqueId: this.session.rbkGroupId,
      };
      this.spinner.show();
      const response = await this.mcuAPI.purposeofLoantypes(req);
      if (response.success) {
        this.PURPOSEList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onbankChange(): Promise<void> {
    try {
      this.bankData.TYPE_OF_LOAN = '';
      this.LOANList = [];
      if (this.bankData.INSTITUTION_ID === '') {
        return;
      }
      const req = {       
       TYPE_OF_INSTITUTION: this.bankData.INSTITUTION_ID,       
      };
      this.spinner.show();
      const response =  await this.mcuAPI.typesofLoanBankID(req);
      if (response.success) {
        this.LOANList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  
  async onPurposeChange(): Promise<void> {
    try { 
      if ( this.bankData.PURPOSE_OF_LOAN_NO === '131' ||  this.bankData.PURPOSE_OF_LOAN_NO === '132'
          ) {
            this.purposeloan=true;
            this.purposeloantxt=false;
          }
          else   {
            this.purposeloan=false;
            this.purposeloantxt=true;
             } 

      this.LOANList = [];
      this.loadFeedList();
    //  this.spinner.hide();
    } catch (error) {
     // this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  
  async btnVerifyIfscCode(): Promise<void> {
    try {
      if (this.utils.isEmpty(this.bankData.ACCOUNT_NO)) {
        this.toast.warning('Please Enter Bank Account Number');
        return;
      }
      if (this.utils.isEmpty(this.bankData.IFSC_CODE)) {
        this.toast.warning('Please Enter Farmer Code');
        return;
      }
      const req = {
        ifscCode: this.bankData.IFSC_CODE,
      };
      this.spinner.show();
      const response = await this.mcuAPI.searchByIFSC(req);
      if (response.success) {
        let count = 0;
        for (let i = 0; i < response.result.length; i++) {
          if (
            this.bankData.ACCOUNT_NO.length.toString() ===
            response.result[i].ACCOUNTLENGTH
          ) {
            this.bankData.BANK_NAME = response.result[i].BANK;
            this.bankData.BRANCH_NAME = response.result[i].BRANCH;
            this.bankAccLength = response.result[i].ACCOUNTLENGTH;
            count++;
            break;
          }
        }
        if (count < 1) {
          this.toast.info('Invalid bank account number for entered IFSC Code');
        }
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async btnSocietyChangeDashboardDetails(obj): Promise<void> {
    try {
      this.requestType = obj;
      // const req = {
      //    districtId: this.session.districtId,
      //   actionTaken: this.requestType,
      // };

      if (
        this.requestType === '0' //&&        this.dashboardCounts.EXISTING_LOAN_COUNT === '0'
        
      ) {
      //   if(this.farmerId!=''){
      //      this.CLEAR();
      //   this.BANKList=[];
      //   this.LOANList=[];
      //   this.rbkList = [];
      //   this.PURPOSEList=[];
      //    this.loadBANKList();
      //    this.loadpurposeList(); 

      //  // this.loadFeedList();
      //   this.ExistingLoans=true;
      //   this.NewLoans=false;
      //   this.ExistingLoansreports=true;
      //   }
      //   else {
      //     this.toast.warning('Please Enter Former Code');          
      //   }
      //   return;
      if (this.utils.isEmpty(this.farmerId)) {
        this.toast.warning('Please Enter farmer code');
        return;
      }

        this.BANKList=[];
        this.LOANList=[];
        this.rbkList = [];
        this.PURPOSEList=[];
        this.loadBANKList();
        this.loadpurposeList();
         
        this.LoancountList();
        this.ExistingLoans=true;
        this.NewLoans=false;
        this.ExistingLoansreports=true;
      }
      if (
        this.requestType === '1' //&&        this.dashboardCounts.NEW_LOAN_COUNT === '0'
      
      ) {
        if(this.farmerId!=''){
           this.CLEAR();
        this.BANKList=[];
        this.LOANList=[];
        this.rbkList = [];
        this.PURPOSEList=[];
          this.loadBANKList();
          this.loadpurposeList();



      //  this.loadFeedList();
        this.ExistingLoans=false;
        this.NewLoans=true;
        this.ExistingLoansreports=false; return;
        }else
        {
          this.toast.warning('Please Enter Former Code');
          
        } 
      } 

      this.spinner.show();
      let res: any;
      if (this.requestType === null) {
        this.headingText = 'Existing Loans';
        res =null;// await this.districtHOAPI.HOPendingList(req);
      } else if (this.requestType === '1') {
        this.headingText = 'New Loans';
        res = null;//await this.districtHOAPI.HOApprovedList(req);
      }
      //  else if (this.requestType === '2') {
      //   this.headingText = 'REJECTED  LIST';
      //   res = null;//await this.districtHOAPI.HORejectedList(req);
      // }
      this.spinner.hide();

      this.societyChangeList = [];
      if (res.success) {
        this.societyChangeList = res.result;
      } else {
        this.toast.info(res.message);
      }
      this.rerender();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  
  async btnfarmerDetails(): Promise<void> {
    try {
      if (this.utils.isEmpty(this.farmerId)) {
        this.toast.warning('Please Enter farmer code');
        return;
      }

        this.BANKList=[];
        this.LOANList=[];
        this.rbkList = [];
        this.PURPOSEList=[];
        this.loadBANKList();
        this.loadpurposeList();
         
        this.LoancountList();
        this.ExistingLoans=true;
        this.NewLoans=false;
        this.ExistingLoansreports=true;

         
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

 
  
  async btnloanDetails(): Promise<void> {
    try {

      if (this.utils.isEmpty(this.farmerId)) {
        this.toast.warning('Please Enter farmer code');
        return;
      }

     // if ( this.requestType === null || this.dashboardCounts.EXISTING_LOAN_COUNT === '0'  || 
      if(this.requestType === "" || this.requestType === '0') //test
       {
        //this.toast.warning('Please Enter Existing Loan' );

          if (this.validate()) 
          {
            this.spinner.show();
         
this.bankData.FARMERCODE=this.farmerId;
this.bankData.TYPE_OF_LOAN=this.bankData.TYPE_OF_LOAN_ID;
this.bankData.BANK_NAME=this.bankData.BANK_NAME;
this.bankData.BRANCH_NAME=this.bankData.BRANCH_NAME;
this.bankData.TYPE_OF_INSTITUTION=this.bankData.INSTITUTION_ID;
this.bankData.AMOUNT_OF_LOAN_SANCTIONED=this.bankData.LoanAmount;
this.bankData.IS_FILING_OF_APPLICATION='0';
this.bankData.GIVEN_CONSENT='0';
this.bankData.FARMER_NAME=this.bankData.bankAccountName;
this.bankData.IS_FARMER_IS_MILK_POURER="0";
this.bankData.InstalmentAmount=this.bankData.InstalmentAmount;
this.bankData.noofInstalment=this.bankData.noofInstalment;
this.bankData.paidInstalments=this.bankData.paidInstalments;
this.bankData.pendingInstalments=this.bankData.pendingInstalments;


  
            // const req = {

            //  this.bankData.TYPE_OF_LOAN :"0",
            //  this.bankData.FARMERCODE:this.farmerId             

            // };

        const response = await this.mcuAPI.existingLoanDetailsSub(this.bankData);
        if (response.success) {
          alert(response.message);
          window.location.reload();
        } else {
          this.spinner.hide();
          this.toast.info(response.message);
        }
          }
        

       }  
       else  if ( this.requestType === '1')
       {
        
          this.toast.warning('Please Enter New Loan');
         if (this.validate()) 
          {
            
          }
       }
       else
       {
       // this.toast.warning('Please select Existing or New Loan'  );
       }



  
      
      const req = {
        FARMER_CODE:this.farmerId,
      };
      this.spinner.show();
      const response = await this.mcuAPI.farmercodedetailsGet(req); 
        if (response.success) {
          this.ExistingLoansreportsList = response.result;
        } else {
          this.toast.info(response.message);
        } 
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


  validate(): boolean {

    if (
      this.bankData.INSTITUTION_ID === '' ||
      this.bankData.INSTITUTION_ID === null ||
      this.bankData.INSTITUTION_ID === undefined
    ) {
      this.toast.warning('Please Select Bank');
      return false;
    }

    if (
      this.bankData.TYPE_OF_LOAN_ID === '' ||
      this.bankData.TYPE_OF_LOAN_ID === null ||
      this.bankData.TYPE_OF_LOAN_ID === undefined
    ) {
      this.toast.warning('Please Select Type of Loan');
      return false;
    }
    
    if (
      this.bankData.PURPOSE_OF_LOAN_NO === '' ||
      this.bankData.PURPOSE_OF_LOAN_NO === null ||
      this.bankData.PURPOSE_OF_LOAN_NO === undefined
    ) {
      this.toast.warning('Please Select Purpose of Loan');
      return false;
    }
    else
    {
      if( this.bankData.PURPOSE_OF_LOAN_NO === '131' || 
          this.bankData.PURPOSE_OF_LOAN_NO === '132' )
        {  
          if (this.bankData.PURPOSE_OF_LOAN_TYPES_NO === '' ||
            this.bankData.PURPOSE_OF_LOAN_TYPES_NO === null ||
            this.bankData.PURPOSE_OF_LOAN_TYPES_NO === undefined
          ) {
            this.toast.warning('Please Select Loan Purpose Type ');
            return false;
          }
          else
          this.bankData.PURPOSE_OF_LOAN= this.bankData.PURPOSE_OF_LOAN_TYPES_NO;

        }
        else
        {
          if (
            this.bankData.PURPOSE_OF_LOAN_TYPESothers === '' ||
            this.bankData.PURPOSE_OF_LOAN_TYPESothers === null ||
            this.bankData.PURPOSE_OF_LOAN_TYPESothers === undefined
          ) {
            this.toast.warning('Please Enter Loan Purpose Type');
            return false;
          }
          else
          this.bankData.PURPOSE_OF_LOAN= this.bankData.PURPOSE_OF_LOAN_TYPESothers;
        }

    }  

    if (
      this.bankData.ACCOUNT_NO === '' ||
      this.bankData.ACCOUNT_NO === null ||
      this.bankData.ACCOUNT_NO === undefined
    ) {
      this.toast.warning('Please Enter Bank Account No');
      return false;
    }

    if (
      this.bankData.IFSC_CODE === '' ||
      this.bankData.IFSC_CODE === null ||
      this.bankData.IFSC_CODE === undefined
    ) {
      this.toast.warning('Please Enter IFSC CODE');
      return false;
    }

    if (
      this.bankData.BANK_NAME === '' ||
      this.bankData.BANK_NAME === null ||
      this.bankData.BANK_NAME === undefined
    ) {
      this.toast.warning('Please Enter Bank Name');
      return false;
    }
    if (
      this.bankData.BRANCH_NAME === '' ||
      this.bankData.BRANCH_NAME === null ||
      this.bankData.BRANCH_NAME === undefined
    ) {
      this.toast.warning('Please submit verify IFSC_CODE IT WILL DISPLAY  Branch Name');
      return false;
    }
if(this.bankData.bankAccountName===''||this.bankData.bankAccountName===null||this.bankData.bankAccountName===undefined )
{ this.toast.warning('Please submit verify IFSCCODE IT WILL DISPLAY Bank Account Name');return false;}

if(this.bankData.pinCode===''||this.bankData.pinCode===null||this.bankData.pinCode===undefined )
{ this.toast.warning('Please Enter PinCode');return false;}

if(this.bankData.LOANAPDATE===''||this.bankData.LOANAPDATE===null||this.bankData.LOANAPDATE===undefined )
{ this.toast.warning('Please select Loan applied Date ');return false;}

     
if(this.bankData.LOAN_SANCTIONED_DATE===''||this.bankData.LOAN_SANCTIONED_DATE===null||this.bankData.LOAN_SANCTIONED_DATE===undefined )
{ this.toast.warning('Please select Loan Saction Date ');return false;}

if(this.bankData.LoanAmount===''||this.bankData.LoanAmount===null||this.bankData.LoanAmount===undefined )
{ this.toast.warning('Please Enter Loan Amount ');return false;}

if(this.bankData.InstalmentAmount===''||this.bankData.InstalmentAmount===null||this.bankData.InstalmentAmount===undefined )
{ this.toast.warning('Please Enter Instalment Amount   ');return false;}

if(this.bankData.noofInstalment===''||this.bankData.noofInstalment===null||this.bankData.noofInstalment===undefined )
{ this.toast.warning('Please Enter No Of Instalments ');return false;}

    
    
if(this.bankData.paidInstalments===''||this.bankData.paidInstalments===null||this.bankData.paidInstalments===undefined )
{ this.toast.warning('Please Enter Paid Instalments ');return false;}

if(this.bankData.pendingInstalments===''||this.bankData.pendingInstalments===null||this.bankData.pendingInstalments===undefined )
{ this.toast.warning('Please Enter Pending Instalments ');return false;}

    
    
    
    
    



    
    // {
    //   if (
    //     this.mcuData.rbkId === '' ||
    //     this.mcuData.rbkId === null ||
    //     this.mcuData.rbkId === undefined
    //   ) {
    //     this.toast.warning('Please Select RBK');
    //     return false;
    //   }
  
    //   if (
    //     this.mcuData.routeId === '' ||
    //     this.mcuData.routeId === null ||
    //     this.mcuData.routeId === undefined
    //   ) {
    //     this.toast.warning('Please Select ROUTE');
    //     return false;
    //   }
  
    //   if (
    //     this.mcuData.villageId === '' ||
    //     this.mcuData.villageId === null ||
    //     this.mcuData.villageId === undefined
    //   ) {
    //     this.toast.warning('Please Select Village');
    //     return false;
    //   }
  
    //   if (
    //     this.mcuData.villageClassification === '' ||
    //     this.mcuData.villageClassification === null ||
    //     this.mcuData.villageClassification === undefined
    //   ) {
    //     this.toast.warning('Please Select Village Classification');
    //     return false;
    //   }
  
    //   if (
    //     this.mcuData.routePosition === '' ||
    //     this.mcuData.routePosition === null ||
    //     this.mcuData.routePosition === undefined
    //   ) {
    //     this.toast.warning('Please Enter Village Position In Route');
    //     return false;
    //   }
  
    //   if (
    //     this.mcuData.dailyMilkProductionCapacity === '' ||
    //     this.mcuData.dailyMilkProductionCapacity === null ||
    //     this.mcuData.dailyMilkProductionCapacity === undefined
    //   ) {
    //     this.toast.warning('Please Enter Daily Milk Production Capacity');
    //     return false;
    //   }
  
    //   if (
    //     this.mcuData.animalHusbAssitName === '' ||
    //     this.mcuData.animalHusbAssitName === null ||
    //     this.mcuData.animalHusbAssitName === undefined
    //   ) {
    //     this.toast.warning('Please Enter Animal HusbanDry Assistant Name');
    //     return false;
    //   }
  
    //   if (
    //     this.mcuData.animalHusbAssitMobileno === '' ||
    //     this.mcuData.animalHusbAssitMobileno === null ||
    //     this.mcuData.animalHusbAssitMobileno === undefined
    //   ) {
    //     this.toast.warning(
    //       'Please Enter Animal Husbandry Assistant Mobile Number'
    //     );
    //     return false;
    //   }
  
    //   if (!this.utils.mobileNumCheck(this.mcuData.animalHusbAssitMobileno)) {
    //     this.toast.warning(
    //       'Please Enter Valid Animal Husbandry Assistant Mobile Number'
    //     );
    //     return false;
    //   }
    //   if (
    //     this.mcuData.animalHusbAssitUidNum === '' ||
    //     this.mcuData.animalHusbAssitUidNum === null ||
    //     this.mcuData.animalHusbAssitUidNum === undefined
    //   ) {
    //     this.toast.warning(
    //       'Please Enter Animal Husbandry Assistant Aadhar Number'
    //     );
    //     return false;
    //   }
  
    //   if (!this.utils.validateVerhoeff(this.mcuData.animalHusbAssitUidNum)) {
    //     this.toast.warning(
    //       'Please Enter Valid Animal Husbandry Assistant Aadhaar Number'
    //     );
    //     return false;
    //   }
  
    //   if (
    //     this.mcuData.digitalAssitName === '' ||
    //     this.mcuData.digitalAssitName === null ||
    //     this.mcuData.digitalAssitName === undefined
    //   ) {
    //     this.toast.warning('Please Enter Digital Assistant Name');
    //     return false;
    //   }
  
    //   if (
    //     this.mcuData.digitalAssitMobileno === '' ||
    //     this.mcuData.digitalAssitMobileno === null ||
    //     this.mcuData.digitalAssitMobileno === undefined
    //   ) {
    //     this.toast.warning('Please Enter Digital Assistant Mobile Number');
    //     return false;
    //   }
  
    //   if (!this.utils.mobileNumCheck(this.mcuData.digitalAssitMobileno)) {
    //     this.toast.warning('Please Enter Valid Digital Assistant Mobile Number');
    //     return false;
    //   }
    //   if (
    //     this.mcuData.digitalAssitUidNum === '' ||
    //     this.mcuData.digitalAssitUidNum === null ||
    //     this.mcuData.digitalAssitUidNum === undefined
    //   ) {
    //     this.toast.warning('Please Enter Digital Assistant  Aadhar Number');
    //     return false;
    //   }
  
    //   if (!this.utils.validateVerhoeff(this.mcuData.digitalAssitUidNum)) {
    //     this.toast.warning('Please Enter Valid Digital Assistant Aadhaar Number');
    //     return false;
    //   }
  
    //   if (
    //     this.mcuData.welfareAssistantName === '' ||
    //     this.mcuData.welfareAssistantName === null ||
    //     this.mcuData.welfareAssistantName === undefined
    //   ) {
    //     this.toast.warning('Please Enter Wellfare Assistant Name');
    //     return false;
    //   }
  
    //   if (
    //     this.mcuData.welfareAssistantMobileno === '' ||
    //     this.mcuData.welfareAssistantMobileno === null ||
    //     this.mcuData.welfareAssistantMobileno === undefined
    //   ) {
    //     this.toast.warning('Please Enter Wellfare Assistant Mobile Number');
    //     return false;
    //   }
  
    //   if (!this.utils.mobileNumCheck(this.mcuData.welfareAssistantMobileno)) {
    //     this.toast.warning('Please Enter Valid Wellfare Assistant Mobile Number');
    //     return false;
    //   }
  
    //   if (
    //     this.mcuData.welfareAssistantUidNum === '' ||
    //     this.mcuData.welfareAssistantUidNum === null ||
    //     this.mcuData.welfareAssistantUidNum === undefined
    //   ) {
    //     this.toast.warning('Please Enter Wellfare Assistant Aadhar Number');
    //     return false;
    //   }
  
    //   if (!this.utils.validateVerhoeff(this.mcuData.welfareAssistantUidNum)) {
    //     this.toast.warning(
    //       'Please Enter Valid  Wellfare Assistan Aadhaar Number'
    //     );
    //     return false;
    //   }
  
    //   if (
    //     this.mcuData.villageAnimatorName === '' ||
    //     this.mcuData.villageAnimatorName === null ||
    //     this.mcuData.villageAnimatorName === undefined
    //   ) {
    //     this.toast.warning('Please Enter Village Animator Name');
    //     return false;
    //   }
  
    //   if (
    //     this.mcuData.villageAnimatorMobileno === '' ||
    //     this.mcuData.villageAnimatorMobileno === null ||
    //     this.mcuData.villageAnimatorMobileno === undefined
    //   ) {
    //     this.toast.warning('Please Enter Village Animator Mobile Number');
    //     return false;
    //   }
  
    //   if (!this.utils.mobileNumCheck(this.mcuData.villageAnimatorMobileno)) {
    //     this.toast.warning('Please Enter Valid Village Animator Mobile Number');
    //     return false;
    //   }
  
    //   if (
    //     this.mcuData.villageAnimatorUidNum === '' ||
    //     this.mcuData.villageAnimatorUidNum === null ||
    //     this.mcuData.villageAnimatorUidNum === undefined
    //   ) {
    //     this.toast.warning('Please Enter Village Animator Aadhar Number');
    //     return false;
    //   }
  
    //   if (!this.utils.validateVerhoeff(this.mcuData.villageAnimatorUidNum)) {
    //     this.toast.warning('Please Enter Valid Village Animator Aadhaar Number');
    //     return false;
    //   }
  
    //   if (
    //     this.mcuData.networkWithMaxCoverage === '' ||
    //     this.mcuData.networkWithMaxCoverage === null ||
    //     this.mcuData.networkWithMaxCoverage === undefined
    //   ) {
    //     this.toast.warning('Please Select Network With Maximum Coverage');
    //     return false;
    //   }
  
      return true;
    }

 


  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();

      dtInstance.clear();

      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
   

  // async btnSubmit(): Promise<void> {
  //   try {
  //     if (this.validate()) {
  //       this.mcuData.districtId = this.session.districtId;
  //       this.mcuData.mandalId = this.session.mandalId;
  //       this.mcuData.rbkGroupId = this.session.rbkGroupId;
  //       this.mcuData.insertedBy = this.session.userName;
  //       this.mcuData.source = 'web';
  //       this.spinner.show();
  //       const response = await this.mcuAPI.milkCenterUpdate(this.mcuData);
  //       if (response.success) {
  //         alert(response.message);
  //         window.location.reload();
  //       } else {
  //         this.spinner.hide();
  //         this.toast.info(response.message);
  //       }
  //     }
  //   } catch (error) {
  //     this.spinner.hide();
  //     this.utils.catchResponse(error);
  //   }
  // }

  // validate(): boolean {
  //   if (
  //     this.mcuData.rbkId === '' ||
  //     this.mcuData.rbkId === null ||
  //     this.mcuData.rbkId === undefined
  //   ) {
  //     this.toast.warning('Please Select RBK');
  //     return false;
  //   }

  //   if (
  //     this.mcuData.routeId === '' ||
  //     this.mcuData.routeId === null ||
  //     this.mcuData.routeId === undefined
  //   ) {
  //     this.toast.warning('Please Select ROUTE');
  //     return false;
  //   }

  //   if (
  //     this.mcuData.villageId === '' ||
  //     this.mcuData.villageId === null ||
  //     this.mcuData.villageId === undefined
  //   ) {
  //     this.toast.warning('Please Select Village');
  //     return false;
  //   }

  //   if (
  //     this.mcuData.villageClassification === '' ||
  //     this.mcuData.villageClassification === null ||
  //     this.mcuData.villageClassification === undefined
  //   ) {
  //     this.toast.warning('Please Select Village Classification');
  //     return false;
  //   }

  //   if (
  //     this.mcuData.routePosition === '' ||
  //     this.mcuData.routePosition === null ||
  //     this.mcuData.routePosition === undefined
  //   ) {
  //     this.toast.warning('Please Enter Village Position In Route');
  //     return false;
  //   }

  //   if (
  //     this.mcuData.dailyMilkProductionCapacity === '' ||
  //     this.mcuData.dailyMilkProductionCapacity === null ||
  //     this.mcuData.dailyMilkProductionCapacity === undefined
  //   ) {
  //     this.toast.warning('Please Enter Daily Milk Production Capacity');
  //     return false;
  //   }

  //   if (
  //     this.mcuData.animalHusbAssitName === '' ||
  //     this.mcuData.animalHusbAssitName === null ||
  //     this.mcuData.animalHusbAssitName === undefined
  //   ) {
  //     this.toast.warning('Please Enter Animal HusbanDry Assistant Name');
  //     return false;
  //   }

  //   if (
  //     this.mcuData.animalHusbAssitMobileno === '' ||
  //     this.mcuData.animalHusbAssitMobileno === null ||
  //     this.mcuData.animalHusbAssitMobileno === undefined
  //   ) {
  //     this.toast.warning(
  //       'Please Enter Animal Husbandry Assistant Mobile Number'
  //     );
  //     return false;
  //   }

  //   if (!this.utils.mobileNumCheck(this.mcuData.animalHusbAssitMobileno)) {
  //     this.toast.warning(
  //       'Please Enter Valid Animal Husbandry Assistant Mobile Number'
  //     );
  //     return false;
  //   }
  //   if (
  //     this.mcuData.animalHusbAssitUidNum === '' ||
  //     this.mcuData.animalHusbAssitUidNum === null ||
  //     this.mcuData.animalHusbAssitUidNum === undefined
  //   ) {
  //     this.toast.warning(
  //       'Please Enter Animal Husbandry Assistant Aadhar Number'
  //     );
  //     return false;
  //   }

  //   if (!this.utils.validateVerhoeff(this.mcuData.animalHusbAssitUidNum)) {
  //     this.toast.warning(
  //       'Please Enter Valid Animal Husbandry Assistant Aadhaar Number'
  //     );
  //     return false;
  //   }

  //   if (
  //     this.mcuData.digitalAssitName === '' ||
  //     this.mcuData.digitalAssitName === null ||
  //     this.mcuData.digitalAssitName === undefined
  //   ) {
  //     this.toast.warning('Please Enter Digital Assistant Name');
  //     return false;
  //   }

  //   if (
  //     this.mcuData.digitalAssitMobileno === '' ||
  //     this.mcuData.digitalAssitMobileno === null ||
  //     this.mcuData.digitalAssitMobileno === undefined
  //   ) {
  //     this.toast.warning('Please Enter Digital Assistant Mobile Number');
  //     return false;
  //   }

  //   if (!this.utils.mobileNumCheck(this.mcuData.digitalAssitMobileno)) {
  //     this.toast.warning('Please Enter Valid Digital Assistant Mobile Number');
  //     return false;
  //   }
  //   if (
  //     this.mcuData.digitalAssitUidNum === '' ||
  //     this.mcuData.digitalAssitUidNum === null ||
  //     this.mcuData.digitalAssitUidNum === undefined
  //   ) {
  //     this.toast.warning('Please Enter Digital Assistant  Aadhar Number');
  //     return false;
  //   }

  //   if (!this.utils.validateVerhoeff(this.mcuData.digitalAssitUidNum)) {
  //     this.toast.warning('Please Enter Valid Digital Assistant Aadhaar Number');
  //     return false;
  //   }

  //   if (
  //     this.mcuData.welfareAssistantName === '' ||
  //     this.mcuData.welfareAssistantName === null ||
  //     this.mcuData.welfareAssistantName === undefined
  //   ) {
  //     this.toast.warning('Please Enter Wellfare Assistant Name');
  //     return false;
  //   }

  //   if (
  //     this.mcuData.welfareAssistantMobileno === '' ||
  //     this.mcuData.welfareAssistantMobileno === null ||
  //     this.mcuData.welfareAssistantMobileno === undefined
  //   ) {
  //     this.toast.warning('Please Enter Wellfare Assistant Mobile Number');
  //     return false;
  //   }

  //   if (!this.utils.mobileNumCheck(this.mcuData.welfareAssistantMobileno)) {
  //     this.toast.warning('Please Enter Valid Wellfare Assistant Mobile Number');
  //     return false;
  //   }

  //   if (
  //     this.mcuData.welfareAssistantUidNum === '' ||
  //     this.mcuData.welfareAssistantUidNum === null ||
  //     this.mcuData.welfareAssistantUidNum === undefined
  //   ) {
  //     this.toast.warning('Please Enter Wellfare Assistant Aadhar Number');
  //     return false;
  //   }

  //   if (!this.utils.validateVerhoeff(this.mcuData.welfareAssistantUidNum)) {
  //     this.toast.warning(
  //       'Please Enter Valid  Wellfare Assistan Aadhaar Number'
  //     );
  //     return false;
  //   }

  //   if (
  //     this.mcuData.villageAnimatorName === '' ||
  //     this.mcuData.villageAnimatorName === null ||
  //     this.mcuData.villageAnimatorName === undefined
  //   ) {
  //     this.toast.warning('Please Enter Village Animator Name');
  //     return false;
  //   }

  //   if (
  //     this.mcuData.villageAnimatorMobileno === '' ||
  //     this.mcuData.villageAnimatorMobileno === null ||
  //     this.mcuData.villageAnimatorMobileno === undefined
  //   ) {
  //     this.toast.warning('Please Enter Village Animator Mobile Number');
  //     return false;
  //   }

  //   if (!this.utils.mobileNumCheck(this.mcuData.villageAnimatorMobileno)) {
  //     this.toast.warning('Please Enter Valid Village Animator Mobile Number');
  //     return false;
  //   }

  //   if (
  //     this.mcuData.villageAnimatorUidNum === '' ||
  //     this.mcuData.villageAnimatorUidNum === null ||
  //     this.mcuData.villageAnimatorUidNum === undefined
  //   ) {
  //     this.toast.warning('Please Enter Village Animator Aadhar Number');
  //     return false;
  //   }

  //   if (!this.utils.validateVerhoeff(this.mcuData.villageAnimatorUidNum)) {
  //     this.toast.warning('Please Enter Valid Village Animator Aadhaar Number');
  //     return false;
  //   }

  //   if (
  //     this.mcuData.networkWithMaxCoverage === '' ||
  //     this.mcuData.networkWithMaxCoverage === null ||
  //     this.mcuData.networkWithMaxCoverage === undefined
  //   ) {
  //     this.toast.warning('Please Select Network With Maximum Coverage');
  //     return false;
  //   }

  //   return true;
  // }

}

 
