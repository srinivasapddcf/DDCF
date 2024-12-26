import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JdbmculandHandoverComponent } from './jdbmculand-handover.component';

describe('JdbmculandHandoverComponent', () => {
  let component: JdbmculandHandoverComponent;
  let fixture: ComponentFixture<JdbmculandHandoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JdbmculandHandoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JdbmculandHandoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
