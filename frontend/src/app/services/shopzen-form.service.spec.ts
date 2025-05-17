import { TestBed } from '@angular/core/testing';

import { ShopzenFormService } from './shopzen-form.service';

describe('ShopzenFormService', () => {
  let service: ShopzenFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopzenFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
