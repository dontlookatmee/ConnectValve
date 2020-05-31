import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import {
  CollaborationService,
  Collaboration,
} from '../services/collaboration/collaboration.service';
import { switchMap, take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private cbService: CollaborationService,
    private router: Router
  ) {}

  canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.cbService.getCollaboration(router.params.id).pipe(
      take(1),
      map((cb: Collaboration) =>
        cb.data.allowedPeople.includes(this.authService.getUserId())
          ? true
          : false
      ),
      tap((canSee) => {
        if (!canSee) {
          this.router.navigate(['']);
        }
      })
    );
  }
}
