import {Component, Input} from "@angular/core";
import {MessageService} from "../../../../shared/message.service";
import {MessageModel} from "../../../../shared/models/MessageModel";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'list-messages',
  templateUrl: './list-messages.component.html',
  styleUrls: ['./list-messages.component.scss'],
  providers: [ MessageService ]
})
export class ListMessagesComponent {
  public messages: MessageModel[] = [];
  editMessageForm: FormGroup;

  constructor(private messageService: MessageService,
              private fb: FormBuilder){
    this.editMessageForm = fb.group({
      'message' : [null, Validators.required]
    });
  }

  @Input()
  set taskId(input) {
    this.messageService.getAll(input).subscribe(data => {
      this.messages = data;
    });
  }

  @Input()
  set newMessage(message) {
    if (message.id) {
      this.messages.push(message);
    }
  }

  showEdit(message: MessageModel) {
    this.messages.forEach((existingMessages) => existingMessages.showEdit = false);
    (message.showEdit) ? message.showEdit = false : message.showEdit = true;
    this.editMessageForm.controls['message'].setValue(message.message);
  }

  closeEdit(message: MessageModel) {
    message.showEdit = false;
  }

  editMessage(message, id) {
    this.messageService.editMessage(message, id).subscribe(data => {
      const editedMessage = this.messages.find(existingMessage => existingMessage.id === data.id);
      const index = this.messages.indexOf(editedMessage);
      this.messages[index] = data;
    });
  }

  deleteMessage(messageId) {
    this.messageService.deleteMessage(messageId).subscribe(data => {
      this.messages = this.messages.filter(message => message.id !== messageId);
    });
  }


  get message() {
    return this.editMessageForm.get('message');
  }
}
