import { TestBed } from '@angular/core/testing';

import { InstallationMediaService } from './installation-media.service';

describe('InstallationMediaService', () => {
  let service: InstallationMediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstallationMediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
