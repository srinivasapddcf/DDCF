import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietyChangeRequestComponent } from './society-change-request.component';

describe('SocietyChangeRequestComponent', () => {
  let component: SocietyChangeRequestComponent;
  let fixture: ComponentFixture<SocietyChangeRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocietyChangeRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocietyChangeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
