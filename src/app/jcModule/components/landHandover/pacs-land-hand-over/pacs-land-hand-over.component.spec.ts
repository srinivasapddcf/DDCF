import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacsLandHandOverComponent } from './pacs-land-hand-over.component';

describe('PacsLandHandOverComponent', () => {
  let component: PacsLandHandOverComponent;
  let fixture: ComponentFixture<PacsLandHandOverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacsLandHandOverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacsLandHandOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
