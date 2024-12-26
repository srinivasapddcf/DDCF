import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeadMigrationUpdationComponent } from './dead-migration-updation.component';

describe('DeadMigrationUpdationComponent', () => {
  let component: DeadMigrationUpdationComponent;
  let fixture: ComponentFixture<DeadMigrationUpdationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeadMigrationUpdationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeadMigrationUpdationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
