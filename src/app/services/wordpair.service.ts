import { Injectable } from '@angular/core';
import { WordPair } from '../models/WordPair';
import { RandomwordpairService } from './randomwordpair.service';

@Injectable({
  providedIn: 'root'
})
export class WordpairService {
  private wordPairs: WordPair[] = [];

  getWordPairs(): WordPair[] {
    return this.wordPairs;
  }

  getRandomWordPair(): WordPair {
    const randomIndex = Math.floor(Math.random() * this.wordPairs.length);
    return this.wordPairs[randomIndex];
  }

  addWordPair(key: string, value: string): void {
    this.wordPairs.push({ key, value });
  }

  removeWordPair(index: number): void {
    this.wordPairs.splice(index, 1);
  }

  deleteAllWordPairs(): void {
    this.wordPairs = [];
  }

  addSampleData(): void {
    this.wordPairs.push(this.randomWordService.getRandomWordPair());
  }

  constructor(private randomWordService: RandomwordpairService) { }
}
