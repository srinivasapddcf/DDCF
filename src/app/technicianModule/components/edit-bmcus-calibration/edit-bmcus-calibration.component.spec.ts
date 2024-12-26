import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBmcusCalibrationComponent } from './edit-bmcus-calibration.component';

describe('EditBmcusCalibrationComponent', () => {
  let component: EditBmcusCalibrationComponent;
  let fixture: ComponentFixture<EditBmcusCalibrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBmcusCalibrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBmcusCalibrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
