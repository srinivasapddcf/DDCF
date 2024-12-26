import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedIndentDashboardComponent } from './feed-indent-dashboard.component';

describe('FeedIndentDashboardComponent', () => {
  let component: FeedIndentDashboardComponent;
  let fixture: ComponentFixture<FeedIndentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedIndentDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedIndentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
