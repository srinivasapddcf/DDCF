import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdssRegistrationComponent } from './mdss-registration.component';

describe('MdssRegistrationComponent', () => {
  let component: MdssRegistrationComponent;
  let fixture: ComponentFixture<MdssRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdssRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdssRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
