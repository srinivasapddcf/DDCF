import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { promise } from 'protractor';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { MastersService } from 'src/app/shared/services/masters.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { JcService } from '../../../services/jc.service';

@Component({
  selector: 'app-jdbmculand-handover',
  templateUrl: './jdbmculand-handover.component.html',
  styleUrls: ['./jdbmculand-handover.component.css']
})
export class JdbmculandHandoverComponent implements OnInit {

  maxDate: Date;
  input = '';
  date: any;
  possessionHandOverPopUp = false;
  rpttyeid='';
  rbkList = [];
  routeList = [];
  villageList = [];
  mandalList = [];
  divchk=true;
  divchkrevnuetxt=true;
  divpossission=false;
  divall=true;
  divposcert=false;
  

type='';
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

    takenOverByName: '',    
    takenOverByMobileNo: '',
    takenOverByDesig: '',

    positionTakenImage: '',
    POSSESSION_CERT_JD_SUB: '',
    ALIENATION_PDF_JD_SUB: '',
    REVENUE_CERT_JD_SUB: '',
    
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
    possessionTakenName: '',
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

    this.divposcert=true;
    this.divchkrevnuetxt=false;
    this.divall=false; this.divpossission=true;
    
   
    if(this.session.uniqueId !="" && this.session.desigId != ''){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    this.loadMandals();
    const decString = JSON.parse(this.utils.decrypt(this.input));
    this.LandAllocateData.districtId = decString.districtId ?? '';
    this.LandAllocateData.mandalId = decString.mandalId ?? '';
    this.LandAllocateData.rbkId = decString.rbkId ?? '';
    this.LandAllocateData.villageId = decString.villageId ?? '';

    if (this.LandAllocateData.districtId === '') {
      this.router.navigate(['/jcModule/JdamculandHandover']);
    } else if (this.LandAllocateData.mandalId === '') {
      this.router.navigate(['/jcModule/JdamculandHandover']);
      this.loadRBKList();
    } else if (this.LandAllocateData.rbkId === '') {
      this.router.navigate(['/jcModule/JabmculandHandover']);
      this.loadVillageList();
    } else if (this.LandAllocateData.villageId === '') {
      this.router.navigate(['/jcModule/JdamculandHandover']);
    }
 
  }
  async clearcontrols():Promise<void>{
    try { 
    this.possessionHandOverPopUp = false;
    this.rpttyeid='';
    this. rbkList = [];
    this. routeList = [];
    this. villageList = [];
    this.mandalList = [];
    this.divchk=true;
    this.divchkrevnuetxt=true;
    this.divpossission=true;
    this.divall=true;
    this.divposcert=true; 
    this.type='';

    this.LandAllocateData.handOverByName= '';
    this.LandAllocateData.handOverByMobileNo=''; 
    this. LandAllocateData.handOverByDesig='';
    this.landPossessionStatement.possessionTakenName ='';
  this.landPossessionStatement.takenOverByDesig ='';
  this.landPossessionStatement.takenOverByMobileNo ='';
this.LandAllocateData.takenOverByName='';
this.LandAllocateData.takenOverByDesig='';
this.LandAllocateData.takenOverByMobileNo=''; 
const checkbox = document.getElementById('chkcents',) as HTMLInputElement | null;
if (checkbox != null)  checkbox.checked=true; 
this.loadMandals(); 
    }
    catch (error) {
    this.spinner.hide();    
  }
  }
  async onVillageChange(): Promise<void> {
    try {
      if (this.LandAllocateData.villageId === '') {
        return;
      }
      const req = {
        districtId: this.session.districtId,
        mandalId: this.LandAllocateData.mandalId,
        rbkId: this.LandAllocateData.rbkId,
        villageId: this.LandAllocateData.villageId,
      };
      this.spinner.show(); 
      const response = await this.jcAPI.handOverStatus(req);      
      if (response.success) { 
        alert("PLEASE CLICK POSSESSION HAND OVER DETAILS");   alert(response.message);
        const requestData = {
          districtId: this.session.districtId,
          mandalId: this.LandAllocateData.mandalId,
          rbkId: this.LandAllocateData.rbkId,
          villageId: this.LandAllocateData.villageId,
        };

        const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
        this.router.navigate(['/jcModule/JdbmculandHandover'], { 
        });
      } else {
        if (response.result === '2') {
          this.toast.info(response.message);
        }

       
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
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
        const req = {
          rpttyeid:'1',
         districtId: this.session.districtId,
         mandalId: this.LandAllocateData.mandalId,
         rbkId: this.LandAllocateData.rbkId,
         villageId: this.LandAllocateData.villageId, 
        HANDOVER_NAME_JD_SUB: this.LandAllocateData.handOverByName,
        HANDOVER_MBL_NO_JD_SUB: this.LandAllocateData.handOverByMobileNo,
        HANDOVER_DESIGNATION: this.LandAllocateData.handOverByDesig 
        };
        this.spinner.show();
         
           //const response = await this.jcAPI. bmcuPossessioncertificate( req );
           const response = await this.jcAPI. bmcuPossessionUpdatedcertificate( req );
               
        if (response.success) {
          this.utils.downloadPdfFile(response.result, 'bmcuPossessioncertificate');
        } else {
          this.toast.info(response.message);
        }
        this.spinner.hide();
      }
     
  } catch (error) {
    this.spinner.hide();
    this.spinner.hide();this.toast.info("Record not found Error ");
    
    //this.utils.catchResponse(error);
  }
}

 
  async loadMandals(): Promise<void> {
    try {
      const req = {
        districtId: this.session.districtId,
        type:"25",
      };
      this.spinner.show(); 
      const response = await this.jcAPI.bmcuMandaRbkVillageByDistrictID(req);
      if (response.success) {
        this.mandalList = response.result;
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
        type:"27",
      };
      this.spinner.show();
      const response = await this.jcAPI.bmcuMandaRbkVillageByDistrictID(req); 
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
        type:"26",
      };
      this.spinner.show(); 
    const response = await this.jcAPI.bmcuMandaRbkVillageByDistrictID(req);
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

  async btnHandOverPopUp(): Promise<void> { 
      try {
      this.LandAllocateData.handOverByName = '';
      this.LandAllocateData.handOverByMobileNo = '';
      this.LandAllocateData.handOverByDesig = '';
      this.possessionHandOverPopUp = true;

    } catch (error) {
      this.spinner.hide();  } 
    }

  async btnPossessionHandOverPopUp(): Promise<void> { 
    if (this.LandAllocateData.villageId === '') {
      return;
    }
    const req = {
      districtId: this.session.districtId,
      mandalId: this.LandAllocateData.mandalId,
      rbkId: this.LandAllocateData.rbkId,
      villageId: this.LandAllocateData.villageId,
    };
     
    const response = await this.jcAPI.handOverStatus(req);
    if (response.success) {
      var str="";  
      // AL_STATUS: "1"
      // AR_STATUS: "1"
      // HR_STATUS: "1"
      // PC_STATUS: "0"
      // RR_STATUS: "0"
          if(response.result[0].AR_STATUS==="1"  && response.result[0].AL_STATUS==="1")
          {
            this.LandAllocateData.takenOverByName=  response.result[0].TAKEN_NAME;  
            this.LandAllocateData.takenOverByMobileNo  =  response.result[0].TAKEN_MBL; 
            this.LandAllocateData.takenOverByDesig  =  response.result[0].TAKEN_DESIG; 
    
    

                  if(response.result[0].HR_STATUS==="0") { //handover record not available
                    this.LandAllocateData.districtId= this.session.districtId;
                    this.LandAllocateData.mandalId= this.LandAllocateData.mandalId;
                    this.LandAllocateData.rbkId= this.LandAllocateData.rbkId;
                    this.LandAllocateData.villageId= this.LandAllocateData.villageId;

                    const  req22 = {

                      districtId: this.session.districtId,
                      mandalId: this.LandAllocateData.mandalId,
                      rbkId: this.LandAllocateData.rbkId,
                      revvillageId: this.LandAllocateData.villageId,
                      type:"14", 
                    };
                   
                    const response12 = await this.jcAPI.amcuLandAllotment_select( req22 );
                    if (response12.success) {
                      this.LandAllocateData.handOverByName= response12.result[0].HNAME;
                      this.LandAllocateData.handOverByMobileNo=response12.result[0].HMBL; 
                      this. LandAllocateData.handOverByDesig=response12.result[0].HDESIG; 
                    }
                      else{
                    this.LandAllocateData.handOverByName = '';
                    this.LandAllocateData.handOverByMobileNo = '';
                    this.LandAllocateData.handOverByDesig = '';
                    this.possessionHandOverPopUp = true;
                      }
                      



                  }
                  else{ 
 
                    const req1 = {
                      districtId: this.session.districtId,
                      mandalId: this.LandAllocateData.mandalId,
                      rbkId: this.LandAllocateData.rbkId,
                      villageId: this.LandAllocateData.villageId,
                    };
                    this.spinner.show();
                    const response1 = await this.jcAPI.possessionTakenDetails(req1);
                    if (response1.success) {
                      this.LandAllocateData.handOverByName= response1.result[0].NAME;
                      this.LandAllocateData.handOverByMobileNo=response1.result[0].MOBILE; 
                      this. LandAllocateData.handOverByDesig=response1.result[0].DESIGNATION;
                      this.landPossessionStatement.possessionTakenName =    response1.result[0].NAME;
                    this.landPossessionStatement.takenOverByDesig = response1.result[0].DESIGNATION;
                    this.landPossessionStatement.takenOverByMobileNo =response1.result[0].MOBILE;
                    }
                    else{
                      this.landPossessionStatement.possessionTakenName ="";
                    this.landPossessionStatement.takenOverByDesig ="";
                    this.landPossessionStatement.takenOverByMobileNo ="";
                    }
                    this.spinner.hide();



                        // str =str+"Record Not Submitted in BMCU Hand Over";
                      if( response.result[0].PC_STATUS==="1"){
                            if(response.result[0].RR_STATUS==="0")
                            { str =str+"Revenue Record Not Submitted in BMCU Allocation";
                          
                            const checkbox = document.getElementById('chkcents',) as HTMLInputElement | null;
                            checkbox.checked=true;
                            //if (checkbox != null) {
                              if (checkbox.checked) {                                
                                 this.divchkrevnuetxt=true;
                                 this.divall=false;   
                                 this.divposcert=false;                              
                              }
                           // }

                          }
                            else{ // only revenue record upload 
                              }
                      }
                      else{  //only possission certificate upload
                          str =str+"Hand over details Submitted and Posisstion Certificate Not Submitted in BMCU Allocation"; 
                          this.divposcert=true;
                          this.divchkrevnuetxt=false;
                                 this.divall=false; 
                                  this.divpossission=true;
                      }
                  }
          }
          else{ if(response.result[0].AR_STATUS==="0"){ str ="Not Submitted in BMCU Allocation";  this.router.navigate(['/jcModule/LandAllocation']);}
          if(response.result[0].AL_STATUS==="0"){ str =str+"Alienation Certificate Not Submitted in BMCU Allocation"; this.router.navigate(['/jcModule/LandAllocation']);}

          }
          if(str!='')
          this.toast.warning(str);
  }
  else
  this.toast.warning(response.message);
  }

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
      if ( !this.utils.mobileNumCheck(this.LandAllocateData.handOverByMobileNo)  ) {
        this.toast.warning( 'Please Enter Valid Possession Handover Mobile Number' );
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

      const req2 = {
      ProcTYPE:3,
      HANDOVER_NAME_JD_SUB: this.landPossessionStatement.handedOverByName,
      HANDOVER_MBL_NO_JD_SUB: this.landPossessionStatement.handedOverByMobileNo,
      HANDOVER_DESIGNATION:this.landPossessionStatement.handedOverByDesig ,
      AMCU_BMCU_STATUS:2,
      UPDATED_BY: this.session.userName,
      DIST_CODE:this.session.districtId,
      MANDAL_CODE: this.LandAllocateData.mandalId,
      RBK_CODE: this.LandAllocateData.rbkId,
      REVENUE_VILLAGE_CODE: this.LandAllocateData.villageId,   
      insertedBy: this.session.userName,
      updatedBy: this.session.userName
       
    };
    const response1 = await this.jcAPI. amcubmcupdfhandoverSub(
      req2
     );
     if (response1.success) {
    } else {
      this.toast.info(response1.message);
    }
    this.spinner.hide(); 
      const req = {
        rpttyeid:'1',
       districtId: this.session.districtId,
       mandalId: this.LandAllocateData.mandalId,
       rbkId: this.LandAllocateData.rbkId,
       villageId: this.LandAllocateData.villageId, 
      HANDOVER_NAME_JD_SUB: this.landPossessionStatement.handedOverByName,
      HANDOVER_MBL_NO_JD_SUB: this.landPossessionStatement.handedOverByMobileNo,
      HANDOVER_DESIGNATION: this.landPossessionStatement.handedOverByDesig 
      };
      this.spinner.show();
      //const response = await this.jcAPI.possessionHandOverCertificate(
         const response = await this.jcAPI. bmcuPossessioncertificate(
       req
      );
      if (response.success) {
        this.utils.downloadPdfFile(response.result, 'bmcuPossessioncertificate');
      } else {
        this.toast.info(response.message);
      } 
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
    this.spinner.hide(); 
  }
 

  async ondivchkcentsChange(event): Promise<void> {
    try { 
      const checkbox = document.getElementById('chkcents',) as HTMLInputElement | null;
      
      if (checkbox != null) {
        if (checkbox.checked) {
          
           this.divchkrevnuetxt=true;
           this.divall=true;
           this.divpossission=true;
          // this.divdownload=false;
        }
        else
        { checkbox.checked=false;
            this.divchkrevnuetxt=false;
            this.divall=false;
            this.divpossission=true; 
        }
      }

 
        } catch (error) {
       
      this.utils.catchResponse(error);
    }
  }

  async btnallSubmit(): Promise<void> {
    try {

      if (this.validate()) {
        this.LandAllocateData.ProcTYPE='4',
        this.LandAllocateData.DIST_CODE=this.session.districtId,
        this.LandAllocateData.districtId=this.session.districtId,
        this.LandAllocateData.MANDAL_CODE=this.LandAllocateData.mandalId,
        this.LandAllocateData.RBK_CODE=this.LandAllocateData.rbkId,
        this.LandAllocateData.REVENUE_VILLAGE_CODE= this.LandAllocateData.villageId, 
        this.LandAllocateData.AMCU_BMCU_STATUS='2', 
        this.LandAllocateData.insertedBy= this.session.userName,
        this.LandAllocateData.updatedBy= this.session.userName,
        this.LandAllocateData.ALIENATION_PDF_JD_SUB ="NA", 
        this.LandAllocateData.handOverByName= this.landPossessionStatement.handedOverByName,
        this.LandAllocateData.handOverByMobileNo= this.landPossessionStatement.handedOverByMobileNo,
        this.LandAllocateData.handOverByDesig=this.landPossessionStatement.handedOverByDesig ,
        
         
         
        this.spinner.show();

      const response1 = await this.jcAPI. amcubmcupdfhandoverSub(
        this.LandAllocateData        
       );
       if (response1.success) {
        alert(response1.message);
           this.router.navigate(['/jcModule/JdbmculandHandover']);
       // this.toast.info("Record Inserted and PDF files are uploaded");

      } else {
        this.toast.info(response1.message);
      }
      this.spinner.hide();
    } 
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnSubmit(): Promise<void> {
    try {

      if (this.validate()) {
        this.LandAllocateData.ProcTYPE='4',
        this.LandAllocateData.DIST_CODE=this.session.districtId,
        this.LandAllocateData.districtId=this.session.districtId,
        this.LandAllocateData.MANDAL_CODE=this.LandAllocateData.mandalId,
        this.LandAllocateData.RBK_CODE=this.LandAllocateData.rbkId,
        this.LandAllocateData.REVENUE_VILLAGE_CODE= this.LandAllocateData.villageId, 
        this.LandAllocateData.AMCU_BMCU_STATUS='2', 
        this.LandAllocateData.insertedBy= this.session.userName,
        this.LandAllocateData.updatedBy= this.session.userName,
        this.LandAllocateData.ALIENATION_PDF_JD_SUB ="NA", 
        this.LandAllocateData.handOverByName= this.landPossessionStatement.handedOverByName,
        this.LandAllocateData.handOverByMobileNo= this.landPossessionStatement.handedOverByMobileNo,
        this.LandAllocateData.handOverByDesig=this.landPossessionStatement.handedOverByDesig ,
        
         
         
        this.spinner.show();

      const response1 = await this.jcAPI. amcubmcupdfhandoverSub(
        this.LandAllocateData        
       );
       if (response1.success) {
        alert(response1.message);
        this.clearcontrols();
        window.location.reload();
       
       // this.toast.info("Record Inserted and PDF files are uploaded");

      } else {
        this.toast.info(response1.message);
      }
      this.spinner.hide();
    }


      // if (this.validate()) {
      //   this.LandAllocateData.insertedBy = this.session.userName;
      //   this.LandAllocateData.source = 'web';
      //   this.spinner.show();
      //   const response = await this.jcAPI.landHandOverSub(
      //     this.LandAllocateData
      //   );
      //   if (response.success) {
      //     alert(response.message);
      //     this.router.navigate(['/jcModule/LandAllocation']);
      //   } else {
      //     this.toast.info(response.message);
      //   }
      //   this.spinner.hide();
      // }





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

    // if (
    //   this.LandAllocateData.ALIENATION_PDF_JD_SUB === '' ||
    //   this.LandAllocateData.ALIENATION_PDF_JD_SUB === null ||
    //   this.LandAllocateData.ALIENATION_PDF_JD_SUB === undefined
    // ) {
    //   this.toast.warning('Attach Copy Of Alienation   (PDF)');
    //   return false;
    // }


    if (
      this.LandAllocateData.REVENUE_CERT_JD_SUB === '' ||
      this.LandAllocateData.REVENUE_CERT_JD_SUB === null ||
      this.LandAllocateData.REVENUE_CERT_JD_SUB === undefined
    ) {       
        {this.LandAllocateData.REVENUE_CERT_JD_SUB ="NA";}
    //  this.toast.warning('Attach Copy Of Revenu   (PDF)');
    //  return false;
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
        this.LandAllocateData.positionTakenImage = res.split('base64,')[1];
        // this.LandAllocateData.positionTakenImage = res.replace('data:image/jpeg;base64,','');
        // this.LandAllocateData.positionTakenImage = res.replace('data:image/jpg;base64,','');
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onPositionStatementChange(event): Promise<void> {
    try { this.LandAllocateData.POSSESSION_CERT_JD_SUB ='';

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
        this.LandAllocateData.POSSESSION_CERT_JD_SUB = res.split('base64,')[1]; 
      //  this.LandAllocateData.POSSESSION_CERT_JD_SUB = res.replace('data:application/pdf;base64,','' );
      }
    }
    } catch (error) {
      this.toast.warning('Please select Possession pdf');
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
        this.LandAllocateData.ALIENATION_PDF_JD_SUB = res.split('base64,')[1];

      //  this.LandAllocateData.ALIENATION_PDF_JD_SUB = res.replace('data:application/pdf;base64,','' );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }
 
  async onRevenueStatementChange(event): Promise<void> {
    try { this.LandAllocateData.REVENUE_CERT_JD_SUB ='';

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
        this.LandAllocateData.REVENUE_CERT_JD_SUB = res.split('base64,')[1];

       // this.LandAllocateData.REVENUE_CERT_JD_SUB = res.replace('data:application/pdf;base64,','' );
      }
    }
    } catch (error) {this.toast.warning('Please select Revenue Record pdf');
     // this.utils.catchResponse(error);
    }
  }
 
}
