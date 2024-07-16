import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private examStartedSubject = new BehaviorSubject<boolean>(false);
  examStarted$ = this.examStartedSubject.asObservable();

  startExam() {
    this.examStartedSubject.next(true);
  }

  resetExam() {
    this.examStartedSubject.next(false);
  }
}
