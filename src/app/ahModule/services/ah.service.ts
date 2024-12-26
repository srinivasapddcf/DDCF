import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Injectable({
  providedIn: 'root',
})
export class AhService {
  baseURL = '';

  constructor(private httpClient: HttpClient, private utils: UtilsService) {
    this.baseURL = utils.baseUrl() + 'api/ahModule/';
  }

  public ahDashboard(req): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.baseURL}ahDashboard`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public ahPendingChangeNOUList(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}ahPendingChangeNOUList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public ahGroundingPendingList(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}ahGroundingPendingList`,
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

  public ahStageOneSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}ahStageOneSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public ahStagetwoSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}ahStagetwoSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
}
