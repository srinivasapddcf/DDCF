import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueHODashboardComponent } from './issue-hodashboard.component';

describe('IssueHODashboardComponent', () => {
  let component: IssueHODashboardComponent;
  let fixture: ComponentFixture<IssueHODashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueHODashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueHODashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
