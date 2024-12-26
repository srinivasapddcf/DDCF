import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheyuthaListComponent } from './cheyutha-list.component';

describe('CheyuthaListComponent', () => {
  let component: CheyuthaListComponent;
  let fixture: ComponentFixture<CheyuthaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheyuthaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheyuthaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
