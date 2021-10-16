import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSchedulesComponent } from './profile-schedules.component';

describe('ProfileSchedulesComponent', () => {
  let component: ProfileSchedulesComponent;
  let fixture: ComponentFixture<ProfileSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSchedulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
