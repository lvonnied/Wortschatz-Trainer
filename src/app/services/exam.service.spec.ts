import { TestBed } from '@angular/core/testing';

import { ExamService } from './exam.service';

describe('ExamService', () => {
  let service: ExamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start the exam', () => {
    service.startExam();
    service.examStarted$.subscribe((started) => {
      expect(started).toBeTrue();
    });
  });

  it('should end the exam', () => {
    service.resetExam();
    service.examStarted$.subscribe((started) => {
      expect(started).toBeFalse();
    });
  });
});
