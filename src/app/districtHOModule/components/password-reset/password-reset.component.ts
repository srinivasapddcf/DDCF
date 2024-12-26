

import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { promise } from 'selenium-webdriver';
import { DcModuleService } from 'src/app/dcModule/services/dc-module.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { DistrictHoService } from '../../services/district-ho.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {


  loginList = [];
  userDetails = '';

  userName  = '';
  districtId = '';
  role = '';

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private districtHOAPI: DistrictHoService,
    private utils: UtilsService,
    private sanitizer: DomSanitizer,
    private logger: LoggerService,
    private session: SessionService) { }

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ""){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    this.districtId = this.session.districtId;
    this.loadLogins();

  }

  async loadLogins(): Promise<void>{
    try{
      this.loginList = [];
      const req = {
        districtId: this.districtId
      };
      this.spinner.show();
      const response = await this.districtHOAPI.loginsList(req);
      if (response.success) {
        this.loginList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnUserDetails(): Promise<void>{
    try{
      this.userDetails = '';

      if (this.role === '' || this.role === undefined || this.role === null){
        this.toast.warning('Please Select Login Type');
        return;
      }
      if (this.userName === '' || this.userName === undefined || this.userName === null){
        this.toast.warning('Please Enter Username');
        return;
      }
      const req = {
        districtId: this.districtId,
        role : this.role,
        userName : this.userName
      };
      this.spinner.show();
      const response = await this.districtHOAPI.userDetails(req);
      if (response.success) {
        this.userDetails = response.result[0];
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnResetPassword(): Promise<void>{
    try{
      if (confirm('Are you sure want to Reset Password ?')){
        const req = {
          districtId: this.districtId,
          role : this.role,
          userName : this.userName
        };
        this.spinner.show();
        const response = await this.districtHOAPI.passwordResetUpdate(req);
        if (response.success) {
          alert(response.message);
          window.location.reload();
        } else {
          this.toast.info(response.message);
        }
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

}
