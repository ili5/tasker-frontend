import {Component, Input} from "@angular/core";
import {UserModel} from "../../../shared/models/UserModel";

@Component({
  selector: 'associated-users',
  templateUrl: './associated-users.component.html'
})
export class AssociatedUsersComponent {
  @Input() users = [];
  @Input() projectOwner: UserModel = new UserModel();

  constructor() {

  }
}
