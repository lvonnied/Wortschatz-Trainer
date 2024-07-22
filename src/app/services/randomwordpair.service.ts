import { Injectable } from '@angular/core';
import { WordPair } from '../models/WordPair';

@Injectable({
  providedIn: 'root'
})
export class RandomwordpairService {
  private exampleWordPairs: WordPair[] = [
    { key: 'Haus', value: 'house' },
    { key: 'Baum', value: 'tree' },
    { key: 'Wolke', value: 'cloud' },
    { key: 'Stift', value: 'pen' },
    { key: 'Gato', value: 'cat' },
    { key: 'Perro', value: 'dog' },
    { key: 'Mesa', value: 'table' },
    { key: 'Silla', value: 'chair' },
    { key: 'Maison', value: 'house' },
    { key: 'Arbre', value: 'tree' },
    { key: 'Nuage', value: 'cloud' },
    { key: 'Stylo', value: 'pen' },
    { key: 'Casa', value: 'house' },
    { key: 'Albero', value: 'tree' },
    { key: 'Nuvola', value: 'cloud' },
    { key: 'Penna', value: 'pen' },
    { key: 'Дом', value: 'house' },
    { key: 'Дерево', value: 'tree' },
    { key: 'Облако', value: 'cloud' },
    { key: 'Ручка', value: 'pen' },
    { key: '집', value: 'house' },
    { key: '나무', value: 'tree' },
    { key: '구름', value: 'cloud' },
    { key: '펜', value: 'pen' },
    { key: '家', value: 'house' },
    { key: '树', value: 'tree' },
    { key: '云', value: 'cloud' },
    { key: '笔', value: 'pen' },
    { key: 'Ev', value: 'house' },
    { key: 'Ağaç', value: 'tree' }
  ];

  getRandomWordPair(): WordPair {
    const randomIndex = Math.floor(Math.random() * this.exampleWordPairs.length);
    return this.exampleWordPairs[randomIndex];
  }

  getListOfWordPairs(): WordPair[] {
    return this.exampleWordPairs;
  }
}
