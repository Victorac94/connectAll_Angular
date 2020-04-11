import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { IAppState } from '../redux/store/store';
import * as actions from '../redux/actions/actions';
import { ProfileService } from '../profile.service';
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

    } catch (err) {
      this.infoLoaded = false;
    }
  }

}
