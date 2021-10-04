import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniqueDialogComponent } from './unique-dialog.component';

describe('UniqueDialogComponent', () => {
  let component: UniqueDialogComponent;
  let fixture: ComponentFixture<UniqueDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniqueDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniqueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
