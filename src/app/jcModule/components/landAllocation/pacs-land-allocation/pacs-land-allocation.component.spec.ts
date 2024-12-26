import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacsLandAllocationComponent } from './pacs-land-allocation.component';

describe('PacsLandAllocationComponent', () => {
  let component: PacsLandAllocationComponent;
  let fixture: ComponentFixture<PacsLandAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacsLandAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacsLandAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
