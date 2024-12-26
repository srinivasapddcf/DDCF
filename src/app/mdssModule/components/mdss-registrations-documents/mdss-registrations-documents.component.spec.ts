import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdssRegistrationsDocumentsComponent } from './mdss-registrations-documents.component';

describe('MdssRegistrationsDocumentsComponent', () => {
  let component: MdssRegistrationsDocumentsComponent;
  let fixture: ComponentFixture<MdssRegistrationsDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdssRegistrationsDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdssRegistrationsDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
