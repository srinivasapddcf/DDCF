import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSecAsssecDetailsComponent } from './edit-sec-asssec-details.component';

describe('EditSecAsssecDetailsComponent', () => {
  let component: EditSecAsssecDetailsComponent;
  let fixture: ComponentFixture<EditSecAsssecDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSecAsssecDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSecAsssecDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
