import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingImagesComponent } from './meeting-images.component';

describe('MeetingImagesComponent', () => {
  let component: MeetingImagesComponent;
  let fixture: ComponentFixture<MeetingImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
