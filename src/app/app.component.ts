import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { ExamService } from './services/exam.service';

interface ILink {
  path: string;
  label: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, MatTabsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Wortschatz-Trainer';
  links: ILink[] = [
    { path: "register", label: "Register" },
    { path: "study", label: "Study" },
    { path: "exam", label: "Exam" },
  ];
  activePath = this.links[0].path;
  examStarted = false;

  constructor(private examService: ExamService) {
    this.examService.examStarted$.subscribe((started) => {
      this.examStarted = started;
    });
  }
}
