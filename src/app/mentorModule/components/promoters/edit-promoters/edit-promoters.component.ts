import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { McuMappingService } from 'src/app/mentorModule/services/mcu-mapping.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-edit-promoters',
  templateUrl: './edit-promoters.component.html',
  styleUrls: ['./edit-promoters.component.css'],
})
export class EditPromotersComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  rbkList = [];
  mandalList = [];
  promotorsList = [];
  rbkId = '';
  mandalId = '';
  deleteReqSub = {
    rbkId: '',
    districtId: '',
    mandalId: '',
    mpussId: '',
    promId: '',
    routeId: '',
    villageId: '',
    promoterName: '',
    daughterOfOrWifeOf: '',
    fatherOrSpouseName: '',
    aadharNo: '',
    fatherSpouseAadhar: '',
    mobileNo: '',
    fatherSpouseMobileNo: '',
    educationQualification: '',
    bankAccountNo: '',
    ifscCode: '',
    bankName: '',
    branch: '',
    doorNo: '',
    street: '',
    pinCode: '',
    promotersId: '',
    insertedBy: '',
    source: '',
    mentorId: '',
    dateOfBirth: '',
    remarks: '',
  };
  remarksPopup = false;

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private promotersApi: McuMappingService,
    private utils: UtilsService,
    private session: SessionService,
    private commonAPI: CommonService
  ) {}

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ""){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    this.loadRbkList();
  }

  async loadRbkList(): Promise<void> {
    try {
      this.rbkList = [];
      this.rbkId = '';
      const req = {
        uniqueId: this.session.rbkGroupId,
      };
      this.spinner.show();
      const response = await this.promotersApi.rbkListByMentorId(req);
      this.spinner.hide();
      if (response.success) {
        this.rbkList = response.result;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onCheckPromoters(): Promise<void> {
    try {
      this.promotorsList = [];
      if (this.rbkId === '') {
        return;
      }
      const req = {
        rbkId: this.rbkId,
      };
      this.spinner.show();
      const response = await this.promotersApi.editPromotersListByRbkId(req);
      if (response.success) {
        this.promotorsList = response.result;
        this.rerender();
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnDelete(obj): Promise<void> {
    this.deleteReqSub = {
      rbkId: obj.RBKCODE,
      districtId: obj.DIST_CODE,
      mandalId: obj.MANDAL_CODE,
      mpussId: obj.MPUSS_ID,
      promId: obj.PROM_ID,
      routeId: obj.ROUTE_ID,
      villageId: obj.VILLAGE_ID,
      promoterName: obj.PROMOTERS_NAME,
      daughterOfOrWifeOf: obj.DO_OR_WO,
      fatherOrSpouseName: obj.FATHER_SPOUSE_NAME,
      aadharNo: obj.AADHAR,
      fatherSpouseAadhar: obj.FATHER_SPOUSE_AADHAR,
      mobileNo: obj.MOBILE,
      fatherSpouseMobileNo: obj.FATHER_SPOUSE_MOBILE,
      educationQualification: obj.EDUCATION_QUALIFICATION_ID,
      bankAccountNo: obj.BANK_ACCOUNT_NO,
      ifscCode: obj.IFSC_CODE,
      bankName: obj.BANK_NAME,
      branch: obj.BRANCH,
      doorNo: obj.ADDRESS_DNO,
      street: obj.STREET,
      pinCode: obj.PIN_CODE,
      promotersId: obj.PROMETERS_ID,
      insertedBy: this.session.userName,
      source: 'web',
      mentorId: this.session.rbkGroupId,
      dateOfBirth: obj.DOB,
      remarks: obj.REMARKS,
    };
    this.remarksPopup = true;
  }

  async btnSubmit(): Promise<void> {
    if (confirm('are you sure want to delete the promoter ?')) {
      if (this.utils.isEmpty(this.deleteReqSub.remarks)) {
        this.toast.warning('Please Enter Remarks');
        return;
      }
      try {
        this.spinner.show();
        const response = await this.promotersApi.editPromotersSub(
          this.deleteReqSub
        );
        if (response.success) {
          alert(response.message);
          window.location.reload();
        } else {
          this.spinner.hide();
          this.toast.info(response.message);
        }
      } catch (error) {
        this.spinner.hide();
        this.utils.catchResponse(error);
      }
    }
  }

  btnPromotersRequests(): void {
    this.router.navigate(['/mentorModule/EditPromotersRequests']);
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
