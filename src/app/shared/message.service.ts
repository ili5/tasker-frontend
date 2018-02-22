import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {MessageModel} from "./models/MessageModel";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import 'rxjs/add/operator/map';

@Injectable()
export class MessageService {
  private _messagesUrl = environment.apiUrl + '/messages';
  private options;
  private messageSource = new BehaviorSubject<MessageModel>(
    new MessageModel()
  );
  currentMessage = this.messageSource.asObservable();

  constructor(private httpClient: HttpClient) {
    this.options = {
      headers: new HttpHeaders({
        'Accept'  : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('accessToken'),
      })
    };
  }

  getAll(taskId) {
    return this.httpClient.get<MessageModel[]>(this._messagesUrl + '/' + taskId + '?orderBy=created_at&sortedBy=asc', this.options)
      .map((result) => {
        const data = result['data'];
        return <MessageModel[]> data.map(message => new MessageModel().deserialize(message));
      });
  }

  addMessage(values, taskId) {
    const body = {
      'message' :  values.message
    };
    return this.httpClient.post<MessageModel>(this._messagesUrl + '/' + taskId, body, this.options)
      .map((result) =>  {
        const data = result['data'];
        return <MessageModel> new MessageModel().deserialize(data);
      });
  }

  editMessage(values, messageId) {
    const body = {
      'message' : values.message
    };
    return this.httpClient.patch<MessageModel>(this._messagesUrl + '/' + messageId, body, this.options)
      .map((result) => {
        const data = result['data'];
        return <MessageModel> new MessageModel().deserialize(data);
      });
  }

  deleteMessage(messageId) {
    return this.httpClient.delete(this._messagesUrl + '/' + messageId, this.options)
      .map((result) => {
        return result;
      });
  }
}
