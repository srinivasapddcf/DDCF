import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMdacAccountRequestsComponent } from './edit-mdac-account-requests.component';

describe('EditMdacAccountRequestsComponent', () => {
  let component: EditMdacAccountRequestsComponent;
  let fixture: ComponentFixture<EditMdacAccountRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMdacAccountRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMdacAccountRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
