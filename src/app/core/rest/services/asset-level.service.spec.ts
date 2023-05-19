import { TestBed } from '@angular/core/testing';

import { AssetLevelService } from './asset-level.service';

describe('AssetLevelService', () => {
  let service: AssetLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
