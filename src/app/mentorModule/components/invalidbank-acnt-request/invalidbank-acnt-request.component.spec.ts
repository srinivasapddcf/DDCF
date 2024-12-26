import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidbankAcntRequestComponent } from './invalidbank-acnt-request.component';

describe('InvalidbankAcntRequestComponent', () => {
  let component: InvalidbankAcntRequestComponent;
  let fixture: ComponentFixture<InvalidbankAcntRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvalidbankAcntRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidbankAcntRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
