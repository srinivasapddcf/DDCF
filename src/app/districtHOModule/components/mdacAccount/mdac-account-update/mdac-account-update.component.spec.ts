import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdacAccountUpdateComponent } from './mdac-account-update.component';

describe('MdacAccountUpdateComponent', () => {
  let component: MdacAccountUpdateComponent;
  let fixture: ComponentFixture<MdacAccountUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdacAccountUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdacAccountUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
