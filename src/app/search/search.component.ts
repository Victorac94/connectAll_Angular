import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { PostService } from '../post.service';
import { formatTime, capitalize } from '../share/utility';
import { CategoryService } from '../category.service';
import { ProfileService } from '../profile.service';
import { IAppState } from '../redux/store/store';
import * as actions from '../redux/actions/actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  currentActive: any;
  currentlySearching: string;
  searchResults: any;

  formatTime: any;
  capitalize: any;

  constructor(
    private categoryService: CategoryService,
    private postService: PostService,
    private profileService: ProfileService,
    private ngRedux: NgRedux<IAppState>
  ) {
    this.formatTime = formatTime;
    this.capitalize = capitalize;
  }

  ngOnInit() {
    this.currentActive = document.querySelector('.search-by .active');
    this.currentlySearching = 'categories';
    this.searchResults = null;
  }

  async search(value) {
    console.log(this.currentlySearching);
    switch (this.currentlySearching) {
      case 'categories':
        this.searchResults = await this.categoryService.getCategoriesBySearch(value);
        break;
      case 'posts':
        this.searchResults = await this.postService.getPostsBySearch(value);
        break;
      case 'users':
        this.searchResults = await this.profileService.getProfilesBySearch(value);
        break;
    }
    console.log(this.searchResults)
  }

  // Toggle the class active which says what to search for and puts a green border on the search-item element
  toggleActive(element, value) {
    if (element == this.currentActive) return;

    this.currentActive.classList.remove('active');
    element.classList.add('active');

    this.currentActive = element;
    this.currentlySearching = value;
  }

  setCurrentViewCategory(view, category) {
    this.ngRedux.dispatch({
      type: actions.SET_CURRENT_VIEW,
      data: view
    });

    this.ngRedux.dispatch({
      type: actions.SET_CURRENT_CATEGORY,
      data: category
    })
  }
}
