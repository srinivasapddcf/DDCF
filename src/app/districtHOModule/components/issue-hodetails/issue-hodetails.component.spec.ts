import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueHODetailsComponent } from './issue-hodetails.component';

describe('IssueHODetailsComponent', () => {
  let component: IssueHODetailsComponent;
  let fixture: ComponentFixture<IssueHODetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueHODetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueHODetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
