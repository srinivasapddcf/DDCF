import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedrbklistComponent } from './rejectedrbklist.component';

describe('RejectedrbklistComponent', () => {
  let component: RejectedrbklistComponent;
  let fixture: ComponentFixture<RejectedrbklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedrbklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedrbklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
