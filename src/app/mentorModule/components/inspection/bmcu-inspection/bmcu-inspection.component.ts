import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { McuMappingService } from 'src/app/mentorModule/services/mcu-mapping.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-bmcu-inspection',
  templateUrl: './bmcu-inspection.component.html',
  styleUrls: ['./bmcu-inspection.component.css']
})
export class BmcuInspectionComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('inspectionImgUpload') inspectionImgUpload: ElementRef;

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();

  rbkList = [];
  villageList = [];
  inspectionStagesList = [];
  inspectionSubStagesList = [];
  buildingInspectionData = {
    districtId: '',
    mandalId: '',
    inspectionList: [],
    insertedBy: '',
    source: '',
  };

  inspectionDetails = {
    rbkId: '',
    villageId: '',
    buildingInspectId: '',
    buildingInspectInfoId: '',
    buildingInspectName: '',
    buildingInspectInfoName: '',
    isAvailable: '',
    buildingInspectImage: '',
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
      this.spinner.show();
      const res = await this.mcuAPI.rbkListByMentorId(req);
      this.spinner.hide();
      if (res.success) {
        this.rbkList = res.result;
      } else {
        this.toast.info(res.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onRbkChange(): Promise<void> {
    try {
      this.inspectionDetails.villageId = '';
      this.inspectionDetails.buildingInspectId = '';
      this.inspectionDetails.buildingInspectInfoId = '';
      this.inspectionDetails.isAvailable = '';
      this.inspectionDetails.buildingInspectImage = '';
      this.inspectionImgUpload.nativeElement.value = '';
      this.villageList = [];
      this.inspectionStagesList = [];
      this.inspectionSubStagesList = [];
      this.buildingInspectionData.inspectionList = [];
      if (this.utils.isEmpty(this.inspectionDetails.rbkId)) {
        return;
      }
      const req = {
        rbkId: this.inspectionDetails.rbkId,
      };
      this.spinner.show();
      const res = await this.mcuAPI.bmcuVillageListByRbkId(req);
      this.spinner.hide();
      if (res.success) {
        this.villageList = res.result;
      } else {
        this.toast.info(res.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onVillageChange(): Promise<void> {
    try {
      this.inspectionDetails.buildingInspectId = '';
      this.inspectionDetails.buildingInspectInfoId = '';
      this.inspectionDetails.isAvailable = '';
      this.inspectionDetails.buildingInspectImage = '';
      this.inspectionImgUpload.nativeElement.value = '';
      this.inspectionStagesList = [];
      this.inspectionSubStagesList = [];
      this.buildingInspectionData.inspectionList = [];
      if (this.utils.isEmpty(this.inspectionDetails.villageId)) {
        return;
      }
      this.spinner.show();
      const res = await this.mcuAPI.inspectionStagesList();
      this.spinner.hide();
      if (res.success) {
        this.inspectionStagesList = res.result;
      } else {
        this.toast.info(res.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onInspectStagesChange(): Promise<void> {
    try {
      this.inspectionDetails.buildingInspectInfoId = '';
      this.inspectionSubStagesList = [];
      if (this.utils.isEmpty(this.inspectionDetails.buildingInspectId)) {
        return;
      }
      const req = {
        rbkId: this.inspectionDetails.rbkId,
        villageId: this.inspectionDetails.villageId,
        buildingInspectId: this.inspectionDetails.buildingInspectId,
      };
      this.spinner.show();
      const res = await this.mcuAPI.inspectionSubStagesList(req);
      if (res.success) {
        this.inspectionSubStagesList = res.result;
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  // async onInspectSubStagesChange(): Promise<void> {
  //   try {
  //     if (
  //       this.utils.isEmpty(this.inspectionDetails.buildingInspectInfoId)
  //     ) {
  //       return;
  //     }
  //     for (let i = 0; i < this.inspectionSubStagesList.length; i++) {
  //       if (
  //         this.inspectionDetails.buildingInspectInfoId ===
  //         this.inspectionSubStagesList[i].BMCU_BUILD_INSPECT_INFO_ID
  //       ) {
  //         if (this.inspectionSubStagesList[i].STATUS === '1') {
  //           this.inspectionDetails.buildingInspectInfoId = '';
  //           this.toast.warning(
  //             'Inspection Details Already SUbmitted For Selected Sub Category !!!'
  //           );
  //           return;
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     this.spinner.hide();
  //     this.utils.catchResponse(error);
  //   }
  // }

  async btnAddRecord(): Promise<void> {
    try {
      if (this.validate()) {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.inspectionStagesList.length; i++) {
          if (
            this.inspectionDetails.buildingInspectId ===
            this.inspectionStagesList[i].BMCU_BUILD_INSPECT_ID
          ) {
            if (this.inspectionStagesList[i].STATUS === '1') {
              this.inspectionDetails.buildingInspectId = '';
              this.inspectionDetails.isAvailable = '';
              this.inspectionDetails.buildingInspectImage = '';
              this.inspectionImgUpload.nativeElement.value = '';
              this.toast.warning(
                'Inspection Details Already Submitted For Selected Category !!!'
              );
              return;
            } else {
              this.inspectionDetails.buildingInspectName = this.inspectionStagesList[
                i
              ].BMCU_BUILD_INSPECT_NAME;
            }
          }
        }

        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.inspectionSubStagesList.length; i++) {
          if (
            this.inspectionDetails.buildingInspectInfoId ===
            this.inspectionSubStagesList[i].BMCU_BUILD_INSPECT_INFO_ID
          ) {
            if (this.inspectionSubStagesList[i].STATUS === '1') {
              this.inspectionDetails.buildingInspectInfoId = '';
              this.inspectionDetails.isAvailable = '';
              this.inspectionDetails.buildingInspectImage = '';
              this.inspectionImgUpload.nativeElement.value = '';
              this.toast.warning(
                'Inspection Details Already Submitted For Selected Sub Category !!!'
              );
              return;
            } else {
              this.inspectionDetails.buildingInspectInfoName = this.inspectionSubStagesList[
                i
              ].BMCU_BUILD_INSPECT_INFO_NAME;
            }
          }
        }

        // tslint:disable-next-line: prefer-for-of
        for (
          let i = 0;
          i < this.buildingInspectionData.inspectionList.length;
          i++
        ) {
          if (
            this.inspectionDetails.buildingInspectInfoId ===
            this.buildingInspectionData.inspectionList[i].buildingInspectInfoId
          ) {
            this.toast.warning(
              'Inspection Details Already Added To Below Table For Selected Sub Category !!!'
            );
            this.inspectionDetails.isAvailable = '';
            this.inspectionDetails.buildingInspectImage = '';
            this.inspectionImgUpload.nativeElement.value = '';
            return;
          }
        }

        console.log(this.inspectionDetails);
        this.buildingInspectionData.inspectionList.push(this.inspectionDetails);
        this.rerender();
        this.clearInputs();
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  clearInputs(): void {
    this.inspectionDetails = {
      rbkId: this.inspectionDetails.rbkId,
      villageId: this.inspectionDetails.villageId,
      buildingInspectId:  this.inspectionDetails.buildingInspectId,
      buildingInspectInfoId: '',
      buildingInspectName: '',
      buildingInspectInfoName: '',
      isAvailable: '',
      buildingInspectImage: '',
    };
    this.inspectionDetails.buildingInspectInfoId = '';
    this.inspectionImgUpload.nativeElement.value = '';
  }

  btnViewPhoto(photo): void {
    this.utils.viewImage(photo);
  }

  async btnRemoveCategory(index): Promise<void> {
    try {
      if (this.buildingInspectionData.inspectionList.length > 0) {
        this.buildingInspectionData.inspectionList.splice(index, 1);
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async btnSubmit(): Promise<void> {
    try {
      if (this.buildingInspectionData.inspectionList.length < 0) {
        this.toast.warning('Please Enter Atleast One Record To Submit');
        return;
      }
      if (this.buildingInspectionData.inspectionList.length > 10) {
        this.toast.warning('Please Enter Maximum Of 10 Records To Submit');
        return;
      }
      this.buildingInspectionData.insertedBy = this.session.userName;
      this.buildingInspectionData.districtId = this.session.districtId;
      this.buildingInspectionData.mandalId = this.session.mandalId;
      this.buildingInspectionData.source = 'web';
      this.spinner.show();
      const res = await this.mcuAPI.bmcuBuildingInspectionSub(
        this.buildingInspectionData
      );
      if (res.success) {
        alert(res.message);
        window.location.reload();
      } else {
        this.toast.info(res.message);
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  validate(): boolean {
    if (this.utils.isEmpty(this.inspectionDetails.rbkId)) {
      this.toast.warning('Please Select RSK');
      return false;
    }

    if (this.utils.isEmpty(this.inspectionDetails.villageId)) {
      this.toast.warning('Please Select Village');
      return false;
    }
    if (this.utils.isEmpty(this.inspectionDetails.buildingInspectId)) {
      this.toast.warning('Please Select Inspection Stage');
      return false;
    }
    if (this.utils.isEmpty(this.inspectionDetails.buildingInspectInfoId)) {
      this.toast.warning('Please Select Inspection Sub Stage');
      return false;
    }
    if (this.utils.isEmpty(this.inspectionDetails.isAvailable)) {
      this.toast.warning('Please Select Is Available');
      return false;
    }
    if (this.inspectionDetails.isAvailable === '1') {
      if (this.utils.isEmpty(this.inspectionDetails.buildingInspectImage)) {
        this.toast.warning('Please Upload Image');
        return false;
      }
    }
    return true;
  }

  onInspectionImageChange(event): void {
    this.utils
      .encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.hundredKB
      )
      .then((res: any) => {
        this.inspectionDetails.buildingInspectImage = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      })
      .catch((error: any) => {
        this.utils.catchResponse(error);
      });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
}

