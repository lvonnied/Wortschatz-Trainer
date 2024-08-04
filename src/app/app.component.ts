import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { ExamService } from './services/exam.service';
import { ILink } from './models/ILink';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, MatTabsModule, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Wortschatz-Trainer';
  links: ILink[] = [
    { path: "register", label: "Register" },
    { path: "study", label: "Study" },
    { path: "exam", label: "Exam" },
  ];
  examStarted = false;

  constructor(private examService: ExamService) { }

  ngOnInit(): void {
    this.examService.examStarted$.subscribe((started) => {
      this.examStarted = started;
    });
  }
}
