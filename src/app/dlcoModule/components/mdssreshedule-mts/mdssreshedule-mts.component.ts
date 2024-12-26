import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { DlcoService } from '../../services/dlco.service';

@Component({
  selector: 'app-mdssreshedule-mts',
  templateUrl: './mdssreshedule-mts.component.html',
  styleUrls: ['./mdssreshedule-mts.component.css']
})
export class MDSSResheduleMTSComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private utils: UtilsService,
    private logger: LoggerService,
    private dlcoAPI: DlcoService,
    private session: SessionService,
  
    private router: Router) { }

    rbkdetailslist=[];
    rbkdetailslistReshedule=[];
    RbkDetails=false;
     
    resheduleData = {
      districtId: '',
      mandalId: '',
      rbkId: '',
      applicationPdfForm: '',
      insertedBy: '',
      source: '',
    };
  
     

  ngOnInit(): void {
this.RBKDetailsload();
  }

  async RBKDetailsload():Promise<void>{
    this.spinner.show();
     
      const req = { TYPE:"8",DIST:this.session.districtId,ROUTE:this.session.userName   };
     
    const res = await this.dlcoAPI.MSSReportGetDetails(req);
     
      if (res.success) {
              this.rbkdetailslist=res.result;
        
        this.spinner.hide();
        
      } else {
        this.toast.info(res.message);
        this.spinner.hide();
      }
      this.spinner.hide();
        

    }

    async RBKChange():Promise<void>{
      this.spinner.show();
       
        const req = { TYPE:"9",DIST:this.session.districtId,ROUTE:this.session.userName,RBK:this.resheduleData.rbkId   };
       
      const res = await this.dlcoAPI.MSSReportGetDetails(req);
      debugger;
        if (res.success) {
        
          this.rbkdetailslistReshedule=res.result;
          this.RbkDetails=true;
       
          this.spinner.hide();
          
        } else {
          this.toast.info(res.message);
          this.spinner.hide();
        }
        this.spinner.hide();
          
  
      }

    onRbkChange(obj){
       
     this.RBKChange();
    }


    async onsubmitbtn():Promise<void>{
      this.spinner.show();
       
        const req = { TYPE:"10",DIST:this.session.districtId,ROUTE:this.session.userName,RBK:this.resheduleData.rbkId,INPUT01:this.resheduleData.source   };
       
      const res = await this.dlcoAPI.MSSReportGetDetails(req);
      debugger;
        if (res.success) {
        
          if(res.result[0].STATUS=="1")

          this.toast.success(res.message);
          if(res.result[0].STATUS=="2")
          this.toast.info(res.message);
          this.spinner.hide();
          
        } else {
          this.toast.info(res.message);
          this.spinner.hide();
        }
        this.spinner.hide();
          
    }

}
