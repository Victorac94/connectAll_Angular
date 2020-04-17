import { Component, OnInit, Input } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { formatTime, capitalize } from '../share/utility';
import { PostService } from '../post.service';
import { IAppState } from '../redux/store/store';
import * as actions from '../redux/actions/actions';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit {

  @Input() post: any;
  @Input() myBasicInfo: any;

  myPost: boolean;

  formatTime: any;
  capitalize: any;

  constructor(
    private postService: PostService,
    private ngRedux: NgRedux<IAppState>
  ) {
    this.formatTime = formatTime;
    this.capitalize = capitalize;
  }

  ngOnInit() {
    this.myPost = this.post.user_id === this.myBasicInfo.id;
  }

  async deletePost(post, postElement) {
    const response = await this.postService.deletePost(post);

    if (response.affectedRows === 1) {
      this.ngRedux.dispatch({
        type: actions.SET_NOTIFICATION_MESSAGE,
        data: 'Post deleted successfully',
        notificationType: 'success'
      });

      postElement.style.display = 'none';
    }
  }
}
