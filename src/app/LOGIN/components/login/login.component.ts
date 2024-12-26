import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { LoginService } from '../../services/login.service';
import { interval, Subscription } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
    private captchaInterval: Subscription;

    username;
    password;
    tempLoginType = '3';
    loginType = '0';
    captchaEncoded: string;
    captchaChiper = '';
    captchaData = '';

    constructor(
        private spinner: NgxSpinnerService,
        private toast: ToasterService,
        private router: Router,
        private utils: UtilsService,
        private session: SessionService,
        private sanitizer: DomSanitizer,
        private loginAPI: LoginService
    ) { }

    ngOnInit(): void {
        this.refreshCaptcha();

        this.captchaInterval = interval(10 * 60 * 1000).subscribe(() => {
            //  this.refreshCaptcha();
        });
    }

    refreshCaptcha(): void {
        this.captchaEncoded = '';
        this.captchaChiper = '';
        this.captchaData = '';
        this.spinner.show();
        this.loginAPI
            .getCaptcha()
            .then((res: any) => {
                if (res.success) {
                    this.captchaData = '';
                    this.captchaChiper = res.captchaChiper;

                    this.captchaEncoded =
                        'data:image/jpg;base64,' +
                        (
                            this.sanitizer.bypassSecurityTrustResourceUrl(
                                res.captchaEncoded
                            ) as any
                        ).changingThisBreaksApplicationSecurity;
                } else {
                    this.toast.info(res.result);
                }
                this.spinner.hide();
            })
            .catch((error: any) => {
                this.spinner.hide();
                this.utils.catchResponse(error);
            });
    }

    loginTypeChange(): void {
        if (
            this.tempLoginType === '0' ||
            this.tempLoginType === '1' ||
            this.tempLoginType === '2' ||
            this.tempLoginType === '3' ||
            this.tempLoginType === '5' ||
            this.tempLoginType === '7' ||
            this.tempLoginType === '8' ||
            this.tempLoginType === '9' ||
            this.tempLoginType === '10' ||
            this.tempLoginType === '11' ||
            this.tempLoginType === '12' ||
            this.tempLoginType === '13' ||
            this.tempLoginType === '14'
        ) {
            this.loginType = '0';
        } else if (this.tempLoginType === '6') {
            this.loginType = '1';
        } else if (this.tempLoginType === '4') {
            this.loginType = '2';
        }
    }

    btnLogin(): void {
        debugger;
        window.sessionStorage.clear();
        if (
            this.loginType === '' ||
            this.loginType === undefined ||
            this.loginType === null
        ) {
            this.toast.warning('Please Select Login Type');
            return;
        }
        if (
            this.username === '' ||
            this.username === undefined ||
            this.username === null
        ) {
            this.toast.warning('Please Enter Username');
            return;
        }

        if (
            this.password === '' ||
            this.password === undefined ||
            this.password === null
        ) {
            this.toast.warning('Please Enter Password');
            return;
        }

        if (
            this.captchaData === '' ||
            this.captchaData === undefined ||
            this.captchaData === null
        ) {
            this.toast.warning('Please Enter Captcha');
            return;
        }
        const req = {
            userName: this.username,
            password: this.password,
            captchaChiper: this.captchaChiper,
            captchaData: this.captchaData,
            loginType: this.loginType,
        };
        this.refreshCaptcha();
        this.spinner.show();
        this.loginAPI
            .token(req)
            .then((res: any) => {
                this.spinner.hide();
                if (res.success) {
                    let cookival = this.utils.encrypt(res.result[0].MOBILE_NO + "^" + res.access_token + "^" + res.result[0].UNIQUE_ID);
                    //  if (this.loginType == '0') {
                    sessionStorage.setItem('appddcltoken', cookival ?? '');
                    sessionStorage.setItem('accessToken', res.access_token ?? '');
                    sessionStorage.setItem('desigId', res.ROLE ?? '');
                    // sessionStorage.setItem('userName', res.result[0].USERNAME ?? '');
                    sessionStorage.setItem(
                        'lastLoginTime',
                        res.result[0].LAST_LOGIN_TIME ?? ''
                    );
                    sessionStorage.setItem('desigName', res.result[0].DESIGNATION ?? '');
                    sessionStorage.setItem('mobileNumber', res.result[0].MOBILE_NO ?? '');
                    sessionStorage.setItem(
                        'rbkGroupId',
                        res.result[0].RBK_GROUP_ID ?? ''
                    );
                    // sessionStorage.setItem('districtId', res.result[0].DISTRICT_ID ?? '');
                    sessionStorage.setItem(
                        'districtName',
                        res.result[0].DISTRICT_NAME ?? ''
                    );
                    // sessionStorage.setItem('mandalId', res.result[0].MANDAL_ID ?? '');
                    sessionStorage.setItem('mandalName', res.result[0].MANDAL_NAME ?? '');
                    sessionStorage.setItem('uniqueId', res.result[0].UNIQUE_ID ?? '');
                    sessionStorage.setItem('passwordUpdate', res.result[0].IS_PASSWORD_UPD ?? '');

                    // For Secretary / Assistant Logins
                    sessionStorage.setItem('rbkName', res.result[0].RBK_NAME ?? '');
                    sessionStorage.setItem('rbkId', res.result[0].RBK_CODE ?? '');
                    sessionStorage.setItem(
                        'villageName',
                        res.result[0].VILLAGE_NAME ?? ''
                    );
                    sessionStorage.setItem('villageId', res.result[0].VILLAGE_ID ?? '');
                    sessionStorage.setItem('societyId', res.result[0].SOCIETY_CODE ?? '');
                    sessionStorage.setItem(
                        'societyName',
                        res.result[0].VILLAGE_NAME ?? ''
                    );

                    // Bank Login
                    sessionStorage.setItem(
                        'userName',
                        res.result[0].USERNAME ?? res.result[0].BRANCH ?? ''
                    );
                    sessionStorage.setItem('ifscCode', res.result[0].IFSC_CODE ?? '');
                    sessionStorage.setItem('bankName', res.result[0].BANK ?? '');

                    // DA Login
                    sessionStorage.setItem(
                        'districtId',
                        res.result[0].DISTRICT_ID ?? res.result[0].LGD_DIST_CODE ?? ''
                    );
                    sessionStorage.setItem(
                        'mandalId',
                        res.result[0].MANDAL_ID ?? res.result[0].LGD_MANDAL_CODE ?? ''
                    );

                    sessionStorage.setItem(
                        'ruralUrbanFlag',
                        res.result[0].RURAL_URBAN_FLAG ?? ''
                    );

                    sessionStorage.setItem(
                        'divisionId',
                        res.result[0].DIVISION_CODE ?? ''
                    );

                    // }
                    debugger;
                    this.session.setSession();

                    if (res.result[0].IS_PASSWORD_UPD === '0') {
                        this.utils.updatePassword(res.ROLE);
                    } else {
                        if (res.ROLE === '101') {
                            this.router.navigate(['/mentorModule']);
                        } else if (res.ROLE === '103') {
                            this.router.navigate(['/ahModule']);
                        } else if (res.ROLE === '201') {
                            this.router.navigate(['/districtModule']);
                        } else if (res.ROLE === '202') {
                            this.router.navigate(['/jcModule']);
                        } else if (res.ROLE === '203') {
                            this.router.navigate(['/dcModule']);
                        } else if (res.ROLE === '204') {
                            this.router.navigate(['/districtHOModule']);
                        }
                        else if (res.ROLE === '207') {
                            this.router.navigate(['/districtHOModule']);
                        } else if (res.ROLE === '206') {
                            this.router.navigate(['/collectorModule']);
                        } else if (res.ROLE === '401') {
                            this.router.navigate(['/bankModule']);
                        } else if (
                            res.ROLE === '501' ||
                            res.ROLE === '502' ||
                            res.ROLE === '503' ||
                            res.ROLE === '504'
                        ) {
                            this.router.navigate(['/farmer']);
                        } else if (res.ROLE === '601') {
                            debugger
                            this.router.navigate(['/technician']);
                        } else if (res.ROLE === '901' || res.ROLE === '902') {
                            this.router.navigate(['/SecAssModule']);
                        } else if (res.ROLE === '1001') {
                            this.router.navigate(['/dlcoModule']);
                        } else if (res.ROLE === '1002') {
                            this.router.navigate(['/dcoModule']);
                        } else if (res.ROLE === '1003') {
                            this.router.navigate(['/gmModule']);
                        } else if (res.ROLE === '1004') {
                            this.router.navigate(['/commissionerModule']);
                        } else if (res.ROLE === '301') {
                            this.router.navigate(['/officeModule']);
                        }

                        else {
                            alert('Invalid Route Request !!!');
                        }
                    }
                } else {
                    this.toast.info(res.message);
                    this.refreshCaptcha();
                }
            })
            .catch((error: any) => {
                // this.refreshCaptcha();
                this.utils.catchResponse(error);
                this.spinner.hide();
            });
    }

    ngOnDestroy(): void {
        this.captchaInterval.unsubscribe();
    }
}
