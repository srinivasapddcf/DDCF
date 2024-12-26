import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidbankAcntRequeststatusdetailsComponent } from './invalidbank-acnt-requeststatusdetails.component';

describe('InvalidbankAcntRequeststatusdetailsComponent', () => {
  let component: InvalidbankAcntRequeststatusdetailsComponent;
  let fixture: ComponentFixture<InvalidbankAcntRequeststatusdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvalidbankAcntRequeststatusdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidbankAcntRequeststatusdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
