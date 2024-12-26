import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GswspersonupdateComponent } from './gswspersonupdate.component';

describe('GswspersonupdateComponent', () => {
  let component: GswspersonupdateComponent;
  let fixture: ComponentFixture<GswspersonupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GswspersonupdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GswspersonupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
