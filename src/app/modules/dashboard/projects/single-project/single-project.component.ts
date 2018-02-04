import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../../../../shared/project.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'single-project',
  templateUrl: './single-project.component.html',
  styleUrls: ['./single-project.component.scss'],
  providers: [ ProjectService ]
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
              private projectService: ProjectService) {
    this.projectId = this.route.snapshot.params.id;
    this.subscription = this.projectService.getProject(this.projectId).subscribe(
      data => {
        this.project = data;
        this.associatedUsers = this.project.associatedUsers.data;
        this.projectOwner = this.project.user.data;
        this.tasks = this.project.tasks.data;
        this.boards = this.project.boards.data;
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
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {

  }
}
