import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBankAcountDetailsComponent } from './update-bank-acount-details.component';

describe('UpdateBankAcountDetailsComponent', () => {
  let component: UpdateBankAcountDetailsComponent;
  let fixture: ComponentFixture<UpdateBankAcountDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBankAcountDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBankAcountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
