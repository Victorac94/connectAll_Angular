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
  @Input() canUnfollow: boolean;
  @Output() loadCatFeed: EventEmitter<any>;

  capitalize: any; // Function that capitalizes a string

  constructor(
    private categoryService: CategoryService,
    private ngRedux: NgRedux<IAppState>
  ) {
    this.capitalize = capitalize;
    this.loadCatFeed = new EventEmitter();
  }

  async ngOnInit() {
    // Get all existing categories
    // const allCategories = await this.categoryService.getAll();

    // this.ngRedux.dispatch({
    //   type: actions.SET_ALL_CATEGORIES,
    //   data: allCategories
    // });
  }

  // Load feed depending on the selected category
  async loadCategoryFeed(id, name) {
    this.loadCatFeed.emit({ catId: id, catName: name });
  }

  async unfollowCategory(catId) {
    const response = await this.categoryService.unfollowCategory(catId);
    console.log(response);

    if (response.affectedRows === 1) {
      console.log('Categoria borrada con éxito!');
      const userCategories = this.ngRedux.getState().myCategories.filter(cat => cat.id != catId);

      this.ngRedux.dispatch({
        type: actions.DELETE_CATEGORY,
        data: userCategories
      });
    }
  }
}
