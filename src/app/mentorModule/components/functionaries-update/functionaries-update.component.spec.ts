import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionariesUpdateComponent } from './functionaries-update.component';

describe('FunctionariesUpdateComponent', () => {
  let component: FunctionariesUpdateComponent;
  let fixture: ComponentFixture<FunctionariesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionariesUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionariesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
