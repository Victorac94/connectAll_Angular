import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { IAppState } from '../redux/store/store';
import * as actions from '../redux/actions/actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-mobile',
  templateUrl: './nav-mobile.component.html',
  styleUrls: ['./nav-mobile.component.sass']
})
export class NavMobileComponent implements OnInit {

  currentFeedUrl: any;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private router: Router
  ) { }

  ngOnInit() {
    this.ngRedux.subscribe(() => {
      const state = this.ngRedux.getState();

      this.currentFeedUrl = state.currentFeedUrl;
    })

    const url = this.router.url.split('/');

    if (url[1] === 'category') {
      this.ngRedux.dispatch({
        type: actions.SET_CURRENT_FEED_URL,
        data: this.router.url
      })
    }
    else {
      this.ngRedux.dispatch({
        type: actions.SET_CURRENT_FEED_URL,
        data: '/category/all'
      })
    }
  }

  setCurrentView(value) {
    this.ngRedux.dispatch({
      type: actions.SET_CURRENT_VIEW,
      data: value
    })
  }
}
