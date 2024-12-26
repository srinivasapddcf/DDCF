import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmcuBuildingInspectionComponent } from './bmcu-building-inspection.component';

describe('BmcuBuildingInspectionComponent', () => {
  let component: BmcuBuildingInspectionComponent;
  let fixture: ComponentFixture<BmcuBuildingInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BmcuBuildingInspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BmcuBuildingInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
