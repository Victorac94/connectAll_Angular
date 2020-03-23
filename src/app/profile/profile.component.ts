import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../profile.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { formatTime, capitalize } from '../share/utility';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  editing: boolean;
  profileInfo: any;
  userCategories: any;

  formatTime: any;
  capitalize: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService
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
      if (params.userId !== undefined) {
        const response = await this.profileService.getUser(params.userId);
        this.profileInfo = response;

        console.log(response);
      } else {
        const profileData = await this.profileService.getMyProfile();

        // TODO: Desde el servidor no incluir la password en la respuesta. Por seguridad (?)
        this.profileInfo = profileData;

        // Fill input fields with the user info
        this.profileForm.controls.name.setValue(profileData.user.user_name);
        this.profileForm.controls.lastName.setValue(profileData.user.user_last_name);
        this.profileForm.controls.email.setValue(profileData.user.user_email);

        // Show user categories
        this.userCategories = JSON.parse(sessionStorage.getItem('my-categories'))

        console.log(profileData);
      }
    })
  }

  async onSubmittingProfileChanges() {
    const profile = {
      ...this.profileInfo.user,
      name: this.profileForm.controls.name.value,
      last_name: this.profileForm.controls.lastName.value,
      email: this.profileForm.controls.email.value
    }

    const response = await this.profileService.updateProfileInfo(profile);
    console.log(response);

    if (response.affectedRows === 1) {
      // Focus the submit button to remove the autocomplete box from the input fields 
      // in case the user pressed enter on the input fields instead of clicking on the submit button
      document.getElementById('submitProfileInfo').focus();

      // Without setTimeout() the variable will be changed before we can focus the submit button
      setTimeout(() => {
        this.editing = false
      }, 0);
    }
  }
}
