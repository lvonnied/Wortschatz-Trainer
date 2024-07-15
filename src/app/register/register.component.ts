import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// TODO Move this to a separate file
interface WordPair {
  key: string,
  value: string,
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  key: string = '';
  value: string = '';
  errorMessage: string = '';

  wordPairs: WordPair[] = [
    // ! Sample data
    { key: 'Haus', value: 'house' },
    { key: 'Baum', value: 'tree' },
    { key: 'Wolke', value: 'cloud' },
    { key: 'Stift', value: 'pen' }
  ];

  addWordPair(): void {
    if (this.key.trim() === '' || this.value.trim() === '') {
      this.errorMessage = 'Both fields are required.';
    } else {
      this.wordPairs.push({ key: this.key, value: this.value });
      this.key = '';
      this.value = '';
      this.errorMessage = '';
    }
  }

  removeWordPair(key: string) {
    this.wordPairs.delete(key);
  }

}
