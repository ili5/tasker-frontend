import {ProjectComponent} from "./project.component";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AddProjectsComponent} from "./add-projects/add-projects.component";
import {SingleProjectComponent} from "./single-project/single-project.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProjectComponent
      },
      {
        path: 'project/add',
        component: AddProjectsComponent
      },
      {
        path: 'project/:id',
        component: SingleProjectComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {}
