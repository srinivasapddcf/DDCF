import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables/src/angular-datatables.directive';
import { Subject } from 'rxjs';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-bmcuinstallation',
  templateUrl: './bmcuinstallation.component.html',
  styleUrls: ['./bmcuinstallation.component.css']
})
export class BmcuinstallationComponent implements OnInit {

  Districtid = '';
    BMCUID = '';
    Invoice: any;
    ReceviedStatus = '';

    @ViewChild(DataTableDirective, { static: false })
   dtElement!: DataTableDirective;
 
   dtOptions: DataTables.Settings = this.utils.dataTableOptions();
   dtTrigger: Subject<any> = new Subject();  
  pendtTrigger: Subject<any> = new Subject();
  constructor( private utils: UtilsService, ) { }

  ngOnInit(): void {
  }


  async DataSub(): Promise<void> {
try {
  
} catch (error) {
  
}

  }
}
