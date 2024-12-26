import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmcuequipmentsDetailsComponent } from './bmcuequipments-details.component';

describe('BmcuequipmentsDetailsComponent', () => {
  let component: BmcuequipmentsDetailsComponent;
  let fixture: ComponentFixture<BmcuequipmentsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BmcuequipmentsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BmcuequipmentsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
