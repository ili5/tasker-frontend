import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../shared/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ UserService ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public submitText = 'Login';

  constructor(private fb: FormBuilder, private _userService: UserService, private router: Router) {
    this.loginForm = fb.group({
      'email' : [null, Validators.required],
      'password': [null, Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])],
      'validate': ''
    });
  }
  ngOnInit() {}

  login(values) {
    this.submitText = 'Please wait...';
    this._userService.login(values.email, values.password).subscribe(
      data => {
        localStorage.setItem('accessToken', data.access_token);
        localStorage.setItem('expiresIn', data.expires_in);
        localStorage.setItem('refreshToken', data.refresh_token);
        localStorage.setItem('tokenType', data.token_type);
        this._userService.me().subscribe();
        this.router.navigateByUrl('/dashboard');
      },
      error => {
        console.log(error);
      }
    );
  }
}
