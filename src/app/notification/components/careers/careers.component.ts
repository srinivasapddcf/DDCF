import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';  
import { McuMappingService } from 'src/app/mentorModule/services/mcu-mapping.service';
 

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {

  
  private hasClicked = false;
  isnumberofpersons: boolean = false;
  isexpequal: boolean = false;
  isexpequalone: boolean = false;
  isCardClosed: boolean = false;
  DataArray = [];
  DesiList: any[] = [];
  POSITIONLIST=[];
  QUALIFICATON:any;
  EXPERIENCE:any;
  EXPERIENCE2:any;
  designation:any;
  constructor(
       private mcuAPI: McuMappingService,
     // private mcuAPI: LandingPageService,
      private spinner: NgxSpinnerService,
     // private utils: UtilsService,
      // private toast: ToasterService,
      // private session: SessionService,
      private router: Router,
  ) { }

  ngOnInit(): void { debugger;
      
  }



  
      async ScientistData(desigid:any): Promise<void> {  
  try 
  {

  //   this.reqobj = {
  //       designation:obj.DESIGNATION, 
  //       Position:obj.POSITION,               
  //     };

const req = {
    TYPE: "11",
    DESI_ID:desigid           
}
debugger;
this.spinner.show();
const res = await this.mcuAPI.GetJobDetails(req);
if (res.success) {
    this.spinner.hide();
    this.POSITIONLIST = res.result;
    this.QUALIFICATON=res.result[0].QUALIFICATON;
this.EXPERIENCE=res.result[0].EXPERIENCE;
this.EXPERIENCE2=res.result[0].EXPERIENCE2;
this.designation= res.result[0].DESIGNATION +' (' + res.result[0].POSITION +')';
    this.isexpequalone = true;
 console.log(this.POSITIONLIST);

} else {
    this.spinner.hide();
  // this.toast.info(res.message);
}

} catch (error) {
this.spinner.hide();
// this.utils.catchResponse(error);
}



  }
  closeCard() {
      this.isCardClosed = true;
      this.isexpequalone = false;
  }
  GoTopage() {
alert('Work in Progress');
     // this.router.navigate(['JobDetails']);
      //, {queryParams: { data: JSON.stringify(ob) }}
          

  }

  // getData(str: any) {

  //     const obj = {

  //         type: str
  //     }
  //     console.log(obj);

  //     const arrayobj = {
  //         Designation: ' Scientist',
  //         Position: 'Biological',
  //         Qualification: 'M.Sc Microbiology/ Food Microbiology/ Dairy Microbilogy',
  //         Experienceone: '3-5 years of experience in the analysis of Milk  & Milk Products and other Foods.',
  //         Experiencetwo: ' Should well versed with all Micro-techniques.'
  //     }

  //     this.DataArray.push(arrayobj);
  //     console.log(this.DataArray);

  // }

  async LoadDesi(): Promise<void> {
      try {
          const req = {
              TYPE: "9"
          }
          this.spinner.show();
          const res = await this.mcuAPI.GetJobDetails(req);
          if (res.success) {
              this.spinner.hide();
              this.DesiList = res.result;


          } else {
              this.spinner.hide();
            // this.toast.info(res.message);
          }

      } catch (error) {
          this.spinner.hide();
         // this.utils.catchResponse(error);
      }

  }

}
