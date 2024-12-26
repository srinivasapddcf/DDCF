import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmcuinstallationComponent } from './bmcuinstallation.component';

describe('BmcuinstallationComponent', () => {
  let component: BmcuinstallationComponent;
  let fixture: ComponentFixture<BmcuinstallationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BmcuinstallationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BmcuinstallationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
