import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class DcoService {

  mdssURL = '';jpvURL='';
  mdsscomm='';
  dairyesignappURL='';
  constructor(private httpClient: HttpClient, private utils: UtilsService) {
    this.mdssURL = utils.mdssUrl() + 'api/dlcoModule/';
    this.mdsscomm = utils.mdssUrl() + 'api/common/';
    this.dairyesignappURL = utils.crystalesignUrl() + 'api/mdssmahilamilkproducers/';

    this.jpvURL = utils. baseUrl + 'api/officeScheduleAttendance/';

  }

  public dcorbkListByDivisionId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}dcorbkListByDivisionId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public rbkListByDivisionId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}rbkListByDivisionId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public dcocheckListByRbkId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}dcocheckListByRbkId`,
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
        `${this.mdssURL}dlcoDocDetailsByRbkId`,
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


  

  public ScheduleAttendanceSelect(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.jpvURL}ScheduleAttendanceSelect`,
        req,
        this.utils.  getPostHttpOptionswithouttoken()   //getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

 


  public checkListByRbkId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}checkListByRbkId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public dcocheckListSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}dcocheckListSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public eSignDocumentsGet(req): Promise<any> {
    const result: any = this.httpClient
      .post(          
        `${this.mdsscomm}eSignDocumentsGet`,
        req,
        this.utils.getPostHttpOptions()
      )
      
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
      debugger;
    return result;
  }

  public eSignDocumentsInsert(req): Promise<any> {
    const result: any = this.httpClient
      .post(          
        `${this.mdsscomm}eSignDocumentsInsert`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public MDssDlcoandDCOandGMRPT(req): Promise<any> {
    const result: any = this.httpClient
      .post(          
        `${this.dairyesignappURL}MDssDlcoandDCOandGMRPT`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
}
