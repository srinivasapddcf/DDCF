import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistnewmodelComponent } from './checklistnewmodel.component';

describe('ChecklistnewmodelComponent', () => {
  let component: ChecklistnewmodelComponent;
  let fixture: ComponentFixture<ChecklistnewmodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecklistnewmodelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistnewmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
