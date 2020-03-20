import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://127.0.0.1:3000/api';
  }

  getCategories = async () => {
    return await this.httpClient.get<any[]>(this.baseUrl + '/categories').toPromise();
  }

  sendRegisterForm = async (form) => {
    try {
      const response = await this.httpClient.post<any>(this.baseUrl + '/users/register', form).toPromise()
      localStorage.setItem('user-token', response.token);

      return { success: response };
    } catch (err) {
      return { error: err };
    }
  }

  sendLoginForm = (form) => {
    console.log(form.value);
    this.httpClient.post<any>(this.baseUrl + '/users/login', form.value).toPromise()
      .then(response => {
        console.log(response);
        localStorage.setItem('user-id', response.id);
        localStorage.setItem('user-token', response.token);
      }).catch(error => {
        console.log(error);
      })
  }
}
