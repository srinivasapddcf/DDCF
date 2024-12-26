import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingIssuesListComponent } from './pending-issues-list.component';

describe('PendingIssuesListComponent', () => {
  let component: PendingIssuesListComponent;
  let fixture: ComponentFixture<PendingIssuesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingIssuesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingIssuesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
