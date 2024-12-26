import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPromotersComponent } from './add-promoters.component';

describe('AddPromotersComponent', () => {
  let component: AddPromotersComponent;
  let fixture: ComponentFixture<AddPromotersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPromotersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPromotersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
