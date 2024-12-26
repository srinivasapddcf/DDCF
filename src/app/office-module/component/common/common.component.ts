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
  styleUrls: ['./common.component.css']
})
export class CommonComponent implements OnInit {
  userName: string;
  lastLoginTime: string;
  guideLines: any[];
  mdssshowhide=false; admin=false;
  menu0=false;
  menu1=false;
  constructor( private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private session: SessionService,
    private utils: UtilsService,
    private loginAPI: LoginService,
    private userManual: UserManualsService) { }

  ngOnInit(): void {

     if( this.session.desigId==="301"  )  {
     if(this.session.uniqueId.toString()=="90001") 
          { this.menu0=true;this.menu1=false;}//Ravi and Kameshwri menu
          else 
          {this.menu1=true;this.menu0=false;}
     }
      else{
        this.router.navigate(['/shared/UnAuthorized']);
      }

    // if(this.session.uniqueId !="" && this.session.desigId != ""){

    //   //let subuniqid= this.session.uniqueId.toString().substr(0, 3);
    //   // if(this.session.desigId==="2")          
    //   //   this.mdssshowhide=true;           
    //   // else        
    //   //   this.mdssshowhide=false;   

    // }
    // else
    // {
    //   this.router.navigate(['/shared/UnAuthorized']);
    // }
    // this.userName = this.session.userName;
    // this.lastLoginTime = this.session.lastLoginTime;

    // if (this.session.passwordUpdate === '0') {
    //   this.utils.updatePassword(this.session.desigId);
    // }
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

}
