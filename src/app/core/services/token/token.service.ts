import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly apiUrl = `${environment.apiUrl}/valid`;
  constructor(private http: HttpClient) { }

  validToken(): Observable<string> {
    return this.http.get<string>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const message =
      error.error instanceof ErrorEvent
        ? `Error del cliente: ${error.error.message}`
        : `Error del servidor: ${error.status} - ${error.message}`;
    console.error(message);
    return throwError(() => new Error(message));
  }
}
