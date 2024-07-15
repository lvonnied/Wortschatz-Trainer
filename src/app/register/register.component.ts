import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  key: string = '';
  value: string = '';
  errorMessage: string = '';

  wordPairs = new Map<string, string>([
    ['house', 'Haus'],
    ['book', 'Buch'],
    ['tree', 'Baum'],
    ['car', 'Auto']
  ]);

  addWordPair(): void {
    if (this.key.trim() === '' || this.value.trim() === '') {
      this.errorMessage = 'Both fields are required.';
    } else {
      this.wordPairs.set(this.key, this.value);
      this.key = '';
      this.value = '';
      this.errorMessage = '';
    }
  }

  removeWordPair(key: string) {
    this.wordPairs.delete(key);
  }

}
