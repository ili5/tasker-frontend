import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {TaskModel} from "./models/TaskModel";

@Injectable()
export class TaskService {
  private _addTaskUrl = environment.apiUrl + '/tasks';
  private headers;
  private options;

  constructor(private http: Http) {
    this.headers = new Headers({
      'Accept'  : 'application/json',
      'Authorization' : 'Bearer ' + localStorage.getItem('accessToken'),
    });
    this.options = new RequestOptions({headers: this.headers});
  }

  addTask(formValues, projectId): Observable <TaskModel> {
    const body = {
      title: formValues.title,
      description: formValues.description,
      assigned_id: formValues.assigned_id,
      board_id: formValues.board_id,
      project_id: projectId
    };
    return this.http.post(this._addTaskUrl, body, this.options)
      .map((response: Response) => {
        return <TaskModel> response.json().data;
      });
  }
}
