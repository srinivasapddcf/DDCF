import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietyWiseInspectionComponent } from './society-wise-inspection.component';

describe('SocietyWiseInspectionComponent', () => {
  let component: SocietyWiseInspectionComponent;
  let fixture: ComponentFixture<SocietyWiseInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocietyWiseInspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocietyWiseInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
