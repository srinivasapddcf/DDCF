import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistdconewComponent } from './checklistdconew.component';

describe('ChecklistdconewComponent', () => {
  let component: ChecklistdconewComponent;
  let fixture: ComponentFixture<ChecklistdconewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecklistdconewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistdconewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
