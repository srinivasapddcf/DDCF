import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { McuMappingService } from '../../../services/mcu-mapping.service';

@Component({
  selector: 'app-milk-pouring-certificate',
  templateUrl: './milk-pouring-certificate.component.html',
  styleUrls: ['./milk-pouring-certificate.component.css'],
})
export class MilkPouringCertificateComponent implements OnInit {
  farmerId = '';
  noDataMessage = '';
  personDetails = {
    FARMER_NAME: '',
    VILLAGE: '',
    MANDAL: '',
    FARMER_CODE: '',
    AMCU: '',
    RBK_NAME: '',
    FROM_DATE: '',
    TO_DATE: '',
    MILK_IN_LITRES: '',
    ROOT_INCHARGE: '',
    MENTOR_NAME: '',
    ROOT_NUM: '',
    STATUS: '',
    MSG: '',
    DISTRICT_CODE: '',
  };

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private milkCertiAPI: McuMappingService,
    private utils: UtilsService,
    private sanitizer: DomSanitizer,
    private logger: LoggerService,
    private session: SessionService
  ) {}

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
      this.noDataMessage = '';
      this.personDetails = {
        FARMER_NAME: '',
        VILLAGE: '',
        MANDAL: '',
        FARMER_CODE: '',
        AMCU: '',
        RBK_NAME: '',
        FROM_DATE: '',
        TO_DATE: '',
        MILK_IN_LITRES: '',
        ROOT_INCHARGE: '',
        MENTOR_NAME: '',
        ROOT_NUM: '',
        STATUS: '',
        MSG: '',
        DISTRICT_CODE: '',
      };

      if (this.utils.isEmpty(this.farmerId)) {
        this.toast.warning('Please Enter Farmer Code');
        return;
      }
      if (this.farmerId.length !== 8) {
        this.toast.warning('Please Enter Valid Farmer Code');
        return;
      }

      const req = {
        farmerId: this.farmerId,
        insertedBy: this.session.userName,
      };
      this.spinner.show();
      const response = await this.milkCertiAPI.getFarmerCertDetailsById(req);
      if (response.success) {
        this.personDetails = response.result[0];
      } else {
        this.noDataMessage = response.message;
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnRaiseRequest(): Promise<void> {
    try {
      if (this.utils.isEmpty(this.farmerId)) {
        this.toast.warning('Please Enter Farmer Code');
        return;
      }
      if (this.farmerId.length !== 8) {
        this.toast.warning('Please Enter Valid Farmer Code');
        return;
      }

      const req = {
        farmerId: this.farmerId,
        insertedBy: this.session.userName,
        districtId: this.personDetails.DISTRICT_CODE,
      };
      this.spinner.show();
      const response = await this.milkCertiAPI.farmerCertRequestSub(req);
      if (response.success) {
        alert(response.message);
        window.location.reload();
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
}
