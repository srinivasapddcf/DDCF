import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecAssFarmerRegisterComponent } from './sec-ass-farmer-register.component';

describe('SecAssFarmerRegisterComponent', () => {
  let component: SecAssFarmerRegisterComponent;
  let fixture: ComponentFixture<SecAssFarmerRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecAssFarmerRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecAssFarmerRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
