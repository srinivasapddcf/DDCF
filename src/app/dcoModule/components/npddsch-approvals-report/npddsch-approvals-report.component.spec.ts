import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpddschApprovalsReportComponent } from './npddsch-approvals-report.component';

describe('NpddschApprovalsReportComponent', () => {
  let component: NpddschApprovalsReportComponent;
  let fixture: ComponentFixture<NpddschApprovalsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NpddschApprovalsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NpddschApprovalsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
