import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { FarmerService } from '../../services/farmer.service';

@Component({
  selector: 'app-invalid-bank-accounts-list',
  templateUrl: './invalid-bank-accounts-list.component.html',
  styleUrls: ['./invalid-bank-accounts-list.component.css'],
})
export class InvalidBankAccountsListComponent
  implements OnInit, OnDestroy, AfterViewInit {
  pendingList: any; 

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private farmerAPI: FarmerService,
    private utils: UtilsService,
    private sanitizer: DomSanitizer,
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
    this.loadPendingList();
  }

  async loadPendingList(): Promise<void> {
    try {
      const req = {
        rbkId: this.session.rbkId,
      };
      this.pendingList = [];
      this.spinner.show();
      const response = await this.farmerAPI.invalidBankPendingList(req);
      if (response.success) {
        this.pendingList = response.result;
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

  async btnPhotoView(photo): Promise<void> {
    try {
      this.spinner.show();
      const response = await this.utils.JPVReportsDMSFileDownload(photo);//DMSFileDownload
      if (response.success) {
        let passbookPhoto = (this.sanitizer.bypassSecurityTrustResourceUrl(
          response.result
        ) as any).changingThisBreaksApplicationSecurity; 
        this.utils.viewImage(passbookPhoto);
        //  this.toast.showImage(passbookPhoto);
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  btnVerify(uidNum): void {
    const encryptedString = this.utils.encrypt(JSON.stringify(uidNum));
    this.router.navigate(['/farmer/FarmerBankAccountUpdate'], {
      queryParams: { request: encryptedString },
    });
  }

  async btnActivateBankAccount(obj): Promise<void> {
    try {
      if (
        confirm(
          'Are you sure want to activate the bank account of ' +
            obj.FARMER_NAME +
            ' ?, Please confirm.'
        )
      ) {
        const req = {
          accountNo: obj.UID_NUM,
        };
        this.spinner.show();
        const response = await this.farmerAPI.regFarmerDetailsByUid(req);
        if (response.success) {
          if (
            response.result[0].PASSBOOK_IMG === null ||
            response.result[0].PASSBOOK_IMG === undefined ||
            response.result[0].PASSBOOK_IMG === ''
          ) {
            this.toast.info(
              'Please verify the Details, Bank Passbook Photo is not available !!! '
            );
            this.spinner.hide();
            return;
          }

          const reqUpdate = {
            uidNum: response.result[0].UID_NUM,
            ifscCode: response.result[0].IFSC_CODE,
            accountNo: response.result[0].ACCOUNT_NUMBER,
            bankName: response.result[0].BANK_NAME,
            branchName: response.result[0].BANK_BRANCH,
            micrNo: response.result[0].MICR_CODE,
            insertedBy: this.session.userName,
            source: 'web',
            bankPinCode: response.result[0].BANK_PINCODE,
            districtId: response.result[0].DIST_CODE,
            mandalId: response.result[0].MANDAL_CODE,
            rbkId: response.result[0].RBK_CODE,
            villageId: response.result[0].VILLAGE_CODE,
            passBookImg: response.result[0].PASSBOOK_IMG,
            imagePathFlag: '1',
          };
          this.spinner.show();
          const resp = await this.farmerAPI.activateBankAccUpdate(reqUpdate);
          if (resp.success) {
            alert(resp.message);
            window.location.reload();
          } else {
            this.spinner.hide();
            this.toast.info(response.message);
          }
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
