import {Component, Input} from "@angular/core";
import {TaskModel} from "../../../../shared/models/TaskModel";

@Component({
  selector: 'single-task',
  templateUrl: './single-task.component.html',
})
export class SingleTaskComponent {
  @Input() task: TaskModel;
  constructor() {}
}
