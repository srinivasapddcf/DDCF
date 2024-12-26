import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmcuSocietyInspectionComponent } from './amcu-society-inspection.component';

describe('AmcuSocietyInspectionComponent', () => {
  let component: AmcuSocietyInspectionComponent;
  let fixture: ComponentFixture<AmcuSocietyInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmcuSocietyInspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmcuSocietyInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
