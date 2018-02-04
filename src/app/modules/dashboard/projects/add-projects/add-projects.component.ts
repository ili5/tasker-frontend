import {Component, OnInit} from "@angular/core";
import {ProjectService} from "../../../../shared/project.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'add-project',
  templateUrl: './add-projects.component.html',
  styleUrls: ['add-projects.component.scss'],
  providers: [ ProjectService ]
})
export class AddProjectsComponent implements OnInit {
  addProjectForm: FormGroup;
  public submitText = 'Add project';

  constructor(private projectService: ProjectService,
              private fb: FormBuilder,
              private router: Router) {
    this.addProjectForm = fb.group({
      'name'  : [null, Validators.required],
      'description' : [null],
      'validate': ''
    });
  }

  ngOnInit() {

  }

  addProject(values) {
    this.submitText = 'Please wait...';
    this.projectService.addProject(values.name, values.description).subscribe(
      data => {
        this.router.navigateByUrl('/dashboard');
      },
      error =>  {
        console.log(error);
      }
    );
  }
}
