import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilkInspectionComponent } from './milk-inspection.component';

describe('MilkInspectionComponent', () => {
  let component: MilkInspectionComponent;
  let fixture: ComponentFixture<MilkInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MilkInspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MilkInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
