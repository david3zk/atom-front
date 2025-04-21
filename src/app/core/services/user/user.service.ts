import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from '../../../models/user.model';
import { environment } from '../../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { UserReponse } from '../../../models/user-reponse.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = `${environment.apiUrl}/users`;
  constructor(private http: HttpClient) { }

  getByEmail(email: string): Observable<UserReponse> {
    return this.http.get<UserReponse>(`${this.apiUrl}/${email}`, {
      headers: new HttpHeaders({ 'skip-auth': 'true' }),
    }).pipe(
      catchError(this.handleError)
    );
  }

  create(data: User): Observable<UserReponse> {
    return this.http.post<UserReponse>(this.apiUrl, data, {
      headers: new HttpHeaders({ 'skip-auth': 'true' }),
    }).pipe(
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