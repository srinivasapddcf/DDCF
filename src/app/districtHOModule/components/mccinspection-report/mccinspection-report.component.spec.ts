import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCCInspectionReportComponent } from './mccinspection-report.component';

describe('MCCInspectionReportComponent', () => {
  let component: MCCInspectionReportComponent;
  let fixture: ComponentFixture<MCCInspectionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MCCInspectionReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MCCInspectionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
