import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandAllocationComponent } from './land-allocation.component';

describe('LandAllocationComponent', () => {
  let component: LandAllocationComponent;
  let fixture: ComponentFixture<LandAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
