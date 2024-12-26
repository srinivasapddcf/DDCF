import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantSecretaryAdditionComponent } from './assistant-secretary-addition.component';

describe('AssistantSecretaryAdditionComponent', () => {
  let component: AssistantSecretaryAdditionComponent;
  let fixture: ComponentFixture<AssistantSecretaryAdditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssistantSecretaryAdditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistantSecretaryAdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
