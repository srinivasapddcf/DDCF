import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Injectable({
  providedIn: 'root',
})
export class MdssService {
  mdssURL = '';
  baseURL = '';
  farmerURL = '';
  crystalURL = '';
   mdssdlcoURL = '';
   promoterURL='';
   addmemberURL='';
  constructor(private httpClient: HttpClient, private utils: UtilsService) {
    this.baseURL = utils.baseUrl() + 'api/mcuMapping/';
    this.mdssURL = utils.mdssUrl() + 'api/meeting/';
    this.mdssdlcoURL = utils.mdssUrl() + 'api/dlcoModule/';
   // this.mdssdlcoURL = utils.mdssUrl() + 'api/dlcoModule/';
    this.farmerURL = utils.baseUrl() + 'api/farmerModule/';
    this.crystalURL =
      utils.crystalReportsUrl() + 'api/mdssmahilamilkproducers/';
      this.promoterURL =
      utils.crystalReportsUrl() + 'api/promotersModule/';
      this.addmemberURL = utils.mdssUrl() + 'api/NewMemberaddModule/';
  }

  public rbkListByMentorId(req): Promise<any> {
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
  public mdsschecklist(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}mdsschecklist`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public rbkListByMentorIds(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}rbkListByMentorId`,
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

  // mdss meeting schedule and attendance

  public meetingScheduleSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}meetingScheduleSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public meetingAttendanceSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}meetingAttendanceSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public meetingDetailsByRbkId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}meetingDetailsByRbkId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public farmerDetailsByMeetingId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}farmerDetailsByMeetingId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public promoterRbkId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}promoterRbkId`,
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
        `${this.mdssURL}minutesOfMeetingSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  // public promotersSub(req): Promise<any> {
  //   const result: any = this.httpClient
  //     .post(`${this.mdssURL}promotersSub`, req, this.utils.getPostHttpOptions())
  //     .pipe(retry(this.utils.env.API_RETRY_COUNT))
  //     .toPromise();
  //   return result;
  // }
  public promotersSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.promoterURL}promotersSub`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public farmerListByRbkId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}farmerListByRbkId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public promotersDetailsByRbkId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}promotersDetailsByRbkId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public mdssDocDetailsByRbkId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}mdssDocDetailsByRbkId`,   //with rbk pdf file path
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }


  public mdssDocumentsEditandSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}mdssDocumentsEditandSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  

  public mdssDocumentsRejectSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}mdssDocumentsRejectSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }


  public mdssDocumentsSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}mdssDocumentsSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }


  public mdssDocumentsSubFirstoff(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}mdssDocumentsSubFirstoff`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public mdssDocumentsSubSecondoff(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}mdssDocumentsSubSecondoff`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public mdssDocumentsSubthirdoff(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}mdssDocumentsSubthirdoff`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  

  public mdssDocumentsSubonebyone(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}mdssDocumentsSubonebyone`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public mdssDocumentsSubbylaw(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}mdssDocumentsSubbylaw`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public mdacBankDetailsByRbkId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}mdacBankDetailsByRbkId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public mdssApplicationRegSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}mdssApplicationRegSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public regSubmittedRbkList(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}regSubmittedRbkList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  

  public mdssAuthenticationByUniqueId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssdlcoURL}mdssAuthenticationByUniqueId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }


  public applicationStatus(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}applicationStatus`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  // end  mdss meeting

  public searchByIFSC(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.farmerURL}searchByIFSC`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  // crystal reports pdf

  public forma(req): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.crystalURL}forma`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  
  public formanew(req): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.crystalURL}formanew`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }


  public swornstatementEMPTY(req): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.crystalURL}swornstatementEMPTY`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }


  public formafirstpage(req): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.crystalURL}formafirstpage`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  
  public swornstatement(req): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.crystalURL}swornstatement`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  
  public PROCEEDINGSOFTHEMEETING(req): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.crystalURL}PROCEEDINGSOFTHEMEETING`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }


  public AdhocCommittee(req): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.crystalURL}AdhocCommittee`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }





  public EconomicViability(req): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.crystalURL}EconomicViability`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }



  public formaattendance(req): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.crystalURL}formaattendance`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }


  public bylaw(req): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.crystalURL}bylaw`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public masudaform(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.crystalURL}masudaform`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public Feasibility(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.crystalURL}Feasibility`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public ConfirmationLetter(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.crystalURL}ConfirmationLetter`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  
  public Proceedings(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.crystalURL}Proceedings`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public EligibalRBKsList(req): Promise<any> {
    const result: any = this.httpClient
        .post(
            `${this.addmemberURL}EligibalRBKsList`,
            req,
            this.utils.getPostHttpOptions()
        )
        .pipe(retry(this.utils.env.API_RETRY_COUNT))
        .toPromise();
    return result;
}


public EligibalRBKs_Details(req): Promise<any> {
  const result: any = this.httpClient
      .post(
          `${this.addmemberURL}EligibalRBKs_Details`,
          req,
          this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
  return result;
}

public ApplicationEligibalRBKs_List(req): Promise<any> {
  const result: any = this.httpClient
      .post(
          `${this.addmemberURL}ApplicationEligibalRBKs_List`,
          req,
          this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
  return result;
}

public Member_Relation_List(req): Promise<any> {
  const result: any = this.httpClient
      .post(
          `${this.addmemberURL}Member_Relation_List`,
          req,
          this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
  return result;
}

public EligibalFarmers_List(req): Promise<any> {
  const result: any = this.httpClient
      .post(
          `${this.addmemberURL}EligibalFarmers_List`,
          req,
          this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
  return result;
}

public ApplicationfromEligiblemembersadd(req): Promise<any> {
  const result: any = this.httpClient
      .post(

          `${this.addmemberURL}ApplicationfromEligiblemembersadd`,
          req,
          this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
  return result;
}

public SheduleCreationIns(req): Promise<any> {
  const result: any = this.httpClient
      .post(
          `${this.addmemberURL}SheduleCreationIns`,
          req,
          this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
  return result;
}

public NotSheduleCreated_RbkList(req): Promise<any> {
  const result: any = this.httpClient
      .post(
          `${this.addmemberURL}NotSheduleCreated_RbkList`,
          req,
          this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
  return result;
}
public Meating_Attadents_RbkList(req): Promise<any> {
  const result: any = this.httpClient
      .post(
          `${this.addmemberURL}Meating_Attadents_RbkList`,
          req,
          this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
  return result;
}

public Meating_Attadents_MeetingList(req): Promise<any> {
  const result: any = this.httpClient
      .post(
          `${this.addmemberURL}Meating_Attadents_MeetingList`,
          req,
          this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
  return result;
}

public Meating_Details_List(req): Promise<any> {
  const result: any = this.httpClient
      .post(
          `${this.addmemberURL}Meating_Details_List`,
          req,
          this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
  return result;
}

public AttendanceInsertData(req): Promise<any> {
  const result: any = this.httpClient
      .post(
          `${this.addmemberURL}AttendanceInsertData`,
          req,
          this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
  return result;
}

public New_Minits_ofmeeting_RbkList(req): Promise<any> {
  const result: any = this.httpClient
      .post(
          `${this.addmemberURL}Minits_of_meeting_RbkList`,
          req,
          this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
  return result;
}

public New_Minits_of_meeting_MeetingList(req): Promise<any> {
  const result: any = this.httpClient
      .post(
          `${this.addmemberURL}Minits_of_meeting_MeetingList`,
          req,
          this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
  return result;
}

public New_Minits_of_meeting_Details_List(req): Promise<any> {
  const result: any = this.httpClient
      .post(
          `${this.addmemberURL}Minits_of_meeting_Details_List`,
          req,
          this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
  return result;
}

public New_MinutesofMeetingUpdateData(req): Promise<any> {
  const result: any = this.httpClient
      .post(
          `${this.addmemberURL}MinutesofMeetingUpdateData`,
          req,
          this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
  return result;
}
public Minits_of_meeting_Approved_List(req): Promise<any> {
  const result: any = this.httpClient
      .post(
          `${this.addmemberURL}Minits_of_meeting_Approved_List`,
          req,
          this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
  return result;
}

public NewMinutesofMeetingInsertData(req): Promise<any> {
  const result: any = this.httpClient
      .post(
          `${this.addmemberURL}MinutesofMeetingInsertData`,
          req,
          this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
  return result;
}

public Doc_Upload_RbkList(req): Promise<any> {
  const result: any = this.httpClient
      .post(
          `${this.addmemberURL}Doc_Upload_RbkList`,
          req,
          this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
  return result;
}

public PdfUploadFarmer(req): Promise<any> {
  const result: any = this.httpClient
      .post(
          `${this.addmemberURL}PdfUploadFarmer`,
          req,
          this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
  return result;
}

public NewMemberAddCrystalReport(req): Promise<any> {
  const result: any = this.httpClient
      .post(
          `${this.crystalURL}NewMemberAddCrystalReport`,
          req,
          this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
  return result;
}

public Doc_Upload_MemberList(req): Promise<any> {
  const result: any = this.httpClient
      .post(
          `${this.addmemberURL}Doc_Upload_MemberList`,
          req,
          this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
  return result;
}


  // end crystal reports pdf





  // DMSFileDownload(file): any {
  //   const resp = this.fileIdToBaseString(file);
  //   return resp;
  // }

  // public fileIdToBaseString(fileId: string) {
  //   const req = {
  //     filePath: fileId,
  //   };
  //   const url ='https://apiapddcf.ap.gov.in/mdss/'+fileId;// utils.mdssUrl();
  //   const result: any = this.httpClient
  //     .post(`${url}`,   this.utils.getPostHttpOptions())
  //     .pipe(retry(3))
  //     .toPromise();
  //   return result;
  // }
}
