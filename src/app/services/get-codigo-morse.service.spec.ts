import { TestBed } from '@angular/core/testing';

import { GetCodigoMorseService } from './get-codigo-morse.service';

describe('GetCodigoMorseService', () => {
  let service: GetCodigoMorseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCodigoMorseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
