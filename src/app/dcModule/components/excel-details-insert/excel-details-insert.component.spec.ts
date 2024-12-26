import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelDetailsInsertComponent } from './excel-details-insert.component';

describe('ExcelDetailsInsertComponent', () => {
  let component: ExcelDetailsInsertComponent;
  let fixture: ComponentFixture<ExcelDetailsInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcelDetailsInsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelDetailsInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
