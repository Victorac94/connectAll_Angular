import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'register', component: LoginRegisterComponent },
  { path: 'login', component: LoginRegisterComponent },
  {
    path: '', component: HomeComponent, children: [
      /* localhost:3000/category/basketball */
      { path: 'category/all', component: PostsComponent },
      { path: 'category/:categoryName/:categoryId', component: PostsComponent },
      /* localhost:3000/profile */
      { path: 'profile', component: ProfileComponent },
      { path: 'user/:userId', component: ProfileComponent },
      { path: '**', redirectTo: 'category/all' }
    ]
  },
  { path: '**', redirectTo: 'category/all' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
