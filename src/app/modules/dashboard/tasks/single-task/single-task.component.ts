import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TaskModel} from "../../../../shared/models/TaskModel";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BoardModel} from '../../../../shared/models/BoardModel';
import {TaskService} from '../../../../shared/task.service';
import {ProjectModel} from '../../../../shared/models/ProjectModel';
import {ProjectService} from "../../../../shared/project.service";
import {MessageModel} from "../../../../shared/models/MessageModel";

@Component({
  selector: 'single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.scss'],
  providers: [ TaskService ]
})
export class SingleTaskComponent {
  newMessage: MessageModel = new MessageModel();
  task: TaskModel;
  boards: BoardModel[];
  project: ProjectModel;
  @Output() onTaskChanged: EventEmitter<TaskModel> = new EventEmitter<TaskModel>();
  @Output() onTaskDeleted: EventEmitter<string> = new EventEmitter<string>();
  modalReference: any;
  constructor(private modalService: NgbModal,
              private taskService: TaskService,
              private projectService: ProjectService) {
    projectService.currentProjectSource.subscribe(data => {
      this.project = data;
      this.boards = this.project.boards;
    });
  }

  @Input()
  set taskInput(task: TaskModel) {
    this.task = task;
  }

  open(content) {
    this.modalReference = this.modalService.open(content, {
      backdrop: true,
      beforeDismiss: () => {
        return true;
      },
      size: 'lg'
    });
    this.taskService.changeTask(this.task);
  }

  showEdit(): boolean {
    const user = JSON.parse(localStorage.getItem('me'));
    if (this.project.owner || user.id === this.task.creator.id) {
      return true;
    } else {
      return false;
    }
  }

  showChangeStatus(): boolean {
    const user = JSON.parse(localStorage.getItem('me'));
    const assignedUser = this.task.assigned;
    const creatorUser = this.task.creator;
    if (user.id === assignedUser.id || user.id === creatorUser.id && !this.project.owner){
      return true;
    } else {
      return false;
    }
  }

  changeTaskStatus(event, task: TaskModel) {
    const newBoardId = event.target.value;
    this.taskService.changeTaskStatus(newBoardId, task.id).subscribe(data => {
      this.onTaskChanged.emit(data);
    });
  }

  taskEdited(event: TaskModel) {
    if (this.task.board !== event.board) {
      this.onTaskChanged.emit(event);
    }
    this.task = event;
  }

  deleteTask(id) {
    this.taskService.deleteTask(id).subscribe(data => {
        this.onTaskDeleted.emit(id);
        this.modalReference.close();
    });
  }

  addMessage(event) {
    this.newMessage = event;
  }
}
