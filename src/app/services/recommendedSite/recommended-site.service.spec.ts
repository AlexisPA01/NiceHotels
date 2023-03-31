import { TestBed } from '@angular/core/testing';

import { RecommendedSiteService } from './recommended-site.service';

describe('RecommendedSiteService', () => {
  let service: RecommendedSiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecommendedSiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
