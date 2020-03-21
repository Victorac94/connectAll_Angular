import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://127.0.0.1:3000/api/posts'
  }

  async getPostsByCategory(categoryId) {
    try {
      return await this.httpClient.get<any>(`${this.baseUrl}/category/${categoryId}`).toPromise();
    } catch (err) {
      return { error: err };
    }
  }
}
