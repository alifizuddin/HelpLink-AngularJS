import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { FoodbankService } from './foodbank.service';

describe('FoodbankService', () => {
  let service: FoodbankService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(FoodbankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
