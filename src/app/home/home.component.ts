import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { IAppState } from '../redux/store/store';
import { LoginRegisterService } from '../login-register.service';
import * as actions from '../redux/actions/actions';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  infoLoaded: any;

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private ngRedux: NgRedux<IAppState>
  ) {
    this.infoLoaded = null;
  }

  async ngOnInit() {
    try {
      // const myId = await this.loginRegisterService.getMyId();
      const profile = await this.profileService.getMyBasicInfo();
      this.infoLoaded = true;

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

  setCurrentView() {
    const url = this.router.url.split('/'); // ['', 'category', 'all']
    let view = '';

    switch (url[1]) {
      case 'category':
        view = 'category';
        break;
      case 'search':
        view = 'search';
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
    })
  }
}
