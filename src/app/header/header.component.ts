import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { IAppState } from '../redux/store/store';
import { capitalize } from '../share/utility';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  myCategories: any;
  myProfile: any;

  capitalize: any;

  constructor(private router: Router, private ngRedux: NgRedux<IAppState>) {
    this.capitalize = capitalize;
  }

  ngOnInit(): void {
    this.ngRedux.subscribe(() => {
      const state = this.ngRedux.getState();

      this.myCategories = state.myCategories;
      this.myProfile = state.myBasicInfo
    })
  }

  navigateTo(value) {
    const routes = value.split('/');
    this.router.navigate(['/category', ...routes]);
  }
}
