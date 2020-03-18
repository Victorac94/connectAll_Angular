import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { HeaderComponent } from './header/header.component';
import { MycategoriesComponent } from './mycategories/mycategories.component';
import { TrendingComponent } from './trending/trending.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'register', component: LoginRegisterComponent },
  { path: 'login', component: LoginRegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'mycategories', component: MycategoriesComponent },
  { path: 'trending', component: TrendingComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
