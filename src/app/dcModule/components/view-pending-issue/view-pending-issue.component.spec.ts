import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPendingIssueComponent } from './view-pending-issue.component';

describe('ViewPendingIssueComponent', () => {
  let component: ViewPendingIssueComponent;
  let fixture: ComponentFixture<ViewPendingIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPendingIssueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPendingIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
