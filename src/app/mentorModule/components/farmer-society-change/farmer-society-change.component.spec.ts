import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerSocietyChangeComponent } from './farmer-society-change.component';

describe('FarmerSocietyChangeComponent', () => {
  let component: FarmerSocietyChangeComponent;
  let fixture: ComponentFixture<FarmerSocietyChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerSocietyChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerSocietyChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
