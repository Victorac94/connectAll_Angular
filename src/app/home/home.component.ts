import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { IAppState } from '../redux/store/store';
import * as actions from '../redux/actions/actions';
import { ProfileService } from '../profile.service';
import { capitalize } from '../share/utility';
import { CategoryService } from '../category.service';

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
    private categoryService: CategoryService,
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
      this.ngRedux.subscribe(() => {
        const state = this.ngRedux.getState();

        this.currentView = state.currentView;
        this.currentCategory = state.currentCategory;
      })

      const profile = await this.profileService.getMyBasicInfo();
      const myCategories = await this.categoryService.getUserCategories();
      this.infoLoaded = true;

      this.ngRedux.dispatch({
        type: actions.MY_BASIC_INFO,
        data: profile
      })

      this.ngRedux.dispatch({
        type: actions.SET_MY_CATEGORIES,
        data: myCategories
      })

    } catch (err) {
      this.infoLoaded = false;
    }
  }

}
