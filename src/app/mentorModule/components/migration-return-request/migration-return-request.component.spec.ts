import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MigrationReturnRequestComponent } from './migration-return-request.component';

describe('MigrationReturnRequestComponent', () => {
  let component: MigrationReturnRequestComponent;
  let fixture: ComponentFixture<MigrationReturnRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MigrationReturnRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MigrationReturnRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
