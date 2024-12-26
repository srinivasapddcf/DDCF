import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { FarmerService } from '../../services/farmer.service';

@Component({
  selector: 'app-sso',
  templateUrl: './sso.component.html',
  styleUrls: ['./sso.component.css'],
})
export class SsoComponent implements OnInit {
  encryptedData = '';
  iv = '';
  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private farmerAPI: FarmerService,
    private utils: UtilsService,
    private logger: LoggerService,
    private session: SessionService,
    private route: ActivatedRoute
  ) {
    route.queryParams.subscribe((params) => (this.encryptedData = params['Id']));
    route.queryParams.subscribe((params) => (this.iv = params['IV']));
  }

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ""){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    this.login();
  }

  login():void {
    const req = {
      encryptedData: this.encryptedData,
      iv : this.iv
    };
    this.spinner.show();
    this.farmerAPI
      .farmerLogin(req)
      .then((res: any) => {
        this.spinner.hide();
        if (res.success) {

            sessionStorage.setItem('accessToken', res.access_token);
            sessionStorage.setItem('desigId', res.ROLE);
            sessionStorage.setItem('districtId', res.result[0].LGD_DIST_CODE);
            sessionStorage.setItem('districtName', res.result[0].DISTRICT_NAME);
            sessionStorage.setItem('mandalId', res.result[0].LGD_MANDAL_CODE);
            sessionStorage.setItem('mandalName', res.result[0].MANDAL_NAME);
            sessionStorage.setItem('rbkName', res.result[0].RBK_NAME);
            sessionStorage.setItem('rbkId', res.result[0].RBK_CODE);            
            sessionStorage.setItem('userName', res.result[0].USERNAME);            
            sessionStorage.setItem('lastLoginTime', res.result[0].LAST_LOGIN_TIME);
            sessionStorage.setItem('ruralUrbanFlag', res.result[0].RURAL_URBAN_FLAG);
            
          if (res.ROLE == '501') {
            this.router.navigate(['/farmer']);
          }else {
            alert('Invalid Route Request !!!');
            this.router.navigate(['/shared/UnAuthorized']);
          }
          
        } else {
          this.toast.info(res.message);
          sessionStorage.clear();
          this.router.navigate(['/shared/UnAuthorized']);
        }
      })
      .catch((error: any) => {
        this.spinner.hide();
        this.utils.catchResponse(error);
      });
  }
}
