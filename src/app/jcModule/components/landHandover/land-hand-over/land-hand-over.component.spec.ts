import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandHandOverComponent } from './land-hand-over.component';

describe('LandHandOverComponent', () => {
  let component: LandHandOverComponent;
  let fixture: ComponentFixture<LandHandOverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandHandOverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandHandOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
