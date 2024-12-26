import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { MastersService } from 'src/app/shared/services/masters.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { AhService } from '../../services/ah.service';

@Component({
  selector: 'app-nature-of-unit-change',
  templateUrl: './nature-of-unit-change.component.html',
  styleUrls: ['./nature-of-unit-change.component.css'],
})
export class NatureOfUnitChangeComponent implements OnInit {
  maxDate: Date;

  natureOfUnitList = [];
  showNatureOfUnitPopup = false;
  input = '';
  personDetails: any;
  applicantData = {
    benId: '',
    natureOfUnit: '',
    willingBenficiary: '',
    financeType: '',
    submissionDate: '',
    insertedBy: '',
  };

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private ahAPI: AhService,
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
    this.natureOfUnitList = this.master.natureOfUnitList;
    this.loadPersonDetails();
  }

  async loadPersonDetails(): Promise<void> {
    try {
      this.personDetails = '';
      const req = {
        benId: this.applicantData.benId,
      };
      this.spinner.show();
      const response = await this.ahAPI.personDetails(req);
      if (response.success) {
        this.personDetails = response.result[0];
        this.applicantData.natureOfUnit = this.personDetails.NATURE_OF_UINT;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  btnUpdateNOUPopUp(): void {
    // this.applicantData.natureOfUnit = this.personDetails.NATURE_OF_UINT;
    this.showNatureOfUnitPopup = true;
  }

  btnUpdateNatureOfUnit(): void {
    if (
      this.applicantData.natureOfUnit === '' ||
      this.applicantData.natureOfUnit === null ||
      this.applicantData.natureOfUnit === undefined
    ) {
      this.toast.warning('Please Select Nature Of Unit');
      return;
    }

    this.personDetails.NATURE_OF_UINT = this.applicantData.natureOfUnit;
    this.showNatureOfUnitPopup = false;
  }

  async btnSubmit(): Promise<void> {
    try {
      if (
        this.applicantData.natureOfUnit === '' ||
        this.applicantData.natureOfUnit === null ||
        this.applicantData.natureOfUnit === undefined
      ) {
        this.toast.warning('Please Select Nature Of Unit');
        return;
      }

      if (
        this.applicantData.willingBenficiary === '' ||
        this.applicantData.willingBenficiary === null ||
        this.applicantData.willingBenficiary === undefined
      ) {
        this.toast.warning('Please Select willing status of benficiery');
        return;
      }

      if (
        this.applicantData.financeType === '' ||
        this.applicantData.financeType === null ||
        this.applicantData.financeType === undefined
      ) {
        this.toast.warning('Please Select Finance Type');
        return;
      }

      if (
        this.applicantData.submissionDate === '' ||
        this.applicantData.submissionDate === null ||
        this.applicantData.submissionDate === undefined
      ) {
        this.toast.warning('Please Select Submission Date');
        return;
      }

      // let count = 0;
      // for(let i=0; i< this.natureOfUnitList.length;i++){
      //   if(this.natureOfUnitList[i].NAME ==== this.natureOfUnit){
      //     count++;
      //     break;
      //   }
      // }

      // if(count < 1){
      //   this.toast.warning('Invalid Nature Of Unit');
      //   return;
      // }

      const req = {
        benId: this.applicantData.benId,
        submissionDate: this.applicantData.submissionDate,
        natureOfUnit: this.personDetails.NATURE_OF_UINT,
        willingBenficiary: this.applicantData.willingBenficiary,
        financeType: this.applicantData.financeType,
      };
      this.spinner.show();
      const response = await this.ahAPI.ahStageOneSub(req);
      if (response.success) {
        alert(response.message);
        this.router.navigate(['/ahModule/CheyuthaList']);
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
