import { Component } from '@angular/core';
import { NotesService } from '../notes.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  notes: any[] = [];

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.fetchNotes();
  }

  fetchNotes() {
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

    this.notesService.getNotes(headers).subscribe({
      next: (response: any) => {
        this.notes = response;
      },
      error: (error: any) => {
        console.error('Error fetching notes:', error);
      }
    });
  }

  createNote() {
    // Implement the logic to create a new note
  }

  editNote(note: any) {
    // Implement the logic to edit the selected note
  }

  deleteNote(note: any) {
    // Implement the logic to delete the selected note
  }
}
