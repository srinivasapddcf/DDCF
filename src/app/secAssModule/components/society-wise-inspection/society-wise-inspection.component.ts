import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { SecAssService } from '../../services/sec-ass.service';

@Component({
  selector: 'app-society-wise-inspection',
  templateUrl: './society-wise-inspection.component.html',
  styleUrls: ['./society-wise-inspection.component.css'],
})
export class SocietyWiseInspectionComponent implements OnInit {
  maxDate: Date;
  societyList = [];
  milkInLiters: any;
  societyCode: any;
  societyName: any;

  desigId = '';
  inspectionData = {
    districtId: '',
    mandalId: '',
    rbkId: '',
    villageData: '',
    villageId: '',
    societyId: '',
    inspectionDate: '',
    shift: '',
    typeOfMilk: '',
    milkQuantity: '',
    amount: '',
    fat: '',
    SNF: '',
    insertedBy: '',
    source: '',
    vehicleNumber: '',
    vehicleArrivedTime: '',
    vehicleDepatureTime: '',
    noOfCansOfCowmilk: '',
    noOfCansOfBuffalomilk: '',
    summaryImg: '',
  };
  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private mcuAPI: SecAssService,
    private utils: UtilsService,
    private logger: LoggerService,
    private session: SessionService
  ) {
    this.maxDate = this.session.getTodayDate();
    this.societyCode = this.session.societyId;
    this.societyName = this.session.societyName;
  }

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ''){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    this.desigId = this.session.desigId;
    if (this.desigId === '901') {
      this.inspectionData.rbkId = this.session.rbkId;
      this.onRbkChange();
    } else if (this.desigId === '902') {
      this.inspectionData.rbkId = this.session.rbkId;
      this.inspectionData.societyId = this.session.societyId;
      this.inspectionData.villageId = this.session.villageId;
    }
  }

  async onRbkChange(): Promise<void> {
    try {
      this.inspectionData.villageId = '';
      this.inspectionData.societyId = '';
      this.societyList = [];
      if (this.utils.isEmpty(this.inspectionData.rbkId)) {
        return;
      }
      const req = {
        districtId: this.session.districtId,
        rbkId: this.session.rbkId,
        uniqueId: this.session.uniqueId,
      };
      this.spinner.show();
      const res = await this.mcuAPI.societyListRbkId(req);
      if (res.success) {
        this.societyList = res.result;
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onSocietyChange(): Promise<void> {
    try {
      this.inspectionData.societyId = JSON.parse(
        this.inspectionData.villageData
      ).VDCS_CODE;
      this.inspectionData.villageId = JSON.parse(
        this.inspectionData.villageData
      ).VILLAGE_CODE;
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnSubmit(): Promise<void> {
    try {
      if (this.validate()) {
        if (confirm('Please Confirm Society Code and Society Name')) {
        this.inspectionData.insertedBy = this.session.userName;
        this.inspectionData.districtId = this.session.districtId;
        this.inspectionData.mandalId = this.session.mandalId;
        this.inspectionData.source = 'web';

        this.spinner.show();
        const res = await this.mcuAPI.societyWiseInspectionSub(
          this.inspectionData
        );
        if (res.success) {
          alert(res.message);
          window.location.reload();
        } else {
          this.toast.info(res.message);
          this.spinner.hide();
        }
      }
    }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  validate(): boolean {
    if (this.utils.isEmpty(this.inspectionData.villageId)) {
      this.toast.warning('Please Select Society');
      return false;
    }

    if (this.utils.isEmpty(this.inspectionData.inspectionDate)) {
      this.toast.warning('Please Select Inspection Date');
      return false;
    }

    if (this.utils.isEmpty(this.inspectionData.shift)) {
      this.toast.warning('Please Select Inspection Shift');
      return false;
    }

    if (this.utils.isEmpty(this.inspectionData.typeOfMilk)) {
      this.toast.warning('Please Select Type Of Milk');
      return false;
    }

    if (this.utils.isEmpty(this.inspectionData.amount)) {
      this.toast.warning('Please Enter Amount');
      return false;
    }

    if (!this.utils.isNumber(this.inspectionData.amount)) {
      this.toast.warning('Please Enter Valid Amount');
      return false;
    }

    if (this.utils.isEmpty(this.inspectionData.milkQuantity)) {
      this.toast.warning('Please Enter Milk In Litres');
      return false;
    }

    if (!this.utils.isNumber(this.inspectionData.milkQuantity)) {
      this.toast.warning('Please Enter Valid Milk In Litres');
      return false;
    }

    if (this.utils.isEmpty(this.inspectionData.fat)) {
      this.toast.warning('Please Enter FAT');
      return false;
    }

    if (!this.utils.isNumber(this.inspectionData.fat)) {
      this.toast.warning('Please Enter Valid FAT');
      return false;
    }

    if (this.utils.isEmpty(this.inspectionData.SNF)) {
      this.toast.warning('Please Enter SNF');
      return false;
    }

    if (!this.utils.isNumber(this.inspectionData.SNF)) {
      this.toast.warning('Please Enter Valid SNF');
      return false;
    }
    if (this.utils.isEmpty(this.inspectionData.vehicleNumber)) {
      this.toast.warning('Please Enter Vehicle Number');
      return false;
    }

    if (this.utils.isEmpty(this.inspectionData.vehicleArrivedTime)) {
      this.toast.warning('Please Enter Vehicle Arrived Time');
      return false;
    }

    if (this.utils.isEmpty(this.inspectionData.vehicleDepatureTime)) {
      this.toast.warning('Please Enter Vehicle Departure Time');
      return false;
    }
    if (this.utils.isEmpty(this.inspectionData.noOfCansOfCowmilk)) {
      this.toast.warning('Please Enter No Of Cow Milk Cans');
      return false;
    }
    if (!this.utils.isNumber(this.inspectionData.noOfCansOfCowmilk)) {
      this.toast.warning('Please Enter Valid No Of Cow Milk Cans');
      return false;
    }

    if (this.utils.isEmpty(this.inspectionData.noOfCansOfBuffalomilk)) {
      this.toast.warning('Please Enter No Of Buffalo Milk Cans');
      return false;
    }
    if (!this.utils.isNumber(this.inspectionData.noOfCansOfBuffalomilk)) {
      this.toast.warning('Please Enter Valid No Of Buffalo Milk Cans');
      return false;
    }
    if (this.utils.isEmpty(this.inspectionData.summaryImg)) {
      this.toast.warning('Please Upload Summary Photo');
      return false;
    }

    return true;
  }

  async onSummaryImageChange(event): Promise<void> {
    try {
      const res = await this.utils.encodedString(
        event,
        this.utils.fileType.IMAGE,
        this.utils.fileSize.twoHundredKB
      );
      if (res) {
        this.inspectionData.summaryImg = res.replace(
          'data:image/jpeg;base64,',
          ''
        );
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  onMIlkQuantityChange(value): void {
    this.milkInLiters = (value / 1.03).toFixed(2).toString();
  }
}
