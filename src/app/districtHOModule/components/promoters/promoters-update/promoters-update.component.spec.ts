import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotersUpdateComponent } from './promoters-update.component';

describe('PromotersUpdateComponent', () => {
  let component: PromotersUpdateComponent;
  let fixture: ComponentFixture<PromotersUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotersUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotersUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
