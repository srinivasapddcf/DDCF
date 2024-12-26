import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.css'],
})
export class IssuesListComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    
  }

  onIssueChange(result): void {
    this.router.navigate(['/farmer/IssueDetails'], {
      queryParams: { request: result },
    });
  }
}
