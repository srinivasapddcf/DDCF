import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MDSSResheduleMTSComponent } from './mdssreshedule-mts.component';

describe('MDSSResheduleMTSComponent', () => {
  let component: MDSSResheduleMTSComponent;
  let fixture: ComponentFixture<MDSSResheduleMTSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MDSSResheduleMTSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MDSSResheduleMTSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
