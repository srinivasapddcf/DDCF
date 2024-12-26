import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GswsPersonUpdateComponent } from './gsws-person-update.component';

describe('GswsPersonUpdateComponent', () => {
  let component: GswsPersonUpdateComponent;
  let fixture: ComponentFixture<GswsPersonUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GswsPersonUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GswsPersonUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
