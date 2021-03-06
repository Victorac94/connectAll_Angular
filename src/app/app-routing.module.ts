import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { HomeComponent } from './home/home.component';
import { FeedComponent } from './feed/feed.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { CreatePostComponent } from './create-post/create-post.component';

const routes: Routes = [
  { path: 'register', component: LoginRegisterComponent },
  { path: 'login', component: LoginRegisterComponent },
  {
    path: '', component: HomeComponent, children: [
      /* localhost:3000/category/all */
      { path: 'category/:categoryName', component: FeedComponent },
      /* localhost:3000/category/basketball/3 */
      { path: 'category/:categoryName/:categoryId', component: FeedComponent },
      /* localhost:3000/profile */
      { path: 'search', component: SearchComponent },
      { path: 'add-post', component: CreatePostComponent },
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
