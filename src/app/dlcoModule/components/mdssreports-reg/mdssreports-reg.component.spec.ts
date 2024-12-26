import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdssreportsRegComponent } from './mdssreports-reg.component';

describe('MdssreportsRegComponent', () => {
  let component: MdssreportsRegComponent;
  let fixture: ComponentFixture<MdssreportsRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdssreportsRegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdssreportsRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
