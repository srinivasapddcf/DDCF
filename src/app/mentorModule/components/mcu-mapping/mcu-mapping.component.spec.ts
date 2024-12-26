import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McuMappingComponent } from './mcu-mapping.component';

describe('McuMappingComponent', () => {
  let component: McuMappingComponent;
  let fixture: ComponentFixture<McuMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ McuMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(McuMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
