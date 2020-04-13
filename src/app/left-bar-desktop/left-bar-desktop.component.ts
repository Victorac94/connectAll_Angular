import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Router } from '@angular/router';

import { IAppState } from '../redux/store/store';

@Component({
  selector: 'app-left-bar-desktop',
  templateUrl: './left-bar-desktop.component.html',
  styleUrls: ['./left-bar-desktop.component.sass']
})
export class LeftBarDesktopComponent implements OnInit {

  profileInfo: any;
  myCategories: any;

  constructor(
    private router: Router,
    private ngRedux: NgRedux<IAppState>
  ) {
    this.profileInfo = null;
    this.myCategories = null;
  }

  async ngOnInit() {
    const reduxState = this.ngRedux.getState();
    this.profileInfo = reduxState.myBasicInfo;
    this.myCategories = reduxState.myCategories;

    this.ngRedux.subscribe(() => {
      const state = this.ngRedux.getState();

      this.profileInfo = state.myBasicInfo;
      this.myCategories = state.myCategories;
    });
  }

  logout() {
    localStorage.removeItem('user-token');
    this.router.navigate(['/login']);
  }
}
