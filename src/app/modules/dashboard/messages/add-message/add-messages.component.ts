import {Component, EventEmitter, Input, Output} from "@angular/core";
import {MessageService} from "../../../../shared/message.service";
import {MessageModel} from "../../../../shared/models/MessageModel";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'add-messages',
  templateUrl: './add-messages.component.html',
  styleUrls: ['./add-messages.component.scss'],
  providers: [ MessageService ]
})
export class AddMessagesComponent {
  @Input() taskId: string;
  @Output() onMessageAdded: EventEmitter<MessageModel> = new EventEmitter<MessageModel>();
  addMessageForm: FormGroup;
  public submitText = 'Add Comment';
  errors: any;

  constructor(private messageService: MessageService,
              private fb: FormBuilder) {
    this.addMessageForm = fb.group({
      'message' : [null, Validators.required]
    });
  }

  addMessage(values) {
    this.submitText = 'Please wait...';
    this.messageService.addMessage(values, this.taskId).subscribe(data => {
      this.submitText = 'Add Comment';
      this.onMessageAdded.emit(data);
      this.addMessageForm.reset();
    }, error => {
      if (error.status === 422) {
        this.errors = error.error.errors;
        this.submitText = 'Add Project';
      }
    });
  }

  get message(){
    return this.addMessageForm.get('message');
  }
}
