import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Injectable({
  providedIn: 'root',
})
export class CollectorService {
  inspectionURL = '';

  constructor(private httpClient: HttpClient, private utils: UtilsService) {
    this.inspectionURL = utils.baseUrl() + 'api/inspection/';
  }

  // Milk Inspection Module

  public farmerListBySocietyId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.inspectionURL}farmerListBySocietyId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public milkInspectionSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.inspectionURL}milkInspectionSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  // End Milk Inspection Module

  // Society Inspection Module

  public societyInspectionSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.inspectionURL}societyInspectionSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public equipmentList(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.inspectionURL}equipmentList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public reasonList(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.inspectionURL}reasonList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  // End Society Inspection Module

  // Payment Inspection Module

  public paymentInspectionSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.inspectionURL}paymentInspectionSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public paymentCycleList(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.inspectionURL}paymentCycleList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  // End Payment Inspection Module
}
