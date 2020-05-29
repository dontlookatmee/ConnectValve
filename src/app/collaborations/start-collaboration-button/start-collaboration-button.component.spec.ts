import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCollaborationButtonComponent } from './start-collaboration-button.component';

describe('StartCollaborationButtonComponent', () => {
  let component: StartCollaborationButtonComponent;
  let fixture: ComponentFixture<StartCollaborationButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartCollaborationButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartCollaborationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
