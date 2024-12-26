import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  superStructureDetailsModel,
  superStructureSubModel,
} from 'src/app/mentorModule/models/bmcu-building-construction.model';
import { McuMappingService } from 'src/app/mentorModule/services/mcu-mapping.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-super-structure',
  templateUrl: './super-structure.component.html',
  styleUrls: ['./super-structure.component.css'],
})
export class SuperStructureComponent implements OnInit {
  @ViewChild('providingColumnPhotoUpload') providingColumnPhoto: ElementRef;
  @ViewChild('providingSlabPhotoUpload') providingSlabPhoto: ElementRef;
  @ViewChild('brickWallPhotoUpload') brickWallPhoto: ElementRef;

  rbkList = [];
  villageList = [];
  superStructureCheck = {
    providingColumn: false,
    providSlab: false,
    brickWall: false,
  };
  superStructureCheckDetails: superStructureDetailsModel;

  superStructureInput = {
    providingColumn: false,
    providSlab: false,
    brickWall: false,
  };

  superStructureInputSub: superStructureSubModel = {
    districtId: '',
    rbkId: '',
    villageId: '',
    workId: '',
    providingColumns: '',
    providingSlab: '',
    brickWorkForWalls: '',
    providingColumnsImage: '',
    providingSlabImage: '',
    brickWorkForWallsImage: '',
    insertedBy: '',
    updatedBy: '',
    submission: false,
    providingColumnsImagePathFlag: '',
    ProvidingSlabImagePathFlag: '',
    brickWorkForWallsImagePathFlag: '',
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
      this.clearsuperStructureDetails();
      this.clearInputs();
      this.superStructureInputSub.villageId = '';
      this.villageList = [];
      if (this.utils.isEmpty(this.superStructureInputSub.rbkId)) {
        return;
      }
      const req = {
        districtId: this.session.districtId,
        rbkId: this.superStructureInputSub.rbkId,
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
      this.clearsuperStructureDetails();
      this.clearInputs();
      if (this.utils.isEmpty(this.superStructureInputSub.villageId)) {
        return;
      }
      const req = {
        villageId: this.superStructureInputSub.villageId,
      };

      this.spinner.show();
      const res = await this.mcuAPI.superStructureCheck(req);
      this.spinner.hide();
      if (res.success) {
        this.superStructureCheckDetails = res.result[0];

        if (
          this.utils.isEmpty(this.superStructureCheckDetails.PROVIDING_COLUMNS)
        ) {
          this.superStructureInput.providingColumn = true;
          this.superStructureCheck.providingColumn = false;
        } else {
          this.superStructureInput.providingColumn = false;
          this.superStructureCheck.providingColumn = true;
        }

        if (
          this.utils.isEmpty(this.superStructureCheckDetails.PROVIDING_SLAB)
        ) {
          this.superStructureInput.providSlab = true;
          this.superStructureCheck.providSlab = false;
        } else {
          this.superStructureInput.providSlab = false;
          this.superStructureCheck.providSlab = true;
        }

        if (
          this.utils.isEmpty(
            this.superStructureCheckDetails.BRICK_WORK_FOR_WALLS
          )
        ) {
          this.superStructureInput.brickWall = true;
          this.superStructureCheck.brickWall = false;
        } else {
          this.superStructureInput.brickWall = false;
          this.superStructureCheck.brickWall = true;
        }
      } else {
        this.superStructureInput.providingColumn = true;
        this.superStructureInput.providSlab = true;
        this.superStructureInput.brickWall = true;
        this.superStructureCheck.providingColumn = false;
        this.superStructureCheck.providSlab = false;
        this.superStructureCheck.brickWall = false;
      }

      if (
        this.superStructureInput.providingColumn ||
        this.superStructureInput.providSlab ||
        this.superStructureInput.brickWall
      ) {
        this.superStructureInputSub.submission = true;
      } else {
        this.superStructureInputSub.submission = false;
      }

      this.spinner.show();
      const workIdCheckResponse = await this.mcuAPI.bmcuWorkIdCheck(req);
      this.spinner.hide();
      if (workIdCheckResponse.success) {
        this.superStructureInputSub.workId =
          workIdCheckResponse.result[0].WORK_ID;
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  clearsuperStructureDetails(): void {
    this.superStructureCheck = {
      providingColumn: false,
      providSlab: false,
      brickWall: false,
    };

    this.superStructureInput = {
      providingColumn: false,
      providSlab: false,
      brickWall: false,
    };
  }

  clearInputs(): void {
    this.superStructureInputSub = {
      districtId: this.superStructureInputSub.districtId,
      rbkId: this.superStructureInputSub.rbkId,
      villageId: this.superStructureInputSub.villageId,
      workId: '',
      providingColumns: '',
      providingSlab: '',
      brickWorkForWalls: '',
      providingColumnsImage: '',
      providingSlabImage: '',
      brickWorkForWallsImage: '',
      insertedBy: '',
      updatedBy: '',
      submission: false,
      providingColumnsImagePathFlag: '',
      ProvidingSlabImagePathFlag: '',
      brickWorkForWallsImagePathFlag: '',
      source: '',
    };
  }

  async providingColumnsChange(): Promise<void> {
    try {
      if (this.superStructureInputSub.providingColumns !== '1') {
        if (this.providingColumnPhoto) {
          if (this.providingColumnPhoto.nativeElement) {
            this.superStructureInputSub.providingColumnsImage = '';
            this.providingColumnPhoto.nativeElement.value = '';
          }
        }
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async providingSlabChange(): Promise<void> {
    try {
      if (this.superStructureInputSub.providingSlab !== '1') {
        if (this.providingSlabPhoto) {
          if (this.providingSlabPhoto.nativeElement) {
            this.superStructureInputSub.providingSlabImage = '';
            this.providingSlabPhoto.nativeElement.value = '';
          }
        }
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async brickWorkForWallsChange(): Promise<void> {
    try {
      if (this.superStructureInputSub.brickWorkForWalls !== '1') {
        if (this.brickWallPhoto) {
          if (this.brickWallPhoto.nativeElement) {
            this.superStructureInputSub.brickWorkForWallsImage = '';
            this.brickWallPhoto.nativeElement.value = '';
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

  async providingColumnsImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.superStructureInputSub.providingColumnsImage = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async providingSlabImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.superStructureInputSub.providingSlabImage = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async brickWorkForWallsImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      );
      if (res) {
        this.superStructureInputSub.brickWorkForWallsImage = res.replace(
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
        if (this.superStructureCheck.providingColumn) {
          this.superStructureInputSub.providingColumns =
            this.superStructureCheckDetails.PROVIDING_COLUMNS;
          this.superStructureInputSub.providingColumnsImage =
            this.superStructureCheckDetails.PROVIDING_COLUMNS_IMG;
          this.superStructureInputSub.providingColumnsImagePathFlag = '1';
        }

        if (this.superStructureCheck.providSlab) {
          this.superStructureInputSub.providingSlab =
            this.superStructureCheckDetails.PROVIDING_SLAB;
          this.superStructureInputSub.providingSlabImage =
            this.superStructureCheckDetails.PROVIDING_SLAB_IMG;
          this.superStructureInputSub.ProvidingSlabImagePathFlag = '1';
        }

        if (this.superStructureCheck.brickWall) {
          this.superStructureInputSub.brickWorkForWalls =
            this.superStructureCheckDetails.BRICK_WORK_FOR_WALLS;
          this.superStructureInputSub.brickWorkForWallsImage =
            this.superStructureCheckDetails.BRICK_WORK_FOR_WALLS_IMG;
          this.superStructureInputSub.brickWorkForWallsImagePathFlag = '1';
        }

        this.superStructureInputSub.source = 'web';
        this.spinner.show();
        let response: any;
        if (
          this.superStructureCheck.providingColumn ||
          this.superStructureCheck.providSlab ||
          this.superStructureCheck.brickWall
        ) {
          this.superStructureInputSub.updatedBy = this.session.userName;
          this.superStructureInputSub.districtId = this.session.districtId;
          response = await this.mcuAPI.superStructureUpdate(
            this.superStructureInputSub
          );
          console.log(this.superStructureInputSub);
        } else {
          this.superStructureInputSub.insertedBy = this.session.userName;
          this.superStructureInputSub.districtId = this.session.districtId;
          response = await this.mcuAPI.superStructureSub(
            this.superStructureInputSub
          );
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
    if (this.utils.isEmpty(this.superStructureInputSub.rbkId)) {
      this.toast.warning('Please Select RSK');
      return false;
    }
    if (this.utils.isEmpty(this.superStructureInputSub.villageId)) {
      this.toast.warning('Please Select Village');
      return false;
    }

    if (this.utils.isEmpty(this.superStructureInputSub.workId)) {
      this.toast.warning('Please Select WORK ID');
      return false;
    }

    if (this.superStructureInput.providSlab) {
      if (this.superStructureInputSub.providingColumns === '1') {
        if (
          this.utils.isEmpty(this.superStructureInputSub.providingColumnsImage)
        ) {
          this.toast.warning('Please Upload Providing Column Photo ');
          return false;
        }
      }
    }

    if (this.superStructureInput.providSlab) {
      if (this.superStructureInputSub.providingSlab === '1') {
        if (
          this.utils.isEmpty(this.superStructureInputSub.providingSlabImage)
        ) {
          this.toast.warning('Please Upload Providing Slab Photo ');
          return false;
        }
      }
    }

    if (this.superStructureInput.brickWall) {
      if (this.superStructureInputSub.brickWorkForWalls === '1') {
        if (
          this.utils.isEmpty(this.superStructureInputSub.brickWorkForWallsImage)
        ) {
          this.toast.warning('Please Upload Brick Walls Photo ');
          return false;
        }
      }
    }

    let validateCount: number = 0;
    if (this.superStructureInput.providingColumn) {
      if (!this.utils.isEmpty(this.superStructureInputSub.providingColumns)) {
        validateCount++;
      }
    }

    if (this.superStructureInput.providSlab) {
      if (!this.utils.isEmpty(this.superStructureInputSub.providingSlab)) {
        validateCount++;
      }
    }

    if (this.superStructureInput.brickWall) {
      if (!this.utils.isEmpty(this.superStructureInputSub.brickWorkForWalls)) {
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
