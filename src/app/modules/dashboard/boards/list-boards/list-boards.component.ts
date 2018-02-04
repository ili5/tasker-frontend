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
}
