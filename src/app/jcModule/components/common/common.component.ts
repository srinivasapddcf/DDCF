import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/login/services/login.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UserManualsService } from 'src/app/shared/services/user-manuals.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { JcService } from '../../services/jc.service';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css'],
})
export class CommonComponent implements OnInit {
  districtId: string;
  userName: string;
  lastLoginTime: string;
  userManuals: any[];
  guideLines: any[];
  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private session: SessionService,
    private utils: UtilsService,
    private loginAPI: LoginService,
    private jcAPI: JcService,
    private userManual: UserManualsService
  ) {
    this.userManuals = this.userManual.jcModule;
    this.guideLines = this.userManual.guideLines;
  }

  ngOnInit(): void {
     
    document.getElementById('cops').style.display = "none";
    if(this.session.uniqueId !="" && this.session.desigId != ''){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    this.userName = this.session.userName;
    this.lastLoginTime = this.session.lastLoginTime;
    this.districtId = this.session.districtId;
    if (this.session.passwordUpdate === '0'){
      this.utils.updatePassword(this.session.desigId);
    }
  }
  btnLogout(): void {
    if (confirm('are you sure want to logout ?')) {
      const req = {
        userName: this.userName,
      };
      this.spinner.show();
      this.loginAPI
        .logout(req)
        .then((res: any) => {
          if (res.success) {
            alert(res.message);
            sessionStorage.clear();
            this.session.clearSession();
            this.router.navigate(['/']);
          } else {
            this.toast.info(res.message);
          }
          this.spinner.hide();
        })
        .catch((error: any) => {
          this.spinner.hide();
          this.utils.catchResponse(error);
        });
    }
  }

  btnLetterOne(): void {

    let url = 'https://apddcf.ap.gov.in/downloads/communication/letterOne/';
    let LetterName = '';
    if (this.districtId === '502') {
      LetterName = 'ANTPR';
    } else if (this.districtId === '503') {
      LetterName = 'CTR';
    } else if (this.districtId === '504') {
      LetterName = 'YSRKDPA';
    } else if (this.districtId === '505') {
      LetterName = 'EG';
    } else if (this.districtId === '506') {
      LetterName = 'GTR';
    } else if (this.districtId === '510') {
      LetterName = 'KRSNA';
    } else if (this.districtId === '511') {
      LetterName = 'KRNL';
    } else if (this.districtId === '515') {
      LetterName = 'SNLR';
    } else if (this.districtId === '517') {
      LetterName = 'PKSM';
    } else if (this.districtId === '519') {
      LetterName = 'SKLM';
    } else if (this.districtId === '520') {
      LetterName = 'VSKP';
    } else if (this.districtId === '521') {
      LetterName = 'VZM';
    } else if (this.districtId === '523') {
      LetterName = 'WG';
    }

    window.open(url + LetterName + '.jpeg', '_blank');

  }

  btnLetterTwo(): void {
    let url = 'https://apddcf.ap.gov.in/downloads/communication/letterTwo/';
    let LetterName = '';
    if (this.districtId === '502') {
      LetterName = 'ANTPR';
    } else if (this.districtId === '503') {
      LetterName = 'CTR';
    } else if (this.districtId === '504') {
      LetterName = 'YSRKDPA';
    } else if (this.districtId === '505') {
      LetterName = 'EG';
    } else if (this.districtId === '506') {
      LetterName = 'GTR';
    } else if (this.districtId === '510') {
      LetterName = 'KRSNA';
    } else if (this.districtId === '511') {
      LetterName = 'KRNL';
    } else if (this.districtId === '515') {
      LetterName = 'SNLR';
    } else if (this.districtId === '517') {
      LetterName = 'PKSM';
    } else if (this.districtId === '519') {
      LetterName = 'SKLM';
    } else if (this.districtId === '520') {
      LetterName = 'VSKP';
    } else if (this.districtId === '521') {
      LetterName = 'VZM';
    } else if (this.districtId === '523') {
      LetterName = 'WG';
    }

    window.open(url + LetterName + '.pdf', '_blank');
  }

  btnForgetPassword(): void {
    this.utils.updatePassword(this.session.desigId);
  }

  btnReports(): void {
     let url = this.utils.reportsSSOUrl() + this.session.accessToken; 
   //let url = this.utils.reportsSSOUrl();
    window.open(url, '_Blank');
  }

  btnDownloadUserManual(id): void {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.userManuals.length; i++) {
      if (id === this.userManuals[i].ID) {
        window.open(this.userManuals[i].URL, '_blank');
        return;
      }
    }
    this.toast.warning('User Manual Not Found !!!');
  }

  btnDocumentDownload(url): void {
    if (this.utils.isEmpty(url)) {
      this.toast.warning('User Manual Not Found !!!');
    } else {
      window.open(url, '_blank');
    }
  }

}
