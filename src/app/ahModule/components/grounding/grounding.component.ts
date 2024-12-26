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
    animalHealthCardIssueDate: '',
    photoOfUnit: '',
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
        this.applicantData.animalHealthCardIssueDate === '' ||
        this.applicantData.animalHealthCardIssueDate === null ||
        this.applicantData.animalHealthCardIssueDate === undefined
      ) {
        this.toast.warning('Please Select Animal Health Card Issue Date');
        return;
      }

      if (
        this.applicantData.photoOfUnit === '' ||
        this.applicantData.photoOfUnit === null ||
        this.applicantData.photoOfUnit === undefined
      ) {
        this.toast.warning(
          'Please Upload Photo Of Unit With Latitude/Longitude'
        );
        return;
      }
      const req = {
        benId: this.applicantData.benId,
        animalHealthCardIssueDate: this.applicantData.animalHealthCardIssueDate,
        photoOfUnit: this.applicantData.photoOfUnit,
      };
      this.spinner.show();
      const response = await this.ahAPI.ahStagetwoSub(req);
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

  async onphotoOfUnitImgChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.applicantData.photoOfUnit = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }
}
