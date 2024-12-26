import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Injectable({
  providedIn: 'root',
})
export class SecAssService {
  baseURL = '';
  basecommonURL='';
  constructor(private httpClient: HttpClient, private utils: UtilsService) {
    this.baseURL = utils.baseUrl() + 'api/farmerModule/';
    this.basecommonURL = utils.baseUrl() + 'api/common/';
     
  }

  public societyWiseInspectionSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}societyWiseInspectionSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public societyListRbkId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}societyListRbkId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
}
