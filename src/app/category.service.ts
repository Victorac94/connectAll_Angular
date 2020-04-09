import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl: string;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.baseUrl = 'http://127.0.0.1:3000/api/categories';
  }

  async getAll() {
    try {
      return await this.httpClient.get<any>(this.baseUrl).toPromise();
    } catch (err) {
      console.log(err);
      // Show global messasge with the error
    }
  }

  async getUserCategories() {
    try {
      const headers = localStorage.getItem('user-token') ? this.createHeaders() : { headers: null };
      return await this.httpClient.get<any>(this.baseUrl + '/follow', headers).toPromise();
    } catch (err) {
      if (err.status === 401) {
        this.router.navigate(['/login'])
      } else {
        console.log(err);
        // Show global messasge with the error
      }
    }
  }

  async deleteUserCategories(delCategories) {
    try {
      const headers = localStorage.getItem('user-token') ? this.createHeaders(null, delCategories) : { headers: null };
      return await this.httpClient.delete<any>(this.baseUrl + '/user', headers).toPromise();
    } catch (err) {
      if (err.status === 401) {
        this.router.navigate(['/login']);
      } else {
        console.log(err);
        // Show global messasge with the error
      }
    }
  }

  async getCategoriesBySearch(value) {
    try {
      const headers = localStorage.getItem('user-token') ? this.createHeaders(value) : { headers: null };
      return await this.httpClient.get<any>(this.baseUrl + '/search', headers).toPromise();
    } catch (err) {
      if (err.status === 401) {
        this.router.navigate(['/login']);
      } else {
        console.log(err);
        // Show global messasge with the error
      }
    }
  }

  createHeaders(searchFor = '', categories = '') {
    return {
      headers: new HttpHeaders({
        'user-token': localStorage.getItem('user-token'),
        'search-for': searchFor,
        'delete-categories': JSON.stringify(categories)
      })
    }
  }
}
