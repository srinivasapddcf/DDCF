import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/shared/services/session.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.css']
})
export class IssueDetailsComponent implements OnInit {

  input: any;
  issueId: any;

  constructor(
    private utils: UtilsService,
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionService
    ) {
    route.queryParams.subscribe((params) => (this.input = params['request'])); 
  }

  ngOnInit(): void {
    if(this.session.uniqueId !="" && this.session.desigId != ""){

    }
    else
    {
      this.router.navigate(['/shared/UnAuthorized']);
    }
    const decString = JSON.parse(this.utils.decrypt(this.input));
    this.issueId = decString.issueId;
  }

  onIssueClosedChange(): void {
    this.router.navigate(['/mentorModule/IssuesList']);
  }

}
