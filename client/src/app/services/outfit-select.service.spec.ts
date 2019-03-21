import { TestBed } from '@angular/core/testing';

import { OutfitSelectService } from './outfit-select.service';

describe('OutfitSelectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OutfitSelectService = TestBed.get(OutfitSelectService);
    expect(service).toBeTruthy();
  });
});
