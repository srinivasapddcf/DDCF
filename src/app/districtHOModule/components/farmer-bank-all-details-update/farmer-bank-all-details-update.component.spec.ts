import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerBankAllDetailsUpdateComponent } from './farmer-bank-all-details-update.component';

describe('FarmerBankAllDetailsUpdateComponent', () => {
  let component: FarmerBankAllDetailsUpdateComponent;
  let fixture: ComponentFixture<FarmerBankAllDetailsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerBankAllDetailsUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerBankAllDetailsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
