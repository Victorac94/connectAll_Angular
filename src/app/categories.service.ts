import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://127.0.0.1:3000/api/categories';
  }

  async getAll() {
    try {
      return await this.httpClient.get<any>(this.baseUrl).toPromise();
    } catch (err) {
      return { error: err }
    }
  }

  async getUserCategories() {
    try {
      return await this.httpClient.get<any>(this.baseUrl + '/follow', this.createHeaders()).toPromise();
    } catch (err) {
      return { error: err }
    }
  }

  createHeaders() {
    return {
      headers: new HttpHeaders({
        'user-token': localStorage.getItem('user-token')
      })
    }
  }
}
