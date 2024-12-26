import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidBankAccountComponent } from './invalid-bank-account.component';

describe('InvalidBankAccountComponent', () => {
  let component: InvalidBankAccountComponent;
  let fixture: ComponentFixture<InvalidBankAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvalidBankAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidBankAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
