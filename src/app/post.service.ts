import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://127.0.0.1:3000/api/posts';
  }

  async getAllPosts() {
    try {
      return await this.httpClient.get<any>(this.baseUrl, this.createHeaders()).toPromise();
    } catch (err) {
      return { error: err };
    }
  }

  async getPostsByCategory(categoryId) {
    try {
      return await this.httpClient.get<any>(`${this.baseUrl}/category/${categoryId}`, this.createHeaders()).toPromise();
    } catch (err) {
      return { error: err };
    }
  }

  async getPostsBySearch(value) {
    try {
      return await this.httpClient.get<any>(this.baseUrl + '/search', this.createHeaders(value)).toPromise();
    } catch (err) {
      return { error: err };
    }
  }

  async createPost(value) {
    try {
      return await this.httpClient.post<any>(this.baseUrl + '/new', value, this.createHeaders()).toPromise();
    } catch (err) {
      return { error: err }
    }
  }

  createHeaders(value = '') {
    return {
      headers: new HttpHeaders({
        'user-token': localStorage.getItem('user-token'),
        'search-for': value
      })
    }
  }
}
