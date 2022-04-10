import { TestBed } from '@angular/core/testing';

import { EventRegisteredGuard } from './event-registered.guard';

describe('EventRegisteredGuard', () => {
  let guard: EventRegisteredGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EventRegisteredGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
