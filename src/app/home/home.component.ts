import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { IAppState } from '../redux/store/store';
import * as actions from '../redux/actions/actions';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';
import { capitalize } from '../share/utility';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  infoLoaded: any;
  currentView: string;
  currentCategory: string;

  capitalize: any;

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private ngRedux: NgRedux<IAppState>
  ) {
    this.infoLoaded = null;
    this.currentView = '';
    this.currentCategory = '';

    this.capitalize = capitalize;
  }

  async ngOnInit() {
    try {
      const profile = await this.profileService.getMyBasicInfo();
      this.infoLoaded = true;

      this.ngRedux.subscribe(() => {
        const state = this.ngRedux.getState();

        this.currentView = state.currentView;
        this.currentCategory = state.currentCategory;
      })

      this.ngRedux.dispatch({
        type: actions.MY_BASIC_INFO,
        data: profile
      })

      this.setCategory();
      this.setCurrentView();
    } catch (err) {
      this.infoLoaded = false;
    }
  }

  setCategory() {
    const url = this.router.url.split('/'); // ['', 'category', 'all']

    if (url[1] === 'category') {
      this.ngRedux.dispatch({
        type: actions.SET_CURRENT_CATEGORY,
        data: url[2]
      })
    }
  }

  setCurrentView(value = '') {
    // If we call this function from the ngOnInit() then get the value from the current URL
    if (value === '') {
      value = this.router.url.split('/')[1]; // ['', 'category', 'all']
    }
    let view = '';

    switch (value) {
      case 'category':
        view = 'category';
        break;
      case 'search':
        view = 'search';
        break;
      case 'add-post':
        view = 'addPost';
        break;
      case 'chats':
        view = 'chats';
        break;
      case 'profile':
        view = 'profile';
        break;
      case 'user':
        view = 'user';
        break;
      default:
        view = 'default case in switch'
    }

    this.ngRedux.dispatch({
      type: actions.SET_CURRENT_VIEW,
      data: view
    });
  }
}
