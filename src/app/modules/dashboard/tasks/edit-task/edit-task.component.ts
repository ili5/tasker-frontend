import {Component, EventEmitter, Output} from "@angular/core";
import {NgbDateStruct, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../../../shared/task.service";
import {TaskModel} from "../../../../shared/models/TaskModel";
import {UserModel} from "../../../../shared/models/UserModel";
import {UserService} from "../../../../shared/user.service";
import {BoardService} from "../../../../shared/board.service";
import {BoardModel} from "../../../../shared/models/BoardModel";
import {DatePipe} from "@angular/common";
import {ProjectModel} from "../../../../shared/models/ProjectModel";

@Component({
  selector: 'edit-task',
  templateUrl: './edit-task.component.html',
  providers: [ DatePipe ]
})
export class EditTaskComponent {
  @Output() onTaskEdited: EventEmitter<TaskModel> = new EventEmitter<TaskModel>();
  users: UserModel[];
  boards: BoardModel[];
  task: TaskModel;
  dueDate: NgbDateStruct;
  submitText = 'Edit task';
  editTaskForm: FormGroup;
  modalReference: any;

   constructor(private modalService: NgbModal,
               private taskService: TaskService,
               private userService: UserService,
               private boardService: BoardService,
               private datePipe: DatePipe,
               private fb: FormBuilder) {
     this.editTaskForm = fb.group({
       'title'  : [null, Validators.required],
       'description'  : [null, Validators.required],
       'assigned_id'  : [null, Validators.required],
       'board_id' : [null, Validators.required],
       'due_date' : [null, Validators.required]
     });

   }

   editTask(values) {
     values.due_date = values.due_date.year + '-' + values.due_date.month + '-' + values.due_date.day + ' 00:00:00';
     this.taskService.editTask(values, this.task.id).subscribe(data => {
       this.taskService.changeTask(data);
       this.onTaskEdited.emit(data);
       this.modalReference.close();
     });
   }

   open(content) {
     this.modalReference = this.modalService.open(content,  {
       backdrop: true,
       beforeDismiss: () => {
         return true;
       },
       size: 'lg'
     });
     this.userService.currentUsers.subscribe(data => {
       this.users = data;
     });
     this.boardService.currentBoards.subscribe(data => {
       this.boards = data;
     });
     this.taskService.currentTask.subscribe(data => {
       this.task = data;
       this.editTaskForm.controls['title'].setValue(this.task.title);
       this.editTaskForm.controls['description'].setValue(this.task.description);
       this.editTaskForm.controls['assigned_id'].setValue(this.task.assigned.id);
       this.editTaskForm.controls['board_id'].setValue(this.task.board);
       const due_date = new Date(this.task.due_date.date);
       this.dueDate = {
         year: due_date.getFullYear(),
         month: due_date.getMonth() + 1,
         day: due_date.getDate()
       };
     });
   }
}
