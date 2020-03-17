import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { AddpostComponent } from './addpost/addpost.component';
import { HeaderComponent } from './header/header.component';
import { MycategoriesComponent } from './mycategories/mycategories.component';
import { TrenddingComponent } from './trendding/trendding.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'register', component: LoginRegisterComponent },
  { path: 'login', component: LoginRegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'addpost', component: AddpostComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'mycategories', component: MycategoriesComponent },
  { path: 'trendding', component: TrenddingComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
