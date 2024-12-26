import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMeatingAttandesComponent } from './new-meating-attandes.component';

describe('NewMeatingAttandesComponent', () => {
  let component: NewMeatingAttandesComponent;
  let fixture: ComponentFixture<NewMeatingAttandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMeatingAttandesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMeatingAttandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
