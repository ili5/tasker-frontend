import {Component, Input, OnInit} from "@angular/core";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TaskService} from "../../../../shared/task.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'add-task',
  templateUrl: './add-task.component.html',
  providers: [ TaskService ]
})
export class AddTaskComponent implements OnInit {
  closeResult: string;
  @Input() projectId;
  @Input() boardId;
  @Input() boards;
  @Input() users;
  addTaskForm: FormGroup;
  modalReference: any;
  public submitText = 'Add Task';

  constructor(private modalService: NgbModal,
              private taskService: TaskService,
              private fb: FormBuilder) {
    this.addTaskForm = fb.group( {
      'title'  : [null, Validators.required],
      'description'  : [null, Validators.required],
      'assigned_id' : [null, Validators.required],
      'board_id' : [null, Validators.required]
    });

  }
  ngOnInit() {

  }

  addTask(values) {
    this.submitText = 'Please wait...';
    this.taskService.addTask(values, this.projectId).subscribe(
      data => {
        this.modalReference.close();
        this.boards.forEach(board => {
          if (data.board && board.id === data.board) {
            board.tasks.push(data);
          }
        });

      },
      error => {
        console.log(error);
      }
    );
  }

  open(content) {
    this.addTaskForm.controls['board_id'].setValue(this.boardId);
    this.modalReference = this.modalService.open(content);
  }
}
