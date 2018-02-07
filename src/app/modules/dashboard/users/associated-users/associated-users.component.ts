import {Component, Input} from "@angular/core";
import {ProjectService} from "../../../../shared/project.service";
import {UserModel} from "../../../../shared/models/UserModel";

@Component({
  selector: 'associated-users',
  templateUrl: './associated-users.component.html',
  styleUrls: ['./associated-users.component.scss']
})
export class AssociatedUsersComponent {
  @Input() users = [];
  @Input() projectOwner: UserModel = new UserModel();
  @Input() projectId: string;

  constructor(private projectService: ProjectService) {
  }

  checkOwner(): boolean {
    const userFromLocalStorage = new UserModel().deserialize(JSON.parse(localStorage.getItem('me')));
    if (this.projectOwner && this.projectOwner.id === userFromLocalStorage.id) {
      return true;
    } else {
      return false;
    }
  }

  removeUser(userId: string) {
    this.projectService.removeAssociatedUser(this.projectId, userId).subscribe(
      data => {
        this.users = this.users.filter(user => user.id !== userId);
      }
    );
  }

  addUser(user: UserModel) {
    this.users.push(user);
  }
}
