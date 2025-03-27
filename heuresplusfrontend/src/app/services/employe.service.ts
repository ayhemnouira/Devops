import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Employe } from '../models/employe';

@Injectable({
  providedIn: 'root',
})
export class EmployeService {
  private apiUrl = 'http://localhost:8089/api/employes'; // Ensure this URL is correct

  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getEmployes(): Observable<Employe[]> {
    return this.http
      .get<Employe[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  addEmploye(employe: Employe): Observable<Employe> {
    return this.http
      .post<Employe>(this.apiUrl, employe, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
