import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Injectable({
  providedIn: 'root',
})
export class McuMappingService {
  baseURL = '';
  bmcuURL = '';
  bmcuConstruction;
  societyURL = '';
  crystalURL = '';
  loanModuleURL='';
  amulurl='';
  dairyapp='';
  schattURL='';
  farmerURL='';
  smsapi='';

  constructor(private httpClient: HttpClient, private utils: UtilsService) { 
    this.baseURL = utils.baseUrl() + 'api/mcuMapping/';
    this.bmcuURL = utils.baseUrl() + 'api/bmcu/';
    this.societyURL = utils.baseUrl() + 'api/societyChange/';
    this.bmcuConstruction = utils.baseUrl() + 'api/bmcuBuildingConstruction/';
    this.crystalURL = utils.crystalReportsUrl() + 'api/farmerModule/';
    this.loanModuleURL = utils.baseUrl() + 'api/loanModule/';
    this.amulurl = utils.baseUrl() + 'api/amulReports/';
    this.dairyapp = utils.baseUrl() + 'api/officeModule/';
    this.schattURL = utils.baseUrl() + 'api/officeScheduleAttendance/';
    this.farmerURL = utils.baseUrl() + 'api/farmerModule/';
    this.smsapi = utils.baseUrl() + 'api/rptssmsSending/';
     

  }

  public rbkList(req): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.baseURL}rbkList`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }


  public officescheduletestingSelect(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.dairyapp}officescheduletestingSelect`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  
 
  
  public ScheduleAttendanceSelect(req): Promise<any> {
    const result: any = this.httpClient 
      .post(
        `${this.schattURL}ScheduleAttendanceSelect`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

   
  public ScheduleApprvalsSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.schattURL}ScheduleApprvalsSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }



  public ScheduleAttendanceSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.schattURL}ScheduleAttendanceSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }



  public office_po_select(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.dairyapp}office_po_select`,
        req,
        this.utils.getPostHttpOptions()//getPostHttpOptionstoken
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise(); 
    return result;
  }

  public officeTenderPriceSelect(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.dairyapp}officeTenderPriceSelect`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public officescheduletestingSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.dairyapp}officescheduletestingSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }


  public routeList(req): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.baseURL}routeList`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public NotificationsForJobDetails(req) {
    const result: any = this.httpClient
        .post(
            `${this.amulurl}GetJobDetails`,   //amulurl  baseURL
            req,
            this.utils.getPostHttpOptions()
        )
        .pipe(retry(this.utils.env.API_RETRY_COUNT))
        .toPromise();
    return result;
}
public JobDetailsSubmit(req) {
    const result: any = this.httpClient
        .post(
            `${this.amulurl}OfficeJobDetailsSub`,   //amulurl  baseURL
            req,
            this.utils.getPostHttpOptions()
        )
        .pipe(retry(this.utils.env.API_RETRY_COUNT))
        .toPromise();
    return result;
}


  public GetJobDetails(req): Promise<any> {
    const result: any = this.httpClient
        .post(
            `${this.baseURL}GetJobDetails`,   //amulurl  baseURL
            req,
            this.utils.getPostHttpOptions()
        )
        .pipe(retry(this.utils.env.API_RETRY_COUNT))
        .toPromise();
    return result;
}

  public villageList(req): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.baseURL}villageList`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public SocietyChangedropdowns(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.societyURL}SocietyChangedropdowns`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  // public villageListByRbkId(req): Promise<any> {
  //   const result: any = this.httpClient
  //     .post(`${this.baseURL}villageListByRbkId`, req, this.utils.getPostHttpOptions())
  //     .pipe(retry(this.utils.env.API_RETRY_COUNT))
  //     .toPromise();
  //   return result;
  // }

  public milkCenterUpdate(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}milkCenterUpdate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }


// Loanmodule strat

public loanscountByFarmercode(req): Promise<any> {
  const result: any = this.httpClient
    .post(
      `${this.loanModuleURL}loanscountByFarmercode`,
      req,
      this.utils.getPostHttpOptions()
    )
    .pipe(retry(this.utils.env.API_RETRY_COUNT))
    .toPromise();
  return result;
}


public animalfeedtypes(req): Promise<any> {
  const result: any = this.httpClient
    .post(
      `${this.loanModuleURL}animalfeedtypes`,
      req,
      this.utils.getPostHttpOptions()
    )
    .pipe(retry(this.utils.env.API_RETRY_COUNT))
    .toPromise();
  return result;
}

public purposeofLoantypes(req): Promise<any> {
  const result: any = this.httpClient
    .post(
      `${this.loanModuleURL}purposeofLoantypes`,
      req,
      this.utils.getPostHttpOptions()
    )
    .pipe(retry(this.utils.env.API_RETRY_COUNT))
    .toPromise();
  return result;
}

public typesofBanks(req): Promise<any> {
  const result: any = this.httpClient
    .post(
      `${this.loanModuleURL}typesofBanks`,
      req,
      this.utils.getPostHttpOptions()
    )
    .pipe(retry(this.utils.env.API_RETRY_COUNT))
    .toPromise();
  return result;
}

public typesofLoanBankID(req): Promise<any> {
  const result: any = this.httpClient
    .post(
      `${this.loanModuleURL}typesofLoanBankID`,
      req,
      this.utils.getPostHttpOptions()
    )
    .pipe(retry(this.utils.env.API_RETRY_COUNT))
    .toPromise();
  return result;
}

public farmercodedetailsGet(req): Promise<any> {
  const result: any = this.httpClient
    .post(
      `${this.loanModuleURL}farmercodedetailsGet`,
      req,
      this.utils.getPostHttpOptions()
    )
    .pipe(retry(this.utils.env.API_RETRY_COUNT))
    .toPromise();
  return result;
}
// Loanmodule end
 


public rbkminutuesofmeeting(req): Promise<any> { 

    const result: any = this.httpClient
      .post(
        `${this.baseURL}rbkminutuesofmeeting`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }


  public rbkListByMentorId(req): Promise<any> {
  //  let jsonstring=JSON.stringify(req);
  //  let encstring=this.utils.encrypt(jsonstring);

  //  const reqobj={
  //    rootenc:encstring
  //  }

    const result: any = this.httpClient
      .post(
        `${this.baseURL}rbkListByMentorId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public villageListByRbkId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}villageListByRbkId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public scheduleCreation(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}scheduleCreation`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public minutesOfMeetingSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}minutesOfMeetingSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public meetingAttendanceList(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}meetingAttendanceList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public searchByUid(req): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.baseURL}searchByUid`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public meetingAttendanceSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}meetingAttendanceSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public qualificationsList(): Promise<any> {
    const result: any = this.httpClient
      .get(`${this.baseURL}qualificationsList`, this.utils.getGetHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public promoterQualificationsList(): Promise<any> {
    const result: any = this.httpClient
      .get(
        `${this.baseURL}promoterQualificationsList`,
        this.utils.getGetHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public secretaryCreationSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}secretaryCreationSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public amcuBuildingInspectionSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}amcuBuildingInspectionSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public searchPromoterByUid(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}searchPromoterByUid`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public checkPromoterDetails(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}checkPromoterDetails`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public promotorSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.baseURL}promotorSub`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public promoterListRbkId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}promoterListRbkId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public searchByIFSC(req): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.baseURL}searchByIFSC`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public promotersByRbkId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}promotersByRbkId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public mpuacAccSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.baseURL}mpuacAccSub`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public secretaryTrainingSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}secretaryTrainingSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public HandOverSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.baseURL}HandOverSub`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public mentorApprovalList(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}mentorApprovalList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public mentorApprovalUpdation(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}mentorApprovalUpdation`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public paymentStatusCheck(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}paymentStatusCheck`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public functionariesListByRbk(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}functionariesListByRbk`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public functionariesListByVillageId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}functionariesListByVillageId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public functionaryDetailsUpdate(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}functionaryDetailsUpdate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public amcuInspectionSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}amcuInspectionSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public villageListByRbkDesigId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}villageListByRbkDesigId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public secretaryCreationDetailsById(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}secretaryCreationDetailsById`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public secretaryCreationUpdate(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}secretaryCreationUpdate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public mandalListByUniqueId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}mandalListByUniqueId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public bmcuVillageListByRbkId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.bmcuURL}bmcuVillageListByRbkId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public inspectionStagesList(): Promise<any> {
    const result: any = this.httpClient
      .get(
        `${this.bmcuURL}inspectionStagesList`,
        this.utils.getGetHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public inspectionSubStagesList(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.bmcuURL}inspectionSubStagesList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public bmcuBuildingInspectionSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.bmcuURL}bmcuBuildingInspectionSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public inspectionDetailsList(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.bmcuURL}inspectionDetailsList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public feasibilityOfLandCheck(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.bmcuConstruction}feasibilityOfLandCheck`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public feasibilityOfLandSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.bmcuConstruction}feasibilityOfLandSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public registrationOfLandCheck(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.bmcuConstruction}registrationOfLandCheck`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public registrationOfLandSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.bmcuConstruction}registrationOfLandSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public otherFacilitiesCheck(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.bmcuConstruction}otherFacilitiesCheck`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public otherFacilitiesSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.bmcuConstruction}otherFacilitiesSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public basementLevelCheck(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.bmcuConstruction}basementLevelCheck`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public basementLevelSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.bmcuConstruction}basementLevelSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public basementLevelUpdate(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.bmcuConstruction}basementLevelUpdate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public superStructureCheck(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.bmcuConstruction}superStructureCheck`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public superStructureSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.bmcuConstruction}superStructureSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public superStructureUpdate(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.bmcuConstruction}superStructureUpdate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public finishingCheck(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.bmcuConstruction}finishingCheck`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public finishingSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.bmcuConstruction}finishingSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public finishingUpdate(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.bmcuConstruction}finishingUpdate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public otherInfrastructurecheck(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.bmcuConstruction}otherInfrastructurecheck`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public otherInfrastructureSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.bmcuConstruction}otherInfrastructureSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public otherInfrastructureUpdate(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.bmcuConstruction}otherInfrastructureUpdate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public firstPriorityList(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.bmcuConstruction}firstPriorityList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public bmcuWorkIdCheck(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.bmcuConstruction}bmcuWorkIdCheck`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public farmerAadharCheck(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}farmerAadharCheck`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public farmerList(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.societyURL}farmerList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public farmerSocietyChangeRequestSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.societyURL}farmerSocietyChangeRequestSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public farmerSocietyChangeDAVFWEARequestSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.societyURL}farmerSocietyChangeDAVFWEARequestSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public mentorFarmerRequestsList(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.societyURL}mentorFarmerRequestsList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public meetingIdListByVillageId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}meetingIdListByVillageId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public editMdacAccDetailsByrbkId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}editMdacAccDetailsByrbkId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public editMdacAccountSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}editMdacAccountSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public editMdacRequestList(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}editMdacRequestList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public familyListByUid(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}familyListByUid`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public familyDeadUpdation(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}familyDeadUpdation`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public editPromotersListByRbkId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}editPromotersListByRbkId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public editPromotersSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}editPromotersSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public editPromotersRequestList(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}editPromotersRequestList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public scheduleListByVillageId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}scheduleListByVillageId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public scheduleUpdate(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}scheduleUpdate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  // feed indent

  public feedIndentMentorDashboard(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}feedIndentMentorDashboard`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public indentMentorPersonDetails(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}indentMentorPersonDetails`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public feedIndentMentorUpdation(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}feedIndentMentorUpdation`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  // end feed indent

  // Farmer Milk Pouring Certificate

  public getFarmerCertDetailsById(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}getFarmerCertDetailsById`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public farmerCertRequestSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}farmerCertRequestSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public mentorDashboardCounts(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}mentorDashboardCounts`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public mentorFarmerCertList(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}mentorFarmerCertList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public milkPouringCertificate(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.crystalURL}milkPouringCertificate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  // end Farmer Milk Pouring Certificate

  // GSWS Details Update

  public GSWSPersonDetailsByUid(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}GSWSPersonDetailsByUid`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  
  public JPVGSWSByUid(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.farmerURL}JPVGSWSByUid`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public gswsDetaisUpdate(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}gswsDetaisUpdate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
//lone module
  public existingLoanDetailsSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.loanModuleURL}existingLoanDetailsSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public loanscountByFarmercodecount(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}loanscountByFarmercode`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public TransactionsByUnionidGet(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.amulurl}TransactionsByUnionidGet`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public SmsSendingCredGet(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.smsapi}SmsSendingCredGet`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public SmsSendingDetailsGet(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.smsapi}SmsSendingDetailsGet`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public SmsSendingCredInsert(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.smsapi}SmsSendingCredInsert`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public SmsSendingDetailsInsert(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.smsapi}SmsSendingDetailsInsert`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  // End GSWS Details Update

  public routedetailsBymentorIDrbkID(req): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.baseURL}routedetailsBymentorIDrbkID`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
}
