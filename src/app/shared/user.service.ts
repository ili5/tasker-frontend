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
  private _getMe = environment.apiUrl + '/me';
  private _searchUser = environment.apiUrl + '/searchusers';
  private httpOptions = {};

  constructor(private httpClient: HttpClient) {
    if (localStorage.getItem('accessToken')) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('accessToken'),
        })
      };
    } else {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        })
      };
    }
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

  me() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('accessToken'),
      })
    };
    return this.httpClient.get<UserModel>(this._getMe, httpOptions)
      .map((result) => {
        const data = result['data'];
        localStorage.setItem('me', JSON.stringify(data));
      });
  }

  checkMe() {
    return this.httpClient.get<UserModel>(this._getMe, this.httpOptions)
      .map((result) => {
        const data = result['data'];
        localStorage.setItem('me', JSON.stringify(data));
        return new UserModel().deserialize(data);
      });
  }

  getMe() {
    return new UserModel().deserialize(localStorage.getItem('accessToken'));
  }

  searchUsers(query: string, projectId: string){
    const body = {
      query: query,
      projectId: projectId
    };
    return this.httpClient.post<UserModel[]>(this._searchUser, body, this.httpOptions)
      .map((result) => {
        const data = result['data'];
        return <UserModel[]> data.map(user => new UserModel().deserialize(user));
      });
  }
}
