import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WordpairService } from '../services/wordpair.service';
import { WordPair } from '../models/WordPair';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private wordPairService: WordpairService, private dialog: MatDialog) {
    this.wordPairs = this.wordPairService.getWordPairs();
  }

  key: string = '';
  value: string = '';
  errorMessage: string = '';
  wordPairs: WordPair[] = [];

  ngOnInit(): void {
    this.wordPairService.wordPairs$.subscribe((wordPairs) => {
      this.wordPairs = wordPairs;
    });
  }

  addWordPair(): void {
    if (this.key.trim() === '' || this.value.trim() === '') {
      this.errorMessage = 'Both fields are required.';
    } else {
      this.wordPairService.addWordPair(this.key, this.value);
      this.key = '';
      this.value = '';
      this.errorMessage = '';
    }
  }

  removeWordPair(index: number): void {
    this.wordPairService.removeWordPair(index);
  }

  deleteAllWordPairs(): void {
    this.wordPairService.deleteAllWordPairs();
  }

  sort(colName: 'key' | 'value'): void {
    this.wordPairs.sort((a, b) => a[colName].localeCompare(b[colName]));
  }

  addSampleData(): void {
    this.wordPairService.addSampleData();
  }

  editWordPair(index: number): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: { key: this.wordPairs[index].key, value: this.wordPairs[index].value }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.wordPairService.editWordPair(index, result.key, result.value);
      }
    });
  }

}
