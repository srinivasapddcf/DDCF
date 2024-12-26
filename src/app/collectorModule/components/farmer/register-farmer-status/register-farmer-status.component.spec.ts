import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFarmerStatusComponent } from './register-farmer-status.component';

describe('RegisterFarmerStatusComponent', () => {
  let component: RegisterFarmerStatusComponent;
  let fixture: ComponentFixture<RegisterFarmerStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterFarmerStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFarmerStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
