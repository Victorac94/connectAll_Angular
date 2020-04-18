import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgRedux } from '@angular-redux/store';
import { Router } from '@angular/router';

import { environment as env } from '../environments/environment';
import { IAppState } from './redux/store/store';
import * as actions from './redux/actions/actions';

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
    this.baseUrl = env.baseUrl;
  }

  sendRegisterForm = async (form) => {
    try {
      const response = await this.httpClient.post<any>(this.baseUrl + '/users/register', form).toPromise()
      localStorage.setItem('user-token', response.token);

      this.ngRedux.dispatch({
        type: actions.SET_MY_BASIC_INFO,
        data: response.user
      });

      this.router.navigate(['/category', 'all']);

      this.dispatchNotification(`Welcome to ConnectAll ${response.user.user_name}!`, 'info');
    } catch (err) {
      console.log(err);

      this.dispatchNotification(`Error ${err.status} while sending register form`, 'error');
    }
  }

  sendLoginForm = async (form): Promise<any> => {
    try {
      const response = await this.httpClient.post<any>(this.baseUrl + '/users/login', form.value).toPromise()
      localStorage.setItem('user-token', response.token);

      this.ngRedux.dispatch({
        type: actions.SET_MY_BASIC_INFO,
        data: response.user
      });

      this.router.navigate(['/category', 'all']);

      this.dispatchNotification(`Welcome back, ${response.user.user_name}`, 'info');
    } catch (err) {
      console.log(err);

      if (err.status === 401) {
        this.dispatchNotification(err.error, 'error');
        return;
      }

      this.dispatchNotification(err.error[0].msg || err.error, 'error');
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
