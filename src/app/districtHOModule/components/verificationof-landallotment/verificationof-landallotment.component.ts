import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { map } from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { Session } from 'protractor';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { DistrictHoService } from '../../services/district-ho.service';
 
@Component({
  selector: 'app-verificationof-landallotment',
  templateUrl: './verificationof-landallotment.component.html',
  styleUrls: ['./verificationof-landallotment.component.css']
})
export class VerificationofLandallotmentComponent implements OnInit,OnDestroy, AfterViewInit {
  districtId = '';
  districtList = [];

  MANDAL_CODE = '';
  mandalList = [];

  //@Input() districtId: any;
  @Input() districtName: any;
  @Input() mandalId: any;
  @Input() mandalName: any;
  @Input() fromDate: any;
  @Input() toDate: any;
  mandalLevelDetails = [];
  excelData = [];
  
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();
  


  constructor( private spinner: NgxSpinnerService,
    private session: SessionService,
    private toast: ToasterService,
    private districtHOAPI: DistrictHoService,
    private utils: UtilsService,
    private sanitizer: DomSanitizer,
    private logger: LoggerService,
    private router: Router,
    private route: ActivatedRoute,) {

   }
   Tableload=false;
  ngOnInit(): void {
     
   // this.loadDistricts();
   this.ondistrictChange();
  }
  // async loadDistricts(): Promise<void> {
  //   try {
  //     this.districtList = [];
  //     this.spinner.show();
  //     const res = await this.districtHOAPI.districtList();
  //     if (res.success) {
  //       this.districtList = res.result;//(filter.arguments("districtId",this.districtId));//.filter(o=> o.districtId :"744");//(c=>this.districtId)
        
  //     } else {
  //       this.toast.info(res.message);
  //     }
  //     this.spinner.hide();
  //   } catch (error) {
  //     this.spinner.hide();
  //     this.utils.catchResponse(error);
  //   }
  // }


  async ondistrictChange(): Promise<void> {
    try {
      this.mandalList = [];
      this.mandalId = '';
      if (this.utils.isEmpty( this.session.districtId)) {
        return;
      }
      const req = {
        districtId:      this.session.districtId,// this.districtId, 
      };
      this.spinner.show();
      
      const response = await this.districtHOAPI.landAllotmentMandalByDistrict(req);
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

  btnExcel(): void {
    this.utils.JSONToCSVConvertor(
      this.excelData,
      'Land Allotment Mandal Level Report',
      true
    );
  }
  async btnPhotoView(photo): Promise<void> {
    try {
      this.spinner.show();
      const res = await this.utils.DMSFileDownload(photo);
      if (res.success) {
        let passbookPhoto = (this.sanitizer.bypassSecurityTrustResourceUrl(
          res.result
        ) as any).changingThisBreaksApplicationSecurity;
        this.utils.viewImage(passbookPhoto);
      //  this.toast.showImage(passbookPhoto);
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    } 
  }
  async loadReport(): Promise<void> {
    try {
      if( this.MANDAL_CODE===''||  this.MANDAL_CODE===undefined || this.MANDAL_CODE==='0' )
      {
        this.toast.info("Please Select Mandal"); return;
      }
      this.Tableload=true;
      const req = {
        districtId: this.session.districtId,
        mandalId: this.MANDAL_CODE,
      // fromDate: "10-01-2020",
      //   toDate: "20-06-2022",
      };
      this.spinner.show();
      const res = await this.districtHOAPI.landAllotmentMandalDistrict_select(req);
      if (res.success) {
        this.excelData = [];
        this.mandalLevelDetails = res.result;
        for (let i = 0; i < this.mandalLevelDetails.length; i++) {
          let singleRow = {
            S_NO: i + 1,
            VILLAGE: this.mandalLevelDetails[i].REVENUE_VILLAGE_NAME,
            RSK_NAME:this.mandalLevelDetails[i].RBK_NAME,            
            PUBLIC_PRIVATE_LAND: this.mandalLevelDetails[i].PUBLIC_PRIVATE_LAND,
            SURVEY_NUMBER: this.mandalLevelDetails[i].SURVEY_NUMBER,
            AREA: this.mandalLevelDetails[i].AREA,
            LAND_ALLOTMENT_STATUS: this.mandalLevelDetails[i]
              .LAND_ALLOTMENT_STATUS,
            LATITUDE: this.mandalLevelDetails[i].LATITUDE,
            LONGITUDE: this.mandalLevelDetails[i].LONGITUDE,
            NORTH_BOUNDARY: this.mandalLevelDetails[i].NORTH_BOUNDARY,
            SOUTH_BOUNDARY: this.mandalLevelDetails[i].SOUTH_BOUNDARY,
            EAST_BOUNDARY: this.mandalLevelDetails[i].EAST_BOUNDARY,
            WEST_BOUNDARY: this.mandalLevelDetails[i].WEST_BOUNDARY,
            HANDOVER_VILLAGE_NAME: this.mandalLevelDetails[i]
              .HANDOVER_VILLAGE_NAME,
            SIGNED_BY_PERSON: this.mandalLevelDetails[i].SIGNED_BY_PERSON,
            LAND_TAKEN_BY_NAME: this.mandalLevelDetails[i].LAND_TAKEN_BY_NAME,
            LAND_TAKEN_BY_MOB_NO: this.mandalLevelDetails[i]
              .LAND_TAKEN_BY_MOB_NO,
            LAND_TAKEN_BY_DISIGNATION: this.mandalLevelDetails[i]
              .LAND_TAKEN_BY_DISIGNATION,
            LAND_HANDOVER_BY_NAME: this.mandalLevelDetails[i]
              .LAND_HANDOVER_BY_NAME,
            LAND_HANDOVER_BY_MOB_NO: this.mandalLevelDetails[i]
              .LAND_HANDOVER_BY_MOB_NO,
            LAND_HANDOVER_BY_DISIGNATION: this.mandalLevelDetails[i]
              .LAND_HANDOVER_BY_DISIGNATION,
          };

          this.excelData.push(singleRow);
        }
      } else { this.excelData = []; this.mandalLevelDetails =[];
        this.toast.info(res.message);
      }
      this.rerender();
      this.spinner.hide();
    } catch (error) {  
      this.spinner.hide();
     // this.utils.catchResponse(error);
    }
  }

  async btnPdfView(pdf): Promise<void> {
    try {
      this.spinner.show();
      const res = await this.utils.DMSFileDownload(pdf);
      if (res.success) {
        this.utils.viewPDF(res.result);
        // let signedByPdf = 'data:application/pdf, ' + res.result;
        // window.open(signedByPdf, '_blank');
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  // async btnPDF(): Promise<void> {
  //   try {
  //     const req = {
  //       districtId: this.districtId,
  //       mandalId: this.mandalId,
  //       fromDate: this.fromDate,
  //       toDate: this.toDate,
  //     };
  //     const fileName = 'mandalLevelLandAllotment';
  //     let basePDF = '';
  //     this.spinner.show();
  //     const res = await this.districtHOAPI.landAllotmentMandalPDFReport(req);
  //     if (res.success) {
  //       basePDF = res.result;
  //       this.utils.downloadPdfFile(basePDF, fileName);
  //     } else {
  //       this.toast.info(res.message);
  //     }
  //     this.spinner.hide();
  //   } catch (error) {
  //     this.spinner.hide();
  //     this.utils.catchResponse(error);
  //   }

   


  // }

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



  async btnDelete(obj): Promise<void> {
    try {
      if( this.MANDAL_CODE===''||  this.MANDAL_CODE===undefined || this.MANDAL_CODE==='0' )
{
  this.toast.info("Please Select Mandal"); return;
}
      const req = {
        type:"1",
        villageId: obj,
      };
      this.spinner.show();
      const res = await this.districtHOAPI.landAllotmentMandalBMCUDelete(req);
      if (res.success) {
        this.toast.info(res.message);
        this.spinner.hide();
      }
      this.rerender();
    }
   catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }



}
