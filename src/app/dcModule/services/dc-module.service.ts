import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Injectable({
  providedIn: 'root',
})
export class DcModuleService {
  baseURL = '';
  issuesTrackingURL = '';

  constructor(private httpClient: HttpClient, private utils: UtilsService) {
    this.baseURL = utils.baseUrl() + 'api/dc/';
    this.issuesTrackingURL = utils.baseUrl() + 'api/issuesTracking/';
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

  public invalidBankAccountUpdate(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}invalidBankAccountUpdate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public loginsList(req): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.baseURL}loginsList`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public userDetails(req): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.baseURL}userDetails`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public passwordResetUpdate(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}passwordResetUpdate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public issuesListByDistrictId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.issuesTrackingURL}issuesListByDistrictId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public detailsByIssueId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.issuesTrackingURL}detailsByIssueId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public dashboard(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.issuesTrackingURL}dashboard`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public pendingListByRole(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.issuesTrackingURL}pendingListByRole`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public completedListByRole(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.issuesTrackingURL}completedListByRole`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public reOpenedListByRole(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.issuesTrackingURL}reOpenedListByRole`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public closeIssueByIssueId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.issuesTrackingURL}closeIssueByIssueId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public openIssueByIssueId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.issuesTrackingURL}openIssueByIssueId`,
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

  public villageMeetingPhotoUpload(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}villageMeetingPhotoUpload`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public villagemeetingPhotosList(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}villagemeetingPhotosList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
// below code venkatrao
  public deleteMeetingPhotoById(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}deleteMeetingPhotoById`,
        req,
        this.utils.getPostHttpOptions()
      )
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

  // above code venkatrao
}
