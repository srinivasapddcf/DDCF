import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotersDashboardComponent } from './promoters-dashboard.component';

describe('PromotersDashboardComponent', () => {
  let component: PromotersDashboardComponent;
  let fixture: ComponentFixture<PromotersDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotersDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotersDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
