import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../profile.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgRedux } from '@angular-redux/store';

import { formatTime, capitalize } from '../share/utility';
import { IAppState } from '../redux/store/store';
import * as actions from '../redux/actions/actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  editing: boolean;
  profileInfo: any;
  myProfile: boolean;
  userCategories: any;

  formatTime: any;
  capitalize: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    private ngRedux: NgRedux<IAppState>,
  ) {
    this.editing = false;
    this.profileInfo = null;
    this.userCategories = null;
    this.formatTime = formatTime;
    this.capitalize = capitalize;

    this.profileForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(80)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/)
      ]),
    })
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      // Get own's user id
      // const myUserId = localStorage.getItem('user-id');
      const state = await this.ngRedux.getState();

      let myUserId = state.myBasicInfo.id;

      // If user is visiting it's own profile, redirect to /profile which will also load this function
      if (parseInt(params.userId) === myUserId) {
        this.router.navigate(['/profile']);
        return;
      };

      // Get whole profile information (user info, categories, posts)
      this.profileInfo = await this.profileService.getProfile(params.userId || myUserId);

      // If user is visiting it's own profile grant access to edit the profile
      this.myProfile = this.profileInfo.myProfile;

      // Fill input fields with the user info
      this.profileForm.controls.name.setValue(this.profileInfo.user.user_name);
      this.profileForm.controls.lastName.setValue(this.profileInfo.user.user_last_name);
      this.profileForm.controls.email.setValue(this.profileInfo.user.user_email);

      // Show user categories
      this.userCategories = this.profileInfo.categories;

      this.ngRedux.subscribe(() => {
        const state = this.ngRedux.getState();

        this.userCategories = state.myCategories;
      })
    })
  }

  async onSubmittingProfileChanges() {
    const profile = {
      ...this.profileInfo.user,
      user_name: this.profileForm.controls.name.value,
      user_last_name: this.profileForm.controls.lastName.value,
      user_email: this.profileForm.controls.email.value
    }

    const response = await this.profileService.updateProfileInfo(profile);

    if (response.affectedRows === 1) {
      // Focus the submit button to remove the autocomplete box from the input fields 
      // in case the user pressed enter on the input fields instead of clicking on the submit button
      document.getElementById('submitProfileInfo').focus();

      // Without setTimeout() the variable will be changed before we can focus the submit button
      setTimeout(() => {
        this.editing = false
      }, 0);

      // Update myBasicInfo redux state
      this.ngRedux.dispatch({
        type: actions.SET_MY_BASIC_INFO,
        data: { ...profile }
      });
    }
  }

}
