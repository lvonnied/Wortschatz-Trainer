import { TestBed } from '@angular/core/testing';

import { RandomwordpairService } from './randomwordpair.service';
import { WordPair } from '../models/WordPair';

describe('RandomwordpairService', () => {
  let service: RandomwordpairService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomwordpairService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a valid random word pair', () => {
    const randomWordPair = service.getRandomWordPair();
    expect(randomWordPair).toBeTruthy();
    expect(randomWordPair.key).toBeTruthy();
    expect(randomWordPair.value).toBeTruthy();
  });

  it('should return a word pair from the predefined list', () => {
    const wordPair = service.getRandomWordPair();
    const wordPairs: WordPair[] = service.getListOfWordPairs();
    const found = wordPairs.find(wp => wp.key === wordPair.key && wp.value === wordPair.value);
    expect(found).toBeTruthy();
  });
});
