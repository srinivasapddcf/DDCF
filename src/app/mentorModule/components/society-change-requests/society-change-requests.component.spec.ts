import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietyChangeRequestsComponent } from './society-change-requests.component';

describe('SocietyChangeRequestsComponent', () => {
  let component: SocietyChangeRequestsComponent;
  let fixture: ComponentFixture<SocietyChangeRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocietyChangeRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocietyChangeRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
