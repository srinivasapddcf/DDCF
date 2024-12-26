import { DOCUMENT } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { feasibilitySubModel } from 'src/app/mentorModule/models/bmcu-building-construction.model';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { MastersService } from 'src/app/shared/services/masters.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { JcService } from '../../../services/jc.service';

@Component({
  selector: 'app-jdamculandhandover',
  templateUrl: './jdamculandhandover.component.html',
  styleUrls: ['./jdamculandhandover.component.css']
})
export class JdbamculandhandoverComponent implements OnInit {

  maxDate: Date;
  input = '';
  date: any;
  possessionHandOverPopUp = false;
  rpttyeid='';
  typeid='0';
  rstatus='0';
  pstatus='0';
  rbkList = [];
  routeList = [];
  villageList = [];
  mandalList = [];
  milkPouringVillageList=[];
  divchk=true;
  divchk1=true;
  divpossission=false;
  divall=true;
  divchkrevnuetxt=true;
  divuploadpos=true;
  LandAllocateData = {
    rbkId: '',
    villageId: '',
    mandalId: '',
    districtId: '',
    //handOverDate: '',
    //positionTakenDate: '',
   // landReceivedByName: '',
    //landReceivedMobileNo: '',
   // landReceivedByDesig: '',
    handOverByName: '',
    handOverByMobileNo: '',
    handOverByDesig: '',
    positionTakenImage: '',
    POSSESSION_CERT_JD_SUB: '',
    ALIENATION_PDF_JD_SUB: '',
    REVENUE_CERT_JD_SUB: '',
    milkPouringVillageId:'',
    // alienationPdf: '',
    // revenuPdf: '',
    signedByPerson: '',
    signedByPersonPdf: '',
    insertedBy: '',
    source: '',
    rpttyeid:'',


    
    ProcTYPE:'',
    AMCU_BMCU_STATUS:'',
    UPDATED_BY:'',
    DIST_CODE:'',
    MANDAL_CODE: '',
    RBK_CODE:'',
    REVENUE_VILLAGE_CODE:'',   
     
    updatedBy:''
  };

  landPossessionStatement = {
    rpttyeid:'',
    districtId: '',
    rbkId: '',
    villageId: '',
    mandalId: '',
    districtName: '',
    mandalName: '',
    divisionName: '',   
    acres: '',
    cents: '',
    villageName: '',
    allottedDate: '',
    northBoundary: '',
    southBoundary: '',
    westBoundary: '',
    eastBoundary: '',
    handedOverByName: '',
    handedOverByDesig: '',
    handedOverByMobileNo: '',
    surveyNo: '',
    takenOverByDesig: '',
    takenOverByMobileNo: '',
    possessionTakenName: '',
  };

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private jcAPI: JcService,
    private utils: UtilsService,
    private logger: LoggerService,
    private session: SessionService,
    private master: MastersService,
    private route: ActivatedRoute
  ) {
    this.maxDate = this.session.getTodayDate();
    route.queryParams.subscribe((params) => (this.input = params['request']));
  }

  ngOnInit(): void { 
    this.divchk=true;
    // const checkbox = document.getElementById('chkRevenu',) as HTMLInputElement | null;    
    //  if (checkbox != null) {
    //   // ✅ Set checkbox checked
    //   checkbox.checked = true;    
    //   // ✅ Set checkbox unchecked
    //   // checkbox.checked = false;
    // }
    if(this.session.uniqueId !="" && this.session.desigId != ''){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    this.loadMandals();
    // const decString = JSON.parse(this.utils.decrypt(this.input));
    // this.LandAllocateData.districtId = decString.districtId ?? '';
    // this.LandAllocateData.mandalId = decString.mandalId ?? '';
    // this.LandAllocateData.rbkId = decString.rbkId ?? '';
    // this.LandAllocateData.villageId = decString.villageId ?? '';

    if (this.LandAllocateData.districtId === '') {
      this.router.navigate(['/jcModule/JdamculandHandover']);  //JdbmculandHandover
    } else if (this.LandAllocateData.mandalId === '') {
      this.router.navigate(['/jcModule/JdamculandHandover']); //JdbmculandHandover
    } else if (this.LandAllocateData.rbkId === '') {
      this.router.navigate(['/jcModule/JdamculandHandover']); //JdbmculandHandover
    } else if (this.LandAllocateData.villageId === '') {
      this.router.navigate(['/jcModule/JdamculandHandover']); //JdbmculandHandover
    }
    // if( this.LandAllocateData.districtId!='' && this.LandAllocateData.mandalId != '' && this.LandAllocateData.rbkId != '' && this.LandAllocateData.villageId != '')
    //  this.loadPossessionTaken();

    // this.loadRBKList();
    //chkRevenu
     

   


  }

  async loadMandals(): Promise<void> {
    try {
      const req = {
        type:"3",
        districtId: this.session.districtId,
      //  type:"28",
      };
      this.spinner.show();
      // const response = await this.jcAPI.amcumandalrbkrvillagebyDistID(req); 
       const response = await this.jcAPI.amcuLandAllotment_select( req );
      if (response.success) {
        this.mandalList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
     // this.utils.catchResponse(""error"");
     this.toast.info("Records not Found");
    }
  }

  onMandalChange(): void {
    this.LandAllocateData.rbkId = '';
    this.LandAllocateData.villageId = '';
    this.rbkList = [];
    if (this.LandAllocateData.mandalId === '') {
      return;
    }
    this.loadRBKList();
  }

  async loadRBKList(): Promise<void> {
    try {
      const req = {
        districtId: this.session.districtId,
        mandalId: this.LandAllocateData.mandalId,
        type:"4",
      };
      this.spinner.show();
     // const response = await this.jcAPI.amcuRbkListByMandalId(req); 
     //const response = await this.jcAPI.amcumandalrbkrvillagebyDistID(req); 
     const response = await this.jcAPI.amcuLandAllotment_select( req );
      if (response.success) {
        this.rbkList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  onRbkChange(): void {
    this.LandAllocateData.villageId = '';
    this.villageList = [];
    if (this.LandAllocateData.rbkId === '') {
      return;
    }
    this.loadVillageList();
  }

  async loadVillageList(): Promise<void> {
    try {
      const req = {
        districtId: this.session.districtId,
        mandalId: this.LandAllocateData.mandalId,
        rbkId: this.LandAllocateData.rbkId,
        type:"5",
      };
      this.spinner.show(); 
    const response = await this.jcAPI.amcuLandAllotment_select( req );
      if (response.success) {
        this.villageList = response.result;


      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onVillageChange(): Promise<void> {
    try {
      if (this.LandAllocateData.villageId === '') {
        return;
      }
      this.milkPouringVillageList = [];
      const req = {
        districtId: this.session.districtId,
        mandalId: this.LandAllocateData.mandalId,
        rbkId: this.LandAllocateData.rbkId,
        revvillageId: this.LandAllocateData.villageId,
        type:"6", 
      }; 
      const response1 = await this.jcAPI.amcuLandAllotment_select( req );
      if (response1.success) {
        this.milkPouringVillageList = response1.result;
      
       


//         const req1 = {
//           districtId: this.session.districtId,
//           mandalId: this.LandAllocateData.mandalId,
//           rbkId: this.LandAllocateData.rbkId,
//           villageId: this.LandAllocateData.villageId,
//         };
//         this.spinner.show();
//         const response = await this.jcAPI.amculandAllocation_Status(req1);   //landAllocationStatus
//         if (response.success) {
// this.btnPossessionHandOverPopUp();

//          // alert("PLEASE CLICK POSSESSION HAND OVER DETAILS"); 
//         }
//         else
//         {
//           alert("PLEASE update land allotment details"); 
//           this.ngOnInit();
//         }
         
//         //amcuPossessioncertificatealienation_check

//        // alert("PLEASE CLICK POSSESSION HAND OVER DETAILS"); //response.message
//         // if (response.result === '2') {
//         //   this.toast.info(response.message);
//         // }
      } else {


        alert(response1.message);
      }
//         const requestData = {
//           districtId: this.session.districtId,
//           mandalId: this.LandAllocateData.mandalId,
//           rbkId: this.LandAllocateData.rbkId,
//           villageId: this.LandAllocateData.villageId,
//         }; 
//         const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
//         this.router.navigate(['/jcModule/JdamculandHandover'], {  //AmcuLandAllocation
//           //queryParams: { request: encryptedString },  JdamculandHandover
//         }); 
//       }
//       this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async btnHandOverPopUp(): Promise<void> { 
    try {
      this.LandAllocateData.POSSESSION_CERT_JD_SUB = '';
      this.LandAllocateData.REVENUE_CERT_JD_SUB = '';

      var elem = document.getElementById('positionStatementPdf');
      if(typeof elem !== 'undefined' && elem !== null) {
        elem.innerHTML = '';
      }
      var elem1 = document.getElementById('allotmentRevenueUpload');
      if(typeof elem1 !== 'undefined' && elem1 !== null) {
        elem1.innerHTML = '';
      }
      
      
    this.LandAllocateData.handOverByName = '';
    this.LandAllocateData.handOverByMobileNo = '';
    this.LandAllocateData.handOverByDesig = '';
    this.possessionHandOverPopUp = true;


  } catch (error) {
    this.spinner.hide();  } 
  }
  async btnPossessionHandOverPopUp(): Promise<void> {
    if (this.LandAllocateData.milkPouringVillageId === '') {
      return;
    }
    const req = {
      type:11,
      districtId: this.session.districtId,
      mandalId: this.LandAllocateData.mandalId,
      rbkId: this.LandAllocateData.rbkId,
      revvillageId: this.LandAllocateData.villageId,
      villageId: this.LandAllocateData.milkPouringVillageId,
    };
    const response = await this.jcAPI.amcuLandAllotment_select( req );
   // const response = await this.jcAPI.handOverStatus(req);
    if (response.success) {
      var str=""; 

      // AL_STATUS: "1"
      // AR_STATUS: "1"
      // HR_STATUS: "1"
      // PC_STATUS: "0"
      // RR_STATUS: "0"
          if(response.result[0].AR_STATUS==="1"  && response.result[0].AL_STATUS==="1")
          {
                  if(response.result[0].HR_STATUS==="0"){ //handover record not available
                    this.LandAllocateData.districtId= this.session.districtId;
                    this.LandAllocateData.mandalId= this.LandAllocateData.mandalId;
                    this.LandAllocateData.rbkId= this.LandAllocateData.rbkId;
                    this.LandAllocateData.villageId= this.LandAllocateData.villageId;

                    const  req22 = {

                      districtId: this.session.districtId,
                      mandalId: this.LandAllocateData.mandalId,
                      rbkId: this.LandAllocateData.rbkId,
                      revvillageId: this.LandAllocateData.milkPouringVillageId,
                      villageId: this.LandAllocateData.villageId,
                      type:"13", 
                    };
                   
                    const response12 = await this.jcAPI.amcuLandAllotment_select( req22 );
                    if (response12.success) {
                      this.landPossessionStatement.possessionTakenName= response12.result[0].TAKEN_NAME;
                      this.landPossessionStatement.takenOverByMobileNo=response12.result[0].TAKEN_MBL; 
                      this. landPossessionStatement.takenOverByDesig=response12.result[0].TAKEN_DESIG; 
                    }
                      else{
                    this.landPossessionStatement.possessionTakenName = '';
                    this.landPossessionStatement.takenOverByMobileNo = '';
                    this.landPossessionStatement.takenOverByDesig = '';
                    this.possessionHandOverPopUp = true;
                      }
                  }
                  else{  

                    const req1 = {
                      districtId: this.session.districtId,
                      mandalId: this.LandAllocateData.mandalId,
                      rbkId: this.LandAllocateData.rbkId,
                      revvillageId: this.LandAllocateData.villageId,
                      villageId: this.LandAllocateData.milkPouringVillageId,
                      type:"13",
                    };
                    this.spinner.show();
                    const response1 = await this.jcAPI.amcuLandAllotment_select( req1 );
                    if (response1.success) {
                      this.LandAllocateData.handOverByName= response1.result[0].HNAME;
                      this.LandAllocateData.handOverByMobileNo=response1.result[0].HMBL;
                      this.LandAllocateData.handOverByDesig =response1.result[0].HDESIG;
                      this.pstatus=response1.result[0].PSTATUS;
                      this.rstatus=response1.result[0].RSTATUS;
                      this.landPossessionStatement.possessionTakenName =    response1.result[0].TAKEN_NAME;
                    this.landPossessionStatement.takenOverByDesig = response1.result[0].TAKEN_DESIG;
                    this.landPossessionStatement.takenOverByMobileNo =response1.result[0].TAKEN_MBL;
                    }
                    else{
                      this.LandAllocateData.handOverByName= "";
                      this.LandAllocateData.handOverByMobileNo="";
                      this.LandAllocateData.handOverByDesig ="";
                    }
                    this.spinner.hide();



                        // str =str+"Record Not Submitted in BMCU Hand Over";
                      if( response.result[0].PC_STATUS==="1"){    
                            if(response.result[0].RR_STATUS==="0")
                            { str =str+"Possession Certificate Submitted. Upload Revenue Record";
                            this.toast.warning(str);
                          this.divuploadpos=false;
                            const checkbox = document.getElementById('chkcents',) as HTMLInputElement | null;
                            checkbox.checked=true;
                            //if (checkbox != null) {
                              if (checkbox.checked) {                                
                                 this.divchkrevnuetxt=true;
                                 this.divall=true;           
                              } 
                          }
                            else{  this.toast.warning("HandOver Completed");
                           // this.router.navigate(['/jcModule/JdamculandHandover'], {}); 
                            this.LandAllocateData.handOverByName="";
                            this.LandAllocateData.handOverByMobileNo="";
                            this.LandAllocateData.handOverByDesig ="";
                            

                           this.rbkList = [];
                          this.routeList = [];
                          this.villageList = [];
                          this.mandalList = [];
                          this.milkPouringVillageList=[];
                          this.ngOnInit();

                              }
                      }
                      else{  //only possission certificate upload
                          str =str+"Hand over details Submitted and Possession Certificate Not Submitted in AMCU Allocation"; 
                         // this.divposcert=true;
                          this.divchkrevnuetxt=true;
                                  this.divall=false; 
                                   this.divpossission=true;

                                  this.divchk1=false;
                      }
                  }
          }
          else{ if(response.result[0].AR_STATUS==="0")
          { str ="Not Submitted in AMCU Allocation";this.toast.warning(str);  this.router.navigate(['/jcModule/AmcuLandAllocation']);}
          if(response.result[0].AL_STATUS==="0")
          { str =str+"Alienation Certificate Not Submitted in AMCU Allocation";this.toast.warning(str); this.router.navigate(['/jcModule/AmcuLandAllocation']);}

          }
          if(str!='')
          this.toast.warning(str);
  }
  else
  this.toast.warning(response.message);
  }

  


 


  
  async loadPossessionTaken(): Promise<void> {
    try {
      const req = {
        districtId: this.LandAllocateData.districtId,
        mandalId: this.LandAllocateData.mandalId,
        rbkId: this.LandAllocateData.rbkId,
        villageId: this.LandAllocateData.villageId,
      };
      this.spinner.show();
      const response = await this.jcAPI.possessionTakenDetails(req);
      if (response.success) {
        //this.LandAllocateData.landReceivedByName = response.result[0].NAME;
      //  this.LandAllocateData.landReceivedMobileNo = response.result[0].MOBILE;
      //  this.LandAllocateData.landReceivedByDesig =
          response.result[0].DESIGNATION;
        this.landPossessionStatement.districtName =
          response.result[0].DISTRICT_NAME;
        this.landPossessionStatement.districtId = this.LandAllocateData.districtId;
        this.landPossessionStatement.divisionName = response.result[0].DIVISION;
        this.landPossessionStatement.mandalName =
          response.result[0].MANDAL_NAME;
        this.landPossessionStatement.villageName =
          response.result[0].VILLAGE_NAME;
        this.landPossessionStatement.possessionTakenName =
          response.result[0].NAME;
        this.landPossessionStatement.takenOverByDesig =
          response.result[0].DESIGNATION;
        this.landPossessionStatement.takenOverByMobileNo =
          response.result[0].MOBILE;

        this.landPossessionStatement.allottedDate =
          response.result[0].ALLOTTED_DATE;
        this.landPossessionStatement.acres = response.result[0].AREA.toString().split(
          '.'
        )[0];
        this.landPossessionStatement.cents = response.result[0].AREA.toString().split(
          '.'
        )[1];
        this.landPossessionStatement.surveyNo =
          response.result[0].SURVEY_NUMBER;
        this.landPossessionStatement.westBoundary =
          response.result[0].WEST_BOUNDARY;
        this.landPossessionStatement.northBoundary =
          response.result[0].NORTH_BOUNDARY;
        this.landPossessionStatement.southBoundary =
          response.result[0].SOUTH_BOUNDARY;
        this.landPossessionStatement.eastBoundary =
          response.result[0].EAST_BOUNDARY;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  // btnPossessionHandOverPopUp(): void {

  //   this.LandAllocateData.districtId= this.session.districtId,
  //   this.LandAllocateData.mandalId= this.LandAllocateData.mandalId,
  //   this.LandAllocateData.rbkId= this.LandAllocateData.rbkId,
  //   this.LandAllocateData.villageId= this.LandAllocateData.villageId,

  //   this.LandAllocateData.handOverByName = '';
  //   this.LandAllocateData.handOverByMobileNo = '';
  //   this.LandAllocateData.handOverByDesig = '';
  //   this.possessionHandOverPopUp = true;

  // }

  async btnPDFDownload(): Promise<void> {
    try {
      if (
        this.LandAllocateData.handOverByName === '' ||
        this.LandAllocateData.handOverByName === null ||
        this.LandAllocateData.handOverByName === undefined
      ) {
        this.toast.warning('Please Enter Possession Handover By Name ');
        return;
      }

      if (
        this.LandAllocateData.handOverByMobileNo === '' ||
        this.LandAllocateData.handOverByMobileNo === null ||
        this.LandAllocateData.handOverByMobileNo === undefined
      ) {
        this.toast.warning('Please Enter Possession Handover Mobile Number');
        return;
      }

      if (
        !this.utils.mobileNumCheck(this.LandAllocateData.handOverByMobileNo)
      ) {
        this.toast.warning(
          'Please Enter Valid Possession Handover Mobile Number'
        );
        return;
      }

      if (
        this.LandAllocateData.handOverByDesig === '' ||
        this.LandAllocateData.handOverByDesig === null ||
        this.LandAllocateData.handOverByDesig === undefined
      ) {
        this.toast.warning('Please Enter Possession Handover By Designation');
        return;
      }
     



      this.landPossessionStatement.handedOverByName = this.LandAllocateData.handOverByName;
      this.landPossessionStatement.handedOverByDesig = this.LandAllocateData.handOverByDesig;
      this.landPossessionStatement.handedOverByMobileNo = this.LandAllocateData.handOverByMobileNo;

      this.possessionHandOverPopUp = false;
      this.spinner.show();


      // handover_name: this.LandAllocateData.handOverByName,
      // handover_mbl: this.LandAllocateData.handOverByMobileNo,
      // handover_designation:this.LandAllocateData.handOverByDesig,
      // updatedBy: this.session.userName,

      const req2 = {       
 
      type:12,
      districtId: this.session.districtId,
      mandalId: this.LandAllocateData.mandalId,
      rbkId: this.LandAllocateData.rbkId,
      revvillageId: this.LandAllocateData.villageId,
      villageId: this.LandAllocateData.milkPouringVillageId,

      handover_name: this.LandAllocateData.handOverByDesig,
      handover_mbl: this.session.userName,//this.LandAllocateData.handOverByMobileNo,
      handover_designation:this.LandAllocateData.handOverByName,
      updatedBy: this.LandAllocateData.handOverByMobileNo ,//this.session.userName,
    };
    const response1 = await this.jcAPI.amcuLandAllotment_select( req2 );
    
     if (response1.success) {

      this.btnPossessionHandOverPopUp();
    //   const req = {
    //     rpttyeid:'3',  
    //    districtId: this.session.districtId,
    //    mandalId: this.LandAllocateData.mandalId,
    //    rbkId: this.LandAllocateData.rbkId,
    //    revvillageId: this.LandAllocateData.villageId,
    //   villageId: this.LandAllocateData.milkPouringVillageId,
    //   HANDOVER_NAME_JD_SUB: this.landPossessionStatement.handedOverByName,
    //   HANDOVER_MBL_NO_JD_SUB: this.landPossessionStatement.handedOverByMobileNo,
    //   HANDOVER_DESIGNATION: this.landPossessionStatement.handedOverByDesig, 
    //   };
    //   this.spinner.show();
    //  // const response = await this.jcAPI.possessionHandOverCertificate(
    //     const response = await this.jcAPI.amcuPossessioncertificate(
    //    req
    //   );
    //   if (response.success) {
    //     this.utils.downloadPdfFile(response.result, 'amcuPossessioncertificate');
    //   } else {
    //     this.toast.info(response.message);
    //   }
    //   this.spinner.hide();

    } else {
      this.toast.info(response1.message);
    }
    this.spinner.hide();


  

       

      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  
  async btndownload(): Promise<void> {
    try {


      if (
        this.LandAllocateData.mandalId === '' ||
        this.LandAllocateData.mandalId === null ||
        this.LandAllocateData.mandalId === undefined
      ) {
        this.toast.warning('Please Select Mandal');
        return ;
      }
  
      if (
        this.LandAllocateData.rbkId === '' ||
        this.LandAllocateData.rbkId === null ||
        this.LandAllocateData.rbkId === undefined
      ) {
        this.toast.warning('Please Select RSK');
        return ;
      }
  
      if (
        this.LandAllocateData.villageId === '' ||
        this.LandAllocateData.villageId === null ||
        this.LandAllocateData.villageId === undefined
      ) {
        this.toast.warning('Please Select Village');
        return ;
      } 
      if(this.LandAllocateData.mandalId!='' && this.LandAllocateData.rbkId!==''&& this.LandAllocateData.villageId!==''   ){
        const req4 = {
          rpttyeid:'3',
         districtId: this.session.districtId,
         mandalId: this.LandAllocateData.mandalId,
         rbkId: this.LandAllocateData.rbkId,
         revvillageId: this.LandAllocateData.villageId,
        villageId: this.LandAllocateData.milkPouringVillageId,
        HANDOVER_NAME_JD_SUB: this.landPossessionStatement.handedOverByName,
        HANDOVER_MBL_NO_JD_SUB: this.landPossessionStatement.handedOverByMobileNo,
        HANDOVER_DESIGNATION: this.landPossessionStatement.handedOverByDesig, 
        };
        this.spinner.show();
      
        
         // const response4 = await this.jcAPI.amcuPossessioncertificate(
          const response4 = await this.jcAPI.amcuPossessionUpdatedcertificate(
         req4
        );
        if (response4.success) {

          var elem = document.getElementById('positionStatementPdf');
          if(typeof elem !== 'undefined' && elem !== null) {
            elem.innerHTML = '';
          }
          var elem1 = document.getElementById('allotmentRevenueUpload');
          if(typeof elem1 !== 'undefined' && elem1 !== null) {
            elem1.innerHTML = '';
          }




          this.utils.downloadPdfFile(response4.result, 'AmcuPossessioncertificate');
        } else {
          this.toast.info(response4.message);
        }
        this.spinner.hide();
      }
     
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}

  async ondivchkcentsChange(event): Promise<void> {
    try { 
      const checkbox = document.getElementById('chkRevenu',) as HTMLInputElement | null;
      
      if (checkbox != null) {
        if (checkbox.checked) {
          
           this.divchkrevnuetxt=true;
           this.divall=true;
           this.divpossission=false;
          // this.divdownload=false;
        }
        else
        { checkbox.checked=false;
            this.divchkrevnuetxt=false;
            this.divall=false;
            this.divpossission=true;
        // this.divchkcentsbtn=false;
        // this.divdownload=true;

        }
      }

 
        } catch (error) {
       
      this.utils.catchResponse(error);
    }
  }


  async btnallSubmit(): Promise<void> {
    try { 

      if(this.pstatus==='0'){
        this.LandAllocateData.REVENUE_CERT_JD_SUB='NA';
        if (
          this.LandAllocateData.POSSESSION_CERT_JD_SUB === '' ||
          this.LandAllocateData.POSSESSION_CERT_JD_SUB === null ||
          this.LandAllocateData.POSSESSION_CERT_JD_SUB === undefined
        ) {
          this.toast.warning('Attach Copy Of Possession   (PDF)');
          return ;
        }
      }
      else{
        this.LandAllocateData.POSSESSION_CERT_JD_SUB='NA';
        if (
          this.LandAllocateData.REVENUE_CERT_JD_SUB === '' ||
          this.LandAllocateData.REVENUE_CERT_JD_SUB === null ||
          this.LandAllocateData.REVENUE_CERT_JD_SUB === undefined
        ) {
          this.toast.warning('Attach Copy Of Revenu   (PDF)');
          return ;
        } 
      }
      // if(this.pstatus==='0' && this.rstatus==='0')
      // { 
      //   if( this.LandAllocateData.REVENUE_CERT_JD_SUB==='NA') this.typeid='9';
      //   else  this.typeid='8';
      // }
      // else { this.typeid='10';}

      if(this.LandAllocateData.POSSESSION_CERT_JD_SUB!='NA' && this.LandAllocateData.REVENUE_CERT_JD_SUB !='NA')
      this.typeid='2';
      else  if(this.LandAllocateData.POSSESSION_CERT_JD_SUB!='NA' && this.LandAllocateData.REVENUE_CERT_JD_SUB ==='NA')
      this.typeid='1';
      else  if(this.LandAllocateData.POSSESSION_CERT_JD_SUB ==='NA' && this.LandAllocateData.REVENUE_CERT_JD_SUB !='NA')
      this.typeid='3';

const req1 = {
    type:this.typeid,
      districtId: this.session.districtId,
      mandalId: this.LandAllocateData.mandalId,
      rbkId: this.LandAllocateData.rbkId,
      revvillageId: this.LandAllocateData.villageId,
      villageId: this.LandAllocateData.milkPouringVillageId,
      
      amcu_pc_path:this.LandAllocateData.POSSESSION_CERT_JD_SUB,
      amcu_rev_rec_path:this.LandAllocateData.REVENUE_CERT_JD_SUB,
      insertedBy: this.session.userName ,
};
 
          
          this.spinner.show(); 
          const response1 = await this.jcAPI.amcuLandAllotment_Sub( req1 );
        // const response1 = await this.jcAPI. amcubmcupdfhandoverSub(
        //   this.LandAllocateData        
        //  );
         if (response1.success) {
          alert(response1.message);
        //  this.router.navigate(['/jcModule/JdamculandHandover']); 
       //   this.ngOnInit();  
      } else {
        this.toast.info(response1.message);
      }
      this.spinner.hide();
     

    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


  async btnSubmit(): Promise<void> { 
try { 

  if(this.pstatus==='0'){
    this.LandAllocateData.REVENUE_CERT_JD_SUB='NA';
    if (
      this.LandAllocateData.POSSESSION_CERT_JD_SUB === '' ||
      this.LandAllocateData.POSSESSION_CERT_JD_SUB === null ||
      this.LandAllocateData.POSSESSION_CERT_JD_SUB === undefined
    ) {
      this.toast.warning('Attach Copy Of Possession   (PDF)');
      return ;
    }
  }
  else{
    this.LandAllocateData.POSSESSION_CERT_JD_SUB='NA';
    if (
      this.LandAllocateData.REVENUE_CERT_JD_SUB === '' ||
      this.LandAllocateData.REVENUE_CERT_JD_SUB === null ||
      this.LandAllocateData.REVENUE_CERT_JD_SUB === undefined
    ) {
      this.toast.warning('Attach Copy Of Revenu   (PDF)');
      return ;
    } 
  }
 

  if(this.LandAllocateData.POSSESSION_CERT_JD_SUB!='NA' && this.LandAllocateData.REVENUE_CERT_JD_SUB !='NA')
  this.typeid='2';
  else  if(this.LandAllocateData.POSSESSION_CERT_JD_SUB!='NA' && this.LandAllocateData.REVENUE_CERT_JD_SUB ==='NA')
  this.typeid='1';
  else  if(this.LandAllocateData.POSSESSION_CERT_JD_SUB ==='NA' && this.LandAllocateData.REVENUE_CERT_JD_SUB !='NA')
  this.typeid='3';

const req1 = {
type:this.typeid,
  districtId: this.session.districtId,
  mandalId: this.LandAllocateData.mandalId,
  rbkId: this.LandAllocateData.rbkId,
  revvillageId: this.LandAllocateData.villageId,
  villageId: this.LandAllocateData.milkPouringVillageId,
  
  amcu_pc_path:this.LandAllocateData.POSSESSION_CERT_JD_SUB,
  amcu_rev_rec_path:this.LandAllocateData.REVENUE_CERT_JD_SUB,
  insertedBy: this.session.userName ,
};

      
      this.spinner.show(); 
      const response1 = await this.jcAPI.amcuLandAllotment_Sub( req1 );
    // const response1 = await this.jcAPI. amcubmcupdfhandoverSub(
    //   this.LandAllocateData        
    //  );
     if (response1.success) { this.router.navigate(['/jcModule/JdamculandHandover']); 
      alert(response1.message); window.location.reload(); 
    
  } else {
    this.toast.info(response1.message);
  }
  this.spinner.hide();
 

} catch (error) {
  this.spinner.hide();
  this.utils.catchResponse(error);
}
  }

  validate(): boolean { 
    if (
      this.LandAllocateData.mandalId === '' ||
      this.LandAllocateData.mandalId === null ||
      this.LandAllocateData.mandalId === undefined
    ) {
      this.toast.warning('Please Select Hand Over Mandal');
      return false;
    }

    if (
      this.LandAllocateData.rbkId === '' ||
      this.LandAllocateData.rbkId === null ||
      this.LandAllocateData.rbkId === undefined
    ) {
      this.toast.warning('Please Select Hand Over RSK');
      return false;
    } 

    if (
      this.LandAllocateData.handOverByName === '' ||
      this.LandAllocateData.handOverByName === null ||
      this.LandAllocateData.handOverByName === undefined
    ) {
      this.toast.warning('Please Enter Possession Handover By Name ');
      return false;
    }

    if (
      this.LandAllocateData.handOverByMobileNo === '' ||
      this.LandAllocateData.handOverByMobileNo === null ||
      this.LandAllocateData.handOverByMobileNo === undefined
    ) {
      this.toast.warning('Please Enter Possession Handover Mobile Number');
      return false;
    }

    if (!this.utils.mobileNumCheck(this.LandAllocateData.handOverByMobileNo)) {
      this.toast.warning('Please Enter Valid Possession Taken Mobile Number');
      return false;
    }

    if (
      this.LandAllocateData.handOverByDesig === '' ||
      this.LandAllocateData.handOverByDesig === null ||
      this.LandAllocateData.handOverByDesig === undefined
    ) {
      this.toast.warning('Please Enter Possession Handover By Designation');
      return false;
    }

    if (
      this.LandAllocateData.POSSESSION_CERT_JD_SUB === '' ||
      this.LandAllocateData.POSSESSION_CERT_JD_SUB === null ||
      this.LandAllocateData.POSSESSION_CERT_JD_SUB === undefined
    ) {
      this.toast.warning('Attach Copy Of Possession   (PDF)');
      return false;
    }

    if (
      this.LandAllocateData.ALIENATION_PDF_JD_SUB === '' ||
      this.LandAllocateData.ALIENATION_PDF_JD_SUB === null ||
      this.LandAllocateData.ALIENATION_PDF_JD_SUB === undefined
    ) {
      this.toast.warning('Attach Copy Of Alienation   (PDF)');
      return false;
    }


    if (
      this.LandAllocateData.REVENUE_CERT_JD_SUB === '' ||
      this.LandAllocateData.REVENUE_CERT_JD_SUB === null ||
      this.LandAllocateData.REVENUE_CERT_JD_SUB === undefined
    ) {
      this.toast.warning('Attach Copy Of Revenu   (PDF)');
      return false;
    } 

    return true;
  }

  async onPositionTakenChange(event): Promise<void> {
    try {
      const res: any = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (!this.utils.isEmpty(res)) {
        this.LandAllocateData.positionTakenImage = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
        this.LandAllocateData.positionTakenImage = res.replace(
          'data:image/jpg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async keyPressNumbers(event) {
    var inputvalue = String.fromCharCode(event.keyCode);

    if (/^[a-zA-Z\s]+$/.test(inputvalue)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  async onPositionStatementChange(event): Promise<void> {
    try {
      if(event!=''){
      this.LandAllocateData.POSSESSION_CERT_JD_SUB = '';
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
        this.utils.fileSize.oneMB
      );
      if (!this.utils.isEmpty(res)) {
       // this.LandAllocateData.POSSESSION_CERT_JD_SUB = res.replace( 'data:application/pdf;base64,', '' );
        this.LandAllocateData.POSSESSION_CERT_JD_SUB = res.split('base64,')[1];
      }
    }
  }
  else
  {
    event.target.value = '';
  }
    } catch (error) {this.toast.warning('Attach Copy Of Possession  (PDF)');
      //this.utils.catchResponse(error);
    }
  }
 
  async onAlienationStatementChange(event): Promise<void> {
    try {
      const res: any = await this.utils.encodedString(
        event,
        this.utils.fileType.PDF,
        this.utils.fileSize.oneMB
      );
      if (!this.utils.isEmpty(res)) {
        this.LandAllocateData.ALIENATION_PDF_JD_SUB = res.replace('data:application/pdf;base64,','' );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }
 
  
  async onRevenueStatementChange(event): Promise<void> {
    try { this.LandAllocateData.REVENUE_CERT_JD_SUB = '';
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
        this.utils.fileSize.oneMB
      );
      if (!this.utils.isEmpty(res)) {
        //this.LandAllocateData.REVENUE_CERT_JD_SUB = res.replace('data:application/pdf;base64,','' );
        this.LandAllocateData.REVENUE_CERT_JD_SUB =  res.split('base64,')[1];
      }
    }

    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

}
