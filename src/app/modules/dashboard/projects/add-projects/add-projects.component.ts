import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {ProjectService} from "../../../../shared/project.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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
  errors: any;

  constructor(private projectService: ProjectService,
              private fb: FormBuilder,
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
    this.errors = {};
    this.submitText = 'Please wait...';
    this.projectService.addProject(values.name, values.description).subscribe(
      (data: ProjectModel) => {
          this.onProjectAdded.emit(data);
          this.modalReference.dismiss();
          this.submitText = 'Add Project';
          this.addProjectForm.reset();
      },
      error =>  {
          if (error.status === 422) {
            this.errors = error.error.errors;
            this.submitText = 'Add Project';
          }

      }
    );
  }

  open(content) {
    this.errors = {};
    this.modalReference = this.modalService.open(content, {
      backdrop: false,
      beforeDismiss: () => {
        this.addProjectForm.reset();
        this.errors = {};
        return true;
      },
      size: 'lg'
    });
  }

  get name(){
    return this.addProjectForm.get('name');
  }
}
