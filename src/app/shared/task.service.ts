import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Observable";
import {TaskModel} from "./models/TaskModel";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class TaskService {
  private _addTaskUrl = environment.apiUrl + '/tasks';
  private _editTaskUrl = environment.apiUrl + '/tasks/';
  private headers;
  private options;
  private taskSource = new BehaviorSubject<TaskModel>(
    new TaskModel()
  );
  currentTask = this.taskSource.asObservable();

  constructor(private httpClient: HttpClient) {
    this.options = {
      headers: new HttpHeaders({
        'Accept'  : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('accessToken'),
      })
    };
  }

  addTask(formValues, projectId): Observable <TaskModel> {
    const body = {
      title: formValues.title,
      description: formValues.description,
      assigned_id: formValues.assigned_id,
      board_id: formValues.board_id,
      due_date: formValues.due_date,
      project_id: projectId
    };
    return this.httpClient.post(this._addTaskUrl, body, this.options)
      .map((result) => {
        const data = result['data'];
        return <TaskModel> new TaskModel().deserialize(data);
      });
  }

  editTask(formValues, taskId): Observable <TaskModel> {
    const body = {
      title: formValues.title,
      description: formValues.description,
      assigned_id: formValues.assigned_id,
      board_id: formValues.board_id,
      due_date: formValues.due_date,
    };
    return this.httpClient.patch(this._editTaskUrl + taskId, body, this.options)
      .map((response) => {
        const data = response['data'];
        return <TaskModel> new TaskModel().deserialize(data);
      });
  }

  changeTaskStatus(boardId, taskId) {
    const body = {
      board_id: boardId,
    };

    return this.httpClient.patch(this._editTaskUrl + taskId, body, this.options)
      .map((response) => {
        const data = response['data'];
        return <TaskModel> new TaskModel().deserialize(data);
      });
  }

  changeTask(task: TaskModel) {
    this.taskSource.next(task);
  }
}
