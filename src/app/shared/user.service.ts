import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import {environment} from "../../environments/environment";
import 'rxjs/add/operator/map';


@Injectable()
export class UserService {
  private _loginUrl = environment.apiUrl + '/clients/web/admin/login';
  private _registerUrl = environment.apiUrl + '/register';

  constructor(private http: Http) {}

  login(email: string, password: string) {
    const body = {
      email: email,
      password: password
    };
    const headers = new Headers({
      'Accept'  : 'application/json',
      'Content-Type'  : 'application/json',
    });

    const options = new RequestOptions({
      headers: headers
    });

    return this.http.post(this._loginUrl, body, options)
      .map((res: Response) => res.json());
  }

  register(name: string, email: string, password: string) {
    const body = {
      name: name,
      email: email,
      password: password
    };

    const headers = new Headers({
      'Accept'  : 'application/json',
      'Content-Type'  : 'application/json',
    });

    const options = new RequestOptions({
      headers: headers
    });

    return this.http.post(this._registerUrl, body, options)
      .map((res: Response) => res.json());
  }

}
