import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdacAccountDashboardComponent } from './mdac-account-dashboard.component';

describe('MdacAccountDashboardComponent', () => {
  let component: MdacAccountDashboardComponent;
  let fixture: ComponentFixture<MdacAccountDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdacAccountDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdacAccountDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
