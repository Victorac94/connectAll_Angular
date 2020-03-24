import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { CategoriesService } from '../categories.service';
import { capitalize, setCategoriesFormat } from '../share/utility';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux/store/store';
import * as actions from '../redux/actions/actions';

@Component({
  selector: 'app-mycategories',
  templateUrl: './mycategories.component.html',
  styleUrls: ['./mycategories.component.sass']
})
export class MycategoriesComponent implements OnInit {

  @Output() loadCatFeed: EventEmitter<any>;

  allCategories: any[];
  myCategories: any[];

  capitalize: any; // Function that capitalizes a string

  constructor(
    private categoriesService: CategoriesService,
    private ngRedux: NgRedux<IAppState>
  ) {
    this.capitalize = capitalize;
    this.loadCatFeed = new EventEmitter();
  }

  async ngOnInit() {
    // Listen for changes in the redux store and update variables according to them
    this.ngRedux.subscribe(() => {
      const state = this.ngRedux.getState();

      this.allCategories = state.allCategories;
      this.myCategories = state.myCategories;
    })

    // Get all existing categories
    const allCategories = await this.categoriesService.getAll();

    this.ngRedux.dispatch({
      type: actions.LOAD_ALL_CATEGORIES,
      data: allCategories
    });

    // Get the categories the current user follows
    const myCategories = await this.categoriesService.getUserCategories();

    this.ngRedux.dispatch({
      type: actions.LOAD_MY_CATEGORIES,
      data: myCategories
    });
  }

  // Load feed depending on the selected category
  async loadCategoryFeed(id, name) {
    this.loadCatFeed.emit({ catId: id, catName: name });
  }

}
