import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    baseURL = '';

    constructor(private httpClient: HttpClient, private utils: UtilsService) {
        this.baseURL = utils.baseUrl() + 'api/login/';
    }

    public downloadMentorApp() {
        const result: any = this.httpClient
            .get(`${this.baseURL}downloadMentorApp`)
            .pipe(retry(this.utils.env.API_RETRY_COUNT))
            .toPromise();
        return result;
    }

    public getCaptcha() {
        debugger;
        const result: any = this.httpClient
            .get(`${this.baseURL}GetCaptcha`)
            //.get(`https://apiapddcf.ap.gov.in/jpv/api/login/GetCaptcha`)
            .pipe(retry(this.utils.env.API_RETRY_COUNT))
            .toPromise();
        return result;
    }

    public token(req) {
        const result: any = this.httpClient
            .post(`${this.baseURL}token`, req, this.utils.getPostHttpOptions())
            .pipe(retry(this.utils.env.API_RETRY_COUNT))
            .toPromise();
        return result;
    }

    public logout(req) {
        const result: any = this.httpClient
            .post(`${this.baseURL}logout`, req, this.utils.getPostHttpOptions())
            .pipe(retry(this.utils.env.API_RETRY_COUNT))
            .toPromise();
        return result;
    }

    public LandingImagelist() {
        const result: any = this.httpClient
            .get(`${this.baseURL}LandingImagelist`)
            .pipe(retry(1))
            .toPromise();
        return result;
    }

    public LandingImageSub(req) {
        const result: any = this.httpClient
            .post(`${this.baseURL}LandingImageSub`, req, this.utils.getPostHttpOptions())
            .pipe(retry(this.utils.env.API_RETRY_COUNT))
            .toPromise();
        return result;
    }

}
