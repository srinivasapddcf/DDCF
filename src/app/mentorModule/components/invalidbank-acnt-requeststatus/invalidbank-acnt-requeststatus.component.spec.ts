import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidbankAcntRequeststatusComponent } from './invalidbank-acnt-requeststatus.component';

describe('InvalidbankAcntRequeststatusComponent', () => {
  let component: InvalidbankAcntRequeststatusComponent;
  let fixture: ComponentFixture<InvalidbankAcntRequeststatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvalidbankAcntRequeststatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidbankAcntRequeststatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
