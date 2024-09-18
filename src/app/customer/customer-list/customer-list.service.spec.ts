import { TestBed } from '@angular/core/testing';

import { CustomerListService } from './customer-list.service';

describe('DataTableService', () => {
  let service: CustomerListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
