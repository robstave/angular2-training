/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WikiserviceService } from './wikiservice.service';

describe('WikiserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WikiserviceService]
    });
  });

  it('should ...', inject([WikiserviceService], (service: WikiserviceService) => {
    expect(service).toBeTruthy();
  }));
});
