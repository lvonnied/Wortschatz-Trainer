import { Component, OnInit } from '@angular/core';
import { WordpairService } from '../services/wordpair.service';
import { WordPair } from '../models/WordPair';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-study',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './study.component.html',
  styleUrl: './study.component.css'
})
export class StudyComponent implements OnInit {

  currentWordPair: WordPair = { key: '', value: '' };
  showKey: boolean = true;
  answer: string = '';
  correctAnswer: string = '';
  noWordPairs: boolean = false;
  isCorrect: boolean = false;
  private readonly timeout: number = 2000;

  constructor(private wordPairService: WordpairService) { }

  ngOnInit(): void {
    this.currentWordPair = this.wordPairService.getRandomWordPair();
    this.showKey = Math.random() >= 0.5;
    if (this.currentWordPair === undefined) {
      this.noWordPairs = true;
    }
  }

  checkAnswer(): void {
    let solution = (this.showKey ? this.currentWordPair.value : this.currentWordPair.key);
    if (this.answer === solution) {
      this.isCorrect = true;
      this.reset();
    } else {
      this.correctAnswer = solution;
      this.reset();
    }
  }

  reset(): void {
    setTimeout(() => {
      this.answer = '';
      this.correctAnswer = '';
      this.isCorrect = false;
      this.nextWordPair();
    }, this.timeout);
  }

  nextWordPair(): void {
    this.currentWordPair = this.wordPairService.getRandomWordPair();
    this.showKey = Math.random() >= 0.5;
  }

}
