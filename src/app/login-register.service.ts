import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgRedux } from '@angular-redux/store';

import { IAppState } from './redux/store/store';
import * as actions from './redux/actions/actions';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  baseUrl: string;

  constructor(private httpClient: HttpClient, private ngRedux: NgRedux<IAppState>) {
    this.baseUrl = 'http://127.0.0.1:3000/api';
  }

  getCategories = async () => {
    return await this.httpClient.get<any[]>(this.baseUrl + '/categories').toPromise();
  }

  getMyId = async () => {
    const headers = {
      headers: new HttpHeaders({
        'user-token': localStorage.getItem('user-token')
      })
    }

    return await this.httpClient.get<any>(this.baseUrl + '/get-my-id', headers).toPromise();
  }

  sendRegisterForm = async (form) => {
    try {
      const response = await this.httpClient.post<any>(this.baseUrl + '/users/register', form).toPromise()
      localStorage.setItem('user-token', response.token);
      // localStorage.setItem('user-id', response.userId);
      this.ngRedux.dispatch({
        type: actions.CURRENT_USER_ID,
        data: response.userId
      });

      return { success: response };
    } catch (err) {
      return { error: err };
    }
  }

  sendLoginForm = async (form): Promise<any> => {
    try {
      const response = await this.httpClient.post<any>(this.baseUrl + '/users/login', form.value).toPromise()
      localStorage.setItem('user-token', response.token);
      // localStorage.setItem('user-id', response.userId);
      this.ngRedux.dispatch({
        type: actions.CURRENT_USER_ID,
        data: response.userId
      });

      return { success: response };
    } catch (err) {
      return { error: err };
    }
  }
}
