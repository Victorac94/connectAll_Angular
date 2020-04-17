import { Component, OnInit, DoCheck } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Router } from '@angular/router';

import { IAppState } from '../redux/store/store';
import { capitalize } from '../share/utility';
import { PostService } from '../post.service';
import * as actions from '../redux/actions/actions';
import { AngularFireUploadTask } from '@angular/fire/storage';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.sass']
})
export class CreatePostComponent implements OnInit, DoCheck {

  file: File;
  task: AngularFireUploadTask;

  state: any;
  myInfo: any;
  myCategories: any;
  textAreaNotEmpty: boolean;
  submittingPostWithMedia: boolean;
  postBody: any;
  categoryIdSelected: number;

  capitalize: any;

  constructor(
    private postService: PostService,
    private router: Router,
    private ngRedux: NgRedux<IAppState>
  ) {
    console.log('Constructor');
    this.myInfo = {};
    this.myCategories = [];
    this.textAreaNotEmpty = false;
    this.capitalize = capitalize;
    this.submittingPostWithMedia = false;
  }

  ngOnInit() {
    this.ngRedux.subscribe(() => {
      this.state = this.ngRedux.getState();

      this.myInfo = this.state.myBasicInfo;
      this.myCategories = this.state.myCategories;
    })
  }

  // ngDoCheck() needed because constructor executes (thus reinitializing this.myInfo, this.myCategories to empty JSON)
  // after changing from another view (like search, etc) to this one again.
  ngDoCheck() {
    const state = this.ngRedux.getState();

    if (this.myInfo !== state.myBasicInfo) {
      this.myInfo = state.myBasicInfo;
    } else if (this.myCategories !== state.myCategories) {
      this.myCategories = state.myCategories;
    }
  }

  async createPost(categoryId) {
    if (this.checkTextArea(this.postBody, true) === true) {
      this.categoryIdSelected = parseInt(categoryId);

      if (this.file) {
        // Submitting post with media
        this.submittingPostWithMedia = true;
      } else {
        // Submitting post with no media
        this.submitPost();
      }
    }
  }

  async submitPost(mediaUrl = null) {
    if (this.checkTextArea(this.postBody) === true) {
      // Create the Post
      const post = {
        body: this.postBody,
        picture: mediaUrl,
        fk_category: this.categoryIdSelected
      }

      const response = await this.postService.createPost(post);

      if (response.affectedRows === 1) {
        // Post has been created successfuly
        // Redirect to the category the post just created belongs to
        const goToCategory = this.myCategories.find(category => category.id === this.categoryIdSelected);
        this.router.navigate(['/category', goToCategory.category_name, goToCategory.id]);

        this.ngRedux.dispatch({
          type: actions.SET_NOTIFICATION_MESSAGE,
          data: 'Post created successfully',
          notificationType: 'success'
        });
      } else {
        this.ngRedux.dispatch({
          type: actions.SET_NOTIFICATION_MESSAGE,
          data: 'There has been an error creating the post. Please try again',
          notificationType: 'error'
        });
      }
    } else {
      // Cannot create the post because it is empty
      this.ngRedux.dispatch({
        type: actions.SET_NOTIFICATION_MESSAGE,
        data: 'You have to write the post\'s body before submitting.',
        notificationType: 'error'
      });
    }
  }

  // Receive the upload task from upload-media.component.ts
  receiveTask(task) {
    this.task = task;
  }

  // Get the download url of the image/video just uploaded
  gotDownloadMediaUrl(url) {
    this.submitPost(url);
  }

  // Check if the file selected to add the post is an image or video
  fileSelected(files: FileList) {
    // If nothing was selected
    if (files.item(0) === null) return;

    if (files.item(0).type.includes('image/')) {
      console.log('Es una imagen')
    } else if (files.item(0).type.includes('video/')) {
      console.log('Es un video');
    } else {
      return;
    }

    this.file = files.item(0);
  }

  removeFile() {
    this.file = null;
  }

  // Check that the body of the post is not empty. If it is empty, user cannot submit the post
  checkTextArea(tArea, sendingPost = false): boolean {
    if (tArea && tArea.trim() !== '') {
      this.textAreaNotEmpty = true;
      return true;
    } else {
      this.textAreaNotEmpty = false;

      if (sendingPost) {
        this.ngRedux.dispatch({
          type: actions.SET_NOTIFICATION_MESSAGE,
          data: 'You have to write the post\'s body before submitting.',
          notificationType: 'error'
        });
      }

      return false;
    }
  }

  // Close the submitting-task (uploading image/video) modal and cancel the upload
  closeModal() {
    this.task.cancel();
    this.submittingPostWithMedia = false;
  }
}
