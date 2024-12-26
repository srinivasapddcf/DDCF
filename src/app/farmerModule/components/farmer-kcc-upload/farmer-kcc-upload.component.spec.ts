import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerKccUploadComponent } from './farmer-kcc-upload.component';

describe('FarmerKccUploadComponent', () => {
  let component: FarmerKccUploadComponent;
  let fixture: ComponentFixture<FarmerKccUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerKccUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerKccUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
