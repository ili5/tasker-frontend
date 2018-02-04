import {Component, OnInit} from "@angular/core";
import {ProjectService} from "../../../../shared/project.service";
import {Subscription} from "rxjs/Subscription";
import {ProjectModel} from "../../../../shared/models/ProjectModel";

@Component({
  selector: 'list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.scss'],
  providers: [
    ProjectService
  ]
})
export class ListProjectsComponent implements OnInit {
  private subscription: Subscription;
  public projects: ProjectModel[] = [];
  public loading = false;

  constructor(public projectService: ProjectService) {}

  ngOnInit() {
    this.loading = true;
    this.subscription = this.projectService.getProjects().subscribe(
      result  =>  {
        this.projects = result;
        this.loading = false;
      },
      error =>  {
        console.log(error);
      }
    );
  }
}
