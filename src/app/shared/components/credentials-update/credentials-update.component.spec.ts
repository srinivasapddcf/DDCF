import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialsUpdateComponent } from './credentials-update.component';

describe('CredentialsUpdateComponent', () => {
  let component: CredentialsUpdateComponent;
  let fixture: ComponentFixture<CredentialsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CredentialsUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
