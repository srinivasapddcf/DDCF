import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GswsPersonUpdateDetailsComponent } from './gsws-person-update-details.component';

describe('GswsPersonUpdateDetailsComponent', () => {
  let component: GswsPersonUpdateDetailsComponent;
  let fixture: ComponentFixture<GswsPersonUpdateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GswsPersonUpdateDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GswsPersonUpdateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
