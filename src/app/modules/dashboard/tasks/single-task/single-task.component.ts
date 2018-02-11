import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TaskModel} from "../../../../shared/models/TaskModel";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BoardModel} from '../../../../shared/models/BoardModel';
import {TaskService} from '../../../../shared/task.service';
import {ProjectModel} from '../../../../shared/models/ProjectModel';
import {ProjectService} from "../../../../shared/project.service";

@Component({
  selector: 'single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.scss'],
  providers: [ TaskService ]
})
export class SingleTaskComponent {
  @Input() task: TaskModel;
  boards: BoardModel[];
  project: ProjectModel;
  @Output() onTaskStatusChanged: EventEmitter<TaskModel> = new EventEmitter<TaskModel>();
  modalReference: any;
  constructor(private modalService: NgbModal,
              private taskService: TaskService,
              private projectService: ProjectService) {
    projectService.currentProjectSource.subscribe(data => {
      this.project = data;
      this.boards = this.project.boards;
    });
  }

  open(content) {
    this.modalReference = this.modalService.open(content, {
      backdrop: true,
      beforeDismiss: () => {
        return true;
      },
      size: 'lg'
    });
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
    if (this.project.owner || user.id === assignedUser.id || user.id === creatorUser.id ){
      return true;
    } else {
      return false;
    }
  }

  changeTaskStatus(event, task: TaskModel) {
    const newBoardId = event.target.value;
    this.taskService.changeTaskStatus(newBoardId, task.id).subscribe(data => {

    });
  }
}
