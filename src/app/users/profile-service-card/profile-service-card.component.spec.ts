import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileServiceCardComponent } from './profile-service-card.component';

describe('ProfileServiceCardComponent', () => {
  let component: ProfileServiceCardComponent;
  let fixture: ComponentFixture<ProfileServiceCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileServiceCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileServiceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
