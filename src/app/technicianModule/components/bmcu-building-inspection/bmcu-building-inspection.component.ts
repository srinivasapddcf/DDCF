import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { McuMappingService } from 'src/app/mentorModule/services/mcu-mapping.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { MastersService } from 'src/app/shared/services/masters.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { TechnicianService } from '../../services/technician.service';

@Component({
  selector: 'app-bmcu-building-inspection',
  templateUrl: './bmcu-building-inspection.component.html',
  styleUrls: ['./bmcu-building-inspection.component.css']
})
export class BmcuBuildingInspectionComponent implements OnInit {
  maxDate: Date;
  ditrictList: any;
  mandalList: any;
  rbkList = [];
  villageList = [];
  networkList = [];
  DistrictList = [];
  MandalList = [];
  BMCUList = [];
  districtName = this.session.districtName;
  mandalName = this.session.mandalName;


  districtname:any;
  Mandalname:any;
  villagename:any;



  BuildingInspectDetails = {
    Buildingtype:'',
    address:'',
    buildingAddress:'',
    buildingName:'',
    buildingStreet:'',
    villageId:'',
    mandalId:'',
    districtId:'',
    pinCode:'',
    BuildingCond:'',
    isSafetyArrangements:'',
    wateravailability:'',
    isElectricityAvailable:'',
    Drainageavail:'',
    buildingImage:''
  };

  buildingInspectionData = {
    rbkId: '',
    villageId: '',
    inspectionDate: '',
    inspectionTime: '',
    isAMCUBuilding: '',
    isVillageLocatedInCenter: '',
    isSafetyArrangements: '',
    isElectricityAvailable: '',
    isAvailableElectricityEarthed: '',
    isAvailbleSpaceForVehicleMovement: '',
    isAvailbleRaodToApproachAMCU: '',
    isHavingNetworkConnectivity: '',
    buildingAddress: '',
    buildingLatitude: '',
    buildingLongitude: '',
    buildingInteriorImg: '',
    buildingExteriorImg: '',
    buildingRoadLeadingImg: '',
    insertedBy: '',
    mentorId: '',
    saftyArrangementsImg: '',
    electricConnectionImg: '',
    electricEarthImg: '',
    vehicleSpaceMovingImg: '',
    buildingStreet: '',
    mandalId: '',
    districtId: '',
    pinCode: '',
    source: '',
    buildingName: '',
    requiredMilkCans: '',
  };

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private mcuAPI: McuMappingService,
 
    private utils: UtilsService,
    private logger: LoggerService,
    private session: SessionService,
    private master: MastersService,
    private technicianAPI: TechnicianService,
  ) {
    this.maxDate = this.session.getTodayDate();
  }

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ""){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
   
     this.loadDistricts();
  }

  

  async loadDistricts(): Promise<void> {
    try {
      const req = {
        TYPE:14
      };
      this.spinner.show();
      const response = await this.technicianAPI.TechnisianDetails_Select(req);
      this.spinner.hide();
      if (response.success) {
        this.DistrictList = response.result; 
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  value:any;
  async onDistrictChange(obj): Promise<void> { debugger; 

    let objvalue= this.DistrictList.find(data=>data.NEW_DISTRICT_CODE==obj);       
    this.districtname=objvalue.NEW_DISTRICT;
   
    try { 
      const req = {
        TYPE:15,
       DISTRICT:this.BuildingInspectDetails.districtId
      };
      this.spinner.show();
      const response = await this.technicianAPI.TechnisianDetails_Select(req);
      if (response.success) {
        this.MandalList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onMandalChange(obj): Promise<void> {  
   
    let objvalue= this.MandalList.find(data=>data.MANDAL_CODE==obj);       
    this.Mandalname=objvalue.MANDAL_NAME;

    try { 
      const req = {
       TYPE:16,
       DISTRICT:this.BuildingInspectDetails.districtId,
      INPUT01:this.BuildingInspectDetails.mandalId
      };
      this.spinner.show();
      const response = await this.technicianAPI.TechnisianDetails_Select(req);
      if (response.success) {
        this.BMCUList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }



  onvillagechange(obj) {
    
    let objvalue= this.MandalList.find(data=>data.MANDAL_CODE==obj);       
    this.villagename=objvalue.MANDAL_NAME;
  }  

  async btnSubmit(): Promise<void> {
    try {   debugger;
      if (this.validate()) {

        const req ={
          type : 4,
          districtId :this.BuildingInspectDetails.Buildingtype,
          districtname :this.BuildingInspectDetails.address,
          mandalId :this.BuildingInspectDetails.BuildingCond ,
          mandalname : this.BuildingInspectDetails.isSafetyArrangements ,
          bmcuId : this.BuildingInspectDetails.wateravailability ,
          bmcuname :this.BuildingInspectDetails.isElectricityAvailable ,
          bmculist:[{
            deviceImage: this.BuildingInspectDetails.buildingImage
          }],
          operatedyear:this.BuildingInspectDetails.Drainageavail,
          operatedby:this.session.userName,
          Latitude:this.session.uniqueId,
          Longitude:this.session.desigId

        }
        
        this.spinner.show();
       // const response = await this.mcuAPI.amcuBuildingInspectionSub(this.buildingInspectionData);

        const response = await this.technicianAPI.BMCUDeviceDetailsIns(req);
        if (response.success) {
          alert(response.message);
         // this.toast.success(response.message);
          window.location.reload();
        } else {
          this.toast.info(response.message);
        }
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  validate(): boolean {
    if (
      this.BuildingInspectDetails.Buildingtype === '' ||
      this.BuildingInspectDetails.Buildingtype === null ||
      this.BuildingInspectDetails.Buildingtype === undefined
    ) {
      this.toast.warning('Select Building Type');
      return false;
    }

    if (
      this.BuildingInspectDetails.address === '' ||
      this.BuildingInspectDetails.address === null ||
      this.BuildingInspectDetails.address === undefined
    ) {
      this.toast.warning('Enter Address');
      return false;
    }

    if (
      this.BuildingInspectDetails.BuildingCond === '' ||
      this.BuildingInspectDetails.BuildingCond === null ||
      this.BuildingInspectDetails.BuildingCond === undefined
    ) {
      this.toast.warning('Select Building Condition');
      return false;
    }

    if (
      this.BuildingInspectDetails.isSafetyArrangements === '' ||
      this.BuildingInspectDetails.isSafetyArrangements === null ||
      this.BuildingInspectDetails.isSafetyArrangements === undefined
    ) {
      this.toast.warning('Select Safety Arrangements');
      return false;
    }

    if (
      this.BuildingInspectDetails.wateravailability === '' ||
      this.BuildingInspectDetails.wateravailability === null ||
      this.BuildingInspectDetails.wateravailability === undefined
    ) {
      this.toast.warning('Select Water Availability');
      return false;
    }

    if (
      this.BuildingInspectDetails.isElectricityAvailable === '' ||
      this.BuildingInspectDetails.isElectricityAvailable === null ||
      this.BuildingInspectDetails.isElectricityAvailable === undefined
    ) {
      this.toast.warning('Select Availability of Electricity');
      return false;
    }

    if (
      this.BuildingInspectDetails.Drainageavail === '' ||
      this.BuildingInspectDetails.Drainageavail === null ||
      this.BuildingInspectDetails.Drainageavail === undefined
    ) {
      this.toast.warning('Select Drainage Availability');
      return false;
    }

    if (
      this.BuildingInspectDetails.buildingImage === '' ||
      this.BuildingInspectDetails.buildingImage === null ||
      this.BuildingInspectDetails.buildingImage === undefined
    ) {
      this.toast.warning('Upload Building Image');
      return false;
    } 
    return true;
  }
  

  async onBuildingImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.BuildingInspectDetails.buildingImage = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  } 
}
