 

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  mdsscomm='';
  mdssURL = '';
  mdssdocURL='';
  dairycryappURL='';
  dairyesignappURL='';
  mdsscomm_CrystalRptChanges='';
  constructor(private httpClient: HttpClient, private utils: UtilsService) {
    this.mdssURL = utils.mdssUrl() + 'api/dlcoModule/';
    this.mdssdocURL = utils.mdssUrl() + 'api/meeting/';
    this.dairycryappURL = utils.crystalReportsUrl() + 'api/mdssmahilamilkproducers/';
    this.mdsscomm = utils.mdssUrl() + 'api/common/';
    this.dairyesignappURL = utils.crystalesignUrl() + 'api/mdssmahilamilkproducers/';
  }
  
  public rbkListDetails(req): Promise<any> {
     const result: any = this.httpClient
      .post(
        `${this.mdssURL}rbkListDetails`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public CommissionerGet(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}CommissionerGet`,
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
  public CommissionerSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}CommissionerSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }


  public Apcertregonlycomm(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.dairycryappURL}Apcertregonlycomm`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  
  
  public RegCertificate(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.dairycryappURL}RegCertificate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public Proceedingsonlycomm(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.dairycryappURL}Proceedingsonlycomm`,
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
        `${this.dairycryappURL}Proceedings`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  
  
public CommissionerfinalGetDetails(req): Promise<any> {
  const result: any = this.httpClient
    .post(
      `${this.mdssURL}CommissionerfinalGetDetails`,
      req,
      this.utils.getPostHttpOptions()
    )
    .pipe(retry(this.utils.env.API_RETRY_COUNT))
    .toPromise();
  return result;
}

//NAME CHANGE BYLAW
public BYELAWREGNO(req): Promise<any> {
  const result: any = this.httpClient
    .post(
      `${this.dairycryappURL}BYELAWREGNO`,
      req,
      this.utils.getPostHttpOptions()
    )
    .pipe(retry(this.utils.env.API_RETRY_COUNT))
    .toPromise();
  return result;
}
  public Bylawonlycomm(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.dairycryappURL}Bylawonlycomm`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public CommissionerpdfSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}CommissionerpdfSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public CommissionerpdfSub_NEW(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}CommissionerpdfSub_NEW`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  
  

  
  public BYE_LAW_REGISTARION(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}BYE_LAW_REGISTARION`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  
  public PROCEDDINGS_ADHOCK(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}PROCEDDINGS_ADHOCK`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  


  public PROCEDDINGS_ORDERS(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}PROCEDDINGS_ORDERS`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }


  public CommissionerFinalGet(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}CommissionerFinalGet`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public CommissionerFinalGetDetails(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}CommissionerFinalGetDetails`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  
  public CommissionerApprovalpdfsGet(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}CommissionerApprovalpdfsGet`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  
  public CommissionerApprovalpdfsRbkidGet(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.mdssURL}CommissionerApprovalpdfsRbkidGet`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public CommissionerLoadpdfsGet(req): Promise<any> {
    const result: any = this.httpClient
      .post(          
        `${this.mdssURL}CommissionerLoadpdfsGet`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

}
