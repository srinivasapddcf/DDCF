import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingPhotosUploadComponent } from './meeting-photos-upload.component';

describe('MeetingPhotosUploadComponent', () => {
  let component: MeetingPhotosUploadComponent;
  let fixture: ComponentFixture<MeetingPhotosUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingPhotosUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingPhotosUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
