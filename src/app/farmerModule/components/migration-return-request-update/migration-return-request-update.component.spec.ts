import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MigrationReturnRequestUpdateComponent } from './migration-return-request-update.component';

describe('MigrationReturnRequestUpdateComponent', () => {
  let component: MigrationReturnRequestUpdateComponent;
  let fixture: ComponentFixture<MigrationReturnRequestUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MigrationReturnRequestUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MigrationReturnRequestUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
