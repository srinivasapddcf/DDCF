import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  basementDetailsModel,
  basementSubModel,
} from 'src/app/mentorModule/models/bmcu-building-construction.model';
import { McuMappingService } from 'src/app/mentorModule/services/mcu-mapping.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-basement-level',
  templateUrl: './basement-level.component.html',
  styleUrls: ['./basement-level.component.css'],
})
export class BasementLevelComponent implements OnInit {
  @ViewChild('markingPhotoUpload') markingPhoto: ElementRef;
  @ViewChild('foundationPhotoUpload') foundationPhoto: ElementRef;
  @ViewChild('beamPhotoUpload') beamPhoto: ElementRef;

  rbkList = [];
  villageList = [];
  basementCheck = {
    markingMDAC: false,
    foundationConcrete: false,
    plinthBeam: false,
  };
  basementCheckDetails: basementDetailsModel;

  basementInput = {
    markingMDAC: false,
    foundationConcrete: false,
    plinthBeam: false,
  };

  basementInputSub: basementSubModel = {
    districtId: '',
    rbkId: '',
    villageId: '',
    workId: '',
    markingMdacWomen: '',
    markingMdacWomenImage: '',
    foundationConcreteImage: '',
    foundationConcrete: '',
    plinthBeam: '',
    plinthBeamImage: '',
    insertedBy: '',
    updatedBy: '',
    submission: false,
    markingMdacWomenImagePathFlag: '',
    foundationConcretImagePathFlag: '',
    PlinthBeamImagePathFlag: '',
    source: ''
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
      this.clearBasementDetails();
      this.clearInputs();
      this.basementInputSub.villageId = '';
      this.villageList = [];
      if (this.utils.isEmpty(this.basementInputSub.rbkId)) {
        return;
      }
      const req = {
        districtId: this.session.districtId,
        rbkId: this.basementInputSub.rbkId,
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
      this.clearBasementDetails();
      this.clearInputs();
      if (this.utils.isEmpty(this.basementInputSub.villageId)) {
        return;
      }
      const req = {
        villageId: this.basementInputSub.villageId,
      };
      this.spinner.show();
      const res = await this.mcuAPI.basementLevelCheck(req);
      this.spinner.hide();
      if (res.success) {
        this.basementCheckDetails = res.result[0];

        if (this.utils.isEmpty(this.basementCheckDetails.MARKING_MDAC_WOMEN)) {
          this.basementInput.markingMDAC = true;
          this.basementCheck.markingMDAC = false;
        } else {
          this.basementInput.markingMDAC = false;
          this.basementCheck.markingMDAC = true;
        }

        if (this.utils.isEmpty(this.basementCheckDetails.FOUNDATION_CONCRET)) {
          this.basementInput.foundationConcrete = true;
          this.basementCheck.foundationConcrete = false;
        } else {
          this.basementInput.foundationConcrete = false;
          this.basementCheck.foundationConcrete = true;
        }

        if (this.utils.isEmpty(this.basementCheckDetails.PLINTH_BEAM)) {
          this.basementInput.plinthBeam = true;
          this.basementCheck.plinthBeam = false;
        } else {
          this.basementInput.plinthBeam = false;
          this.basementCheck.plinthBeam = true;
        }
      } else {
        this.basementInput.foundationConcrete = true;
        this.basementInput.markingMDAC = true;
        this.basementInput.plinthBeam = true;
        this.basementCheck.foundationConcrete = false;
        this.basementCheck.markingMDAC = false;
        this.basementCheck.plinthBeam = false;
      }

      if (
        this.basementInput.foundationConcrete ||
        this.basementInput.markingMDAC ||
        this.basementInput.plinthBeam
      ) {
        this.basementInputSub.submission = true;
      } else {
        this.basementInputSub.submission = false;
      }

      this.spinner.show();
      const workIdCheckResponse = await this.mcuAPI.bmcuWorkIdCheck(req);
      this.spinner.hide();
      if (workIdCheckResponse.success) {
        this.basementInputSub.workId = workIdCheckResponse.result[0].WORK_ID;
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  clearBasementDetails(): void {
    this.basementCheck = {
      markingMDAC: false,
      foundationConcrete: false,
      plinthBeam: false,
    };

    this.basementInput = {
      markingMDAC: false,
      foundationConcrete: false,
      plinthBeam: false,
    };
  }

  clearInputs(): void {
    this.basementInputSub = {
      districtId: this.basementInputSub.districtId,
      rbkId: this.basementInputSub.rbkId,
      villageId: this.basementInputSub.villageId,
      workId: '',
      markingMdacWomen: '',
      markingMdacWomenImage: '',
      foundationConcrete: '',
      foundationConcreteImage: '',
      plinthBeam: '',
      plinthBeamImage: '',
      insertedBy: '',
      updatedBy: '',
      submission: false,
      markingMdacWomenImagePathFlag: '',
      foundationConcretImagePathFlag: '',
      PlinthBeamImagePathFlag: '',
      source: ''
    };
  }

  async markingMdacWomenChange(): Promise<void> {
    try {
      if (this.basementInputSub.markingMdacWomen !== '1') {
        if (this.markingPhoto) {
          if (this.markingPhoto.nativeElement) {
            this.basementInputSub.markingMdacWomenImage = '';
            this.markingPhoto.nativeElement.value = '';
          }
        }
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async foundationConcretChange(): Promise<void> {
    try {
      if (this.basementInputSub.foundationConcrete !== '1') {
        if (this.foundationPhoto) {
          if (this.foundationPhoto.nativeElement) {
            this.basementInputSub.foundationConcreteImage = '';
            this.foundationPhoto.nativeElement.value = '';
          }
        }
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async plinthBeamChange(): Promise<void> {
    try {
      if (this.basementInputSub.plinthBeam !== '1') {
        if (this.beamPhoto) {
          if (this.beamPhoto.nativeElement) {
            this.basementInputSub.plinthBeamImage = '';
            this.beamPhoto.nativeElement.value = '';
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

  async markingMdacWomenImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.basementInputSub.markingMdacWomenImage = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async foundationConcreteImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.basementInputSub.foundationConcreteImage = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async plinthBeamImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.basementInputSub.plinthBeamImage = res.replace(
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
        if (this.basementCheck.markingMDAC) {
          this.basementInputSub.markingMdacWomen = this.basementCheckDetails.MARKING_MDAC_WOMEN;
          this.basementInputSub.markingMdacWomenImage = this.basementCheckDetails.MARKING_MDAC_WOMEN_IMG;
          this.basementInputSub.markingMdacWomenImagePathFlag = '1';
        }

        if (this.basementCheck.foundationConcrete) {
          this.basementInputSub.foundationConcrete = this.basementCheckDetails.FOUNDATION_CONCRET;
          this.basementInputSub.foundationConcreteImage = this.basementCheckDetails.FOUNDATION_CONCRET_IMG;
          this.basementInputSub.foundationConcretImagePathFlag = '1';
        }

        if (this.basementCheck.plinthBeam) {
          this.basementInputSub.plinthBeam = this.basementCheckDetails.PLINTH_BEAM;
          this.basementInputSub.plinthBeamImage = this.basementCheckDetails.PLINTH_BEAM_IMG;
          this.basementInputSub.PlinthBeamImagePathFlag = '1';
        }
        this.basementInputSub.source = 'web';
        this.spinner.show();
        let response: any;
        if (
          this.basementCheck.markingMDAC ||
          this.basementCheck.foundationConcrete ||
          this.basementCheck.plinthBeam
        ) {
          this.basementInputSub.updatedBy = this.session.userName;
          this.basementInputSub.districtId = this.session.districtId;
          response = await this.mcuAPI.basementLevelUpdate(
            this.basementInputSub
          );
        } else {
          this.basementInputSub.insertedBy = this.session.userName;
          this.basementInputSub.districtId = this.session.districtId;
          response = await this.mcuAPI.basementLevelSub(this.basementInputSub);
        }

        this.spinner.hide();
        if (response.success) {
          alert(response.message);
          window.location.reload();
        } else {
          this.toast.info(response.message);
        }
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  validate(): boolean {
    if (this.utils.isEmpty(this.basementInputSub.rbkId)) {
      this.toast.warning('Please Select RSK');
      return false;
    }
    if (this.utils.isEmpty(this.basementInputSub.villageId)) {
      this.toast.warning('Please Select Village');
      return false;
    }
    if (this.utils.isEmpty(this.basementInputSub.workId)) {
      this.toast.warning('Please Select WORK ID');
      return false;
    }

    if (this.basementInput.markingMDAC) {
      if (this.basementInputSub.markingMdacWomen === '1') {
        if (this.utils.isEmpty(this.basementInputSub.markingMdacWomenImage)) {
          this.toast.warning('Please Upload Marking Photo ');
          return false;
        }
      }
    }

    if (this.basementInput.foundationConcrete) {
      if (this.basementInputSub.foundationConcrete === '1') {
        if (this.utils.isEmpty(this.basementInputSub.foundationConcreteImage)) {
          this.toast.warning('Please Upload Foundation Concrete Photo ');
          return false;
        }
      }
    }

    if (this.basementInput.plinthBeam) {
      if (this.basementInputSub.plinthBeam === '1') {
        if (this.utils.isEmpty(this.basementInputSub.plinthBeamImage)) {
          this.toast.warning('Please Upload Plinth Beam Photo ');
          return false;
        }
      }
    }

    let validateCount: number = 0;
    if (this.basementInput.markingMDAC) {
      if (!this.utils.isEmpty(this.basementInputSub.markingMdacWomen)) {
        validateCount++;
      }
    }

    if (this.basementInput.foundationConcrete) {
      if (!this.utils.isEmpty(this.basementInputSub.foundationConcrete)) {
        validateCount++;
      }
    }

    if (this.basementInput.plinthBeam) {
      if (!this.utils.isEmpty(this.basementInputSub.plinthBeam)) {
        validateCount++;
      }
    }

    if (validateCount < 1) {
      this.toast.warning('Please select atleast one question !!! ');
      return false;
    }

    return true;
  }
}
