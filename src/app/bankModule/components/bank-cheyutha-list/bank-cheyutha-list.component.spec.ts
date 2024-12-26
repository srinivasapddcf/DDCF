import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankCheyuthaListComponent } from './bank-cheyutha-list.component';

describe('BankCheyuthaListComponent', () => {
  let component: BankCheyuthaListComponent;
  let fixture: ComponentFixture<BankCheyuthaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankCheyuthaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankCheyuthaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
