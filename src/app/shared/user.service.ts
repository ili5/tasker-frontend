import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginModel} from './models/LoginModel';
import {UserModel} from './models/UserModel';


@Injectable()
export class UserService {
  private _loginUrl = environment.apiUrl + '/clients/web/admin/login';
  private _registerUrl = environment.apiUrl + '/register';
  private httpOptions = {};

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };
  }

  login(email: string, password: string) {
    const body = {
      email: email,
      password: password
    };

    return this.httpClient.post<LoginModel>(this._loginUrl, body, this.httpOptions)
      .map((result) => {
        return new LoginModel().deserialize(result);
      });
  }

  register(name: string, email: string, password: string) {
    const body = {
      name: name,
      email: email,
      password: password
    };

    return this.httpClient.post<UserModel>(this._registerUrl, body, this.httpOptions)
      .map((result) => {
        return new UserModel().deserialize(result.data);
      });
  }

}