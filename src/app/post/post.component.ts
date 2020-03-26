import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { formatTime, capitalize } from '../share/utility';

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
  capitalize: any;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute
  ) {
    this.formatTime = formatTime;
    this.capitalize = capitalize;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params.categoryName)
      if (params.categoryName !== 'all') {
        this.categoryName = params.categoryName;
        this.categoryId = params.categoryId;

        this.loadPostsByCategory(params.categoryId);
      } else {
        this.categoryName = 'all';
        this.loadAllPosts();
      }
    });
  }

  async loadAllPosts() {
    try {
      const response = await this.postService.getAllPosts();
      console.log(response);
      this.feed = response;
    } catch (err) {
      console.log(err);
    }
  }

  async loadPostsByCategory(categoryId) {
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
