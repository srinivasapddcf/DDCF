import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueEntryDetailsComponent } from './issue-entry-details.component';

describe('IssueEntryDetailsComponent', () => {
  let component: IssueEntryDetailsComponent;
  let fixture: ComponentFixture<IssueEntryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueEntryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueEntryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
