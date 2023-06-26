import { TestBed } from '@angular/core/testing';

import { AssetSubLevelService } from './asset-sub-level.service';

describe('AssetSublevelService', () => {
  let service: AssetSubLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetSubLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
