import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMembersDownloadAndUploadDocComponent } from './new-members-download-and-upload-doc.component';

describe('NewMembersDownloadAndUploadDocComponent', () => {
  let component: NewMembersDownloadAndUploadDocComponent;
  let fixture: ComponentFixture<NewMembersDownloadAndUploadDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMembersDownloadAndUploadDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMembersDownloadAndUploadDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
