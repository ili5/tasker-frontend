import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {ProjectModel} from "./models/ProjectModel";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserModel} from "./models/UserModel";

@Injectable()
export class ProjectService {
  private _getAllProjectsUrl = environment.apiUrl + '/projects';
  private _postAllProjectsUrl = environment.apiUrl + '/projects';
  private _getProjectUrl =  environment.apiUrl + '/projects/';
  private _deleteProjectUrl = environment.apiUrl + '/projects/';
  private _patchProjectUrl = environment.apiUrl + '/projects/';
  private _deleteAssociatedUserUrl = environment.apiUrl + '/associatedusers/';
  private _addAssociatedUserUrl = environment.apiUrl + '/associatedusers/';
  private options;

  constructor(private http: Http, private router: Router, private httpClient: HttpClient) {
    this.options = {
      headers: new HttpHeaders({
        'Accept'  : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('accessToken'),
      })
    };
  }

  getProjects() {
    return this.httpClient.get<ProjectModel[]>(this._getAllProjectsUrl, this.options)
      .map((result) => {
        const data = result['data'];
        return <ProjectModel[]> data.map(project => new ProjectModel().deserialize(project));
      });
  }

  addProject(projectName: string, projectDescription: string) {
    const body = {
      name: projectName,
      description: projectDescription
    };
    return this.httpClient.post(this._postAllProjectsUrl, body, this.options)
      .map((response) => {
        const data = response['data'];
        return <ProjectModel> new ProjectModel().deserialize(data);
      });
  }

  updateProject(id: string, name: string, description: string) {
    const body = {
      name: name,
      description: description
    };
    return this.httpClient.patch(this._patchProjectUrl + id, body, this.options)
      .map((response) => {
        const data = response['data'];
        return <ProjectModel> new ProjectModel().deserialize(data);
      });
  }

  getProject(projectId: string) {
    return this.httpClient.get(this._getProjectUrl + projectId, this.options)
      .map((result) => {
        const data = result['data'];
        return <ProjectModel> new ProjectModel().deserialize(data);
      });
  }

  deleteProject(projectId: string) {
    return this.httpClient.delete(this._deleteProjectUrl + projectId, this.options);
  }

  removeAssociatedUser(projectId: string, userId: string) {
    return this.httpClient.delete(this._deleteAssociatedUserUrl + projectId + '/' + userId, this.options);
  }

  addAssociatedUser(projectId: string, userId: string) {
    const body = {
      projectId: projectId,
      userId: userId
    };

    return this.httpClient.post(this._addAssociatedUserUrl, body, this.options)
      .map((result) => {
        const data = result['data'];
        return <UserModel> new UserModel().deserialize(data);
      });
  }
}
