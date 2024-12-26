import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmcuLandAllocationEditComponent } from './bmcu-land-allocation-edit.component';

describe('BmcuLandAllocationEditComponent', () => {
  let component: BmcuLandAllocationEditComponent;
  let fixture: ComponentFixture<BmcuLandAllocationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BmcuLandAllocationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BmcuLandAllocationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
