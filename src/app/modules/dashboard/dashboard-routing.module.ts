import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DashboardComponent} from "./dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        loadChildren: 'app/modules/dashboard/projects/project.module#ProjectModule'
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
