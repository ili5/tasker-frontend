import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";

@Injectable()
export class CanActivateGuard implements CanActivate {
  constructor (public router: Router) {}

  canActivate() {
    if(localStorage.getItem('accessToken') === null) {
      this.router.navigateByUrl('/');
    }

    return (localStorage.getItem('accessToken') !== null);
  }

}
