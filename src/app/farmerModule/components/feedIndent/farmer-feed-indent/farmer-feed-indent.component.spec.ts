import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerFeedIndentComponent } from './farmer-feed-indent.component';

describe('FarmerFeedIndentComponent', () => {
  let component: FarmerFeedIndentComponent;
  let fixture: ComponentFixture<FarmerFeedIndentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerFeedIndentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerFeedIndentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
