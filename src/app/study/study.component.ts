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

  constructor(private wordPairService: WordpairService) { }

  ngOnInit(): void {
    this.currentWordPair = this.wordPairService.getRandomWordPair();
    this.showKey = Math.random() >= 0.5;
  }

  checkAnswer(): void {
    let solution = (this.showKey ? this.currentWordPair.key : this.currentWordPair.value);
    if (this.answer === solution) {
      this.reset();
    } else {
      this.correctAnswer = solution;
      setTimeout(() => {
        this.reset();
      }, 2000);
    }
  }

  reset(): void {
    this.answer = '';
    this.correctAnswer = '';
    this.nextWordPair();
  }

  nextWordPair(): void {
    this.currentWordPair = this.wordPairService.getRandomWordPair();
    this.showKey = Math.random() >= 0.5;
  }

}
