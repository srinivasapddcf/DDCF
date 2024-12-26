import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NatureOfUnitChangeComponent } from './nature-of-unit-change.component';

describe('NatureOfUnitChangeComponent', () => {
  let component: NatureOfUnitChangeComponent;
  let fixture: ComponentFixture<NatureOfUnitChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NatureOfUnitChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NatureOfUnitChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
