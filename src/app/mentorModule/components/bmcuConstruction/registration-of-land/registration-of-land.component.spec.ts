import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationOfLandComponent } from './registration-of-land.component';

describe('RegistrationOfLandComponent', () => {
  let component: RegistrationOfLandComponent;
  let fixture: ComponentFixture<RegistrationOfLandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationOfLandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationOfLandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
