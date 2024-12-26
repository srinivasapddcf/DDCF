import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietyChangeDashboardForAllDistrictsComponent } from './society-change-dashboard-for-all-districts.component';

describe('SocietyChangeDashboardForAllDistrictsComponent', () => {
  let component: SocietyChangeDashboardForAllDistrictsComponent;
  let fixture: ComponentFixture<SocietyChangeDashboardForAllDistrictsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocietyChangeDashboardForAllDistrictsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocietyChangeDashboardForAllDistrictsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
