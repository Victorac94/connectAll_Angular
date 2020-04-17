import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux/store/store';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.sass']
})
export class FeedComponent implements OnInit {

  list: any[];
  myBasicInfo: any;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private activatedRoute: ActivatedRoute,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.myBasicInfo = this.ngRedux.getState().myBasicInfo;

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
