import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgRedux } from '@angular-redux/store';

import { PostService } from '../post.service';
import { formatTime, capitalize } from '../share/utility';
import { IAppState } from '../redux/store/store';
import * as actions from '../redux/actions/actions';

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
    private activatedRoute: ActivatedRoute,
    private ngRedux: NgRedux<IAppState>
  ) {
    this.formatTime = formatTime;
    this.capitalize = capitalize;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params.categoryName !== 'all') {
        this.categoryName = params.categoryName;
        this.categoryId = params.categoryId;

        this.loadPostsByCategory(params.categoryId);
      }
      else {
        this.categoryName = 'all';
        this.loadAllPosts();
      }
    });
  }

  async loadAllPosts() {
    this.feed = await this.postService.getAllPosts();
  }

  async loadPostsByCategory(categoryId) {
    this.feed = await this.postService.getPostsByCategory(categoryId);
  }

  setCurrentViewCategory(view, category = null) {
    this.ngRedux.dispatch({
      type: actions.SET_CURRENT_VIEW,
      data: view
    });

    if (category) {
      this.ngRedux.dispatch({
        type: actions.SET_CURRENT_CATEGORY,
        data: category
      })
    }
  }
}
