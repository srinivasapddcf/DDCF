import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretaryTrainingComponent } from './secretary-training.component';

describe('SecretaryTrainingComponent', () => {
  let component: SecretaryTrainingComponent;
  let fixture: ComponentFixture<SecretaryTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecretaryTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretaryTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
