import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  registrationDetailsModel,
  registrationSubModel,
} from 'src/app/mentorModule/models/bmcu-building-construction.model';
import { McuMappingService } from 'src/app/mentorModule/services/mcu-mapping.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-registration-of-land',
  templateUrl: './registration-of-land.component.html',
  styleUrls: ['./registration-of-land.component.css'],
})
export class RegistrationOfLandComponent implements OnInit {
  @ViewChild('registrationLandPhotoUpload') registrationLandPhoto: ElementRef;
  @ViewChild('registrationCertificatePhotoUpload')
  registrationCertificatePhoto: ElementRef;
  @ViewChild('handingPhotoUpload') handingPhoto: ElementRef;

  rbkList = [];
  villageList = [];
  registrationCheck = false;
  registrationCheckDetails: registrationDetailsModel;

  registrationInput = false;
  registrationInputSub: registrationSubModel = {
    districtId: '',
    rbkId: '',
    villageId: '',
    workId: '',
    registrationOfLand: '',
    registrationOfLandImage: '',
    registrationCertificateImage: '',
    alienationHanding: '',
    alienationHandingImage: '',
    insertedBy: '',
    updatedBy: '',
    source: '',
  };
  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private mcuAPI: McuMappingService,
    private utils: UtilsService,
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
    this.loadRBKList();
  }
  async loadRBKList(): Promise<void> {
    try {
      const req = {
        uniqueId: this.session.rbkGroupId,
      };
      this.rbkList = [];
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
      this.clearInputs();
      this.registrationCheck = false;
      this.registrationInput = false;
      this.registrationInputSub.villageId = '';
      this.villageList = [];
      if (this.utils.isEmpty(this.registrationInputSub.rbkId)) {
        return;
      }
      const req = {
        districtId: this.session.districtId,
        rbkId: this.registrationInputSub.rbkId,
        uniqueId: this.session.rbkGroupId,
      };
      this.villageList = [];
      this.spinner.show();
      const response = await this.mcuAPI.bmcuVillageListByRbkId(req);
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
  async onVillageChange(): Promise<void> {
    try {
      this.clearInputs();
      this.registrationCheck = false;
      this.registrationInput = false;
      if (this.utils.isEmpty(this.registrationInputSub.villageId)) {
        return;
      }
      const req = {
        villageId: this.registrationInputSub.villageId,
      };
      this.spinner.show();
      const res = await this.mcuAPI.registrationOfLandCheck(req);
      this.spinner.hide();
      if (res.success) {
        this.registrationCheckDetails = res.result[0];
        this.registrationCheck = true;
      } else {
        this.registrationInput = true;
      }
      this.spinner.show();
      const workIdCheckResponse = await this.mcuAPI.bmcuWorkIdCheck(req);
      this.spinner.hide();
      if (workIdCheckResponse.success) {
        this.registrationInputSub.workId =
          workIdCheckResponse.result[0].WORK_ID;
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  clearInputs(): void {
    this.registrationInputSub = {
      districtId: this.registrationInputSub.districtId,
      rbkId: this.registrationInputSub.rbkId,
      villageId: this.registrationInputSub.villageId,
      workId: '',
      registrationOfLand: '',
      registrationOfLandImage: '',
      registrationCertificateImage: '',
      alienationHanding: '',
      alienationHandingImage: '',
      insertedBy: '',
      updatedBy: '',
      source: '',
    };
  }

  async registrationOfLandChange(): Promise<void> {
    try {
      if (this.registrationInputSub.registrationOfLand !== '1') {
        if (this.registrationLandPhoto) {
          if (this.registrationLandPhoto.nativeElement) {
            this.registrationInputSub.registrationOfLandImage = '';
            this.registrationLandPhoto.nativeElement.value = '';
          }
        }
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async alienationHandingChange(): Promise<void> {
    try {
      if (this.registrationInputSub.alienationHanding !== '1') {
        if (this.handingPhoto) {
          if (this.handingPhoto.nativeElement) {
            this.registrationInputSub.alienationHandingImage = '';
            this.handingPhoto.nativeElement.value = '';
          }
        }
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async btnViewImage(path): Promise<void> {
    try {
      if (!this.utils.isEmpty(path)) {
        this.spinner.show();
        const res = await this.utils.DMSFileDownload(path);
        this.spinner.hide();
        if (res.success) {
          this.utils.viewImage(res.result);
        } else {
          this.toast.info(res.message);
        }
      } else {
        this.toast.info('Photo Not Available...');
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async registrationOfLandImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.registrationInputSub.registrationOfLandImage = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async registrationCertificateImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.registrationInputSub.registrationCertificateImage = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async alienationHandingImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.registrationInputSub.alienationHandingImage = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async btnSubmit(): Promise<void> {
    try {
      if (this.validate()) {
        this.registrationInputSub.insertedBy = this.session.userName;
        this.registrationInputSub.districtId = this.session.districtId;
        this.registrationInputSub.source = 'web';
        this.spinner.show();
        const response = await this.mcuAPI.registrationOfLandSub(
          this.registrationInputSub
        );
        if (response.success) {
          alert(response.message);
          window.location.reload();
        } else {
          this.toast.info(response.message);
        }
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  validate(): boolean {
    if (this.utils.isEmpty(this.registrationInputSub.rbkId)) {
      this.toast.warning('Please Select RSK');
      return false;
    }
    if (this.utils.isEmpty(this.registrationInputSub.villageId)) {
      this.toast.warning('Please Select Village');
      return false;
    }
    if (this.utils.isEmpty(this.registrationInputSub.workId)) {
      this.toast.warning('Please Select WORK ID');
      return false;
    }
    if (this.utils.isEmpty(this.registrationInputSub.registrationOfLand)) {
      this.toast.warning('Please Select Registration Of The Land');
      return false;
    }

    if (
      this.utils.isEmpty(
        this.registrationInputSub.registrationOfLand === '1' &&
          this.registrationInputSub.registrationOfLandImage
      )
    ) {
      this.toast.warning('Please Upload Registration Of The Land Photo');
      return false;
    }

    if (this.utils.isEmpty(this.registrationInputSub.alienationHanding)) {
      this.toast.warning('Please Select Handing Over Done Or Not');
      return false;
    }
    if (
      this.utils.isEmpty(
        this.registrationInputSub.alienationHanding === '1' &&
          this.registrationInputSub.alienationHandingImage
      )
    ) {
      this.toast.warning('Please Upload The Handing Over Photo');
      return false;
    }
    if (
      this.utils.isEmpty(this.registrationInputSub.registrationCertificateImage)
    ) {
      this.toast.warning('Please Upload Registration Certificate Photo');
      return false;
    }

    return true;
  }
}
