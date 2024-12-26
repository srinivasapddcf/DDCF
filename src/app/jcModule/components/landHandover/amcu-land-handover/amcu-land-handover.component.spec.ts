import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmcuLandHandoverComponent } from './amcu-land-handover.component';

describe('AmcuLandHandoverComponent', () => {
  let component: AmcuLandHandoverComponent;
  let fixture: ComponentFixture<AmcuLandHandoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmcuLandHandoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmcuLandHandoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
