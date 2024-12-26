import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorFarmerKccUploadComponent } from './mentor-farmer-kcc-upload.component';

describe('MentorFarmerKccUploadComponent', () => {
  let component: MentorFarmerKccUploadComponent;
  let fixture: ComponentFixture<MentorFarmerKccUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorFarmerKccUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorFarmerKccUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
