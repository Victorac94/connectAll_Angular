import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { IAppState } from '../redux/store/store';

@Component({
  selector: 'app-nav-mobile',
  templateUrl: './nav-mobile.component.html',
  styleUrls: ['./nav-mobile.component.sass']
})
export class NavMobileComponent implements OnInit {

  currentFeedUrl: any;

  constructor(
    private ngRedux: NgRedux<IAppState>,
  ) { }

  ngOnInit() {
    this.ngRedux.subscribe(() => {
      const state = this.ngRedux.getState();

      this.currentFeedUrl = state.currentFeedUrl;
    })
  }

}
