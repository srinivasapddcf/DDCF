import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Injectable({
  providedIn: 'root',
})
export class FarmerService { 
  baseURL = '';
  mentorURL = '';
  crystalURL = '';
  daedMigrationURL = '';

  constructor(private httpClient: HttpClient, private utils: UtilsService) {
    this.baseURL = utils.baseUrl() + 'api/farmerModule/';
    this.mentorURL = utils.baseUrl() + 'api/mcuMapping/';
    this.crystalURL = utils.crystalReportsUrl() + 'api/farmerModule/';
    this.daedMigrationURL = utils.baseUrl() + 'api/deadMigration/';
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

  public searchByIFSC(req): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.baseURL}searchByIFSC`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public farmerDetailsByUid(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}farmerDetailsByUid`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public farmerBankAllDetailsUpdate(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}farmerBankAllDetailsUpdate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public farmerSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.baseURL}farmerSub`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public farmerLogin(req): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.baseURL}farmerLogin`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public regFarmerDetailsByUid(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}regFarmerDetailsByUid`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public milkPouringStatusReport(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}milkPouringStatusReport`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public invalidBankPendingList(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}invalidBankPendingList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public farmerBankUpdate(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}farmerBankUpdate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public activateBankAccUpdate(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}activateBankAccUpdate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public farmerBankPassbookUpdate(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}farmerBankPassbookUpdate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public kisanCreditCardUpload(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}kisanCreditCardUpload`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  /* Dead People Approval Module */

  public deadMigratedPeopleApprovalList(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}deadMigratedPeopleApprovalList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public personDeadMigApprovalUpdate(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}personDeadMigApprovalUpdate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  /* End Dead People Approval Module */

  public migrationReturnList(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}migrationReturnList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public migrationReturnSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}migrationReturnSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public farmerMobileNoUpdate(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mentorURL}farmerMobileNoUpdate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  // feed indent module

  public farmerFeedIndentDetails(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}farmerFeedIndentDetails`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public feedIndentRequestSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}feedIndentRequestSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public feedIndentDaDashboard(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}feedIndentDaDashboard`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public indentDaPersonDetails(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}indentDaPersonDetails`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  // end feed indent module

  public farmerKCCDetails(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}farmerKCCDetails`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public kisanCreditCardSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}kisanCreditCardSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  // farmer details update

  public personDetailsByFarmerId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}personDetailsByFarmerId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public personDetailsByFarmerIdwithtype(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}personDetailsByFarmerIdwithtype`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  

  public farmerMobileUpdate(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}farmerMobileUpdate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public farmerBankDetailsUpdate(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}farmerBankDetailsUpdate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  
  public farmerBankDetailsUpdatePassbook(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}farmerBankDetailsUpdatePassbook`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }


  public farmerAnimalUpdate(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}farmerAnimalUpdate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public raiseRequestInvalidBankactByFarmerId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}raiseRequestInvalidBankactByFarmerId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  // farmerDetailsUpdate End

  // dead migration approvals

  public dashboardCounts(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.daedMigrationURL}dashboardCounts`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public personDetails(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.daedMigrationURL}personDetails`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public deadMigrationUpdate(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.daedMigrationURL}deadMigrationUpdate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  // dead migration approvals end
}
