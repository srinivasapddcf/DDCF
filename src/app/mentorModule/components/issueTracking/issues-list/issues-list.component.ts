import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
  selector: 'app-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.css']
})
export class IssuesListComponent implements OnInit { 

  constructor(private router: Router,private session: SessionService) {

   }

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ""){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']); 
    }
  }

  onIssueChange(result): void {
    this.router.navigate(['/mentorModule/IssueDetails'], {
      queryParams: { request: result },
    });
  }

}
