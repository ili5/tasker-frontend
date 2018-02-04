import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {ProjectModel} from "./models/ProjectModel";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProjectService {
  private _getAllProjects = environment.apiUrl + '/projects';
  private _postAllProjects = environment.apiUrl + '/projects';
  private _getProject = environment.apiUrl + '/projects/';
  private headers;
  private options;

  constructor(private http: Http, private router: Router) {
    this.headers = new Headers({
        'Accept'  : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('accessToken'),
    });
    this.options = new RequestOptions({headers: this.headers});
  }

  getProjects(): Observable <ProjectModel[]> {
    return this.http.get(this._getAllProjects, this.options)
      .map((response: Response) => {
        return <ProjectModel[]> response.json().data;
      });
  }

  addProject(projectName: string, projectDescription: string): Observable <ProjectModel> {
    const body = {
      name: projectName,
      description: projectDescription
    };
    return this.http.post(this._postAllProjects, body, this.options)
      .map((response: Response) => {
        return <ProjectModel> response.json().data;
      });
  }

  getProject(projectId: string): Observable <ProjectModel> {
    return this.http.get(this._getProject + projectId, this.options)
      .map((response: Response) => {
        return <ProjectModel> response.json().data;
      });
  }
}
