import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerBankAccountUpdateComponent } from './farmer-bank-account-update.component';

describe('FarmerBankAccountUpdateComponent', () => {
  let component: FarmerBankAccountUpdateComponent;
  let fixture: ComponentFixture<FarmerBankAccountUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerBankAccountUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerBankAccountUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
