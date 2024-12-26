import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerDetailsUpdateComponent } from './farmer-details-update.component';

describe('FarmerDetailsUpdateComponent', () => {
  let component: FarmerDetailsUpdateComponent;
  let fixture: ComponentFixture<FarmerDetailsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerDetailsUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerDetailsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
