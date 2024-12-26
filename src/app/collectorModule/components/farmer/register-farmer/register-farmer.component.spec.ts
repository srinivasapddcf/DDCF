import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFarmerComponent } from './register-farmer.component';

describe('RegisterFarmerComponent', () => {
  let component: RegisterFarmerComponent;
  let fixture: ComponentFixture<RegisterFarmerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterFarmerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFarmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
