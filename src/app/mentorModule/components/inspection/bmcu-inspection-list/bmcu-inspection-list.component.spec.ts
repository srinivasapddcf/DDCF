import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmcuInspectionListComponent } from './bmcu-inspection-list.component';

describe('BmcuInspectionListComponent', () => {
  let component: BmcuInspectionListComponent;
  let fixture: ComponentFixture<BmcuInspectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BmcuInspectionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BmcuInspectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
