import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmcuPayWiseInspectionComponent } from './amcu-pay-wise-inspection.component';

describe('AmcuPayWiseInspectionComponent', () => {
  let component: AmcuPayWiseInspectionComponent;
  let fixture: ComponentFixture<AmcuPayWiseInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmcuPayWiseInspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmcuPayWiseInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
