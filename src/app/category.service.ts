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
export class CategoryService {

  baseUrl: string;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.baseUrl = env.baseUrl + '/categories';
  }

  async getAll() {
    try {
      return await this.httpClient.get<any>(this.baseUrl).toPromise();
    } catch (err) {
      console.log(err);

      this.dispatchNotification(`Error ${err.status} while getting categories`, 'error');
    }
  }

  async getUserCategories() {
    try {
      const headers = localStorage.getItem('user-token') ? this.createHeaders() : { headers: null };
      return await this.httpClient.get<any>(this.baseUrl + '/follow', headers).toPromise();
    } catch (err) {
      if (err.status === 401) {
        // User is not logged in
        this.router.navigate(['/login']);

        this.dispatchNotification(err.error, 'error');
      }
      else {
        console.log(err);

        this.dispatchNotification(`Error ${err.status} while getting categories`, 'error');
      }
    }
  }

  async followCategory(categoryId) {
    try {
      const headers = localStorage.getItem('user-token') ? this.createHeaders('', categoryId) : { headers: null };
      const response = await this.httpClient.post<any>(this.baseUrl + '/follow', { categoryId: categoryId }, headers).toPromise();

      return response;
    } catch (err) {
      if (err.status === 401) {
        // User is not logged in
        this.router.navigate(['/login']);

        this.dispatchNotification(err.error, 'error');
      }
      else {
        this.dispatchNotification(`Error ${err.status} while following the category`, 'error')
      }
    }
  }

  async unfollowCategory(categoryId) {
    try {
      const headers = localStorage.getItem('user-token') ? this.createHeaders('', categoryId) : { headers: null };
      return await this.httpClient.delete<any>(this.baseUrl + '/user', headers).toPromise();
    } catch (err) {
      if (err.status === 401) {
        // User is not logged in
        this.router.navigate(['/login']);

        this.dispatchNotification(err.error, 'error');
      }
      else {
        console.log(err);

        this.dispatchNotification(`Error ${err.status} while deleting the category`, 'error');
      }
    }
  }

  async getCategoriesBySearch(value) {
    try {
      const headers = localStorage.getItem('user-token') ? this.createHeaders(value) : { headers: null };
      return await this.httpClient.get<any>(this.baseUrl + '/search', headers).toPromise();
    }
    catch (err) {
      if (err.status === 401) {
        // User is not logged in
        this.router.navigate(['/login']);

        this.dispatchNotification(err.error, 'error');
      }
      else {
        console.log(err);

        this.dispatchNotification(`Error ${err.status} while getting categories`, 'error');
      }
    }
  }

  // getCategoriesBySearch(value) {
  //   const allCategories = this.ngRedux.getState().allCategories;

  //   const searchResult = allCategories.filter(cat => {
  //     const regex = new RegExp(value, 'gi');

  //     return regex.test(cat.category_name);
  //   })

  //   return searchResult;
  // }

  createHeaders(searchFor = '', categoryId = '') {
    return {
      headers: new HttpHeaders({
        'user-token': localStorage.getItem('user-token'),
        'search-for': searchFor,
        'delete-category': JSON.stringify(categoryId)
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
