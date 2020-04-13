import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.sass']
})
export class FeedComponent implements OnInit {

  list: any[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params.categoryName === 'all') {
        this.loadAllPosts();
      }
      else {
        this.loadPostsByCategory(params.categoryId);
      }
    });
  }

  async loadAllPosts() {
    this.list = await this.postService.getAllPosts();
  }

  async loadPostsByCategory(categoryId) {
    this.list = await this.postService.getPostsByCategory(categoryId);
  }

}
