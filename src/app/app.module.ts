import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { HeaderMobileComponent } from './header-mobile/header-mobile.component';
import { HomeComponent } from './home/home.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { NavMobileComponent } from './nav-mobile/nav-mobile.component';
import { PostComponent } from './post/post.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';

import { IAppState, INITIAL_STATE } from './redux/store/store';
import { rootReducer } from './redux/reducers/reducer';
import { LeftBarDesktopComponent } from './left-bar-desktop/left-bar-desktop.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderMobileComponent,
    CategoryComponent,
    PostComponent,
    LoginRegisterComponent,
    HomeComponent,
    ProfileComponent,
    CreatePostComponent,
    SearchComponent,
    NavMobileComponent,
    LeftBarDesktopComponent
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
