import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPromotersRequestsComponent } from './edit-promoters-requests.component';

describe('EditPromotersRequestsComponent', () => {
  let component: EditPromotersRequestsComponent;
  let fixture: ComponentFixture<EditPromotersRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPromotersRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPromotersRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
