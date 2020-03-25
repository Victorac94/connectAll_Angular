import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { CategoryService } from '../category.service';
import { capitalize } from '../share/utility';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux/store/store';
import * as actions from '../redux/actions/actions';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.sass']
})
export class CategoryComponent implements OnInit {

  @Output() loadCatFeed: EventEmitter<any>;

  allCategories: any[];
  myCategories: any[];

  capitalize: any; // Function that capitalizes a string

  constructor(
    private categoryService: CategoryService,
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
    const allCategories = await this.categoryService.getAll();

    this.ngRedux.dispatch({
      type: actions.LOAD_ALL_CATEGORIES,
      data: allCategories
    });

    // Get the categories the current user follows
    const myCategories = await this.categoryService.getUserCategories();

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
