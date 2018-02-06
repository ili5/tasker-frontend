import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ProjectModel} from "../../../../shared/models/ProjectModel";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {ProjectService} from "../../../../shared/project.service";

@Component({
  selector: 'edit-projects',
  templateUrl: './edit-projects.component.html'
})
export class EditProjectsComponent {
  @Input() project: ProjectModel;
  @Output() onProjectEdited: EventEmitter<ProjectModel> = new EventEmitter<ProjectModel>();
  editProjectForm: FormGroup;
  public submitText = 'Edit project';
  modalReference: any;
  errors: any;

  constructor(private projectService: ProjectService,
              private fb: FormBuilder,
              private router: Router,
              private modalService: NgbModal) {
    this.editProjectForm = fb.group({
      'name'  : [null, Validators.required],
      'description' : [null],
      'validate': ''
    });
  }

  open(content) {
    this.editProjectForm.controls['name'].setValue(this.project.name);
    this.editProjectForm.controls['description'].setValue(this.project.description);
    this.errors = {}
    this.modalReference = this.modalService.open(content, {
      backdrop: false,
      beforeDismiss: () => {
        this.editProjectForm.reset();
        this.errors = {};
        return true;
      },
      size: 'lg'
    });
  }

  get name(){
    return this.editProjectForm.get('name');
  }

  editProject(value) {
    this.errors = {};
    this.submitText = 'Please wait...';
    this.projectService.updateProject(this.project.id, value.name, value.description).subscribe(
      (data: ProjectModel) => {
          this.onProjectEdited.emit(data);
          this.modalReference.close();
          this.submitText = 'Edit project';
          this.editProjectForm.reset();
      },
      error => {
        if (error.status === 422) {
          this.errors = error.error.errors;
          this.submitText = 'Edit project';
        }
      }
    );
  }
}
