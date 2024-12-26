import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietyChangeDashboardComponent } from './society-change-dashboard.component';

describe('SocietyChangeDashboardComponent', () => {
  let component: SocietyChangeDashboardComponent;
  let fixture: ComponentFixture<SocietyChangeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocietyChangeDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocietyChangeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
