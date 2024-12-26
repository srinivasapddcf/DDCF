import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegFarmerStatusComponent } from './reg-farmer-status.component';

describe('RegFarmerStatusComponent', () => {
  let component: RegFarmerStatusComponent;
  let fixture: ComponentFixture<RegFarmerStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegFarmerStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegFarmerStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
