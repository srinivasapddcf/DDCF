import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecAssRegisterFarmerStatusComponent } from './sec-ass-register-farmer-status.component';

describe('SecAssRegisterFarmerStatusComponent', () => {
  let component: SecAssRegisterFarmerStatusComponent;
  let fixture: ComponentFixture<SecAssRegisterFarmerStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecAssRegisterFarmerStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecAssRegisterFarmerStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
