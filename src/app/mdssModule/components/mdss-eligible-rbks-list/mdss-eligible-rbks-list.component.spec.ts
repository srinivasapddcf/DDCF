import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdssEligibleRbksListComponent } from './mdss-eligible-rbks-list.component';

describe('MdssEligibleRbksListComponent', () => {
  let component: MdssEligibleRbksListComponent;
  let fixture: ComponentFixture<MdssEligibleRbksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdssEligibleRbksListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdssEligibleRbksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
