import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMdacAccountComponent } from './edit-mdac-account.component';

describe('EditMdacAccountComponent', () => {
  let component: EditMdacAccountComponent;
  let fixture: ComponentFixture<EditMdacAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMdacAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMdacAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
