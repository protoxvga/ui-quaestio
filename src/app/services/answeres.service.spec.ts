import { TestBed } from '@angular/core/testing';

import { AnsweresService } from './answeres.service';

describe('AnsweresService', () => {
  let service: AnsweresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnsweresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
