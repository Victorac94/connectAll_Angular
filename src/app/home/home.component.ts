import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { IAppState } from '../redux/store/store';
import { LoginRegisterService } from '../login-register.service';
import * as actions from '../redux/actions/actions';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  myInfo: any;

  constructor(
    // private loginRegisterService: LoginRegisterService,
    private profileService: ProfileService,
    private ngRedux: NgRedux<IAppState>
  ) {
    this.myInfo = null;
  }

  async ngOnInit() {
    try {
      // const myId = await this.loginRegisterService.getMyId();
      const profile = await this.profileService.getMyBasicInfo();

      this.myInfo = true;

      this.ngRedux.dispatch({
        type: actions.MY_BASIC_INFO,
        data: profile
      })
    } catch (err) {
      this.myInfo = false;
    }
  }

}
