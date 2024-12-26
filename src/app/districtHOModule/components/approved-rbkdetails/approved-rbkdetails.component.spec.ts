import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedRBKDetailsComponent } from './approved-rbkdetails.component';

describe('ApprovedRBKDetailsComponent', () => {
  let component: ApprovedRBKDetailsComponent;
  let fixture: ComponentFixture<ApprovedRBKDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedRBKDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedRBKDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
