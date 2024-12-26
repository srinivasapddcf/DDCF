import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialsSmsSendingComponent } from './credentials-sms-sending.component';

describe('CredentialsSmsSendingComponent', () => {
  let component: CredentialsSmsSendingComponent;
  let fixture: ComponentFixture<CredentialsSmsSendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CredentialsSmsSendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialsSmsSendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
