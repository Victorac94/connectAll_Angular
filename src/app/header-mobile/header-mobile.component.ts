import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Router } from '@angular/router';

import { IAppState } from '../redux/store/store';
import { capitalize } from '../share/utility';

@Component({
  selector: 'app-header',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.sass']
})
export class HeaderMobileComponent implements OnInit {

  myCategories: any;
  myProfile: any;
  currentCategory: string;
  currentView: string;

  capitalize: any;

  constructor(private router: Router, private ngRedux: NgRedux<IAppState>) {
    this.capitalize = capitalize;
  }

  ngOnInit(): void {
    const state = this.ngRedux.getState();

    this.myCategories = state.myCategories;
    this.currentCategory = state.currentCategory;
    this.currentView = state.currentView;

    this.ngRedux.subscribe(() => {
      const state = this.ngRedux.getState();

      this.myCategories = state.myCategories;
      this.myProfile = state.myBasicInfo;
      this.currentCategory = state.currentCategory;
      this.currentView = state.currentView
    })
  }

  // Navigate between different categories
  navigateTo(value) {
    value = value.split('/');

    this.router.navigate(['/category', ...value]);
  }

  logout() {
    localStorage.removeItem('user-token');

    this.router.navigate(['/login']);
  }
}
