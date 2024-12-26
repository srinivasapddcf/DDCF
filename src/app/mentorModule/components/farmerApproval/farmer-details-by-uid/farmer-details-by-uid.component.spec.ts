import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerDetailsByUidComponent } from './farmer-details-by-uid.component';

describe('FarmerDetailsByUidComponent', () => {
  let component: FarmerDetailsByUidComponent;
  let fixture: ComponentFixture<FarmerDetailsByUidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerDetailsByUidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerDetailsByUidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
