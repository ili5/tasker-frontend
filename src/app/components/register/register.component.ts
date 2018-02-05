import {Component, OnInit} from "@angular/core";
import {UserService} from "../../shared/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ UserService ]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  public submitText = "Register";
  public success = false;

  constructor(private fb: FormBuilder, private _userService: UserService, private router: Router) {
    this.registerForm = fb.group({
      'name'  : [null, Validators.required],
      'email' : [null, Validators.required],
      'password': [null, Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])],
      'validate': ''
    });
  }
  ngOnInit() {}

  register(values) {
    this.submitText = "Please wait...";
    this._userService.register(values.name, values.email, values.password).subscribe(data => this.success = true,
    error => {
      console.log(error);
    });
  }
}
