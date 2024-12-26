import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietyInspectionComponent } from './society-inspection.component';

describe('SocietyInspectionComponent', () => {
  let component: SocietyInspectionComponent;
  let fixture: ComponentFixture<SocietyInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocietyInspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocietyInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
