import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegApprovalsComponent } from './reg-approvals.component';

describe('RegApprovalsComponent', () => {
  let component: RegApprovalsComponent;
  let fixture: ComponentFixture<RegApprovalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegApprovalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
