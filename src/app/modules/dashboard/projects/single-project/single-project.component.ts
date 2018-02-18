import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../../../../shared/project.service";
import {Subscription} from "rxjs/Subscription";
import {ProjectModel} from "../../../../shared/models/ProjectModel";
import {UserService} from "../../../../shared/user.service";
import {BoardService} from "../../../../shared/board.service";

@Component({
  selector: 'single-project',
  templateUrl: './single-project.component.html',
  styleUrls: ['./single-project.component.scss'],
  providers: [ ProjectService, UserService, BoardService ]
})
export class SingleProjectComponent implements OnInit {
  public projectId;
  private subscription: Subscription;

  public project;
  public associatedUsers;
  public projectOwner;
  public tasks;
  public boards;
  public users = [];

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private userService: UserService,
              private boardService: BoardService) {
    this.projectId = this.route.snapshot.params.id;
    this.subscription = this.projectService.getProject(this.projectId).subscribe(
      data => {
        this.project = data;
        this.associatedUsers = this.project.associatedUsers;
        this.projectOwner = this.project.user;
        this.tasks = this.project.tasks;
        this.boards = this.project.boards;
        this.boardService.changeBoards(this.boards);
        this.users.push(this.projectOwner);
        this.associatedUsers.forEach(user => {
          this.users.push(user);
        });
        this.boards.forEach(board => {
          const tasks = [];
          this.tasks.forEach(task => {
            if (task.board === board.id) {
              tasks.push(task);
            }
          });
          board.tasks = tasks;
        });

        this.userService.changeUsers(this.users);
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {

  }

  projectEdited(project: ProjectModel) {
    this.project.description = project.description;
    this.project.name = project.name;
  }
}
