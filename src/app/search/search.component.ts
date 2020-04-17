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
  myCategories: any;
  myBasicInfo: any;

  formatTime: any;
  capitalize: any;

  constructor(
    private categoryService: CategoryService,
    private postService: PostService,
    private profileService: ProfileService,
    private ngRedux: NgRedux<IAppState>
  ) {
    this.currentlySearching = '';
    this.myCategories = [];
    this.formatTime = formatTime;
    this.capitalize = capitalize;
  }

  async ngOnInit(): Promise<any> {
    const state = this.ngRedux.getState();
    this.currentActive = document.querySelector('.search-by .active');
    this.currentlySearching = 'categories';

    const allCategories = await this.categoryService.getAll();
    this.myCategories = state.myCategories;
    this.myBasicInfo = state.myBasicInfo;
    this.searchResults = this.isFollowingCategory(allCategories);

    this.ngRedux.subscribe(() => {
      const state = this.ngRedux.getState();

      this.myCategories = state.myCategories;
    });
  }

  async search(value): Promise<any> {
    switch (this.currentlySearching) {
      case 'categories':
        this.searchResults = null;
        const response = await this.categoryService.getCategoriesBySearch(value);

        this.searchResults = this.isFollowingCategory(response);
        break;
      case 'posts':
        this.searchResults = null;
        this.searchResults = await this.postService.getPostsBySearch(value);
        break;
      case 'users':
        this.searchResults = null;
        this.searchResults = await this.profileService.getProfilesBySearch(value);
        break;
    }
  }

  handleUpdateFollowCategories() {
    this.searchResults = this.isFollowingCategory(this.searchResults);
  }

  // Adds the boolean property 'following' to each category in the list received
  isFollowingCategory(categories): any[] {
    categories.forEach(cat => {
      cat['following'] = false;

      for (let c of this.myCategories) {
        if (c.id === cat.id) {
          cat['following'] = true;
          break;
        }
      }
    })

    return categories;
  }

  // Toggle the class active which says what to search for and puts a green border on the search-item element
  toggleActive(element, value, searchInput): void {
    if (element == this.currentActive) return;

    this.currentActive.classList.remove('active');
    element.classList.add('active');

    this.currentActive = element;
    this.currentlySearching = value;

    this.search(searchInput.value);
  }

}
