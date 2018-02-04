import {Component, Input} from "@angular/core";

@Component({
  selector: 'single-task',
  templateUrl: './single-task.component.html',
})
export class SingleTaskComponent {
  @Input() task = [];
  constructor() {}
}
