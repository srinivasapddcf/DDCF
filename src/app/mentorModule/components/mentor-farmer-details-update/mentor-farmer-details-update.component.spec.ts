import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorFarmerDetailsUpdateComponent } from './mentor-farmer-details-update.component';

describe('MentorFarmerDetailsUpdateComponent', () => {
  let component: MentorFarmerDetailsUpdateComponent;
  let fixture: ComponentFixture<MentorFarmerDetailsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorFarmerDetailsUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorFarmerDetailsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
