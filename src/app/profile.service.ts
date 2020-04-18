import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';

import { environment as env } from '../environments/environment';
import { IAppState } from './redux/store/store';
import * as actions from './redux/actions/actions';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseUrl: string;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.baseUrl = env.baseUrl + '/users';
  }

  async getMyBasicInfo(): Promise<any> {
    try {
      const headers = localStorage.getItem('user-token') ? this.createHeaders() : { headers: null };
      return await this.httpClient.get<any>(`${this.baseUrl}/basic`, headers).toPromise();
    }
    catch (err) {
      if (err.status === 401) {
        // User is not logged in
        this.router.navigate(['/login']);

        this.dispatchNotification(err.error, 'error');
      } else {
        console.log(err);

        this.dispatchNotification(`Error ${err.status} while getting profile data`, 'error');
      }
    }
  }


  async getProfile(userId): Promise<any> {
    try {
      const headers = localStorage.getItem('user-token') ? this.createHeaders() : { headers: null };
      return await this.httpClient.get<any>(`${this.baseUrl}/${userId}`, headers).toPromise();
    }
    catch (err) {
      if (err.status === 401) {
        // User is not logged in
        this.router.navigate(['/login']);

        this.dispatchNotification(err.error, 'error');
      } else {
        console.log(err);

        this.dispatchNotification(`Error ${err.status} while getting profile data`, 'error');
      }
    }
  }

  async getProfilesBySearch(search): Promise<any> {
    try {
      const headers = localStorage.getItem('user-token') ? this.createHeaders(search) : { headers: null };
      return await this.httpClient.get<any>(this.baseUrl + '/search', headers).toPromise();
    }
    catch (err) {
      if (err.status === 401) {
        // User is not logged in
        this.router.navigate(['/login']);

        this.dispatchNotification(err.error, 'error');
      } else {
        console.log(err);

        this.dispatchNotification(`Error ${err.status} while getting profile data`, 'error');
      }
    }
  }

  async updateProfileInfo(profile): Promise<any> {
    try {
      const headers = localStorage.getItem('user-token') ? this.createHeaders() : { headers: null };
      return await this.httpClient.put<any>(this.baseUrl + '/my-profile', profile, headers).toPromise();
    }
    catch (err) {
      if (err.status === 401) {
        // User is not logged in
        this.router.navigate(['/login']);

        this.dispatchNotification(err.error, 'error');
      } else {
        console.log(err);

        this.dispatchNotification(`Error ${err.status} while getting profile data`, 'error');
      }
    }
  }

  createHeaders(searchFor = ''): any {
    return {
      headers: new HttpHeaders({
        'user-token': localStorage.getItem('user-token'),
        'search-for': searchFor
      })
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
