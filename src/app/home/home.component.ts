import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { IAppState } from '../redux/store/store';
import { LoginRegisterService } from '../login-register.service';
import * as actions from '../redux/actions/actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  gotMyId: boolean;

  constructor(
    private loginRegisterService: LoginRegisterService,
    private ngRedux: NgRedux<IAppState>
  ) {
    this.gotMyId = false;
  }

  async ngOnInit() {
    try {
      const myId = await this.loginRegisterService.getMyId();

      this.gotMyId = true;

      this.ngRedux.dispatch({
        type: actions.CURRENT_USER_ID,
        data: myId
      })
    } catch (err) {
      this.gotMyId = false;
    }
  }

}
