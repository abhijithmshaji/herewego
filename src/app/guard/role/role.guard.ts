import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';
import { from, map } from 'rxjs';
import { AuthService } from '../../shared/auth-service/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRole = route.data?.['role'];

  return from(authService.getUserRole()).pipe(
    map((role) => {
      if (role === expectedRole) {
        return true;
      } else {
        return router.createUrlTree(['/unauthorized']);
      }
    })
  );
};
