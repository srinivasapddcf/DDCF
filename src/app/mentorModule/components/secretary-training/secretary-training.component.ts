import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { McuMappingService } from '../../services/mcu-mapping.service';

@Component({
  selector: 'app-secretary-training',
  templateUrl: './secretary-training.component.html',
  styleUrls: ['./secretary-training.component.css'],
})
export class SecretaryTrainingComponent implements OnInit {
  minDate: Date;
  rbkList = [];
  villageList = [];
  scheduleData = {
    districtId: '',
    mentorId: '',
    rbkId: '',
    villageId: '',
    trainingVenue: '',
    trainingDate: '',
    trainingTime: '',
    venueAddress: '',
    trainingAgenda: '',
    source: '',
    insertedBy: '',
  };

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private mcuAPI: McuMappingService,
    private utils: UtilsService,
    private logger: LoggerService,
    private session: SessionService
  ) {
    this.minDate = this.session.getTodayDate();
  }

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ""){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    this.loadRBKList();
  }

  async loadRBKList(): Promise<void> {
    try {
      const req = {
        uniqueId: this.session.rbkGroupId,
      };
      this.spinner.show();
      const response = await this.mcuAPI.rbkListByMentorId(req);
      if (response.success) {
        this.rbkList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onRbkChange(): Promise<void> {
    try {
      this.scheduleData.villageId = '';
      this.villageList = [];
      if (this.scheduleData.rbkId === '') {
        return;
      }

      const req = {
        districtId: this.session.districtId,
        rbkId: this.scheduleData.rbkId,
        uniqueId: this.session.rbkGroupId,
      };
      this.spinner.show();
      const response = await this.mcuAPI.villageListByRbkId(req);
      if (response.success) {
        this.villageList = response.result;
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
      if (this.validate()) {
        this.scheduleData.districtId = this.session.districtId;
        // this.scheduleData.mandalId = this.session.mandalId;
        this.scheduleData.mentorId = this.session.rbkGroupId;
        this.scheduleData.insertedBy = this.session.userName;
        this.scheduleData.source = 'web';
        this.spinner.show();
        const response = await this.mcuAPI.secretaryTrainingSub(
          this.scheduleData
        );
        if (response.success) {
          alert(response.message);
          window.location.reload();
        } else {
          this.spinner.hide();
          this.toast.info(response.message);
        }
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  validate(): boolean {
    if (
      this.scheduleData.rbkId === '' ||
      this.scheduleData.rbkId === null ||
      this.scheduleData.rbkId === undefined
    ) {
      this.toast.warning('Please Select RSK');
      return false;
    }

    if (
      this.scheduleData.villageId === '' ||
      this.scheduleData.villageId === null ||
      this.scheduleData.villageId === undefined
    ) {
      this.toast.warning('Please Select Village');
      return false;
    }

    if (
      this.scheduleData.trainingVenue === '' ||
      this.scheduleData.trainingVenue === null ||
      this.scheduleData.trainingVenue === undefined
    ) {
      this.toast.warning('Please Enter Training Venue');
      return false;
    }

    if (
      this.scheduleData.venueAddress === '' ||
      this.scheduleData.venueAddress === null ||
      this.scheduleData.venueAddress === undefined
    ) {
      this.toast.warning('Please Enter Training Venue Address');
      return false;
    }

    if (
      this.scheduleData.trainingDate === '' ||
      this.scheduleData.trainingDate === null ||
      this.scheduleData.trainingDate === undefined
    ) {
      this.toast.warning('Please Select Training Date');
      return false;
    }

    if (
      this.scheduleData.trainingTime === '' ||
      this.scheduleData.trainingTime === null ||
      this.scheduleData.trainingTime === undefined
    ) {
      this.toast.warning('Please Enter Training Time');
      return false;
    }

    if (
      this.scheduleData.trainingAgenda === '' ||
      this.scheduleData.trainingAgenda === null ||
      this.scheduleData.trainingAgenda === undefined
    ) {
      this.toast.warning('Please Enter Training Agenda');
      return false;
    }

    return true;
  }
}
