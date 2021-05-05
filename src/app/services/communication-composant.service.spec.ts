import { TestBed } from '@angular/core/testing';

import { CommunicationComposantService } from './communication-composant.service';

describe('CommunicationComposantService', () => {
  let service: CommunicationComposantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunicationComposantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
