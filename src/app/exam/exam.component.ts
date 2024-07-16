import { Component } from '@angular/core';
import { ExamService } from '../services/exam.service';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css'
})
export class ExamComponent {
  constructor(private examService: ExamService) { }

  startExam() {
    this.examService.startExam();
  }
}
