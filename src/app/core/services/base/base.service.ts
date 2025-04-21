import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export abstract class BaseService<T> {
  constructor(
    protected http: HttpClient,
    private baseUrl: string
  ) { }

  getAll(queryParams?: any): Observable<T[]> {
    let uri = this.baseUrl + '/all';
    if (queryParams) {
      let keys = Object.keys(queryParams);
      for (let i = 0; i < keys.length; i++) {
        uri += (i != 0 ? '&' : '?') + keys[i] + '=' + queryParams[keys[i]];
      }
    }
    return this.http.get<T[]>(uri).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  create(data: Partial<T>): Observable<T> {
    return this.http.post<T>(this.baseUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  update(id: string, data: Partial<T>): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  protected handleError(error: HttpErrorResponse): Observable<never> {
    const message =
      error.error instanceof ErrorEvent
        ? `Error del cliente: ${error.error.message}`
        : `Error del servidor: ${error.status} - ${error.message}`;
    console.error(message);
    return throwError(() => new Error(message));
  }
}
