import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerDeadUpdationComponent } from './farmer-dead-updation.component';

describe('FarmerDeadUpdationComponent', () => {
  let component: FarmerDeadUpdationComponent;
  let fixture: ComponentFixture<FarmerDeadUpdationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerDeadUpdationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerDeadUpdationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
