import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidBankAccountsListComponent } from './invalid-bank-accounts-list.component';

describe('InvalidBankAccountsListComponent', () => {
  let component: InvalidBankAccountsListComponent;
  let fixture: ComponentFixture<InvalidBankAccountsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvalidBankAccountsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidBankAccountsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
