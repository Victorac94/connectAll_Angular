import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

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

  @Input() category: any;
  @Input() currentView: string;
  @Output() loadCatFeed: EventEmitter<any>;
  @Output() updateFollowCategories: EventEmitter<any>;

  capitalize: any; // Function that capitalizes a string

  constructor(
    private categoryService: CategoryService,
    private ngRedux: NgRedux<IAppState>
  ) {
    this.capitalize = capitalize;
    this.loadCatFeed = new EventEmitter();
    this.updateFollowCategories = new EventEmitter();
  }

  ngOnInit() {
  }

  // Load feed depending on the selected category
  async loadCategoryFeed(id, name) {
    this.loadCatFeed.emit({ catId: id, catName: name });
  }

  async followCategory(catId) {
    const response = await this.categoryService.followCategory(catId);

    if (response.affectedRows === 1) {
      const userCategories = await this.categoryService.getUserCategories();

      this.ngRedux.dispatch({
        type: actions.SET_MY_CATEGORIES,
        data: userCategories
      });

      this.updateFollowCategories.emit();
    }
  }

  async unfollowCategory(catId) {
    const response = await this.categoryService.unfollowCategory(catId);
    console.log(response);

    if (response.affectedRows === 1) {
      const userCategories = this.ngRedux.getState().myCategories.filter(cat => cat.id != catId);

      this.ngRedux.dispatch({
        type: actions.DELETE_CATEGORY,
        data: userCategories
      });
    }
  }
}
