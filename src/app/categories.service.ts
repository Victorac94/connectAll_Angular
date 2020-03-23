import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  baseUrl: string;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.baseUrl = 'http://127.0.0.1:3000/api/categories';
  }

  async getAll() {
    try {
      return await this.httpClient.get<any>(this.baseUrl).toPromise();
    } catch (err) {
      if (err.status === 401) {
        this.router.navigate(['/login'])
      } else {
        console.log(err);
        return err;
      }
    }
  }

  async getUserCategories() {
    try {
      return await this.httpClient.get<any>(this.baseUrl + '/follow', this.createHeaders()).toPromise();
    } catch (err) {
      if (err.status === 401) {
        this.router.navigate(['/login'])
      } else {
        console.log(err);
        return err;
      }
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
