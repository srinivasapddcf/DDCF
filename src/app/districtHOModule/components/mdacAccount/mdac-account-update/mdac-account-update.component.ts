import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DistrictHoService } from 'src/app/districtHOModule/services/district-ho.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-mdac-account-update',
  templateUrl: './mdac-account-update.component.html',
  styleUrls: ['./mdac-account-update.component.css'],
})
export class MdacAccountUpdateComponent implements OnInit {
  input = '';
  personDetails: any;
  passBookImg = '';

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
    if (
      this.personDetails.PASS_BOOK_IMG !== null &&
      this.personDetails.PASS_BOOK_IMG !== undefined &&
      this.personDetails.PASS_BOOK_IMG !== ''
    ) {
      this.loadBankImage(this.personDetails.PASS_BOOK_IMG);
    }
  }

  async loadBankImage(imagePath: any): Promise<void> {
    try {
      this.spinner.show();
      const response = await this.utils.DMSFileDownload(imagePath);
      this.spinner.hide();
      if (response.success) {
        this.passBookImg = (
          this.sanitizer.bypassSecurityTrustResourceUrl(response.result) as any
        ).changingThisBreaksApplicationSecurity;
      } else {
        this.spinner.hide();
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  btnImage(image): void {
    this.utils.viewImage(image);
  }

  async btnPdfView(pdf): Promise<void> {
    try {
      this.spinner.show();
      const res = await this.utils.DMSFileDownload(pdf);
      if (res.success) {
        this.utils.viewPDF(res.result);
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnMdacAccountUpdate(status): Promise<void> {
    try {
      const req = {
        promoter1Name: this.personDetails.PRAMOTOR1_NAME,
        promoter1Aadhar: this.personDetails.PRAMOTOR1_ADHAR,
        promoter1Mobile: this.personDetails.PRAMOTOR1_MOBILE,
        promoter2Name: this.personDetails.PRAMOTOR2_NAME,
        promoter2Aadhar: this.personDetails.PRAMOTOR2_ADHAR,
        promoter2Mobile: this.personDetails.PRAMOTOR2_MOBILE,
        ifscCode: this.personDetails.IFSCCODE,
        bankName: this.personDetails.BANK_NAME,
        branch: this.personDetails.BRANCH_NAME,
        passbookImage: this.personDetails.PASS_BOOK_IMG,
        bankAccountNo: this.personDetails.BANK_ACCOUNT_NO,
        pinCode: this.personDetails.PINCODE,
        actionTaken: status,
        insertedBy: this.session.userName,
        rbkId: this.personDetails.RBK_CODE,
        source: 'web',
        bankAccountName: this.personDetails.BANK_ACCOUNT_NAME,
        txnId: this.personDetails.TXN_ID
      };
      this.spinner.show();
      const response = await this.districtHOAPI.mdacAccountUpdation(req);
      this.spinner.hide();
      if (response.success) {
        alert(response.message);
        this.router.navigate(['/districtHOModule/MdacAccountDashboard']);
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
}
