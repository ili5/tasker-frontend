import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {LayoutComponent} from "./components/layout/layout.component";
import {CanActivateGuard} from "./shared/canActivateGuard";
import {LogoutComponent} from "./components/logout/logout.component";

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'dashboard',
    component: LayoutComponent,
    loadChildren: 'app/modules/dashboard/dashboard.module#DashboardModule',
    canActivate: [CanActivateGuard]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
