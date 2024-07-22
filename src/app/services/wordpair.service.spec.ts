import { TestBed } from '@angular/core/testing';

import { WordpairService } from './wordpair.service';
import { RandomwordpairService } from './randomwordpair.service';

describe('WordpairService', () => {
  let service: WordpairService;
  let randomWordService: RandomwordpairService;
  let randomWordServiceSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RandomwordpairService]
    });
    service = TestBed.inject(WordpairService);
    randomWordService = TestBed.inject(RandomwordpairService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be empty initially', () => {
    expect(service.getWordPairs().length).toBe(0);
  });

  it('should add a word pair', () => {
    service.addWordPair('key', 'value');
    expect(service.getWordPairs().length).toBe(1);
    expect(service.getWordPairs()[0].key).toBe('key');
    expect(service.getWordPairs()[0].value).toBe('value');
  });

  it('should remove a word pair', () => {
    service.addWordPair('key', 'value');
    expect(service.getWordPairs().length).toBe(1);
    service.removeWordPair(0);
    expect(service.getWordPairs().length).toBe(0);
  });

  it('should retrieve a word pair', () => {
    service.addWordPair('key', 'value');
    const wordPair = service.getRandomWordPair();
    expect(wordPair.key).toBe('key');
    expect(wordPair.value).toBe('value');
  });

  it('should delete all word pairs', () => {
    service.addWordPair('key', 'value');
    service.addWordPair('key2', 'value2');
    expect(service.getWordPairs().length).toBe(2);
    service.deleteAllWordPairs();
    expect(service.getWordPairs().length).toBe(0);
  });

  it('should add sample data', () => {
    randomWordServiceSpy = spyOn(randomWordService, 'getRandomWordPair').and.returnValue({ key: 'sample', value: 'sample' });
    service.addSampleData();
    expect(service.getWordPairs().length).toBe(1);
    expect(service.getWordPairs()[0].key).toBe('sample');
    expect(service.getWordPairs()[0].value).toBe('sample');
  });
});
