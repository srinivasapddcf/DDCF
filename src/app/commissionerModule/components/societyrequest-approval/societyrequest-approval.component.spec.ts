import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietyrequestApprovalComponent } from './societyrequest-approval.component';

describe('SocietyrequestApprovalComponent', () => {
  let component: SocietyrequestApprovalComponent;
  let fixture: ComponentFixture<SocietyrequestApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocietyrequestApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocietyrequestApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
