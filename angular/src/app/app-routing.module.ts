import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DetailsComponent } from './details/details.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  { path: "", component:HomeComponent },
  { path: "logout", component:LogoutComponent },
  { path: "login", component:LoginComponent },
  { path: "register", component:RegisterComponent },
  { path: "details/:code", component:DetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
