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
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css'],
})
export class PersonDetailsComponent implements OnInit {
  natureOfUnitList = [];
  natureOfUnit = '';
  showNatureOfUnitPopup = false;
  input = '';
  personDetails: any;
  applicantData = {
    benId: '',
    applicationHardCopyRecievedDateAtBank: '',
    actionTaken: '',
    remarks: '',
    insertedBy: '',
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

  loadPersonDetails(): void {
    this.personDetails = '';
    const req = {
      benId: this.applicantData.benId,
    };
    this.spinner.show();
    this.bankAPI
      .personDetails(req)
      .then((res: any) => {
        if (res.success) {
          this.personDetails = res.result[0];
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

  btnUpdateNOUPopUp(): void {
    this.natureOfUnit = '';
    this.showNatureOfUnitPopup = true;
  }

  btnUpdateNatureOfUnit(): void {
    if (
      this.natureOfUnit == '' ||
      this.natureOfUnit == null ||
      this.natureOfUnit == undefined
    ) {
      this.toast.warning('Please Select Nature Of Unit');
      return;
    }

    this.personDetails.NATURE_OF_UINT = this.natureOfUnit;
    this.showNatureOfUnitPopup = false;
  }

  btnSubmit(): void {
    if (
      this.applicantData.applicationHardCopyRecievedDateAtBank == '' ||
      this.applicantData.applicationHardCopyRecievedDateAtBank == null ||
      this.applicantData.applicationHardCopyRecievedDateAtBank == undefined
    ) {
      this.toast.warning(
        'Please Enter Application Hard Copy Recieved Date AT Branch'
      );
      return;
    }

    if (
      this.applicantData.actionTaken == '' ||
      this.applicantData.actionTaken == null ||
      this.applicantData.actionTaken == undefined
    ) {
      this.toast.warning('Please Select Action Taken');
      return;
    }

    if (
      this.applicantData.remarks == '' ||
      this.applicantData.remarks == null ||
      this.applicantData.remarks == undefined
    ) {
      this.toast.warning('Please Enter Remarks');
      return;
    }

    let count = 0;
    for (let i = 0; i < this.natureOfUnitList.length; i++) {
      if (this.natureOfUnitList[i].NAME === this.natureOfUnit) {
        count++;
        break;
      }
    }

    if (count < 1) {
      this.toast.warning('Invalid Nature Of Unit');
      return;
    }

    const req = {
      benId: this.applicantData.benId,
      actionTaken: this.applicantData.actionTaken,
      bankHardCopyRecievedDate: this.applicantData
        .applicationHardCopyRecievedDateAtBank,
      remarks: this.applicantData.remarks,
      natureOfUnit: this.personDetails.NATURE_OF_UINT,
    };
    this.spinner.show();
    this.bankAPI
      .bankDetailsSub(req)
      .then((res: any) => {
        if (res.success) {
          alert(res.message);
          this.router.navigate(['/bankModule/BranchManagerDashboard']);
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
