import { TestBed } from '@angular/core/testing';

import { CheckAnyRoleExistGuard } from './check-any-rol-exist.guard';

describe('CreateUserGuard', () => {
  let guard: CheckAnyRoleExistGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckAnyRoleExistGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
