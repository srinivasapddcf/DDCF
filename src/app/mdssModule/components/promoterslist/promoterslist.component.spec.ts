import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoterslistComponent } from './promoterslist.component';

describe('PromoterslistComponent', () => {
  let component: PromoterslistComponent;
  let fixture: ComponentFixture<PromoterslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoterslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoterslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
