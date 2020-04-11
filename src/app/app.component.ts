import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Router, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

import { IAppState } from './redux/store/store';
import { showNotification } from './share/utility';
import * as actions from './redux/actions/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  notificationMessage: string;
  notificationCount: number;

  constructor(
    private router: Router,
    private ngRedux: NgRedux<IAppState>
  ) {
    this.notificationMessage = '';
    this.notificationCount = 0;
  }

  ngOnInit() {
    // Subscribe to changes on the navigation url and set store values according to it
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.url.split('/').slice(1);

        this.ngRedux.dispatch({
          type: actions.SET_CURRENT_VIEW,
          data: url[0]
        });

        if (url[0] === 'category' && url[1]) {
          this.ngRedux.dispatch({
            type: actions.SET_CURRENT_CATEGORY,
            data: url[1]
          })

          this.ngRedux.dispatch({
            type: actions.SET_CURRENT_FEED_URL,
            data: '/' + url.join('/')
          })
        }
      }
    });

    this.ngRedux.subscribe(() => {
      const state = this.ngRedux.getState();

      if (this.notificationCount !== state.notificationCount) {
        this.notificationMessage = state.notificationMessage;
        this.notificationCount = state.notificationCount;
        showNotification(state.notificationType);
      }
    })
  }
}
