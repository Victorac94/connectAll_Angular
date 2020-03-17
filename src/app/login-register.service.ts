import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://9475a221.ngrok.io/api';
  }

  sendRegisterForm = (form) => {
    console.log(form);
    this.httpClient.post<any>(this.baseUrl + '/register', form).toPromise()
      .then(response => {
        console.log(response);
        localStorage.setItem('user-id', response.id);
        localStorage.setItem('user-token', response.token);
      }).catch(error => {
        console.log(error);
      })
  }

  sendLoginForm = (form) => {
    console.log(form.value);
    this.httpClient.post<any>(this.baseUrl + '/login', form.value).toPromise()
      .then(response => {
        console.log(response);
        localStorage.setItem('user-id', response.id);
        localStorage.setItem('user-token', response.token);
      }).catch(error => {
        console.log(error);
      })
  }
}
