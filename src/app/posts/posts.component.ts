import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts.service';
import { formatTime } from '../share/utility';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass']
})
export class PostsComponent implements OnInit {

  @Input() feed: any;

  categoryId: number;
  categoryName: string;

  formatTime: any;

  constructor(
    private postsService: PostsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.formatTime = formatTime;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.categoryId = params.categoryId;
      this.categoryName = params.categoryName;

      this.loadCategoryFeed(params.categoryId);
    });
  }

  async loadCategoryFeed(categoryId) {
    try {
      const response = await this.postsService.getPostsByCategory(categoryId);
      console.log(response);
      if (!response.error) {
        this.feed = response;
      } else {
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  }

}
