import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerFeedIndentDetailsComponent } from './farmer-feed-indent-details.component';

describe('FarmerFeedIndentDetailsComponent', () => {
  let component: FarmerFeedIndentDetailsComponent;
  let fixture: ComponentFixture<FarmerFeedIndentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerFeedIndentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerFeedIndentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
