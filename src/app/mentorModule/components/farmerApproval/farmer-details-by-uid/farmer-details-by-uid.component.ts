import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-farmer-details-by-uid',
  templateUrl: './farmer-details-by-uid.component.html',
  styleUrls: ['./farmer-details-by-uid.component.css'],
})
export class FarmerDetailsByUidComponent implements OnInit {
  constructor(
    private router: Router,
  ) {} 

  ngOnInit(): void {}
  onSuccessChange(): void {debugger;
    this.router.navigate(['/mentorModule/FarmerListByVolunteers']);
  }
}
