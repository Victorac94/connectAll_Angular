import { Component, OnInit, Input } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AngularFirestore } from '@angular/fire/firestore';

import { formatTime, capitalize } from '../share/utility';
import { PostService } from '../post.service';
import { IAppState } from '../redux/store/store';
import * as actions from '../redux/actions/actions';
import { AngularFireStorage } from '@angular/fire/storage';

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
    private ngRedux: NgRedux<IAppState>,
    private storage: AngularFireStorage
  ) {
    this.formatTime = formatTime;
    this.capitalize = capitalize;
  }

  ngOnInit() {
    this.myPost = this.post.user_id === this.myBasicInfo.id;
    // const file = this.post.post_picture.match(/\/o\/(images|videos)%2F(.+)\?alt=media/);
    // console.log(file[1]);
    // console.log(file[2]);
  }

  async deletePost(post, postElement) {
    const response = await this.postService.deletePost(post);

    if (response.affectedRows === 1) {
      const file = this.post.post_picture.match(/\/o\/(images|videos)%2F(.+)\?alt=media/);

      if (file) {
        // Delete file from firebase storage
        file[2] = decodeURIComponent(file[2]);

        this.storage.ref(`${file[1]}/${file[2]}`).delete().toPromise().then(() => {
          console.log(`/${file[1]}/${file[2]}`);
          // console.log('Borrado con éxito!');
        }).catch(err => {
          console.log(err);
        });
      }


      this.ngRedux.dispatch({
        type: actions.SET_NOTIFICATION_MESSAGE,
        data: 'Post deleted successfully',
        notificationType: 'success'
      });

      postElement.style.display = 'none';
    }
  }
}
