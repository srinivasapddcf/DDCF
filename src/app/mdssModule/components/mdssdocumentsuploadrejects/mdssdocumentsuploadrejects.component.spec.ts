import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdssdocumentsuploadrejectsComponent } from './mdssdocumentsuploadrejects.component';

describe('MdssdocumentsuploadrejectsComponent', () => {
  let component: MdssdocumentsuploadrejectsComponent;
  let fixture: ComponentFixture<MdssdocumentsuploadrejectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdssdocumentsuploadrejectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdssdocumentsuploadrejectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
