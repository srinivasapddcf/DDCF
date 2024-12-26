import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class DlcoService {

  mdssURL = '';
  mdssdocURL='';
  mdsscomm='';
  dairyesignappURL='';
  constructor(private httpClient: HttpClient, private utils: UtilsService) {
    this.mdssURL = utils.mdssUrl() + 'api/dlcoModule/';
    this.mdssdocURL = utils.mdssUrl() + 'api/meeting/';
    this.mdsscomm = utils.mdssUrl() + 'api/common/';
    this.dairyesignappURL = utils.crystalesignUrl() + 'api/mdssmahilamilkproducers/';
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

  public rollcheckListByRbkId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}rollcheckListByRbkId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public checkListSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}checkListSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public penrbkListByDivisionId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}penrbkListByDivisionId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public MSSReportGetDetails(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}MSSReportGetDetails`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public esigninsert(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `https://apiapddcf.ap.gov.in/digtalsign/api/mdssmahilamilkproducers/EsignEncriptedString`,
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

  public MDSSBankDetailsU(req): Promise<any> {
    const result: any = this.httpClient
      .post(          
        `${this.mdsscomm}MDSSBankDetailsU`,
        req,
        this.utils.getPostHttpOptions()
      )
      
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();      
    return result;
  }
  public MDSSBankDetailsVerify(req): Promise<any> {
    const result: any = this.httpClient
      .post(          
        `${this.mdsscomm}MDSSBankDetailsVerify`,
        req,
        this.utils.getPostHttpOptions()
      )
      
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();      
    return result;
  }
  
  

   


}
