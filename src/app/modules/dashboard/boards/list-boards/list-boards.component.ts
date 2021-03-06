import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'list-boards',
  templateUrl: './list-boards.component.html',
  styleUrls: ['./list-boards.component.scss']
})
export class ListBoardsComponent implements OnInit {
  @Input() boards = [];
  @Input() projectId = '';
  @Input() users = [];
  constructor() {
  }

  ngOnInit() {
  }

  taskChanged(event) {
    const task = event;
    this.boards.forEach(board => {
      board.tasks = board.tasks.filter(existingTask => existingTask.id !== task.id);
      if (task.board === board.id) {
        board.tasks.push(task);
      }
    });
  }

  taskDeleted(event) {
    const id = event;
    this.boards.forEach(board => {
      board.tasks = board.tasks.filter(existingTask => existingTask.id !== id);
    });
  }
}
