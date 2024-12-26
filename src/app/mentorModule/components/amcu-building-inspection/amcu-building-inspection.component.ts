import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { MastersService } from 'src/app/shared/services/masters.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { McuMappingService } from '../../services/mcu-mapping.service';

@Component({
  selector: 'app-amcu-building-inspection',
  templateUrl: './amcu-building-inspection.component.html',
  styleUrls: ['./amcu-building-inspection.component.css'],
})
export class AmcuBuildingInspectionComponent implements OnInit {
  maxDate: Date;
  ditrictList: any;
  mandalList: any;
  rbkList = [];
  villageList = [];
  networkList = [];
  districtName = this.session.districtName;
  mandalName = this.session.mandalName;
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
    private sanitizer: DomSanitizer,
    private utils: UtilsService,
    private logger: LoggerService,
    private session: SessionService,
    private master: MastersService
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
    
  
    this.networkList = this.master.networkList;
    this.ditrictList = [
      {
        DITRICT_ID: this.session.districtId,
        DISTRICT_NAME: this.session.districtName,
      },
    ];
    this.loadMandalList();
    this.loadRBKList();
  }

  async loadRBKList(): Promise<void> {
    try {
      const req = {
        uniqueId: this.session.rbkGroupId,
      };
      this.spinner.show();
      const response = await this.mcuAPI.rbkListByMentorId(req); 
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

  async loadMandalList(): Promise<void> {
    try {
      const req = {
        districtId: this.session.districtId,
        uniqueId: this.session.rbkGroupId,
      };
      this.spinner.show();
      const response = await this.mcuAPI.mandalListByUniqueId(req);
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

  async onRbkChange(): Promise<void> {
    try {
      this.buildingInspectionData.districtId = '';
      this.buildingInspectionData.mandalId = '';
      this.buildingInspectionData.villageId = '';
      this.villageList = [];
      if (this.buildingInspectionData.rbkId === '') {
        return;
      }
      const req = {
        districtId: this.session.districtId,
        rbkId: this.buildingInspectionData.rbkId,
        uniqueId: this.session.rbkGroupId,
      };
      this.spinner.show();
      const response = await this.mcuAPI.villageListByRbkId(req);
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

  onVillageChange(): void {
    this.buildingInspectionData.districtId = '';
    this.buildingInspectionData.mandalId = '';
  }

  onMandalChange(): void {
    this.buildingInspectionData.districtId = '';
  }

  async btnSubmit(): Promise<void> {
    try {
      if (this.validate()) {
        this.buildingInspectionData.mentorId = this.session.rbkGroupId;
        this.buildingInspectionData.insertedBy = this.session.userName;
        this.buildingInspectionData.source = 'web';
        this.spinner.show();
        const response = await this.mcuAPI.amcuBuildingInspectionSub(
          this.buildingInspectionData
        );
        if (response.success) {
          alert(response.message);
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
      this.buildingInspectionData.inspectionDate === '' ||
      this.buildingInspectionData.inspectionDate === null ||
      this.buildingInspectionData.inspectionDate === undefined
    ) {
      this.toast.warning('Please Enter Inspection Date');
      return false;
    }

    if (
      this.buildingInspectionData.inspectionTime === '' ||
      this.buildingInspectionData.inspectionTime === null ||
      this.buildingInspectionData.inspectionTime === undefined
    ) {
      this.toast.warning('Please Enter Inspection Time');
      return false;
    }

    if (
      this.buildingInspectionData.isAMCUBuilding === '' ||
      this.buildingInspectionData.isAMCUBuilding === null ||
      this.buildingInspectionData.isAMCUBuilding === undefined
    ) {
      this.toast.warning('Please Select Building Type');
      return false;
    }

    if (
      this.buildingInspectionData.isVillageLocatedInCenter === '' ||
      this.buildingInspectionData.isVillageLocatedInCenter === null ||
      this.buildingInspectionData.isVillageLocatedInCenter === undefined
    ) {
      this.toast.warning('Please Select Is Village Centrally Located');
      return false;
    }

    if (
      this.buildingInspectionData.isSafetyArrangements === '' ||
      this.buildingInspectionData.isSafetyArrangements === null ||
      this.buildingInspectionData.isSafetyArrangements === undefined
    ) {
      this.toast.warning('Please Select Safety Arrangements');
      return false;
    }

    if (
      this.buildingInspectionData.saftyArrangementsImg === '' ||
      this.buildingInspectionData.saftyArrangementsImg === null ||
      this.buildingInspectionData.saftyArrangementsImg === undefined
    ) {
      this.toast.warning('Please Upload Safety Arrangements Photo ');
      return false;
    }

    if (
      this.buildingInspectionData.isElectricityAvailable === '' ||
      this.buildingInspectionData.isElectricityAvailable === null ||
      this.buildingInspectionData.isElectricityAvailable === undefined
    ) {
      this.toast.warning('Please Select Available Of Electricity Connection ');
      return false;
    }

    if (
      this.buildingInspectionData.electricConnectionImg === '' ||
      this.buildingInspectionData.electricConnectionImg === null ||
      this.buildingInspectionData.electricConnectionImg === undefined
    ) {
      this.toast.warning('Please Upload Electricity Connection Photo ');
      return false;
    }

    if (
      this.buildingInspectionData.isAvailableElectricityEarthed === '' ||
      this.buildingInspectionData.isAvailableElectricityEarthed === null ||
      this.buildingInspectionData.isAvailableElectricityEarthed === undefined
    ) {
      this.toast.warning(
        'Please Select Availability Of Electricity Earthen Arrangements '
      );
      return false;
    }

    if (
      this.buildingInspectionData.electricEarthImg === '' ||
      this.buildingInspectionData.electricEarthImg === null ||
      this.buildingInspectionData.electricEarthImg === undefined
    ) {
      this.toast.warning(
        'Please Upload Electricity Earthen Arrangement Photo '
      );
      return false;
    }

    if (
      this.buildingInspectionData.isAvailbleSpaceForVehicleMovement === '' ||
      this.buildingInspectionData.isAvailbleSpaceForVehicleMovement === null ||
      this.buildingInspectionData.isAvailbleSpaceForVehicleMovement ===
        undefined
    ) {
      this.toast.warning(
        'Please Select Availability Of Sape For Vehicle Movement '
      );
      return false;
    }

    if (
      this.buildingInspectionData.vehicleSpaceMovingImg === '' ||
      this.buildingInspectionData.vehicleSpaceMovingImg === null ||
      this.buildingInspectionData.vehicleSpaceMovingImg === undefined
    ) {
      this.toast.warning(
        'Please Upload Availability Of Space For Vehicle Movement Photo '
      );
      return false;
    }

    if (
      this.buildingInspectionData.isAvailbleRaodToApproachAMCU === '' ||
      this.buildingInspectionData.isAvailbleRaodToApproachAMCU === null ||
      this.buildingInspectionData.isAvailbleRaodToApproachAMCU === undefined
    ) {
      this.toast.warning(
        'Please Select Availability Of Road To AMCU Building '
      );
      return false;
    }

    if (
      this.buildingInspectionData.isHavingNetworkConnectivity === '' ||
      this.buildingInspectionData.isHavingNetworkConnectivity === null ||
      this.buildingInspectionData.isHavingNetworkConnectivity === undefined
    ) {
      this.toast.warning('Please Select Network Connectivity ');
      return false;
    }

    if (
      this.buildingInspectionData.requiredMilkCans === '' ||
      this.buildingInspectionData.requiredMilkCans === null ||
      this.buildingInspectionData.requiredMilkCans === undefined
    ) {
      this.toast.warning('Please Enter No. Of milk cans required');
      return false;
    }

    if (
      this.buildingInspectionData.buildingAddress === '' ||
      this.buildingInspectionData.buildingAddress === null ||
      this.buildingInspectionData.buildingAddress === undefined
    ) {
      this.toast.warning('Please Enter Building Door No. ');
      return false;
    }

    if (
      this.buildingInspectionData.buildingName === '' ||
      this.buildingInspectionData.buildingName === null ||
      this.buildingInspectionData.buildingName === undefined
    ) {
      this.toast.warning('Please Enter Building Name ');
      return false;
    }

    if (
      this.buildingInspectionData.buildingStreet === '' ||
      this.buildingInspectionData.buildingStreet === null ||
      this.buildingInspectionData.buildingStreet === undefined
    ) {
      this.toast.warning('Please Enter Building Street ');
      return false;
    }

    if (
      this.buildingInspectionData.rbkId === '' ||
      this.buildingInspectionData.rbkId === null ||
      this.buildingInspectionData.rbkId === undefined
    ) {
      this.toast.warning('Please Select RSK');
      return false;
    }

    if (
      this.buildingInspectionData.villageId === '' ||
      this.buildingInspectionData.villageId === null ||
      this.buildingInspectionData.villageId === undefined
    ) {
      this.toast.warning('Please Select Village');
      return false;
    }

    if (
      this.buildingInspectionData.mandalId === '' ||
      this.buildingInspectionData.mandalId === null ||
      this.buildingInspectionData.mandalId === undefined
    ) {
      this.toast.warning('Please Select Mandal');
      return false;
    }

    if (
      this.buildingInspectionData.districtId === '' ||
      this.buildingInspectionData.districtId === null ||
      this.buildingInspectionData.districtId === undefined
    ) {
      this.toast.warning('Please Select District');
      return false;
    }

    if (
      this.buildingInspectionData.pinCode === '' ||
      this.buildingInspectionData.pinCode === null ||
      this.buildingInspectionData.pinCode === undefined
    ) {
      this.toast.warning('Please Enter Pincode ');
      return false;
    }

    if (!this.utils.pinCodeCheck(this.buildingInspectionData.pinCode)) {
      this.toast.warning('Please Enter Valid Pincode');
      return false;
    }

    if (
      this.buildingInspectionData.buildingLongitude === '' ||
      this.buildingInspectionData.buildingLongitude === null ||
      this.buildingInspectionData.buildingLongitude === undefined
    ) {
      this.toast.warning('Please Enter Longitude ');
      return false;
    }

    if (
      this.buildingInspectionData.buildingLatitude === '' ||
      this.buildingInspectionData.buildingLatitude === null ||
      this.buildingInspectionData.buildingLatitude === undefined
    ) {
      this.toast.warning('Please Enter Latitude ');
      return false;
    }

    if (
      this.buildingInspectionData.buildingInteriorImg === '' ||
      this.buildingInspectionData.buildingInteriorImg === null ||
      this.buildingInspectionData.buildingInteriorImg === undefined
    ) {
      this.toast.warning('Please Upload Building Interior Photo ');
      return false;
    }

    if (
      this.buildingInspectionData.buildingExteriorImg === '' ||
      this.buildingInspectionData.buildingExteriorImg === null ||
      this.buildingInspectionData.buildingExteriorImg === undefined
    ) {
      this.toast.warning('Please Upload Building Exterior Photo ');
      return false;
    }

    if (
      this.buildingInspectionData.buildingRoadLeadingImg === '' ||
      this.buildingInspectionData.buildingRoadLeadingImg === null ||
      this.buildingInspectionData.buildingRoadLeadingImg === undefined
    ) {
      this.toast.warning('Please Upload Road Leading To Building Photo ');
      return false;
    }

    return true;
  }

  async onisSafetyArrangementsChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.buildingInspectionData.saftyArrangementsImg = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onisElectricityAvailableChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.buildingInspectionData.electricConnectionImg = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onisAvailableElectricEarthedChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.buildingInspectionData.electricEarthImg = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onisAvailableSpaceForVehicleChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.buildingInspectionData.vehicleSpaceMovingImg = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onbuildingInteriorImgUploadChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.buildingInspectionData.buildingInteriorImg = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onbuildingExteriorImgUploadChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.buildingInspectionData.buildingExteriorImg = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onbuildingRoadLeadUploadChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.buildingInspectionData.buildingRoadLeadingImg = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }
}
