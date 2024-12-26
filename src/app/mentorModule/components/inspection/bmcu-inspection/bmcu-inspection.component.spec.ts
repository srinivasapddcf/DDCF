import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmcuInspectionComponent } from './bmcu-inspection.component';

describe('BmcuInspectionComponent', () => {
  let component: BmcuInspectionComponent;
  let fixture: ComponentFixture<BmcuInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BmcuInspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BmcuInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
