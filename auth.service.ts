import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const userData = { email, password };
    return this.http.post('http://localhost:3000/api/login', userData)
      .pipe(
        catchError((error) => {
          console.log('Login failed');
          return of(error);
        })
      );
  }

  register(userData: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/register', userData)
      .pipe(
        catchError((error) => {
          console.log('Registration failed');
          return of(error);
        })
      );
  }
}
