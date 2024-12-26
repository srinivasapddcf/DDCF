import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpddScheduleApprovalsComponent } from './npdd-schedule-approvals.component';

describe('NpddScheduleApprovalsComponent', () => {
  let component: NpddScheduleApprovalsComponent;
  let fixture: ComponentFixture<NpddScheduleApprovalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NpddScheduleApprovalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NpddScheduleApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
