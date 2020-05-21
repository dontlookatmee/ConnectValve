import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallPopupComponent } from './small-popup.component';

describe('SmallPopupComponent', () => {
  let component: SmallPopupComponent;
  let fixture: ComponentFixture<SmallPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
