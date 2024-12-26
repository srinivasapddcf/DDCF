import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCCDeviceDetailsComponent } from './mccdevice-details.component';

describe('MCCDeviceDetailsComponent', () => {
  let component: MCCDeviceDetailsComponent;
  let fixture: ComponentFixture<MCCDeviceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MCCDeviceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MCCDeviceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
