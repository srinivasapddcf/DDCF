import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmcuMilkInspectionComponent } from './amcu-milk-inspection.component';

describe('AmcuMilkInspectionComponent', () => {
  let component: AmcuMilkInspectionComponent;
  let fixture: ComponentFixture<AmcuMilkInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmcuMilkInspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmcuMilkInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
