import {Component, OnInit} from "@angular/core";
import {ProjectService} from "../../../../shared/project.service";
import {Subscription} from "rxjs/Subscription";
import {ProjectModel} from "../../../../shared/models/ProjectModel";
import {Router} from "@angular/router";

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

  constructor(public projectService: ProjectService, private router: Router) {}

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

  public addProject(project: ProjectModel) {
    this.projects.push(project);
  }

  public editProject(project: ProjectModel) {
    this.projects.map((existingProject, i) => {
      if (existingProject.id === project.id) {
        this.projects[i] = project;
      }
    });
  }

  public deleteProject(id: string) {
    this.projectService.deleteProject(id).subscribe();
    this.projects = this.projects.filter(project => project.id !== id);
  }
}
