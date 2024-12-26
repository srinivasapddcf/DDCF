import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdsSFolloupReportComponent } from './mds-sfolloup-report.component';

describe('MdsSFolloupReportComponent', () => {
  let component: MdsSFolloupReportComponent;
  let fixture: ComponentFixture<MdsSFolloupReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdsSFolloupReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdsSFolloupReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
