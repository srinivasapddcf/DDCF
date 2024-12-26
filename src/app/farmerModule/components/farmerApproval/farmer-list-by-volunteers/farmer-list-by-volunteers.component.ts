import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-farmer-list-by-volunteers',
  templateUrl: './farmer-list-by-volunteers.component.html',
  styleUrls: ['./farmer-list-by-volunteers.component.css']
})
export class FarmerListByVolunteersComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onVerifyChange(result): void {
    this.router.navigate(['/farmer/FarmerDetailsByUid'], {
      queryParams: { request: result },
    });
  }

}
