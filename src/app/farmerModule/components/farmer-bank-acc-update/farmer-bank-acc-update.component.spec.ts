import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerBankAccUpdateComponent } from './farmer-bank-acc-update.component';

describe('FarmerBankAccUpdateComponent', () => {
  let component: FarmerBankAccUpdateComponent;
  let fixture: ComponentFixture<FarmerBankAccUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerBankAccUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerBankAccUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
