import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmcuLandHandoverEditComponent } from './bmcu-land-handover-edit.component';

describe('BmcuLandHandoverEditComponent', () => {
  let component: BmcuLandHandoverEditComponent;
  let fixture: ComponentFixture<BmcuLandHandoverEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BmcuLandHandoverEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BmcuLandHandoverEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
