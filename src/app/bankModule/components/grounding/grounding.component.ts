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
  selector: 'app-grounding',
  templateUrl: './grounding.component.html',
  styleUrls: ['./grounding.component.css'],
})
export class GroundingComponent implements OnInit {
  maxDate: Date;
  input = '';
  personDetails: any;
  applicantData = {
    benId: '',
    groundingDate: '',
    documentationCompletionDate: '',
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
    route.queryParams.subscribe((params) => (this.input = params['request']));
    this.maxDate = this.session.getTodayDate();
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

  async btnSubmit(): Promise<void>{
    try{
      if (
        this.applicantData.groundingDate === '' ||
        this.applicantData.groundingDate === null ||
        this.applicantData.groundingDate === undefined
      ) {
        this.toast.warning('Please Select Grounding Date');
        return;
      }
      if (
        this.applicantData.documentationCompletionDate === '' ||
        this.applicantData.documentationCompletionDate === null ||
        this.applicantData.documentationCompletionDate === undefined
      ) {
        this.toast.warning('Please Select Documentation Completion Date');
        return;
      }

      const req = {
        benId: this.applicantData.benId,
        groundingDate: this.applicantData.groundingDate,
        documentationCompletionDate: this.applicantData
          .documentationCompletionDate,
      };
      this.spinner.show();
      const response = await this.bankAPI.bankStageTwoSub(req);
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
