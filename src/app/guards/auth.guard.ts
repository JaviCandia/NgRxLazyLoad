import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router} from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      tap((isAuthenticated) => {
        if (!isAuthenticated) { this.router.navigate(['/login']); }
      })
    );
  }

  canLoad() {
    return this.authService.isAuthenticated().pipe(
      tap((isAuthenticated) => {
        if (!isAuthenticated) { this.router.navigate(['/login']); }
      }),
      take(1)
    );
  }
}
