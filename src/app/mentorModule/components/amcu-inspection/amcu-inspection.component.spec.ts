import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmcuInspectionComponent } from './amcu-inspection.component';

describe('AmcuInspectionComponent', () => {
  let component: AmcuInspectionComponent;
  let fixture: ComponentFixture<AmcuInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmcuInspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmcuInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
