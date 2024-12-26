import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionerupdateComponent } from './commissionerupdate.component';

describe('CommissionerupdateComponent', () => {
  let component: CommissionerupdateComponent;
  let fixture: ComponentFixture<CommissionerupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionerupdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionerupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
