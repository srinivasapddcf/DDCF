import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasementLevelComponent } from './basement-level.component';

describe('BasementLevelComponent', () => {
  let component: BasementLevelComponent;
  let fixture: ComponentFixture<BasementLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasementLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasementLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
