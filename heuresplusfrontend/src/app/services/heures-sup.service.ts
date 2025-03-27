import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeuresSupService {
  private apiUrl = 'http://localhost:8089/api/heures-sup';

  constructor(private http: HttpClient) {}

  calculateOvertimeCost(
    employeId: number,
    startDate: string,
    endDate: string
  ): Observable<number> {
    return this.http
      .get<number>(
        `${this.apiUrl}/calculate?employeId=${employeId}&startDate=${startDate}&endDate=${endDate}`
      )
      .pipe(catchError(this.handleError));
  }

  // Error Handling Function
  private handleError(error: any) {
    console.error('Error:', error);
    return throwError(
      () => new Error('Failed to fetch overtime cost. Please try again.')
    );
  }
}
