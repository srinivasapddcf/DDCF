import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerCertificateDashboardComponent } from './farmer-certificate-dashboard.component';

describe('FarmerCertificateDashboardComponent', () => {
  let component: FarmerCertificateDashboardComponent;
  let fixture: ComponentFixture<FarmerCertificateDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerCertificateDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerCertificateDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
