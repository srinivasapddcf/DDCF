import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Injectable({
  providedIn: 'root',
})
export class JcService {
  baseURL = '';
  AMCUBMCUbaseURL='';
  crystalBaseURL = '';
  amcubmcucrystalBaseURL = '';

  constructor(private httpClient: HttpClient, private utils: UtilsService) {
    this.baseURL = utils.baseUrl() + 'api/jc/';
    this.AMCUBMCUbaseURL = utils.baseUrl() + 'api/amcubmcuPossessioncertificatealienation/';
    this.crystalBaseURL = utils.crystalReportsUrl() + 'api/landAllotment/';
    this.amcubmcucrystalBaseURL=utils.crystalReportsUrl() + 'api/amcubmcuPossessioncertificatealienation/';
  }

  

  public amcumandalrbkrvillagebyDistID(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}amcumandalrbkrvillagebyDistID`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public mandalListByDistId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}mandalListByDistId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public bmcuMandaRbkVillageByDistrictID(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}bmcuMandaRbkVillageByDistrictID`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  

  public rbkListByMandalId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}rbkListByMandalId`,
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

  public landAllocateSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}landAllocateSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  

  public bmcucentsSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}bmcucentsSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  
  public handOverStatus(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}handOverStatus`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public landAllocationStatus(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}landAllocationStatus`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  

  public amcuLandAllotment_Sub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}amcuLandAllotment_Sub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public amcuLandAllotment_select(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}amcuLandAllotment_select`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  
  public amculandAllocation_Status(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}amculandAllocation_Status`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  
  

  public amcuPossessioncertificatealienation_check(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.amcubmcucrystalBaseURL}amcuPossessioncertificatealienation_check`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }



  public AMCUBMCUHandOverSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.AMCUBMCUbaseURL}AMCUBMCUHandOverSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public landHandOverSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}landHandOverSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public possessionTakenDetails(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}possessionTakenDetails`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public possessionHandOverCertificate(req): Promise<any> {
    // tslint:disable-next-line: max-line-length
    const result: any = this.httpClient
      .post(
        `${this.crystalBaseURL}possessionHandOverCertificate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

   


//JD AMCU POSSESSION CERTIFICATION

public amcuPossessioncertificate(req): Promise<any> {
  // tslint:disable-next-line: max-line-length
  const result: any = this.httpClient
    .post(
      `${this.amcubmcucrystalBaseURL}amcuPossessioncertificate`,
      req,
      this.utils.getPostHttpOptions()
    )
    .pipe(retry(this.utils.env.API_RETRY_COUNT))
    .toPromise();
  return result;
}

public amcuPossessionUpdatedcertificate(req): Promise<any> {
  // tslint:disable-next-line: max-line-length
  const result: any = this.httpClient
    .post(
      `${this.amcubmcucrystalBaseURL}amcuPossessionUpdatedcertificate`,
      req,
      this.utils.getPostHttpOptions()
    )
    .pipe(retry(this.utils.env.API_RETRY_COUNT))
    .toPromise();
  return result;
}



public amcualienationUpdatedcertificate(req): Promise<any> {
  // tslint:disable-next-line: max-line-length
  const result: any = this.httpClient
    .post(
      `${this.amcubmcucrystalBaseURL}amcualienationUpdatedcertificate`,
      req,
      this.utils.getPostHttpOptions()
    )
    .pipe(retry(this.utils.env.API_RETRY_COUNT))
    .toPromise();
  return result;
}




public amcuBMCUPossessioncertificate(req): Promise<any> {
  // tslint:disable-next-line: max-line-length
  const result: any = this.httpClient
    .post(
      `${this.crystalBaseURL}amcuBMCUPossessioncertificate`,
      req,
      this.utils.getPostHttpOptions()
    )
    .pipe(retry(this.utils.env.API_RETRY_COUNT))
    .toPromise();
  return result;
}

public bmcuPossessioncertificate(req): Promise<any> {
  // tslint:disable-next-line: max-line-length
  const result: any = this.httpClient
    .post(
      `${this.crystalBaseURL}bmcuPossessioncertificate`,
      req,
      this.utils.getPostHttpOptions()
    )
    .pipe(retry(this.utils.env.API_RETRY_COUNT))
    .toPromise();
  return result;
}



public bmcuPossessionUpdatedcertificate(req): Promise<any> {
  // tslint:disable-next-line: max-line-length
  const result: any = this.httpClient
    .post(
      `${this.amcubmcucrystalBaseURL}bmcuPossessionUpdatedcertificate`,
      req,
      this.utils.getPostHttpOptions()
    )
    .pipe(retry(this.utils.env.API_RETRY_COUNT))
    .toPromise();
  return result;
}


public bmcualienationUpdatedcertificate(req): Promise<any> {
  // tslint:disable-next-line: max-line-length
  const result: any = this.httpClient
    .post(
      `${this.amcubmcucrystalBaseURL}bmcualienationUpdatedcertificate`,
      req,
      this.utils.getPostHttpOptions()
    )
    .pipe(retry(this.utils.env.API_RETRY_COUNT))
    .toPromise();
  return result;
}



public amcubmcupdfhandoverSub(req): Promise<any> {
  // tslint:disable-next-line: max-line-length
  const result: any = this.httpClient
    .post(
      `${this.baseURL}amcubmcupdfhandoverSub`,
      req,
      this.utils.getPostHttpOptions()
    )
    .pipe(retry(this.utils.env.API_RETRY_COUNT))
    .toPromise();
  return result;
}

public amcubmcuPossessioncertificatealienation_old(req): Promise<any> {
  // tslint:disable-next-line: max-line-length
  const result: any = this.httpClient
    .post(
      `${this.baseURL}amcubmcuPossessioncertificatealienation`,
      req,
      this.utils.getPostHttpOptions()
    )
    .pipe(retry(this.utils.env.API_RETRY_COUNT))
    .toPromise();
  return result;
}

  public landAllocationDetails(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}landAllocationDetails`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public landAllocateUpdate(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}landAllocateUpdate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public landHandOverDetailsUpdate(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}landHandOverDetailsUpdate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public landHandOverDetailsById(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}landHandOverDetailsById`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  // AMCU
  public amcuVillageListByRbkId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}amcuVillageListByRbkId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public amcuLandAllotmentSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}amcuLandAllotmentSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public amcuPossessionTakenDetails(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}amcuPossessionTakenDetails`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public amcuLandHandOverSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}amcuLandHandOverSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public amcuLandAllocationStatus(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}amcuLandAllocationStatus`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public amcuLandAllocation_Status(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}amcuLandAllocation_Status`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }


  public amcuPossessionCertificate(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.crystalBaseURL}amcuPossessionCertificate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public amcuMandalListByDistrictId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}amcuMandalListByDistrictId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public amcuRbkListByMandalId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}amcuRbkListByMandalId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public amcuMilkPouringVillagesList(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}amcuMilkPouringVillagesList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  // AMCU end

  // PACS

  public pacsMandalListByDistrictId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}pacsMandalListByDistrictId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public pacsRbkListByMandalId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}pacsRbkListByMandalId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public pacsvillageListByRbkId(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}pacsvillageListByRbkId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public pacsLandAllotmentSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}pacsLandAllotmentSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public pacsLandAllocationStatus(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}pacsLandAllocationStatus`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public pacsLandHandOverSub(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}pacsLandHandOverSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public pacsPossessionTakenDetails(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}pacsPossessionTakenDetails`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public pacsPossessionCertificate(req): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.crystalBaseURL}pacsPossessionCertificate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  // PACS end
}
