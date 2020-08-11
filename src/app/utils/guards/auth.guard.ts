import { Injectable } from '@angular/core';
// import { CanActivate, Router,CanActivateChild } from '@angular/router';
// import { AuthService } from '../services/auth.service';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild{
  
  //constructor(private authService: AuthService, private router: Router){}

  // canActivate(){
  //   if(this.authService.isLoggedIn()){
  //     this.router.navigate(['/home']);
  //   }
  //   return !this.authService.isLoggedIn();
  // }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
}
