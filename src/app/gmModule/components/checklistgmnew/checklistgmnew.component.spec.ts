import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistgmnewComponent } from './checklistgmnew.component';

describe('ChecklistgmnewComponent', () => {
  let component: ChecklistgmnewComponent;
  let fixture: ComponentFixture<ChecklistgmnewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecklistgmnewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistgmnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
