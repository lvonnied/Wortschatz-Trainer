import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

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
}
