import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationForRegistrationComponent } from './application-for-registration.component';

describe('ApplicationForRegistrationComponent', () => {
  let component: ApplicationForRegistrationComponent;
  let fixture: ComponentFixture<ApplicationForRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationForRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationForRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
