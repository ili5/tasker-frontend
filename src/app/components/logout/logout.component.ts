import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'logout',
  template: '',
})
export class LogoutComponent {
  constructor(private _router: Router) {
    localStorage.clear();
    this._router.navigateByUrl('/');
  }
}
