import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborationsListComponent } from './collaborations-list.component';

describe('CollaborationsListComponent', () => {
  let component: CollaborationsListComponent;
  let fixture: ComponentFixture<CollaborationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaborationsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaborationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
