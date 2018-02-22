import {NgModule} from "@angular/core";
import {ProjectRoutingModule} from "./project-routing.module";
import {ProjectComponent} from "./project.component";
import {ListProjectsComponent} from "./list-projects/list-projects.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AddProjectsComponent} from "./add-projects/add-projects.component";
import {SingleProjectComponent} from "./single-project/single-project.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ListBoardsComponent} from "../boards/list-boards/list-boards.component";
import {SingleTaskComponent} from "../tasks/single-task/single-task.component";
import {AddTaskComponent} from "../tasks/add-taks/add-task.component";
import {MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule} from "@angular/material";
import {MomentModule} from "angular2-moment";
import {EditProjectsComponent} from "./edit-projects/edit-projects.component";
import {AssociatedUsersComponent} from "../users/associated-users/associated-users.component";
import {AddAssociatedUsersComponent} from "../users/add-associated-users/add-associated-users.component";
import {EditTaskComponent} from "../tasks/edit-task/edit-task.component";
import {ListMessagesComponent} from "../messages/list-messages/list-messages.component";
import {AddMessagesComponent} from "../messages/add-message/add-messages.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProjectRoutingModule,
    NgbModule.forRoot(),
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MomentModule
  ],
  declarations: [
    ProjectComponent,
    ListProjectsComponent,
    AddProjectsComponent,
    EditProjectsComponent,
    SingleProjectComponent,
    AssociatedUsersComponent,
    AddAssociatedUsersComponent,
    ListBoardsComponent,
    SingleTaskComponent,
    AddTaskComponent,
    EditTaskComponent,
    ListMessagesComponent,
    AddMessagesComponent,
  ]
})
export class ProjectModule {}
