import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewApplicationfromEligiblemembersComponent } from './new-applicationfrom-eligiblemembers.component';

describe('NewApplicationfromEligiblemembersComponent', () => {
  let component: NewApplicationfromEligiblemembersComponent;
  let fixture: ComponentFixture<NewApplicationfromEligiblemembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewApplicationfromEligiblemembersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewApplicationfromEligiblemembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
