import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { IAppState } from './redux/store/store';
import { showNotification } from './share/utility';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  notificationMessage: string;
  notificationCount: number;

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) {
    this.notificationMessage = '';
    this.notificationCount = 0;
  }

  ngOnInit() {
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
