import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCalibrationDevicesComponent } from './edit-calibration-devices.component';

describe('EditCalibrationDevicesComponent', () => {
  let component: EditCalibrationDevicesComponent;
  let fixture: ComponentFixture<EditCalibrationDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCalibrationDevicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCalibrationDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
