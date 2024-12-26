import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherFacilitiesComponent } from './other-facilities.component';

describe('OtherFacilitiesComponent', () => {
  let component: OtherFacilitiesComponent;
  let fixture: ComponentFixture<OtherFacilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherFacilitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherFacilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
