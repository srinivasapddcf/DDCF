import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JdamculandhandoverComponent } from './jdamculandhandover.component';

describe('JdamculandhandoverComponent', () => {
  let component: JdamculandhandoverComponent;
  let fixture: ComponentFixture<JdamculandhandoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JdamculandhandoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JdamculandhandoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
