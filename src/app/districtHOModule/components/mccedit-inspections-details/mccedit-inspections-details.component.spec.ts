import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCCeditInspectionsDetailsComponent } from './mccedit-inspections-details.component';

describe('MCCeditInspectionsDetailsComponent', () => {
  let component: MCCeditInspectionsDetailsComponent;
  let fixture: ComponentFixture<MCCeditInspectionsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MCCeditInspectionsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MCCeditInspectionsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
