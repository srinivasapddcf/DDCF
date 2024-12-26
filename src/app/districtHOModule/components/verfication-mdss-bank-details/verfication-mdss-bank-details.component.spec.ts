import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerficationMdssBankDetailsComponent } from './verfication-mdss-bank-details.component';

describe('VerficationMdssBankDetailsComponent', () => {
  let component: VerficationMdssBankDetailsComponent;
  let fixture: ComponentFixture<VerficationMdssBankDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerficationMdssBankDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerficationMdssBankDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
