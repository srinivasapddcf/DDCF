import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePickerService } from 'src/app/shared/services/date-picker.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { McuMappingService } from '../../services/mcu-mapping.service';

@Component({
  selector: 'app-personaldetails',
  templateUrl: './personaldetails.component.html',
  styleUrls: ['./personaldetails.component.css']
})
export class PersonaldetailsComponent implements OnInit {


  FirstName: any;
  MiddleName: any;
  LastName: any;
  DOB: any;
  MobileNO: any;
  EmailID: any;
  DNoP: any;
  City: any;
  CitVill: any;
  State: any;
  District: any;
  Pincode: any;
  CuDNoP: any;
  CuCity: any;
  CuCitVill: any;
  CuState: any;
  CuDistrict: any;
  CuPincode: any;
  BraSpl: any;
  PCollege: any;
  MaGra: any;
  UploadDocuments: any;
  GDUploadDocuments: any;
  GDMaGra: any;
  GDPCollege: any;
  GDBraSpl: any;
  IBraSpl: any;
  IPCollege: any;
  IMaGra: any;
  IUploadDocuments: any;
  SBraSpl: any;
  SSchool: any;
  SMaGra: any;
  SUploadDocuments: any;
  Duties: any;
  Years: any;
  Role: any;
  OrganiCom: any;
  Months: any;
  CvUpload: any;
  ExperienceLatter: any;
  Fresher: any;
  Experience: any;
  CvUploadFresher: any;
  Skills: any;
  isfresher: boolean = false;
  isexperience: boolean = false;
  ispgcheck: boolean = false;
  IsWorking: boolean = false;
  isNotWorking: boolean = true;
  isTable: boolean = false;
  isChecked: any;
  PG: any;
  NotWorking: any;
  CurrentlyWorking: any;
  FromDate: string;
  ToDate: string;
  experTotal: any[] = [];
  formattedDate: string;
  currentDate: Date = new Date();
  isModalVisible = false;
  receivedObject: any;
  MobileNum: any;
  OTP: any;
  Gender: any
  PhD: any;
  so: any;
  isSo: boolean = false;
  isDo: boolean = false;
  isGuardian: boolean = false;
  Course: any;
  YearOfPassout: any;
  GdCourse: any;
  GdYearOfPassout: any;
  IdCourse: any;
  IdYearOfPassout: any;
  cbseState: any;
  SYearOfPassout: any;
  DistList: any[] = [];
  StateList: any[] = [];
  DataList: any[] = [];
  MaterId: any;
  DistData: any[] = [];
  documentobj = {

      UploadDocuments: '',
      GDUploadDocuments: '',
      SUploadDocuments: '',
      IUploadDocuments: '',
      CvUploadFresher: '',
      CvUpload: '',
      ExperienceLatter: ''

  }
  constructor(
      private spinner: NgxSpinnerService,
      private toast: ToasterService,
      private router: Router,
      private mcuAPI: McuMappingService,
      private utils: UtilsService,
      private logger: LoggerService,
      private session: SessionService,
      private datePicker: DatePickerService,
      private route: ActivatedRoute

  ) {
      this.formattedDate = this.formatDate(this.currentDate);
  }
  private formatDate(date: Date): string {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1.
      const year = date.getFullYear().toString();

      return `${day}-${month}-${year}`;
  }
  ngOnInit() {
      debugger;
      // Retrieve the 'data' parameter from the route
      this.route.queryParams.subscribe(params => {
          if (params.data) {
              // Parse the JSON string to get the object
              this.receivedObject = JSON.parse(params.data);
              console.log(this.receivedObject);
          }
      });

      this.LoadState();
      this.LoadDist();
      // this.LoadData();
  }

  FresherData() {
      this.isfresher = true;
      this.isexperience = false;
  }
  ExperienceData() {
      this.isexperience = true;
      this.isfresher = false;
  }
  PgYChange() {


      this.ispgcheck = true;
      // console.log(this.PGYes);
      // this.PGNo = ''
  }
  PgNChange() {
      this.ispgcheck = false;
      // console.log(this.PGNo);
      // this.PGYes = ''
  }
  CurrentlyWorkingData() {
      this.IsWorking = true;
      this.isNotWorking = false;;
  }
  NotWorkingData() {

      this.isNotWorking = true;
      this.IsWorking = true;

  }
  addSameAddress() {
      debugger;
      if (this.isChecked) {
          this.CuPincode = ''
          this.CuDNoP = ''
          this.CuCity = ''
          this.CuCitVill = ''
          this.CuState = ''
          this.CuDistrict = ''
      }
      else {
          this.CuPincode = this.Pincode;
          this.CuDNoP = this.DNoP;
          this.CuCity = this.City;
          this.CuCitVill = this.CitVill;
          this.CuState = this.State;
          this.CuDistrict = this.District;

      }

  }



  CommercialAdd() {
      debugger;
      const obj = {
          ORGANIZATION_NAME: this.OrganiCom,
          ROLE: this.Role,
          DUTIES: this.Duties,
          FROM_DATE: this.FromDate,
          TO_DATE: this.ToDate
      }
      // this.ToDate.setHours(0, 0, 0, 0);
      // this.currentDate.setHours(0, 0, 0, 0);
      this.isTable = true;
      const fromDateStr = this.FromDate;
      const toDateStr = this.ToDate;

      const startDate = new Date(fromDateStr);
      const endDate = new Date(toDateStr);

      // Calculate the difference in years and months
      let yearsDifference = endDate.getFullYear() - startDate.getFullYear();
      let monthsDifference = endDate.getMonth() - startDate.getMonth();

      // Adjust for negative months difference
      if (monthsDifference < 0) {
          yearsDifference--;
          monthsDifference += 12;
      }
      console.log(`Difference: ${yearsDifference} years and ${monthsDifference} months`);

      if (this.formattedDate === this.ToDate) {
          this.isNotWorking = false;
          this.IsWorking = true;


      }
      this.experTotal.push(obj);
      //console.log(this.experTotal);
      this.OrganiCom = ''
      this.Role = ''
      this.Duties = ''
      this.FromDate = ''
      this.ToDate = ''


  }

  CommercialremoveData(index: number): void {
      this.experTotal.splice(index, 1);
  }

  MaleCheck() {
      this.isSo = true;
      this.isDo = false;
      this.isGuardian = false;
  }
  FemaleCheck() {
      this.isSo = false;
      this.isDo = true;
      this.isGuardian = false;
  }
  OthersCheck() {
      this.isSo = false;
      this.isDo = false;
      this.isGuardian = true;
  }

  isPopupVisible: boolean = false;

  togglePopup() {
      // Toggle the visibility of the popup based on your condition here.
      // For example, you can replace this condition with your logic.
      if (true) {
          this.isPopupVisible = true;
      }
  }

  async LoadDist(): Promise<void> {
      debugger
      try {
          const req = {
              TYPE: "5"
          }
          this.spinner.show();
          const res = await this.mcuAPI.NotificationsForJobDetails(req);
          debugger;
          if (res.success) {
              this.spinner.hide();
              this.DistList = res.result;
              // console.log(this.DistList);


          } else {
              this.spinner.hide();
              this.toast.info(res.message);
          }

      } catch (error) {
          this.spinner.hide();
          this.utils.catchResponse(error);
          return
      }

  }

  async LoadData(): Promise<void> {
      debugger
      try {
          const req = {
              "TYPE": "8",
              MASTER_ID: this.MaterId
          }
          this.spinner.show();
          const res = await this.mcuAPI.NotificationsForJobDetails(req);
          debugger;
          if (res.success) {
              this.spinner.hide();
              this.DistData = res.result;
              console.log(this.DistData);


          } else {
              this.spinner.hide();
              this.toast.info(res.message);
          }

      } catch (error) {
          this.spinner.hide();
          this.utils.catchResponse(error);
          return
      }

  }



  async LoadState(): Promise<void> {
      try {
          const req = {
              TYPE: "6"
          }
          this.spinner.show();
          const res = await this.mcuAPI.NotificationsForJobDetails(req);
          if (res.success) {
              this.spinner.hide();
              this.StateList = res.result;
              // console.log(this.StateList);

          } else {
              this.spinner.hide();
              this.toast.info(res.message);
          }

      } catch (error) {
          this.spinner.hide();
          this.utils.catchResponse(error);
          return
      }

  }

  async PGUploadDocumentsChange(event): Promise<void> {
      try {
          debugger
          const res = await this.utils.encodedString(
              event,
              this.utils.fileType.PDF,
              this.utils.fileSize.oneMB
          );
          if (res) {
              const file = res.replace(
                  'data:application/pdf;base64,',
                  ''
              );
              this.documentobj.UploadDocuments = file
          }
      } catch (error) {
          this.utils.catchResponse(error);
      }
  }

  async GDUploadDocumentsChange(event): Promise<void> {
      try {
          debugger
          const res = await this.utils.encodedString(
              event,
              this.utils.fileType.PDF,
              this.utils.fileSize.oneMB
          );
          if (res) {
              const file = res.replace(
                  'data:application/pdf;base64,',
                  ''
              );
              this.documentobj.GDUploadDocuments = file
          }
      } catch (error) {
          this.utils.catchResponse(error);
      }
  }
  async IUploadDocumentsChange(event): Promise<void> {
      try {
          debugger
          const res = await this.utils.encodedString(
              event,
              this.utils.fileType.PDF,
              this.utils.fileSize.oneMB
          );
          if (res) {
              const file = res.replace(
                  'data:application/pdf;base64,',
                  ''
              );
              this.documentobj.IUploadDocuments = file
          }
      } catch (error) {
          this.utils.catchResponse(error);
      }
  }
  async SUploadDocumentsChange(event): Promise<void> {
      try {
          debugger
          const res = await this.utils.encodedString(
              event,
              this.utils.fileType.PDF,
              this.utils.fileSize.oneMB
          );
          if (res) {
              const file = res.replace(
                  'data:application/pdf;base64,',
                  ''
              );
              this.documentobj.SUploadDocuments = file
          }
      } catch (error) {
          this.utils.catchResponse(error);
      }
  }


  async ExperienceLatterUploadDocumentsChange(event): Promise<void> {
      try {
          debugger
          const res = await this.utils.encodedString(
              event,
              this.utils.fileType.PDF,
              this.utils.fileSize.oneMB
          );
          if (res) {
              const file = res.replace(
                  'data:application/pdf;base64,',
                  ''
              );
              this.documentobj.ExperienceLatter = file
          }
      } catch (error) {
          this.utils.catchResponse(error);
      }
  }
  async CvUploadFresherDocumentsChange(event): Promise<void> {
      try {
          debugger
          const res = await this.utils.encodedString(
              event,
              this.utils.fileType.PDF,
              this.utils.fileSize.oneMB
          );
          if (res) {
              const file = res.replace(
                  'data:application/pdf;base64,',
                  ''
              );
              this.documentobj.CvUploadFresher = file
          }
      } catch (error) {
          this.utils.catchResponse(error);
      }
  }

  async UploadDocumentsChange(event): Promise<void> {
      try {
          debugger
          const res = await this.utils.encodedString(
              event,
              this.utils.fileType.PDF,
              this.utils.fileSize.oneMB
          );
          if (res) {
              const file = res.replace(
                  'data:application/pdf;base64,',
                  ''
              );
              this.documentobj.CvUpload = file
          }
      } catch (error) {
          this.utils.catchResponse(error);
      }
  }





  async PersonalDaetailSub(): Promise<void> {
      try {
          debugger
          const obj = {
              TYPE: "1",
              FISRT_NAME: this.FirstName,
              MIDDLE_NAME: this.MiddleName,
              LAST_NAME: this.LastName,
              DATE_OF_BIRTH_AS_PER_SSC: this.DOB,
              EMAIL_ID: this.EmailID,
              MOBILE_NUMBER: this.MobileNO,
              GENDER: this.Gender,
              FATHER_OR_MOTHER_NAME: this.so,
              D_NO_STREET_NAME_PR: this.DNoP,
              VILLAGE_AREA_PR: this.CitVill,
              CITY_OR_MANDAL_PR: this.City,
              DISTRICT_PR: this.District,
              STATE_PR: this.State,
              PINCODE_PR: this.Pincode,
              D_NO_STREET_NAME_CR: this.CuDNoP,
              VILLAGE_AREA_CR: this.CuCitVill,
              CITY_OR_MANDAL_CR: this.CuCity,
              DISTRICT_CR: this.CuDistrict,
              STATE_CR: this.CuState,
              PINCODE_CR: this.CuPincode
          }
          this.spinner.show();
          const res = await this.mcuAPI.JobDetailsSubmit(obj);
          if (res.success) {
              this.DataList = res.result;
              this.MaterId = this.DataList[0][':B1'];
              this.spinner.hide();
              this.toast.success(res.message);
              this.FirstName = ''
              this.MiddleName = ''
              this.LastName = ''
              this.DOB = ''
              this.EmailID = ''
              this.MobileNO = ''
              this.Gender = ''
              this.so = ''
              this.DNoP = ''
              this.CitVill = ''
              this.City = ''
              this.District = ''
              this.State = ''
              this.Pincode = ''
              this.CuDNoP = ''
              this.CuCitVill = ''
              this.CuCity = ''
              this.CuDistrict = ''
              this.CuState = ''
              this.CuPincode = ''
              return;

          } else {
              this.spinner.hide();
              this.toast.warning(res.message);
              return;
          }
      } catch (error) {
          this.spinner.hide();
          this.utils.catchResponse(error);
          return
      }

  }

  async QualificationDaetailSub(): Promise<void> {

      debugger

      try {
          const obj = {
              TYPE: "2",
              PHD: this.PhD,
              PBRANCH_SPECIALIZATION_PG: this.Course,
              COURSE_GRDN_PG: this.BraSpl,
              COLLEGE_PG: this.PCollege,
              YEAR_OF_PASSEDOUT_PG: this.YearOfPassout,
              MARKS_OR_GRADE_PG: this.MaGra,
              UPLOAD_DOCUMENTS_PG: this.documentobj.UploadDocuments,
              COURSE_GRDN_DEGREE: this.GdCourse,
              BRANCH_SPECIALIZATION: this.GDBraSpl,
              COLLEGE__GRDN_DEGREE: this.GDPCollege,
              YEAR_OF_PASSEDOUT_GRDN_DEGREE: this.GdYearOfPassout,
              MARKS_GRADE__GRDN_DEGREE: this.GDMaGra,
              UPLOAD_DCNTS__GRDN_DEGREE: this.documentobj.GDUploadDocuments,
              COURSE_INTER_DIPL: this.IdCourse,
              COLLEGE_DIPL: this.IPCollege,
              YEAR_OF_PASSEDOUT_DIPL: this.IdYearOfPassout,
              MARKS_GRADE_DIPL: this.IMaGra,
              UPLOAD_DCNTS_DIPL: this.documentobj.IUploadDocuments,
              CBSE_STATE_SYLLABUS: this.cbseState,
              SCHOOL: this.SSchool,
              YEAR_OF_PASSEDOUT_SSC: this.SYearOfPassout,
              MARKS_GRADE_SSC: this.SMaGra,
              UPLOAD_DCNTS_SSC: this.documentobj.SUploadDocuments,
              MASTER_ID: this.MaterId

          }
          this.spinner.show();

          const res = await this.mcuAPI.JobDetailsSubmit(obj);
          if (res.success) {
              this.spinner.hide();
              this.toast.success(res.message);
              this.PG = ''
              this.PhD = ''
              this.Course = ''
              this.BraSpl = ''
              this.PCollege = ''
              this.YearOfPassout = ''
              this.MaGra = ''
              this.UploadDocuments = ''
              this.GdCourse = ''
              this.GDBraSpl = ''
              this.GDPCollege = ''
              this.GdYearOfPassout = ''
              this.GDMaGra = ''
              this.GDUploadDocuments = ''
              this.IdCourse = ''
              this.IPCollege = ''
              this.IdYearOfPassout = ''
              this.IMaGra = ''
              this.IUploadDocuments = ''
              this.cbseState = ''
              this.SSchool = ''
              this.SYearOfPassout = ''
              this.SMaGra = ''
              this.SUploadDocuments = ''
              return;

          } else {
              this.spinner.hide();
              this.toast.warning(res.message);
              return;
          }
      } catch (error) {
          this.spinner.hide();
          this.utils.catchResponse(error);
          return
      }
  }

  async FresherDaetailSub(): Promise<void> {
      debugger

      try {
          const obj = {
              TYPE: "4",
              SKILLS: this.Skills,
              CV_UPLOAD: this.documentobj.CvUploadFresher,
              MASTER_ID: this.MaterId
          }
          this.spinner.show();
          const res = await this.mcuAPI.JobDetailsSubmit(obj);
          if (res.success) {
              this.LoadData();
              this.spinner.hide();
              this.toast.success(res.message);
              this.Skills = ''
              this.CvUploadFresher = ''
              return;

          } else {
              this.spinner.hide();
              this.toast.warning(res.message);
              return;
          }
      } catch (error) {
          this.spinner.hide();
          this.utils.catchResponse(error);
          return
      }

  }

  async ExperienceDaetailSub(): Promise<void> {

      debugger
      try {
          const obj = {
              TYPE: "3",
              ORGANIZATION_NAME: this.OrganiCom,
              ROLE: this.Role,
              DUTIES: this.Duties,
              FROM_DATE: this.FromDate,
              TO_DATE: this.ToDate,
              YEARS: this.Years,
              MONTH: this.Months,
              CV_UPLOAD: this.documentobj.CvUpload,
              EXPERIENCE_LTR_UPLOAD: this.documentobj.ExperienceLatter,
              MASTER_ID: this.MaterId
          }
          this.spinner.show();
          const res = await this.mcuAPI.JobDetailsSubmit(obj);
          if (res.success) {
              this.LoadData();
              this.spinner.hide();
              this.toast.success(res.message);
              this.OrganiCom = ''
              this.Role = ''
              this.Duties = ''
              this.FromDate = ''
              this.Years = ''
              this.Months = ''
              this.CvUpload = ''
              this.ExperienceLatter = ''
              this.ToDate=''
              return;

          } else {
              this.spinner.hide();
              this.toast.warning(res.message);
              return;
          }
      } catch (error) {
          this.spinner.hide();
          this.utils.catchResponse(error);
          return
      }
  }


  async FinalSub(): Promise<void> {


  }


}
