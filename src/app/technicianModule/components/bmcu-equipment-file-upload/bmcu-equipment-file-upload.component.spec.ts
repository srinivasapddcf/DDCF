import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmcuEquipmentFileUploadComponent } from './bmcu-equipment-file-upload.component';

describe('BmcuEquipmentFileUploadComponent', () => {
  let component: BmcuEquipmentFileUploadComponent;
  let fixture: ComponentFixture<BmcuEquipmentFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BmcuEquipmentFileUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BmcuEquipmentFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
