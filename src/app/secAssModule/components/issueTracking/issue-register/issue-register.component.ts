import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
  selector: 'app-issue-register',
  templateUrl: './issue-register.component.html',
  styleUrls: ['./issue-register.component.css'],
})
export class IssueRegisterComponent implements OnInit {
  rbkList: any[] = [];
  villageList: any[] = [];
  moduleList: any[] = [];
  constructor(private session: SessionService) {
    this.rbkList.push({
      RBK_ID: this.session.rbkId || '',
      RBK_NAME: this.session.rbkName || '',
    });
  }

  ngOnInit(): void {}
}
