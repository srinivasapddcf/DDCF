import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Injectable({
    providedIn: 'root',
})
export class TechnicianService {
    baseURL = '';
    issuesTrackingURL = '';
    TechnicianUrl = '';
    BMCUEquipUrl = '';
    bmcucrystalrpt = '';
    mccinspectionCtr = '';

    constructor(private httpClient: HttpClient, private utils: UtilsService) {
        this.baseURL = utils.baseUrl() + 'api/technician/';
        this.issuesTrackingURL = utils.baseUrl() + 'api/issuesTracking/';
        this.TechnicianUrl = utils.baseUrl() + 'api/TechnicianDetails/';
        this.BMCUEquipUrl = utils.baseUrl() + 'api/ReportsDashBoards/';
        this.bmcucrystalrpt = utils.crystalReportsUrl() + 'api/bmcuConstruction/';
        this.mccinspectionCtr = utils.baseUrl() + 'api/mccinspection/';
    }


    public mccinspectionDetails(req): Promise<any> {
        const result: any = this.httpClient
            .post(
                `${this.mccinspectionCtr}mccinspectionDetails`,
                req,
                this.utils.getPostHttpOptions()
            )
            .pipe(retry(this.utils.env.API_RETRY_COUNT))
            .toPromise();
        return result;
    }


    public mccinspectionSub(req): Promise<any> {
        const result: any = this.httpClient
            .post(
                `${this.mccinspectionCtr}mccinspectionSub`,
                req,
                this.utils.getPostHttpOptions()
            )
            .pipe(retry(this.utils.env.API_RETRY_COUNT))
            .toPromise();
        return result;
    }
    public routeListByUniqueId(req): Promise<any> {
        const result: any = this.httpClient
            .post(
                `${this.baseURL}routeListByUniqueId`,
                req,
                this.utils.getPostHttpOptions()
            )
            .pipe(retry(this.utils.env.API_RETRY_COUNT))
            .toPromise();
        return result;
    }

    public rbkListByUniqueId(req): Promise<any> {
        const result: any = this.httpClient
            .post(
                `${this.baseURL}rbkListByUniqueId`,
                req,
                this.utils.getPostHttpOptions()
            )
            .pipe(retry(this.utils.env.API_RETRY_COUNT))
            .toPromise();
        return result;
    }

    public villageListByRouteId(req): Promise<any> {
        const result: any = this.httpClient
            .post(
                `${this.baseURL}villageListByRouteId`,
                req,
                this.utils.getPostHttpOptions()
            )
            .pipe(retry(this.utils.env.API_RETRY_COUNT))
            .toPromise();
        return result;
    }

    public calibrationSub(req): Promise<any> {
        const result: any = this.httpClient
            .post(
                `${this.baseURL}calibrationSub`,
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

    public calibrationDevicesList(): Promise<any> {
        const result: any = this.httpClient
            .get(
                `${this.baseURL}calibrationDevicesList`,
                this.utils.getGetHttpOptions()
            )
            .pipe(retry(this.utils.env.API_RETRY_COUNT))
            .toPromise();
        return result;
    }

    public calibrationUpdate(req): Promise<any> {
        const result: any = this.httpClient
            .post(
                `${this.baseURL}calibrationUpdate`,
                req,
                this.utils.getPostHttpOptions()
            )
            .pipe(retry(this.utils.env.API_RETRY_COUNT))
            .toPromise();
        return result;
    }

    public calibrationCheck(req): Promise<any> {
        const result: any = this.httpClient
            .post(
                `${this.baseURL}calibrationCheck`,
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
                `${this.TechnicianUrl}TechnisianDetails_Select`,
                req,
                this.utils.getPostHttpOptions()
            )
            .pipe(retry(this.utils.env.API_RETRY_COUNT))
            .toPromise();
        return result;
    }
    public BMCUDeviceDetailsIns(req): Promise<any> {
        const result: any = this.httpClient
            .post(
                `${this.BMCUEquipUrl}BMCUDeviceDetailsIns`,
                req,
                this.utils.getPostHttpOptions()
            )
            .pipe(retry(this.utils.env.API_RETRY_COUNT))
            .toPromise();
        return result;
    }
    public BMCUDeviceDetailsUpd(req): Promise<any> {
        const result: any = this.httpClient
            .post(
                `${this.BMCUEquipUrl}DBBMCUDeviceDetailsUpd`,
                req,
                this.utils.getPostHttpOptions()
            )
            .pipe(retry(this.utils.env.API_RETRY_COUNT))
            .toPromise();
        return result;
    }
    public BMCUEquipmentStatusRpt(req): Promise<any> {
        const result: any = this.httpClient
            .post(
                `${this.bmcucrystalrpt}BMCUEquipmentStatusRpt`,
                req,
                this.utils.getPostHttpOptions()
            )
            .pipe(retry(this.utils.env.API_RETRY_COUNT))
            .toPromise();
        return result;
    }
}
