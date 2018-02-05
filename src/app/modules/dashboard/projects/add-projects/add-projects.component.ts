import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {ProjectService} from "../../../../shared/project.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProjectModel} from "../../../../shared/models/ProjectModel";

@Component({
  selector: 'add-project',
  templateUrl: './add-projects.component.html',
  styleUrls: ['add-projects.component.scss'],
  providers: [ ProjectService ]
})
export class AddProjectsComponent implements OnInit {
  addProjectForm: FormGroup;
  @Output() onProjectAdded: EventEmitter<ProjectModel> = new EventEmitter<ProjectModel>();
  public submitText = 'Add project';
  modalReference: any;

  constructor(private projectService: ProjectService,
              private fb: FormBuilder,
              private router: Router,
              private modalService: NgbModal) {
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
      (data: ProjectModel) => {
          this.onProjectAdded.emit(data);
          this.modalReference.close();
      },
      error =>  {
        console.log(error);
      }
    );
  }

  open(content) {
    this.modalReference = this.modalService.open(content);
  }

  get name(){
    return this.addProjectForm.get('name');
  }
}
