import { SafeResourceUrl } from "@angular/platform-browser";

export class feasibilityDetailsModel {
  F_LGTH_BRTH_DESIGN: string;
  F_LGTH_BRTH_DESIGN_IMG: string;
  F_LOCATION_ACCESS_WOMEN: string;
  F_LOCATION_ACCESS_WOMEN_IMG: string;
  F_ROAD_VEHICLE: string;
  F_ROAD_VEHICLE_IMG: string;
  INSERTED_BY: string;
  INSERTED_ON: string;
  RBK_CODE: string;
  VILLAGE_CODE: string;
}

export class feasibilitySubModel {
  districtId: string;
  rbkId: string;
  villageId: string;
  workId: string;
  lengthBreadthDesign: string;
  lengthBreadthDesignImage: string;
  locationAccessToWomen: string;
  locationAccessToWomenImage: string;
  roadConnectivityForVehicle: string;
  roadConnectivityForVehicleImg: string;
  insertedBy: string;
  updatedBy: string;
  source: string;
}

export class registrationDetailsModel {
  R_REGIS_LAND_DDCF: string;
  R_REGIS_LAND_DDCF_IMG: string;
  R_REGIS_CERTIFI_IMG: string;
  R_ALIENATION_HANDING: string;
  R_ALIENATION_HANDING_IMG: string;
  INSERTED_BY: string;
  INSERTED_ON: string;
  RBK_CODE: string;
  VILLAGE_CODE: string;
}
export class registrationSubModel {
  districtId: string;
  rbkId: string;
  villageId: string;
  workId:  string;
  registrationOfLand: string;
  registrationOfLandImage: string;
  registrationCertificateImage: string;
  alienationHanding: string;
  alienationHandingImage: string;
  insertedBy: string;
  updatedBy: string;
  source: string;
}

export class otherFacilitiesModel {
  OF_AVI_WATER_BOREWELL: string;
  OF_AVI_WATER_BOREWELL_IMG: string;
  OF_AVI_DRINAGE: string;
  OF_AVI_DRINAGE_IMG: string;
  OF_AVI_SEWAGE_CONNECT: string;
  OF_AVI_SEWAGE_CONNECT_IMG: string;
  INSERTED_BY: string;
}
export class otherFacilitiesSubModel {
  districtId: string;
  rbkId: string;
  villageId: string;
  workId:  string;
  availabilityOfWater: string;
  availabilityOfWaterImage: string;
  availabilityOfDrainage: string;
  availabilityOfDrainageImage: string;
  availabilityOfSewageConnect: string;
  availabilityOfSewageConnectImg: string;
  insertedBy: string;
  updatedBy: string;
  source: string;
}

export class basementDetailsModel {
  RBK_CODE: string;
  VILLAGE_CODE: string;
  MARKING_MDAC_WOMEN: string;
  MARKING_MDAC_WOMEN_IMG: string;
  FOUNDATION_CONCRET: string;
  FOUNDATION_CONCRET_IMG: string;
  PLINTH_BEAM: string;
  PLINTH_BEAM_IMG: string;
  INSERTED_BY: string;
  INSERTED_DATE: string;
  UPDATED_BY: string;
  UPDATED_DATE: string;
}
export class basementSubModel {
  districtId: string;
  rbkId: string;
  villageId: string;
  workId:  string;
  markingMdacWomen: string;
  markingMdacWomenImage: string;
  foundationConcrete: string;
  foundationConcreteImage: string;
  plinthBeam: string;
  plinthBeamImage: string;
  insertedBy: string;
  updatedBy: string;
  submission: boolean;
  markingMdacWomenImagePathFlag: string;
  foundationConcretImagePathFlag: string;
  PlinthBeamImagePathFlag: string;
  source: string;
}

export class superStructureDetailsModel {
  RBK_CODE: string;
  VILLAGE_CODE: string;
  PROVIDING_COLUMNS: string;
  PROVIDING_COLUMNS_IMG: string;
  PROVIDING_SLAB: string;
  PROVIDING_SLAB_IMG: string;
  BRICK_WORK_FOR_WALLS: string;
  BRICK_WORK_FOR_WALLS_IMG: string;
  INSERTED_BY: string;
  INSERTED_DATE: string;
  UPDATED_BY: string;
  UPDATED_DATE: string;
}

export class superStructureSubModel {
  districtId: string;
  rbkId: string;
  villageId: string;
  workId:  string;
  providingColumns: string;
  providingColumnsImage: string;
  providingSlab: string;
  providingSlabImage: string;
  brickWorkForWalls: string;
  brickWorkForWallsImage: string;
  insertedBy: string;
  updatedBy: string;
  submission: boolean;
  providingColumnsImagePathFlag: string;
  ProvidingSlabImagePathFlag: string;
  brickWorkForWallsImagePathFlag: string;
  source: string;
}

export class finishingDetailsModel {
  RBK_CODE: string;
  VILLAGE_CODE: string;
  PLASTERING: string;
  PLASTERING_IMG: string;
  FLOORING: string;
  FLOORING_IMG: string;
  WINDOWS_DOORS_VENTILAT: string;
  WINDOWS_DOORS_VENTILAT_IMG: string;
  PAINTING: string;
  PAINTING_IMG: string;
  LOGOS_NAMEBOARD: string;
  LOGOS_NAMEBOARD_IMG: string;
  INSERTED_BY: string;
  INSERTED_DATE: string;
  UPDATED_BY: string;
  UPDATED_DATE: string;
}

export class finishingSubModel {
  districtId: string;
  rbkId: string;
  villageId: string;
  workId:  string;
  plastering: string;
  plasteringImage: string;
  flooring: string;
  flooringImage: string;
  windowsDoorsVentilators: string;
  windowsDoorsVentilatorsImage: string;
  painting: string;
  paintingImage: string;
  logosNameboard: string;
  logosNameboardImage: string;
  insertedBy: string;
  updatedBy: string;
  submission: boolean;
  plasteringImagePathFlag: string;
  flooringImagePathFlag: string;
  windowsDoorsVentilatImagePathFlag: string;
  paintingImagePathFlag: string;
  logosNameboardImagePathFlag: string;
  source: string;
}

export class otherInfrastructureDetailsModel {
  RBK_CODE: string;
  VILLAGE_CODE: string;
  ELE_POWER_LIGHT_FAN: string;
  ELE_POWER_LIGHT_FAN_IMG: string;
  EARTHING: string;
  EARTHING_IMG: string;
  WATER_SUPPLY_BORETAP: string;
  WATER_SUPPLY_BORETAP_IMG: string;
  SANITATION: string;
  SANITATION_IMG: string;
  SUMP: string;
  SUMP_IMG: string;
  INSERTED_BY: string;
  INSERTED_DATE: string;
  UPDATED_BY: string;
  UPDATED_DATE: string;
}

export class otherInfrastructureSubModel {
  districtId: string;
  rbkId: string;
  villageId: string;
  workId:  string;
  electricPowerSupply: string;
  electricPowerSupplyImage: string;
  earthing: string;
  earthingImage: string;
  waterSupplyBoretap: string;
  waterSupplyBoretapImage: string;
  sanitation: string;
  sanitationImage: string;
  sump: string;
  sumpImage: string;
  insertedBy: string;
  updatedBy: string;
  submission: boolean;
  source: string;

  elePowerLightFanImagePathFlag: string;
  earthingImagePathFlag: string;
  waterSupplyBoretapImagePathFlag: string;
  sanitationImagePathFlag: string;
  sumpImagePathFlag: string;
}
export class imagepathModel { 
    MEETING_ID: string | undefined;
    IMAGE_PATH: string | undefined;
    STATUS: string | undefined;
    LANDIMAGES_TYPE: string | undefined;
    IMAGE:SafeResourceUrl|undefined;
}
