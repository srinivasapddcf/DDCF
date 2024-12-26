import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmcuLandAllocationComponent } from './amcu-land-allocation.component';

describe('AmcuLandAllocationComponent', () => {
  let component: AmcuLandAllocationComponent;
  let fixture: ComponentFixture<AmcuLandAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmcuLandAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmcuLandAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
