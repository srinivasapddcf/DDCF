import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietyMilkCollectionStatusUpdatedComponent } from './society-milk-collection-status-updated.component';

describe('SocietyMilkCollectionStatusUpdatedComponent', () => {
  let component: SocietyMilkCollectionStatusUpdatedComponent;
  let fixture: ComponentFixture<SocietyMilkCollectionStatusUpdatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocietyMilkCollectionStatusUpdatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocietyMilkCollectionStatusUpdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
