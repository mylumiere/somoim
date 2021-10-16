import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMoimsComponent } from './profile-moims.component';

describe('ProfileMoimsComponent', () => {
  let component: ProfileMoimsComponent;
  let fixture: ComponentFixture<ProfileMoimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileMoimsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMoimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
