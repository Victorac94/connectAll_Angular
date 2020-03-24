import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux/store/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  myCategories: any;

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit(): void {
    this.ngRedux.subscribe(() => {
      const state = this.ngRedux.getState();

      this.myCategories = state.myCategories;
    })
  }

}
