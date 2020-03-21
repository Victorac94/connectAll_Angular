import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  categoryFeed: any;

  constructor(
    private router: Router,
    private postsService: PostsService
  ) { }

  ngOnInit() {
  }

  async loadCategoryFeed(event) {
    try {
      const response = await this.postsService.getPostsByCategory(event.catId);
      console.log(response);
      if (!response.error) {
        this.categoryFeed = response;
        this.router.navigate(['/home', 'category', event.catName])
      } else {
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  }
}
