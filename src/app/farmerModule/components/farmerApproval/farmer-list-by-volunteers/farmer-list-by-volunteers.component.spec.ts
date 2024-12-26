import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerListByVolunteersComponent } from './farmer-list-by-volunteers.component';

describe('FarmerListByVolunteersComponent', () => {
  let component: FarmerListByVolunteersComponent;
  let fixture: ComponentFixture<FarmerListByVolunteersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerListByVolunteersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerListByVolunteersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
