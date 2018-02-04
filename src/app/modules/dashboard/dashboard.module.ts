import {NgModule} from "@angular/core";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {ProjectComponent} from "./projects/project.component";
import {DashboardComponent} from "./dashboard.component";
import {TaskComponent} from "./task/task.component";

@NgModule({
  imports: [
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule {}
