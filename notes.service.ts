import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private apiUrl = 'http://localhost:3000/api/notes'; // Replace with your backend API endpoint

  constructor(private http: HttpClient) { }

  getNotes(headers?: HttpHeaders): Observable<any> {
    return this.http.get(this.apiUrl, { headers });
  }

  createNote(note: any): Observable<any> {
    return this.http.post(this.apiUrl, note);
  }

  updateNote(noteId: string, updatedNote: any): Observable<any> {
    const url = `${this.apiUrl}/${noteId}`;
    return this.http.put(url, updatedNote);
  }

  deleteNote(noteId: string): Observable<any> {
    const url = `${this.apiUrl}/${noteId}`;
    return this.http.delete(url);
  }
}
