import { TestBed } from '@angular/core/testing';

import { DatabaseService } from './database-service.service';

describe('HelpersService', () => {
  let service: DatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
