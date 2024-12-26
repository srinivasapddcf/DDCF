import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayWiseInspectionComponent } from './pay-wise-inspection.component';

describe('PayWiseInspectionComponent', () => {
  let component: PayWiseInspectionComponent;
  let fixture: ComponentFixture<PayWiseInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayWiseInspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayWiseInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
