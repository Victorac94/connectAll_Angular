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
    this.myCategories = await this.categoriesService.getUserCategories();

    sessionStorage.setItem('my-categories', JSON.stringify(this.myCategories));
  }

  // Load feed depending on the selected category
  async loadCategoryFeed(id, name) {
    this.loadCatFeed.emit({ catId: id, catName: name });
  }

}
