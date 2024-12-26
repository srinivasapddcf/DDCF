import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeadMigrationDashboardComponent } from './dead-migration-dashboard.component';

describe('DeadMigrationDashboardComponent', () => {
  let component: DeadMigrationDashboardComponent;
  let fixture: ComponentFixture<DeadMigrationDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeadMigrationDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeadMigrationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
