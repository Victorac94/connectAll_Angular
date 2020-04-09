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

  async getMyBasicInfo(): Promise<any> {
    try {
      const headers = localStorage.getItem('user-token') ? this.createHeaders() : { headers: null };
      return await this.httpClient.get<any>(`${this.baseUrl}/basic`, headers).toPromise();
    } catch (err) {
      if (err.status === 401) {
        // User is not logged in
        this.router.navigate(['/login']);
        return;
      } else {
        console.log(err);
        return err;
      }
    }
  }


  async getProfile(userId): Promise<any> {
    try {
      const headers = localStorage.getItem('user-token') ? this.createHeaders() : { headers: null };
      return await this.httpClient.get<any>(`${this.baseUrl}/${userId}`, headers).toPromise();
    } catch (err) {
      if (err.status === 401) {
        // User is not logged in
        this.router.navigate(['/login']);
        return;
      } else {
        console.log(err);
        return err;
      }
    }
  }

  async getProfilesBySearch(search): Promise<any> {
    try {
      const headers = localStorage.getItem('user-token') ? this.createHeaders(search) : { headers: null };
      return await this.httpClient.get<any>(this.baseUrl + '/search', headers).toPromise();
    } catch (err) {
      if (err.status === 401) {
        // User is not logged in
        this.router.navigate(['/login']);
        return;
      } else {
        console.log(err);
        return err;
      }
    }
  }

  async updateProfileInfo(profile): Promise<any> {
    try {
      const headers = localStorage.getItem('user-token') ? this.createHeaders() : { headers: null };
      return await this.httpClient.put<any>(this.baseUrl + '/my-profile', profile, headers).toPromise();
    } catch (err) {
      if (err.status === 401) {
        // User is not logged in
        this.router.navigate(['/login']);
        return;
      } else {
        console.log(err);
        return err;
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
}
