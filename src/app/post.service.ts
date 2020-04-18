import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';

import { environment as env } from '../environments/environment';
import { IAppState } from './redux/store/store';
import * as actions from './redux/actions/actions';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl: string;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private router: Router,
    private httpClient: HttpClient
  ) {
    this.baseUrl = env.baseUrl + '/posts';
  }

  async getAllPosts() {
    try {
      const headers = localStorage.getItem('user-token') ? this.createHeaders() : { headers: null };
      return await this.httpClient.get<any>(this.baseUrl, headers).toPromise();
    } catch (err) {
      if (err.status === 401) {
        // User is not logged in
        this.router.navigate(['/login']);

        this.dispatchNotification(err.error, 'error');
      }
      else {
        console.log(err);

        this.dispatchNotification(`Error ${err.status} while getting the posts`, 'error');
      }
    }
  }

  async getPostsByCategory(categoryId) {
    try {
      const headers = localStorage.getItem('user-token') ? this.createHeaders() : { headers: null };
      return await this.httpClient.get<any>(`${this.baseUrl}/category/${categoryId}`, headers).toPromise();
    } catch (err) {
      if (err.status === 401) {
        // User is not logged in
        this.router.navigate(['/login']);

        this.dispatchNotification(err.error, 'error');
      }
      else {
        console.log(err);

        this.dispatchNotification(`Error ${err.status} while getting the posts`, 'error');
      }
    }
  }

  async getPostsBySearch(value) {
    try {
      const headers = localStorage.getItem('user-token') ? this.createHeaders(value) : { headers: null };
      return await this.httpClient.get<any>(this.baseUrl + '/search', headers).toPromise();
    } catch (err) {
      if (err.status === 401) {
        // User is not logged in
        this.router.navigate(['/login']);

        this.dispatchNotification(err.error, 'error');
      }
      else {
        console.log(err);

        this.dispatchNotification(`Error ${err.status} while getting the posts`, 'error');
      }
    }
  }

  async createPost(value) {
    try {
      const headers = localStorage.getItem('user-token') ? this.createHeaders() : { headers: null };
      return await this.httpClient.post<any>(this.baseUrl + '/new', value, headers).toPromise();
    } catch (err) {
      if (err.status === 401) {
        // User is not logged in
        this.router.navigate(['/login']);

        this.dispatchNotification(err.error, 'error');
      }
      else {
        console.log(err);

        this.dispatchNotification(`Error ${err.status} while creating the post`, 'error');
      }
    }
  }

  async deletePost(post) {
    try {
      const headers = localStorage.getItem('user-token') ? this.createHeaders('', post) : { headers: null };
      return await this.httpClient.delete<any>(this.baseUrl + '/delete', headers).toPromise();
    } catch (err) {
      if (err.status === 401) {
        // User is not logged in
        this.router.navigate(['/login']);

        this.dispatchNotification(err.error, 'error');
      }
      else {
        console.log(err);

        this.dispatchNotification(`Error ${err.status} while deleting the post`, 'error');
      }
    }
  }

  createHeaders(value = '', post = '') {
    return {
      headers: new HttpHeaders({
        'user-token': localStorage.getItem('user-token'),
        'post': JSON.stringify(post),
        'search-for': value
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
