import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseUrl: string;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.baseUrl = 'http://localhost:3000/api/users';
  }

  async getUser(userId): Promise<any> {
    try {
      return await this.httpClient.get<any>(`${this.baseUrl}/${userId}`).toPromise();
    } catch (err) {
      if (err.status === 401) {
        // User is not logged in
        this.router.navigate(['/login'])
      } else {
        console.log(err);
        return err;
      }
    }
  }

  async getMyProfile(): Promise<any> {
    try {
      return await this.httpClient.get<any>(this.baseUrl + '/my-profile', this.createHeaders()).toPromise();
    } catch (err) {
      if (err.status === 401) {
        // User is not logged in
        this.router.navigate(['/login'])
      } else {
        console.log(err);
        return err;
      }
    }
  }

  async updateProfileInfo(profile): Promise<any> {
    try {
      return await this.httpClient.put<any>(this.baseUrl + '/my-profile', profile, this.createHeaders()).toPromise();
    } catch (err) {
      if (err.status === 401) {
        // User is not logged in
        this.router.navigate(['/login'])
      } else {
        console.log(err);
        return err;
      }
    }
  }

  createHeaders(): any {
    return {
      headers: new HttpHeaders({
        'user-token': localStorage.getItem('user-token')
      })
    }
  }
}
