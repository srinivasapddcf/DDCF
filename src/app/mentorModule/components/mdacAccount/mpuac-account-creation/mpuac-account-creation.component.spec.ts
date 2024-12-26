import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpuacAccountCreationComponent } from './mpuac-account-creation.component';

describe('MpuacAccountCreationComponent', () => {
  let component: MpuacAccountCreationComponent;
  let fixture: ComponentFixture<MpuacAccountCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpuacAccountCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpuacAccountCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
