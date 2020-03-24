import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TrendingComponent } from './trending/trending.component';
import { MycategoriesComponent } from './mycategories/mycategories.component';
import { PostsComponent } from './posts/posts.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { IAppState, INITIAL_STATE } from './redux/store/store';
import { rootReducer } from './redux/reducers/reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TrendingComponent,
    MycategoriesComponent,
    PostsComponent,
    LoginRegisterComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgReduxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>, devTools: DevToolsExtension) {
    // Sólo si estoy en desarrollo quiero poder acceder a los datos de Redux
    const enhancers = isDevMode() ? [devTools.enhancer()] : [];
    // El segundo parametro es el estado inicial de nuestra store
    ngRedux.configureStore(rootReducer, INITIAL_STATE, [], enhancers)
  }
}
