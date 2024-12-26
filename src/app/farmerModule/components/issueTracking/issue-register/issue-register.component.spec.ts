import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueRegisterComponent } from './issue-register.component';

describe('IssueRegisterComponent', () => {
  let component: IssueRegisterComponent;
  let fixture: ComponentFixture<IssueRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
