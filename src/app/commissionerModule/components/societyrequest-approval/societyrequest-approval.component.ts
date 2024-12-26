import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';


import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-societyrequest-approval',
  templateUrl: './societyrequest-approval.component.html',
  styleUrls: ['./societyrequest-approval.component.css']
})
export class SocietyrequestApprovalComponent implements OnInit, OnDestroy, AfterViewInit {


  @ViewChildren(DataTableDirective)
  dtElements!: QueryList<DataTableDirective>;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();
  pendtTrigger: Subject<any> = new Subject();

  societyapprovalsList = [];
  source = [];
  updatedBy = '';
  count = 0;
  divSbmt: boolean = false;

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private utils: UtilsService,
    private session: SessionService,
    private commAPI: ServiceService,
    private router:Router
  ) { }

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ""){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    this.divSbmt = false;
    this.LoadData();
  }

  btnPdf(pdf): void {
    if (!this.utils.isEmpty(pdf)) {
      this.utils.viewPDF(pdf);
    } else {
      this.toast.warning('PDF is Not Available');
    }
  }

  //checkAllCheckBox(ev) { // Angular 9
  checkAllCheckBox(ev: any) { // Angular 13
    this.societyapprovalsList.forEach(x => x.checked = ev.target.checked)
    this.source = [];
    if (this.count % 2 == 0) {
      for (var i = 0; i < this.societyapprovalsList.length; i++) {
        this.source.push(this.societyapprovalsList[i]["RBK_CODE"]);
        this.divSbmt = true;
      }
    }
    else {
      this.divSbmt = false;
    }
    this.count++;
  }

  isAllCheckBoxChecked() {
    return this.societyapprovalsList.every(p => p.checked);
  }

  selectsingleCheck(x) {
    if (this.source.indexOf(x) == -1) {
      this.source.push(x);
    } else {
      this.source.splice(this.source.indexOf(x), 1);
    }
    if (this.source.length == 0) {
      this.divSbmt = false;
    }
    else {
      this.divSbmt = true;
    }
  }


  async LoadData(): Promise<void> {
    try {
      const req = {

      };

      this.spinner.show();
      const res = await this.commAPI.CommissionerGet(req);
      this.societyapprovalsList = [];
      if (res.success) {
        this.societyapprovalsList = res.result;

        console.log(this.societyapprovalsList);
        for (var i = 0; i < this.societyapprovalsList.length; i++) {
          if (
            !this.utils.isEmpty(res.result[i]["APPLICATION_PDF"])
          ) {
            this.societyapprovalsList[i]["APPLICATION_PDF"] = await this.getBaseFile(res.result[i]["APPLICATION_PDF"]);
          }
        }

        this.rerender();

      } else {
        this.toast.info(res.message);
      }
      
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async SubmitData(): Promise<void> {
    try {
      if (!this.source) {
        this.toast.info("Please select atleast one record to submit the data");
      }
      else {
        var constr = '';
        for (var i = 0; i < this.source.length; i++) {
          constr += this.source[i] + ",";
          if (i == this.source.length - 1) {
            constr = constr.substring(0, constr.length - 1);
          }
        }
        const req = {
          //rbkIds
          source: constr,
          updatedBy: this.session.userName
        };
        this.spinner.show();
        const res = await this.commAPI.CommissionerSub(req);
        this.spinner.hide();
        if (res.success) {
          alert("Data Inserted Successfully");
          window.location.reload();
        } else {
          this.toast.info(res.message);
        }
      }
    }

    catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


  async getBaseFile(path): Promise<string> {
    try {
      if (!this.utils.isEmpty(path)) {
        const response = await this.utils.MDSSFileDownload(path);
        if (response.success) {
          return response.result;
        }
      }
      return '';
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    this.pendtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
    this.pendtTrigger.next();
  }

  rerender(): void {
    this.dtElements.forEach((dtElement: DataTableDirective) => {
      if (dtElement.dtInstance) {
        dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      }
    });
    this.dtTrigger.next();
    this.pendtTrigger.next();
  }

}
