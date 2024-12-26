import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperStructureComponent } from './super-structure.component';

describe('SuperStructureComponent', () => {
  let component: SuperStructureComponent;
  let fixture: ComponentFixture<SuperStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperStructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
