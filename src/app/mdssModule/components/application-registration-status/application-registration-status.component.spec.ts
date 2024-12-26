import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationRegistrationStatusComponent } from './application-registration-status.component';

describe('ApplicationRegistrationStatusComponent', () => {
  let component: ApplicationRegistrationStatusComponent;
  let fixture: ComponentFixture<ApplicationRegistrationStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationRegistrationStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationRegistrationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
