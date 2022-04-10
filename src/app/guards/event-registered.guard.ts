import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventRegisteredGuard implements CanActivate {

  constructor(
    private store: Store,
    private router: Router
  ) { }

  getSate(): Observable<any> {
    return this.store.select(state => state);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.getSate()
      .pipe(
        switchMap((state) => {
          if (state.eventInfoEntries && state.eventInfoEntries.id === -1) {
            this.router.navigate(['/']);
            return of(false);
          } else {
            return of(true);
          }
        })
      );
  }

}
