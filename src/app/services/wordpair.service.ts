import { Injectable } from '@angular/core';
import { WordPair } from '../models/WordPair';
import { RandomwordpairService } from './randomwordpair.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordpairService {
  private localStorageKey = 'wordPairs';
  private wordPairsSubject = new BehaviorSubject<WordPair[]>(this.getWordPairsFromLocalStorage());
  wordPairs$ = this.wordPairsSubject.asObservable();

  constructor(private randomWordService: RandomwordpairService) { }

  private getWordPairsFromLocalStorage(): WordPair[] {
    const data = localStorage.getItem(this.localStorageKey);
    console.log('data', data);
    return data ? JSON.parse(data) : [];
  }

  private saveWordPairsToLocalStorage(wordPairs: WordPair[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(wordPairs));
  }

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
    this.saveWordPairsToLocalStorage(this.getWordPairs());
  }

  removeWordPair(index: number): void {
    const currentWordPairs = this.getWordPairs();
    currentWordPairs.splice(index, 1);
    this.wordPairsSubject.next([...currentWordPairs]);
    this.saveWordPairsToLocalStorage(this.getWordPairs());
  }

  editWordPair(index: number, key: string, value: string): void {
    const currentWordPairs = this.getWordPairs();
    currentWordPairs[index] = { key, value };
    this.wordPairsSubject.next([...currentWordPairs]);
    this.saveWordPairsToLocalStorage(this.getWordPairs());
  }

  deleteAllWordPairs(): void {
    this.wordPairsSubject.next([]);
    localStorage.clear();
  }

  addSampleData(): void {
    const currentWordPairs = this.getWordPairs();
    this.wordPairsSubject.next([...currentWordPairs, this.randomWordService.getRandomWordPair()]);
    this.saveWordPairsToLocalStorage(this.getWordPairs());
  }
}
