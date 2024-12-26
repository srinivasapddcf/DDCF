import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class OfficeserviceService {

  dairyapp = '';
techurl='';
  constructor(private httpClient: HttpClient, private utils: UtilsService) {
    this.dairyapp = utils.baseUrl() + 'api/officeModule/';
    this.techurl = utils.baseUrl() + 'api/TechnicianDetails/';
  }


  public office_po_select(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.dairyapp}office_po_select`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }


  public TechnisianDistricts(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.techurl}TechnisianDistricts`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  
  
  public TechnisianDetails_Select(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.techurl}TechnisianDetails_Select`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

}
