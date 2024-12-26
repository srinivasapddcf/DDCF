import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmcuBuildingInspectionComponent } from './amcu-building-inspection.component';

describe('AmcuBuildingInspectionComponent', () => {
  let component: AmcuBuildingInspectionComponent;
  let fixture: ComponentFixture<AmcuBuildingInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmcuBuildingInspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmcuBuildingInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
