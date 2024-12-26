import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishingsComponent } from './finishings.component';

describe('FinishingsComponent', () => {
  let component: FinishingsComponent;
  let fixture: ComponentFixture<FinishingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
