import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPromotersComponent } from './edit-promoters.component';

describe('EditPromotersComponent', () => {
  let component: EditPromotersComponent;
  let fixture: ComponentFixture<EditPromotersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPromotersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPromotersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
