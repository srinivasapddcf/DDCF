import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { FarmerService } from '../../services/farmer.service';

@Component({
  selector: 'app-farmer-bank-account-update',
  templateUrl: './farmer-bank-account-update.component.html',
  styleUrls: ['./farmer-bank-account-update.component.css']
})
export class FarmerBankAccountUpdateComponent implements OnInit {
  
  input: any;
  uidNum = '';

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private farmerAPI: FarmerService,
    private utils: UtilsService,
    private logger: LoggerService,
    private route: ActivatedRoute,
    private session: SessionService) 
    {
       route.queryParams.subscribe((params) => (this.input = params['request']));
      }

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ""){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    const uidNum = JSON.parse(this.utils.decrypt(this.input));
    this.uidNum = uidNum;
  }

  onDetailSub(): void {
    this.router.navigate(['/farmer/registerFarmerStatus']);
  } 

}
