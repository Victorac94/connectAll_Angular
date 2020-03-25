import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { formatTime } from '../share/utility';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit {

  @Input() feed: any;

  categoryId: number;
  categoryName: string;

  formatTime: any;

  constructor(
    private postService: PostService,
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
      const response = await this.postService.getPostsByCategory(categoryId);
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
