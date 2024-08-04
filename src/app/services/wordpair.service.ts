import { Injectable } from '@angular/core';
import { WordPair } from '../models/WordPair';
import { RandomwordpairService } from './randomwordpair.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordpairService {
  private wordPairsSubject = new BehaviorSubject<WordPair[]>([
    { key: 'cat', value: 'Katze' },
    { key: 'dog', value: 'Hund' },
    { key: 'mouse', value: 'Maus' },
    { key: 'elephant', value: 'Elefant' },
    { key: 'horse', value: 'Pferd' },
    { key: 'cow', value: 'Kuh' },
    { key: 'rabbit', value: 'Kaninchen' },
    { key: 'bird', value: 'Vogel' },
    { key: 'fish', value: 'Fisch' },
    { key: 'snake', value: 'Schlange' }
  ]);
  wordPairs$ = this.wordPairsSubject.asObservable();

  constructor(private randomWordService: RandomwordpairService) { }

  getWordPairs(): WordPair[] {
    return this.wordPairsSubject.getValue();
  }

  getRandomWordPair(): WordPair {
    const wordPairs = this.getWordPairs();
    const randomIndex = Math.floor(Math.random() * wordPairs.length);
    return wordPairs[randomIndex];
  }

  addWordPair(key: string, value: string): void {
    const currentWordPairs = this.getWordPairs();
    this.wordPairsSubject.next([...currentWordPairs, { key, value }]);
  }

  removeWordPair(index: number): void {
    const currentWordPairs = this.getWordPairs();
    currentWordPairs.splice(index, 1);
    this.wordPairsSubject.next([...currentWordPairs]);
  }

  editWordPair(index: number, key: string, value: string): void {
    const currentWordPairs = this.getWordPairs();
    currentWordPairs[index] = { key, value };
    this.wordPairsSubject.next([...currentWordPairs]);
  }

  deleteAllWordPairs(): void {
    this.wordPairsSubject.next([]);
  }

  addSampleData(): void {
    const currentWordPairs = this.getWordPairs();
    this.wordPairsSubject.next([...currentWordPairs, this.randomWordService.getRandomWordPair()]);
  }
}
