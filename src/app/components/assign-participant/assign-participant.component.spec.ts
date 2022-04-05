import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignParticipantComponent } from './assign-participant.component';

describe('AssignParticipantComponent', () => {
  let component: AssignParticipantComponent;
  let fixture: ComponentFixture<AssignParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignParticipantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
