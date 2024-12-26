import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberSheduleCreationComponent } from './member-shedule-creation.component';

describe('MemberSheduleCreationComponent', () => {
  let component: MemberSheduleCreationComponent;
  let fixture: ComponentFixture<MemberSheduleCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberSheduleCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberSheduleCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
