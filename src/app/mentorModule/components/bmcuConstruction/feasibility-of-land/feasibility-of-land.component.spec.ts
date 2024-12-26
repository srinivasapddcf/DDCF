import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeasibilityOfLandComponent } from './feasibility-of-land.component';

describe('FeasibilityOfLandComponent', () => {
  let component: FeasibilityOfLandComponent;
  let fixture: ComponentFixture<FeasibilityOfLandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeasibilityOfLandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeasibilityOfLandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
