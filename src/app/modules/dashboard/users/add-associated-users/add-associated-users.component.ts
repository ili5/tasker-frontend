import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ProjectService} from "../../../../shared/project.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserModel} from "../../../../shared/models/UserModel";
import {UserService} from "../../../../shared/user.service";

@Component({
  selector: 'add-associated-users',
  templateUrl: './add-associated-users.component.html',
  styleUrls: ['./add-associated-users.component.scss'],
  providers: [UserService]
})
export class AddAssociatedUsersComponent {
  searchUserForm: FormGroup;
  @Input() projectId: string;
  @Output() onUserAdded: EventEmitter<UserModel> = new EventEmitter<UserModel>();
  users: UserModel[];
  public submitText = 'Find';
  modalReference: any;
  errors: any;

  constructor(private projectService: ProjectService,
              private userService: UserService,
              private fb: FormBuilder,
              private modalService: NgbModal) {
    this.searchUserForm = fb.group({
      'query'  : [null, Validators.required],
      'validate': ''
    });
  }

  get query(){
    return this.searchUserForm.get('query');
  }

  open(content) {
    this.errors = {};
    this.modalReference = this.modalService.open(content, {
      backdrop: false,
      beforeDismiss: () => {
        this.searchUserForm.reset();
        this.users = null;
        this.errors = {};
        return true;
      },
      size: 'lg'
    });
  }

  search(values) {
    this.users = null;
    this.errors = {};
    this.submitText = 'Please wait...';
    this.userService.searchUsers(values.query, this.projectId).subscribe(
      (data) => {
        this.users = data;
        this.submitText = 'Find';
      }
    );
  }

  addUserToProject(userId: string) {
    const chosenUser = this.users.find(user => user.id === userId);
    this.onUserAdded.emit(chosenUser);
    this.users = this.users.filter(user => user.id !== userId);
    this.searchUserForm.reset();
    this.modalReference.dismiss();
    this.projectService.addAssociatedUser(this.projectId, userId).subscribe();
  }
}
