import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux/store/store';
import { capitalize } from '../share/utility';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.sass']
})
export class CreatePostComponent implements OnInit {

  myInfo: any;
  myCategories: any;
  textAreaNotEmpty: boolean;
  postBody: any;

  capitalize: any;

  constructor(
    private postService: PostService,
    private router: Router,
    private ngRedux: NgRedux<IAppState>) {
    this.myInfo = {};
    this.myCategories = [];
    this.textAreaNotEmpty = false;
    this.capitalize = capitalize;
  }

  ngOnInit() {
    this.ngRedux.subscribe(() => {
      const state = this.ngRedux.getState();

      this.myInfo = state.myBasicInfo;
      this.myCategories = state.myCategories;
    })
  }

  async createPost(categoryId) {
    try {

      if (this.checkTextArea(this.postBody)) {
        // Create the Post
        const post = {
          body: this.postBody,
          picture: null,
          fk_category: categoryId
        }
        console.log(post);

        const response = await this.postService.createPost(post);

        if (response.affectedRows === 1) {
          // Post has been created successfuly
          // Redirect to the category the post just created belongs to
          const goToCategory = this.myCategories.find(category => category.id === parseInt(categoryId));
          this.router.navigate(['/category', goToCategory.category_name, goToCategory.id]);
        } else {
          console.log('There has been an error creating the post');
        }
      } else {
        // Cannot create the post because it is empty
        return
      }
    } catch (err) {
      console.log(err);
    }
  }

  checkTextArea(tArea) {
    if (tArea.trim() !== '') {
      this.textAreaNotEmpty = true;
      return true;
    } else {
      this.textAreaNotEmpty = false;
      return false;
    }
  }
}
