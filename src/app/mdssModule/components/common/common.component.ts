import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { info } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/login/services/login.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UserManualsService } from 'src/app/shared/services/user-manuals.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { MdssService } from '../../services/mdss.service';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css'],
})
export class CommonComponent implements OnInit {
  userName: string;
  lastLoginTime: string;
  userManuals: any[];
  guideLines: any[];
  kccApplicationFormUrl = '';

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private session: SessionService,
    private utils: UtilsService,
    private loginAPI: LoginService,
    private meetingAPI: MdssService,
    private toast: ToasterService,
    private userManual: UserManualsService
  ) {
    this.userManuals = this.userManual.MentorModule;
    this.guideLines = this.userManual.guideLines;
    this.kccApplicationFormUrl = this.userManual.kccApplicationForm;
  }

  ngOnInit(): void { 
    
    if(this.session.uniqueId !="" && this.session.desigId != ''){
      this.mdssauthenticationByUniqID();
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
  async mdssauthenticationByUniqID(): Promise<void> 
  {
    try {
       

      if(this.session.uniqueId !="")
      {
            let subuniqid= this.session.uniqueId.toString().substr(0, 3);
            if(subuniqid==="123")
            {
              if (confirm('Only RIC Can Register MDSS '))  
                this.router.navigate(['/mentorModule']); 
                else this.router.navigate(['/mentorModule']); 
            }
      } 
      
      // const req = {
      //   ptype:1,
      //   punique_id: this.session.uniqueId,
      //   pid:0,

      // };

       //   const response = await this.meetingAPI.mdssAuthenticationByUniqueId(req); 
      // if (response.success) 
      // {
      //       if(response.result ==="1") 
      //       { }
      //       else{ this.router.navigate(['/shared/UnAuthorized']);}
      //    }
      //     else {  this.router.navigate(['/shared/UnAuthorized']); }


    } catch (error) { this.router.navigate(['/shared/UnAuthorized']); }
  }

}
