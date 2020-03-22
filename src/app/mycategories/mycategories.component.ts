import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { CategoriesService } from '../categories.service';
import { capitalize, setCategoriesFormat } from '../share/utility';

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
    private categoriesService: CategoriesService
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
    sessionStorage.setItem('my-categories', JSON.stringify(userCategories));

    // Format categories from { fk_category: 1 } to { id: 1, name: 'athletics', icon: '../../category-icon.svg' }
    this.myCategories = setCategoriesFormat(userCategories);
    sessionStorage.setItem('my-categories', JSON.stringify(this.myCategories));
  }

  // Load feed by category selected
  async loadCategoryFeed(id, name) {
    this.loadCatFeed.emit({ catId: id, catName: name });
  }

}
