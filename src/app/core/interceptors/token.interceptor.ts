import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageUtil } from '../../util/storage-util';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = StorageUtil.get('_T')//localStorage.getItem('_T');

    if (req.headers.has('skip-auth')) {
      const cloned = req.clone({ headers: req.headers.delete('skip-auth') });
      return next.handle(cloned);
    }

    const clonedReq = token
      ? req.clone({ setHeaders: { 'x-token-auth': token } })
      : req;

    return next.handle(clonedReq);
  }
}
