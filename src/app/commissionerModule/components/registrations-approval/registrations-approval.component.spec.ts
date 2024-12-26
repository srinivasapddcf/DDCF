import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationsApprovalComponent } from './registrations-approval.component';

describe('RegistrationsApprovalComponent', () => {
  let component: RegistrationsApprovalComponent;
  let fixture: ComponentFixture<RegistrationsApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationsApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationsApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
