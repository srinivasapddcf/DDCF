import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Injectable({
  providedIn: 'root',
})
export class DistrictHoService {
   
  societyURL = '';
  mdacURL = '';
  verlandallotURL='';
  jpvReportsUrl='';jpvReportsFMUrl='';
  constructor(private httpClient: HttpClient, private utils: UtilsService) {
    this.societyURL = utils.baseUrl() + 'api/societyChange/';
    this.mdacURL = utils.baseUrl() + 'api/districtHO/';
    this.verlandallotURL = utils.baseUrl() + 'api/Landallotment/';
    this.jpvReportsUrl= utils.ReportsUrl() + 'api/dashboard/';
    this.jpvReportsFMUrl= utils.ReportsUrl() + 'api/farmerModule/';
  }

  public HODashboard(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.societyURL}HODashboard`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public HOPendingList(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.societyURL}HOPendingList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public HOApprovedList(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.societyURL}HOApprovedList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public HORejectedList(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.societyURL}HORejectedList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public societyHOUpdate(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.societyURL}societyHOUpdate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public mdacHODashboard(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdacURL}mdacHODashboard`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public pendingList(req): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.mdacURL}pendingList`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public approvedList(req): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.mdacURL}approvedList`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public rejectedList(req): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.mdacURL}rejectedList`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public mdacAccountUpdation(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdacURL}mdacAccountUpdation`,
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
        `${this.mdacURL}editPromotersListByRbkId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public deletePromoterById(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdacURL}deletePromoterById`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public regFarmerDetailsByUid(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdacURL}regFarmerDetailsByUid`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public regFarmerDetailsByUidBymentorrequest(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdacURL}regFarmerDetailsByUidBymentorrequest`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  

  public invalidBankAccountUpdate(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdacURL}invalidBankAccountUpdate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public promotersHODashboard(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdacURL}promotersHODashboard`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public promotersPendingList(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdacURL}promotersPendingList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public promotersApprovedList(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdacURL}promotersApprovedList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public SocietyMikCollectionGet(req): Promise<any> {
    const result: any = this.httpClient
        .post(
            `${this.societyURL}SocietyMikCollectionGet`,
            req,
            this.utils.getPostHttpOptions()
        )
        .pipe(retry(this.utils.env.API_RETRY_COUNT))
        .toPromise();
    return result;
}
public SocietyMikCollectionUpdate(req): Promise<any> {
    const result: any = this.httpClient
        .post(
            `${this.societyURL}SocietyMikCollectionUpdate`,
            req,
            this.utils.getPostHttpOptions()
        )
        .pipe(retry(this.utils.env.API_RETRY_COUNT))
        .toPromise();
    return result;
}

  public promotersRejectedList(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdacURL}promotersRejectedList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public deletePromoterByUid(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdacURL}deletePromoterByUid`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  // feed indent

  public feedIndentHODashboard(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdacURL}feedIndentHODashboard`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public feedIndentHOPersonList(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdacURL}feedIndentHOPersonList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public feedIndentHOUpdation(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdacURL}feedIndentHOUpdation`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  // end feed indent

  // farmer certificate dashboard

  public districtHODashboardCounts(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdacURL}districtHODashboardCounts`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public districtHOFarmerCertList(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdacURL}districtHOFarmerCertList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public districtHOCertUpdate(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdacURL}districtHOCertUpdate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public statusList(req): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.mdacURL}statusList`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public rejectedReasonsList(): Promise<any> {
    const result: any = this.httpClient
      .get(`${this.mdacURL}rejectedReasonsList`, this.utils.getGetHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }


  // end farmer certificate



  public landAllotmentMandalReport(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.verlandallotURL}landAllotmentMandalReport`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public landAllotmentMandalBMCUDelete(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.verlandallotURL}landAllotmentMandalBMCUDelete`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  

  public landAllotmentMandalDistrict_select(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.verlandallotURL}landAllotmentMandalDistrict_select`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  
  public landAllotmentMandalByDistrict(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.verlandallotURL}landAllotmentMandalByDistrict`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public amcuLandAllotmentMandalReport(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.jpvReportsFMUrl}amcuLandAllotmentMandalReport`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }


  public districtList() {
    const result: any = this.httpClient
      .post(`${this.jpvReportsUrl}districtList`, this.utils.getGetHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }


  public PaymnetDetailsGet(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `https://apiapddcf.ap.gov.in/jpv/api/districtHO/MilkPaymnetDetailsGet`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public MilkPaymnetDetailsInsert(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `https://apiapddcf.ap.gov.in/jpv/api/districtHO/MilkPaymnetDetailsInsert`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public HandlingChargesInsert(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `https://apiapddcf.ap.gov.in/jpv/api/districtHO/HandlingChargesInsert`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public PaymnetDetailsInsert(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `https://apiapddcf.ap.gov.in/jpv/api/districtHO/PaymnetDetailsInsert`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  // public PurchaseDetailsGet(req): Promise<any> {
  //   const result: any = this.httpClient
  //     .post(
  //       `${this.mdacURL}PurchaseDetailsGet`,
  //       req,
  //       this.utils.getPostHttpOptions()
  //     )
  //     .pipe(retry(this.utils.env.API_RETRY_COUNT))
  //     .toPromise();
  //   return result;
  // }


  public PurchaseDetailsGet(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdacURL}PurchaseDetailsGet`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }


  public PurchaseInvoiceIns(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdacURL}PurchaseInvoiceIns`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public fileDownload(req: any) {
    const result: any = this.httpClient
      .post(`https://apiapddcf.ap.gov.in/jpv/fileDownload`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

      //#region  passwordreset                  
                public loginsList(req): Promise<any> {
                  const result: any = this.httpClient
                    .post(`${this.mdacURL}loginsList`, req, this.utils.getPostHttpOptions())
                    .pipe(retry(this.utils.env.API_RETRY_COUNT))
                    .toPromise();
                  return result;
                }

                public userDetails(req): Promise<any> {
                  const result: any = this.httpClient
                    .post(`${this.mdacURL}userDetails`, req, this.utils.getPostHttpOptions())
                    .pipe(retry(this.utils.env.API_RETRY_COUNT))
                    .toPromise();
                  return result;
                }

                public passwordResetUpdate(req): Promise<any> {
                  const result: any = this.httpClient
                    .post(
                      `${this.mdacURL}passwordResetUpdate`,
                      req,
                      this.utils.getPostHttpOptions()
                    )
                    .pipe(retry(this.utils.env.API_RETRY_COUNT))
                    .toPromise();
                  return result;
                }
    //#endregion

    
}
