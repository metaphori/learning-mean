import { TestBed } from '@angular/core/testing';

import { MysService } from './mys.service';

describe('MysService', () => {
  let service: MysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
