import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerMentorRegisterComponent } from './farmer-mentor-register.component';

describe('FarmerMentorRegisterComponent', () => {
  let component: FarmerMentorRegisterComponent;
  let fixture: ComponentFixture<FarmerMentorRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerMentorRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerMentorRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
