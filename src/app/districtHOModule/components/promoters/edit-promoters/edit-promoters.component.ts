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
import { DistrictHoService } from 'src/app/districtHOModule/services/district-ho.service';
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
    aadharNo: '',
    villageId: '',
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
    private promotersApi: DistrictHoService,
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
    this.loadMandalList();
  }

  async loadMandalList(): Promise<void> {
    try {
      const req = {
        districtId: this.session.districtId,
      };
      this.spinner.show();
      const response = await this.commonAPI.mandalListByDistrictId(req);
      this.spinner.hide();
      if (response.success) {
        this.mandalList = response.result;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onMandalChange(): Promise<void> {
    try {
      this.rbkList = [];
      this.rbkId = '';
      if (this.utils.isEmpty(this.mandalId)) {
        return;
      }
      const req = {
        districtId: this.session.districtId,
        mandalId: this.mandalId,
      };
      this.spinner.show();
      const response = await this.commonAPI.rbkListByMandalId(req);
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
        mandalId: this.mandalId,
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
      aadharNo: obj.AADHAR,
      villageId: obj.VILLAGE_ID,
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
        const response = await this.promotersApi.deletePromoterById(
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
