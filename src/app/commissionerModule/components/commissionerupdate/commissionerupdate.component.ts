
import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { DcoService } from 'src/app/dcoModule/service/dco.service';
import { MdssService } from 'src/app/mdssModule/services/mdss.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-commissionerupdate',
  templateUrl: './commissionerupdate.component.html',
  styleUrls: ['./commissionerupdate.component.css']
})
export class CommissionerupdateComponent implements OnInit {

  dtTrigger: Subject<any> = new Subject();

  @ViewChildren(DataTableDirective)
  dtElements!: QueryList<DataTableDirective>;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger1: Subject<any> = new Subject();
  dtTrigger2: Subject<any> = new Subject();
  dlcoAPI: any;
  rbkapprovedList: any[];
  confirmationid:0;
  Typechange:any;
  RBKStatusDetails = [];
  RBKDDSelected:any;
  rbkList = [];
  constructor(private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private promotersAPI: MdssService,
    private utils: UtilsService,
    private logger: LoggerService,
    private session: SessionService,
    private commAPI: ServiceService,
    private dcoAPI: DcoService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.loadRBKList();
  }
  
  deletepopup=false;


  

  async loadRBKList(): Promise<void> {
    try {
      const req = {
        ptype: 12,//8 

      }; 
      this.spinner.show();
      const res = await this.commAPI.CommissionerfinalGetDetails(req);
      this.spinner.hide();
      this.rbkList = [];
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
      
      const req = {
        type:29,
        prbkCode:this.RBKDDSelected,
        pid:0,
        pdistCode: this.RBKDDSelected,
        pdivisionCode: this.session.divisionId,
      };

      this.spinner.show();
      const res = await this.dcoAPI.mdsschecklist(req);
      this.spinner.hide();
      this.RBKStatusDetails = [];
      if (res.success) {
        this.RBKStatusDetails = res.result;
        this.rerender();

      } else {
        this.toast.info(res.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async rbkstatusclick1(): Promise<void> {
    try {
      // const req = {
      //   type:29,
      //   prbkCode:this.RBKDDSelected,
      //   pid:0,
      //   pdistCode: this.RBKDDSelected,
      //   pdivisionCode: this.session.divisionId,
      // };
      // const res = await this.dcoAPI.mdsschecklist(req);
      // this.spinner.hide();
      // this.RBKStatusDetails = [];
      // if (res.success) {
      //   this.RBKStatusDetails = res.result;
      //   this.rerender();

      // } else {
      //   this.toast.info(res.message);
      // }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnrequest(id): Promise<void> { 
this.confirmationid=id;
this.deletepopup = false;
  }

  

  async btnclick(): Promise<void> {

   //  this.deletepopup = true;

    
    if(!this.RBKDDSelected){
      this.toast.warning('Please Select RSK');
      return;
    }

    if(!this.Typechange){
      this.toast.warning('Please Select Status');
      return;
    }

  //  if(this.confirmationid.toString() === '1'){
    const req = {
      type:30,
      prbkCode:this.RBKDDSelected,
      pid:this.Typechange,
      pdistCode: this.RBKDDSelected,
      pdivisionCode: this.session.divisionId,
    };
    const res = await this.dcoAPI.mdsschecklist(req);
    if (res.success) {      
      this.toast.info(res.message);
      this.rerender();
    }
    else {
      this.toast.info(res.message);    
  }
  //  }

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

  }



}
