import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationapprovalsNewComponent } from './registrationapprovals-new.component';

describe('RegistrationapprovalsNewComponent', () => {
  let component: RegistrationapprovalsNewComponent;
  let fixture: ComponentFixture<RegistrationapprovalsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationapprovalsNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationapprovalsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
