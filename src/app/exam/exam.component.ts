import { Component, OnInit } from '@angular/core';
import { ExamService } from '../services/exam.service';
import { CommonModule } from '@angular/common';
import { WordpairService } from '../services/wordpair.service';
import { WordPair } from '../models/WordPair';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  constructor(private examService: ExamService, private wordPairService: WordpairService) { }

  ngOnInit(): void {
    this.examService.examStarted$.subscribe((started) => {
      this.hasExamStarted = started;
    });
    this.wordPairs = this.wordPairService.getWordPairs().slice(); // ! Copy of the array instead of referencing it
    if (this.wordPairs.length === 0) {
      this.isExamDisabled = true;
    }
  }

  hasExamStarted: boolean = false;
  wordPairs: WordPair[] = [];
  currentWordPair: WordPair = { key: '', value: '' };
  showKey: boolean = true;
  answer: string = '';
  amountOfCorrectAnswers: number = 0;
  amountOfIncorrectAnswers: number = 0;
  isExamFinished: boolean = false;
  isExamDisabled: boolean = false;

  startExam() {
    this.examService.startExam();
    this.setAndRemoveRandomWordPair();
    this.isExamFinished = false;
    this.amountOfCorrectAnswers = 0;
    this.amountOfIncorrectAnswers = 0;
  }

  endExam() {
    this.examService.resetExam();
    this.isExamFinished = true;
  }

  setAndRemoveRandomWordPair(): void {
    if (this.wordPairs.length === 0) {
      this.endExam();
      return;
    }

    const randomIndex = Math.floor(Math.random() * this.wordPairs.length);
    const randomWordPair = this.wordPairs[randomIndex];
    this.wordPairs.splice(randomIndex, 1);
    this.currentWordPair = randomWordPair;
    this.showKey = Math.random() > 0.5;
    this.answer = '';
  }

  checkAnswer(): void {
    const expectedAnswer = this.showKey ? this.currentWordPair.value : this.currentWordPair.key;
    if (this.answer.trim().toLowerCase() === expectedAnswer.trim().toLowerCase()) {
      this.amountOfCorrectAnswers++;
    } else {
      this.amountOfIncorrectAnswers++;
    }
    this.setAndRemoveRandomWordPair();
  }
}
