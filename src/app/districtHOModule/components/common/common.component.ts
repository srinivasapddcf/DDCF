import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/login/services/login.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UserManualsService } from 'src/app/shared/services/user-manuals.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css'],
})
export class CommonComponent implements OnInit {
  userName: string;
  lastLoginTime: string;
  guideLines: any[];
  userManuals: any[]; 
  usermentorManuals:any[];
  RADistrictho=false;RADistrictco=false;
  kccApplicationFormUrl = '';

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private session: SessionService,
    private utils: UtilsService,
    private loginAPI: LoginService,
    private userManual: UserManualsService
  ) {
    this.guideLines = this.userManual.guideLines;
    this.userManuals = this.userManual.districtHOModule;

    this.usermentorManuals = this.userManual.MentorModule;
    this.guideLines = this.userManual.guideLines;
    this.kccApplicationFormUrl = this.userManual.kccApplicationForm;
  }

  ngOnInit(): void {debugger;
    if(this.session.uniqueId !="" && this.session.desigId != ""){
      
      if(this.session.desigId==204)   this.RADistrictho=true;else this.RADistrictho=false;
      if(this.session.desigId!=204)   this.RADistrictco=true;else this.RADistrictco=false;
       
    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    this.userName = this.session.userName;
    this.lastLoginTime = this.session.lastLoginTime;

    if (this.session.passwordUpdate === '0') {
      this.utils.updatePassword(this.session.desigId);
    }
    alert(this.session.accessToken());
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

  btnForgetPassword(): void {
    this.utils.updatePassword(this.session.desigId);
  }

  btnDocumentDownload(url): void {
    if (this.utils.isEmpty(url)) {
      this.toast.warning('User Manual Not Found !!!');
    } else {
      window.open(url, '_blank');
    }
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

  btnDownloadUsermentorManual(id): void {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.usermentorManuals.length; i++) {
      if (id === this.usermentorManuals[i].ID) {
        window.open(this.usermentorManuals[i].URL, '_blank');
        return;
      }
    }
    this.toast.warning('User Manual Not Found !!!');
  }

}
