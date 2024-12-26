import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdssDocumentsUploadComponent } from './mdss-documents-upload.component';

describe('MdssDocumentsUploadComponent', () => {
  let component: MdssDocumentsUploadComponent;
  let fixture: ComponentFixture<MdssDocumentsUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdssDocumentsUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdssDocumentsUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
