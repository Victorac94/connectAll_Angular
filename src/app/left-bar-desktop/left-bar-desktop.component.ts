import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { IAppState } from '../redux/store/store';
import * as actions from '../redux/actions/actions';

@Component({
  selector: 'app-left-bar-desktop',
  templateUrl: './left-bar-desktop.component.html',
  styleUrls: ['./left-bar-desktop.component.sass']
})
export class LeftBarDesktopComponent implements OnInit {

  profileInfo: any;

  constructor(private ngRedux: NgRedux<IAppState>) {
    this.profileInfo = null;
  }

  ngOnInit() {
    this.ngRedux.subscribe(() => {
      const state = this.ngRedux.getState();

      this.profileInfo = state.myBasicInfo;
    })
  }

  setCurrentView(value) {
    this.ngRedux.dispatch({
      type: actions.SET_CURRENT_VIEW,
      data: value
    })
  }
}
