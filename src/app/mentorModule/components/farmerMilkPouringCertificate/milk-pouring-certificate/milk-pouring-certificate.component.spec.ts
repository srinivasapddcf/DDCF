import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilkPouringCertificateComponent } from './milk-pouring-certificate.component';

describe('MilkPouringCertificateComponent', () => {
  let component: MilkPouringCertificateComponent;
  let fixture: ComponentFixture<MilkPouringCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MilkPouringCertificateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MilkPouringCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
