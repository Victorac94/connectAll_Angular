import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgRedux } from '@angular-redux/store';

import { IAppState } from './redux/store/store';
import * as actions from './redux/actions/actions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  baseUrl: string;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private ngRedux: NgRedux<IAppState>
  ) {
    this.baseUrl = 'http://127.0.0.1:3000/api';
  }

  sendRegisterForm = async (form) => {
    try {
      const response = await this.httpClient.post<any>(this.baseUrl + '/users/register', form).toPromise()
      localStorage.setItem('user-token', response.token);

      this.ngRedux.dispatch({
        type: actions.MY_BASIC_INFO,
        data: response.user
      });

      this.router.navigate(['/home']);

      this.dispatchNotification(`Welcome to ConnectAll ${response.user.user_name}!`, 'info');
    } catch (err) {
      console.log(err);

      this.dispatchNotification(`Error ${err.status} while getting profile data`, 'error');
    }
  }

  sendLoginForm = async (form): Promise<any> => {
    try {
      const response = await this.httpClient.post<any>(this.baseUrl + '/users/login', form.value).toPromise()
      localStorage.setItem('user-token', response.token);
      console.log(response)
      this.ngRedux.dispatch({
        type: actions.MY_BASIC_INFO,
        data: response.user
      });

      this.router.navigate(['/home']);

      this.dispatchNotification(`Welcome back, ${response.user.user_name}`, 'info');
    } catch (err) {
      console.log(err);

      this.dispatchNotification(`Error ${err.status} while getting profile data`, 'error');
    }
  }

  dispatchNotification(message, type) {
    this.ngRedux.dispatch({
      type: actions.SET_NOTIFICATION_MESSAGE,
      data: message,
      notificationType: type
    })
  }
}
