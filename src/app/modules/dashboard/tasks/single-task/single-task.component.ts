import {Component, Input} from "@angular/core";
import {TaskModel} from "../../../../shared/models/TaskModel";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.scss']
})
export class SingleTaskComponent {
  @Input() task: TaskModel;
  modalReference: any;
  constructor(private modalService: NgbModal) {}

  open(content) {
    this.modalReference = this.modalService.open(content, {
      backdrop: false,
      beforeDismiss: () => {
        return true;
      },
      size: 'lg'
    });
  }
}
