import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { McuMappingService } from 'src/app/mentorModule/services/mcu-mapping.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-gsws-person-update-details',
  templateUrl: './gsws-person-update-details.component.html',
  styleUrls: ['./gsws-person-update-details.component.css']
})
export class GswsPersonUpdateDetailsComponent implements OnInit {

  personDetails = {
    CITIZEN_NAME: '',
    GENDER: '',
    MOBILE_NUMBER: '',
    DOB: '',
    DOOR_NO: '',
    CLUSTER_NAME: '',
    GSWS_NAME: '',
    MANDAL_NAME: '',
    DISTRICT_NAME: '',
    FARMER_STATUS: '',
    UNIQUE_ID: '',
  };
  gswsDetails = {
    CITIZEN_NAME: '',
    GENDER: '',
    MOBILENUMBER: '',
    DATEOFBIRTH: '',
    DOORNO: '',
    CLUSTER_NAME: '',
    SACHIVALAYAM_NAME: '',
    MANDAL_NAME: '',
    DISTRICT_NAME: '',
  };

  uidNum = '';
  statusuidNum = '';
  uniqueId = '';

  isAmulDataAvailable = false;
  isGSWSDataAvailable = false;


  constructor(private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private utils: UtilsService,
    private sanitizer: DomSanitizer,
    private logger: LoggerService,
    private session: SessionService,
    private mcuAPI: McuMappingService) { }

  ngOnInit(): void {

    if(this.session.uniqueId !="" && this.session.desigId != ""){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
  }

  async btnUidDetails(): Promise<void> {
    try {
      this.personDetails = {
        CITIZEN_NAME: '',
        GENDER: '',
        MOBILE_NUMBER: '',
        DOB: '',
        DOOR_NO: '',
        CLUSTER_NAME: '',
        GSWS_NAME: '',
        MANDAL_NAME: '',
        DISTRICT_NAME: '',
        FARMER_STATUS: '',
        UNIQUE_ID: '',
      };

      this.gswsDetails = {
        CITIZEN_NAME: '',
        GENDER: '',
        MOBILENUMBER: '',
        DATEOFBIRTH: '',
        DOORNO: '',
        CLUSTER_NAME: '',
        SACHIVALAYAM_NAME: '',
        MANDAL_NAME: '',
        DISTRICT_NAME: '',
      };

      this.isAmulDataAvailable = false;
      this.isGSWSDataAvailable = false;
      if (this.utils.isEmpty(this.statusuidNum)) {    //this.uidNum
        this.toast.warning('Please Enter Aadhaar Number');
        return;
      }

      if (!this.utils.validateVerhoeff(this.statusuidNum)) {    //this.uidNum
        this.toast.warning('Please Enter Valid Aadhaar Number');
        return;
      }

      const req = {
        uidNum:this.statusuidNum,// this.uidNum,
      };
      this.spinner.show();
      const response = await this.mcuAPI.GSWSPersonDetailsByUid(req);
      this.spinner.hide();
      if (response.success) {
        this.personDetails = response.result[0];
        this.gswsDetails = response.gswsDetails;

        if (this.personDetails.FARMER_STATUS === '0') {
          this.isAmulDataAvailable = true;
        }
        this.isGSWSDataAvailable = true;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async btnUpdate(): Promise<void> {
    try {
      const req = {
        uniqueId: this.personDetails.UNIQUE_ID,
        updatedBy: this.session.uniqueId,
      };
      this.spinner.show();
      const response = await this.mcuAPI.gswsDetaisUpdate(req);
      this.spinner.hide();
      if (response.success) {
        alert(response.message);
        window.location.reload();
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  uidNummaskIputData(value) {
     
      if (value.length > 0) {
   
    //   if (this.uidNum.length > value.length) {
    //     this.uidNum = this.uidNum.substring(0, value.length);
    //   } 
    //   else {
    //     this.uidNum += String(value).slice(-1);        
    //     const valueSplit = value.split('');
    //     let maskedValue = '';
    //     valueSplit.forEach((element, index) => {
    //       if (index < 8) {
    //         maskedValue += "X";
    //       } else {
    //         maskedValue += element;
    //       }

    //     });
    //     this.statusuidNum = maskedValue;
    //   }
      if(value.length>=12){
       
        const response = this.utils.validateVerhoeff(value);    //this.uidNum
        if (response == true) {
          this.spinner.hide();
        } else {
          this.statusuidNum='';
                 alert("Invalid Aadhar Number...!");
          this.spinner.hide();
  
        }
        return
      }

    }  

    return;
    
  }


}
