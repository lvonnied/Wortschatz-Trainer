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
      this.examStatus = started;
    });
    this.wordPairs = this.wordPairService.getWordPairs().slice();
    if (this.wordPairs.length === 0) {
      this.disableExam = true;
    }
  }

  examStatus: boolean = false;
  wordPairs: WordPair[] = [];
  currentWordPair: WordPair = { key: '', value: '' };
  showKey: boolean = true;
  answer: string = '';
  correctAnswers: number = 0;
  incorrectAnswers: number = 0;
  examFinished: boolean = false;
  disableExam: boolean = false;

  startExam() {
    this.examService.startExam();
    this.setAndRemoveRandomWordPair();
    this.examFinished = false;
    this.correctAnswers = 0;
    this.incorrectAnswers = 0;
  }

  endExam() {
    this.examService.resetExam();
    this.examFinished = true;
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
      this.correctAnswers++;
    } else {
      this.incorrectAnswers++;
    }
    this.setAndRemoveRandomWordPair();
  }
}
