import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeadMigrationApprovalComponent } from './dead-migration-approval.component';

describe('DeadMigrationApprovalComponent', () => {
  let component: DeadMigrationApprovalComponent;
  let fixture: ComponentFixture<DeadMigrationApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeadMigrationApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeadMigrationApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
