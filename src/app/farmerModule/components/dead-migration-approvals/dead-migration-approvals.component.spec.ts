import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeadMigrationApprovalsComponent } from './dead-migration-approvals.component';

describe('DeadMigrationApprovalsComponent', () => {
  let component: DeadMigrationApprovalsComponent;
  let fixture: ComponentFixture<DeadMigrationApprovalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeadMigrationApprovalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeadMigrationApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
