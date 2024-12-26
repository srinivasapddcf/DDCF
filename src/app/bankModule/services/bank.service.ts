import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  baseURL = '';

  constructor(private httpClient: HttpClient, private utils: UtilsService) {
    this.baseURL = utils.baseUrl() + 'api/bankModule/';
  }

  public dashboardCounts(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}dashboardCounts`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public completedDashboardList(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}completedDashboardList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public pendingDashboardList(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}pendingDashboardList`,
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
        `${this.baseURL}personDetails`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public bankDetailsSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}bankDetailsSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public bankerDashboard(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}bankerDashboard`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public pendingLoanVerifyList(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}pendingLoanVerifyList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public pendingBankGroundingList(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}pendingBankGroundingList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public completedList(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}completedList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public bankStageOneSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}bankStageOneSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public bankStageTwoSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}bankStageTwoSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
}
