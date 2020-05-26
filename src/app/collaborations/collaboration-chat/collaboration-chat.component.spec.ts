import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborationChatComponent } from './collaboration-chat.component';

describe('CollaborationChatComponent', () => {
  let component: CollaborationChatComponent;
  let fixture: ComponentFixture<CollaborationChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaborationChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaborationChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
