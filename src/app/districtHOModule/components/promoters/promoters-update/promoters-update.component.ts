import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DistrictHoService } from 'src/app/districtHOModule/services/district-ho.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-promoters-update',
  templateUrl: './promoters-update.component.html',
  styleUrls: ['./promoters-update.component.css'],
})
export class PromotersUpdateComponent implements OnInit {
  input = '';
  personDetails: any;

  constructor(
    private route: ActivatedRoute,
    private utils: UtilsService,
    private districtHOAPI: DistrictHoService,
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private session: SessionService
  ) {
    route.queryParams.subscribe((params) => (this.input = params['request']));
  }

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ""){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    const decString = JSON.parse(this.utils.decrypt(this.input));
    this.personDetails = decString;
  }

  async btnPromotersUpdate(status): Promise<void> {
    try {
      const req = {
        aadharNo: this.personDetails.AADHAR,
        actionTaken: status,
        insertedBy: this.session.userName,
        txnId: this.personDetails.TXN_ID,
      };
      this.spinner.show();
      const response = await this.districtHOAPI.deletePromoterByUid(req);
      this.spinner.hide();
      if (response.success) {
        alert(response.message);
        this.router.navigate(['/districtHOModule/PromotersDashboard']);
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
}
