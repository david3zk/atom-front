import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StorageUtil } from '../../util/storage-util';
import { TokenService } from '../services/token/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenService = inject(TokenService);
  const token = StorageUtil.get('_T');

  if (!token) {
    router.navigate(['/auth']);
    return of(false);
  }

  return tokenService.validToken().pipe(
    map((token) => {
      if (!token) {
        router.navigate(['/auth']);
        return false;
      }
      StorageUtil.set('_T', token);
      return true;
    }),
    catchError(() => {
      router.navigate(['/auth']); 
      return of(false);
    })
  );
  /*return tokenService.validToken().pipe(
    map((token) => {
      if (!token) {
        router.navigate(['/auth']);
        return false;
      }
      StorageUtil.set('_T', token);
      return true;
    }),
    catchError(() => {
      return of(false);
    })
  );*/

}