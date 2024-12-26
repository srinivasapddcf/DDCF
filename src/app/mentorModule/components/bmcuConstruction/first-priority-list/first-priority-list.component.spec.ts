import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstPriorityListComponent } from './first-priority-list.component';

describe('FirstPriorityListComponent', () => {
  let component: FirstPriorityListComponent;
  let fixture: ComponentFixture<FirstPriorityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstPriorityListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstPriorityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
