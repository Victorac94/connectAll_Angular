import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { CategoriesService } from '../categories.service';
import { capitalize } from '../share/utility';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';

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
    private router: Router,
    private categoriesService: CategoriesService,
    private postsService: PostsService
  ) {
    this.capitalize = capitalize;
    this.loadCatFeed = new EventEmitter();
  }

  async ngOnInit() {
    // Get all existing categories
    this.allCategories = await this.categoriesService.getAll();
    sessionStorage.setItem('all-categories', JSON.stringify(this.allCategories));

    // Get the categories the current user follows
    const userCategories = await this.categoriesService.getUserCategories();

    this.myCategories = this.setCategoriesFormat(userCategories);
  }

  // Load feed by category selected
  async loadCategoryFeed(id, name) {
    this.loadCatFeed.emit({ catId: id, catName: name });
  }

  setCategoriesFormat(categories) {
    // Format categories from { fk_category: 1 } to { id: 1, name: 'athletics', icon: '../../category-icon.svg' }
    return categories.map(category => {
      for (let cat of this.allCategories) {
        if (category.fk_category === cat.id) {
          return {
            id: cat.id,
            name: cat.name,
            icon: cat.icon
          }
        }
      }
    })
  }
}
