import { Injectable } from '@angular/core';
import { GuardsCheckEnd, Router } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  UserSignedIn: boolean;

  constructor(
    private router: Router,
    private userService: UserService,
    ) { }

  token: string
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.token = this.userService.getToken()
    console.log(this.token)
    if (this.token) {
      return true;
    }
    this.router.navigate(['/sign_in']);
    return false;
  }
  
}
