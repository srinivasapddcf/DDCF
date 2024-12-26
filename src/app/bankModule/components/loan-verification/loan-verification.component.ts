import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { MastersService } from 'src/app/shared/services/masters.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { BankService } from '../../services/bank.service';

@Component({
  selector: 'app-loan-verification',
  templateUrl: './loan-verification.component.html',
  styleUrls: ['./loan-verification.component.css'],
})
export class LoanVerificationComponent implements OnInit {
  maxDate: Date;
  input = '';
  personDetails: any;
  applicantData = {
    benId: '',
    actionTaken: '',
    loanSanctionDate: '',
    insertedBy: '',
    loanAmount: '',
    remarks: '',
  };

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private bankAPI: BankService,
    private utils: UtilsService,
    private logger: LoggerService,
    private session: SessionService,
    private master: MastersService,
    private route: ActivatedRoute
  ) {
    this.maxDate = this.session.getTodayDate();
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
    this.applicantData.benId = decString.benId;
    this.loadPersonDetails();
  }

  async loadPersonDetails(): Promise<void> {
    try {
      this.personDetails = '';
      const req = {
        benId: this.applicantData.benId,
      };
      this.spinner.show();
      const response = await this.bankAPI.personDetails(req);
      if (response.success) {
        this.personDetails = response.result[0];
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnSubmit(): Promise<void> {
    try {
      if (
        this.applicantData.actionTaken === '' ||
        this.applicantData.actionTaken === null ||
        this.applicantData.actionTaken === undefined
      ) {
        this.toast.warning('Please Select Bank Loan Sanctioned/Rejected');
        return;
      }
      if (this.applicantData.actionTaken === '1') {
        if (
          this.applicantData.loanSanctionDate === '' ||
          this.applicantData.loanSanctionDate === null ||
          this.applicantData.loanSanctionDate === undefined
        ) {
          this.toast.warning('Please Select Loan Sanction Date');
          return;
        }
        if (
          this.applicantData.loanAmount === '' ||
          this.applicantData.loanAmount === null ||
          this.applicantData.loanAmount === undefined
        ) {
          this.toast.warning('Please Select Loan Amount');
          return;
        }
      }
      if (this.applicantData.actionTaken === '2') {
        if (
          this.applicantData.remarks === '' ||
          this.applicantData.remarks === null ||
          this.applicantData.remarks === undefined
        ) {
          this.toast.warning('Please Select Loan Remarks');
          return;
        }
      }

      const req = {
        benId: this.applicantData.benId,
        actionTaken: this.applicantData.actionTaken,
        loanSanctionDate: this.applicantData.loanSanctionDate,
        loanAmount: this.applicantData.loanAmount,
        remarks: this.applicantData.remarks,
      };
      this.spinner.show();
      const response = await this.bankAPI.bankStageOneSub(req);
      if (response.success) {
        alert(response.message);
        this.router.navigate(['/bankModule/BankCheyuthaList']);
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
